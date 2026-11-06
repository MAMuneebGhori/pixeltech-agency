const test = require('node:test');
const assert = require('node:assert/strict');
const { pickLeadFields, LIMITS } = require('./leadInput');

test('keeps booking-form fields and trims them', () => {
  const lead = pickLeadFields({ firstName: '  Ana ', email: 'ana@spa.com', callsPerWeek: '50–100', roiEstimate: '$1–$2/mo' });
  assert.deepEqual(lead, { firstName: 'Ana', email: 'ana@spa.com', callsPerWeek: '50–100', roiEstimate: '$1–$2/mo', source: 'Booking Form' });
});

test('drops fields the public form must not set', () => {
  const lead = pickLeadFields({ firstName: 'Ana', status: 'contacted', date: '2001-01-01', chatHistory: [1], _id: 'x' });
  assert.deepEqual(Object.keys(lead).sort(), ['firstName', 'source']);
});

test('forces source to Booking Form even if the client sends another', () => {
  assert.equal(pickLeadFields({ source: 'Demo line' }).source, 'Booking Form');
});

test('ignores non-strings and blank strings', () => {
  const lead = pickLeadFields({ firstName: 42, lastName: { $gt: '' }, email: '   ', phone: ['1'] });
  assert.deepEqual(lead, { source: 'Booking Form' });
});

test('caps field length', () => {
  const lead = pickLeadFields({ goal: 'x'.repeat(5000) });
  assert.equal(lead.goal.length, LIMITS.goal);
});

test('handles a missing or non-object body', () => {
  assert.deepEqual(pickLeadFields(undefined), { source: 'Booking Form' });
  assert.deepEqual(pickLeadFields('nope'), { source: 'Booking Form' });
});
