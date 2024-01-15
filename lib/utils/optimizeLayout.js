const optimizeLayout = async ({
  profileDetails,
  items,
  mobileItems,
  theme,
  analytics = null,
  execute = false,
  plan = '',
}) => {
  try {
    // Validate inputs
    if (!profileDetails || !items || !mobileItems) {
      console.warn('Missing required parameters for optimizeLayout');
      return {
        success: false,
        error: 'Missing required parameters',
        items: [],
        mobileItems: [],
        plan: null,
        beforeScore: null,
        afterScore: null,
      };
    }

    // Prepare the payload
    const payload = {
      profileDetails,
      items: items || [],
      mobileItems: mobileItems || [],
      theme: theme || {},
      execute: execute || false,
      plan: plan,
      analytics: analytics,
    };

    // Make the API call to our internal endpoint
    const response = await fetch('/api/ai/optimize-layout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check for successful response
    if (!response.ok) {
      console.error('Error optimizing layout:', response.status);
      // Return error object
      return {
        success: false,
        error: `API responded with status ${response.status}`,
        items: [],
        mobileItems: [],
        plan: null,
        beforeScore: null,
        afterScore: null,
      };
    }

    // Parse the response
    const result = await response.json();

    return {
      ...result,
      success: true,
    };
  } catch (error) {
    console.error('Error in optimizeLayout:', error);
    // Return error object on exception
    return {
      success: false,
      error: error.message || 'Unknown error occurred',
      items: [],
      mobileItems: [],
      plan: null,
      beforeScore: null,
      afterScore: null,
    };
  }
};

export default optimizeLayout;
