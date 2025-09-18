# Email Service Setup Guide

This guide will help you set up the email service to send notifications to saravananvlr1010@gmail.com when contact forms are submitted.

## 🔧 Configuration Steps

### 1. Create .env File
Create a `.env` file in the backend directory with the following email configuration:

```bash
# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-gmail@gmail.com
```

### 2. Gmail App Password Setup
To use Gmail SMTP, you need to set up an App Password:

1. **Go to Google Account Security**: https://myaccount.google.com/security
2. **Enable 2-Step Verification** (if not already enabled)
3. **Generate App Password**:
   - Click on "App passwords"
   - Select "Mail" as the app
   - Select "Other" and name it "Portfolio Contact Form"
   - Click "Generate"
4. **Copy the 16-character app password** and use it as `EMAIL_PASS`

### 3. Test Email Service
Run the email test script to verify everything is working:

```bash
cd backend
node test-email.js
```

### 4. Expected Output
If configured correctly, you should see:
- Environment variables check showing all are configured
- Basic email service test passing
- Notification email sent to saravananvlr1010@gmail.com

## 📧 Email Flow

When a contact form is submitted:
1. ✅ Email sent to admin (configured in EMAIL_USER)
2. ✅ Email sent to user (confirmation)
3. ✅ **NEW**: Email sent to saravananvlr1010@gmail.com
4. ✅ SMS sent to phone numbers (9943206339, 6369411406)

## 🔍 Troubleshooting

### Common Issues:

1. **"Email service not configured"**
   - Check that all EMAIL_* variables are set in .env
   - Ensure the .env file is in the backend directory

2. **"Invalid login" or "Authentication failed"**
   - Use an App Password, not your regular Gmail password
   - Ensure 2-Step Verification is enabled on your Google account

3. **"Less secure app" error**
   - Use App Password instead of enabling less secure apps
   - App Passwords bypass the less secure app restriction

4. **Emails not being received**
   - Check spam/junk folders
   - Verify the recipient email address is correct
   - Check Gmail sending limits (500 emails per day for Gmail)

### Test Commands:

```bash
# Test basic email functionality
node test-email.js

# Test contact form submission
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## 📋 Verification Checklist

- [ ] .env file created with correct email configuration
- [ ] Gmail App Password generated and configured
- [ ] Email service test passes (`node test-email.js`)
- [ ] Contact form submission triggers email to saravananvlr1010@gmail.com
- [ ] All existing email and SMS notifications still work

## 🚨 Security Notes

- Never commit your .env file to version control
- Use App Passwords instead of regular passwords
- Regularly rotate your App Passwords
- Monitor your Gmail account for any suspicious activity
