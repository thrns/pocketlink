import { GoogleGenerativeAI } from '@google/generative-ai';
import { jsonrepair } from 'jsonrepair';

// Initialize Gemini API with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * QA Manager Agent (Agent 4)
 *
 * Responsibilities:
 * 1. Review drafts provided by each agent after completion of their tasks
 * 2. Provide detailed feedback if the content is unsatisfactory; otherwise, approve the content
 * 3. Pass feedback along with the respective agent-generated content back to the concerned agent for refinement
 */
export async function qaManager(content, contentType) {
  console.log(`🔍 [QA Manager] Reviewing ${contentType} content...`);

  try {
    if (!content || !contentType) {
      console.error('❌ [QA Manager] Missing content or content type');
      return {
        success: false,
        error: 'Missing content or content type',
        data: null,
      };
    }

    // Define QA criteria based on content type
    let qaCriteria = '';

    switch (contentType) {
      case 'resourceData':
        qaCriteria = `
        RESOURCE DATA QA CRITERIA:
        1. Completeness: All required fields are present
        2. Accuracy: Information appears accurate and consistent
        3. Relevance: Data is relevant to creating a professional web profile
        4. Structure: Data is well-organized and properly categorized
        5. Formatting: URLs, emails, and other formatted data follow proper conventions
        `;
        break;

      case 'researchData':
        qaCriteria = `
        RESEARCH DATA QA CRITERIA:
        1. Organization: Information is clearly organized into logical categories
        2. Clarity: Data is labeled and presented in a way that's easy to understand
        3. Completeness: All key profile elements are identified and categorized
        4. Insights: Industry category and professional role are correctly identified
        5. Structure: Suggested content structure is appropriate for the profile type
        `;
        break;

      case 'layoutPlan':
        qaCriteria = `
        LAYOUT PLAN QA CRITERIA:
        1. Structure: Plan follows a logical and professional structure
        2. Completeness: All necessary sections are included
        3. Component Selection: Appropriate components are selected for each section
        4. Content Suggestions: Content suggestions are specific and relevant
        5. Theme: Theme recommendation complements the content
        `;
        break;

      case 'finalLayout':
        qaCriteria = `
        FINAL LAYOUT QA CRITERIA:
        1. Structure: Layout follows a logical and professional structure
        2. Completeness: All necessary sections and components are included
        3. Positioning: Components are positioned optimally for visual hierarchy
        4. Responsiveness: Both desktop and mobile layouts are well-designed
        5. Content: All content fields are filled with appropriate text
        6. Images: All image components have valid URLs
        7. Theme: Theme colors are applied consistently
        8. Compatibility: All components use valid size keys for their type
        `;
        break;

      default:
        qaCriteria = `
        GENERAL QA CRITERIA:
        1. Quality: Content meets professional standards
        2. Completeness: All necessary information is included
        3. Structure: Content is well-organized and logical
        4. Relevance: Content is relevant to the purpose
        5. Format: Content follows proper formatting conventions
        `;
    }

    // Construct prompt for QA review
    const qaPrompt = `
    You are a QA Manager agent for PocketLink, a web profile builder application.
    Your task is to review the content provided and assess its quality based on specific criteria.

    CONTENT TYPE: ${contentType}
    
    CONTENT TO REVIEW:
    ${JSON.stringify(content, null, 2)}

    ${qaCriteria}

    INSTRUCTIONS:
    1. Review the content based on the criteria above
    2. Identify any issues or areas for improvement
    3. Provide specific feedback for each issue found
    4. If no issues are found, approve the content
    5. Rate the overall quality on a scale of 0-100

    Return your review in the following JSON format:
    {
      "approved": true/false,
      "rating": 0-100,
      "feedback": {
        "strengths": [
          "Strength 1",
          "Strength 2",
          "..."
        ],
        "weaknesses": [
          "Weakness 1",
          "Weakness 2",
          "..."
        ]
      },
      "specificFeedback": [
        {
          "issue": "Description of the issue",
          "location": "Where the issue is found",
          "suggestion": "Suggested improvement"
        }
      ],
      "overallAssessment": "Summary of the review"
    }
    `;

    console.log('🔮 [QA Manager] Calling Gemini API for QA review...');

    // Call Gemini API for QA review
    const qaResult = await model.generateContent(qaPrompt);
    const qaResponse = await qaResult.response;
    const qaText = qaResponse.text();

    console.log(
      `📄 [QA Manager] QA review length: ${qaText.length} characters`
    );

    // Extract JSON from the response
    let jsonStr = '';
    try {
      // Find JSON in the response
      const jsonStartIndex = qaText.indexOf('{');
      const jsonEndIndex = qaText.lastIndexOf('}') + 1;

      if (jsonStartIndex === -1 || jsonEndIndex <= 0) {
        throw new Error('Invalid response format - no JSON found');
      }

      jsonStr = qaText.substring(jsonStartIndex, jsonEndIndex);
      const repairedJson = jsonrepair(jsonStr);
      const qaReview = JSON.parse(repairedJson);

      console.log(
        `✅ [QA Manager] QA review complete. Approved: ${qaReview.approved}, Rating: ${qaReview.rating}`
      );

      return {
        success: true,
        data: qaReview,
        originalContent: content,
      };
    } catch (error) {
      console.error('❌ [QA Manager] Error parsing QA review as JSON:', error);

      return {
        success: false,
        error: 'Failed to parse QA review',
        rawData: qaText.substring(0, 1000) + '...',
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
