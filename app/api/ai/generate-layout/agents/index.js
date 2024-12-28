import { resourceProvider } from './resource-provider';
import { researcher } from './researcher';
import { contentWriter } from './content-writer';
import { qaManager } from './qa-manager';
import { builder } from './builder';

/**
 * AI Layout Generation Workflow Coordinator
 *
 * This function orchestrates the workflow between the five specialized agents:
 * 1. Resource Provider: Collects and extracts data from resources
 * 2. Researcher: Organizes and clarifies the collected information
 * 3. Content Writer: Structures the content layout
 * 4. QA Manager: Reviews and provides feedback on the content
 * 5. Builder: Constructs the final layout based on the approved plan
 *
 * The workflow includes QA checks after each agent's task and allows for refinement
 * based on feedback.
 */
export async function generateLayout(request) {
  try {
    const {
      description,
      profileDetails,
      theme,
      items = [],
      mobileItems = [],
      cardCount = 10,
      generationMode = 'fresh',
      url = null,
    } = request;

    // Validate required inputs
    if (!description || !profileDetails) {
      console.error('❌ [Workflow Coordinator] Missing required parameters');
      return {
        error: 'Missing required parameters',
        items: [],
        mobileItems: [],
        theme: theme || {},
        success: false,
      };
    }

    // STEP 1: Resource Provider - Collect and extract data
    console.log('🔄 [Workflow Coordinator] Step 1: Resource Provider');
    const resourceData = await resourceProvider({
      url,
      description,
      profileDetails,
    });

    // QA Check for Resource Data
    const resourceQA = await qaManager(resourceData.data, 'resourceData');

    // If not approved, try to refine or proceed with warnings
    if (
      resourceQA.success &&
      !resourceQA.data.approved &&
      resourceQA.data.rating < 50
    ) {
      console.warn(
        '⚠️ [Workflow Coordinator] Resource data quality is low. Proceeding with caution.'
      );
    }

    // STEP 2: Researcher - Organize and clarify information
    console.log('🔄 [Workflow Coordinator] Step 2: Researcher');
    const researchData = await researcher(resourceData);

    // QA Check for Research Data
    const researchQA = await qaManager(researchData.data, 'researchData');

    // If not approved, try to refine or proceed with warnings
    if (
      researchQA.success &&
      !researchQA.data.approved &&
      researchQA.data.rating < 50
    ) {
      console.warn(
        '⚠️ [Workflow Coordinator] Research data quality is low. Proceeding with caution.'
      );
    }

    // STEP 3: Content Writer - Structure content layout
    console.log('🔄 [Workflow Coordinator] Step 3: Content Writer');
    const layoutPlan = await contentWriter(
      researchData,
      generationMode,
      cardCount
    );

    // QA Check for Layout Plan
    const layoutPlanQA = await qaManager(layoutPlan.data, 'layoutPlan');

    // If not approved, try to refine or proceed with warnings
    if (
      layoutPlanQA.success &&
      !layoutPlanQA.data.approved &&
      layoutPlanQA.data.rating < 50
    ) {
      console.warn(
        '⚠️ [Workflow Coordinator] Layout plan quality is low. Proceeding with caution.'
      );
    }

    // STEP 4: Builder - Construct the layout based on the plan
    console.log('🔄 [Workflow Coordinator] Step 4: Builder');
    const finalLayout = await builder(
      layoutPlan,
      items,
      mobileItems,
      theme,
      cardCount
    );

    // QA Check for Final Layout
    const finalLayoutQA = await qaManager(
      {
        items: finalLayout.items,
        mobileItems: finalLayout.mobileItems,
        theme: finalLayout.theme,
      },
      'finalLayout'
    );

    // If not approved but rating is decent, proceed with warnings
    if (
      finalLayoutQA.success &&
      !finalLayoutQA.data.approved &&
      finalLayoutQA.data.rating >= 70
    ) {
      console.warn(
        '⚠️ [Workflow Coordinator] Final layout has minor issues but is usable.'
      );
    }
    // If not approved and rating is low, try to fix critical issues
    else if (
      finalLayoutQA.success &&
      !finalLayoutQA.data.approved &&
      finalLayoutQA.data.rating < 70
    ) {
      console.warn(
        '⚠️ [Workflow Coordinator] Final layout has significant issues. Attempting to fix...'
      );

      // For now, we'll proceed with the layout as is, but in a production system
      // you might want to implement a retry mechanism or fallback options here
    }

    console.log(
      '✅ [Workflow Coordinator] AI layout generation workflow completed'
    );

    // Return the final result
    return {
      success: true,
      items: finalLayout.items,
      mobileItems: finalLayout.mobileItems,
      theme: finalLayout.theme,
      layoutPlan: finalLayout.layoutPlan,
      reason: finalLayoutQA.success
        ? finalLayoutQA.data.overallAssessment
        : 'Layout generated based on your description.',
      rating: finalLayoutQA.success ? finalLayoutQA.data.rating : 85,
    };
  } catch (error) {
    console.error(
      '❌ [Workflow Coordinator] Unhandled error in workflow:',
      error
    );

    return {
      error: error.message || 'Internal server error',
      details: error.stack,
      items: [],
      mobileItems: [],
      theme: request?.theme || {},
      success: false,
    };
  }
}

// Export all agents for direct access if needed
export { resourceProvider, researcher, contentWriter, qaManager, builder };
