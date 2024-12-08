// /app/api/youtube/channel/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get authorization header (Bearer token)
    const authorization = request.headers.get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace('Bearer ', '');
    console.log(
      'Fetching YouTube channel with token',
      accessToken.substring(0, 5) + '...'
    );

    // Call YouTube API to get the user's channel with detailed debugging
    try {
      // First try to get the channel using 'mine=true'
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&mine=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        }
      );

      // Log the response status
      console.log('YouTube API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API error:', errorData);

        if (response.status === 404) {
          return NextResponse.json(
            {
              error:
                'Channel not found. The user may not have a YouTube channel.',
            },
            { status: 404 }
          );
        }

        return NextResponse.json(
          { error: 'Failed to fetch YouTube channel data', details: errorData },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log(
        'YouTube channel data retrieved, items count:',
        data.items?.length || 0
      );

      // Check if we got any channels back
      if (!data.items || data.items.length === 0) {
        console.log(
          'No channels found with mine=true, trying with OAuth userinfo'
        );

        // If no channels found, try to get the YouTube account using the userinfo endpoint
        const userInfoResponse = await fetch(
          'https://www.googleapis.com/oauth2/v2/userinfo',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
            },
          }
        );

        if (!userInfoResponse.ok) {
          console.error(
            'Failed to get user info:',
            await userInfoResponse.json()
          );
          return NextResponse.json(
            {
              error:
                'No YouTube channel found. You may need to create a YouTube channel for this Google account.',
              items: [],
            },
            { status: 200 } // Send 200 with empty items to allow the frontend to handle gracefully
          );
        }

        const userInfo = await userInfoResponse.json();
        console.log(
          'User info retrieved:',
          JSON.stringify(userInfo).substring(0, 100) + '...'
        );

        // Return a blank channel schema with the user info
        return NextResponse.json({
          items: [],
          pageInfo: {
            totalResults: 0,
            resultsPerPage: 0,
          },
          userInfo: {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          },
        });
      }

      return NextResponse.json(data);
    } catch (fetchError) {
      console.error('Error during YouTube API fetch:', fetchError);
      return NextResponse.json(
        {
          error: 'Network error accessing YouTube API',
          message: fetchError.message,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unhandled error in YouTube channel route:', error);
    return NextResponse.json(
      {
        error: error.message || 'An error occurred while fetching channel data',
      },
      { status: 500 }
    );
  }
}
