import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');

    // Get authorization header
    const authorization = request.headers.get('Authorization');

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Invalid authorization' },
        { status: 401 }
      );
    }

    if (!channelId) {
      return NextResponse.json(
        { error: 'Channel ID is required' },
        { status: 400 }
      );
    }

    const accessToken = authorization.replace('Bearer ', '');

    // Calculate dates (last 28 days for demographics)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 28);

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Call YouTube Analytics API for demographics
    const response = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=ageGroup,gender&metrics=viewerPercentage&sort=gender,ageGroup&ids=channel%3D%3D${channelId}&startDate=${startDateStr}&endDate=${endDateStr}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube Analytics API error (demographics):', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch demographics data' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching demographics data:', error);
    return NextResponse.json(
      {
        error:
          error.message || 'An error occurred while fetching demographics data',
      },
      { status: 500 }
    );
  }
}
