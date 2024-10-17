import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function GET(req) {
  try {
    // Check authentication from cookies
    let cookieStore;
    try {
      cookieStore = cookies();
    } catch (cookieError) {
      console.error('Error accessing cookies:', cookieError);
      return NextResponse.json(
        { error: 'Error accessing authentication' },
        { status: 401 }
      );
    }

    const userCookie = cookieStore.get('checkout_user');
    let userId = null;

    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie.value);
        userId = userData.userId;
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        return NextResponse.json(
          { error: 'Authentication error' },
          { status: 401 }
        );
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    // Initialize Supabase client
    let supabase;
    try {
      supabase = await createSupabaseClient();
    } catch (dbError) {
      console.error('Error initializing Supabase client:', dbError);
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 503 }
      );
    }

    // Parse query params
    let url;
    try {
      url = new URL(req.url);
    } catch (urlError) {
      console.error('Error parsing URL:', urlError);
      return NextResponse.json(
        { error: 'Invalid request URL' },
        { status: 400 }
      );
    }

    const page = Math.max(
      1,
      parseInt(url.searchParams.get('page') || '1') || 1
    );
    const limit = Math.min(
      50,
      Math.max(1, parseInt(url.searchParams.get('limit') || '10') || 10)
    );
    const status = url.searchParams.get('status');
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');

    // Calculate pagination
    const offset = (page - 1) * limit;

    // Base query
    let query = supabase
      .from('orders')
      .select(
        `
        *,
        shipping_address:shipping_address_id(id, name, line1, line2, city, state, postal_code, country),
        payment_method:payment_method_id(id, type, last4, brand, name)
      `
      )
      .eq('user_id', userId)
      .order('order_date', { ascending: false });

    // Apply filters if provided
    if (status) {
      query = query.eq('status', status);
    }

    if (from) {
      query = query.gte('order_date', from);
    }

    if (to) {
      query = query.lte('order_date', to);
    }

    // Get total count for pagination
    let count = 0;
    try {
      const { count: totalCount, error: countError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (countError) {
        console.error('Error getting order count:', countError);
        // Continue without count rather than failing
      } else {
        count = totalCount || 0;
      }
    } catch (countError) {
      console.error('Exception getting order count:', countError);
      // Continue without accurate count
    }

    // Execute paginated query
    let orders = [];
    try {
      const { data, error } = await query.range(offset, offset + limit - 1);

      if (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
          { error: 'Failed to retrieve orders' },
          { status: 500 }
        );
      }

      orders = data || [];
    } catch (queryError) {
      console.error('Exception fetching orders:', queryError);
      return NextResponse.json(
        { error: 'Failed to retrieve orders' },
        { status: 500 }
      );
    }

    // Process and format orders
    const formattedOrders = orders.map((order) => {
      // Parse JSON strings
      let items = [];
      try {
        if (typeof order.items === 'string') {
          items = JSON.parse(order.items);
        } else if (Array.isArray(order.items)) {
          items = order.items;
        }
      } catch (e) {
        console.error('Error parsing order items:', e);
      }

      let paymentDetails = {};
      try {
        if (order.payment_details) {
          if (typeof order.payment_details === 'string') {
            paymentDetails = JSON.parse(order.payment_details);
          } else if (typeof order.payment_details === 'object') {
            paymentDetails = order.payment_details;
          }
        }
      } catch (e) {
        console.error('Error parsing payment details:', e);
      }

      // Format the order
      return {
        id: order.id,
        orderNumber: order.order_number,
        orderDate: order.order_date,
        status: order.status,
        paymentStatus: order.payment_status,
        items,
        itemCount: Array.isArray(items) ? items.length : 0,
        totalQuantity: Array.isArray(items)
          ? items.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0)
          : 0,
        subtotal: order.subtotal || 0,
        shipping: order.shipping_fee || 0,
        tax: order.tax || 0,
        total: order.total || 0,
        shippingAddress: order.shipping_address || {},
        paymentMethod: order.payment_method || {},
        paymentDetails,
      };
    });

    // Return paginated results with metadata
    return NextResponse.json({
      orders: formattedOrders,
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit) || 1,
      },
    });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}
