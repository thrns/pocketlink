export const digitalPurchase = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Purchase Confirmation - PocketLink</title>
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
      font-weight: 500;
      color: #555555;
      width: 65%;
    }
    .receipt-value {
      color: #333333;
      width: 35%;
      text-align: right;
      font-weight: 500;
    }
    .receipt-divider {
      height: 1px;
      background-color: #e4e4e7;
      margin: 12px 0;
    }
    .receipt-total-row td {
      padding-top: 14px;
      font-weight: 700;
      font-size: 16px;
      color: #111111;
    }
    .items-section {
      padding: 20px 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 600;
      color: #111111;
      margin: 0 0 20px;
    }
    .item-card {
      background-color: #ffffff;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
      border: 1px solid #f0f0f0;
    }
    .item-header {
      display: table;
      width: 100%;
      margin-bottom: 15px;
    }
    .item-icon-cell {
      display: table-cell;
      vertical-align: middle;
      width: 50px;
    }
    .item-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
      color: #ffffff;
      border-radius: 8px;
      display: inline-block;
      text-align: center;
      font-weight: 600;
      line-height: 40px;
      font-size: 18px;
    }
    .item-details {
      display: table-cell;
      vertical-align: middle;
      padding-left: 15px;
    }
    .item-title {
      font-weight: 600;
      margin: 0 0 4px;
      color: #111111;
      font-size: 18px;
    }
    .item-description {
      margin: 0 0 8px;
      color: #555555;
      font-size: 14px;
    }
    .item-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #f0f0f0;
    }
    .item-quantity {
      font-size: 14px;
      color: #666666;
      margin-right: 15px;
    }
    .item-price {
      font-weight: 600;
      color: #333333;
      font-size: 16px;
    }
    .download-button {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 14px;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);
      transition: all 0.2s ease;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 5px;
    }
    .download-section {
      background-color: #f7f7fd;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
      border-left: 4px solid #8B5CF6;
    }
    .download-title {
      font-weight: 600;
      margin: 0 0 12px;
      color: #111111;
      font-size: 18px;
      display: flex;
      align-items: center;
    }
    .download-icon {
      margin-right: 8px;
      font-size: 20px;
    }
    .download-note {
      margin: 0 0 15px;
      color: #555555;
      font-size: 14px;
    }
    .access-info {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
      color: #856404;
    }
    .access-info p {
      margin: 0;
      font-size: 14px;
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
    .access-url-section {
      background-color: #f0f7ff;
      border-radius: 8px;
      padding: 12px 15px;
      margin-top: 15px;
      margin-bottom: 10px;
      border-left: 4px solid #3b82f6;
    }
    .access-url-title {
      font-weight: 600;
      margin: 0 0 8px;
      color: #1e40af;
      font-size: 15px;
    }
    .access-url-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    .access-url-item {
      padding: 6px 0;
      word-break: break-all;
    }
    .access-url {
      color: #2563eb;
      text-decoration: underline;
    }
    .download-files-section {
      margin-top: 15px;
    }
    .download-files-title {
      font-weight: 600;
      margin: 0 0 10px;
      color: #4b5563;
      font-size: 15px;
    }
    @media screen and (max-width: 600px) {
      .padding {
        padding: 0 20px;
      }
      .wrapper {
        padding: 10px 0;
      }
      .item-header {
        display: block;
      }
      .item-icon-cell {
        display: block;
        width: 100%;
        margin-bottom: 10px;
      }
      .item-details {
        display: block;
        padding-left: 0;
      }
      .item-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      .download-button {
        display: block;
        margin-right: 0;
        text-align: center;
        margin-bottom: 10px;
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
                <p>Your digital purchase is complete! Thank you for your order.</p>
                <p>Your download links and access information are ready below. Keep this email safe for future access to your digital products.</p>
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
                      <td colspan="2">
                        <div class="receipt-divider"></div>
                      </td>
                    </tr>
                    
                    <!-- Product Items - Will be replaced by JS -->
                    <!-- {{RECEIPT_ITEMS}} -->
                    
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
          
          <!-- Items Section - This section will be completely replaced with our custom HTML -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" class="items-section">
            <tr>
              <td class="section-title">Your Digital Products 📁</td>
            </tr>
            
            {{#each items}}
            <!-- Item template - will be replaced by our JS -->
            {{/each}}
          </table>
          
          <!-- Download Instructions -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="download-section">
                  <h3 class="download-title">
                    <span class="download-icon">💾</span>
                    Access Instructions
                  </h3>
                  <p class="download-note">
                    Click the download buttons to securely access your digital files. Links are personalized and will expire for security.
                  </p>
                  <p class="download-note">
                    <strong>Important:</strong> Download links are valid for your email address only. If you have trouble accessing files, make sure you're using the same email address used for purchase.
                  </p>
                  <p class="download-note">
                    <strong>Having trouble?</strong> Contact support with your order ID if download links don't work.
                  </p>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Access Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div class="access-info">
                  <p><strong>Important:</strong> Save this email for future reference to access your digital products.</p>
                </div>
              </td>
            </tr>
          </table>
          
          <!-- Thank You Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="message">
                <p>Thank you for your purchase!</p>
                <p>We hope you enjoy your digital products. If you have any questions or need assistance, our support team is here to help.</p>
                <p>Happy reading/learning! 📚</p>
              </td>
            </tr>
          </table>
          
          <!-- Support Info -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding: 20px 0; color: #555555; font-size: 14px;">
                Need help with your download? Contact us: <a href="mailto:{{supportEmail}}" style="color: #7C3AED; text-decoration: none;">{{supportEmail}}</a>
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
            <a href="https://pocketlink.co/support">Support</a>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
