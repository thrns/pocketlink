import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { jsonrepair } from 'jsonrepair';
import fetch from 'node-fetch';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Extract URLs from text using regex
 * @param {string} text - Text to extract URLs from
 * @returns {string[]} - Array of extracted URLs
 */
async function extractUrls(text) {
  if (!text) return [];

  // Regex pattern to match URLs
  const urlPattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

  // Extract URLs using regex
  const matches = text.match(urlPattern);
  return matches || [];
}

/**
 * Fetch HTML content from a URL
 * @param {string} url - URL to fetch content from
 * @returns {Object} - Object containing HTML content and metadata
 */
async function fetchHtmlContent(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      return {
        url,
        success: false,
        error: `Failed to fetch: ${response.status} ${response.statusText}`,
      };
    }

    const contentType = response.headers.get('content-type') || '';

    // Skip non-HTML content
    if (!contentType.includes('text/html')) {
      return {
        url,
        success: false,
        error: `Not HTML content: ${contentType}`,
      };
    }

    const html = await response.text();
    return {
      url,
      success: true,
      html,
      contentType,
      timestamp: new Date().toISOString(), // Add timestamp for chronological ordering
    };
  } catch (error) {
    return {
      url,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Extract basic metadata from HTML
 * @param {string} html - HTML content to extract metadata from
 * @returns {Object} - Object containing extracted metadata
 */
function extractMetadataFromHtml(html, url) {
  try {
    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Extract meta description
    const descMatch =
      html.match(
        /<meta[^>]*name=['"]description['"][^>]*content=['"]([^'"]+)['"][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=['"]([^'"]+)['"][^>]*name=['"]description['"][^>]*>/i
      );
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract og:image
    const ogImageMatch =
      html.match(
        /<meta[^>]*property=['"]og:image['"][^>]*content=['"]([^'"]+)['"][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=['"]([^'"]+)['"][^>]*property=['"]og:image['"][^>]*>/i
      );
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : '';

    // Extract all images
    const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
    const images = [];
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      if (imgMatch[1]) {
        // Resolve relative URLs
        let imgUrl = imgMatch[1];
        if (imgUrl.startsWith('/')) {
          const urlObj = new URL(url);
          imgUrl = `${urlObj.protocol}//${urlObj.host}${imgUrl}`;
        } else if (!imgUrl.startsWith('http')) {
          const baseUrl = url.endsWith('/')
            ? url
            : url.substring(0, url.lastIndexOf('/') + 1);
          imgUrl = `${baseUrl}${imgUrl}`;
        }

        const alt = imgMatch[0].match(/alt=['"]([^'"]*)['"]/i);
        images.push({
          url: imgUrl,
          alt: alt ? alt[1] : '',
          timestamp: new Date().toISOString(),
          source: url,
        });
      }
    }

    // Extract all links
    const linkRegex = /<a[^>]*href=['"]([^'"]+)['"][^>]*>([^<]*)<\/a>/gi;
    const links = [];
    let linkMatch;
    while ((linkMatch = linkRegex.exec(html)) !== null) {
      if (
        linkMatch[1] &&
        !linkMatch[1].startsWith('#') &&
        !linkMatch[1].startsWith('javascript:')
      ) {
        // Resolve relative URLs
        let linkUrl = linkMatch[1];
        if (linkUrl.startsWith('/')) {
          const urlObj = new URL(url);
          linkUrl = `${urlObj.protocol}//${urlObj.host}${linkUrl}`;
        } else if (!linkUrl.startsWith('http')) {
          const baseUrl = url.endsWith('/')
            ? url
            : url.substring(0, url.lastIndexOf('/') + 1);
          linkUrl = `${baseUrl}${linkUrl}`;
        }

        links.push({
          url: linkUrl,
          text: linkMatch[2].trim(),
          timestamp: new Date().toISOString(),
          source: url,
        });
      }
    }

    // Extract text content from main page sections (for better chronological content)
    const mainContentRegex = /<(article|main|section)[^>]*>([\s\S]*?)<\/\1>/gi;
    const contentBlocks = [];
    let contentMatch;
    while ((contentMatch = mainContentRegex.exec(html)) !== null) {
      const rawContent = contentMatch[2];
      // Remove HTML tags and collapse whitespace for text content
      const textContent = rawContent
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      if (textContent.length > 50) {
        // Only include substantial content blocks
        contentBlocks.push({
          content: textContent,
          type: contentMatch[1], // article, main, or section
          timestamp: new Date().toISOString(),
          source: url,
        });
      }
    }

    // If no content blocks were found, try to extract paragraphs
    if (contentBlocks.length === 0) {
      const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
      let pMatch;
      while ((pMatch = paragraphRegex.exec(html)) !== null) {
        const text = pMatch[1]
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (text.length > 30) {
          contentBlocks.push({
            content: text,
            type: 'paragraph',
            timestamp: new Date().toISOString(),
            source: url,
          });
        }
      }
    }

    return {
      title,
      description,
      ogImage,
      images,
      links,
      contentBlocks,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Resource Provider Agent (Agent 1)
 *
 * Responsibilities:
 * 1. Extract URLs from the user's prompt using regex
 * 2. Fetch HTML content from extracted URLs
 * 3. Extract useful information from HTML content
 * 4. Bundle all gathered information and deliver it to the Researcher
 */
export async function resourceProvider(request, logMessage = console.log) {
  logMessage('🔍 [Resource Provider] Starting data collection...');

  try {
    // Parse request body
    const { url, description, profileDetails } = request;

    if (!url && !description && !profileDetails) {
      logMessage('❌ [Resource Provider] Missing input data');
      return {
        success: false,
        error: 'Missing required input data',
        data: null,
      };
    }

    // List to store all discovered URLs
    const discoveredUrls = [];
    const scrapedContent = {};

    // Extract URLs from the provided URL, description, and profile details
    if (url) {
      discoveredUrls.push(url);
    }

    // Extract URLs from description
    if (description) {
      logMessage('🔍 [Resource Provider] Extracting URLs from description...');
      const urlsFromDescription = await extractUrls(description);
      discoveredUrls.push(...urlsFromDescription);
      logMessage(
        `🔍 [Resource Provider] Found ${urlsFromDescription.length} URLs in description`
      );
    }

    // Extract URLs from profile details
    if (profileDetails) {
      logMessage(
        '🔍 [Resource Provider] Extracting URLs from profile details...'
      );
      const profileDetailsText =
        typeof profileDetails === 'string'
          ? profileDetails
          : JSON.stringify(profileDetails);

      const urlsFromProfileDetails = await extractUrls(profileDetailsText);
      discoveredUrls.push(...urlsFromProfileDetails);
      logMessage(
        `🔍 [Resource Provider] Found ${urlsFromProfileDetails.length} URLs in profile details`
      );
    }

    // Remove duplicates
    const uniqueUrls = [...new Set(discoveredUrls)];
    logMessage(
      `🔍 [Resource Provider] Processing ${uniqueUrls.length} unique URLs...`
    );

    // Create chronologically organized content structure
    const chronologicalContent = {
      images: [],
      links: [],
      content: [],
    };

    // Fetch HTML content for each URL (limited to first 5 for performance)
    const urlsToProcess = uniqueUrls.slice(0, 5);
    for (const url of urlsToProcess) {
      logMessage(`🌐 [Resource Provider] Fetching content from: ${url}`);
      const htmlResult = await fetchHtmlContent(url);

      console.log('🔍 [Resource Provider] HTML Result:', htmlResult);

      if (htmlResult.success) {
        logMessage(
          `✅ [Resource Provider] Successfully fetched content from: ${url}`
        );
        const metadata = extractMetadataFromHtml(htmlResult.html, url);

        // Add fetched content to chronological structure
        chronologicalContent.images.push(...(metadata.images || []));
        chronologicalContent.links.push(...(metadata.links || []));
        chronologicalContent.content.push(...(metadata.contentBlocks || []));

        scrapedContent[url] = {
          url,
          html: htmlResult.html.substring(0, 10000), // Trim HTML for size
          metadata,
          timestamp: htmlResult.timestamp,
        };
      } else {
        logMessage(
          `❌ [Resource Provider] Failed to fetch content from: ${url} - ${htmlResult.error}`
        );
        scrapedContent[url] = {
          url,
          error: htmlResult.error,
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Sort all content chronologically by timestamp
    chronologicalContent.images.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    chronologicalContent.links.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    chronologicalContent.content.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    // Remove duplicates from images and links
    chronologicalContent.images = chronologicalContent.images.filter(
      (img, index, self) => index === self.findIndex((i) => i.url === img.url)
    );

    chronologicalContent.links = chronologicalContent.links.filter(
      (link, index, self) => index === self.findIndex((l) => l.url === link.url)
    );

    logMessage(
      `🔍 [Resource Provider] Extracted ${chronologicalContent.images.length} images, ${chronologicalContent.links.length} links, and ${chronologicalContent.content.length} content blocks`
    );

    // Construct prompt for resource gathering
    const resourcePrompt = `
    You are a Resource Provider agent for PocketLink, a web profile builder application.
    Your task is to analyze the provided information and HTML content to extract useful content for creating a professional web profile.

    INPUT DATA:
    ${url ? `URL: ${url}` : ''}
    ${description ? `DESCRIPTION: ${description}` : ''}
    ${profileDetails ? `PROFILE DETAILS: ${JSON.stringify(profileDetails, null, 2)}` : ''}

    SCRAPED HTML CONTENT:
    ${Object.keys(scrapedContent)
      .map((url) => {
        const content = scrapedContent[url];
        if (content.error) {
          return `URL: ${url}\nStatus: Failed to fetch\nError: ${content.error}`;
        } else {
          return `URL: ${url}
Status: Successfully fetched
Title: ${content.metadata.title || 'N/A'}
Description: ${content.metadata.description || 'N/A'}
Images: ${content.metadata.images ? content.metadata.images.length : 0} found
Links: ${content.metadata.links ? content.metadata.links.length : 0} found
Content Blocks: ${content.metadata.contentBlocks ? content.metadata.contentBlocks.length : 0} found`;
        }
      })
      .join('\n\n')}

    INSTRUCTIONS:
    1. Identify key information about the person or brand from the provided data and HTML content
    2. Extract relevant links, images, and content
    3. Organize the data into categories (personal info, professional info, social links, etc.)
    4. For any social media links mentioned, ensure they are properly formatted and working URLs
    5. DO NOT include any HTML tags or formatting in your response
    6. For links, extract the actual URL, not just the text description
    7. For images, only include real image URLs from the scraped content - DO NOT create placeholder URLs
    8. Verify that all URLs and images you include actually exist in the scraped content
    9. Maintain the chronological order of content wherever possible

    Return your findings in the following JSON format:
    {
      "personalInfo": {
        "name": "Full name",
        "title": "Professional title",
        "bio": "Short biography (NO HTML)",
        "avatarUrl": "URL to profile image (ONLY if explicitly provided)"
      },
      "professionalInfo": {
        "industry": "Industry category",
        "experience": "Years of experience",
        "skills": ["Skill 1", "Skill 2", "..."],
        "achievements": ["Achievement 1", "Achievement 2", "..."]
      },
      "contactInfo": {
        "email": "Email address (if provided)",
        "phone": "Phone number (if provided)",
        "location": "Location (if provided)"
      },
      "socialLinks": [
        {
          "platform": "Platform name",
          "url": "Full URL (must be a valid, complete URL)",
          "username": "Username"
        }
      ],
      "mediaContent": [
        {
          "type": "image/video/document",
          "url": "Content URL (only if explicitly provided)",
          "description": "Content description"
        }
      ],
      "extractedLinks": [
        {
          "url": "Full extracted URL",
          "title": "Link title or description",
          "source": "Where this link was found"
        }
      ],
      "scrapedHtmlData": [
        {
          "url": "URL of the scraped page",
          "title": "Page title",
          "description": "Page description",
          "images": ["Image URL 1", "Image URL 2", "..."],
          "extractedText": "Key text from the page (NO HTML)"
        }
      ],
      "additionalInfo": "Any other relevant information (NO HTML)"
    }
    `;

    logMessage(
      '🔮 [Resource Provider] Calling Gemini API for resource gathering...'
    );

    // Call Gemini API for resource gathering
    const resourceResult = await model.generateContent(resourcePrompt);
    const resourceResponse = await resourceResult.response;
    const resourceText = resourceResponse.text();

    logMessage(
      `📄 [Resource Provider] Resource data length: ${resourceText.length} characters`
    );

    // Extract JSON from the response
    let jsonStr = '';
    try {
      // Find JSON in the response
      const jsonStartIndex = resourceText.indexOf('{');
      const jsonEndIndex = resourceText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      jsonStr = resourceText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      const resourceData = JSON.parse(repairedJson);

      // Sanitize the data to ensure no HTML content
      const sanitizeText = (text) => {
        if (!text) return text;
        // Remove HTML tags
        return text.replace(/<[^>]*>?/gm, '');
      };

      // Recursively sanitize all string values in the object
      const sanitizeObject = (obj) => {
        if (!obj) return obj;

        if (typeof obj === 'string') {
          return sanitizeText(obj);
        }

        if (Array.isArray(obj)) {
          return obj.map((item) => sanitizeObject(item));
        }

        if (typeof obj === 'object') {
          const sanitized = {};
          for (const [key, value] of Object.entries(obj)) {
            sanitized[key] = sanitizeObject(value);
          }
          return sanitized;
        }

        return obj;
      };

      // Sanitize the entire resource data
      const sanitizedData = sanitizeObject(resourceData);

      // Validate social links to ensure they are proper URLs
      if (
        sanitizedData.socialLinks &&
        Array.isArray(sanitizedData.socialLinks)
      ) {
        sanitizedData.socialLinks = sanitizedData.socialLinks.filter((link) => {
          if (!link.url) return false;

          try {
            new URL(link.url);
            return true;
          } catch (e) {
            logMessage(
              `❌ [Resource Provider] Invalid social link URL: ${link.url}`
            );
            return false;
          }
        });
      }

      // Validate extracted links
      if (
        sanitizedData.extractedLinks &&
        Array.isArray(sanitizedData.extractedLinks)
      ) {
        sanitizedData.extractedLinks = sanitizedData.extractedLinks.filter(
          (link) => {
            if (!link.url) return false;

            try {
              new URL(link.url);
              return true;
            } catch (e) {
              logMessage(
                `❌ [Resource Provider] Invalid extracted link URL: ${link.url}`
              );
              return false;
            }
          }
        );
      }

      // Add the chronologically organized data to be used by the researcher
      sanitizedData._chronologicalContent = chronologicalContent;

      // Include raw scraped HTML data for the researcher to use
      sanitizedData._rawScrapedHtml = scrapedContent;

      logMessage(
        '✅ [Resource Provider] Resource data parsed and sanitized successfully'
      );

      return {
        success: true,
        data: sanitizedData,
      };
    } catch (error) {
      logMessage(
        `❌ [Resource Provider] Error parsing resource data as JSON: ${error.message}`
      );

      return {
        success: false,
        error: 'Failed to parse resource data',
        rawData: resourceText.substring(0, 1000) + '...',
        scrapedContent,
        chronologicalContent,
      };
    }
  } catch (error) {
    logMessage(`❌ [Resource Provider] Unhandled error: ${error.message}`);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
