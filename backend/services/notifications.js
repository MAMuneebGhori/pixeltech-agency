const twilio = require('twilio');
const { Resend } = require('resend');

// NOTE: Render free tier blocks ALL outbound SMTP (ports 25, 465, 587).
// We use Resend (HTTPS API) instead of Nodemailer to send emails.

// Lazy Twilio client
let twilioClient;
const getTwilioClient = () => {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient;
};

const sendLeadNotifications = async (leadData) => {
  const results = { email: false, whatsapp: false };

  // ─── 1. EMAIL via Resend HTTPS API ─────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        // Use RESEND_FROM_EMAIL env var once domain is verified, otherwise use Resend test address
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
    console.log('⚠️ RESEND_API_KEY not set — skipping email. Get a free key at https://resend.com');
  }

  // ─── 2. WHATSAPP via Twilio HTTPS API ──────────────────────────────────────
  const client = getTwilioClient();
  if (client && process.env.TWILIO_WHATSAPP_NUMBER && process.env.ADMIN_WHATSAPP_NUMBERS) {
    try {
      const numbers = process.env.ADMIN_WHATSAPP_NUMBERS.split(',');
      const msg = `🚀 *New Pixeltech Lead!*\n\n*Name:* ${leadData.firstName} ${leadData.lastName}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Budget:* ${leadData.budget || 'N/A'}\n*Service:* ${leadData.service || 'N/A'}\n*Source:* ${leadData.source}\n\nCheck your Admin Portal for full details.`;

      const sendPromises = numbers.map(num =>
        client.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num.trim()}`,
          body: msg
        })
        .then(m => console.log(`✅ WhatsApp sent to ${num.trim()} — SID: ${m.sid}`))
        .catch(e => console.error(`❌ WhatsApp failed for ${num.trim()}:`, e.message))
      );

      await Promise.allSettled(sendPromises);
      results.whatsapp = true;
    } catch (err) {
      console.error('❌ WhatsApp error:', err.message);
    }
  } else {
    console.log('⚠️ Twilio not configured — skipping WhatsApp.');
  }

  return results;
};

module.exports = { sendLeadNotifications };
