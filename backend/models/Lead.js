const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '-' },
  company: { type: String },
  budget: { type: String },
  website: { type: String },
  service: { type: String },
  goal: { type: String },
  source: { type: String, default: 'Booking Form' },
  status: { type: String, default: 'new', enum: ['new', 'contacted'] }
});

module.exports = mongoose.model('Lead', leadSchema);
