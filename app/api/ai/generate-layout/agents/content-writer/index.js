import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';
import { AIComponentTreeGenerationKnowledge } from '@/constants/AIBuillder/AIComponentTreeGenerationKnowledge';
import { ThemesInfo } from '@/constants/AIBuillder/ThemesInfo';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Essential layout knowledge summarized
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

/**
 * Content Writer Agent (Agent 3)
 *
 * Responsibilities:
 * 1. Structure the content layout by determining the arrangement and placement of elements
 * 2. Utilize "AIComponentTreeGenerationKnowledge" and "ThemesInfo" for content curation
 * 3. Develop a detailed draft for review and provide it to the QA Manager
 */
export async function contentWriter(
  researchData,
  generationMode = 'fresh',
  cardCount = 10
) {
  console.log('🔍 [Content Writer] Starting content structuring...');

  try {
    if (!researchData || !researchData.success || !researchData.data) {
      console.error('❌ [Content Writer] Missing or invalid research data');
      return {
        success: false,
        error: 'Missing or invalid research data',
        data: null,
      };
    }

    const data = researchData.data;

    // Generate mode-specific instructions
    let modeInstructions = '';
    switch (generationMode) {
      case 'retain':
        modeInstructions = `
        RETAIN MODE INSTRUCTIONS:
        - Keep ALL existing cards exactly as they are - do not modify their content or position
        - Only add NEW cards that complement the existing ones
        - Ensure new cards fit logically with the existing layout
        - Do not duplicate card types that already exist
        - Focus on filling gaps in the layout structure
        `;
        break;
      case 'update':
        modeInstructions = `
        UPDATE MODE INSTRUCTIONS:
        - Creatively update the existing layout while preserving its core structure
        - You MAY adjust positions, styling, and minor content elements of existing cards
        - You MAY add new cards that enhance the layout
        - Maintain the same general theme and purpose of the layout
        - Focus on improving visual hierarchy, readability, and overall aesthetics
        `;
        break;
      case 'fresh':
      default:
        modeInstructions = `
        FRESH MODE INSTRUCTIONS:
        - Create a completely new layout from scratch
        - Do not consider existing cards - they will be replaced
        - Generate approximately ${cardCount} cards to create a complete layout
        - Ensure the layout is comprehensive and follows professional structure
        `;
        break;
    }

    // Construct prompt for layout planning
    const planPrompt = `
    You are a Content Writer agent for PocketLink, a web profile builder application.
    Your task is to create a strategic layout plan with clear content suggestions based on the organized research data.

    RESEARCH DATA:
    ${JSON.stringify(data, null, 2)}

    GENERATION MODE: ${generationMode}
    ${modeInstructions}

    AI COMPONENT KNOWLEDGE:
    ${AIComponentTreeGenerationKnowledge}

    THEME KNOWLEDGE:
    ${THEME_KNOWLEDGE}

    LAYOUT KNOWLEDGE:
    ${LAYOUT_KNOWLEDGE}

    INSTRUCTIONS:
    1. Create a comprehensive layout plan based on the research data
    2. Define clear sections that follow a logical structure
    3. For each section, specify the components to use with rationale
    4. Provide content suggestions for each component
    5. Recommend a theme that complements the content

    Return your layout plan in the following JSON format:
    {
      "layoutPlan": "Detailed explanation of the layout structure and approach",
      "sections": [
        {
          "name": "Section name",
          "purpose": "What this section accomplishes",
          "components": [
            {
              "type": "component type (text, image, etc.)",
              "content": "Specific content for this component",
              "size": "Suggested size (vertical, horizontal, etc.)",
              "rationale": "Why this component is needed here"
            }
          ]
        }
      ],
      "themeRecommendation": {
        "name": "Recommended theme name",
        "rationale": "Why this theme fits the content"
      }
    }
    `;

    console.log(
      '🔮 [Content Writer] Calling Gemini API for layout planning...'
    );

    // Call Gemini API for layout planning
    const planResult = await model.generateContent(planPrompt);
    const planResponse = await planResult.response;
    const planText = planResponse.text();

    console.log(
      `📄 [Content Writer] Layout plan length: ${planText.length} characters`
    );

    // Extract JSON from the response
    let jsonStr = '';
    try {
      // Find JSON in the response
      const jsonStartIndex = planText.indexOf('{');
      const jsonEndIndex = planText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      jsonStr = planText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      const layoutPlan = JSON.parse(repairedJson);

      console.log('✅ [Content Writer] Layout plan created successfully');

      return {
        success: true,
        data: layoutPlan,
      };
    } catch (error) {
      console.error(
        '❌ [Content Writer] Error parsing layout plan as JSON:',
        error
      );

      return {
        success: false,
        error: 'Failed to parse layout plan',
        rawData: planText.substring(0, 1000) + '...',
      };
    }
  } catch (error) {
    console.error('❌ [Content Writer] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
