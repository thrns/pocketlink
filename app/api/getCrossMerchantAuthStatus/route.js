import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';

export async function POST(request) {
  const supabase = await createSupabaseClient();

  try {
    let requestData;
    try {
      requestData = await request.json();
    } catch (parseError) {
      console.error('[API] Error parsing request body:', parseError);
      return NextResponse.json(
        {
          isAuthenticated: false,
          message: 'Invalid request format',
        },
        { status: 400 }
      );
    }

    const {
      email,
      merchantId,
      merchantUsername,
      deviceFingerprint,
      authCookie,
    } = requestData || {};

    if (!merchantUsername) {
      return NextResponse.json(
        {
          isAuthenticated: false,
          message: 'Missing merchant username',
        },
        { status: 400 }
      );
    }

    // Extract auth cookie from request if available
    let cookieToken;
    try {
      const cookieStore = cookies();
      cookieToken = cookieStore.get('pocketlink_auth')?.value || authCookie;
    } catch (cookieError) {
      console.error('[API] Error accessing cookies:', cookieError);
      cookieToken = authCookie; // Fall back to auth cookie from request body
    }

    if (!cookieToken) {
      return NextResponse.json({
        isAuthenticated: false,
        message: 'No authentication token found',
      });
    }

    // Try to extract email from cookie if sent as cookie_auth_check
    // Format expected: token|emailHash
    let userEmail = email;

    if (email === 'cookie_auth_check' && cookieToken.includes('|')) {
      try {
        const parts = cookieToken.split('|');
        if (parts.length > 1) {
          // Decode the email hash (reverse of the encoding in the client)
          const emailHash = parts[1];
          const decodedEmailHash = emailHash.split('').reverse().join('');
          userEmail = Buffer.from(decodedEmailHash, 'base64').toString('utf8');
        }
      } catch (err) {
        console.error('[API] Error decoding email from cookie:', err);
      }
    }

    // If still no valid email, try looking up the token in the database for backward compatibility
    if (!userEmail || userEmail === 'cookie_auth_check') {
      try {
        // Check for legacy token in auth_sessions table
        const { data: sessionData, error: sessionError } = await supabase
          .from('auth_sessions')
          .select('user_email, verified')
          .eq('token', cookieToken)
          .order('created_at', { ascending: false })
          .limit(1);

        if (sessionError) {
          console.error('Error looking up legacy token:', sessionError);
        }

        if (sessionData && sessionData.length > 0 && sessionData[0].verified) {
          userEmail = sessionData[0].user_email;
          console.log(
            `[API] Email found from legacy token: ${userEmail.substring(0, 3)}***@${userEmail.split('@')[1]}`
          );
        }
      } catch (err) {
        console.error('[API] Error in legacy auth lookup:', err);
      }
    }

    // If still no valid email, reject auth
    if (!userEmail || userEmail === 'cookie_auth_check') {
      console.log(
        `[API] No valid email found in token for ${merchantUsername}`
      );
      return NextResponse.json({
        isAuthenticated: false,
        message: 'No valid email found in token',
      });
    }

    // Look up user auth status and merchant access
    let userMerchant = null;
    try {
      const { data, error } = await supabase
        .from('user_merchants')
        .select('*')
        .eq('user_email', userEmail)
        .eq('merchant_username', merchantUsername)
        .maybeSingle();

      if (error) {
        console.error(`[API] Error checking user_merchants: ${error.message}`);
      } else {
        userMerchant = data;
      }
    } catch (dbError) {
      console.error(
        `[API] Database error checking user_merchants: ${dbError.message}`
      );
    }

    // Check for existing user in multiple tables with case-insensitive comparison
    // First try user_profiles table (primary user table)
    let userData = null;
    let userExists = false;

    try {
      const { data: userProfileData, error: userProfileError } = await supabase
        .from('user_profiles')
        .select('*')
        .ilike('email', userEmail) // Use case-insensitive comparison
        .maybeSingle();

      if (userProfileError) {
        console.error(
          `[API] Error checking user_profiles: ${userProfileError.message}`
        );
      }

      if (userProfileData) {
        userData = userProfileData;
        userExists = true;
        console.log(`[API] User found in user_profiles table`);
      } else {
        // If not in user_profiles, try users table
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('*')
          .ilike('email', userEmail) // Use case-insensitive comparison
          .maybeSingle();

        if (usersError) {
          console.error(
            `[API] Error checking users table: ${usersError.message}`
          );
        }

        if (usersData) {
          userData = usersData;
          userExists = true;
          console.log(`[API] User found in users table`);
        } else {
          // Last resort: Check checkout_users if it exists
          try {
            const { data: checkoutUserData, error: checkoutUserError } =
              await supabase
                .from('checkout_users')
                .select('*')
                .ilike('email', userEmail)
                .maybeSingle();

            if (!checkoutUserError && checkoutUserData) {
              userData = checkoutUserData;
              userExists = true;
              console.log(`[API] User found in checkout_users table`);
            }
          } catch (err) {
            // Table might not exist, just log and continue
            console.log(
              `[API] Could not check checkout_users table: ${err.message}`
            );
          }
        }
      }
    } catch (dbError) {
      console.error(
        `[API] Database error checking user tables: ${dbError.message}`
      );
    }

    // If we still can't find the user but have a valid email, consider creating a basic user record
    if (!userExists && userEmail && userEmail.includes('@')) {
      console.log(
        `[API] No user found for ${userEmail.substring(0, 3)}***@${userEmail.split('@')[1]}, creating minimal record`
      );

      try {
        // Create a minimal user profile to enable authentication
        const { data: newUser, error: createError } = await supabase
          .from('user_profiles')
          .insert({
            email: userEmail,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            device_fingerprint: deviceFingerprint || null,
          })
          .select()
          .single();

        if (createError) {
          console.error(
            `[API] Error creating user profile: ${createError.message}`
          );
        } else if (newUser) {
          userData = newUser;
          userExists = true;
          console.log(`[API] Created new user profile for authentication`);
        }
      } catch (err) {
        console.error(`[API] Error in user creation fallback: ${err.message}`);
      }
    }

    if (userExists) {
      console.log(
        `[API] Authentication successful for ${userEmail.substring(0, 3)}***@${userEmail.split('@')[1]} on merchant ${merchantUsername}`
      );

      // Record merchant visit even if this is the first time
      if (!userMerchant && merchantId) {
        try {
          await supabase.from('user_merchants').insert({
            user_email: userEmail,
            merchant_id: merchantId,
            merchant_username: merchantUsername,
            last_visit: new Date().toISOString(),
            visit_count: 1,
          });
        } catch (insertError) {
          console.error(
            `[API] Error recording merchant visit: ${insertError.message}`
          );
          // Continue despite this error - it shouldn't block authentication
        }
      }

      return NextResponse.json({
        isAuthenticated: true,
        email: userEmail,
      });
    }

    console.log(
      `[API] Authentication failed: User ${userEmail.substring(0, 3)}***@${userEmail.split('@')[1]} not found for merchant ${merchantUsername}`
    );

    return NextResponse.json({
      isAuthenticated: false,
      message: 'User not found',
    });
  } catch (error) {
    console.error(`[API] Cross merchant auth error: ${error.message}`);

    return NextResponse.json(
      {
        isAuthenticated: false,
        message: 'Authentication error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
