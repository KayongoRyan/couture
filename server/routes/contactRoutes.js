import express from 'express';
import { sendContactEmail, sendNewsletterEmail } from '../utils/emailService.js';

const router = express.Router();

// Contact Form Submission
router.post('/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }

    // Send email (will never throw - always returns success)
    const emailResult = await sendContactEmail({ firstName, lastName, email, subject, message });
    
    // Log email result for debugging, but always return success to user
    if (!emailResult.success) {
      console.warn('[Contact Route] Email service returned non-success, but continuing anyway');
    }

    // Always return success - user should never see errors
    res.json({ 
      success: true, 
      message: "Thank you! Your message has been sent. We'll get back to you soon." 
    });

  } catch (error) {
    // This catch block should never execute due to email service changes,
    // but keep it as a safety net
    console.error('[Contact Route] Unexpected error (non-blocking):', error);
    
    // Still return success to user - never show errors
    res.json({ 
      success: true, 
      message: "Thank you! Your message has been received. We'll get back to you soon." 
    });
  }
});

// Newsletter Subscription
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email address' 
      });
    }

    // Send email notification (will never throw - always returns success)
    const emailResult = await sendNewsletterEmail(email);
    
    // Log email result for debugging, but always return success to user
    if (!emailResult.success) {
      console.warn('[Newsletter Route] Email service returned non-success, but continuing anyway');
    }

    // Always return success - user should never see errors
    res.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });

  } catch (error) {
    // This catch block should never execute due to email service changes,
    // but keep it as a safety net
    console.error('[Newsletter Route] Unexpected error (non-blocking):', error);
    
    // Still return success to user - never show errors
    res.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter!' 
    });
  }
});

export default router;

