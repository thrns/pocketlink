export const userEmail = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email from Pocketlink</title>
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
    .email-title {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 15px;
      color: #111111;
    }
    .email-message {
      font-size: 16px;
      color: #444444;
      margin-bottom: 30px;
    }
    .content-section {
      background-color: #f8f8f8;
      border-radius: 8px;
      padding: 25px;
      margin-bottom: 30px;
    }
    .content-text {
      font-size: 16px;
      color: #333333;
      margin-bottom: 15px;
    }
    .highlight-box {
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

    .footer-links {
      margin-bottom: 15px;
    }
    .unsubscribe-section {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid #eaeaea;
    }
    .unsubscribe-text {
      font-size: 14px;
      color: #666666;
      margin-bottom: 8px;
    }
    .unsubscribe-link {
      color: #888888;
      text-decoration: underline;
      font-size: 13px;
    }
    .unsubscribe-link:hover {
      color: #666666;
    }
      
    @media (max-width: 600px) {
      .container {
        padding: 15px;
      }
      .content-section {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://pocketlink.co/ogImg.png" alt="Pocketlink Logo" class="logo">
    </div>
    
    
    <div class="content-section">
      <p class="content-text">{{mainContent}}</p>
    </div>
    
    
    
    <div class="footer">
      <p>© 2025 Pocketlink</p>
      <div class="footer-links">
        <a href="https://pocketlink.co/privacy">Privacy</a>
        <a href="https://pocketlink.co/terms">Terms</a>
        <a href="https://pocketlink.co/help">Help</a>
      </div>
   
      <div class="unsubscribe-section">
        <p class="unsubscribe-text">Don't want to receive these emails?</p>
        <a href="{{unsubscribeUrl}}" class="unsubscribe-link">Unsubscribe</a>
      </div>
    </div>
  </div>
</body>
</html>`;
