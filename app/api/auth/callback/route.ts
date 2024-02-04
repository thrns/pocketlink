import { createSupabaseClient } from '@/Clients/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { welcome } from '@/constants/emailTemplates/welcome';
import { loginAlert } from '@/constants/emailTemplates/loginAlert';
import { storeUserDataServer } from '@/lib/utils/sessionUtils';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const appUrl =
    process.env.NODE_ENV == 'production'
      ? process.env.NEXT_PUBLIC_DOMAIN
      : requestUrl.origin;

  if (!code) {
    return NextResponse.redirect(appUrl);
  }

  const supabase = await createSupabaseClient();
  const { data: session, error: sessionError } =
    await supabase.auth.exchangeCodeForSession(code);

  if (sessionError) {
    console.error(
      '❌ Error exchanging code for session:',
      sessionError.message
    );
    return NextResponse.redirect(`${appUrl}/error`);
  }
  //ok
  const supabaseUser = session.user;
  if (!supabaseUser) {
    console.error('❌ No Supabase user found after session exchange.');
    return NextResponse.redirect(`${appUrl}/error`);
  }

  // Fetch the user from `user_data`
  const { data: userData, error: userDataError } = await supabase
    .from('user_data')
    .select('*')
    .eq('email', supabaseUser.email);

  // Default user object if no record found
  const fallbackUser = {
    name: supabaseUser.user_metadata.full_name || null,
    email: supabaseUser.email || null,
    avatarURL: supabaseUser.user_metadata.avatar_url || null,
    googleRefreshToken: session.session?.provider_refresh_token || null,
    uuid: supabaseUser.id,
    onboarding: false,
    is_premium: false,
  };

  // Store minimal session data in cookies to prevent HTTP 431 errors
  await storeUserDataServer(fallbackUser, await cookies());

  // Check if user is new or existing
  const isNewUser = userDataError || !userData.length;

  if (isNewUser) {
    // Send welcome email for new users to email-server table
    try {
      const userName = fallbackUser.name || 'there';
      const supportEmail = 'support@pocketlink.co';

      // Replace variables in the welcome template
      let welcomeEmailBody = welcome;
      welcomeEmailBody = welcomeEmailBody.replace(/{{userName}}/g, userName);
      welcomeEmailBody = welcomeEmailBody.replace(
        /{{supportEmail}}/g,
        supportEmail
      );

      // Insert welcome email into email-server table
      const { error: emailServerError } = await supabase
        .from('email-server')
        .insert({
          uuid: crypto.randomUUID(),
          username: fallbackUser.name,
          type: 'admin',
          send_at: new Date().toISOString(),
          to: fallbackUser.email,
          cc: null,
          bcc: null,
          subject: 'Welcome to PocketLink!',
          body: null,
          html: welcomeEmailBody,
          attachment_links: null,
          refreshToken: null,
        });

      if (emailServerError) {
        console.error(
          '❌ Error inserting welcome email to email-server:',
          emailServerError
        );
      }
    } catch (emailError) {
      console.error('❌ Error preparing welcome email:', emailError);
    }

    return NextResponse.redirect(`${appUrl}/onboarding`);
  }

  let existingUser = userData[0];
  const nowIso = new Date().toISOString();

  // ✅ If the user was migrated, update their UUID
  if (existingUser.migrated) {
    const { error: uuidUpdateError } = await supabase
      .from('user_data')
      .update({ uuid: supabaseUser.id, migrated: null })
      .eq('uuid', existingUser.uuid);

    if (uuidUpdateError) {
      console.error('❌ Error updating UUID:', uuidUpdateError);
    } else {
      existingUser.uuid = supabaseUser.id;
    }
  }

  // Check if is_premium is undefined or null and set update payload accordingly
  const updatePayload: {
    loggedin_at: string;
    googleRefreshToken: string;
    is_premium?: boolean;
  } = {
    loggedin_at: nowIso,
    googleRefreshToken: session.session?.provider_refresh_token,
  };

  // If is_premium is undefined or null, set it to false
  if (
    existingUser.is_premium === undefined ||
    existingUser.is_premium === null
  ) {
    updatePayload.is_premium = false;
  }

  // ✅ Update last login timestamp, refresh token, and is_premium if needed
  const { error: updateErr } = await supabase
    .from('user_data')
    .update(updatePayload)
    .eq('uuid', existingUser.uuid);

  if (updateErr) {
    console.error('❌ Error updating user data:', updateErr);
  }

  // ✅ Fetch the updated user data
  const { data: refetchedUser, error: refetchError } = await supabase
    .from('user_data')
    .select('*')
    .eq('uuid', existingUser.uuid)
    .single();

  if (!refetchError && refetchedUser) {
    existingUser = refetchedUser;
  }

  // Store minimal session data in cookies to prevent HTTP 431 errors
  await storeUserDataServer(existingUser, await cookies());

  // Send login alert email for existing users
  // try {
  //   // Get user device, browser, and location info
  //   const userAgent = request.headers.get('user-agent') || 'Unknown Device';
  //   const ipAddress =
  //     request.headers.get('x-forwarded-for') ||
  //     request.headers.get('x-real-ip') ||
  //     'Unknown IP';

  //   // You may want to expand this with a more sophisticated IP geolocation service
  //   const loginLocation = 'Unknown Location';

  //   // Parse user agent for device and browser info
  //   const deviceType = userAgent.includes('Mobile')
  //     ? 'Mobile Device'
  //     : 'Desktop Computer';
  //   const browserInfo = getBrowserInfo(userAgent);

  //   const loginDateTime = new Date().toLocaleString('en-US', {
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     timeZoneName: 'short',
  //   });

  //   // Replace variables in the login alert template
  //   let loginAlertEmailBody = loginAlert;
  //   loginAlertEmailBody = loginAlertEmailBody.replace(
  //     /{{loginDateTime}}/g,
  //     loginDateTime
  //   );
  //   loginAlertEmailBody = loginAlertEmailBody.replace(
  //     /{{loginLocation}}/g,
  //     loginLocation
  //   );
  //   loginAlertEmailBody = loginAlertEmailBody.replace(
  //     /{{deviceType}}/g,
  //     deviceType
  //   );
  //   loginAlertEmailBody = loginAlertEmailBody.replace(
  //     /{{browserInfo}}/g,
  //     browserInfo
  //   );
  //   loginAlertEmailBody = loginAlertEmailBody.replace(
  //     /{{ipAddress}}/g,
  //     ipAddress
  //   );

  //   // Replace username in the pocketlink URL for existing users
  //   if (existingUser.username) {
  //     loginAlertEmailBody = loginAlertEmailBody.replace(
  //       /https:\/\/{{username}}\.pocketlink\.co/g,
  //       `https://${existingUser.username}.pocketlink.co`
  //     );
  //   }

  //   await fetch(`${appUrl}/api/sendEmails`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       to: [{ email: existingUser.email, name: existingUser.name }],
  //       from: 'PocketLink <support@pocketlink.co>',
  //       subject: 'New Login to Your PocketLink Account',
  //       body: loginAlertEmailBody,
  //     }),
  //   });

  // } catch (emailError) {
  //   console.error('❌ Error sending login alert email:', emailError);
  // }

  // 🚀 Check if username exists, redirect accordingly
  if (!existingUser.username) {
    return NextResponse.redirect(`${appUrl}/onboarding`);
  }

  return NextResponse.redirect(`${appUrl}/dashboard`);
}

// Simple browser detection function
function getBrowserInfo(userAgent: string): string {
  if (!userAgent) return 'Unknown Browser';

  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg'))
    return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome'))
    return 'Safari';
  if (userAgent.includes('Edg')) return 'Microsoft Edge';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident/'))
    return 'Internet Explorer';

  return 'Unknown Browser';
}
