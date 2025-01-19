// File: /app/api/ai/optimize-layout/route.js
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function POST(request) {
  try {
    // Parse request body
    const data = await request.json();

    // Extract parameters
    const {
      profileDetails,
      items,
      mobileItems,
      theme,
      execute,
      plan,
      analytics,
    } = data;

    console.log('received execute:', execute);
    console.log('received plan:', plan || 'No plan provided');

    // Calculate the current layout score using AI based on UX principles and analytics
    const beforeScore = await calculateLayoutScore(
      items,
      mobileItems,
      analytics,
      profileDetails,
      theme
    );

    // Prepare the prompt for the AI
    let prompt = '';

    if (execute) {
      console.log('Executing with plan:', plan || 'No plan provided');
      // If executing, include detailed instructions to rearrange the items
      prompt = `
        You are a UI/UX layout optimization expert. 
        
        CONTEXT:
        ${JSON.stringify({ profileDetails, theme })}
        
        CURRENT LAYOUT:
        ${JSON.stringify({ items, mobileItems })}
        
        USER PLAN:
        ${plan || 'No specific plan provided. Optimize based on best practices.'}
        
        ANALYTICS DATA:
        ${JSON.stringify(analytics)}
        
        TASK:
        Optimize the layout by rearranging the items based on:
        1. UI/UX best practices
        2. The user plan provided
        3. User engagement patterns from analytics data
        4. Content relevance and user interests shown in analytics
        
        IMPORTANT: 
        1. DO NOT modify any content or properties of the items except their positions.
        2. Only rearrange the items within the 'items' and 'mobileItems' arrays.
        3. Preserve all properties of each item including id, type, content, etc.
        4. Return the complete arrays with the items in their new optimal order.
        5. If analytics show certain content types get more engagement, prioritize those items.
        6. Consider device-specific analytics when arranging mobile vs desktop layouts.
        
        STRICT RULES:
        - You MUST only rearrange the order of the 'items' and 'mobileItems' arrays.
        - Do NOT add, remove, or duplicate any cards.
        - The output 'items' and 'mobileItems' arrays MUST have exactly the same length and elements (by id) as the input arrays.
        - If you cannot comply, return an error message in the JSON.
        
        Your response MUST be a valid JSON object with these exact fields:
        {
          "items": [...rearranged items array...],
          "mobileItems": [...rearranged mobileItems array...],
          "analysis": "A brief analysis of the improvements made, including how analytics data influenced the layout",
          "improvements": ["improvement 1", "improvement 2", ...],
          "afterScore": 85 // A numeric score (1-100) for the optimized layout
        }
        
        IMPORTANT OUTPUT RULES:
        - Respond ONLY with a valid JSON object.
        - Do NOT include any explanation, markdown, or comments.
        - Do NOT include any text before or after the JSON.
        - Do NOT use trailing commas.
        - All string values must use double quotes.
        - The JSON must be parseable by JSON.parse in JavaScript.
      `;
    } else {
      // If just generating a plan
      prompt = `
        You are a UI/UX layout optimization expert.
        
        CONTEXT:
        ${JSON.stringify({ profileDetails, theme })}
        
        CURRENT LAYOUT:
        ${JSON.stringify({ items, mobileItems })}
        
        ANALYTICS DATA:
        ${JSON.stringify(analytics)}
        
        TASK:
        Analyze the current layout and create an optimization plan.
        Consider:
        1. UI/UX best practices and principles
        2. Analytics data showing user engagement patterns
        3. Content relevance and user interests derived from analytics
        4. Device-specific behavior patterns (mobile vs desktop)
        
        DO NOT actually modify the layout yet. Give crisp and clean recommendations.
        
        Return a JSON response with these example fields:
        {
          "plan": "A detailed optimization plan explaining what will be changed, with specific reference to how analytics data influenced your recommendations",
          "analyticsInsights": ["insight 1", "insight 2", ...],
          "expectedImprovements": ["improvement 1", "improvement 2", ...],
          "afterScore": 85 // A predicted score (1-100) for the optimized layout
        }
        
        Current layout score (beforeScore): ${beforeScore}
      `;
    }

    // Add any previous plan to the prompt if available
    if (plan && !execute) {
      prompt += `\n\nPREVIOUS plan: ${plan}\nPlease provide a different optimization approach based on this plan.`;
    }

    // Call the AI model
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    console.log('AI response length:', responseText.length);
    console.log('AI response preview:', responseText.substring(0, 200) + '...');

    // Parse the AI response
    let aiResponse;
    try {
      // Extract the JSON part from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : responseText;

      // Log the extracted JSON string
      console.log('Extracted JSON length:', jsonString.length);

      try {
        // First try direct parsing
        aiResponse = JSON.parse(jsonString);
        console.log('JSON parsed successfully on first attempt');
      } catch (parseError) {
        // If direct parsing fails, try to repair the JSON
        console.log('JSON parse error, attempting repair:', parseError.message);

        try {
          // Try to repair the JSON
          const repairedJson = jsonrepair(jsonString);
          console.log(
            'JSON repair attempted, repaired length:',
            repairedJson.length
          );

          // Try parsing the repaired JSON
          aiResponse = JSON.parse(repairedJson);
          console.log('JSON parsed successfully after repair');
        } catch (repairError) {
          console.error('JSON repair failed:', repairError.message);
          throw new Error(`Failed to repair JSON: ${repairError.message}`);
        }
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to parse AI response: ' + error.message,
          rawResponse: responseText.substring(0, 500) + '...', // Include part of the raw response for debugging
        },
        { status: 500 }
      );
    }

    // Prepare the response
    if (execute) {
      // Validate that the AI returned the rearranged items
      if (
        !aiResponse.items ||
        !Array.isArray(aiResponse.items) ||
        !aiResponse.mobileItems ||
        !Array.isArray(aiResponse.mobileItems)
      ) {
        console.error('AI did not return valid items arrays:', aiResponse);
        return NextResponse.json(
          {
            success: false,
            error: 'AI did not return valid layout arrays',
            rawResponse: aiResponse,
          },
          { status: 500 }
        );
      }

      // Verify the returned arrays have the same length as the input arrays
      if (
        aiResponse.items.length < items.length ||
        aiResponse.mobileItems.length < mobileItems.length
      ) {
        console.error('AI returned arrays with incorrect length:', {
          originalItems: items.length,
          returnedItems: aiResponse.items.length,
          originalMobileItems: mobileItems.length,
          returnedMobileItems: aiResponse.mobileItems.length,
        });
        return NextResponse.json(
          {
            success: false,
            error: 'AI returned arrays with incorrect length',
            rawResponse: aiResponse,
          },
          { status: 500 }
        );
      }

      // For execution requests, return the optimized layout
      return NextResponse.json({
        success: true,
        items: aiResponse.items,
        mobileItems: aiResponse.mobileItems,
        analysis: aiResponse.analysis || 'Layout optimized successfully.',
        improvements: aiResponse.improvements || [],
        beforeScore: beforeScore,
        afterScore: aiResponse.afterScore || Math.min(beforeScore + 10, 100),
      });
    } else {
      // For plan requests, return the plan
      return NextResponse.json({
        success: true,
        items: items,
        mobileItems: mobileItems,
        plan: aiResponse.plan || 'Optimization plan generated.',
        analyticsInsights: aiResponse.analyticsInsights || [],
        expectedImprovements: aiResponse.expectedImprovements || [],
        beforeScore: beforeScore,
        afterScore: aiResponse.afterScore || Math.min(beforeScore + 10, 100),
      });
    }
  } catch (error) {
    console.error('Error in optimize-layout API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred during layout optimization',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * Calculate a layout score based on basic heuristics
 * This is a simplified version - in production, you'd want more sophisticated scoring
 */
/**
 * Calculate layout score by calling the AI to evaluate based on UX principles and analytics
 * @param {Array} items - Desktop layout items
 * @param {Array} mobileItems - Mobile layout items
 * @param {Object} analytics - Analytics data for informing layout decisions
 * @param {Object} profileDetails - Profile information for context
 * @param {Object} theme - Theme information
 * @returns {Promise<number>} - Layout score between 0-100
 */
async function calculateLayoutScore(
  items,
  mobileItems,
  analytics = null,
  profileDetails = null,
  theme = null
) {
  if (!items || !items.length) return 50; // Default score if no items

  try {
    // Prepare the prompt for the AI to evaluate the layout
    const prompt = `
      You are a UI/UX layout evaluation expert.
      
      CONTEXT:
      ${JSON.stringify({ profileDetails, theme })}
      
      LAYOUT TO EVALUATE:
      ${JSON.stringify({ items, mobileItems })}
      
      ANALYTICS DATA:
      ${JSON.stringify(analytics)}
      
      TASK:
      Evaluate the current layout based on UI/UX best practices, considering:
      1. Visual hierarchy and information architecture
      2. Content organization and grouping
      3. Spacing and alignment
      4. Responsive design implementation
      5. User flow and navigation
      6. Accessibility considerations
      7. User engagement patterns from analytics data
      8. Industry best practices
      
      Return a JSON response with these fields:
      {
        "score": 75, // A numeric score between 0-100
        "analysis": "Brief analysis of current layout strengths and weaknesses",
        "recommendations": ["recommendation 1", "recommendation 2", ...]
      }
      
      IMPORTANT OUTPUT RULES:
      - Respond ONLY with a valid JSON object.
      - Do NOT include any explanation, markdown, or comments.
      - Do NOT include any text before or after the JSON.
      - Do NOT use trailing commas.
      - All string values must use double quotes.
      - The JSON must be parseable by JSON.parse in JavaScript.
    `;

    // Call the AI model
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the AI response
    try {
      // Extract the JSON part from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      const jsonString = jsonMatch ? jsonMatch[0] : responseText;

      try {
        // First try direct parsing
        const scoreData = JSON.parse(jsonString);
        return scoreData.score || 60;
      } catch (parseError) {
        // If direct parsing fails, try to repair the JSON
        console.log('JSON parse error in score calculation, attempting repair');
        const repairedJson = jsonrepair(jsonString);
        const scoreData = JSON.parse(repairedJson);
        return scoreData.score || 60;
      }
    } catch (error) {
      console.error('Error parsing AI score response:', error);
    }

    // Return a default score if AI scoring fails
    return 60;
  } catch (error) {
    console.error('Error in AI scoring:', error);
    return 60; // Default score if AI scoring fails
  }
}
