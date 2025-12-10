
import express from 'express';

const router = express.Router();

// --- MOBILE MONEY (MTN/AIRTEL) ---
router.post('/mobile-money', async (req, res) => {
  console.log("[Payment Route] Received Mobile Money request");
  try {
    const { provider, phoneNumber, amount } = req.body;
    
    if (!provider || !phoneNumber || !amount) {
        return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // 1. Server-Side Validation for Providers
    let isValidPrefix = false;
    if (provider === 'MTN') {
        if (phoneNumber.startsWith('078') || phoneNumber.startsWith('079')) {
            isValidPrefix = true;
        }
    } else if (provider === 'Airtel') {
        if (phoneNumber.startsWith('072') || phoneNumber.startsWith('073')) {
            isValidPrefix = true;
        }
    }

    if (!isValidPrefix) {
        return res.status(400).json({ 
            success: false, 
            message: `Invalid number for ${provider}. MTN requires 078/079. Airtel requires 072/073.` 
        });
    }

    // Simulate API processing delay
    console.log(`[MoMo Gateway] Initiating ${provider} Push to ${phoneNumber} for $${amount}`);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 2. Simulate Balance Check (To show the requested messages)
    const isInsufficientBalance = Math.random() < 0.2; 

    if (isInsufficientBalance) {
        console.log(`[MoMo Gateway] Failed: Insufficient Balance`);
        return res.json({ 
            success: false, 
            message: "Payment was unsuccessfully Done . Check your Balance" 
        });
    }

    // Success Case
    console.log(`[MoMo Gateway] Success.`);
    res.json({ 
      success: true, 
      message: "Payment was Successfully Done . Thank you shopping at couturelafleur" 
    });

  } catch (error) {
    console.error("[Payment Route] Mobile Money Error:", error);
    res.status(500).json({ success: false, message: 'Mobile Money provider unavailable' });
  }
});

export default router;
