const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Force IPv4 DNS resolution to avoid ENETUNREACH on IPv6-disabled networks (e.g. Render)
require('dns').setDefaultResultOrder('ipv4first');

// Twilio Client (initialized lazily when needed)
let twilioClient;

const getTransporter = () => {
  // Lazy-init: ensures env vars are loaded before creating transporter
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,          // Use STARTTLS (587) instead of SMTPS (465) — avoids IPv6 issues
    secure: false,      // false = STARTTLS upgrade after connection
    requireTLS: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const getTwilioClient = () => {
  if (!twilioClient && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
  return twilioClient;
};

const sendLeadNotifications = async (leadData) => {
  try {
    // 1. Send Email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = getTransporter();
      const mailOptions = {
        from: `"Pixeltech System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'info@pixeltech.agency',
        subject: `🚀 New Lead: ${leadData.firstName} ${leadData.lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6c63ff;">🚀 New Lead Captured!</h2>
            <table style="width:100%; border-collapse: collapse;">
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Name:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.firstName} ${leadData.lastName}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Email:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.email}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Phone:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.phone}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Company:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.company || 'N/A'}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Budget:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.budget || 'N/A'}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Service:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.service || 'N/A'}</td></tr>
              <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Message:</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${leadData.goal || 'N/A'}</td></tr>
              <tr><td style="padding:8px;"><strong>Source:</strong></td><td style="padding:8px;">${leadData.source}</td></tr>
            </table>
            <p style="margin-top: 20px; color: #666;">Log in to your <a href="https://pixeltech-agency.onrender.com" style="color:#6c63ff;">Admin Portal</a> to manage this lead.</p>
          </div>
        `
      };
      await transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent to', process.env.ADMIN_EMAIL);
    } else {
      console.log('⚠️ Email credentials not configured. Skipping email.');
    }

    // 2. Send WhatsApp via Twilio
    const client = getTwilioClient();
    if (client && process.env.TWILIO_WHATSAPP_NUMBER && process.env.ADMIN_WHATSAPP_NUMBERS) {
      const numbers = process.env.ADMIN_WHATSAPP_NUMBERS.split(',');
      const msg = `🚀 *New Pixeltech Lead!*\n\n*Name:* ${leadData.firstName} ${leadData.lastName}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Budget:* ${leadData.budget || 'N/A'}\n*Service:* ${leadData.service || 'N/A'}\n*Source:* ${leadData.source}\n\nCheck your Admin Portal for full details.`;

      const sendPromises = numbers.map(num =>
        client.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num.trim()}`,
          body: msg
        }).then(() => console.log(`✅ WhatsApp sent to ${num.trim()}`))
          .catch(err => console.error(`❌ WhatsApp failed for ${num.trim()}:`, err.message))
      );
      await Promise.allSettled(sendPromises);
    } else {
      console.log('⚠️ Twilio credentials not fully configured. Skipping WhatsApp.');
    }

  } catch (error) {
    console.error('❌ Failed to send notifications:', error.message);
    // Log more detail for debugging without crashing
    if (error.code) console.error('   Error code:', error.code);
    if (error.command) console.error('   SMTP command:', error.command);
  }
};

module.exports = { sendLeadNotifications };
