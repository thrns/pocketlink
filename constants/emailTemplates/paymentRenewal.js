export const paymentRenewal = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Renewed - PocketLink</title>
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
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
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
      background-color: #eff6ff;
      border-radius: 10px;
      margin: 15px 0;
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .message.renewal-accent {
      border-left: 4px solid #3B82F6;
    }
    .message.info-accent {
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
    .status-badge {
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
      color: white;
      border-radius: 20px;
      padding: 4px 12px;
      font-weight: 500;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .next-steps-section {
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
    .step-icon-cell {
      display: table-cell;
      vertical-align: middle;
      width: 40px;
    }
    .step-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
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
      background-color: #f7f7fd;
      border-radius: 12px;
      padding: 24px;
      margin: 15px 0 30px;
      border-left: 4px solid #8B5CF6;
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
    .celebration-section {
      text-align: center;
      padding: 20px 0;
    }
    .celebration-emoji {
      font-size: 48px;
      margin-bottom: 10px;
      display: block;
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
          <!-- Celebration Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="celebration-section">
            <tr>
              <td>
                <span class="celebration-emoji">🔄</span>
                <h2>Subscription Renewed!</h2>
              </td>
            </tr>
          </table>

          <!-- Renewal Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="hello-section">
            <tr>
              <td class="message renewal-accent">
                <p>Hi {{userName}} 👋</p>
                <p>Great news! Your PocketLink {{planName}} subscription has been successfully renewed.</p>
                <p>Your premium features will continue uninterrupted for another {{billingPeriod}}.</p>
              </td>
            </tr>
          </table>
          
          <!-- Receipt Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="receipt-section">
                  <h3 class="receipt-title">Renewal Receipt</h3>
                  <table class="receipt-table" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="receipt-label">Transaction ID:</td>
                      <td class="receipt-value">{{transactionId}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Renewal Date:</td>
                      <td class="receipt-value">{{renewalDate}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Plan:</td>
                      <td class="receipt-value">PocketLink {{planName}}</td>
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
                      <td class="receipt-label">Status:</td>
                      <td class="receipt-value"><span class="status-badge">RENEWED</span></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <div class="receipt-divider"></div>
                      </td>
                    </tr>
                    <tr class="receipt-total-row">
                      <td class="receipt-label">Amount Paid:</td>
                      <td class="receipt-value">{{amount}} {{currency}}</td>
                    </tr>
                    <tr>
                      <td class="receipt-label">Next Billing:</td>
                      <td class="receipt-value">{{nextBillingDate}}</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Dashboard Button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="button-container">
                <a href="https://pocketlink.co/dashboard" class="button">Go to Dashboard</a>
              </td>
            </tr>
          </table>
          
          <!-- Continued Benefits Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="next-steps-section">
            <tr>
              <td class="section-title">Your Benefits Continue 🚀</td>
            </tr>
            
            <!-- Benefit 1 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-icon-cell">
                        <div class="step-icon">✅</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Uninterrupted premium access</p>
                        <p class="step-description">All your premium features remain active without any downtime</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Benefit 2 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-icon-cell">
                        <div class="step-icon">🎨</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Premium themes & customization</p>
                        <p class="step-description">Continue using exclusive designs and advanced customization options</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
            
            <!-- Benefit 3 -->
            <tr>
              <td>
                <div class="step">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="step-icon-cell">
                        <div class="step-icon">📊</div>
                      </td>
                      <td class="step-content">
                        <p class="step-title">Advanced analytics & insights</p>
                        <p class="step-description">Keep tracking detailed visitor behavior and link performance</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Tips Box -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="tips-box">
                  <p class="tips-title"><span class="tips-icon">💡</span>Make the Most of Your Renewal</p>
                  <p><strong>Try new features:</strong> Check out any recently added premium features and tools</p>
                  <p><strong>Optimize your page:</strong> Use analytics insights to improve your link performance</p>
                  <p><strong>Custom domain:</strong> If you haven't already, set up your professional custom domain</p>
                  <p><strong>Share & grow:</strong> Continue building your audience with premium design options</p>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Information Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="message info-accent">
                <p><strong>Thanks for continuing with PocketLink Premium!</strong></p>
                <p>Your support helps us keep improving and adding new features. We're excited to see what you create next!</p>
                <p>As always, our support team is here if you need any help getting the most out of your premium features.</p>
              </td>
            </tr>
          </table>
          
          <!-- Support Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 20px 0; color: #555555; font-size: 14px; text-align: center;">
                Questions about your subscription? Contact us: <a href="mailto:support@pocketlink.co" style="color: #3B82F6; text-decoration: none;">support@pocketlink.co</a>
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
            <a href="https://pocketlink.co/dashboard/settings/billing">Billing</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
