import axios from 'axios';
import crypto from 'crypto';

export async function POST(request) {
  try {
    // Get the incoming data from the request body
    const {
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      phone,
      email,
      surl,
      furl,
      salt,
      optionalParams = {},
    } = await request.json(); // Parse the incoming JSON request body

    // Validate required fields
    if (
      !key ||
      !txnid ||
      !amount ||
      !productinfo ||
      !firstname ||
      !email ||
      !salt
    ) {
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

    // Function to generate the hash needed for the request
    const generateHash = ({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      salt,
    }) => {
      const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
      console.log('Generated hash string:', hashString);
      return crypto.createHash('sha512').update(hashString).digest('hex');
    };

    // Generate the hash using the incoming data
    const hash = generateHash({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      salt,
    });

    // Encode parameters to be sent in the request
    const encodedParams = new URLSearchParams({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      phone,
      email,
      surl,
      furl,
      hash,
    });

    // Add any optional parameters to the request body
    Object.entries(optionalParams).forEach(([paramKey, paramValue]) => {
      if (paramValue) encodedParams.set(paramKey, paramValue);
    });

    // Set up the options for the HTTP request to Easebuzz API
    const options = {
      method: 'POST',
      url: 'https://pay.easebuzz.in/payment/initiateLink', // Easebuzz API URL for payment initiation
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      data: encodedParams, // Data to be sent to Easebuzz API
    };

    // Make the POST request to Easebuzz API
    const { data } = await axios.request(options);
    console.log('Response from Easebuzz API:', data); // Log the response to debug

    // Check if EaseBuzz returned an error
    if (data.status === 0 || data.status === '0') {
      return new Response(
        JSON.stringify({
          success: false,
          error: data.data || 'Payment initialization failed',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Return success response with access key
    return new Response(
      JSON.stringify({
        success: true,
        data: data.data,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error initiating payment:', error);

    // Return an error response if something goes wrong
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Payment initiation failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
