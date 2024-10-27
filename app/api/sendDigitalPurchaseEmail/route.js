import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { randomUUID } from 'crypto';

export async function POST(req) {
  try {
    const { userEmail, userName, orderId, emailTemplate, subject } =
      await req.json();

    // Validate required fields
    if (!userEmail || !orderId || !emailTemplate || !subject) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: userEmail, orderId, emailTemplate, subject',
        },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createSupabaseClient();

    // Insert email into email-server table for cron processing
    const { error: emailError } = await supabase.from('email-server').insert({
      uuid: randomUUID(),
      username: userName || 'Customer',
      type: 'admin',
      send_at: new Date().toISOString(),
      to: userEmail,
      cc: null,
      bcc: null,
      subject: subject,
      body: null,
      html: emailTemplate,
      attachment_links: null,
      refreshToken: null,
    });

    if (emailError) {
      console.error(
        '❌ Error inserting digital purchase email to email-server:',
        emailError
      );
      return NextResponse.json(
        { error: 'Failed to queue digital purchase email' },
        { status: 500 }
      );
    }

    console.log('✅ Digital purchase email queued for', userEmail);
    return NextResponse.json({
      success: true,
      message: 'Digital purchase email queued successfully',
    });
  } catch (error) {
    console.error('❌ Error queuing digital purchase email:', error);
    return NextResponse.json(
      { error: 'Failed to queue digital purchase email' },
      { status: 500 }
    );
  }
}
