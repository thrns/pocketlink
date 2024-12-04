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
      return NextResponse.redirect(redirectAppUrl);
    }

    // Facebook Graph API token exchange endpoint
    const tokenUrl = 'https://graph.facebook.com/v19.0/oauth/access_token';

    // Prepare URLSearchParams for token exchange
    const params = new URLSearchParams();
    params.append('client_id', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
    params.append('client_secret', process.env.FACEBOOK_APP_SECRET!);
    params.append(
      'redirect_uri',
      process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_URI!
    );
    params.append('code', code);

    // Exchange code for access token
    const response = await fetch(`${tokenUrl}?${params.toString()}`, {
      method: 'GET',
    });

    const tokenData = await response.json();

    if (!response.ok) {
      return NextResponse.redirect(redirectAppUrl);
    }

    // Exchange short-lived token for long-lived token
    const longLivedTokenUrl = 'https://graph.facebook.com/v19.0/oauth/access_token';
    const longLivedParams = new URLSearchParams();
    longLivedParams.append('grant_type', 'fb_exchange_token');
    longLivedParams.append('client_id', process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!);
    longLivedParams.append('client_secret', process.env.FACEBOOK_APP_SECRET!);
    longLivedParams.append('fb_exchange_token', tokenData.access_token);

    const longLivedResponse = await fetch(`${longLivedTokenUrl}?${longLivedParams.toString()}`, {
      method: 'GET',
    });

    const longLivedTokenData = await longLivedResponse.json();

    // console.log('\n========================\nLong-lived token data:', longLivedTokenData, "\n========================\n");

    // Use long-lived token if exchange was successful, otherwise fall back to short-lived
    const finalTokenData = longLivedResponse.ok ? longLivedTokenData : tokenData;

    // Fetch Facebook user info using the access token
    const userInfoResponse = await fetch(
      `https://graph.facebook.com/v19.0/me?fields=id,name,email&access_token=${finalTokenData.access_token}`
    );

    const userInfo = await userInfoResponse.json();

    if (!userInfoResponse.ok) {
      console.error('Failed to fetch Facebook user info:', userInfo);
      return NextResponse.redirect(redirectAppUrl);
    }

    // Fetch Facebook Pages and Instagram Business Accounts
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${finalTokenData.access_token}`
    );

    const pagesData = await pagesResponse.json();

    // Get user from cookie (assumes you set user_data cookie with uuid)
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user_session');
    if (!userCookie) {
      return NextResponse.redirect(redirectAppUrl);
    }
    const user = JSON.parse(userCookie.value);
    const uuid = user.uuid;

    // Get Supabase client
    const supabase = await createSupabaseClient();

    // Fetch current integrations
    const { data: userRow } = await supabase
      .from('user_data')
      .select('integrations')
      .eq('uuid', uuid)
      .single();

    let integrations: Record<string, any> = {};
    if (userRow && userRow.integrations) {
      integrations = userRow.integrations;
    }

    // Create structured Facebook integration data
    integrations.instagram = {
      // Token data
      access_token: finalTokenData.access_token,
      token_type: finalTokenData.token_type || 'bearer',
      expires_in: finalTokenData.expires_in,

      // User data
      user_id: userInfo.id,
      user_name: userInfo.name,
      user_email: userInfo.email,

      // Pages data (if available)
      pages: pagesData.data
        ? pagesData.data.map((page: any) => ({
          id: page.id,
          name: page.name,
          access_token: page.access_token,
          instagram_business_account: page.instagram_business_account || null,
        }))
        : [],

      // Metadata
      connected_at: new Date().toISOString(),
      last_refreshed: new Date().toISOString(),
    };

    // Find and store the primary Instagram Business Account if available
    const pageWithInstagram = pagesData.data?.find(
      (page: any) => page.instagram_business_account
    );
    if (pageWithInstagram) {
      integrations.instagram.primary_instagram_business_account = {
        id: pageWithInstagram.instagram_business_account.id,
        page_id: pageWithInstagram.id,
        page_name: pageWithInstagram.name,
      };
    }

    // Update the user row
    await supabase.from('user_data').update({ integrations }).eq('uuid', uuid);

    // Redirect to dashboard integrations page
    return NextResponse.redirect(redirectAppUrl);
  } catch (error) {
    console.error('Error in Facebook callback:', error);
    return NextResponse.redirect(redirectAppUrl);
  }
}
