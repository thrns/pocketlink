// loginAlert.js - Clean minimal login alert email template

export const loginAlert = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Login Detected - PocketLink</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #333333;
      line-height: 1.5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #eaeaea;
      margin-bottom: 30px;
    }
    .logo {
      max-width: 120px;
    }
    .alert-title {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #111111;
    }
    .alert-message {
      font-size: 16px;
      color: #444444;
      margin-bottom: 30px;
    }
    .details-section {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
    }
    .detail-row {
      display: flex;
      margin-bottom: 15px;
    }
    .detail-label {
      width: 120px;
      font-weight: 500;
      color: #777777;
    }
    .detail-value {
      flex: 1;
      font-weight: 400;
      color: #333333;
    }
    .warning {
      padding: 15px 0;
      margin-bottom: 30px;
    }
    .button {
      display: inline-block;
      background-color: #7C3AED;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 6px;
      font-weight: 500;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .button-outline {
      display: inline-block;
      background-color: transparent;
      color: #7C3AED;
      border: 1px solid #7C3AED;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 6px;
      font-weight: 500;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      margin-top: 30px;
      border-top: 1px solid #eaeaea;
      color: #888888;
      font-size: 13px;
    }
    .footer a {
      color: #888888;
      margin: 0 10px;
      text-decoration: none;
    }
    @media (max-width: 600px) {
      .container {
        padding: 15px;
      }
      .details-section {
        padding: 20px;
      }
      .detail-row {
        flex-direction: column;
      }
      .detail-label {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://pocketlink.co/ogImg.png" alt="PocketLink Logo" class="logo">
    </div>
    
    <h1 class="alert-title">New Login Detected</h1>
    <p class="alert-message">We noticed a new login to your PocketLink account from an unrecognized device.</p>
    
    <div class="details-section">
      <div class="detail-row">
        <div class="detail-label">Date & Time</div>
        <div class="detail-value">{{loginDateTime}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Location</div>
        <div class="detail-value">{{loginLocation}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Device</div>
        <div class="detail-value">{{deviceType}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Browser</div>
        <div class="detail-value">{{browserInfo}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">IP Address</div>
        <div class="detail-value">{{ipAddress}}</div>
      </div>
    </div>
    
    <div class="warning">
      <p><strong>Wasn't you?</strong> If you didn't log in at this time, please secure your account immediately by changing your password.</p>
    </div>
    
    <div style="text-align: center; margin-bottom: 30px;">
      <a href="https://pocketlink.co/account/security" class="button">Secure Account</a>
      <a href="https://pocketlink.co/account/devices" class="button-outline">Manage Devices</a>
    </div>
    
    <div class="footer">
      <p>© 2025 PocketLink</p>
      <p>
        <a href="https://pocketlink.co/privacy">Privacy</a>
        <a href="https://pocketlink.co/terms">Terms</a>
        <a href="https://pocketlink.co/help">Help</a>
      </p>
    </div>
  </div>
</body>
</html>`;
