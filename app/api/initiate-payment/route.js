// api/initiate-payment.js
import { NextResponse } from 'next/server';
import PayU from 'payu-websdk';
import crypto from 'crypto';

//====== HASH CALCULATION ======//
/**
 * Calculates the standard PayU hash according to their documentation
 *
 * @param {Object} paymentData - Payment data
 * @param {string} key - Merchant key
 * @param {string} salt - Merchant salt
 * @returns {string} - Calculated hash
 */
function calculateHash(paymentData, key, salt) {
  const {
    txnid,
    amount,
    productinfo,
    firstname,
    email,
    udf1 = '',
    udf2 = '',
    udf3 = '',
    udf4 = '',
    udf5 = '',
  } = paymentData;

  // PayU hash calculation formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;

  // Calculate hash using SHA-512 algorithm
  return crypto.createHash('sha512').update(hashString).digest('hex');
}

//====== MAIN HANDLER ======//
/**
 * Route handler for PayU payment initialization
 */
export async function POST(req) {
  try {
    // Parse request body
    const requestData = await req.json();

    // Get PayU credentials from environment variables
    const key = process.env.NEXT_PUBLIC_PAYU_MERCHANT_KEY;
    const salt = process.env.NEXT_PUBLIC_PAYU_MERCHANT_SALT;
    const environment = 'PROD'; // Using PROD (production) instead of "LIVE"

    // Ensure credentials are available
    if (!key || !salt) {
      console.error('PayU credentials missing');
      return NextResponse.json(
        { message: 'Payment service configuration error' },
        { status: 500 }
      );
    }

    let formHtml;

    try {
      // Initialize PayU client using the SDK with correct environment parameter (PROD or TEST)
      const payuClient = new PayU(
        {
          key: key,
          salt: salt,
        },
        environment
      );

      // Generate HTML form using the official SDK
      formHtml = await payuClient.paymentInitiate(requestData);

      // Check if form HTML is valid
      if (
        !formHtml ||
        !formHtml.includes('<form') ||
        !formHtml.includes('name=')
      ) {
        throw new Error('SDK returned invalid form HTML');
      }
    } catch (sdkError) {
      console.error('PayU SDK error:', sdkError);

      // Fallback to manual form generation with proper hash calculation
      formHtml = generatePayUForm(requestData, key, salt, environment);
    }

    return NextResponse.json({ formHtml }, { status: 200 });
  } catch (error) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { message: 'Payment initiation failed', error: error.message },
      { status: 500 }
    );
  }
}

//====== FORM GENERATION ======//
/**
 * Generate a PayU form manually with correct hash calculation
 */
function generatePayUForm(paymentData, key, salt, environment) {
  // Determine the correct URL based on environment
  const paymentUrl =
    environment === 'PROD'
      ? 'https://secure.payu.in/_payment'
      : 'https://test.payu.in/_payment';

  const hash = calculateHash(paymentData, key, salt);

  // Begin form HTML
  let formHtml = `
    <form action="${paymentUrl}" method="post" name="payuForm">
      <input type="hidden" name="key" value="${key}" />
      <input type="hidden" name="hash" value='${hash}' />
      <input type="hidden" name="txnid" value="${paymentData.txnid}" />
      <input type="hidden" name="amount" value="${paymentData.amount}" />
      <input type="hidden" name="firstname" value="${paymentData.firstname}" />
      <input type="hidden" name="email" value="${paymentData.email}" />
      <input type="hidden" name="phone" value="${paymentData.phone || ''}" />
      <input type="hidden" name="productinfo" value="${paymentData.productinfo}" />
      <input type="hidden" name="surl" value="${paymentData.surl}" />
      <input type="hidden" name="furl" value="${paymentData.furl}" />
      <input type="hidden" name="service_provider" value="payu_paisa" />
  `;

  // Add standard UDF fields
  for (let i = 1; i <= 5; i++) {
    const field = `udf${i}`;
    if (paymentData[field]) {
      formHtml += `<input type="hidden" name="${field}" value="${paymentData[field]}" />`;
    }
  }

  // Add subscription parameters if present
  if (paymentData.is_subscription === '1') {
    formHtml += `
      <input type="hidden" name="is_subscription" value="${paymentData.is_subscription}" />
      <input type="hidden" name="si" value="${paymentData.si}" />
      <input type="hidden" name="si_type" value="${paymentData.si_type}" />
      <input type="hidden" name="frequency" value="${paymentData.frequency}" />
      <input type="hidden" name="frequency_unit" value="${paymentData.frequency_unit}" />
      <input type="hidden" name="recurring" value="${paymentData.recurring}" />
    `;

    if (paymentData.recurring_count) {
      formHtml += `<input type="hidden" name="recurring_count" value="${paymentData.recurring_count}" />`;
    }
  }

  // Add payment gateway if specified
  if (paymentData.pg) {
    formHtml += `<input type="hidden" name="pg" value="${paymentData.pg}" />`;
  }

  // Close form
  formHtml += `</form>`;

  return formHtml;
}
