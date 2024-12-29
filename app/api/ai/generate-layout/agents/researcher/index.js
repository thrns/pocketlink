import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Researcher Agent (Agent 2)
 *
 * Responsibilities:
 * 1. Process and analyze the chronologically organized HTML content from the Resource Provider
 * 2. Organize and clarify the collected information maintaining chronological order
 * 3. Clean and enhance images and links extracted from the HTML content
 * 4. Validate links and data about the brand/person
 * 5. Pass the organized data to the Content Writer
 */
export async function researcher(resourceData) {
  console.log('🔍 [Researcher] Starting data organization and research...');

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

    // Construct prompt for data organization and research
    const researchPrompt = `
    You are a Researcher agent for PocketLink, a web profile builder application.
    Your task is to organize, research, and validate the collected information to make it easy for the Content Writer to process.

    INPUT DATA:
    ${JSON.stringify(data, null, 2)}
    
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
        (link) =>
          `${link.text || 'No text'} - ${link.url} (from ${link.source})`
      )
      .join('\n')}
    ${allScrapedLinks.length > 20 ? `\n...and ${allScrapedLinks.length - 20} more links` : ''}
    
    ${contentBlocksSummary}

    INSTRUCTIONS:
    1. Analyze the provided data and HTML content to identify the most important elements for a professional web profile
    2. Organize the information into clear categories while maintaining chronological relevance
    3. Use the real images and links extracted from the HTML content wherever possible
    4. Verify all links are valid and extract useful information from them
    5. For social media links, confirm they point to real accounts and extract relevant details
    6. Fill in any missing information with reasonable inferences based on the HTML content
    7. DO NOT include any HTML tags or formatting in your response
    8. Identify key themes and messaging that should be emphasized
    9. Make sure all images and links you include in the final output are REAL and were found in the scraped content
    10. Maintain the chronological flow of content where it makes narrative sense

    Return your organized data in the following JSON format:
    {
      "profileSummary": {
        "name": "Full name",
        "title": "Professional title",
        "industry": "Industry category",
        "professionalRole": "Specific role",
        "keyThemes": ["Theme 1", "Theme 2", "..."]
      },
      "contentStructure": {
        "suggestedSections": [
          {
            "name": "Section name",
            "purpose": "What this section accomplishes",
            "recommendedComponents": ["Component type 1", "Component type 2", "..."]
          }
        ]
      },
      "contentElements": {
        "bio": {
          "short": "1-2 sentence bio (NO HTML)",
          "full": "Complete professional bio (NO HTML)"
        },
        "skills": ["Skill 1", "Skill 2", "..."],
        "achievements": ["Achievement 1", "Achievement 2", "..."],
        "testimonials": [
          {
            "quote": "Testimonial text (NO HTML)",
            "author": "Author name",
            "title": "Author title"
          }
        ],
        "chronologicalContent": [
          {
            "type": "text/image/link",
            "content": "The actual content",
            "source": "Where this content was found",
            "relevance": "Why this content is relevant to the profile"
          }
        ]
      },
      "visualElements": {
        "suggestedImageTypes": ["Profile photo", "Work samples", "..."],
        "images": [
          {
            "url": "URL to image (must be a real URL from scraped content)",
            "type": "Type of image (profile, work, etc.)",
            "description": "Description of the image",
            "source": "Where this image was found"
          }
        ],
        "colorPalette": {
          "primary": "Suggested primary color",
          "secondary": "Suggested secondary color",
          "accent": "Suggested accent color"
        }
      },
      "contactInfo": {
        "email": "Email address",
        "phone": "Phone number",
        "location": "Location",
        "socialLinks": [
          {
            "platform": "Platform name",
            "url": "Full URL (verified)",
            "username": "Username",
            "followerCount": "Follower count if available",
            "contentType": "Type of content shared"
          }
        ]
      },
      "researchedLinks": [
        {
          "url": "Full URL (must be a real URL from scraped content)",
          "title": "Link title",
          "description": "Brief description of what this link contains",
          "relevance": "How this link is relevant to the profile",
          "source": "Where this link was found"
        }
      ],
      "brandResearch": {
        "companyName": "Company name if applicable",
        "industry": "Industry sector",
        "products": ["Product 1", "Product 2", "..."],
        "services": ["Service 1", "Service 2", "..."],
        "competitors": ["Competitor 1", "Competitor 2", "..."],
        "marketPosition": "Description of market position"
      },
      "buildingBlocksForBuilder": {
        "essentialImages": [
          {
            "url": "URL to a critical image for the builder",
            "type": "The type of image",
            "purpose": "What this image should be used for"
          }
        ],
        "essentialLinks": [
          {
            "url": "URL to a critical link for the builder",
            "text": "Display text for the link",
            "purpose": "What this link should be used for"
          }
        ]
      },
      "additionalNotes": "Any other relevant information or suggestions (NO HTML)"
    }
    `;

    console.log(
      '🔮 [Researcher] Calling Gemini API for data organization and research...'
    );

    // Call Gemini API for data organization and research
    const researchResult = await model.generateContent(researchPrompt);
    const researchResponse = await researchResult.response;
    const researchText = researchResponse.text();

    console.log(
      `📄 [Researcher] Organized data length: ${researchText.length} characters`
    );

    // Extract JSON from the response
    let jsonStr = '';
    try {
      // Find JSON in the response
      const jsonStartIndex = researchText.indexOf('{');
      const jsonEndIndex = researchText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      jsonStr = researchText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      const organizedData = JSON.parse(repairedJson);

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

      // Sanitize the entire research data
      const sanitizedData = sanitizeObject(organizedData);

      // Validate social links to ensure they are proper URLs
      if (
        sanitizedData.contactInfo &&
        sanitizedData.contactInfo.socialLinks &&
        Array.isArray(sanitizedData.contactInfo.socialLinks)
      ) {
        sanitizedData.contactInfo.socialLinks =
          sanitizedData.contactInfo.socialLinks.filter((link) => {
            if (!link.url) return false;

            try {
              new URL(link.url);
              return true;
            } catch (e) {
              console.warn(
                `❌ [Researcher] Invalid social link URL: ${link.url}`
              );
              return false;
            }
          });
      }

      // Validate researched links
      if (
        sanitizedData.researchedLinks &&
        Array.isArray(sanitizedData.researchedLinks)
      ) {
        sanitizedData.researchedLinks = sanitizedData.researchedLinks.filter(
          (link) => {
            if (!link.url) return false;

            try {
              new URL(link.url);
              return true;
            } catch (e) {
              console.warn(
                `❌ [Researcher] Invalid researched link URL: ${link.url}`
              );
              return false;
            }
          }
        );
      }

      // Validate images to ensure they are proper URLs
      if (
        sanitizedData.visualElements &&
        sanitizedData.visualElements.images &&
        Array.isArray(sanitizedData.visualElements.images)
      ) {
        sanitizedData.visualElements.images =
          sanitizedData.visualElements.images.filter((image) => {
            if (!image.url) return false;

            try {
              new URL(image.url);
              // Additional check: verify the image URL is actually from our scraped content
              const isScrapedImage = allScrapedImages.some(
                (scrapedImg) =>
                  scrapedImg.url === image.url ||
                  image.url.includes(scrapedImg.url)
              );
              if (!isScrapedImage) {
                console.warn(
                  `❌ [Researcher] Image URL not found in scraped content: ${image.url}`
                );
              }
              return isScrapedImage;
            } catch (e) {
              console.warn(`❌ [Researcher] Invalid image URL: ${image.url}`);
              return false;
            }
          });
      }

      // Validate building blocks for builder
      if (sanitizedData.buildingBlocksForBuilder) {
        // Validate essential images
        if (
          sanitizedData.buildingBlocksForBuilder.essentialImages &&
          Array.isArray(sanitizedData.buildingBlocksForBuilder.essentialImages)
        ) {
          sanitizedData.buildingBlocksForBuilder.essentialImages =
            sanitizedData.buildingBlocksForBuilder.essentialImages.filter(
              (image) => {
                if (!image.url) return false;

                try {
                  new URL(image.url);
                  // Verify the image URL is from our scraped content
                  const isScrapedImage = allScrapedImages.some(
                    (scrapedImg) =>
                      scrapedImg.url === image.url ||
                      image.url.includes(scrapedImg.url)
                  );
                  return isScrapedImage;
                } catch (e) {
                  return false;
                }
              }
            );
        }

        // Validate essential links
        if (
          sanitizedData.buildingBlocksForBuilder.essentialLinks &&
          Array.isArray(sanitizedData.buildingBlocksForBuilder.essentialLinks)
        ) {
          sanitizedData.buildingBlocksForBuilder.essentialLinks =
            sanitizedData.buildingBlocksForBuilder.essentialLinks.filter(
              (link) => {
                if (!link.url) return false;

                try {
                  new URL(link.url);
                  // Verify the link URL is from our scraped content
                  const isScrapedLink = allScrapedLinks.some(
                    (scrapedLink) =>
                      scrapedLink.url === link.url ||
                      link.url.includes(scrapedLink.url)
                  );
                  return isScrapedLink;
                } catch (e) {
                  return false;
                }
              }
            );
        }
      } else {
        // If no building blocks were provided, create a default structure with top images and links
        sanitizedData.buildingBlocksForBuilder = {
          essentialImages:
            sanitizedData.visualElements?.images?.slice(0, 5) || [],
          essentialLinks: sanitizedData.researchedLinks?.slice(0, 5) || [],
        };
      }

      // Add chronological content arrays for the builder to use
      sanitizedData._chronologicalData = {
        images: allScrapedImages.slice(0, 50), // Limit to reasonable size
        links: allScrapedLinks.slice(0, 50),
        content: allContentBlocks.slice(0, 50),
      };

      console.log('✅ [Researcher] Data organization and research successful');

      return {
        success: true,
        data: sanitizedData,
      };
    } catch (error) {
      console.error(
        '❌ [Researcher] Error parsing organized data as JSON:',
        error
      );

      // Create a fallback structure with the chronological data
      const fallbackData = {
        profileSummary: {
          name: data.personalInfo?.name || 'Unknown Name',
          title: data.personalInfo?.title || 'Professional',
          industry: data.professionalInfo?.industry || 'Unknown Industry',
        },
        visualElements: {
          images: allScrapedImages.slice(0, 10).map((img) => ({
            url: img.url,
            type: 'scraped image',
            description: img.alt || 'Image from scraped content',
            source: img.source,
          })),
        },
        researchedLinks: allScrapedLinks.slice(0, 10).map((link) => ({
          url: link.url,
          title: link.text || 'Scraped link',
          description: 'Link from scraped content',
          relevance: 'Found in source content',
          source: link.source,
        })),
        buildingBlocksForBuilder: {
          essentialImages: allScrapedImages.slice(0, 5).map((img) => ({
            url: img.url,
            type: 'scraped image',
            purpose: 'Visual content',
          })),
          essentialLinks: allScrapedLinks.slice(0, 5).map((link) => ({
            url: link.url,
            text: link.text || 'Link',
            purpose: 'External reference',
          })),
        },
        contentElements: {
          chronologicalContent: allContentBlocks.slice(0, 10).map((block) => ({
            type: 'text',
            content: block.content,
            source: block.source,
            relevance: 'Content from scraped source',
          })),
        },
        _chronologicalData: {
          images: allScrapedImages.slice(0, 50),
          links: allScrapedLinks.slice(0, 50),
          content: allContentBlocks.slice(0, 50),
        },
      };

      return {
        success: true,
        error:
          'Failed to parse organized data from AI, using fallback structure',
        data: fallbackData,
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
