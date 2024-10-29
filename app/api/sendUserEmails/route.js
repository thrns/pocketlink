import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/Clients/supabase/server';
import { randomUUID } from 'crypto';

// Function to queue email to cron server
async function queueEmailToCronServer(
  recipient,
  subject,
  body,
  username,
  supabase
) {
  const { error } = await supabase.from('email-server').insert({
    uuid: randomUUID(),
    username: username || 'user',
    type: 'admin',
    send_at: new Date().toISOString(),
    to: recipient.email,
    cc: null,
    bcc: null,
    subject: subject,
    body: null,
    html: body,
    attachment_links: null,
    refreshToken: null,
  });

  if (error) {
    console.error(`❌ Error queuing email for ${recipient.email}:`, error);
    return false;
  }

  console.log(`✅ Email queued for ${recipient.email}`);
  return true;
}

// ✅ Function to replace `{{Name}}`, `{{Company}}`, etc., dynamically
const replacePlaceholders = (template, recipientData = {}, username = '') => {
  if (!template || typeof template !== 'string') return ''; // Ensure `template` is a string
  if (!recipientData || typeof recipientData !== 'object') return template; // Ensure `recipientData` is an object

  return template.replace(/{{(.*?)}}/g, (match, key) => {
    const trimmedKey = key.toLowerCase().trim();

    // Special case for unsubscribe URL with email placeholder
    if (
      match === '{{unsubscribeUrl}}' &&
      template.includes(
        `https://${username}.pocketlink.co/unsubscribe?email={{email}}`
      )
    ) {
      return `https://${username}.pocketlink.co/unsubscribe?email=${encodeURIComponent(recipientData.email || '')}`;
    }

    return recipientData.hasOwnProperty(trimmedKey)
      ? recipientData[trimmedKey]
      : `{{${trimmedKey}}}`;
  });
};

// ✅ API Handler - now using cron server
export async function POST(req) {
  try {
    const {
      to,
      from,
      subject = '',
      body = '',
      username = '', // Get the username from request
    } = await req.json();

    console.log('🔄 Queuing emails via cron server:', {
      recipientCount: to?.length || 0,
      from,
      username,
      hasSubject: !!subject,
      hasBody: !!body,
    });

    if (!to || !Array.isArray(to) || !from) {
      return NextResponse.json(
        { error: 'Insufficient email details.' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createSupabaseClient();

    let successCount = 0;
    let errorCount = 0;

    // ✅ Loop through each recipient and queue emails to cron server
    for (const recipient of to) {
      if (!recipient?.email) {
        console.warn('⚠️ Skipping recipient with invalid email:', recipient);
        continue; // Skip invalid recipients
      }

      try {
        // ✅ Replace placeholders with recipient's data
        const personalizedBody = replacePlaceholders(body, recipient, username);
        const personalizedSubject = replacePlaceholders(
          subject,
          recipient,
          username
        );

        // Queue email to cron server instead of sending directly
        const success = await queueEmailToCronServer(
          recipient,
          personalizedSubject,
          personalizedBody,
          username,
          supabase
        );

        if (success) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (recipientError) {
        console.error(
          `❌ Error processing recipient ${recipient.email}:`,
          recipientError
        );
        errorCount++;
      }
    }

    console.log('📧 Email queuing completed:', {
      total: to.length,
      successful: successCount,
      failed: errorCount,
    });

    if (errorCount > 0) {
      return NextResponse.json(
        {
          message: `Emails queued with some errors. ${successCount} successful, ${errorCount} failed.`,
          successful: successCount,
          failed: errorCount,
        },
        { status: 207 } // Multi-status
      );
    }

    return NextResponse.json({
      message: 'All emails queued successfully for cron processing.',
      queued: successCount,
    });
  } catch (error) {
    console.error('❌ Error queuing emails:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to queue emails.' },
      { status: 500 }
    );
  }
}
