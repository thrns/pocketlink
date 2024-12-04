import { NextResponse } from 'next/server';

// Function to fetch user's own reels using Instagram Graph API
async function getUserOwnReels(accessToken, userId, limit = 25) {
  try {
    console.log('Fetching user own reels using Instagram Graph API');
    
    // Fetch user's media using Instagram Graph API
    const mediaResponse = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption,timestamp,like_count,comments_count&limit=${limit}&access_token=${accessToken}`
    );
    
    if (!mediaResponse.ok) {
      const errorData = await mediaResponse.json();
      throw new Error(`Instagram API error: ${errorData.error?.message || 'Failed to fetch media'}`);
    }
    
    const mediaData = await mediaResponse.json();
    
    // Filter for video content (reels)
    const reels = mediaData.data?.filter(item => 
      item.media_type === 'VIDEO' || item.media_type === 'CAROUSEL_ALBUM'
    ) || [];
    
    console.log(`Found ${reels.length} video posts from user's media`);
    
    return {
      success: true,
      reels: reels,
      total: reels.length
    };
    
  } catch (error) {
    console.error('Error fetching user own reels:', error);
    return {
      success: false,
      error: error.message,
      reels: []
    };
  }
}

export async function POST(request) {
  try {
    const { user, limit = 25 } = await request.json();

    if (!user?.username) {
      return NextResponse.json(
        { error: 'User information is required' },
        { status: 400 }
      );
    }

    const instagramIntegration = user?.integrations?.instagram;
    
    if (!instagramIntegration?.access_token || !instagramIntegration?.user_id) {
      return NextResponse.json(
        { error: 'Instagram integration not found. Please connect your Instagram account first.' },
        { status: 400 }
      );
    }

    const reelsData = await getUserOwnReels(
      instagramIntegration.access_token,
      instagramIntegration.user_id,
      limit
    );

    if (!reelsData.success) {
      return NextResponse.json(
        { error: reelsData.error || 'Failed to fetch your Instagram reels' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reels: reelsData.reels,
      total: reelsData.total,
      username: instagramIntegration.username,
      account_type: instagramIntegration.account_type
    });
    
  } catch (error) {
    console.error('Error in user-reels API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const accessToken = url.searchParams.get('accessToken');
    const limit = parseInt(url.searchParams.get('limit') || '25');

    if (!userId || !accessToken) {
      return NextResponse.json(
        { error: 'User ID and access token are required' },
        { status: 400 }
      );
    }

    const reelsData = await getUserOwnReels(accessToken, userId, limit);

    if (!reelsData.success) {
      return NextResponse.json(
        { error: reelsData.error || 'Failed to fetch Instagram reels' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      reels: reelsData.reels,
      total: reelsData.total
    });
    
  } catch (error) {
    console.error('Error in user-reels GET API:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}