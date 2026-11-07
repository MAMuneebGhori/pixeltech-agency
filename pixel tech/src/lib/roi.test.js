import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateLeak, bookingsToBreakEven, DEFAULT_INPUTS,
  callsBucket, CALL_VOLUMES, toRoiParams, fromRoiParams, formatRoiEstimate, restoreRoiForm,
} from './roi.js';

test('estimateLeak with the default inputs', () => {
  // (80 calls x 37% + 10 messages) = 39.6 missed/week; x 4.3 = 170.28/mo; x 25% = 42.57 bookings; x $500
  // Low end halves it (EXISTING_PATIENT_SHARE = 0.5): 10642.5 rounds to 10643.
  assert.deepEqual(estimateLeak(DEFAULT_INPUTS), { missedLeads: 170, lostBookings: 43, lostRevenue: 21285, lostRevenueLow: 10643 });
});

test('estimateLeak accepts the string values inputs give it', () => {
  assert.deepEqual(
    estimateLeak({ callsPerWeek: '20', missedPct: '50', missedMessagesPerWeek: '0', bookPct: '100', treatmentValue: '100' }),
    { missedLeads: 43, lostBookings: 43, lostRevenue: 4300, lostRevenueLow: 2150 },
  );
});

test('estimateLeak treats empty, negative and NaN input as 0', () => {
  assert.equal(estimateLeak({ ...DEFAULT_INPUTS, treatmentValue: '' }).lostRevenue, 0);
  assert.equal(estimateLeak({ ...DEFAULT_INPUTS, bookPct: -5 }).lostRevenue, 0);
  const noMissed = estimateLeak({ ...DEFAULT_INPUTS, callsPerWeek: 'abc', missedMessagesPerWeek: '' });
  assert.deepEqual(noMissed, { missedLeads: 0, lostBookings: 0, lostRevenue: 0, lostRevenueLow: 0 });
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

test('callsBucket maps calls/week to the booking form options at each boundary', () => {
  assert.equal(callsBucket(0), 'Under 25');
  assert.equal(callsBucket(24), 'Under 25');
  assert.equal(callsBucket(25), '25–50');
  assert.equal(callsBucket(49), '25–50');
  assert.equal(callsBucket(50), '50–100');
  assert.equal(callsBucket(99), '50–100');
  assert.equal(callsBucket(100), '100+');
  assert.equal(callsBucket('80'), '50–100');
  // Every bucket must be a real <select> option on /booking, or the prefill renders empty.
  for (const n of [0, 30, 60, 500]) assert.ok(CALL_VOLUMES.includes(callsBucket(n)), String(n));
});

test('callsBucket returns no prefill for missing or invalid input', () => {
  for (const bad of [NaN, undefined, null, '', 'abc', -5]) assert.equal(callsBucket(bad), '', String(bad));
});

test('ROI params round-trip through the URL', () => {
  const qs = toRoiParams(DEFAULT_INPUTS);
  assert.equal(qs, 'calls=80&missed=37&dms=10&book=25&value=500');
  assert.deepEqual(fromRoiParams(new URLSearchParams(qs)), DEFAULT_INPUTS);
});

test('fromRoiParams returns null without params and zeroes hostile values', () => {
  assert.equal(fromRoiParams(new URLSearchParams('')), null);
  assert.equal(fromRoiParams(new URLSearchParams('utm_source=x')), null);
  assert.deepEqual(
    fromRoiParams(new URLSearchParams('calls=<script>&missed=-4&value=900')),
    { callsPerWeek: null, missedPct: 0, missedMessagesPerWeek: 0, bookPct: 0, treatmentValue: 900 },
  );
});

test('a missing or invalid calls param means no calls/week prefill, never a guessed bucket', () => {
  for (const qs of ['value=500', 'calls=abc', 'calls=', 'calls=-5']) {
    assert.equal(callsBucket(fromRoiParams(new URLSearchParams(qs)).callsPerWeek), '', qs);
  }
  assert.equal(callsBucket(fromRoiParams(new URLSearchParams('calls=0')).callsPerWeek), 'Under 25', 'a real 0 is still a number');
});

test('formatRoiEstimate states the range and the inputs behind it', () => {
  assert.equal(
    formatRoiEstimate(DEFAULT_INPUTS),
    '$10,643–$21,285/mo (calls 80/wk, missed 37%, late texts & DMs 10/wk, booking 25%, value $500)',
  );
  // A typed 150% is computed at 100%; the lead must say what the math used.
  assert.match(formatRoiEstimate({ ...DEFAULT_INPUTS, missedPct: 150, bookPct: 120 }), /missed 100%.*booking 100%/);
});

test('restoreRoiForm keeps saved numbers and rejects anything else', () => {
  const saved = JSON.stringify({ callsPerWeek: '120', missedPct: '40', missedMessagesPerWeek: '', bookPct: '30', treatmentValue: '650' });
  assert.deepEqual(restoreRoiForm(saved), { callsPerWeek: '120', missedPct: '40', missedMessagesPerWeek: '', bookPct: '30', treatmentValue: '650' });
  // A blank field the owner cleared stays blank; a hostile or missing value falls back to its default.
  const mixed = restoreRoiForm(JSON.stringify({ callsPerWeek: '<img>', missedPct: 37, treatmentValue: '9'.repeat(20) }));
  assert.deepEqual(mixed, { callsPerWeek: '80', missedPct: '37', missedMessagesPerWeek: '10', bookPct: '25', treatmentValue: '500' });
  for (const bad of [null, '', 'not json', '[]', '"x"', '42']) assert.equal(restoreRoiForm(bad), null, String(bad));
});
