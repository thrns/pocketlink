import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';
import { AIComponentTreeGenerationKnowledge } from '@/constants/AIBuillder/AIComponentTreeGenerationKnowledge';

// Initialize Gemini API with Builder Agent API key
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_BUILDER_AGENT_ENGINE_ID
);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Builder Agent
 *
 * Responsibilities:
 * 1. Generate a complete layout based on researcher data
 * 2. Create the component structure for both desktop and mobile views
 * 3. Follow best practices from the AI Component Tree Generation Knowledge
 * 4. Generate appropriate theme suggestions for the layout
 * 5. Ensure all components have proper sizing and positioning
 */
export async function builder(researchData) {
  console.log('🏗️ [Builder] Starting layout generation...');

  try {
    if (!researchData || !researchData.success || !researchData.data) {
      console.error('❌ [Builder] Missing or invalid research data');
      return {
        success: false,
        error: 'Missing or invalid research data',
        data: null,
      };
    }

    const data = researchData.data;

    // Extract profile summary and sections from the research data
    const profileSummary = data.profileSummary || {};
    const themeSuggestions = data.themeSuggestions || {};
    const sections = data.sections || [];
    const uniqueSellingPoints = data.uniqueSellingPoints || [];
    const recommendedResources = data.recommendedResources || {
      images: [],
      links: [],
      chronologicalElements: [],
    };

    // Extract raw chronological data for additional context
    const chronologicalData = data._chronologicalData || {
      images: [],
      links: [],
      content: [],
    };

    // Log extracted data for debugging
    console.log(
      `🏗️ [Builder] Building layout with ${sections.length} sections and ${recommendedResources.images.length} images`
    );

    // Prepare inputs for the Builder prompt
    const profileInfo = {
      title: profileSummary.title || 'Professional Profile',
      description: profileSummary.description || 'Profile description',
      industry: profileSummary.industry || 'General',
      keywords: profileSummary.keywords || [],
    };

    const themeInfo = {
      primaryColor: themeSuggestions.primaryColor || '#4a90e2',
      secondaryColor: themeSuggestions.secondaryColor || '#f5f5f5',
      styleNotes: themeSuggestions.styleNotes || 'Clean, professional layout',
    };

    // System prompt for the Builder
    const systemPrompt = `
You are the Builder Agent for PocketLink's Onboarding Layout Generator.

Your task is to create a complete, visually appealing onboarding layout based on the 
researched information about the user. You will generate the component structure for 
both desktop and mobile views, ensuring they follow best practices from the AI Component 
Tree Generation Knowledge.

Guidelines:
1. Create a complete layout with all necessary sections (header, about, portfolio, contact, etc.)
2. Generate appropriate theme suggestions based on the user's industry and preferences
3. Ensure all components have proper sizing and positioning
4. Follow the component compatibility rules for size keys
5. Create a balanced, visually pleasing layout that flows naturally
6. Generate a mobile layout that maintains the content hierarchy of the desktop layout

For each component:
- Assign unique IDs
- Specify x, y coordinates and width/height for positioning
- Use appropriate size keys based on component type
- Include all required content fields (title, text, description, etc.)
- Provide actual image URLs for image components
`;

    // User prompt with research data and layout requirements
    const userPrompt = `
PROFILE SUMMARY:
${JSON.stringify(profileInfo, null, 2)}

THEME SUGGESTIONS:
${JSON.stringify(themeInfo, null, 2)}

SECTIONS (${sections.length}):
${JSON.stringify(sections, null, 2)}

UNIQUE SELLING POINTS (${uniqueSellingPoints.length}):
${JSON.stringify(uniqueSellingPoints, null, 2)}

RECOMMENDED RESOURCES:
${JSON.stringify(recommendedResources, null, 2)}

COMPONENT TREE GENERATION KNOWLEDGE:
${AIComponentTreeGenerationKnowledge}

Create a complete onboarding layout with the following requirements:

1. The layout should include:
   - Header section with the user's name/title
   - About section with professional bio
   - Sections for each category provided
   - Contact information
   - Visual elements (images, videos) that support the content
   - Testimonials or social proof (if available)
   - Call to action elements

2. For desktop layout:
   - Use a 12-column grid system
   - Ensure proper spacing and alignment
   - Create a balanced visual hierarchy

3. For mobile layout:
   - Use a 2-column grid system
   - Stack elements appropriately for mobile viewing
   - Maintain the same content with adjusted positioning

4. Suggest an appropriate theme that:
   - Complements the user's industry
   - Creates a cohesive visual identity
   - Uses the theme suggestions provided

Return your response in the following JSON format:

{
  "layoutPlan": "Detailed explanation of the layout design strategy",
  "items": [
    {
      "i": "unique-id",
      "x": 0,
      "y": 0,
      "w": 12,
      "h": 2.25,
      "sizeKey": "full",
      "type": "section title",
      "title": "User Name",
      "heading": "Professional Title"
    }
    // Additional items for desktop layout
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
      "title": "User Name",
      "heading": "Professional Title"
    }
    // Additional items for mobile layout
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

    console.log('🔮 [Builder] Calling Gemini API for layout generation...');

    // Call Gemini API with the prompt
    const builderResult = await model.generateContent([
      { role: 'system', parts: [{ text: systemPrompt }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ]);

    const builderResponse = await builderResult.response;
    const builderText = builderResponse.text();

    console.log(
      `📄 [Builder] Layout generation response length: ${builderText.length} characters`
    );

    // Extract JSON from the response
    let layoutData;
    try {
      // Find JSON in the response
      const jsonStartIndex = builderText.indexOf('{');
      const jsonEndIndex = builderText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      const jsonStr = builderText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      layoutData = JSON.parse(repairedJson);

      console.log('✅ [Builder] Layout generation successful');

      return {
        success: true,
        data: layoutData,
      };
    } catch (error) {
      console.error('❌ [Builder] Error processing layout data:', error);

      // Return error response
      return {
        success: false,
        error: error.message || 'Failed to generate layout',
        details: error.stack,
      };
    }
  } catch (error) {
    console.error('❌ [Builder] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
