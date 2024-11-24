import fetch from 'node-fetch';

export async function POST(req) {
  try {
    const body = await req.json();
    const { domain } = body;

    if (!domain) {
      return new Response(
        JSON.stringify({ success: false, message: 'Domain is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('~~~~~~~~~~~~ Verifying domain ~~~~~~~~~~~:', domain);

    // Perform HTTP HEAD request to check if the domain resolves
    const response = await fetch(`http://${domain}`, { method: 'HEAD' });

    console.log('Response status:', response.status);

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          status: response.status,
          message: 'Domain Verified',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          status: response.status,
          message: 'Domain is not linked correctly.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error during verification:', error.message);

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Error during verification',
        error: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
