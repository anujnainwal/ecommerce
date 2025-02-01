const emailVerificationTemplate = (username, links, content = null) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background-color: #4CAF50;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }

        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }

        .email-body {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }

        .email-body p {
            margin: 10px 0;
        }

        .email-body .verify-button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            font-size: 16px;
        }

        .email-footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100%;
                margin: 0;
                border-radius: 0;
            }

            .email-body {
                padding: 15px;
            }

            .email-body .verify-button {
                font-size: 14px;
                padding: 10px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            <h1>Welcome to [Your E-commerce Store]</h1>
        </div>

        <!-- Email Body -->
        <div class="email-body">
            <p>Hi ${username},</p>
            
            <p>${
              content !== null
                ? "please verify your email address using the link below:"
                : "Thank you for signing up with us! Please verify your email address to complete your registration."
            }</p>
            <a href="${links}" class="verify-button">Verify Your Email</a>
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="${links}" style="color: #4CAF50;">${links}</a></p>
            <p>Thank you,<br>The [Your E-commerce Store] Team</p>
        </div>

        <!-- Email Footer -->
        <div class="email-footer">
            <p>&copy; 2024 [Your E-commerce Store]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
};

export default emailVerificationTemplate;
