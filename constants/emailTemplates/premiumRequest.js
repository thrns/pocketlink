// premiumRequest.js - Email template for international premium subscription requests

export const premiumRequest = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Premium Request - PocketLink</title>
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
    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #111111;
    }
    .message {
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
      width: 140px;
      font-weight: 500;
      color: #777777;
    }
    .detail-value {
      flex: 1;
      font-weight: 400;
      color: #333333;
    }
    .note {
      padding: 15px 0;
      margin-bottom: 30px;
      font-style: italic;
      color: #666666;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      margin-top: 30px;
      border-top: 1px solid #eaeaea;
      color: #888888;
      font-size: 13px;
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
    
    <h1 class="title">New Premium Request</h1>
    <p class="message">An international user has requested premium access. Here are their details:</p>
    
    <div class="details-section">
      <div class="detail-row">
        <div class="detail-label">Name</div>
        <div class="detail-value">{{userName}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Email</div>
        <div class="detail-value">{{userEmail}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">User ID</div>
        <div class="detail-value">{{userId}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Country</div>
        <div class="detail-value">{{country}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Currency</div>
        <div class="detail-value">{{currency}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Plan</div>
        <div class="detail-value">{{planType}}</div>
      </div>
      
      <div class="detail-row">
        <div class="detail-label">Submitted At</div>
        <div class="detail-value">{{requestTime}}</div>
      </div>
    </div>
    
    <div class="note">
      <p>This is an automated email sent when an international user requests premium access on PocketLink. Please follow up with the user to arrange payment details.</p>
    </div>
    
    <div class="footer">
      <p>© 2025 PocketLink</p>
    </div>
  </div>
</body>
</html>`;
