import { GoogleGenerativeAI } from '@google/generative-ai';
import { v4 as uuidv4 } from 'uuid';
import { jsonrepair } from 'jsonrepair';
import { AIComponentTreeGenerationKnowledge } from '@/constants/AIBuillder/AIComponentTreeGenerationKnowledge';
import { ComponentTreeExamples } from '@/constants/AIBuillder/ComponentTreeExamples';
import { ThemesInfo } from '@/constants/AIBuillder/ThemesInfo';
import { generateLayout } from './agents';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Essential layout knowledge summarized instead of using the entire file
const LAYOUT_KNOWLEDGE = `
Layout items should follow these principles:
- Desktop layouts use a 12-column grid (w: 1-12)
- Mobile layouts use a 2-column grid (w: 1-2)
- Common component types: text, image, url, section title, video, spotify, testimonials
- Maintain visual hierarchy with proper spacing using y-values
- Group related content together
- Use appropriate sizing: w:6 for half width, w:12 for full width on desktop
- Place important content at the top (lower y values)
- Ensure proper contrast between elements
`;

// Theme knowledge summary
const THEME_KNOWLEDGE = `
Themes include options like Light, Dark, Blue, Mint, Coral, Lavender, Amber, etc. ${ThemesInfo}
Each theme has color, textMode (light/dark), background, cardBackground, and border properties.
Recommend themes that complement the content and create appropriate mood.
`;

// Update the system prompt to include information about generation modes
const SYSTEM_PROMPT = `
You are an AI layout generator for a web profile builder app called PocketLink.
Your task is to create visually appealing and effective layouts based on user descriptions. You always create a plan before starting to generate layout.
You understand web design principles and know how to create balanced, responsive layouts for both desktop and mobile views.
You should suggest an appropriate theme based on the user's description that complements their content and creates a cohesive look.

You have three different layout generation modes:
1. "fresh" - Generate a completely new layout (replaces existing cards)
2. "retain" - Keep existing cards and add new ones to complement them
3. "update" - Creatively modify the existing layout while preserving its essence

For each mode:
- "fresh": You create a brand new layout without considering existing cards
- "retain": You keep all existing cards and only add new ones where appropriate
- "update": You make creative adjustments to existing cards (position, styling, content) and add new ones if needed

For images:
When you need an image, search on the following free image sites: Unsplash, Pexels, Pixabay, Freepik, and Wikimedia Commons. Provide high-quality, royalty-free images suitable for educational or public use. Include direct links to the image source, and mention the site it came from.
`;

