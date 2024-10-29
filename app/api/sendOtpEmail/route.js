import { v4 as uuidv4 } from 'uuid';
import { createSupabaseClient } from '@/Clients/supabase/server';

// Generate OTP
const generateOTP = () => {
  // Generate a 6-digit number
  let otp;
  do {
    otp = Math.floor(100000 + Math.random() * 900000);
    // Convert to string to check digits
    const otpString = otp.toString();

    // Avoid OTPs with confusing digits (0/O, 1/I) or too repetitive patterns
    const hasConfusingDigits =
      otpString.includes('0') || otpString.includes('1');
    const isRepetitive = /(\d)\1{2,}/.test(otpString); // 3+ same digits in a row

    if (!hasConfusingDigits && !isRepetitive) {
      break;
    }
  } while (true);

  return otp.toString();
};

export async function POST(req) {
  const supabase = await createSupabaseClient();
  const { contact: email } = await req.json();
  if (!email)
    return new Response(JSON.stringify({ error: 'Email is required' }), {
      status: 400,
    });

  // Generate OTP
  const otp = generateOTP();
  const sessionId = uuidv4();

  console.log(
    `[OTP] Generating new OTP (${otp}) for ${email} with session ${sessionId}`
  );

  try {
    // First, delete any existing sessions for this email
    const { data: deletedSessions, error: deleteError } = await supabase
      .from('auth_sessions')
      .delete()
      .eq('email', email)
      .select();

    if (deleteError) {
      console.error('Error deleting existing sessions:', deleteError);
    } else {
      console.log(
        `[OTP] Cleanup: Deleted ${
          deletedSessions?.length || 0
        } existing sessions for ${email}`
      );
    }

    // Store OTP in Supabase auth_sessions table
    const { data, error } = await supabase
      .from('auth_sessions')
      .insert({
        id: sessionId,
        email,
        otp: otp,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes expiry
        attempts: 0,
        verified: false,
        ip_address: req.headers.get('x-forwarded-for') || 'unknown',
      })
      .select();

    if (error) {
      console.error('Error storing OTP in Supabase:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to create auth session' }),
        {
          status: 500,
        }
      );
    }

    console.log(
      `[OTP] New session created with ID ${sessionId} and OTP ${otp} for ${email}`
    );
  } catch (error) {
    console.error('Exception storing OTP:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }

  // Send OTP email using email-server table
  try {
    const otpEmailBody = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pocketlink Verification Code</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #333333;
      line-height: 1.5;
    }
    .container {
      max-width: 500px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 25px;
      margin-bottom: 25px;
    }
    .logo {
      max-width: 120px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 22px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 15px;
      color: #111111;
    }
    .description {
      font-size: 16px;
      color: #555555;
      margin-bottom: 30px;
      text-align: center;
      line-height: 1.6;
    }
    .code-container {
      text-align: center;
      margin: 30px 0;
    }
    .verification-code {
      font-family: 'Courier New', monospace;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #7C3AED;
      padding: 8px 0;
      display: inline-block;
    }
    .divider {
      height: 1px;
      background-color: #eaeaea;
      margin: 25px 0;
    }
    .note {
      font-size: 15px;
      color: #666666;
      text-align: center;
      margin-bottom: 20px;
    }
    .expires {
      font-size: 14px;
      color: #888888;
      text-align: center;
      margin-top: -10px;
      margin-bottom: 25px;
    }
    .footer {
      text-align: center;
      color: #888888;
      font-size: 13px;
      margin-top: 40px;
    }
    .footer a {
      color: #7C3AED;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .container {
        padding: 20px 15px;
      }
      .verification-code {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://pocketlink.co/ogImg.png" alt="Pocketlink Logo" class="logo">
    </div>
    
    <h1 class="title">Verification Code</h1>
    <p class="description">Please use the following code to complete your verification. This code is valid for 5 minutes.</p>
    
    <div class="divider"></div>
    
    <div class="code-container">
      <div class="verification-code">${otp}</div>
    </div>
    
    <p class="expires">Code expires in 5 minutes</p>
    
    <div class="divider"></div>
    
    <p class="note">If you didn't request this code, you can safely ignore this email.</p>
    
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@pocketlink.co">support@pocketlink.co</a></p>
      <p>© 2025 Pocketlink</p>
    </div>
  </div>
</body>
</html>`;

    // Insert OTP email into email-server table
    const { error: emailServerError } = await supabase
      .from('email-server')
      .insert({
        uuid: crypto.randomUUID(),
        username: 'otp',
        type: 'admin',
        send_at: new Date().toISOString(),
        to: email,
        cc: null,
        bcc: null,
        subject: '🔐 Your Secure OTP Code | Pocketlink',
        body: null,
        html: otpEmailBody,
        attachment_links: null,
        refreshToken: null,
      });

    if (emailServerError) {
      console.error(
        '❌ Error inserting OTP email to email-server:',
        emailServerError
      );
      return new Response(
        JSON.stringify({ error: 'Failed to send OTP email' }),
        {
          status: 500,
        }
      );
    }

    console.log(
      `[OTP] Email queued to email-server for ${email} with OTP ${otp}`
    );

    // Return the OTP in development mode, but don't expose in production
    // Also return the sessionId so it can be properly tracked client-side
    return new Response(
      JSON.stringify({
        success: true,
        sessionId,
        otp: process.env.NODE_ENV === 'development' ? otp : undefined,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email OTP' }), {
      status: 500,
    });
  }
}
