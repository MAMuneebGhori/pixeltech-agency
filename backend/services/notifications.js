const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dns').setDefaultResultOrder('ipv4first');

// Transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Twilio Client
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const sendLeadNotifications = async (leadData) => {
  try {
    // 1. Send Email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: `"Pixeltech System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'info@pixeltech.agency',
        subject: `🚀 New Lead Captured: ${leadData.firstName} ${leadData.lastName}`,
        html: `
          <h2>New Lead Captured</h2>
          <p><strong>Name:</strong> ${leadData.firstName} ${leadData.lastName}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.phone}</p>
          <p><strong>Company:</strong> ${leadData.company || 'N/A'}</p>
          <p><strong>Budget:</strong> ${leadData.budget || 'N/A'}</p>
          <p><strong>Service:</strong> ${leadData.service || 'N/A'}</p>
          <p><strong>Goal/Message:</strong> ${leadData.goal || 'N/A'}</p>
          <p><strong>Source:</strong> ${leadData.source}</p>
          <hr/>
          <p>Log in to your Admin portal to manage this lead.</p>
        `
      };
      await transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent.');
    } else {
      console.log('⚠️ Email credentials not configured. Skipping email.');
    }

    // 2. Send WhatsApp
    if (twilioClient && process.env.TWILIO_WHATSAPP_NUMBER && process.env.ADMIN_WHATSAPP_NUMBERS) {
      const numbers = process.env.ADMIN_WHATSAPP_NUMBERS.split(',');
      const msg = `🚀 *New Pixeltech Lead!*\n\n*Name:* ${leadData.firstName} ${leadData.lastName}\n*Email:* ${leadData.email}\n*Phone:* ${leadData.phone}\n*Budget:* ${leadData.budget || 'N/A'}\n*Source:* ${leadData.source}\n\nCheck your Admin Portal for full details.`;
      
      for (const num of numbers) {
        await twilioClient.messages.create({
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num.trim()}`,
          body: msg
        });
      }
      console.log('✅ WhatsApp notification sent.');
    } else {
      console.log('⚠️ Twilio credentials not fully configured. Skipping WhatsApp.');
    }
  } catch (error) {
    console.error('❌ Failed to send notifications:', error);
  }
};

module.exports = { sendLeadNotifications };
