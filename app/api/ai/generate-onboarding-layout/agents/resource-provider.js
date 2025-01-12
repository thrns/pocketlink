import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { jsonrepair } from 'jsonrepair';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_RESEARCH_AGENT_API_KEY
);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Resource Provider Agent
 *
 * Responsibilities:
 * 1. Extract URLs from various input sources using regex patterns
 * 2. Fetch HTML content from those URLs
 * 3. Extract metadata, images, links, and content from HTML
 * 4. Structure the data chronologically for research
 * 5. Prepare the collected resources for the Researcher
 */
export async function resourceProvider(input) {
  console.log('🔎 [Resource Provider] Starting resource collection...');

  try {
    const { categories, profile } = input;

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      throw new Error('Categories are required and must be an array');
    }

    if (!profile || typeof profile !== 'object') {
      throw new Error('Profile information is required and must be an object');
    }

    // Extract URLs from categories and profile information
    const urlsFromCategories = extractUrlsFromText(categories.join(' '));
    const urlsFromProfile = extractUrlsFromText(JSON.stringify(profile));
    const allUrls = [...new Set([...urlsFromCategories, ...urlsFromProfile])];

    console.log(`🔎 [Resource Provider] Found ${allUrls.length} URLs in input`);

    // Limit the number of URLs to process for performance
    const urlsToProcess = allUrls.slice(0, 5);
    console.log(
      `🔎 [Resource Provider] Processing ${urlsToProcess.length} URLs`
    );

    // Object to store HTML content and its metadata
    const scrapedHtml = {};

    // Chronological content storage
    const chronologicalContent = {
      images: [],
      links: [],
      content: [],
    };

    // Process each URL to fetch HTML content
    for (const url of urlsToProcess) {
      const content = await fetchHtmlContent(url);
      scrapedHtml[url] = content;

      // If content was successfully fetched, extract metadata
      if (content.success) {
        const metadata = extractMetadataFromHtml(content.html, url);
        scrapedHtml[url].metadata = metadata;

        // Add images to chronological content with timestamp
        if (metadata.images && metadata.images.length > 0) {
          chronologicalContent.images.push(
            ...metadata.images.map((img) => ({
              ...img,
              source: url,
              timestamp: content.timestamp,
            }))
          );
        }

        // Add links to chronological content with timestamp
        if (metadata.links && metadata.links.length > 0) {
          chronologicalContent.links.push(
            ...metadata.links.map((link) => ({
              ...link,
              source: url,
              timestamp: content.timestamp,
            }))
          );
        }

        // Add content blocks to chronological content with timestamp
        if (metadata.contentBlocks && metadata.contentBlocks.length > 0) {
          chronologicalContent.content.push(
            ...metadata.contentBlocks.map((block) => ({
              ...block,
              source: url,
              timestamp: content.timestamp,
            }))
          );
        }
      }
    }

    // Sort all chronological content by timestamp
    chronologicalContent.images.sort((a, b) => a.timestamp - b.timestamp);
    chronologicalContent.links.sort((a, b) => a.timestamp - b.timestamp);
    chronologicalContent.content.sort((a, b) => a.timestamp - b.timestamp);

    console.log(
      `🔎 [Resource Provider] Processed ${Object.keys(scrapedHtml).length} URLs`
    );
    console.log(
      `🔎 [Resource Provider] Collected ${chronologicalContent.images.length} images, ${chronologicalContent.links.length} links, and ${chronologicalContent.content.length} content blocks`
    );

    // System prompt for the resource provider
    const systemPrompt = `
You are the Resource Provider for PocketLink's Onboarding Layout Generator.

Your task is to gather and analyze information for an onboarding layout based on the user's selected categories and profile information. You need to collect factual information that would be useful for creating a professional web profile in those categories.

Guidelines:
1. Focus on finding relevant, factual information for each category
2. Do NOT include any HTML tags or formatting in your responses
3. Use the scraped content from real URLs to inform your resource gathering
4. If relevant images or links were found in the scraped content, suggest using those
5. Ensure your gathered resources are balanced across all selected categories
6. Do not make up or fabricate information - stick to what can be reasonably inferred

Your role is to provide a solid foundation of resources that the Researcher can organize into a coherent narrative for the user's profile.
`;

    // User prompt with categories, profile and resources
    const userPrompt = `
CATEGORIES SELECTED BY USER:
${JSON.stringify(categories, null, 2)}

PROFILE INFORMATION:
${JSON.stringify(profile, null, 2)}

SCRAPED HTML CONTENT SUMMARY:
${Object.keys(scrapedHtml)
  .map((url) => {
    const content = scrapedHtml[url];
    if (!content.success) {
      return `URL: ${url} - Failed to fetch content: ${content.error}`;
    }

    const metadata = content.metadata || {};

    return `
URL: ${url}
Title: ${metadata.title || 'N/A'}
Description: ${metadata.description || 'N/A'}
Images Found: ${metadata.images ? metadata.images.length : 0}
Links Found: ${metadata.links ? metadata.links.length : 0}
Content Blocks: ${metadata.contentBlocks ? metadata.contentBlocks.length : 0}
`;
  })
  .join('\n')}

Please gather and organize relevant resources for creating an onboarding layout based on the user's selected categories and profile information. Include:

1. Key facts and details that would be important for each category
2. Suggestions for how the scraped content could be used in the layout
3. Any connections or themes you notice across the different categories
4. Ideas for presenting the profile information effectively

Format your response as a JSON object with the following schema:
{
  "resourceSummary": {
    "overview": "Brief overview of gathered resources",
    "categories": {
      "category1": {
        "keyPoints": ["Important point 1", "Important point 2"],
        "relevantContent": "Description of relevant content for this category"
      }
    }
  },
  "contentSuggestions": {
    "headlines": ["Possible headline 1", "Possible headline 2"],
    "descriptiveText": ["Suggested text 1", "Suggested text 2"],
    "callsToAction": ["Suggested CTA 1", "Suggested CTA 2"]
  }
}
`;

    console.log(
      '🔮 [Resource Provider] Calling Gemini API for resource gathering...'
    );

    // Call Gemini API
    const result = await model.generateContent([
      { role: 'system', parts: [{ text: systemPrompt }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ]);
    const response = await result.response;
    const resourceText = response.text();

    console.log(
      `📄 [Resource Provider] Gathered resources length: ${resourceText.length} characters`
    );

    // Extract JSON from the response
    let resourcesData;
    try {
      // Find JSON in the response
      const jsonStartIndex = resourceText.indexOf('{');
      const jsonEndIndex = resourceText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      const jsonStr = resourceText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      resourcesData = JSON.parse(repairedJson);
    } catch (error) {
      console.error(
        '❌ [Resource Provider] Error parsing gathered resources:',
        error
      );

      // Create a fallback resource data structure
      resourcesData = {
        resourceSummary: {
          overview: 'Resources based on provided categories and profile',
          categories: categories.reduce((acc, category) => {
            acc[category] = {
              keyPoints: ['Resource collection for this category'],
              relevantContent: 'Relevant content based on profile information',
            };
            return acc;
          }, {}),
        },
        contentSuggestions: {
          headlines: categories.map((category) => `Professional ${category}`),
          descriptiveText: ['Professional profile information'],
          callsToAction: ['Connect', 'Learn more'],
        },
      };
    }

    // Add raw scraped HTML and chronological content to the output
    resourcesData._rawScrapedHtml = scrapedHtml;
    resourcesData._chronologicalContent = chronologicalContent;

    console.log('✅ [Resource Provider] Resource collection successful');

    return {
      success: true,
      data: {
        categories,
        profile,
        ...resourcesData,
      },
    };
  } catch (error) {
    console.error('❌ [Resource Provider] Error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}

/**
 * Extract URLs from text using regex
 * @param {string} text - Text to extract URLs from
 * @returns {Array} Array of extracted URLs
 */
function extractUrlsFromText(text) {
  if (!text) return [];

  // Regex for URL extraction
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);

  if (!matches) return [];

  // Clean URLs (remove trailing punctuation, etc.)
  return matches.map((url) => {
    // Remove trailing punctuation that might have been captured
    return url.replace(/[,.;:!?)]+$/, '');
  });
}

/**
 * Fetch HTML content from a URL
 * @param {string} url - URL to fetch content from
 * @returns {Object} Object containing success status, HTML content and timestamp
 */
async function fetchHtmlContent(url) {
  try {
    const timestamp = Date.now(); // Record timestamp for chronological ordering
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10 seconds timeout
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get('content-type') || '';

    // Skip non-HTML content
    if (!contentType.includes('text/html')) {
      return {
        success: false,
        error: `Not HTML content: ${contentType}`,
        timestamp,
      };
    }

    const html = await response.text();

    return {
      success: true,
      html,
      timestamp,
    };
  } catch (error) {
    console.error(
      `❌ [Resource Provider] Error fetching ${url}:`,
      error.message
    );

    return {
      success: false,
      error: error.message,
      timestamp: Date.now(),
    };
  }
}

/**
 * Extract metadata, images, links, and content blocks from HTML
 * @param {string} html - HTML content
 * @param {string} sourceUrl - Source URL for resolving relative paths
 * @returns {Object} Extracted metadata
 */
function extractMetadataFromHtml(html, sourceUrl) {
  try {
    const $ = cheerio.load(html);
    const metadata = {};

    // Extract basic metadata
    metadata.title =
      $('title').text().trim() ||
      $('meta[property="og:title"]').attr('content') ||
      '';
    metadata.description =
      $('meta[name="description"]').attr('content') ||
      $('meta[property="og:description"]').attr('content') ||
      '';

    // Extract images
    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        const fullUrl = resolveRelativeUrl(src, sourceUrl);
        images.push({
          url: fullUrl,
          alt: $(el).attr('alt') || '',
          type: 'image',
        });
      }
    });

    // Extract Open Graph images
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage) {
      const fullUrl = resolveRelativeUrl(ogImage, sourceUrl);
      images.push({
        url: fullUrl,
        alt: metadata.title || 'Open Graph Image',
        type: 'og-image',
      });
    }

    metadata.images = images;

    // Extract links
    const links = [];
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        const fullUrl = resolveRelativeUrl(href, sourceUrl);
        links.push({
          url: fullUrl,
          text: $(el).text().trim(),
          type: 'link',
        });
      }
    });

    metadata.links = links;

    // Extract content blocks
    const contentBlocks = [];

    // Extract headings
    $('h1, h2, h3, h4, h5, h6').each((i, el) => {
      contentBlocks.push({
        type: 'heading',
        level: parseInt(el.name.replace('h', ''), 10),
        content: $(el).text().trim(),
      });
    });

    // Extract paragraphs
    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 10) {
        // Skip very short paragraphs
        contentBlocks.push({
          type: 'paragraph',
          content: text,
        });
      }
    });

    // Extract lists
    $('ul, ol').each((i, el) => {
      const items = [];
      $(el)
        .find('li')
        .each((j, li) => {
          items.push($(li).text().trim());
        });

      if (items.length > 0) {
        contentBlocks.push({
          type: 'list',
          listType: el.name === 'ol' ? 'ordered' : 'unordered',
          items: items,
        });
      }
    });

    metadata.contentBlocks = contentBlocks;

    return metadata;
  } catch (error) {
    console.error(
      '❌ [Resource Provider] Error extracting metadata:',
      error.message
    );
    return {
      title: '',
      description: '',
      images: [],
      links: [],
      contentBlocks: [],
    };
  }
}

/**
 * Resolve a relative URL to an absolute URL
 * @param {string} relativeUrl - Relative URL to resolve
 * @param {string} baseUrl - Base URL to resolve against
 * @returns {string} Absolute URL
 */
function resolveRelativeUrl(relativeUrl, baseUrl) {
  try {
    // If already absolute, return as is
    if (relativeUrl.match(/^https?:\/\//i)) {
      return relativeUrl;
    }

    // Create a URL object from the base URL
    const base = new URL(baseUrl);

    // Handle protocol-relative URLs (//example.com/path)
    if (relativeUrl.startsWith('//')) {
      return `${base.protocol}${relativeUrl}`;
    }

    // Create a new URL by joining the base URL and relative URL
    const absoluteUrl = new URL(relativeUrl, baseUrl);
    return absoluteUrl.toString();
  } catch (error) {
    console.error(
      `❌ [Resource Provider] Error resolving URL ${relativeUrl} against ${baseUrl}:`,
      error.message
    );
    return relativeUrl; // Return original if resolution fails
  }
}
