import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import cloudflareClient from '@/utils/cloudflare';

export async function POST(request) {
  try {
    const supabase = await createSupabaseClient();
    const requestBody = await request.json();
    const { userId, hostnameId } = requestBody;

    // Validate input
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
        cloudflare_hostname_id,
        cloudflare_ssl_status,
        cloudflare_verification_status
      `
      )
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Use provided hostnameId or get from user data
    const targetHostnameId = userData.cloudflare_hostname_id;

    if (!targetHostnameId) {
      return NextResponse.json(
        { error: 'No hostname ID found for verification' },
        { status: 400 }
      );
    }

    // Get current status from Cloudflare
    const cloudflareData =
      await cloudflareClient.getCustomHostname(targetHostnameId);

    if (!cloudflareData) {
      return NextResponse.json(
        { error: 'Hostname not found in Cloudflare' },
        { status: 404 }
      );
    }

    // Extract verification details
    const sslStatus = cloudflareData.ssl?.status || 'pending';
    const verificationStatus = cloudflareData.status || 'pending';
    const validationErrors = cloudflareData.ssl?.validation_errors || [];
    const validationRecords = cloudflareData.ssl?.validation_records || [];

    // Determine if domain is fully active
    const isFullyActive =
      sslStatus === 'active' && verificationStatus === 'active';
    const hasErrors =
      sslStatus === 'error' ||
      verificationStatus === 'error' ||
      validationErrors.length > 0;

    // Update database with latest status
    const updateData = {
      cloudflare_ssl_status: sslStatus,
      cloudflare_verification_status: verificationStatus,
      cloudflare_updated_at: new Date().toISOString(),
      domain_verification_errors:
        validationErrors.length > 0 ? validationErrors : null,
      ssl_certificate_authority: cloudflareData.ssl?.certificate_authority,
    };

    // Update domain linking status based on verification
    if (isFullyActive) {
      updateData.customDomainLinked = true;
      updateData.usingCustomDomain = true;
    } else if (hasErrors) {
      updateData.customDomainLinked = false;
      updateData.usingCustomDomain = false;
    }

    const { error: updateError } = await supabase
      .from('user_data')
      .update(updateData)
      .eq('uuid', userId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update verification status' },
        { status: 500 }
      );
    }

    // Prepare response data
    const responseData = {
      hostname: cloudflareData.hostname,
      ssl_status: sslStatus,
      verification_status: verificationStatus,
      is_active: isFullyActive,
      has_errors: hasErrors,
      ssl_details: {
        method: cloudflareData.ssl?.method,
        type: cloudflareData.ssl?.type,
        certificate_authority: cloudflareData.ssl?.certificate_authority,
        validation_method: cloudflareData.ssl?.validation_method,
      },
      validation_errors: validationErrors,
      validation_records: validationRecords,
      created_at: cloudflareData.created_at,
      updated_at: cloudflareData.modified_at,
    };

    // Add status-specific messages
    let message = 'Domain verification in progress';
    let nextSteps = [];

    if (isFullyActive) {
      message = 'Domain is fully active and ready to use!';
      nextSteps = [
        'Your custom domain is now live',
        'SSL certificate is active and secure',
        'You can start using your custom domain',
      ];
    } else if (hasErrors) {
      message = 'Domain verification encountered errors';
      nextSteps = [
        'Check DNS configuration',
        'Ensure CNAME record points to pocketlink.co',
        'Wait for DNS propagation (up to 24 hours)',
        'Contact support if issues persist',
      ];
    } else {
      // Still pending
      if (sslStatus === 'pending_validation') {
        message = 'SSL certificate validation in progress';
        nextSteps = [
          'DNS records detected, SSL validation in progress',
          'This usually takes 5-15 minutes',
          'Check back shortly for updates',
        ];
      } else if (verificationStatus === 'pending') {
        message = 'Waiting for DNS propagation';
        nextSteps = [
          'Ensure CNAME record is correctly configured',
          'DNS propagation can take 5-60 minutes',
          'Verify DNS settings with your domain provider',
        ];
      }
    }

    return NextResponse.json({
      success: true,
      message,
      data: responseData,
      next_steps: nextSteps,
    });
  } catch (error) {
    console.error('Verify hostname error:', error);

    // Handle specific Cloudflare errors
    if (error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Hostname not found in Cloudflare' },
        { status: 404 }
      );
    }

    if (error.message.includes('API error')) {
      return NextResponse.json(
        { error: 'Cloudflare API error occurred' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to verify hostname status' },
      { status: 500 }
    );
  }
}

// GET endpoint for checking verification status without updating
export async function GET(request) {
  try {
    const supabase = await createSupabaseClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const hostnameId = searchParams.get('hostnameId');

    // Validate input
    if (!userId) {
      console.log(
        'Query parameters received:',
        Object.fromEntries(searchParams)
      );
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
        customDomain,
        cloudflare_hostname_id,
        cloudflare_ssl_status,
        cloudflare_verification_status,
        cloudflare_updated_at,
        domain_verification_errors,
        customDomainLinked,
        usingCustomDomain
      `
      )
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!userData.customDomain) {
      return NextResponse.json(
        { error: 'No custom domain configured' },
        { status: 400 }
      );
    }

    const targetHostnameId = hostnameId || userData.cloudflare_hostname_id;

    if (!targetHostnameId) {
      return NextResponse.json(
        { error: 'No hostname ID found' },
        { status: 400 }
      );
    }

    // Return current status from database (faster than API call)
    const isActive =
      userData.cloudflare_ssl_status === 'active' &&
      userData.cloudflare_verification_status === 'active';

    const hasErrors =
      userData.cloudflare_ssl_status === 'error' ||
      userData.cloudflare_verification_status === 'error' ||
      (userData.domain_verification_errors &&
        userData.domain_verification_errors.length > 0);

    return NextResponse.json({
      success: true,
      data: {
        hostname: userData.customDomain,
        hostname_id: userData.cloudflare_hostname_id,
        ssl_status: userData.cloudflare_ssl_status,
        verification_status: userData.cloudflare_verification_status,
        is_active: isActive,
        has_errors: hasErrors,
        domain_linked: userData.customDomainLinked,
        using_custom_domain: userData.usingCustomDomain,
        verification_errors: userData.domain_verification_errors,
        last_updated: userData.cloudflare_updated_at,
      },
    });
  } catch (error) {
    console.error('Get verification status error:', error);
    return NextResponse.json(
      { error: 'Failed to get verification status' },
      { status: 500 }
    );
  }
}
