import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_RESEARCH_AGENT_API_KEY
);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Researcher Agent
 *
 * Responsibilities:
 * 1. Process and analyze the chronologically organized HTML content from the Resource Provider
 * 2. Organize and clarify the collected information into structured layout sections
 * 3. Clean and enhance images and links extracted from the HTML content
 * 4. Validate data about the brand/person for accurate representation
 * 5. Prepare the organized data for the Builder Agent
 */
export async function researcher(resourceData) {
  console.log('🔍 [Researcher] Starting organization for onboarding layout...');

  try {
    if (!resourceData || !resourceData.success || !resourceData.data) {
      console.error('❌ [Researcher] Missing or invalid resource data');
      return {
        success: false,
        error: 'Missing or invalid resource data',
        data: null,
      };
    }

    const data = resourceData.data;

    // Extract raw HTML data that was collected by the Resource Provider
    const rawScrapedHtml = data._rawScrapedHtml || {};

    // Extract chronological content structure
    const chronologicalContent = data._chronologicalContent || {
      images: [],
      links: [],
      content: [],
    };

    // Remove raw data from the data to keep it clean
    delete data._rawScrapedHtml;
    delete data._chronologicalContent;

    // Analyze available HTML content from scraped pages
    const scrapedContentSummary = Object.keys(rawScrapedHtml)
      .map((url) => {
        const content = rawScrapedHtml[url];

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
      .join('\n');

    // Prepare a summary of scraped HTML data to include in the prompt
    const htmlContentSummary =
      Object.keys(rawScrapedHtml).length > 0
        ? `\nSCRAPED HTML CONTENT SUMMARY:\n${scrapedContentSummary}`
        : '\nNo HTML content was successfully scraped.';

    // Get the chronologically organized images and links
    const allScrapedImages = chronologicalContent.images;
    const allScrapedLinks = chronologicalContent.links;
    const allContentBlocks = chronologicalContent.content;

    console.log(
      `🔍 [Researcher] Analyzing ${allScrapedImages.length} images, ${allScrapedLinks.length} links, and ${allContentBlocks.length} content blocks from scraped content...`
    );

    // Prepare a summary of the content blocks for the prompt
    const contentBlocksSummary =
      allContentBlocks.length > 0
        ? `\nCONTENT BLOCKS (in chronological order):\n${allContentBlocks
            .slice(0, 10)
            .map(
              (block) =>
                `[${block.type}] ${block.content.substring(0, 150)}${block.content.length > 150 ? '...' : ''} (from ${block.source})`
            )
            .join(
              '\n\n'
            )}${allContentBlocks.length > 10 ? `\n...and ${allContentBlocks.length - 10} more content blocks` : ''}`
        : '\nNo content blocks were extracted from the scraped HTML.';

    const categories = data.categories || [];
    const profile = data.profile || {};

    // System prompt for the researcher
    const systemPrompt = `
You are the Researcher Agent for PocketLink's Onboarding Layout Generator.

Your task is to analyze and organize information about a user to create a structured onboarding layout.
Look at the information provided about the user and the categories they've selected for 
their PocketLink profile.

Your analysis should:
1. Create a coherent narrative about the user based on the provided information
2. Organize the information into the selected category sections
3. Use real resources (images, links) from the chronologically organized scraped content
4. Identify themes, color schemes, and layout suggestions
5. Do not include any HTML tags in your response
6. Ensure the structure can be easily processed by the next agent in our pipeline
`;

    // User prompt with categories, profile and resources
    const userPrompt = `
CATEGORIES SELECTED BY USER:
${JSON.stringify(categories, null, 2)}

PROFILE INFORMATION:
${JSON.stringify(profile, null, 2)}

RESOURCES:
${htmlContentSummary}

SCRAPED IMAGES (in chronological order, ${allScrapedImages.length}):
${allScrapedImages
  .slice(0, 20)
  .map(
    (img) =>
      `${img.url}${img.alt ? ` (alt: ${img.alt})` : ''} (from ${img.source})`
  )
  .join('\n')}
${allScrapedImages.length > 20 ? `\n...and ${allScrapedImages.length - 20} more images` : ''}

SCRAPED LINKS (in chronological order, ${allScrapedLinks.length}):
${allScrapedLinks
  .slice(0, 20)
  .map(
    (link) => `${link.text || 'No text'} - ${link.url} (from ${link.source})`
  )
  .join('\n')}
${allScrapedLinks.length > 20 ? `\n...and ${allScrapedLinks.length - 20} more links` : ''}

${contentBlocksSummary}

Create a structured layout plan for the user's onboarding. Include the following:

1. A profile summary that captures their essence
2. Themes that would work well based on their information
3. Sections for their layout, organized by the categories they selected
4. Unique selling points to highlight in their profile
5. A selection of real images and links from the scraped content to use in their profile

Return your response in the following JSON format:

{
  "profileSummary": {
    "title": "Professional title or headline",
    "description": "Brief description of the person/brand",
    "industry": "Primary industry or field",
    "keywords": ["keyword1", "keyword2"]
  },
  "themeSuggestions": {
    "primaryColor": "Suggested primary color",
    "secondaryColor": "Suggested secondary color",
    "styleNotes": "Brief notes about suggested visual style"
  },
  "sections": [
    {
      "category": "Category name (matching one from the selected categories)",
      "title": "Section heading",
      "content": "Content for this section (no HTML)",
      "resources": [
        {
          "type": "image/link",
          "url": "URL to a real resource from scraped content",
          "description": "Description of the resource" 
        }
      ]
    }
  ],
  "uniqueSellingPoints": [
    {
      "title": "USP title",
      "description": "USP description"
    }
  ],
  "recommendedResources": {
    "images": [
      {
        "url": "URL to real image from scraped content",
        "purpose": "Suggested usage in the profile",
        "source": "Where this image was found"
      }
    ],
    "links": [
      {
        "url": "URL to real link from scraped content",
        "text": "Suggested text for the link",
        "purpose": "How this link should be used",
        "source": "Where this link was found"
      }
    ],
    "chronologicalElements": [
      {
        "type": "text/image/link",
        "content": "The actual content or URL",
        "source": "Where this content was found",
        "relevance": "Why this content is relevant to include"
      }
    ]
  }
}

Make sure ALL links and images you include are REAL and were found in the scraped content.
Maintain the chronological relevance of content where appropriate.
`;

    console.log(
      '🔮 [Researcher] Calling Gemini API for onboarding data organization...'
    );

    // Call Gemini model with the prompts
    const researcherResult = await model.generateContent([
      { role: 'system', parts: [{ text: systemPrompt }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ]);
    const researcherResponse = await researcherResult.response;
    const researchText = researcherResponse.text();

    console.log(
      `📄 [Researcher] Research data length: ${researchText.length} characters`
    );

    // Process the response to extract the structured layout plan
    let layoutPlan;
    try {
      // Find JSON in the response
      const jsonStartIndex = researchText.indexOf('{');
      const jsonEndIndex = researchText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      const jsonStr = researchText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      layoutPlan = JSON.parse(repairedJson);

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

      // Sanitize the layout plan
      layoutPlan = sanitizeObject(layoutPlan);

      // Validate image URLs in the layout plan
      const validateImageUrl = (imageUrl) => {
        try {
          new URL(imageUrl);
          // Check if the image URL is in our scraped images
          return allScrapedImages.some(
            (img) => img.url === imageUrl || imageUrl.includes(img.url)
          );
        } catch (e) {
          return false;
        }
      };

      // Validate link URLs in the layout plan
      const validateLinkUrl = (linkUrl) => {
        try {
          new URL(linkUrl);
          // Check if the link URL is in our scraped links
          return allScrapedLinks.some(
            (link) => link.url === linkUrl || linkUrl.includes(link.url)
          );
        } catch (e) {
          return false;
        }
      };

      // Validate and filter resources in sections
      if (layoutPlan.sections && Array.isArray(layoutPlan.sections)) {
        layoutPlan.sections = layoutPlan.sections.map((section) => {
          if (section.resources && Array.isArray(section.resources)) {
            section.resources = section.resources.filter((resource) => {
              if (!resource.url) return false;

              if (resource.type === 'image') {
                return validateImageUrl(resource.url);
              } else if (resource.type === 'link') {
                return validateLinkUrl(resource.url);
              }

              return false;
            });
          }
          return section;
        });
      }

      // Validate and filter recommended images
      if (
        layoutPlan.recommendedResources &&
        layoutPlan.recommendedResources.images
      ) {
        layoutPlan.recommendedResources.images =
          layoutPlan.recommendedResources.images.filter(
            (image) => image.url && validateImageUrl(image.url)
          );
      }

      // Validate and filter recommended links
      if (
        layoutPlan.recommendedResources &&
        layoutPlan.recommendedResources.links
      ) {
        layoutPlan.recommendedResources.links =
          layoutPlan.recommendedResources.links.filter(
            (link) => link.url && validateLinkUrl(link.url)
          );
      }

      // Validate chronological elements
      if (
        layoutPlan.recommendedResources &&
        layoutPlan.recommendedResources.chronologicalElements
      ) {
        layoutPlan.recommendedResources.chronologicalElements =
          layoutPlan.recommendedResources.chronologicalElements.filter(
            (element) => {
              if (element.type === 'image') {
                return element.content && validateImageUrl(element.content);
              } else if (element.type === 'link') {
                return element.content && validateLinkUrl(element.content);
              }
              return true; // Keep text elements
            }
          );
      }

      // Add raw chronological data for the builder
      layoutPlan._chronologicalData = {
        images: allScrapedImages.slice(0, 30), // Limit to reasonable size
        links: allScrapedLinks.slice(0, 30),
        content: allContentBlocks.slice(0, 30),
      };

      console.log('✅ [Researcher] Onboarding layout research successful');

      return {
        success: true,
        data: layoutPlan,
      };
    } catch (error) {
      console.error('❌ [Researcher] Error processing layout plan:', error);

      // Create a fallback layout plan
      const fallbackPlan = {
        profileSummary: {
          title: profile.title || 'Professional',
          description: profile.description || 'Professional profile',
          industry: profile.industry || 'General',
          keywords: profile.keywords || ['professional', 'profile'],
        },
        themeSuggestions: {
          primaryColor: '#4a90e2',
          secondaryColor: '#f5f5f5',
          styleNotes: 'Clean, professional layout',
        },
        sections: categories.map((category) => ({
          category: category,
          title: `My ${category}`,
          content: `Information about ${category}`,
          resources: [],
        })),
        uniqueSellingPoints: [
          {
            title: 'Professional Experience',
            description: 'Experienced professional in the industry',
          },
        ],
        recommendedResources: {
          images: allScrapedImages.slice(0, 5).map((img) => ({
            url: img.url,
            purpose: 'Profile visual',
            source: img.source,
          })),
          links: allScrapedLinks.slice(0, 5).map((link) => ({
            url: link.url,
            text: link.text || 'Reference',
            purpose: 'External reference',
            source: link.source,
          })),
          chronologicalElements: allContentBlocks.slice(0, 5).map((block) => ({
            type: 'text',
            content: block.content.substring(0, 200),
            source: block.source,
            relevance: 'Content from source',
          })),
        },
        _chronologicalData: {
          images: allScrapedImages.slice(0, 30),
          links: allScrapedLinks.slice(0, 30),
          content: allContentBlocks.slice(0, 30),
        },
      };

      return {
        success: true,
        error: 'Failed to process layout plan, using fallback structure',
        data: fallbackPlan,
      };
    }
  } catch (error) {
    console.error('❌ [Researcher] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
