import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createSupabaseClient } from '@/Clients/supabase/server';

//====== HASH VERIFICATION ======//
const verifyPayUHash = (payuResponse, salt) => {
  try {
    const {
      status,
      firstname,
      amount,
      txnid,
      key,
      productinfo,
      email,
      additionalCharges = '',
      hash: responseHash,
      udf1 = '',
      udf2 = '',
      udf3 = '',
      udf4 = '',
      udf5 = '',
      mihpayid = '',
    } = payuResponse;

    // Create reverse hash string
    // Format: SALT|status|additionalCharges[if present]||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    let reverseHashString = '';

    // If additionalCharges parameter is present in response
    if (additionalCharges) {
      reverseHashString = `${salt}|${status}|${additionalCharges}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    } else {
      reverseHashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    }

    // Calculate SHA-512 hash
    const calculatedHash = crypto
      .createHash('sha512')
      .update(reverseHashString)
      .digest('hex')
      .toLowerCase();

    // Return true if calculated hash matches the response hash (case insensitive)
    return calculatedHash.toLowerCase() === responseHash.toLowerCase();
  } catch (err) {
    console.error('Hash verification error:', err);
    return false;
  }
};

//====== DATABASE UPDATE ======//
const updateUserPremiumStatus = async (paymentData, username, supabase) => {
  try {
    // Get user data to get uuid
    const { data: userData, error: userError } = await supabase
      .from('user_data')
      .select('uuid, email')
      .eq('username', username)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return { success: false, error: 'User data not found' };
    }

    // Check if this is a subscription payment
    const isSubscription =
      paymentData.is_subscription === '1' ||
      paymentData.udf2 === 'yearly' ||
      paymentData.udf2 === 'monthly';

    // Get subscription period from udf2 or default to monthly
    const subscriptionCycle = paymentData.udf2 || 'monthly';

    // Calculate current period start and end dates
    const currentPeriodStart = new Date().toISOString();
    const currentPeriodEnd = new Date();

    if (subscriptionCycle === 'yearly') {
      // Add 1 year
      currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
    } else {
      // Default to monthly
      currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
    }

    // Generate a unique ID for this transaction if not provided
    const transactionId =
      paymentData.mihpayid || paymentData.txnid || `txn_${Date.now()}`;

    // Prepare billing info record for the billing_info table
    const billingInfo = {
      username: username,
      subscription_id: transactionId,
      email: userData.email || paymentData.email,
      phone: userData.phone || paymentData.phone || '',
      amount: parseFloat(paymentData.amount),
      currency: 'INR',
      billing_cycle: subscriptionCycle,
      billing_address: paymentData.address || '',
      current_period_start: currentPeriodStart,
      current_period_end: currentPeriodEnd.toISOString(),
      payment_method: paymentData.mode || 'card',
      next_payment_attempt: currentPeriodEnd.toISOString(),
      meta_data: {
        transaction_id: paymentData.txnid,
        mihpayid: paymentData.mihpayid || '',
        product_info: paymentData.productinfo,
        payment_mode: paymentData.mode || 'online',
        status: paymentData.status || 'success',
        payment_date: currentPeriodStart,
        raw_response: JSON.stringify(paymentData),
      },
      created_at: currentPeriodStart,
    };

    try {
      // Perform operations individually but handle errors properly

      // 1. Update user_data table to mark user as premium
      const { error: updateUserError } = await supabase
        .from('user_data')
        .update({
          is_premium: true,
        })
        .eq('username', username);

      if (updateUserError) {
        console.error('Error updating user premium status:', updateUserError);
        return {
          success: false,
          error: `Error updating user premium status: ${updateUserError.message}`,
        };
      }

      // 2. Insert into billing_info table
      const { error: insertError } = await supabase
        .from('billing_info')
        .insert([billingInfo]);

      if (insertError) {
        console.error('Error inserting billing info:', insertError);
        return {
          success: false,
          error: `Error inserting billing info: ${insertError.message}`,
        };
      }

      return {
        success: true,
        billingInfo,
        isSubscription,
        subscriptionCycle,
        expiryDate: currentPeriodEnd.toISOString(),
      };
    } catch (error) {
      console.error('Transaction error:', error);
      return { success: false, error: error.message };
    }
  } catch (error) {
    console.error('Supabase update error:', error);
    return { success: false, error: error.message };
  }
};

//====== MAIN HANDLER ======//
export async function POST(req) {
  const supabase = await createSupabaseClient();

  try {
    // Get PayU response data
    const formData = await req.formData();
    const payuResponse = {};

    // Convert formData to object
    for (const [key, value] of formData.entries()) {
      payuResponse[key] = value;
    }

    // Extract key fields
    const {
      txnid,
      status,
      amount,
      mode,
      hash: responseHash,
      key,
      firstname,
      email,
      productinfo,
      udf1, // Use udf1 to store the user ID
    } = payuResponse;

    // Get salt for verification
    const salt =
      process.env.NEXT_PUBLIC_PAYU_MERCHANT_SALT ||
      'dcrOnf4qwkZBJ6ysv97tvQR3riiwFam7';

    // Verify the hash
    const isValidHash = verifyPayUHash(payuResponse, salt);

    // Update user's premium status if hash is valid and status is success
    let dbUpdateResult = { success: false };
    if (isValidHash && status === 'success') {
      dbUpdateResult = await updateUserPremiumStatus(
        payuResponse,
        udf1,
        supabase
      );
    } else {
      dbUpdateResult = {
        success: false,
        error: isValidHash ? 'Payment not successful' : 'Invalid hash',
      };
    }

    // Build comprehensive response data for localStorage
    const paymentStatusData = {
      status: isValidHash && status === 'success' ? 'active' : 'failed',
      verified: isValidHash,
      paymentStatus: status,
      txnid,
      amount,
      mode,
      productinfo,
      dbUpdated: dbUpdateResult.success,
      billingInfo: dbUpdateResult.billingInfo || null,
      error: dbUpdateResult.error || null,
      subscription: {
        active: dbUpdateResult.isSubscription || false,
        cycle: dbUpdateResult.subscriptionCycle || null,
        expiryDate: dbUpdateResult.expiryDate || null,
      },
      timestamp: new Date().toISOString(),
    };

    //====== RESPONSE HANDLING ======//
    // Get the referrer or default to dashboard
    const referrer =
      req.headers.get('referer') || req.headers.get('referrer') || '/dashboard';
    let originUrl;

    // Handle relative path case
    try {
      // Check if this is a relative path and convert to full URL
      if (referrer.startsWith('/')) {
        originUrl = new URL(referrer, req.nextUrl.origin);
      } else {
        originUrl = new URL(referrer);
      }
    } catch (e) {
      console.error('Error parsing referrer URL:', e);
      originUrl = new URL('/dashboard', req.nextUrl.origin);
    }

    // Check for return_url in query parameters
    let returnUrl = null;
    let isModalPayment = false;

    // First check if this is a modal payment
    if (req.nextUrl && req.nextUrl.searchParams) {
      isModalPayment = req.nextUrl.searchParams.get('modal') === 'true';
      returnUrl = req.nextUrl.searchParams.get('return_url');
    }

    // Then check if return_url was passed in PayU response as udf5
    if (
      !returnUrl &&
      payuResponse.udf5 &&
      payuResponse.udf5 !== 'modal_payment'
    ) {
      returnUrl = payuResponse.udf5;
    }

    //====== MODAL RESPONSE ======//
    // If this is a modal payment, return HTML that communicates with the parent window
    if (isModalPayment || payuResponse.udf5 === 'modal_payment') {
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Payment Completed</title>
            <script>
              // Create the payment data to send to the parent window
              const paymentData = ${JSON.stringify(paymentStatusData)};
              
              // Function to communicate with the parent window
              function communicateWithParent() {
                try {
                  // First try postMessage to parent window
                  if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(
                      { 
                        success: ${isValidHash && status === 'success'}, 
                        paymentData: paymentData
                      }, 
                      "*"
                    );
                    
                    // Close this window after sending message
                    window.close();
                  } else {
                    // If no opener available, store in localStorage and redirect
                    if (window.localStorage) {
                      localStorage.setItem("paymentStatus", JSON.stringify(paymentData));
                    }
                    
                    // Try to close this window
                    window.close();
                  }
                } catch (e) {
                  console.error("Error communicating with parent:", e);
                  // If all else fails, show this message
                  document.body.innerHTML = '<div style="text-align:center; padding:30px;">Payment processed. You can close this window and return to the application.</div>';
                }
              }
              
              // Execute when the page loads
              window.onload = communicateWithParent;
            </script>
          </head>
          <body>
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
              <h2>Payment ${isValidHash && status === 'success' ? 'Successful!' : 'Failed'}</h2>
              <p>Communicating with main window...</p>
            </div>
          </body>
        </html>
      `;

      return new Response(htmlResponse, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    //====== JSON RESPONSE ======//
    // For non-modal payments, continue with standard JSON response
    // Create the redirect URL - prioritize: return_url > referrer > dashboard
    let redirectUrl;

    if (returnUrl) {
      // Decode if it's encoded
      try {
        const decodedUrl = decodeURIComponent(returnUrl);
        redirectUrl = new URL(decodedUrl);
      } catch (e) {
        console.error('Error decoding return URL:', e);
        redirectUrl = originUrl.pathname.includes('/payment/')
          ? new URL('/dashboard', req.nextUrl.origin)
          : originUrl;
      }
    } else {
      // If no return_url, fall back to referrer or dashboard
      redirectUrl = originUrl.pathname.includes('/payment/')
        ? new URL('/dashboard', req.nextUrl.origin)
        : originUrl;
    }

    // Add minimal query param to signal payment completion
    redirectUrl.searchParams.append('payment', 'success');

    // Return JSON response
    return NextResponse.json({
      success: true,
      redirectUrl: redirectUrl.toString(),
      paymentData: paymentStatusData,
    });
  } catch (error) {
    console.error('Payment success handler error:', error);

    //====== ERROR HANDLING ======//
    // Create error data for localStorage
    const errorData = {
      status: 'failed',
      error: error.message || 'Unknown error occurred',
      timestamp: new Date().toISOString(),
    };

    // Check if this is a modal payment
    let isModalPayment = false;
    if (req.nextUrl && req.nextUrl.searchParams) {
      isModalPayment = req.nextUrl.searchParams.get('modal') === 'true';
    }

    // If this is a modal payment, return HTML that communicates with the parent window
    if (isModalPayment) {
      const htmlResponse = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Payment Error</title>
            <script>
              // Create the payment data to send to the parent window
              const paymentData = ${JSON.stringify(errorData)};
              
              // Function to communicate with the parent window
              function communicateWithParent() {
                try {
                  // First try postMessage to parent window
                  if (window.opener && !window.opener.closed) {
                    window.opener.postMessage(
                      { 
                        success: false, 
                        paymentData: paymentData
                      }, 
                      "*"
                    );
                    
                    // Close this window after sending message
                    window.close();
                  } else {
                    // If no opener available, store in localStorage and redirect
                    if (window.localStorage) {
                      localStorage.setItem("paymentStatus", JSON.stringify(paymentData));
                    }
                    
                    // Try to close this window
                    window.close();
                  }
                } catch (e) {
                  console.error("Error communicating with parent:", e);
                  // If all else fails, show this message
                  document.body.innerHTML = '<div style="text-align:center; padding:30px;">Payment error occurred. You can close this window and return to the application.</div>';
                }
              }
              
              // Execute when the page loads
              window.onload = communicateWithParent;
            </script>
          </head>
          <body>
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
              <h2>Payment Error</h2>
              <p>Communicating with main window...</p>
            </div>
          </body>
        </html>
      `;

      return new Response(htmlResponse, {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // For non-modal payments, continue with standard JSON response
    // Get the referrer or default to dashboard
    const referrer =
      req.headers.get('referer') || req.headers.get('referrer') || '/dashboard';
    let originUrl;

    // Handle relative path case
    try {
      // Check if this is a relative path and convert to full URL
      if (referrer.startsWith('/')) {
        originUrl = new URL(referrer, req.nextUrl.origin);
      } else {
        originUrl = new URL(referrer);
      }
    } catch (e) {
      console.error('Error parsing referrer URL:', e);
      originUrl = new URL('/dashboard', req.nextUrl.origin);
    }

    // Check for return_url in query parameters
    let returnUrl = null;

    // First check query parameters
    if (req.nextUrl && req.nextUrl.searchParams) {
      returnUrl = req.nextUrl.searchParams.get('return_url');
    }

    // Create the redirect URL - prioritize: return_url > referrer > dashboard
    let redirectUrl;

    if (returnUrl) {
      // Decode if it's encoded
      try {
        const decodedUrl = decodeURIComponent(returnUrl);
        redirectUrl = new URL(decodedUrl);
      } catch (e) {
        console.error('Error decoding return URL:', e);
        redirectUrl = originUrl.pathname.includes('/payment/')
          ? new URL('/dashboard', req.nextUrl.origin)
          : originUrl;
      }
    } else {
      // If no return_url, fall back to referrer or dashboard
      redirectUrl = originUrl.pathname.includes('/payment/')
        ? new URL('/dashboard', req.nextUrl.origin)
        : originUrl;
    }

    // Add minimal query param to signal payment error
    redirectUrl.searchParams.append('payment', 'error');

    // Return JSON response with error information
    return NextResponse.json(
      {
        success: false,
        redirectUrl: redirectUrl.toString(),
        error: error.message || 'Unknown error occurred',
        paymentData: errorData,
      },
      { status: 500 }
    );
  }
}

//====== GET HANDLER ======//
export async function GET(req) {
  // Extract URL parameters for GET requests
  const url = new URL(req.url);
  const params = {};

  for (const [key, value] of url.searchParams.entries()) {
    params[key] = value;
  }

  // Create a mock FormData
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Call the POST handler with the mock FormData
  const mockRequest = {
    formData: async () => formData,
    nextUrl: url,
    headers: req.headers,
    url: req.url,
  };

  return POST(mockRequest);
}
