import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code, redirectUri } = await request.json();

    if (!code || !redirectUri) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET, // Using the available env var
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        // Scope for Gmail API access - ensure all required scopes are included
        scope:
          'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
      }),
    });

    if (!tokenResponse.ok) {
      let errorMessage = 'Failed to exchange authorization code';
      try {
        const errorData = await tokenResponse.json();
        console.error('Token exchange error:', errorData);
        errorMessage =
          errorData.error_description || errorData.error || errorMessage;
      } catch (parseError) {
        console.error('Error parsing token response:', parseError);
        const errorText = await tokenResponse.text();
        console.error('Raw error response:', errorText);
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: tokenResponse.status || 400 }
      );
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.refresh_token) {
      console.warn(
        'No refresh token received. This may happen if the user has already granted permission.'
      );
    }

    // Return only what's needed by the client
    return NextResponse.json({
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
    });
  } catch (error) {
    console.error('Gmail token exchange error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
