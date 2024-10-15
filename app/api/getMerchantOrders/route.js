import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';

// GET /api/getMerchantOrders
// Returns orders for the **merchant** (seller) rather than for the end-customer.
// It authenticates via the Supabase session cookie, looks up the merchant_username
// from the stores table using owner_email, and filters the `orders` table on `merchant_username`.

export async function GET(req) {
  try {
    //───────────────────────────────────────────────────────────────────────────
    // 1. Authenticate merchant via Supabase session
    //───────────────────────────────────────────────────────────────────────────
    const supabase = await createSupabaseClient();
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json(
        { error: 'Merchant not authenticated' },
        { status: 401 }
      );
    }

    // Get merchant username directly from auth user metadata or user_id
    // In Supabase, we can get the username from the user's app_metadata or user_metadata
    let merchantUsername = null;

    // Try to get username from user metadata first
    if (authUser.user_metadata?.username) {
      merchantUsername = authUser.user_metadata.username;
      console.log(
        '[getMerchantOrders] Found username in user_metadata:',
        merchantUsername
      );
    } else if (authUser.app_metadata?.username) {
      merchantUsername = authUser.app_metadata.username;
      console.log(
        '[getMerchantOrders] Found username in app_metadata:',
        merchantUsername
      );
    } else {
      // Fallback: query user_data table
      const { data: userData, error: userLookupError } = await supabase
        .from('user_data')
        .select('username')
        .eq('email', authUser.email)
        .single();

      if (userLookupError || !userData) {
        console.warn(
          '[getMerchantOrders] No user found for email:',
          authUser.email
        );
        return NextResponse.json({
          orders: [],
          pagination: { total: 0, page: 1, limit: 0, pages: 0 },
        });
      }

      merchantUsername = userData.username;
      console.log(
        '[getMerchantOrders] Found username from user_data table:',
        merchantUsername
      );
    }

    console.log('[getMerchantOrders] Authenticated merchant:', {
      merchantUsername,
      email: authUser.email,
    });

    //───────────────────────────────────────────────────────────────────────────
    // 2. Parse pagination & filter query-params (page, limit, status, date)
    //───────────────────────────────────────────────────────────────────────────
    const url = new URL(req.url);

    // Extract query params with fallback/defaults
    const rawParams = Object.fromEntries(url.searchParams.entries());

    console.log('[getMerchantOrders] Raw query params:', rawParams);

    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(url.searchParams.get('limit') || '20'))
    );
    const status = url.searchParams.get('status');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    const offset = (page - 1) * limit;

    console.log('[getMerchantOrders] Pagination + filters:', {
      page,
      limit,
      status,
      from,
      to,
      offset,
    });

    //───────────────────────────────────────────────────────────────────────────
    // 3. Build the base query (join addresses & payment method like customer
    //    endpoint for consistency)
    //───────────────────────────────────────────────────────────────────────────
    // Fetch raw orders without attempting joins; joins can fail if foreign key
    // relationships aren't set up in PostgREST. The frontend currently only
    // needs top-level fields, so a simple select('*') is sufficient.

    let query = supabase
      .from('orders')
      .select('*')
      .eq('merchant_username', merchantUsername)
      .order('order_date', { ascending: false });

    if (status) query = query.eq('status', status);
    if (from) query = query.gte('order_date', from);
    if (to) query = query.lte('order_date', to);

    //───────────────────────────────────────────────────────────────────────────
    // 4. Retrieve total count for pagination (optional)
    //───────────────────────────────────────────────────────────────────────────
    const { count: totalCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('merchant_username', merchantUsername);

    console.log('[getMerchantOrders] Total orders count:', totalCount);

    //───────────────────────────────────────────────────────────────────────────
    // 5. Fetch paginated rows
    //───────────────────────────────────────────────────────────────────────────
    const { data: orders, error: ordersError } = await query.range(
      offset,
      offset + limit - 1
    );

    if (ordersError) {
      console.error('[getMerchantOrders] Query error:', ordersError);
      return NextResponse.json(
        { error: 'Failed to retrieve orders' },
        { status: 500 }
      );
    } else {
      console.log('[getMerchantOrders] Fetched orders:', orders?.length || 0);
    }

    //───────────────────────────────────────────────────────────────────────────
    // 6. Post-process items & payment_details JSON fields for convenience
    //───────────────────────────────────────────────────────────────────────────
    const formatted = (orders || []).map((order) => {
      let items = [];
      try {
        items =
          typeof order.items === 'string'
            ? JSON.parse(order.items)
            : order.items || [];
      } catch {
        /* ignore JSON parse errors */
      }

      let paymentDetails = {};
      try {
        if (order.payment_details) {
          paymentDetails =
            typeof order.payment_details === 'string'
              ? JSON.parse(order.payment_details)
              : order.payment_details;
        }
      } catch {
        /* ignore */
      }

      return {
        ...order,
        items,
        itemCount: items.length,
        totalQuantity: items.reduce(
          (sum, it) => sum + (parseInt(it.quantity) || 1),
          0
        ),
        paymentDetails,
      };
    });

    //───────────────────────────────────────────────────────────────────────────
    // 7. Send response
    //───────────────────────────────────────────────────────────────────────────
    return NextResponse.json({
      orders: formatted,
      pagination: {
        total: totalCount || 0,
        page,
        limit,
        pages: Math.ceil((totalCount || 0) / limit) || 1,
      },
    });
  } catch (error) {
    console.error('Unexpected error in getMerchantOrders:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}
