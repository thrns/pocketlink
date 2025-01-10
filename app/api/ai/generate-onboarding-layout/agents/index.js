import { resourceProvider } from './resource-provider';
import { researcher } from './researcher';
import { builder } from './builder';
import { qaManager } from './qa-manager';
import { fixerAgent } from './fixer-agent';

/**
 * Generate Onboarding Layout
 *
 * This function orchestrates the flow of data through multiple specialized AI agents
 * to generate a personalized onboarding layout based on user categories and profile.
 *
 * The flow is:
 * 1. Resource Provider: Extracts URLs and content from input data
 * 2. Researcher: Analyzes and organizes the collected content
 * 3. Builder: Generates the layout components directly from research
 * 4. QA Manager: Evaluates the quality of the generated layout
 * 5. Fixer: Ensures all components have the correct sizes and properties
 *
 * @param {Object} input - The input data containing categories and profile information
 * @returns {Promise<Object>} The generated layout data
 */
export async function generateOnboardingLayout(input) {
  console.log(
    '🚀 [Onboarding Layout Generator] Starting generation process...'
  );

  try {
    // Step 1: Resource Provider - Extract URLs and content
    console.log(
      '🔄 [Onboarding Layout Generator] Calling Resource Provider...'
    );
    const resourceResult = await resourceProvider(input);

    if (!resourceResult.success) {
      console.error(
        '❌ [Onboarding Layout Generator] Resource Provider failed:',
        resourceResult.error
      );
      return resourceResult;
    }

    console.log(
      '✅ [Onboarding Layout Generator] Resource Provider completed successfully'
    );

    // Step 2: Researcher - Analyze and organize content
    console.log('🔄 [Onboarding Layout Generator] Calling Researcher...');
    const researchResult = await researcher(resourceResult);

    if (!researchResult.success) {
      console.error(
        '❌ [Onboarding Layout Generator] Researcher failed:',
        researchResult.error
      );
      return researchResult;
    }

    console.log(
      '✅ [Onboarding Layout Generator] Researcher completed successfully'
    );

    // Step 3: Builder - Generate layout directly from research
    console.log('🔄 [Onboarding Layout Generator] Calling Builder...');
    const builderResult = await builder(researchResult);

    if (!builderResult.success) {
      console.error(
        '❌ [Onboarding Layout Generator] Builder failed:',
        builderResult.error
      );
      return builderResult;
    }

    console.log(
      '✅ [Onboarding Layout Generator] Builder completed successfully'
    );

    // Step 4: QA Manager - Evaluate layout quality
    console.log('🔄 [Onboarding Layout Generator] Calling QA Manager...');
    const qaResult = await qaManager(builderResult);

    if (!qaResult.success) {
      console.error(
        '❌ [Onboarding Layout Generator] QA Manager failed:',
        qaResult.error
      );
      return qaResult;
    }

    console.log(
      '✅ [Onboarding Layout Generator] QA Manager completed successfully'
    );

    // Check if the layout passed QA
    const evaluation = qaResult.data.evaluation;
    const passedQA = evaluation && evaluation.pass === true;

    console.log(
      `📊 [Onboarding Layout Generator] QA Result: ${passedQA ? 'PASS' : 'FAIL'}, Score: ${evaluation ? evaluation.score : 'N/A'}`
    );

    if (!passedQA) {
      console.warn(
        '⚠️ [Onboarding Layout Generator] Layout did not pass QA check'
      );

      // Could implement retry logic here if needed
      // For now, we'll continue with the fixer to see if it can improve the layout
    }

    // Step 5: Fixer - Ensure components have correct sizes and properties
    console.log('🔄 [Onboarding Layout Generator] Calling Fixer...');
    const fixerResult = await fixerAgent(qaResult);

    if (!fixerResult.success) {
      console.error(
        '❌ [Onboarding Layout Generator] Fixer failed:',
        fixerResult.error
      );
      return fixerResult;
    }

    console.log(
      '✅ [Onboarding Layout Generator] Fixer completed successfully'
    );
    console.log(
      `📊 [Onboarding Layout Generator] Fixes applied: ${fixerResult.data.fixes?.length || 0}`
    );

    // Return the final result with all data from the pipeline
    console.log(
      '🎉 [Onboarding Layout Generator] Layout generation completed successfully'
    );

    return {
      success: true,
      data: {
        items: fixerResult.data.items || [],
        mobileItems: fixerResult.data.mobileItems || [],
        theme: fixerResult.data.theme || {},
        evaluation: fixerResult.data.evaluation || {},
        fixes: fixerResult.data.fixes || [],
        layoutPlan: fixerResult.data.layoutPlan || '',
      },
    };
  } catch (error) {
    console.error('❌ [Onboarding Layout Generator] Unhandled error:', error);

    return {
      success: false,
      error: error.message || 'Internal server error',
      details: error.stack,
    };
  }
}
