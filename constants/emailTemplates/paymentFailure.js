export const paymentFailure = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Issue - Update Required - PocketLink</title>
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
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
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
      background-color: #fef2f2;
      border-radius: 10px;
      margin: 15px 0;
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .message.warning-accent {
      border-left: 4px solid #EF4444;
    }
    .message.info-accent {
      border-left: 4px solid #3B82F6;
      background-color: #eff6ff;
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
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 36px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 16px;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
      transition: all 0.2s ease;
    }
    .secondary-button {
      background-color: #ffffff;
      border: 1px solid #e4e4e7;
      border-radius: 8px;
      color: #333333;
      display: inline-block;
      font-weight: 500;
      margin: 10px 5px;
      padding: 10px 18px;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .issue-details-section {
      padding: 24px;
      background-color: #f9f9fb;
      border-radius: 12px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .issue-title {
      margin-top: 0;
      margin-bottom: 20px;
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #111111;
    }
    .issue-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
    }
    .issue-table td {
      padding: 10px 5px;
      vertical-align: top;
      line-height: 1.4;
    }
    .issue-label {
      font-weight: 600;
      color: #555555;
      width: 40%;
    }
    .issue-value {
      color: #333333;
      width: 60%;
      text-align: right;
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
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
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
      background-color: #f0f9ff;
      border-radius: 12px;
      padding: 24px;
      margin: 15px 0 30px;
      border-left: 4px solid #3B82F6;
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
          <!-- Alert Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="hello-section">
            <tr>
              <td>
                <h2>Payment Update Required 💳</h2>
              </td>
            </tr>
            <tr>
              <td class="message warning-accent">
                <p>Hi {{userName}} 👋</p>
                <p>We had trouble processing your {{paymentType}} payment for your PocketLink {{planName}} subscription.</p>
                <p><strong>Don't worry</strong> - your account is still active{{gracePeriodText}} while you update your payment information.</p>
              </td>
            </tr>
          </table>
          
          <!-- Payment Details -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="issue-details-section">
                  <h3 class="issue-title">Payment Details</h3>
                  <table class="issue-table" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td class="issue-label">Amount:</td>
                      <td class="issue-value">{{amount}} {{currency}}</td>
                    </tr>
                    <tr>
                      <td class="issue-label">Payment Date:</td>
                      <td class="issue-value">{{paymentDate}}</td>
                    </tr>
                    <tr>
                      <td class="issue-label">Reason:</td>
                      <td class="issue-value">{{failureReason}}</td>
                    </tr>
                    <tr>
                      <td class="issue-label">Subscription:</td>
                      <td class="issue-value">{{planName}} Plan</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Update Payment Button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="button-container">
                <a href="https://pocketlink.co/dashboard/settings/billing" class="button">Update Payment Method</a>
              </td>
            </tr>
          </table>
          
          <!-- Steps Section -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="steps-section">
            <tr>
              <td class="section-title">How to Fix This 🛠️</td>
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
                        <p class="step-title">Go to your billing settings</p>
                        <p class="step-description">Click the button above or visit Dashboard → Settings → Billing</p>
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
                        <p class="step-title">Update your payment information</p>
                        <p class="step-description">Add a new card, update expiry date, or fix billing address</p>
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
                        <p class="step-title">We'll retry automatically</p>
                        <p class="step-description">Once updated, we'll process the payment and restore full access</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Common Issues Tips -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="tips-box">
                  <p class="tips-title"><span class="tips-icon">💡</span>Common Issues & Solutions</p>
                  <p><strong>Card Declined:</strong> Check with your bank - they may have blocked the transaction</p>
                  <p><strong>Expired Card:</strong> Update your card expiry date in billing settings</p>
                  <p><strong>Insufficient Funds:</strong> Ensure your account has enough balance</p>
                  <p><strong>Wrong Address:</strong> Verify your billing address matches your card</p>
                </div>
              </td>
            </tr>
          </table>

          <!-- Alternative Actions -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="text-align: center; padding: 10px 0;">
                <a href="mailto:support@pocketlink.co" class="secondary-button">Contact Support</a>
                <a href="https://pocketlink.co/dashboard" class="secondary-button">View Dashboard</a>
              </td>
            </tr>
          </table>
          
          <!-- Information Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="message info-accent">
                <p><strong>What happens next?</strong></p>
                <p>{{nextStepsText}}</p>
                <p>We're here to help if you need any assistance updating your payment method.</p>
              </td>
            </tr>
          </table>
          
          <!-- Support Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 20px 0; color: #555555; font-size: 14px; text-align: center;">
                Questions about billing? We're here to help: <a href="mailto:support@pocketlink.co" style="color: #EF4444; text-decoration: none;">support@pocketlink.co</a>
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
