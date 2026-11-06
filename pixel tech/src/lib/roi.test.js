import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estimateLeak, bookingsToBreakEven, DEFAULT_INPUTS } from './roi.js';

test('estimateLeak with the default inputs', () => {
  // (80 calls x 37% + 10 messages) = 39.6 missed/week; x 4.3 = 170.28/mo; x 25% = 42.57 bookings; x $500
  assert.deepEqual(estimateLeak(DEFAULT_INPUTS), { missedLeads: 170, lostBookings: 43, lostRevenue: 21285 });
});

test('estimateLeak accepts the string values inputs give it', () => {
  assert.deepEqual(
    estimateLeak({ callsPerWeek: '20', missedPct: '50', missedMessagesPerWeek: '0', bookPct: '100', treatmentValue: '100' }),
    { missedLeads: 43, lostBookings: 43, lostRevenue: 4300 },
  );
});

test('estimateLeak treats empty, negative and NaN input as 0', () => {
  assert.equal(estimateLeak({ ...DEFAULT_INPUTS, treatmentValue: '' }).lostRevenue, 0);
  assert.equal(estimateLeak({ ...DEFAULT_INPUTS, bookPct: -5 }).lostRevenue, 0);
  const noMissed = estimateLeak({ ...DEFAULT_INPUTS, callsPerWeek: 'abc', missedMessagesPerWeek: '' });
  assert.deepEqual(noMissed, { missedLeads: 0, lostBookings: 0, lostRevenue: 0 });
});

test('estimateLeak clamps percentages to 100', () => {
  const capped = estimateLeak({ ...DEFAULT_INPUTS, missedPct: 250, bookPct: 400 });
  const full = estimateLeak({ ...DEFAULT_INPUTS, missedPct: 100, bookPct: 100 });
  assert.deepEqual(capped, full);
});

test('bookingsToBreakEven rounds up against $297', () => {
  assert.equal(bookingsToBreakEven(500), 1);
  assert.equal(bookingsToBreakEven(297), 1);
  assert.equal(bookingsToBreakEven(100), 3);
  assert.equal(bookingsToBreakEven(0), null);
  assert.equal(bookingsToBreakEven(''), null);
});
