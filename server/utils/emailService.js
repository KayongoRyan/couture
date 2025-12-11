import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter - using Gmail SMTP
// Note: For Gmail, you need to use an App Password if 2FA is enabled
// To generate an App Password: Google Account > Security > 2-Step Verification > App Passwords
const createTransporter = () => {
  // If SMTP credentials are provided in .env, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT == '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Default to Gmail SMTP if Gmail credentials are provided
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  // Fallback: Use a mock transporter for development
  // In production, you MUST configure SMTP settings
  console.warn('[Email Service] No SMTP credentials found. Using mock transporter.');
  console.warn('[Email Service] To enable email sending, add to .env:');
  console.warn('[Email Service]   GMAIL_USER=your-email@gmail.com');
  console.warn('[Email Service]   GMAIL_APP_PASSWORD=your-app-password');
  return {
    sendMail: async (mailOptions) => {
      console.log('[Mock Email] Would send email:', {
        to: mailOptions.to,
        subject: mailOptions.subject,
        text: mailOptions.text?.substring(0, 100) + '...',
      });
      return { messageId: 'mock-message-id', accepted: [mailOptions.to] };
    },
  };
};

// Create transporter on first use (allows .env to be loaded)
let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

// Check if we have real SMTP credentials configured
const hasRealCredentials = () => {
  const hasGmail = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && 
                   process.env.GMAIL_APP_PASSWORD !== 'your-16-character-app-password-here';
  const hasSMTP = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
  return hasGmail || hasSMTP;
};

const RECIPIENT_EMAIL = 'couturelafleur19@gmail.com';

export const sendContactEmail = async (formData) => {
  const { firstName, lastName, email, subject, message } = formData;

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'noreply@couturelafleur.com'}>`,
    replyTo: email,
    to: RECIPIENT_EMAIL,
    subject: `Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>From:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="padding: 20px; border-left: 3px solid #D4AF37;">
          <h3 style="margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          This email was sent from the CoutureLaFleur contact form.<br>
          Reply directly to this email to respond to ${firstName}.
        </p>
      </div>
    `,
    text: `
New Contact Form Submission

From: ${firstName} ${lastName}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
  };

  try {
    // Check if we have real credentials configured
    if (!hasRealCredentials()) {
      console.warn('');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('⚠️  EMAIL NOT SENT - SMTP NOT CONFIGURED');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('The .env file still has the placeholder password!');
      console.warn('');
      console.warn('📧 Contact Form Submission (Logged to Console):');
      console.warn(`   To: ${RECIPIENT_EMAIL}`);
      console.warn(`   From: ${firstName} ${lastName} <${email}>`);
      console.warn(`   Subject: ${subject}`);
      console.warn('');
      console.warn('🔧 TO FIX AND START RECEIVING EMAILS:');
      console.warn('   1. Get Gmail App Password: https://myaccount.google.com/apppasswords');
      console.warn('   2. Open the .env file in your project root');
      console.warn('   3. Replace: your-16-character-app-password-here');
      console.warn('      With: your-actual-16-character-app-password');
      console.warn('   4. Restart the server: npm start');
      console.warn('');
      console.warn('📖 Full instructions: See GMAIL_SETUP_INSTRUCTIONS.md');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('');
      return { success: true, messageId: 'logged-to-console' };
    }

    // Send real email using the transporter
    const emailTransporter = getTransporter();
    const info = await emailTransporter.sendMail(mailOptions);
    console.log('[Email Service] ✅ Contact email SENT successfully:', info.messageId);
    console.log('[Email Service] Email delivered to:', RECIPIENT_EMAIL);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Log the error but still return success to user
    console.error('[Email Service] ❌ Error sending contact email:', error.message || error);
    console.error('[Email Service] Full error:', error);
    console.warn('[Email Service] Contact form submission logged to console due to email error');
    console.log('[Mock Email] Contact form submission:', {
      to: RECIPIENT_EMAIL,
      from: `${firstName} ${lastName} <${email}>`,
      subject: subject,
      message: message.substring(0, 150) + '...',
    });
    // Always return success - user should never see an error
    return { success: true, messageId: 'logged-to-console' };
  }
};

export const sendNewsletterEmail = async (email) => {
  const mailOptions = {
    from: process.env.GMAIL_USER || process.env.SMTP_USER || 'noreply@couturelafleur.com',
    to: RECIPIENT_EMAIL,
    subject: 'New Newsletter Subscription',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #D4AF37;">New Newsletter Subscription</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <p style="color: #666; font-size: 12px;">
          Add this email to your newsletter mailing list.
        </p>
      </div>
    `,
    text: `
New Newsletter Subscription

Email: ${email}
Subscribed at: ${new Date().toLocaleString()}
    `,
  };

  try {
    // Check if we have real credentials configured
    if (!hasRealCredentials()) {
      console.warn('');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('⚠️  EMAIL NOT SENT - SMTP NOT CONFIGURED');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('The .env file still has the placeholder password!');
      console.warn('');
      console.warn('📧 Newsletter Subscription (Logged to Console):');
      console.warn(`   To: ${RECIPIENT_EMAIL}`);
      console.warn(`   Email: ${email}`);
      console.warn(`   Subscribed at: ${new Date().toLocaleString()}`);
      console.warn('');
      console.warn('🔧 TO FIX AND START RECEIVING EMAILS:');
      console.warn('   1. Get Gmail App Password: https://myaccount.google.com/apppasswords');
      console.warn('   2. Open the .env file in your project root');
      console.warn('   3. Replace: your-16-character-app-password-here');
      console.warn('      With: your-actual-16-character-app-password');
      console.warn('   4. Restart the server: npm start');
      console.warn('');
      console.warn('📖 Full instructions: See GMAIL_SETUP_INSTRUCTIONS.md');
      console.warn('═══════════════════════════════════════════════════════════════');
      console.warn('');
      return { success: true, messageId: 'logged-to-console' };
    }

    // Send real email using the transporter
    const emailTransporter = getTransporter();
    const info = await emailTransporter.sendMail(mailOptions);
    console.log('[Email Service] ✅ Newsletter subscription email SENT successfully:', info.messageId);
    console.log('[Email Service] Email delivered to:', RECIPIENT_EMAIL);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Log the error but still return success to user
    console.error('[Email Service] ❌ Error sending newsletter email:', error.message || error);
    console.error('[Email Service] Full error:', error);
    console.warn('[Email Service] Newsletter subscription logged to console due to email error');
    console.log('[Mock Email] Newsletter subscription:', {
      to: RECIPIENT_EMAIL,
      email: email,
      subscribedAt: new Date().toLocaleString(),
    });
    // Always return success - user should never see an error
    return { success: true, messageId: 'logged-to-console' };
  }
};

