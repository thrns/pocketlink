import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token is required' },
        { status: 400 }
      );
    }

    // Exchange refresh token for an access token
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Google API credentials are not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google token refresh error:', errorData);
      return NextResponse.json(
        { error: 'Failed to refresh Google access token' },
        { status: response.status }
      );
    }

    const tokenData = await response.json();

    return NextResponse.json({
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
    });
  } catch (error) {
    console.error('Error refreshing Google token:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during token refresh' },
      { status: 500 }
    );
  }
}
