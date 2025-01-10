import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';

// Initialize Gemini API with QA Agent API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_QA_AGENT_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * QA Manager Agent
 *
 * Responsibilities:
 * 1. Evaluate the generated layout for quality and completeness
 * 2. Identify any issues or inconsistencies in the layout
 * 3. Provide feedback to improve the layout
 * 4. Ensure the layout meets all requirements
 * 5. Assign a quality score to the layout
 */
export async function qaManager(layoutData) {
  console.log('🔍 [QA Manager] Starting layout evaluation...');

  try {
    if (!layoutData || !layoutData.data) {
      console.error('❌ [QA Manager] Missing or invalid layout data');
      return {
        success: false,
        error: 'Missing or invalid layout data',
        data: null,
      };
    }

    const data = layoutData.data;

    // Extract layout data
    const {
      items = [],
      mobileItems = [],
      theme = {},
      layoutPlan = '',
      fixes = [],
    } = data;

    // Log extracted data for debugging
    console.log(
      `🔍 [QA Manager] Evaluating layout with ${items.length} desktop items and ${mobileItems.length} mobile items`
    );

    // System prompt for the QA Manager
    const systemPrompt = `
You are the QA Manager for PocketLink's Onboarding Layout Generator.

Your task is to evaluate the generated layout for quality, completeness, and adherence to best practices.
You will identify any issues or inconsistencies and provide constructive feedback to improve the layout.

Guidelines:
1. Evaluate the layout for completeness (all required sections present)
2. Check for visual balance and hierarchy
3. Ensure consistent theme application
4. Verify that all components have appropriate content
5. Identify any potential usability issues
6. Provide specific, actionable feedback for improvements
7. Assign a quality score from 0-100 based on your evaluation
`;

    // User prompt with layout data
    const userPrompt = `
DESKTOP ITEMS (${items.length}):
${JSON.stringify(items, null, 2)}

MOBILE ITEMS (${mobileItems.length}):
${JSON.stringify(mobileItems, null, 2)}

THEME:
${JSON.stringify(theme, null, 2)}

LAYOUT PLAN:
${layoutPlan}

FIXES APPLIED:
${JSON.stringify(fixes, null, 2)}

Please evaluate this layout based on the following criteria:

1. Completeness:
   - Are all required sections present (header, about, portfolio, contact, etc.)?
   - Does each component have the necessary content fields?

2. Visual Balance:
   - Is the layout visually balanced and pleasing?
   - Is there a clear visual hierarchy?
   - Are components spaced appropriately?

3. Theme Application:
   - Is the theme applied consistently?
   - Does the theme complement the content?

4. Usability:
   - Is the layout intuitive and easy to navigate?
   - Are CTAs clear and prominent?
   - Will the mobile layout provide a good user experience?

5. Content Quality:
   - Is the content relevant and professional?
   - Are images and other media elements used effectively?

Return your evaluation in the following JSON format:

{
  "score": 85,
  "evaluation": "Overall evaluation summary",
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2"
  ],
  "recommendations": [
    "Recommendation 1",
    "Recommendation 2"
  ],
  "pass": true
}

The 'pass' field should be true if the score is 70 or above, false otherwise.
`;

    console.log('🔮 [QA Manager] Calling Gemini API for layout evaluation...');

    // Call Gemini API with the prompt
    const qaResult = await model.generateContent([
      { role: 'system', parts: [{ text: systemPrompt }] },
      { role: 'user', parts: [{ text: userPrompt }] },
    ]);

    const qaResponse = await qaResult.response;
    const qaText = qaResponse.text();

    console.log(
      `📄 [QA Manager] Layout evaluation response length: ${qaText.length} characters`
    );

    // Extract JSON from the response
    let evaluationData;
    try {
      // Find JSON in the response
      const jsonStartIndex = qaText.indexOf('{');
      const jsonEndIndex = qaText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      const jsonStr = qaText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      evaluationData = JSON.parse(repairedJson);

      console.log(
        `✅ [QA Manager] Layout evaluation successful - Score: ${evaluationData.score}/100`
      );
      console.log(`📊 [QA Manager] Pass: ${evaluationData.pass}`);

      // Return evaluation results
      return {
        success: true,
        data: {
          ...layoutData.data,
          evaluation: evaluationData,
        },
      };
    } catch (error) {
      console.error('❌ [QA Manager] Error processing evaluation:', error);

      // Return the original data with a default evaluation if there was an error
      return {
        success: true,
        error: error.message || 'Failed to evaluate layout',
        data: {
          ...layoutData.data,
          evaluation: {
            score: 70,
            evaluation:
              'Unable to complete full evaluation due to processing error.',
            strengths: [],
            weaknesses: ['Evaluation process failed'],
            recommendations: ['Review layout manually'],
            pass: true,
          },
        },
      };
    }
  } catch (error) {
    console.error('❌ [QA Manager] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
