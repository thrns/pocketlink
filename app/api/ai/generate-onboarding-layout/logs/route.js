/**
 * Logs API Route for Onboarding Layout Generation
 *
 * Simple API route to handle logging for onboarding layout generation
 */

export async function GET(req) {
  return Response.json({
    status: 'ok',
    message: 'Onboarding layout logs endpoint is working',
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Here you could store logs in a database or file
    console.log('Onboarding layout generation log:', body);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error processing onboarding layout log:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
