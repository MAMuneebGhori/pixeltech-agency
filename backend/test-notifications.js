// Quick test — run with: node test-notifications.js
require('dotenv').config();
const { sendLeadNotifications } = require('./services/notifications');

const testLead = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '+923001234567',
  company: 'Test Co',
  budget: '$1000-$5000',
  service: 'Web Development',
  goal: 'Testing notifications',
  source: 'Test Script'
};

console.log('📤 Sending test notifications...');
console.log('   RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Set' : '❌ NOT SET');
console.log('   TWILIO_SID:', process.env.TWILIO_ACCOUNT_SID ? '✅ Set' : '❌ NOT SET');
console.log('   ADMIN_EMAIL:', process.env.ADMIN_EMAIL);
console.log('   ADMIN_WA:', process.env.ADMIN_WHATSAPP_NUMBERS);
console.log('');

sendLeadNotifications(testLead).then(results => {
  console.log('\n📊 Results:', results);
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
