# 🚨 Quick Fix: Enable Email Receiving

## The Problem
You're seeing `[Mock Email]` in your server console, which means emails are being logged but **NOT actually sent**.

## The Solution (3 Simple Steps)

### Step 1: Get Your Gmail App Password

**Direct Link:** https://myaccount.google.com/apppasswords

1. Click the link above (or go to Google Account → Security → App Passwords)
2. If you see "App passwords can't be used", enable **2-Step Verification** first
3. Select "Mail" and "Other (Custom name)" → Enter "CoutureLaFleur"
4. Click "Generate"
5. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - Remove the spaces when you use it!

### Step 2: Update Your `.env` File

1. Open the file: `.env` (in your project root: `lafleur-app/.env`)
2. Find this line:
   ```
   GMAIL_APP_PASSWORD=your-16-character-app-password-here
   ```
3. Replace `your-16-character-app-password-here` with your actual password:
   ```
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
   (No spaces, just 16 characters)

### Step 3: Restart Your Server

1. Stop the server (Press `Ctrl+C` in the terminal where `npm start` is running)
2. Start it again: `npm start`

## Verify It's Working

After restarting, when someone submits a form, you should see in the server console:
```
✅ Contact email SENT successfully: <message-id>
Email delivered to: couturelafleur19@gmail.com
```

**Instead of:**
```
⚠️ EMAIL NOT SENT - SMTP NOT CONFIGURED
```

## What You'll Receive

- **Contact Form**: Email with customer's name, email, subject, and message
- **Newsletter**: Email with subscriber's email and timestamp

Both will be sent to: **couturelafleur19@gmail.com**

---

## Still Not Working?

1. **Check the `.env` file** - Make sure it has your actual App Password (not the placeholder)
2. **Check for spaces** - The password should be 16 characters with NO spaces
3. **Restart the server** - You MUST restart after changing `.env`
4. **Check spam folder** - Emails might go to spam initially
5. **Look at server console** - It will tell you exactly what's wrong

## Need Help Getting App Password?

See `GMAIL_SETUP_INSTRUCTIONS.md` for detailed step-by-step with screenshots.







