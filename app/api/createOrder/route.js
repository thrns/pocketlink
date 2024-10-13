import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const body = await req.json();
    const { items, shipping, payment, checkoutSessionId } = body;

    if (!items || !items.length) {
      return NextResponse.json(
        { error: 'Cart items are required' },
        { status: 400 }
      );
    }

    if (!shipping) {
      return NextResponse.json(
        { error: 'Shipping information is required' },
        { status: 400 }
      );
    }

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment information is required' },
        { status: 400 }
      );
    }

    // Check authentication
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

    // Initialize Supabase client
    const supabase = await createSupabaseClient();

    // Calculate order totals
    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
    const shippingFee = shipping.fee || 0;
    const tax = 0; // Calculate tax if needed
    const total = subtotal + shippingFee + tax;

    // Generate unique order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(
      Math.random() * 10000
    )}`;

    // Create the order in Supabase
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        id: uuidv4(),
        order_number: orderNumber,
        user_id: userId,
        checkout_session_id: checkoutSessionId,
        items: JSON.stringify(items),
        subtotal,
        shipping_fee: shippingFee,
        tax,
        total,
        status: 'pending',
        shipping_address_id: shipping.addressId,
        billing_address_id: shipping.addressId, // Using same address for billing
        payment_method_id: payment.methodId,
        payment_status: 'pending',
        order_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Process payment (mock implementation)
    const paymentResult = await processPayment(payment, total, orderData.id);

    if (!paymentResult.success) {
      // Update order to failed payment status
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          status: 'cancelled',
          payment_error: paymentResult.error,
        })
        .eq('id', orderData.id);

      return NextResponse.json(
        { error: paymentResult.error || 'Payment failed' },
        { status: 400 }
      );
    }

    // Update order with successful payment
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        status: 'processing',
        payment_details: JSON.stringify(paymentResult.details),
        transaction_id: paymentResult.transactionId,
      })
      .eq('id', orderData.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
    }

    // Update checkout session to completed
    if (checkoutSessionId) {
      await supabase
        .from('checkout_sessions')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', checkoutSessionId);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      orderNumber: orderNumber,
      orderId: orderData.id,
      status: 'processing',
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

// Mock payment processing function
// In a real implementation, this would integrate with a payment gateway
async function processPayment(paymentInfo, amount, orderId) {
  try {
    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For testing, succeed most payments but occasionally fail
    const shouldSucceed = Math.random() > 0.1;

    if (shouldSucceed) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
        details: {
          amount,
          currency: 'USD',
          method: paymentInfo.type,
          last4: paymentInfo.last4,
          processed_at: new Date().toISOString(),
        },
      };
    } else {
      return {
        success: false,
        error: 'Payment declined by issuer. Please try another payment method.',
      };
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      error: 'Payment processing failed',
    };
  }
}
