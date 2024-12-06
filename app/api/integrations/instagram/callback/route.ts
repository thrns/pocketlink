import { createSupabaseClient } from '@/Clients/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const redirectAppUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/dashboard/integrations`
    : process.env.EXPERIMENTAL_HTTPS
      ? 'https://localhost:3000/dashboard/integrations'
      : 'http://localhost:3000/dashboard/integrations';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(redirectAppUrl);
    }

    // Step 1: Exchange authorization code for SHORT-LIVED access token
    // Note: This uses the OAuth endpoint, not Graph API
    const tokenUrl = 'https://api.instagram.com/oauth/access_token';

    const formData = new FormData();
    formData.append('client_id', process.env.NEXT_PUBLIC_INSTAGRAM_APP_ID!);
    formData.append('client_secret', process.env.INSTAGRAM_APP_SECRET!);
    formData.append('grant_type', 'authorization_code');
    formData.append(
      'redirect_uri',
      process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URI!
    );
    formData.append('code', code);

    const shortLivedTokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      body: formData,
    });

    const shortLivedTokenData = await shortLivedTokenResponse.json();

    if (!shortLivedTokenResponse.ok) {
      console.error(
        'Error exchanging code for short-lived token:',
        shortLivedTokenData
      );
      return NextResponse.redirect(redirectAppUrl);
    }

    // Step 2: Exchange SHORT-LIVED token for LONG-LIVED token
    console.log('Starting long-lived token exchange...');
    console.log('Short-lived token data:', shortLivedTokenData);

    const longLivedTokenUrl = 'https://graph.instagram.com/access_token';
    const longLivedParams = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: process.env.INSTAGRAM_APP_SECRET!,
      access_token: shortLivedTokenData.access_token,
    });

    console.log('Long-lived token URL:', `${longLivedTokenUrl}?${longLivedParams.toString()}`);
    console.log('Long-lived token params:', longLivedParams.toString());

    let longLivedTokenData;
    try {
      const longLivedTokenResponse = await fetch(`${longLivedTokenUrl}?${longLivedParams.toString()}`, {
        method: 'GET',
      });

      console.log('Long-lived token response status:', longLivedTokenResponse.status);
      console.log('Long-lived token response headers:', Object.fromEntries(longLivedTokenResponse.headers.entries()));

      if (!longLivedTokenResponse.ok) {
        const errorData = await longLivedTokenResponse.json();
        console.error('Error exchanging short-lived token for long-lived token:', errorData);
        console.error('Response status:', longLivedTokenResponse.status);
        console.error('Response statusText:', longLivedTokenResponse.statusText);
        return NextResponse.redirect(redirectAppUrl);
      }

      longLivedTokenData = await longLivedTokenResponse.json();
      console.log('Long-lived token data received:', longLivedTokenData);

      // Use longLivedTokenData after this, e.g., store access_token etc.
    } catch (error) {
      console.error('Failed to fetch long-lived token:', error);
      console.error('Error details:', error.message);
      return NextResponse.redirect(redirectAppUrl);
    }

    // Step 3: Get user info using the long-lived token
    const userInfoResponse = await fetch(
      `https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${longLivedTokenData.access_token}`
    );

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error('Failed to fetch Instagram user info:', userInfo);
      return NextResponse.redirect(redirectAppUrl);
    }

    // Get user from cookie
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user_session');
    if (!userCookie) {
      console.error('No user cookie found');
      return NextResponse.redirect(redirectAppUrl);
    }

    const user = JSON.parse(userCookie.value);
    const uuid = user.uuid;

    // Get Supabase client
    const supabase = await createSupabaseClient();

    // Fetch current integrations
    const { data: userRow, error: fetchError } = await supabase
      .from('user_data')
      .select('integrations')
      .eq('uuid', uuid)
      .single();

    if (fetchError) {
      console.error('Error fetching user integrations:', fetchError);
      return NextResponse.redirect(redirectAppUrl);
    }

    let integrations: Record<string, any> = userRow?.integrations || {};

    // Store Instagram integration data
    integrations.instagram = {
      // Authentication data
      access_token: longLivedTokenData.access_token,
      token_type: longLivedTokenData.token_type || 'bearer',
      expires_in: longLivedTokenData.expires_in, // Usually 60 days for long-lived tokens

      // User data
      user_id: userInfo.id,
      username: userInfo.username,
      account_type: userInfo.account_type,
      media_count: userInfo.media_count,

      // Metadata
      connected_at: new Date().toISOString(),
      last_refreshed: new Date().toISOString(),
      token_expires_at: new Date(
        Date.now() + longLivedTokenData.expires_in * 1000
      ).toISOString(),

    };

    // If this is a Business/Creator account and you need Facebook integration
    // You would need to handle that separately through Facebook Login
    if (
      userInfo.account_type === 'BUSINESS' ||
      userInfo.account_type === 'CREATOR'
    ) {
      // Note: To use Instagram Graph API features like hashtag search,
      // you need to connect through Facebook Login, not Instagram Basic Display
      integrations.instagram.needs_facebook_connection = true;
    }

    // Update the user row
    const { error: updateError } = await supabase
      .from('user_data')
      .update({
        integrations,
      })
      .eq('uuid', uuid);

    if (updateError) {
      console.error('Error updating user integrations:', updateError);
      return NextResponse.redirect(redirectAppUrl);
    }

    // Redirect to dashboard integrations page
    return NextResponse.redirect(redirectAppUrl);
  } catch (error) {
    console.error('Error in Instagram callback:', error);
    return NextResponse.redirect(redirectAppUrl);
  }
}
