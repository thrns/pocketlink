import { generateLayout } from './shared-agents';

/**
 * Layout Generation Pipeline Handler
 *
 * This endpoint handles layout generation requests and initiates the AI agent pipeline
 * to generate layouts based on user input.
 *
 * @param {Request} req - The incoming request
 * @returns {Response} - JSON response with the generated layout or error
 */
export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { categories, profile, options = {} } = body;

    // Validate input
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return Response.json(
        {
          success: false,
          error: 'Categories are required and must be a non-empty array',
        },
        { status: 400 }
      );
    }

    if (!profile || typeof profile !== 'object') {
      return Response.json(
        {
          success: false,
          error: 'Profile information is required and must be an object',
        },
        { status: 400 }
      );
    }

    console.log(
      `📊 [Layout Pipeline] Generating layout for ${categories.length} categories`
    );

    // Set request timeout to 2 minutes
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);

    try {
      // Call the shared generateLayout function
      const result = await generateLayout({ categories, profile }, options);

      // Clear timeout
      clearTimeout(timeoutId);

      if (!result.success) {
        console.error('❌ [Layout Pipeline] Generation failed:', result.error);
        return Response.json(
          {
            success: false,
            error: result.error || 'Layout generation failed',
          },
          { status: 500 }
        );
      }

      // Return successful response
      return Response.json({
        success: true,
        data: result.data,
      });
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('⏱️ [Layout Pipeline] Request timed out after 2 minutes');
        return Response.json(
          {
            success: false,
            error: 'Request timed out - layout generation exceeded 2 minutes',
          },
          { status: 408 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error('❌ [Layout Pipeline] Unhandled error:', error);

    return Response.json(
      {
        success: false,
        error: error.message || 'Internal server error',
        details: error.stack,
      },
      { status: 500 }
    );
  }
}
