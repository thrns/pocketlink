import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';
import { v4 as uuidv4 } from 'uuid';
import { AIComponentTreeGenerationKnowledge } from '@/constants/AIBuillder/AIComponentTreeGenerationKnowledge';
import { ComponentTreeExamples } from '@/constants/AIBuillder/ComponentTreeExamples';
import { ThemesInfo } from '@/constants/AIBuillder/ThemesInfo';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Builder Agent (Agent 5)
 *
 * Responsibilities:
 * 1. Upon QA approval, refer to "AIComponentTreeGenerationKnowledge" for available tools and options
 * 2. Use "ComponentTreeExamples" to construct the layout as specified
 * 3. Ensure the output is returned in the desired JSON format, following optimal instructions
 * 4. Use only real images and links from the research data
 * 5. Prevent any HTML content in the output
 */
export async function builder(
  layoutPlan,
  existingItems = [],
  existingMobileItems = [],
  theme = {},
  cardCount = 10
) {
  console.log('🔍 [Builder] Starting layout construction...');

  try {
    if (!layoutPlan || !layoutPlan.success || !layoutPlan.data) {
      console.error('❌ [Builder] Missing or invalid layout plan');
      return {
        success: false,
        error: 'Missing or invalid layout plan',
        items: [],
        mobileItems: [],
        theme: theme,
      };
    }

    const plan = layoutPlan.data;

    // Format existing items for reference
    const formatItems = (items) => {
      if (!items || !items.length) return 'No items currently.';
      return items
        .map(
          (item) =>
            `Type: ${item.type || 'unknown'}, Position: x=${item.x}, y=${item.y}, w=${item.w}, h=${item.h}`
        )
        .join('\n');
    };

    // Extract real links and images from the layout plan for reference
    const extractRealResources = (plan) => {
      const resources = {
        links: [],
        images: [],
        socialLinks: [],
      };

      try {
        // Extract links from researchedLinks if available
        if (plan.researchedLinks && Array.isArray(plan.researchedLinks)) {
          resources.links = plan.researchedLinks.map((link) => ({
            url: link.url,
            title: link.title,
            description: link.description,
          }));
        }

        // Extract social links if available
        if (
          plan.contactInfo &&
          plan.contactInfo.socialLinks &&
          Array.isArray(plan.contactInfo.socialLinks)
        ) {
          resources.socialLinks = plan.contactInfo.socialLinks.map((link) => ({
            platform: link.platform,
            url: link.url,
            username: link.username,
          }));
        }

        // Extract images if available
        if (plan.mediaContent && Array.isArray(plan.mediaContent)) {
          resources.images = plan.mediaContent
            .filter((media) => media.type === 'image' && media.url)
            .map((media) => ({
              url: media.url,
              description: media.description,
            }));
        }

        // Add profile image if available
        if (plan.personalInfo && plan.personalInfo.avatarUrl) {
          resources.images.push({
            url: plan.personalInfo.avatarUrl,
            description: 'Profile image',
          });
        }
      } catch (error) {
        console.warn('⚠️ [Builder] Error extracting resources:', error.message);
      }

      return resources;
    };

    const resources = extractRealResources(plan);

    // Construct prompt for layout building
    const buildPrompt = `
    You are a Builder agent for PocketLink, a web profile builder application.
    Your task is to construct a complete layout based on the provided layout plan.

    LAYOUT PLAN:
    ${JSON.stringify(plan, null, 2)}

    AVAILABLE RESOURCES (ONLY USE THESE REAL LINKS AND IMAGES):
    LINKS: ${JSON.stringify(resources.links, null, 2)}
    SOCIAL LINKS: ${JSON.stringify(resources.socialLinks, null, 2)}
    IMAGES: ${JSON.stringify(resources.images, null, 2)}

    CURRENT DESKTOP ITEMS:
    ${formatItems(existingItems)}
    
    CURRENT MOBILE ITEMS:
    ${formatItems(existingMobileItems)}
    
    CURRENT THEME:
    ${JSON.stringify(theme, null, 2)}
    
    THEME INFO:
    ${ThemesInfo}
    
    AI COMPONENT KNOWLEDGE:
    ${AIComponentTreeGenerationKnowledge}
    
    COMPONENT EXAMPLES:
    ${ComponentTreeExamples}

    INSTRUCTIONS:
    1. Create a complete layout with desktop and mobile versions
    2. Follow the sections and components outlined in the layout plan
    3. Calculate optimal positions for all components
    4. For desktop: Use a 12-column grid (w: 1-12)
    5. For mobile: Use a 2-column grid (w: 1-2)
    6. Ensure all components have appropriate size keys
    7. Fill all content fields with the suggested content from the layout plan
    8. ONLY use real image URLs from the AVAILABLE RESOURCES section - DO NOT create fake URLs
    9. ONLY use real links from the AVAILABLE RESOURCES section - DO NOT create fake links
    10. DO NOT include any HTML tags in content fields
    11. Apply the theme consistently across all components using the theme properties
    12. Follow the style guidelines from AIComponentTreeGenerationKnowledge and ComponentTreeExamples

    CARD TYPE AND SIZE KEY COMPATIBILITY:
    Each card type has specific allowed size keys:

    url, image, video, nestedCard, text: square, vertical, halfHorizontal, horizontal, doubleHorizontal
    youtubeCard: vertical, horizontal, doubleHorizontal
    mapCard: square, vertical, horizontal, doubleHorizontal
    carouselCard: square, vertical, horizontal, doubleHorizontal, fullCarousel
    testimonials: doubleHorizontal, fullCarousel
    spotifyCard: horizontal, doubleHorizontal
    driveCard: doubleHorizontal
    counterCard, countdownTimerCard: square, vertical, horizontal, doubleHorizontal
    bannerCard: banner
    shopCard, formCard, calendarCard: square, vertical, doubleHorizontal
    section title: wider, full

    SIZE KEY DIMENSIONS:
    For desktop:
    - square: w:3, h:4
    - vertical: w:3, h:8
    - horizontal: w:6, h:4
    - doubleHorizontal: w:6, h:8
    - halfHorizontal: w:6, h:2
    - wider: w:6, h:2.25
    - full: w:12, h:2.25
    - fullCarousel: w:12, h:8
    - banner: w:12, h:4

    For mobile:
    - square: w:1, h:5
    - vertical: w:1, h:10
    - horizontal: w:2, h:4
    - doubleHorizontal: w:2, h:8
    - halfHorizontal: w:2, h:2
    - wider: w:2, h:2.25
    - full: w:2, h:2.25
    - fullCarousel: w:2, h:8
    - banner: w:2, h:4

    Return your layout in the following JSON format:
    {
      "items": [
        {
          "i": "unique-id",
          "x": 0,
          "y": 0,
          "w": 12,
          "h": 2.25,
          "sizeKey": "full",
          "type": "section title",
          "title": "Title text",
          "heading": "Heading text",
          ... (other component-specific properties)
        },
        ... (more desktop items)
      ],
      "mobileItems": [
        {
          "i": "unique-id-mobile",
          "x": 0,
          "y": 0,
          "w": 2,
          "h": 2.25,
          "sizeKey": "full",
          "type": "section title",
          "title": "Title text",
          "heading": "Heading text",
          ... (other component-specific properties)
        },
        ... (more mobile items)
      ],
      "theme": {
        "name": "theme_name",
        "color": "primary_color_hex",
        "textMode": "light" or "dark",
        "background": "background_color_hex",
        "cardBackground": "card_background_color_hex",
        "border": "border_color_hex",
        "accent": "accent_color_hex"
      }
    }
    `;

    console.log('🔮 [Builder] Calling Gemini API for layout construction...');

    // Call Gemini API for layout construction
    const buildResult = await model.generateContent(buildPrompt);
    const buildResponse = await buildResult.response;
    const buildText = buildResponse.text();

    console.log(
      `📄 [Builder] Layout construction length: ${buildText.length} characters`
    );

    // Extract JSON from the response
    let jsonStr = '';
    try {
      // Find JSON in the response
      const jsonStartIndex = buildText.indexOf('{');
      const jsonEndIndex = buildText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      jsonStr = buildText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      const layout = JSON.parse(repairedJson);

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

      // Sanitize the entire layout
      const sanitizedLayout = {
        items: sanitizeObject(layout.items || []),
        mobileItems: sanitizeObject(layout.mobileItems || []),
        theme: sanitizeObject(layout.theme || {}),
      };

      console.log('✅ [Builder] Layout construction successful');

      // Add unique IDs if missing
      if (sanitizedLayout.items && Array.isArray(sanitizedLayout.items)) {
        sanitizedLayout.items = sanitizedLayout.items.map((item) => {
          if (!item.i) {
            item.i = uuidv4();
          }
          return item;
        });
      }

      if (
        sanitizedLayout.mobileItems &&
        Array.isArray(sanitizedLayout.mobileItems)
      ) {
        sanitizedLayout.mobileItems = sanitizedLayout.mobileItems.map(
          (item) => {
            if (!item.i) {
              item.i = uuidv4();
            }
            return item;
          }
        );
      }

      // Ensure we have the theme in the response
      if (
        !sanitizedLayout.theme ||
        Object.keys(sanitizedLayout.theme).length === 0
      ) {
        sanitizedLayout.theme = theme || {};
      }

      // Validate image URLs in items
      const validateImageURLs = (items) => {
        if (!items || !Array.isArray(items)) return items;

        return items.map((item) => {
          // For image type components
          if (item.type === 'image' && item.image) {
            try {
              new URL(item.image);
            } catch (e) {
              console.warn(
                `❌ [Builder] Invalid image URL in item: ${item.image}`
              );
              // Remove invalid image URL
              item.image = '';
            }
          }

          // For url type components with displayImage
          if (item.type === 'url' && item.displayImage) {
            try {
              new URL(item.displayImage);
            } catch (e) {
              console.warn(
                `❌ [Builder] Invalid displayImage URL in url item: ${item.displayImage}`
              );
              // Remove invalid displayImage URL
              item.displayImage = null;
            }
          }

          return item;
        });
      };

      sanitizedLayout.items = validateImageURLs(sanitizedLayout.items);
      sanitizedLayout.mobileItems = validateImageURLs(
        sanitizedLayout.mobileItems
      );

      return {
        success: true,
        items: Array.isArray(sanitizedLayout.items)
          ? sanitizedLayout.items
          : [],
        mobileItems: Array.isArray(sanitizedLayout.mobileItems)
          ? sanitizedLayout.mobileItems
          : [],
        theme: sanitizedLayout.theme,
        layoutPlan:
          plan.layoutPlan || 'Layout constructed based on the provided plan.',
      };
    } catch (error) {
      console.error('❌ [Builder] Error parsing layout as JSON:', error);

      return {
        success: false,
        error: 'Failed to parse layout',
        rawData: buildText.substring(0, 1000) + '...',
        items: [],
        mobileItems: [],
        theme: theme,
      };
    }
  } catch (error) {
    console.error('❌ [Builder] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
      items: [],
      mobileItems: [],
      theme: theme,
    };
  }
}
