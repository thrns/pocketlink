import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';

// Create service Supabase client for server-side operations
function createServiceSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Secure file download endpoint
 * URL format: /api/download/{username}/files/{filename}?email={email}&product_id={product_id}&order_id={order_id}
 */
export async function GET(request, { params }) {
  try {
    const { path } = await params;
    const { searchParams } = new URL(request.url);

    // Extract parameters
    const email = searchParams.get('email');
    const productId = searchParams.get('product_id');
    const orderId = searchParams.get('order_id');

    // Validate required parameters
    if (!email || !productId) {
      return NextResponse.json(
        { error: 'Missing required parameters: email and product_id' },
        { status: 400 }
      );
    }

    // Reconstruct the file path from URL params
    const filePath = Array.isArray(path) ? path.join('/') : path;

    if (!filePath) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
    }

    console.log('🔍 Download request:', {
      filePath,
      email,
      productId,
      orderId,
    });

    const supabase = createServiceSupabase();

    // 1. Verify the product exists and get its file URLs
    console.log('🔍 Looking for product ID:', productId);
    const { data: product, error: productError } = await supabase
      .from('products_data')
      .select('file_url, username, name')
      .eq('id', productId)
      .single();

    console.log('📊 Product query result:', {
      found: !!product,
      error: productError?.message,
      product: product
        ? {
            name: product.name,
            username: product.username,
            fileCount: Array.isArray(product.file_url)
              ? product.file_url.length
              : 0,
          }
        : null,
    });

    if (productError || !product) {
      console.error('❌ Product not found:', productError);

      // Debug: Let's see what products exist
      const { data: allProducts } = await supabase
        .from('products_data')
        .select('id, name, username')
        .limit(5);

      console.log('🔍 Available products (first 5):', allProducts);

      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // 2. Check if the requested file belongs to this product
    const fileUrls = Array.isArray(product.file_url) ? product.file_url : [];
    const isFileAuthorized = fileUrls.some(
      (url) => url.includes(filePath) || url.endsWith(filePath.split('/').pop())
    );

    if (!isFileAuthorized) {
      console.error('❌ File not associated with product');
      return NextResponse.json(
        { error: 'File not found in product' },
        { status: 404 }
      );
    }

    // 3. Verify purchase - check if user has purchased this product
    let purchaseVerified = false;

    if (orderId) {
      // Check specific order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('id, customer_email, items, status')
        .eq('order_number', orderId)
        .eq('user_email', email)
        .in('status', ['completed', 'paid'])
        .single();

      if (order && !orderError) {
        // Check if this product is in the order items
        const orderItems =
          typeof order.items === 'string'
            ? JSON.parse(order.items)
            : order.items;
        purchaseVerified = orderItems.some((item) => item.id === productId);
      }
    }

    if (!purchaseVerified) {
      // Fallback: Check any completed order for this email and product
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('items')
        .eq('user_email', email)
        .in('status', ['completed', 'paid']);

      if (!ordersError && orders && orders.length > 0) {
        purchaseVerified = orders.some((order) => {
          const orderItems =
            typeof order.items === 'string'
              ? JSON.parse(order.items)
              : order.items;
          return orderItems.some((item) => item.id === productId);
        });
      }
    }

    if (!purchaseVerified) {
      console.error('❌ Purchase not verified for email:', email);
      return NextResponse.json(
        {
          error:
            'Purchase not verified. You must purchase this product to download files.',
        },
        { status: 403 }
      );
    }

    // 4. Log the download attempt
    try {
      const userAgent = request.headers.get('user-agent') || 'unknown';
      const ipAddress =
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        request.ip ||
        'unknown';

      await supabase.from('download_logs').insert({
        product_id: productId,
        customer_email: email,
        file_path: filePath,
        order_id: orderId,
        downloaded_at: new Date().toISOString(),
        ip_address: ipAddress,
        user_agent: userAgent,
      });
    } catch (logError) {
      // Don't fail the download if logging fails
      console.warn('⚠️ Failed to log download:', logError);
    }

    // 5. Generate signed URL for secure download
    const { data: signedUrl, error: urlError } = await supabase.storage
      .from('products')
      .createSignedUrl(filePath, 31536000); // URL expires in 1 year (365 days)

    if (urlError || !signedUrl) {
      console.error('❌ Failed to create signed URL:', urlError);
      return NextResponse.json(
        { error: 'Failed to generate download link' },
        { status: 500 }
      );
    }

    console.log('✅ Download authorized for:', email);

    // 6. Redirect to the signed URL for download
    return NextResponse.redirect(signedUrl.signedUrl);
  } catch (error) {
    console.error('💥 Download endpoint error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
