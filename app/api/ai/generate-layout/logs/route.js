/**
 * Logs API Route
 *
 * Simple API route to handle logging for layout generation
 */

export async function GET(req) {
  return Response.json({ status: 'ok', message: 'Logs endpoint is working' });
}

export async function POST(req) {
  try {
    const body = await req.json();

    // Here you could store logs in a database or file
    console.log('Layout generation log:', body);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error processing log:', error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
