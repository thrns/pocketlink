import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import cloudflareClient from '@/utils/cloudflare';

export async function POST(request) {
  try {
    const supabase = await createSupabaseClient();
    const { hostname, userId } = await request.json();

    console.log('==========================');
    console.log('userId: ', userId);

    // Validate input
    if (!userId || !hostname) {
      return NextResponse.json(
        { error: 'userId and hostname are required' },
        { status: 400 }
      );
    }

    // Validate hostname format
    if (!cloudflareClient.isValidHostname(hostname)) {
      return NextResponse.json(
        { error: 'Invalid hostname format' },
        { status: 400 }
      );
    }

    // Check if user exists and get current domain info
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('uuid, email, customDomain, cloudflare_hostname_id')
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if hostname is already in use by another user
    const { data: existingDomain, error: domainCheckError } = await supabase
      .from('user_data')
      .select('uuid, email')
      .eq('customDomain', hostname)
      .neq('uuid', userId)
      .single();

    if (existingDomain && !domainCheckError) {
      return NextResponse.json(
        { error: 'This domain is already in use by another user' },
        { status: 409 }
      );
    }

    // If user already has a Cloudflare hostname, delete it first
    if (userData.cloudflare_hostname_id) {
      try {
        await cloudflareClient.deleteCustomHostname(
          userData.cloudflare_hostname_id
        );
      } catch (error) {
        console.warn('Failed to delete existing hostname:', error.message);
        // Continue anyway as the old hostname might already be deleted
      }
    }

    // Create custom hostname in Cloudflare
    const cloudflareResponse = await cloudflareClient.createCustomHostname(
      hostname,
      {
        ssl: {
          method: 'http',
          type: 'dv',
          settings: {
            http2: 'on',
            min_tls_version: '1.2',
            tls_1_3: 'on',
          },
        },
      }
    );

    // Get DNS records for the domain
    const dnsRecordsObj = cloudflareClient.getDNSRecords(hostname);

    // Convert DNS records object to array format for UI
    const dnsRecords = Object.values(dnsRecordsObj);

    console.log(
      '>>>>>>>>>>>>>>>>>>>>>>cloudflareResponse: ',
      cloudflareResponse
    );

    // Update user data with Cloudflare information
    const { data: updatedUser, error: updateError } = await supabase
      .from('user_data')
      .update({
        customDomain: hostname,
        cloudflare_hostname_id: cloudflareResponse.id,
        cloudflare_ssl_status: cloudflareResponse.ssl?.status || 'pending',
        cloudflare_verification_status: cloudflareResponse.status || 'pending',
        cloudflare_created_at:
          cloudflareResponse.created_at || new Date().toISOString(),
        cloudflare_updated_at: new Date().toISOString(),
        dns_records: dnsRecords,
        ssl_certificate_authority:
          cloudflareResponse.ssl?.certificate_authority,
        domain_verification_errors:
          cloudflareResponse.ssl?.validation_errors || [],
        ownership_verification:
          cloudflareResponse.ownership_verification || null,
        ownership_verification_http:
          cloudflareResponse.ownership_verification_http || null,
        customDomainLinked: false, // Will be true once verification is complete
        usingCustomDomain: false, // Will be true once SSL is active
      })
      .eq('uuid', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      // Try to clean up Cloudflare hostname if database update fails
      try {
        await cloudflareClient.deleteCustomHostname(cloudflareResponse.id);
      } catch (cleanupError) {
        console.error('Failed to cleanup Cloudflare hostname:', cleanupError);
      }

      return NextResponse.json(
        { error: 'Failed to update user data' },
        { status: 500 }
      );
    }

    // Check if this is an apex domain for instructions
    const isApexDomain = hostname.split('.').length === 2;

    // Return success response with DNS instructions
    return NextResponse.json({
      success: true,
      message: 'Custom hostname created successfully',
      data: {
        hostname,
        cloudflare_hostname_id: cloudflareResponse.id,
        ssl_status: cloudflareResponse.ssl?.status,
        verification_status: cloudflareResponse.status,
        dns_records: dnsRecords,
        instructions: {
          step1: 'Add one of the following DNS records to your domain:',
          step2: isApexDomain
            ? `Option 1: CNAME ${hostname} -> pocketlink.co OR Option 2: A ${hostname} -> ${process.env.FALLBACK_ORIGIN_IP || '104.21.14.42'}`
            : `CNAME ${hostname} -> pocketlink.co`,
          step3: 'Wait for DNS propagation (usually 5-10 minutes)',
          step4: 'SSL certificate will be automatically provisioned',
        },
      },
    });
  } catch (error) {
    console.error('Create hostname error:', error);

    // Handle specific Cloudflare errors
    if (error.message.includes('already exists')) {
      return NextResponse.json(
        { error: 'This domain is already configured in Cloudflare' },
        { status: 409 }
      );
    }

    if (error.message.includes('Invalid hostname')) {
      return NextResponse.json(
        { error: 'Invalid hostname format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create custom hostname' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve current hostname status
export async function GET(request) {
  try {
    const supabase = await createSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    // Get user's current domain configuration
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(
        `
        uuid,
        email,
        customDomain,
        customDomainLinked,
        usingCustomDomain,
        cloudflare_hostname_id,
        cloudflare_ssl_status,
        cloudflare_verification_status,
        cloudflare_created_at,
        cloudflare_updated_at,
        dns_records,
        ssl_certificate_authority,
        domain_verification_errors
      `
      )
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If no custom domain is configured
    if (!userData.customDomain) {
      return NextResponse.json({
        success: true,
        data: {
          hasCustomDomain: false,
          message: 'No custom domain configured',
        },
      });
    }

    // If Cloudflare hostname exists, get latest status
    let cloudflareData = null;
    if (userData.cloudflare_hostname_id) {
      try {
        cloudflareData = await cloudflareClient.getCustomHostname(
          userData.cloudflare_hostname_id
        );

        // Update database with latest status if it has changed
        if (
          cloudflareData.ssl?.status !== userData.cloudflare_ssl_status ||
          cloudflareData.status !== userData.cloudflare_verification_status
        ) {
          await supabase
            .from('user_data')
            .update({
              cloudflare_ssl_status: cloudflareData.ssl?.status || 'pending',
              cloudflare_verification_status:
                cloudflareData.status || 'pending',
              cloudflare_updated_at: new Date().toISOString(),
              domain_verification_errors:
                cloudflareData.ssl?.validation_errors || null,
            })
            .eq('id', userId);
        }
      } catch (error) {
        console.error('Failed to get Cloudflare hostname status:', error);
        // Continue with database data if Cloudflare API fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        hasCustomDomain: true,
        hostname: userData.customDomain,
        cloudflare_hostname_id: userData.cloudflare_hostname_id,
        ssl_status:
          cloudflareData?.ssl?.status || userData.cloudflare_ssl_status,
        verification_status:
          cloudflareData?.status || userData.cloudflare_verification_status,
        dns_records: userData.dns_records,
        ssl_certificate_authority: userData.ssl_certificate_authority,
        verification_errors: userData.domain_verification_errors,
        created_at: userData.cloudflare_created_at,
        updated_at: userData.cloudflare_updated_at,
        is_active:
          (cloudflareData?.ssl?.status || userData.cloudflare_ssl_status) ===
            'active' &&
          (cloudflareData?.status ||
            userData.cloudflare_verification_status) === 'active',
      },
    });
  } catch (error) {
    console.error('Get hostname status error:', error);
    return NextResponse.json(
      { error: 'Failed to get hostname status' },
      { status: 500 }
    );
  }
}
