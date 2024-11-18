import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import cloudflareClient from '@/utils/cloudflare';

export async function DELETE(request) {
  try {
    const supabase = await createSupabaseClient();
    const { userId, hostnameId, confirmDeletion } = await request.json();

    // Validate input
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    if (!confirmDeletion) {
      return NextResponse.json(
        { error: 'Deletion must be confirmed' },
        { status: 400 }
      );
    }

    // Get user's current domain configuration
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select(`
        uuid,
        email,
        customDomain,
        cloudflare_hostname_id,
        cloudflare_ssl_status,
        cloudflare_verification_status
      `)
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Use provided hostnameId or get from user data
    const targetHostnameId = hostnameId || userData.cloudflare_hostname_id;

    if (!targetHostnameId) {
      return NextResponse.json(
        { error: 'No hostname ID found for deletion' },
        { status: 400 }
      );
    }

    // Store domain info for response
    const deletedDomain = userData.customDomain;

    // Delete from Cloudflare first
    let cloudflareDeleted = false;
    try {
      const deleteResult = await cloudflareClient.deleteCustomHostname(targetHostnameId);
      cloudflareDeleted = deleteResult;
    } catch (error) {
      console.error('Cloudflare deletion error:', error);
      
      // If hostname doesn't exist in Cloudflare, that's okay
      if (error.message.includes('not found') || error.message.includes('10014')) {
        cloudflareDeleted = true;
      } else {
        // For other errors, we might want to continue with database cleanup
        console.warn('Continuing with database cleanup despite Cloudflare error');
        cloudflareDeleted = false;
      }
    }

    // Clear custom domain data from database
    const { error: updateError } = await supabase
      .from('user_data')
      .update({
        customDomain: null,
        customDomainLinked: false,
        usingCustomDomain: false,
        cloudflare_hostname_id: null,
        cloudflare_ssl_status: null,
        cloudflare_verification_status: null,
        cloudflare_created_at: null,
        cloudflare_updated_at: new Date().toISOString(),
        dns_records: null,
        ssl_certificate_authority: null,
        domain_verification_errors: null,
      })
      .eq('uuid', userId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user data after deletion' },
        { status: 500 }
      );
    }

    // Prepare response based on deletion results
    let message = 'Custom domain removed successfully';
    let warnings = [];

    if (!cloudflareDeleted) {
      warnings.push('Domain was removed from your account, but there may have been an issue removing it from Cloudflare');
      warnings.push('The domain may still be configured in Cloudflare but is no longer linked to your account');
    }

    return NextResponse.json({
      success: true,
      message,
      data: {
        deleted_domain: deletedDomain,
        cloudflare_deleted: cloudflareDeleted,
        database_updated: true,
      },
      warnings: warnings.length > 0 ? warnings : undefined,
    });

  } catch (error) {
    console.error('Delete hostname error:', error);
    
    // Handle specific errors
    if (error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Hostname not found' },
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
      { error: 'Failed to delete custom hostname' },
      { status: 500 }
    );
  }
}

// POST endpoint for soft deletion (disable without removing from Cloudflare)
export async function POST(request) {
  try {
    const supabase = await createSupabaseClient();
    const { userId, action } = await request.json();

    if (action !== 'disable') {
      return NextResponse.json(
        { error: 'Invalid action. Use DELETE for permanent removal.' },
        { status: 400 }
      );
    }

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
      .select(`
        uuid,
        email,
        customDomain,
        cloudflare_hostname_id
      `)
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!userData.customDomain) {
      return NextResponse.json(
        { error: 'No custom domain to disable' },
        { status: 400 }
      );
    }

    // Disable custom domain usage without removing from Cloudflare
    const { error: updateError } = await supabase
      .from('user_data')
      .update({
        customDomainLinked: false,
        usingCustomDomain: false,
        cloudflare_updated_at: new Date().toISOString(),
      })
      .eq('uuid', userId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to disable custom domain' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Custom domain disabled successfully',
      data: {
        domain: userData.customDomain,
        status: 'disabled',
        note: 'Domain configuration remains in Cloudflare but is not active for your account',
      },
    });

  } catch (error) {
    console.error('Disable hostname error:', error);
    return NextResponse.json(
      { error: 'Failed to disable custom hostname' },
      { status: 500 }
    );
  }
}

// GET endpoint to check if a domain can be safely deleted
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
      .select(`
        uuid,
        customDomain,
        cloudflare_hostname_id,
        cloudflare_ssl_status,
        cloudflare_verification_status,
        customDomainLinked,
        usingCustomDomain
      `)
      .eq('uuid', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (!userData.customDomain) {
      return NextResponse.json({
        success: true,
        data: {
          can_delete: false,
          reason: 'No custom domain configured',
        },
      });
    }

    // Check if domain is currently active
    const isActive = userData.cloudflare_ssl_status === 'active' && 
                    userData.cloudflare_verification_status === 'active';

    return NextResponse.json({
      success: true,
      data: {
        can_delete: true,
        domain: userData.customDomain,
        hostname_id: userData.cloudflare_hostname_id,
        is_active: isActive,
        is_linked: userData.customDomainLinked,
        is_in_use: userData.usingCustomDomain,
        ssl_status: userData.cloudflare_ssl_status,
        verification_status: userData.cloudflare_verification_status,
        warnings: isActive ? [
          'This domain is currently active and in use',
          'Deleting it will immediately stop serving your content on this domain',
          'Make sure you have updated any external links or bookmarks',
        ] : [],
      },
    });

  } catch (error) {
    console.error('Check deletion status error:', error);
    return NextResponse.json(
      { error: 'Failed to check deletion status' },
      { status: 500 }
    );
  }
}