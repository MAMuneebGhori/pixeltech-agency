const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { GoogleGenAI } = require('@google/genai');

const Lead = require('./models/Lead');
const { sendLeadNotifications } = require('./services/notifications');

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

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || 'fake-key' });

// ==========================================
// CHATBOT API
// ==========================================
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here') {
      return res.status(500).json({ error: 'API_KEY_MISSING' });
    }

    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `You are an AI sales assistant for Pixeltech Agency. Your goal is to be helpful, professional, and ultimately collect the user's name, email, and phone number so the agency can follow up. Pixeltech builds custom full-stack web applications and automated lead systems. Don't be too pushy, be conversational. Once you have their name, email, and phone number, thank them and let them know the team will be in touch shortly. Keep your responses concise (1-2 short paragraphs max).`
        }
      });
      res.json({ response: response.text });
      
    } catch (aiError) {
      console.error('Gemini API Error:', aiError.status, aiError.message);
      // Fallback for 503 High Demand or other API errors
      if (aiError.status === 503) {
        return res.json({ response: "I'm currently experiencing high traffic! Our team is ready to help you though. Could you please provide your email address so we can reach out to you directly?" });
      }
      return res.json({ response: "Oops, my brain is having a slight hiccup connecting to the server. Could you please leave your email so our human team can contact you?" });
    }

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});

// ==========================================
// LEADS API (MongoDB)
// ==========================================
app.get('/api/leads', async (req, res) => {
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

    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();

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

app.delete('/api/leads/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) return res.json({ success: true });
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

app.patch('/api/leads/:id/status', async (req, res) => {
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
