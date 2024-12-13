import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Get authorization header
    const authorization = request.headers.get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    if (!channelId || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const accessToken = authorization.replace('Bearer ', '');

    // Call YouTube Analytics API
    const response = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&metrics=subscribersGained,subscribersLost&sort=day&ids=channel%3D%3D${channelId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube Analytics API error (subscribers):', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch subscriber data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching subscriber data:', error);
    return NextResponse.json(
      {
        error:
          error.message || 'An error occurred while fetching subscriber data',
      },
      { status: 500 }
    );
  }
}
