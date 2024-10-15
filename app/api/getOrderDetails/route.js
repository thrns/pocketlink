import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function GET(req) {
  try {
    // Check authentication from cookies
    const cookieStore = await cookies();
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

    // Get order ID from URL query params
    const url = new URL(req.url);
    const orderId = url.searchParams.get('id');
    const orderNumber = url.searchParams.get('orderNumber');

    if (!orderId && !orderNumber) {
      return NextResponse.json(
        { error: 'Order ID or order number is required' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = await createSupabaseClient();

    // Create the base query with joins to related tables
    let query = supabase
      .from('orders')
      .select(
        `
        *,
        shipping_address:shipping_address_id(id, name, line1, line2, city, state, postal_code, country, phone),
        billing_address:billing_address_id(id, name, line1, line2, city, state, postal_code, country, phone),
        payment_method:payment_method_id(id, type, last4, brand, name, exp_month, exp_year)
      `
      )
      .eq('user_id', userId);

    // Apply filter by order ID or order number
    if (orderId) {
      query = query.eq('id', orderId);
    } else {
      query = query.eq('order_number', orderNumber);
    }

    // Execute the query
    const { data: order, error } = await query.single();

    if (error) {
      console.error('Error fetching order:', error);

      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      return NextResponse.json(
        { error: 'Failed to retrieve order details' },
        { status: 500 }
      );
    }

    // Parse JSON fields
    let items = [];
    try {
      items = JSON.parse(order.items);
    } catch (e) {
      console.error('Error parsing order items:', e);
    }

    let paymentDetails = {};
    try {
      if (order.payment_details) {
        paymentDetails = JSON.parse(order.payment_details);
      }
    } catch (e) {
      console.error('Error parsing payment details:', e);
    }

    // Get order status history if available
    const { data: statusHistory, error: historyError } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', order.id)
      .order('created_at', { ascending: true });

    if (historyError) {
      console.error('Error fetching order history:', historyError);
    }

    // Format the order with all details
    const formattedOrder = {
      id: order.id,
      orderNumber: order.order_number,
      orderDate: order.order_date,
      status: order.status,
      paymentStatus: order.payment_status,
      items,
      itemCount: items.length,
      totalQuantity: items.reduce((sum, item) => sum + (item.quantity || 1), 0),
      subtotal: order.subtotal,
      shipping: order.shipping_fee,
      tax: order.tax,
      total: order.total,
      shippingAddress: order.shipping_address,
      billingAddress: order.billing_address,
      paymentMethod: order.payment_method,
      paymentDetails,
      trackingNumber: order.tracking_number,
      trackingUrl: order.tracking_url,
      estimatedDelivery: order.estimated_delivery,
      notes: order.notes,
      statusHistory: statusHistory || [],
      transactionId: order.transaction_id,
    };

    return NextResponse.json({ order: formattedOrder });
  } catch (error) {
    console.error('Error retrieving order details:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order details' },
      { status: 500 }
    );
  }
}
