import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON body from request
    const { hostname, checkCloudflareStatus = false } = body;

    if (!hostname) {
      return NextResponse.json(
        { error: 'Hostname is required' },
        { status: 400 }
      );
    }

    console.log(
      'Checking custom domain:',
      hostname,
      'with Cloudflare status:',
      checkCloudflareStatus
    );

    // Query user_data table directly for custom domain mapping
    const { data: userData, error: supabaseError } = await supabase
      .from('user_data')
      .select(
        `
        username,
        uuid,
        customDomain,
        customDomainLinked,
        usingCustomDomain,
        cloudflare_verification_status,
        cloudflare_ssl_status
      `
      )
      .eq('customDomain', hostname)
      .eq('usingCustomDomain', true)
      .single();

    if (supabaseError || !userData) {
      console.error(
        '❌ Custom domain not found in user_data table:',
        supabaseError?.message
      );
      return NextResponse.json(
        { error: 'Custom domain not found' },
        { status: 404 }
      );
    }

    const tenant = userData.username;
    console.log('✅ Tenant found for custom domain:', tenant);

    let responseData = { tenant };

    // If Cloudflare status check is requested, include the status data
    if (checkCloudflareStatus) {
      responseData = {
        ...responseData,
        cloudflare_verification_status: userData.cloudflare_verification_status,
        cloudflare_ssl_status: userData.cloudflare_ssl_status,
        customDomainLinked: userData.customDomainLinked,
        usingCustomDomain: userData.usingCustomDomain,
      };

      console.log('✅ Cloudflare status retrieved:', {
        verification: userData.cloudflare_verification_status,
        ssl: userData.cloudflare_ssl_status,
      });
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('🔥 Error fetching custom domain from Supabase:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
