import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

export async function POST(request) {
  try {
    // Get the incoming data from the request body
    const {
      key_id,
      key_secret,
      amount,
      currency = 'INR',
      receipt,
      notes = {},
    } = await request.json();

    // Validate required fields
    if (!key_id || !key_secret || !amount || !receipt) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required payment parameters',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate amount (Razorpay minimum is ₹1.00)
    if (isNaN(amount) || amount < 1) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Amount must be at least ₹1.00',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Initialize Razorpay instance with merchant credentials
    const razorpay = new Razorpay({
      key_id: key_id,
      key_secret: key_secret,
    });

    // Create order with Razorpay
    const orderOptions = {
      amount: Math.round(amount * 100), // Amount in paise (multiply by 100)
      currency: currency,
      receipt: `rcpt_${receipt}_${Date.now()}`, // Make receipt unique
      notes: notes,
    };

    console.log('Creating Razorpay order with options:', orderOptions);

    // Make the order creation request to Razorpay
    const order = await razorpay.orders.create(orderOptions);
    console.log('Razorpay order created successfully:', order.id);

    // Validate the order was created properly
    if (!order || !order.id) {
      throw new Error('Failed to create order with Razorpay');
    }

    // Return success response with order details
    return new Response(
      JSON.stringify({
        success: true,
        order: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status,
        },
        key_id: key_id, // Return key_id for frontend checkout
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating Razorpay order:', error);

    // Return an error response if something goes wrong
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Order creation failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Verify payment signature
export async function PUT(request) {
  try {
    // Get verification data from request body
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      key_secret,
    } = await request.json();

    // Validate required fields for verification
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !key_secret) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required verification parameters',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Use Razorpay's official verification utility
    let isAuthentic = false;
    try {
      isAuthentic = validatePaymentVerification(
        {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        },
        razorpay_signature,
        key_secret
      );
    } catch (verificationError) {
      console.error('Error during payment verification:', verificationError);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Payment verification process failed',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (isAuthentic) {
      // Payment is verified
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Payment verified successfully',
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      // Payment verification failed
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Payment verification failed',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Payment verification failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}