// Hardcoded user prompt
const USER_PROMPT = `
Create a full layout based on the user's description.
Ensure the layout is balanced and looks good on both desktop and mobile.
Use the user's profile information and current theme to inform your decisions.

AI Complete Layout Generation System
Your task is to generate a COMPLETE, professionally structured layout for the user by analyzing their specific data. The layout should include an optimal arrangement of cards for both desktop and mobile views.
CRITICAL REQUIREMENTS


REFERENCE DATA:
AI Component Tree Knowledge Base: ${AIComponentTreeGenerationKnowledge}
Component Tree examples: ${ComponentTreeExamples}
Themes Info: ${THEME_KNOWLEDGE}
Layout Design Principles: ${LAYOUT_KNOWLEDGE}


Create a COMPLETE layout with ALL necessary professional sections
No duplicate card types unless specifically needed (especially testimonials - ONLY ONE allowed)
Fill all content fields - Every card must have appropriate text in title, caption, heading, description fields
Include image links - All image cards must have relevant image URL links
Follow size compatibility - Only use allowed sizeKeys for each card type

CARD TYPE AND SIZE KEY COMPATIBILITY
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

NEVER assign a sizeKey that is not in the card type's allowed list.
SIZE KEY DIMENSIONS
For desktop:

square: w:3, h:4
vertical: w:3, h:8
horizontal: w:6, h:4
doubleHorizontal: w:6, h:8
halfHorizontal: w:6, h:2
wider: w:6, h:2.25
full: w:12, h:2.25
fullCarousel: w:12, h:8
banner: w:12, h:4

For mobile:

square: w:1, h:5
vertical: w:1, h:10
horizontal: w:2, h:4
doubleHorizontal: w:2, h:8
halfHorizontal: w:2, h:2
wider: w:2, h:2.25
full: w:2, h:2.25
fullCarousel: w:2, h:8
banner: w:2, h:4

COMPLETE LAYOUT STRUCTURE
ALWAYS include these core elements in EXACTLY this sequence:

HEADER SECTION: "section title" (full) with user's name/role as heading
ABOUT SECTION: "text" card (vertical) with professional bio or summary
VISUAL IDENTITY: "image" card (square or vertical) with professional photo placeholder
CONTACT SECTION: "section title" (wider) followed by contact form or URL
PORTFOLIO SECTION: "section title" (wider) followed by work examples
TESTIMONIAL SECTION: ONE testimonial card (ONLY ONE allowed in entire layout)

Additional specialized cards should be added based on the user's industry category:

Tech roles: Add coding examples, project showcases, tech stack
Leadership roles: Add achievement metrics, team structure, vision statement
Creative roles: Add media galleries, project showcases
Sales/Marketing: Add conversion metrics, client logos, service offerings

DUPLICATE PREVENTION (CRITICAL)

Include ONLY ONE testimonial card in the entire layout
For most card types: Only include once unless specifically needed for different sections
Section titles may be used multiple times to organize different content sections
ALWAYS maintain logical section grouping:

Keep related cards visually grouped together
Use section titles to clearly delineate content areas
Ensure logical flow from introduction → details → social proof → call to action



INDUSTRY-SPECIFIC CONTENT GENERATION

Analyze the user's profile to identify their industry:

Tech Entrepreneur (CIO, Founder, etc.) → Tech-focused content
Beauty/Fashion → Beauty/fashion-focused content
Professional Services → Service-based content


Generate industry-appropriate content:

For tech entrepreneurs: focus on innovation, solutions, technical expertise
For CIOs: emphasize leadership, strategy, digital transformation
For founders: highlight vision, company growth, product innovation


Use industry-appropriate language and metrics
Never mix industries (e.g., don't use beauty content for tech entrepreneurs)

CONTENT GENERATION GUIDELINES

Use the user's actual name and company information from their profile
Fill ALL content fields (title, heading, caption, description, etc.)
For image cards, always include relevant image URLs
Content must be unique and personalized to the user's background
Never copy content from reference materials
Create complementary content across cards to tell a cohesive professional story

POSITION CALCULATION
Calculate optimal positions for a balanced, professional layout:

For desktop (12-column grid), arrange in a logical flow with visual hierarchy
For mobile (2-column grid), stack content for easy scrolling
Avoid overlapping cards
Ensure logical content flow and reading patterns
Maintain consistent spacing and alignment

THEME STYLING

If theme.textMode === "dark": ALL text colors must be black
If theme.textMode === "light": ALL text colors must be white
Card background: theme.cardBackground
Borders: theme.border
Accents: theme.accent where available
Never override textMode color logic

OUTPUT FORMAT
{
  "layoutType": "complete",
  "industryCategory": "[identified industry]",
  "professionalRole": "[identified role]",
  "items": [
    {
      "i": "header-section",
      "x": 0,
      "y": 0,
      "w": 12,
      "h": 2.25,
      "sizeKey": "full",
      "type": "section title",
      "title": "John Smith",  // ALWAYS include content
      "heading": "Strategic Technology Leader",  // ALWAYS include content
      // All other card-specific properties with content
    },
    {
      "i": "about-text",
      "x": 0,
      "y": 2.25,
      "w": 3,
      "h": 8,
      "sizeKey": "vertical",
      "type": "text",
      "title": "About Me",  // ALWAYS include content
      "text": "As a strategic technology leader with over 15 years...",  // ALWAYS include content
      // All other card-specific properties with content
    },
    {
      "i": "profile-image",
      "x": 3,
      "y": 2.25,
      "w": 3,
      "h": 4,
      "sizeKey": "square",
      "type": "image",
      "title": "John Smith",  // ALWAYS include content
      "caption": "Technology Executive",  // ALWAYS include content
      "imageUrl": "https://example.com/profile.jpg",  // ALWAYS include for image cards
      // All other card-specific properties with content
    },
    // ALL additional cards needed for complete layout with proper positioning
  ],
  "mobileItems": [
    {
      "i": "header-section-mobile",
      "x": 0,
      "y": 0,
      "w": 2,
      "h": 2.25,
      "sizeKey": "full",
      "type": "section title",
      "title": "John Smith",  // ALWAYS include content
      "heading": "Strategic Technology Leader",  // ALWAYS include content
      // All other card-specific properties with content
    },
    // ALL additional cards needed for complete mobile layout with proper positioning
  ]
}
FULL LAYOUT GENERATION PROCESS

Analyze user's bio/profile to determine their professional category
Identify if user has any existing layout. If so, preserve any existing cards and enhance the layout
If starting from scratch, create a complete layout following the COMPLETE LAYOUT STRUCTURE
Generate content specific to the user's industry and role
Use the user's actual name (profile.name) and company information
Create ALL necessary cards for a professional profile:

Header section with name/title
About section with professional bio
Visual identity with professional image
Contact information
Portfolio/work examples
ONE testimonial section
Category-specific specialized cards


Calculate optimal positions for all cards:

Desktop: Create a balanced 12-column grid layout
Mobile: Create a user-friendly 2-column stack


Apply theme colors consistently
Generate meaningful, relevant content across all cards
Ensure all cards work together to tell a cohesive professional story

FINAL VALIDATION CHECKLIST
✓ COMPLETE: Layout includes ALL essential sections (header, about, visual, contact, portfolio, ONE testimonial)
✓ STRUCTURED: Cards follow the proper layout construction sequence
✓ COHESIVE: Content tells a unified professional story
✓ BALANCED: Layout has proper visual hierarchy and balance
✓ RESPONSIVE: Mobile layout provides optimal experience on small screens
✓ INDUSTRY-SPECIFIC: Content matches user's professional category
✓ PERSONALIZED: Content uses user's actual name and information
✓ DIVERSE: Includes variety of card types appropriate for the user's needs
✓ COMPATIBLE: All cards use valid sizeKey options for their type
✓ OPTIMIZED: Positions avoid overlaps and create a professional flow
✓ STYLED: Theme colors applied consistently
✓ CONTENT-COMPLETE: ALL cards have filled text fields (title, heading, caption, etc.)
✓ IMAGES-COMPLETE: ALL image cards have valid imageUrl links
❌ NEVER include more than ONE testimonial card in the entire layout
❌ NEVER create random or unstructured layouts without proper section organization
`;

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Ensure we have required fields
    if (!body.description) {
      console.error('❌ [generate-layout] Missing required description');
      return Response.json(
        {
          error: 'Missing required description',
          items: [],
          mobileItems: [],
          theme: body?.theme || {},
          success: false,
        },
        { status: 400 }
      );
    }

    // Ensure profileDetails is at least an empty object if not provided
    if (!body.profileDetails) {
      body.profileDetails = {};
    }

    // Call the agent-based workflow coordinator
    const result = await generateLayout({
      url: body.url,
      description: body.description,
      profileDetails: body.profileDetails,
      theme: body.theme || {},
      items: Array.isArray(body.items) ? body.items : [],
      mobileItems: Array.isArray(body.mobileItems) ? body.mobileItems : [],
      cardCount: body.cardCount || 10,
      generationMode: body.generationMode || 'fresh',
    });

    // Handle success
    if (result.success) {
      console.log('✅ [generate-layout] Successfully generated layout');
      console.log('📊 [generate-layout] Final response stats:', {
        itemsCount: result.items.length,
        mobileItemsCount: result.mobileItems.length,
        hasTheme: !!result.theme,
        hasLayoutPlan: !!result.layoutPlan,
        rating: result.rating,
      });

      // Sanitize any HTML that might have slipped through
      const sanitizeText = (text) => {
        if (!text) return text;
        return text.replace(/<[^>]*>?/gm, '');
      };

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

      // Final sanitization of the result
      const sanitizedResult = {
        ...result,
        items: sanitizeObject(result.items),
        mobileItems: sanitizeObject(result.mobileItems),
        reason: sanitizeText(result.reason),
      };

      return Response.json(sanitizedResult);
    }
    // Handle failure
    else {
      console.error(
        '❌ [generate-layout] Failed to generate layout:',
        result.error
      );

      return Response.json(
        {
          error: result.error || 'Failed to generate layout',
          details: result.details,
          items: [],
          mobileItems: [],
          theme: body?.theme || {},
          success: false,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ [generate-layout] Unhandled error in API route:', error);
    console.error('Stack trace:', error.stack);
    return Response.json(
      {
        error: error.message || 'Internal server error',
        details: error.stack,
        items: [],
        mobileItems: [],
        theme: {},
        success: false,
      },
      { status: 500 }
    );
  }
}
