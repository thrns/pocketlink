/**
 * Generate a full layout based on user description
 * Uses Gemini API through our internal endpoint to get AI-generated complete layouts
 */

const generateFullLayout = async ({
  userPrompt,
  profileDetails,
  themeData,
  items,
  mobileItems,
  cardCount = 10,
  generationMode = 'fresh',
}) => {
  try {
    // Validate inputs
    if (!userPrompt) {
      console.warn('Missing userPrompt parameters for generateFullLayout');
      return {
        items: [],
        mobileItems: [],
        theme: themeData || {},
        success: false,
      };
    }

    // Prepare the payload
    const payload = {
      description: userPrompt,
      profileDetails,
      theme: themeData || {},
      items: items || [],
      mobileItems: mobileItems || [],
      cardCount: cardCount || 10,
      generationMode: generationMode || 'fresh',
    };

    // Make the API call to our internal endpoint
    const response = await fetch('/api/ai/generate-layout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check for successful response
    if (!response.ok) {
      console.error('Error generating full layout:', response.status);
      // Return error object
      return {
        success: false,
        error: `API responded with status ${response.status}`,
        items: [],
        mobileItems: [],
        theme: themeData || {},
      };
    }

    // Parse the response
    const result = await response.json();

    // Ensure theme is included in the result
    if (!result.themeData) {
      result.themeData = themeData || {};
    }

    return result;
  } catch (error) {
    console.error('Error in generateFullLayout:', error);
    // Return error object on exception
    return {
      success: false,
      error: error.message || 'Unknown error occurred',
      items: [],
      mobileItems: [],
      theme: themeData || {},
    };
  }
};

export default generateFullLayout;
