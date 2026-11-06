const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Lead = require('./models/Lead');
const { sendLeadNotifications } = require('./services/notifications');
const { pickLeadFields } = require('./lib/leadInput');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
} else {
  console.log('⚠️ MONGODB_URI not found in .env. Please set it to connect to the database.');
}

// ==========================================
// ADMIN AUTH
// ==========================================
// shortcut: without ADMIN_SESSION_SECRET the secret is per-process, so a restart logs admins out; set it to persist sessions.
const sessionSecret = process.env.ADMIN_SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const SESSION_MS = 8 * 60 * 60 * 1000;

const sign = (payload) => crypto.createHmac('sha256', sessionSecret).update(payload).digest('hex');
// Hash both sides so timingSafeEqual gets equal-length buffers and leaks nothing about length.
const safeEqual = (a, b) => crypto.timingSafeEqual(
  crypto.createHash('sha256').update(String(a)).digest(),
  crypto.createHash('sha256').update(String(b)).digest()
);

app.post('/api/admin/login', (req, res) => {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'Admin login is not configured' });
  }
  const { username = '', password = '' } = req.body || {};
  // Evaluate both comparisons so timing doesn't reveal which field was wrong.
  const userOk = safeEqual(username, ADMIN_USERNAME);
  const passOk = safeEqual(password, ADMIN_PASSWORD);
  if (!(userOk && passOk)) return res.status(401).json({ error: 'Invalid credentials' });
  const expires = String(Date.now() + SESSION_MS);
  res.json({ token: `${expires}.${sign(expires)}` });
});

const requireAdmin = (req, res, next) => {
  const token = (req.get('Authorization') || '').replace(/^Bearer /, '');
  const [expires, sig] = token.split('.');
  if (!expires || !sig || !safeEqual(sig, sign(expires)) || Number(expires) < Date.now()) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// ==========================================
// LEADS API (MongoDB)
// ==========================================
app.get('/api/leads', requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json([]);
    const leads = await Lead.find().sort({ date: -1 });
    // Map _id to id for frontend compatibility
    const formattedLeads = leads.map(l => {
      const obj = l.toObject();
      obj.id = obj._id.toString();
      return obj;
    });
    res.json(formattedLeads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }

    const newLead = new Lead(pickLeadFields(req.body));
    const savedLead = await newLead.save();
    console.log(`Lead saved: ${savedLead._id} source=${savedLead.source}`);

    // Trigger Email & WhatsApp Notifications in the background
    sendLeadNotifications(savedLead).catch(console.error);

    const obj = savedLead.toObject();
    obj.id = obj._id.toString();
    res.status(201).json(obj);
  } catch (error) {
    console.error('Failed to save lead:', error);
    res.status(400).json({ error: 'Failed to save lead' });
  }
});

app.delete('/api/leads/:id', requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json({ success: true });
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

app.patch('/api/leads/:id/status', requireAdmin, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'DB down' });
    const { status } = req.body;
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    
    if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
    
    const obj = updatedLead.toObject();
    obj.id = obj._id.toString();
    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update status' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
