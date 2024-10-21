import { NextResponse } from 'next/server';

//====== MAIN HANDLER ======//
export async function POST(req) {
  try {
    // Get any error information from PayU
    const formData = await req.formData();
    const payuResponse = {};

    // Convert formData to object
    for (const [key, value] of formData.entries()) {
      payuResponse[key] = value;
    }

    // Extract key fields
    const {
      txnid,
      error_Message = 'Payment was declined or failed',
      amount,
      key,
      firstname,
      email,
      productinfo,
      udf1,
    } = payuResponse;

    // Create comprehensive payment status data for localStorage
    const paymentStatusData = {
      status: 'failed',
      txnid,
      productinfo,
      amount,
      error: error_Message,
      timestamp: new Date().toISOString(),
      username: udf1 || firstname || null,
      dbUpdated: false,
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

    // Check for return_url in both query parameters and udf5
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
            <title>Payment Failed</title>
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
                  document.body.innerHTML = '<div style="text-align:center; padding:30px;">Payment failed. You can close this window and return to the application.</div>';
                }
              }
              
              // Execute when the page loads
              window.onload = communicateWithParent;
            </script>
          </head>
          <body>
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
              <h2>Payment Failed</h2>
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

    // Add minimal query param to signal payment failure
    redirectUrl.searchParams.append('payment', 'failed');

    // Return JSON response
    return NextResponse.json({
      success: false,
      redirectUrl: redirectUrl.toString(),
      paymentData: paymentStatusData,
    });
  } catch (error) {
    console.error('Payment failure handler error:', error);

    //====== ERROR HANDLING ======//
    // Create error data for localStorage
    const errorData = {
      status: 'failed',
      error: error.message || 'Unknown error processing payment failure',
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
