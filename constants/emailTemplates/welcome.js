// pocketlink-welcome.js - Modern welcome email template with personal touch

export const welcome = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to PocketLink</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #333333;
      line-height: 1.5;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #fafafa;
      padding: 40px 0;
    }
    .main {
      background-color: #ffffff;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      border-spacing: 0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
    }
    .padding {
      padding: 0 30px;
    }
    .header {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
      padding: 30px 0;
      text-align: center;
    }
    .logo {
      width: 130px;
      height: auto;
      filter: brightness(0) invert(1);
    }
    .hello-section {
      padding: 35px 0 20px;
    }
    .message {
      padding: 18px;
      background-color: #f7f7fd;
      border-radius: 10px;
      margin: 15px 0;
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .message.purple-accent {
      border-left: 4px solid #8B5CF6;
    }
    .message p {
      margin: 0 0 10px;
      padding: 0;
    }
    .message p:last-child {
      margin-bottom: 0;
    }
    .button-container {
      text-align: center;
      padding: 25px 0;
    }
    .button {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 16px;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
      transition: all 0.2s ease;
    }
    .contact-section {
      padding: 10px 0;
    }
    .contact-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 20px;
      margin: 10px 0 25px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    }
    .secondary-button {
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      color: #333333;
      display: inline-block;
      font-weight: 500;
      margin: 0 0 12px 0;
      padding: 10px 18px;
      text-decoration: none;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.2s ease;
    }
    .secondary-button:hover {
      background-color: #f9fafb;
      border-color: #d1d5db;
    }
    .button-icon {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 4px;
    }
    .button-text {
      display: inline-block;
      vertical-align: middle;
    }
    .steps-section {
      padding: 20px 0 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #111111;
      margin: 0 0 20px;
    }
    .step {
      display: table;
      width: 100%;
      margin-bottom: 18px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .step-number-cell {
      display: table-cell;
      vertical-align: middle;
      width: 40px;
    }
    .step-number {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
      color: #ffffff;
      border-radius: 50%;
      display: inline-block;
      text-align: center;
      font-weight: 600;
      line-height: 32px;
      font-size: 16px;
    }
    .step-content {
      display: table-cell;
      vertical-align: middle;
      padding-left: 15px;
    }
    .step-title {
      font-weight: 600;
      margin: 0 0 4px;
      color: #111111;
      font-size: 16px;
    }
    .step-description {
      margin: 0;
      color: #555555;
      font-size: 14px;
    }
    .tips-box {
      background-color: #f9f9fb;
      border-radius: 12px;
      padding: 24px;
      margin: 15px 0 30px;
    }
    .tips-box p {
      margin: 0 0 10px;
      color: #444444;
    }
    .tips-box p:last-child {
      margin-bottom: 0;
    }
    .tips-title {
      font-weight: 600;
      margin: 0 0 12px;
      color: #111111;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
    .tips-icon {
      margin-right: 8px;
      font-size: 20px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 25px 0;
      text-align: center;
      color: #71717a;
      font-size: 13px;
    }
    .footer a {
      color: #71717a;
      text-decoration: none;
      margin: 0 8px;
    }
    .social-footer {
      margin-bottom: 15px;
    }
    .divider {
      height: 1px;
      background-color: #e4e4e7;
      margin: 15px 0;
    }
    .emoji-highlight {
      font-size: 18px;
      margin-right: 5px;
    }
    .link-highlight {
      color: #7C3AED;
      font-weight: 500;
    }
    .share-box {
      background-color: #f0f0f7;
      border-radius: 12px;
      padding: 20px;
      margin: 15px 0;
      text-align: center;
    }
    .meme-container {
      margin: 15px 0;
      text-align: center;
    }
    .meme-image {
      max-width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .callout {
      background-color: #7C3AED;
      color: white;
      border-radius: 8px;
      padding: 3px 10px;
      font-weight: 500;
      margin-right: 5px;
      font-size: 14px;
    }
    @media screen and (max-width: 600px) {
      .padding {
        padding: 0 20px;
      }
      .wrapper {
        padding: 10px 0;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="main" width="100%" cellpadding="0" cellspacing="0" border="0">
      <!-- Header -->
      <tr>
        <td class="header">
          <img src="https://pocketlink.co/ogImg.png" alt="PocketLink" class="logo">
        </td>
      </tr>
      
      <!-- Main Content -->
      <tr>
        <td class="padding">
          <!-- Welcome Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="hello-section">
            <tr>
              <td>
                <h2>Congrats on launching your PocketLink! 🎉</h2>
              </td>
            </tr>
            <tr>
              <td class="message purple-accent">
                <p>Hey {{userName}} 👋</p>
                <p>I'm Atheeb, founder of PocketLink. I wanted to quickly check in and say congrats on creating your page!</p>
                <p>It looks like your PocketLink is ready to be added to all of your socials, so your community gets a better feeling for who you are and what amazing things you're creating.</p>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 15px;">
                <p>I built PocketLink because I was tired of all link-in-bio pages looking the same. Ours helps boost conversions through a much better design with way more features.</p>
              </td>
            </tr>
          </table>
          
          <!-- Meme Image -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="meme-container">
                <img src="https://nrmyvnoocshxoqmibdip.supabase.co/storage/v1/object/public/LANDINGPAGE_VIDEOS/WELCOME%20EMAIL%20IMAGE.png" alt="You have to share it with the world" class="meme-image">
              </td>
            </tr>
          </table>
          
          <!-- Feedback Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 15px 0;">
                <p>Also, we've just started out, so your thoughts will be super valuable to us 🙏 Feel free to ask any questions or share feedback. Simply reply to this email!</p>
                <p>Would love to shape the product roadmap with your help.</p>
                <p>What I can tell you already: there's a lot more to come 🔥 stay tuned.</p>
              </td>
            </tr>
          </table>
          
          <!-- Create Button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="button-container">
                <a href="https://pocketlink.co/dashboard" class="button">Manage Your Page</a>
              </td>
            </tr>
          </table>
          
          <!-- Contact Me -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <h3>Feel free to reach out anytime - I always respond:</h3>
              </td>
            </tr>
          </table>
          
          <!-- Contact Buttons -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="contact-section">
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <a href="https://wa.me/919840572975" class="secondary-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png" alt="WhatsApp" class="button-icon">
                        <span class="button-text">WhatsApp +91 9840572975</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://twitter.com/pocketlink_co" class="secondary-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png" alt="Twitter" class="button-icon">
                        <span class="button-text">Twitter @pocketlink_co</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="https://instagram.com/pocketlink.co" class="secondary-button">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" class="button-icon">
                        <span class="button-text">Instagram @pocketlink.co</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          
          <!-- Steps Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="steps-section">
            <tr>
              <td class="section-title">How to get the most out of PocketLink 🚀</td>
            </tr>
            
            <!-- Step 1 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-number-cell">
                        <div class="step-number">1</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Customize your profile</p>
                        <p class="step-description">Make it yours with your brand colors, photos, and a compelling bio</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Step 2 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-number-cell">
                        <div class="step-number">2</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Organize your links strategically</p>
                        <p class="step-description">Group by categories and add custom icons for better engagement</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Step 3 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-number-cell">
                        <div class="step-number">3</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Share everywhere and track performance</p>
                        <p class="step-description">Add to your social bios and use analytics to see what works</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Share Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="share-box">
                <p><b>PS:</b> If you share your PocketLink on Twitter, Instagram, or another channel and mention us (@pocketlink.co), chances are high that we'll repost! 🚀</p>
              </td>
            </tr>
          </table>
          
          <!-- Tips Box -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="tips-box">
                  <p class="tips-title"><span class="tips-icon">💡</span>Pro Tips</p>
                  <p>Top users update their page weekly with fresh content</p>
                  <p>Use analytics to see which links are getting the most clicks</p>
                  <p>Need ideas? Check our <a href="https://pocketlink.co/help" style="color: #7C3AED; text-decoration: none;">Help Center</a></p>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Personal Note -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="message">
                <p>Can't wait to see what you create with PocketLink!</p>
                <p>Enjoy your day!</p>
                <p>- Atheeb H</p>
              </td>
            </tr>
          </table>
          
          <!-- Support Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 20px 0; color: #555555; font-size: 14px;">
                Need help? Our team is here: <a href="mailto:support@pocketlink.co" style="color: #7C3AED; text-decoration: none;">support@pocketlink.co</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td class="footer">
          <div class="social-footer">
            <a href="https://x.com/pocketlink_co">Twitter</a>
            <a href="https://www.linkedin.com/company/pocketlink/">LinkedIn</a>
            <a href="https://instagram.com/pocketlink.co">Instagram</a>
          </div>
          <div class="divider"></div>
          <p>© 2025 PocketLink</p>
          <div>
            <a href="https://pocketlink.co/privacy">Privacy</a>
            <a href="https://pocketlink.co/terms">Terms</a>
            <a href="https://pocketlink.co/unsubscribe">Unsubscribe</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
