import { v4 as uuidv4 } from 'uuid';
import { jsonrepair } from 'jsonrepair';
import { generateOnboardingLayout } from './agents';

export async function POST(request) {
  console.log('🔍 [generate-onboarding-layout] API request received');
  try {
    // Parse request body
    const body = await request.json();
    console.log('📦 [generate-onboarding-layout] Request body parsed:', {
      categories: body.categories?.length || 0,
      hasTemplate: !!body.templateItems,
      hasProfile: !!body.profile,
      hasTheme: !!body.theme,
    });

    const {
      categories = [],
      templateItems = [],
      templateMobileItems = [],
      profile = {},
      theme = {},
    } = body;

    // Validate required inputs
    if (!categories || categories.length === 0) {
      console.error(
        '❌ [generate-onboarding-layout] Missing required parameters',
        {
          hasCategories: !!categories && categories.length > 0,
        }
      );
      return Response.json(
        {
          error: 'Missing required parameters',
          items: [],
          mobileItems: [],
          theme: theme || {},
          success: false,
        },
        { status: 400 }
      );
    }

    // Prepare input data for the onboarding layout generator
    const inputData = {
      categories,
      profile,
      templateItems,
      templateMobileItems,
      theme,
    };

    console.log(
      '🚀 [generate-onboarding-layout] Calling onboarding layout generator...'
    );

    // Call the generateOnboardingLayout function
    const result = await generateOnboardingLayout(inputData);

    console.log(
      '✅ [generate-onboarding-layout] Layout generation completed:',
      {
        success: result.success,
        hasItems: result.data?.items?.length || 0,
        hasMobileItems: result.data?.mobileItems?.length || 0,
      }
    );

    if (!result.success) {
      console.error(
        '❌ [generate-onboarding-layout] Layout generation failed:',
        result.error
      );

      return Response.json(
        {
          error: result.error || 'Failed to generate layout',
          details: result.details,
          items: [],
          mobileItems: [],
          theme: theme || {},
          success: false,
        },
        { status: 500 }
      );
    }

    // Add unique IDs if missing
    if (result.data.items && Array.isArray(result.data.items)) {
      result.data.items = result.data.items.map((item) => {
        if (!item.i) {
          item.i = uuidv4();
        }
        return item;
      });
    }

    if (result.data.mobileItems && Array.isArray(result.data.mobileItems)) {
      result.data.mobileItems = result.data.mobileItems.map((item) => {
        if (!item.i) {
          item.i = uuidv4();
        }
        return item;
      });
    }

    // Ensure we have the theme in the response
    if (!result.data.theme) {
      console.log('🔧 [generate-onboarding-layout] Using fallback theme');
      result.data.theme = theme || {};
    }

    const finalResponse = {
      items: Array.isArray(result.data.items) ? result.data.items : [],
      mobileItems: Array.isArray(result.data.mobileItems)
        ? result.data.mobileItems
        : [],
      theme: result.data.theme,
      success: true,
    };

    console.log('✅ [generate-onboarding-layout] Successfully built response');
    console.log('📊 [generate-onboarding-layout] Final response stats:', {
      itemsCount: finalResponse.items.length,
      mobileItemsCount: finalResponse.mobileItems.length,
      hasTheme: !!finalResponse.theme,
    });

    return Response.json(finalResponse);
  } catch (error) {
    console.error(
      '❌ [generate-onboarding-layout] Unhandled error in API route:',
      error
    );
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
