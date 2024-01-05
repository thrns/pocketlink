export const premiumConfirmation = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Premium Upgrade Confirmed - PocketLink</title>
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
    .thrilled {
    padding-top: 20px;
    font-size: 16px;
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
    .message.premium-accent {
      border-left: 4px solid #8B5CF6;
      background-color: #f7f7fd;
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
    /* Using the same purple button style as welcome email */
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
    .receipt-section {
      padding: 24px;
      background-color: #f9f9fb;
      border-radius: 12px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .receipt-title {
      margin-top: 0;
      margin-bottom: 20px;
      text-align: center;
      font-size: 20px;
      font-weight: 600;
      color: #111111;
    }
    .receipt-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    .receipt-table td {
      padding: 10px 5px;
      vertical-align: top;
      line-height: 1.4;
    }
    .receipt-label {
      font-weight: 600;
      color: #555555;
      width: 40%;
    }
    .receipt-value {
      color: #333333;
      width: 60%;
      text-align: right;
    }
    .receipt-divider {
      height: 1px;
      background-color: #e4e4e7;
      margin: 12px 0;
    }
    .receipt-total-row td {
      padding-top: 14px;
      font-weight: 600;
      font-size: 16px;
      color: #111111;
    }
    .premium-features-section {
      padding: 20px 0 30px;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #111111;
      margin: 0 0 20px;
    }
    .premium-feature {
      display: table;
      width: 100%;
      margin-bottom: 18px;
      background-color: #ffffff;
      border-radius: 10px;
      padding: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .feature-icon-cell {
      display: table-cell;
      vertical-align: middle;
      width: 40px;
    }
    .feature-icon {
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
    .feature-content {
      display: table-cell;
      vertical-align: middle;
      padding-left: 15px;
    }
    .feature-title {
      font-weight: 600;
      margin: 0 0 4px;
      color: #111111;
      font-size: 16px;
    }
    .feature-description {
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
          <!-- Confirmation Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="hello-section">
            <tr>
              <td class="message purple-accent">
                <p>Hey {{userName}} 🎉</p>
                <p>You're officially premium! Thanks for upgrading your PocketLink account.</p>
                <p>Your premium features are now active and ready to use.</p>
              </td>
            </tr>
            <tr>
              <td class="thrilled" >
                <p>We're thrilled you've decided to take your link-in-bio page to the next level. You now have access to all our premium features that will help boost your conversions and stand out from the crowd.</p>
              </td>
            </tr>
          </table>
          
          <!-- Receipt Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="receipt-section">
                  <h3 class="receipt-title">Purchase Receipt</h3>
                  <table class="receipt-table" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="receipt-label">Order ID:</td>
                      <td class="receipt-value">{{orderId}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Date:</td>
                      <td class="receipt-value">{{orderDate}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Plan:</td>
                      <td class="receipt-value">PocketLink Premium</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Billing Period:</td>
                      <td class="receipt-value">{{billingPeriod}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Payment Method:</td>
                      <td class="receipt-value">{{paymentMethod}}</td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="receipt-divider"></div>
                      </td>
                    </tr>
                    <tr class="receipt-total-row">
                      <td class="receipt-label">Total:</td>
                      <td class="receipt-value">{{orderTotal}}</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- View Dashboard Button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="button-container">
                <a href="https://pocketlink.co/dashboard" class="button">Go to Dashboard</a>
              </td>
            </tr>
          </table>
          
          <!-- Premium Features Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="premium-features-section">
            <tr>
              <td class="section-title">Your Premium Features ✨</td>
            </tr>
            
            <!-- Feature 1 -->
            <tr>
              <td>
                <div class="premium-feature">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="feature-icon-cell">
                        <div class="feature-icon">⚡</div>
                      </td>
                      <td class="feature-content">
                        <p class="feature-title">Custom Domain</p>
                        <p class="feature-description">Use your own domain for a more professional look</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Feature 2 -->
            <tr>
              <td>
                <div class="premium-feature">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="feature-icon-cell">
                        <div class="feature-icon">📊</div>
                      </td>
                      <td class="feature-content">
                        <p class="feature-title">Advanced Analytics</p>
                        <p class="feature-description">Get detailed insights on visitor behavior and link performance</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Feature 3 -->
            <tr>
              <td>
                <div class="premium-feature">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="feature-icon-cell">
                        <div class="feature-icon">🎨</div>
                      </td>
                      <td class="feature-content">
                        <p class="feature-title">Premium Themes</p>
                        <p class="feature-description">Access exclusive designs and customization options</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Feature 4 -->
            <tr>
              <td>
                <div class="premium-feature">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="feature-icon-cell">
                        <div class="feature-icon">🤖</div>
                      </td>
                      <td class="feature-content">
                        <p class="feature-title">Your Own AI Chatbot</p>
                        <p class="feature-description">Engage users with a fully branded, customizable AI chatbot tailored to your needs</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
        
          
          <!-- Personal Note -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="message">
                <p>Thanks for supporting PocketLink!</p>
                <p>If you have any questions about your premium features, our support team is here to help.</p>
                <p>- Atheeb</p>
              </td>
            </tr>
          </table>
          
          <!-- Support Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 20px 0; color: #555555; font-size: 14px;">
                Questions about your premium account? Contact us: <a href="mailto:{{premiumSupport}}" style="color: #7C3AED; text-decoration: none;">{{premiumSupport}}</a>
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
            <a href="https://pocketlink.co/billing">Billing</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
