import { NextResponse } from 'next/server';
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// ✅ Function to create OAuth2 client
function createOAuth2Client(clientId, clientSecret, redirectUri, refreshToken) {
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );
  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  return oAuth2Client;
}

// ✅ Function to replace `{{Name}}`, `{{Company}}`, etc., dynamically
const replacePlaceholders = (template, recipientData = {}) => {
  if (!template || typeof template !== 'string') return ''; // Ensure `template` is a string
  if (!recipientData || typeof recipientData !== 'object') return template; // Ensure `recipientData` is an object

  return template.replace(/{{(.*?)}}/g, (_, key) => {
    const trimmedKey = key.toLowerCase().trim();
    return recipientData.hasOwnProperty(trimmedKey)
      ? recipientData[trimmedKey]
      : `{{${trimmedKey}}}`;
  });
};

// ✅ API Handler
export async function POST(req) {
  try {
    const {
      to,
      from,
      subject = '',
      body = '',
      refreshToken,
    } = await req.json();

    console.log('to: ', to);
    console.log('from: ', from);

    if (!to || !Array.isArray(to) || !from) {
      return NextResponse.json(
        { error: 'Insufficient email details.' },
        { status: 400 }
      );
    }

    // ✅ Initialize Gmail API if refreshToken is available
    let gmail;
    if (refreshToken) {
      const oAuth2Client = createOAuth2Client(
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground',
        refreshToken
      );

      gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    }

    // ✅ Nodemailer fallback setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXT_PUBLIC_POCKETLINK_USER_EMAIL,
        pass: process.env.NEXT_PUBLIC_POCKETLINK_APP_PASSWORD,
      },
    });

    // ✅ Loop through each recipient and send personalized emails
    for (const recipient of to) {
      if (!recipient?.email) continue; // Skip invalid recipients

      // ✅ Replace placeholders with recipient's data
      const personalizedBody = replacePlaceholders(body, recipient);
      const personalizedSubject = replacePlaceholders(subject, recipient);

      // ✅ Construct Email Content
      const emailContent = [
        `To: ${recipient.email}`,
        `Subject: =?UTF-8?B?${Buffer.from(personalizedSubject).toString(
          'base64'
        )}?=`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset="UTF-8"`,
        '',
        personalizedBody,
      ].join('\n');

      const encodedMessage = Buffer.from(emailContent)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      try {
        if (gmail) {
          console.log('=====GMAIL MODE======');
          // ✅ Try sending via Gmail API first
          await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw: encodedMessage },
          });

          console.log(`✅ Email sent to: ${recipient.email} via Gmail API`);
        } else {
          throw new Error('No Gmail API access, falling back to Nodemailer');
        }
      } catch (gmailError) {
        console.error(
          `❌ Gmail API failed for ${recipient.email}:`,
          gmailError
        );

        // ✅ Fallback to Nodemailer
        console.log('=====FALLBACK MODE======');
        try {
          const info = await transporter.sendMail({
            from: process.env.USER_EMAIL,
            to: recipient.email,
            subject: personalizedSubject,
            html: personalizedBody,
          });

          console.log(
            `✅ Email sent to: ${recipient.email} via Nodemailer`,
            info.messageId
          );
        } catch (nodemailerError) {
          console.log(
            `❌ Nodemailer failed for ${recipient.email}:`,
            nodemailerError
          );
        }
      }
    }
    console.log('=====ALL EMAILS PROCESSED SUCCESSFULLY======');
    return NextResponse.json({ message: 'All emails processed successfully.' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send email.' },
      { status: 500 }
    );
  }
}
