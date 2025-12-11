# Email Setup Instructions

## Issue Fix: Contact Form and Newsletter

The contact form and newsletter features have been implemented but require the server to be restarted to work properly.

## Steps to Fix:

### 1. Restart the Server
Stop the current server (Ctrl+C if running in terminal) and restart it:
```bash
npm start
```

### 2. Test the Features
- **Contact Form**: Go to http://localhost:5173/#/contact and submit a test message
- **Newsletter**: Scroll to the footer and try subscribing with an email

### 3. Check Browser Console
Open browser DevTools (F12) and check the Console tab for any error messages. You should see:
- `[Contact Form] Sending to: /api/contact` (or similar)
- Success or error messages

### 4. Check Server Console
In the server terminal, you should see:
- `[Worker X] POST /api/contact` when a form is submitted
- `[Email Service] Contact email sent:` or `[Mock Email] Would send email:` messages

## Current Behavior

**Without SMTP Configuration:**
- Forms will show "success" messages
- Emails are logged to the server console (mock mode)
- No actual emails are sent

**With SMTP Configuration:**
- Real emails will be sent to `couturelafleur19@gmail.com`
- Contact form submissions create emails with customer details
- Newsletter subscriptions create notification emails

## To Enable Real Email Sending:

Create a `.env` file in the root directory (if it doesn't exist) and add:

```env
# Option 1: Gmail (Recommended)
GMAIL_USER=couturelafleur19@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here

# Option 2: Custom SMTP
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-password
```

### How to Get Gmail App Password:
1. Go to https://myaccount.google.com/
2. Security > 2-Step Verification (enable if not enabled)
3. Security > App Passwords
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it in `.env`

## Troubleshooting

### "Cannot POST /api/contact" error:
- **Solution**: Restart the server to load new routes

### "Failed to send message" error:
- Check server console for detailed error messages
- Verify server is running on port 5000
- Check network connectivity

### Forms show success but no emails received:
- This is normal if SMTP is not configured
- Check server console for `[Mock Email]` messages
- Configure SMTP credentials to send real emails


