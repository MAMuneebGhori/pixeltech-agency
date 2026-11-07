const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const crypto = require('crypto');

const Lead = require('./models/Lead');
const { sendLeadNotifications } = require('./services/notifications');
const { pickLeadFields, isHoneypotHit } = require('./lib/leadInput');
const { createRateLimiter } = require('./lib/rateLimit');
const { isAllowedOrigin } = require('./lib/origins');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
// Render sits one proxy hop in front of us; without this, req.ip is the proxy and every visitor shares one rate-limit bucket.
app.set('trust proxy', 1);
const allowLead = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
// Brute-force guard on the admin password: 10 tries per IP per 15 minutes.
const allowLogin = createRateLimiter({ limit: 10, windowMs: 15 * 60 * 1000 });

// Middleware
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set({ 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer' });
  next();
});
// Only the site's own origins may call this API from a browser. Server-to-server callers (n8n) send no
// Origin header and are unaffected; a disallowed origin just gets no CORS headers, so its page can't read replies.
app.use(cors({ origin: (origin, cb) => cb(null, isAllowedOrigin(origin)), methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
// A booking lead is well under 10kb; the cap stops oversized bodies before parsing.
app.use(express.json({ limit: '20kb' }));

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
  if (!allowLogin(req.ip)) return res.status(429).json({ error: 'Too many attempts, try again later' });
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
    // The demo-line ingest (plan E4, n8n) posts from one IP, so a valid shared secret skips the limit.
    const secret = process.env.LEAD_INGEST_SECRET;
    const trusted = Boolean(secret) && safeEqual(req.get('X-Lead-Secret') || '', secret);
    if (!trusted && !allowLead(req.ip)) {
      return res.status(429).json({ error: 'Too many requests, try again in a few minutes' });
    }
    // Bots that fill the hidden field get a normal-looking success, and nothing is saved or alerted.
    if (isHoneypotHit(req.body)) return res.status(201).json({});

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
    console.log(`Admin deleted lead ${req.params.id} from ${req.ip}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

app.patch('/api/leads/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    // Only the schema's own values; an object or any other string is refused before it reaches Mongo.
    if (!Lead.schema.path('status').enumValues.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'DB down' });
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    
    if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
    console.log(`Admin set lead ${req.params.id} to ${status} from ${req.ip}`);
    
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
