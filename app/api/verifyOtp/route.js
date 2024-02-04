import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(req) {
  try {
    const supabase = await createSupabaseClient();

    // Parse request body
    const { email, otp, sessionId, merchant, deviceFingerprint } =
      await req.json();

    // Validate required fields
    if (!email || !otp || !sessionId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`[OTP] Verifying OTP for ${email}, session ${sessionId}`);

    // Fetch the session from the database
    const { data: sessionData, error: sessionError } = await supabase
      .from('auth_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('email', email)
      .single();

    if (sessionError || !sessionData) {
      console.error('Error fetching auth session:', sessionError);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Session not found or expired',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if session is expired
    const expiryTime = new Date(sessionData.expires_at);
    if (expiryTime < new Date()) {
      console.log(`[OTP] Session expired for ${email}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Verification code expired',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Increment attempt counter
    const { error: updateError } = await supabase
      .from('auth_sessions')
      .update({
        attempts: sessionData.attempts + 1,
        last_attempt: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (updateError) {
      console.error('Error updating attempt counter:', updateError);
    }

    // Check if we've exceeded max attempts (5)
    if (sessionData.attempts >= 4) {
      // This is the 5th attempt
      console.log(`[OTP] Max attempts exceeded for ${email}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Too many failed attempts',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Verify OTP
    if (sessionData.otp !== otp) {
      console.log(
        `[OTP] Invalid OTP for ${email}: expected ${sessionData.otp}, got ${otp}`
      );
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid verification code',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // OTP is valid! Mark as verified
    const { error: verifyError } = await supabase
      .from('auth_sessions')
      .update({
        verified: true,
        verified_at: new Date().toISOString(),
      })
      .eq('id', sessionId);

    if (verifyError) {
      console.error('Error marking session as verified:', verifyError);
    }

    // Check if user profile exists, create if not
    const { data: userData, error: userError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (userError && userError.code !== 'PGRST116') {
      // Not PGRST116 (not found)
      console.error('Error checking user:', userError);
    }

    if (!userData) {
      // Create new user profile
      const { data: newUserProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          email: email,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
          device_fingerprint: deviceFingerprint || null,
        })
        .select()
        .single();
      if (createError) {
        console.error('Error creating user profile:', createError);
        // Return error instead of continuing silently
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Failed to create user profile',
            error: createError.message,
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } else {
        console.log(
          `[Auth] Created new user profile for ${email}:`,
          newUserProfile
        );
      }
    } else {
      // Update existing profile
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          last_login: new Date().toISOString(),
          device_fingerprint: deviceFingerprint || userData.device_fingerprint,
        })
        .eq('email', email);

      if (updateError) {
        console.error('Error updating user profile:', updateError);
      }
    }

    // Record merchant relationship if provided
    if (merchant && merchant.id && merchant.username) {
      try {
        // Ensure we have a valid UUID for merchant_id
        const merchantId = merchant.id;
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        if (!uuidRegex.test(merchantId)) {
          console.warn(
            `[Auth] Merchant ID not in UUID format: ${merchantId}. This may cause database issues.`
          );
        }

        const { error: merchantError } = await supabase
          .from('user_merchants')
          .upsert(
            {
              user_email: email,
              merchant_id: merchantId,
              merchant_username: merchant.username,
              last_visit: new Date().toISOString(),
              visit_count: 1,
            },
            {
              onConflict: 'user_email,merchant_id',
              ignoreDuplicates: false,
            }
          );

        if (merchantError) {
          console.error(
            'Error recording merchant relationship:',
            merchantError
          );
        } else {
          console.log(
            `[Auth] Recorded merchant relationship: ${email} -> ${merchant.username}`
          );
        }
      } catch (err) {
        console.error('Error handling merchant relationship:', err);
      }
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Verification successful',
        user: { email },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in verifyOtp endpoint:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Server error during verification',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
