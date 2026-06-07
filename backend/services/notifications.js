const { Resend } = require('resend');

// ─── Green API WhatsApp Helper ─────────────────────────────────────────────
// Uses your own WhatsApp number — free, no daily limits, HTTPS-based
const sendWhatsAppViaGreenAPI = async (phoneNumber, message) => {
  const instanceId = process.env.GREEN_API_INSTANCE;
  const token = process.env.GREEN_API_TOKEN;

  if (!instanceId || !token) {
    console.log('⚠️ GREEN_API_INSTANCE or GREEN_API_TOKEN not set — skipping WhatsApp.');
    return false;
  }

  // Format: remove + sign and add @c.us (e.g. +923336424891 → 923336424891@c.us)
  const chatId = phoneNumber.replace('+', '') + '@c.us';

  const url = `https://api.green-api.com/waInstance${instanceId}/sendMessage/${token}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message })
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || `HTTP ${response.status}`);
  }

  return data.idMessage;
};

// ─── Main Notification Function ────────────────────────────────────────────
const sendLeadNotifications = async (leadData) => {
  const results = { email: false, whatsapp: false };

  // 1. EMAIL via Resend HTTPS API
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: [process.env.ADMIN_EMAIL || 'mamuneebg@gmail.com'],
        subject: `🚀 New Lead: ${leadData.firstName} ${leadData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #6c63ff; border-bottom: 2px solid #6c63ff; padding-bottom: 10px;">
              🚀 New Lead Captured!
            </h2>
            <table style="width:100%; border-collapse: collapse; margin-top: 16px;">
              <tr style="background:#f9f9f9;"><td style="padding:10px 12px; font-weight:bold; width:130px;">Name</td><td style="padding:10px 12px;">${leadData.firstName} ${leadData.lastName}</td></tr>
              <tr><td style="padding:10px 12px; font-weight:bold;">Email</td><td style="padding:10px 12px;">${leadData.email}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 12px; font-weight:bold;">Phone</td><td style="padding:10px 12px;">${leadData.phone}</td></tr>
              <tr><td style="padding:10px 12px; font-weight:bold;">Company</td><td style="padding:10px 12px;">${leadData.company || 'N/A'}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 12px; font-weight:bold;">Budget</td><td style="padding:10px 12px;">${leadData.budget || 'N/A'}</td></tr>
              <tr><td style="padding:10px 12px; font-weight:bold;">Service</td><td style="padding:10px 12px;">${leadData.service || 'N/A'}</td></tr>
              <tr style="background:#f9f9f9;"><td style="padding:10px 12px; font-weight:bold;">Message</td><td style="padding:10px 12px;">${leadData.goal || 'N/A'}</td></tr>
              <tr><td style="padding:10px 12px; font-weight:bold;">Source</td><td style="padding:10px 12px;">${leadData.source}</td></tr>
            </table>
            <p style="margin-top: 24px; color: #888; font-size: 13px;">
              Log in to your <a href="https://pixeltech-agency.onrender.com" style="color:#6c63ff;">Admin Portal</a> to manage this lead.
            </p>
          </div>
        `
      });

      if (error) {
        console.error('❌ Resend email error:', error.message);
      } else {
        console.log('✅ Email sent via Resend. ID:', data?.id);
        results.email = true;
      }
    } catch (err) {
      console.error('❌ Email failed:', err.message);
    }
  } else {
    console.log('⚠️ RESEND_API_KEY not set — skipping email.');
  }

  // 2. WHATSAPP via Green API (free, uses your own WhatsApp number)
  if (process.env.GREEN_API_INSTANCE && process.env.GREEN_API_TOKEN && process.env.ADMIN_WHATSAPP_NUMBERS) {
    const numbers = process.env.ADMIN_WHATSAPP_NUMBERS.split(',');
    const msg = `🚀 *New Pixeltech Lead!*\n\n*Name:* ${leadData.firstName} ${leadData.lastName}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Budget:* ${leadData.budget || 'N/A'}\n*Service:* ${leadData.service || 'N/A'}\n*Source:* ${leadData.source}\n\nCheck your Admin Portal for full details.`;

    for (const num of numbers) {
      try {
        const msgId = await sendWhatsAppViaGreenAPI(num.trim(), msg);
        console.log(`✅ WhatsApp sent to ${num.trim()} — ID: ${msgId}`);
        results.whatsapp = true;
      } catch (err) {
        console.error(`❌ WhatsApp failed for ${num.trim()}:`, err.message);
      }
    }
  } else {
    console.log('⚠️ Green API not configured — skipping WhatsApp.');
  }

  return results;
};

module.exports = { sendLeadNotifications };
