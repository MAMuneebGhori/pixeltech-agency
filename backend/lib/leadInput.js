// Public POST /api/leads is a trust boundary: keep only the fields the booking form sends,
// as trimmed, length-capped strings. Anything else (status, date, chatHistory, _id) is dropped.
const LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254,
  phone: 40,
  company: 200,
  website: 300,
  callsPerWeek: 40,
  bookingSoftware: 80,
  service: 100,
  goal: 2000,
  roiEstimate: 300,
};

// Until the demo-line secret gate ships (plan 8.13, wave 2), every public lead is a booking-form lead.
const PUBLIC_SOURCE = 'Booking Form';

function pickLeadFields(body) {
  const lead = {};
  if (body && typeof body === 'object') {
    for (const [key, max] of Object.entries(LIMITS)) {
      const value = body[key];
      if (typeof value !== 'string') continue;
      const trimmed = value.trim().slice(0, max);
      if (trimmed) lead[key] = trimmed;
    }
  }
  lead.source = PUBLIC_SOURCE;
  return lead;
}

module.exports = { pickLeadFields, LIMITS, PUBLIC_SOURCE };
