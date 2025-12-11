# 📧 Gmail Email Setup Instructions

## Quick Setup Guide

To receive emails from the contact form and newsletter subscriptions at `couturelafleur19@gmail.com`, follow these steps:

### Step 1: Create a `.env` File

1. In your project root folder (`lafleur-app`), create a new file named `.env`
2. Copy the contents from `.env.example` and paste them into `.env`

### Step 2: Get Your Gmail App Password

**⚠️ IMPORTANT:** You CANNOT use your regular Gmail password. You MUST create a Gmail App Password.

#### How to Generate a Gmail App Password:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/
   - Or go to: https://myaccount.google.com/security

2. **Enable 2-Step Verification** (if not already enabled)
   - Click on "Security" in the left sidebar
   - Under "Signing in to Google", click "2-Step Verification"
   - Follow the prompts to enable it

3. **Generate App Password**
   - Go back to Security page: https://myaccount.google.com/security
   - Under "Signing in to Google", click "App passwords"
   - If you don't see "App passwords", search for it in the search bar at the top
   - You may need to sign in again

4. **Create New App Password**
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter: `CoutureLaFleur` or any name you prefer
   - Click "Generate"

5. **Copy the Password**
   - Google will show you a 16-character password (looks like: `abcd efgh ijkl mnop`)
   - **Copy this password immediately** - you won't be able to see it again!
   - Remove the spaces when using it (it should be 16 characters without spaces)

### Step 3: Configure Your `.env` File

Open the `.env` file you created and update it:

```env
GMAIL_USER=couturelafleur19@gmail.com
GMAIL_APP_PASSWORD=paste-your-16-character-app-password-here
```

**Example:**
```env
GMAIL_USER=couturelafleur19@gmail.com
GMAIL_APP_PASSWORD=abcddefghijklmnop
```

### Step 4: Restart Your Server

After saving the `.env` file:

1. Stop your backend server (Ctrl+C in the terminal)
2. Restart it: `npm start`

### Step 5: Test It!

1. Go to http://localhost:5173/#/contact
2. Fill out and submit the contact form
3. Check `couturelafleur19@gmail.com` inbox (check spam folder too)
4. You should receive an email with the contact form submission

### Troubleshooting

**Not receiving emails?**
- Check your server console - you should see: `✅ Contact email SENT successfully`
- Check spam/junk folder in Gmail
- Verify the App Password is correct (no spaces, 16 characters)
- Make sure you restarted the server after adding `.env`

**Getting authentication errors?**
- Make sure you're using an App Password, not your regular password
- Verify 2-Step Verification is enabled on your Google account
- Double-check the App Password has no spaces

**Still having issues?**
- Check the server console for error messages
- Make sure the `.env` file is in the root directory (same folder as `package.json`)
- Verify the `.env` file has the correct format (no quotes around values unless needed)

### What Emails Will You Receive?

1. **Contact Form Submissions**: When someone fills out the contact form, you'll receive an email with:
   - Their name and email
   - The subject
   - Their message

2. **Newsletter Subscriptions**: When someone subscribes to the newsletter, you'll receive an email with:
   - The subscriber's email address
   - The subscription date/time

Both emails will be sent to: **couturelafleur19@gmail.com**


