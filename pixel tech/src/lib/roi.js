export const MONTHLY_PRICE = 297;
const WEEKS_PER_MONTH = 4.3;
// Assumption, labelled on the page: about half of missed leads are existing patients who get back in touch.
// Replace with measured data after client #1 (plan 8.5 item 10).
const EXISTING_PATIENT_SHARE = 0.5;

// missedPct default is Zenoti's 37% (salons & spas); bookPct is our conservative assumption, labelled as such on the page.
export const DEFAULT_INPUTS = {
  callsPerWeek: 80,
  missedPct: 37,
  missedMessagesPerWeek: 10,
  bookPct: 25,
  treatmentValue: 500,
};

// Bad input (empty field, negative, NaN) counts as 0 rather than showing NaN on the page.
const clean = (n) => (Number.isFinite(Number(n)) && Number(n) > 0 ? Number(n) : 0);
const pct = (n) => Math.min(clean(n), 100) / 100;

export const usd = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// Monthly estimate: (calls x missed% + late DMs/texts) x 4.3 weeks, then x book% x treatment value.
// lostRevenueLow is the same total with the existing-patient share taken out.
export function estimateLeak({ callsPerWeek, missedPct, missedMessagesPerWeek, bookPct, treatmentValue }) {
  const missed = (clean(callsPerWeek) * pct(missedPct) + clean(missedMessagesPerWeek)) * WEEKS_PER_MONTH;
  const bookings = missed * pct(bookPct);
  const revenue = bookings * clean(treatmentValue);
  return {
    missedLeads: Math.round(missed),
    lostBookings: Math.round(bookings),
    lostRevenue: Math.round(revenue),
    lostRevenueLow: Math.round(revenue * (1 - EXISTING_PATIENT_SHARE)),
  };
}

// Recovered bookings per month needed to cover the plan; null when no value is entered.
export function bookingsToBreakEven(avgTreatmentValue, price = MONTHLY_PRICE) {
  const v = clean(avgTreatmentValue);
  return v ? Math.ceil(price / v) : null;
}

// The booking form's calls/week options. callsBucket returns entries of this list, so the two can't drift.
export const CALL_VOLUMES = ['Under 25', '25–50', '50–100', '100+', 'Not sure'];

// Booking-form option for a calls/week number. '' (no prefill) for missing or invalid input, never a guess.
export function callsBucket(calls) {
  if (calls === null || calls === undefined || calls === '') return '';
  const n = Number(calls);
  if (!Number.isFinite(n) || n < 0) return '';
  if (n < 25) return CALL_VOLUMES[0];
  if (n < 50) return CALL_VOLUMES[1];
  if (n < 100) return CALL_VOLUMES[2];
  return CALL_VOLUMES[3];
}

// Calculator inputs <-> /booking URL params (plan E5). Short keys keep the link readable.
const PARAM_KEYS = { calls: 'callsPerWeek', missed: 'missedPct', dms: 'missedMessagesPerWeek', book: 'bookPct', value: 'treatmentValue' };

export function toRoiParams(inputs) {
  return new URLSearchParams(Object.entries(PARAM_KEYS).map(([param, key]) => [param, String(clean(inputs[key]))])).toString();
}

// null when the URL carries none of our params (a plain visit to /booking); hostile values become 0.
// callsPerWeek stays null when `calls` is missing or invalid, so the form isn't prefilled with a guess (plan 8.13 item 8).
export function fromRoiParams(searchParams) {
  if (!Object.keys(PARAM_KEYS).some((param) => searchParams.has(param))) return null;
  const inputs = Object.fromEntries(Object.entries(PARAM_KEYS).map(([param, key]) => [key, clean(searchParams.get(param))]));
  const calls = searchParams.get('calls');
  if (calls === null || calls.trim() === '' || !Number.isFinite(Number(calls)) || Number(calls) < 0) inputs.callsPerWeek = null;
  return inputs;
}

// Calculator inputs saved for the visit (design review D10). The stored text is untrusted: anything that is not
// a JSON object of our five keys with short numeric strings is ignored, and a missing key keeps its default.
export function restoreRoiForm(raw) {
  let saved;
  try { saved = JSON.parse(raw); } catch { return null; }
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return null;
  const form = {};
  for (const [key, def] of Object.entries(DEFAULT_INPUTS)) {
    const v = saved[key];
    form[key] = typeof v === 'string' && v.length <= 12 && /^\d*\.?\d*$/.test(v) ? v : String(def);
  }
  return form;
}

export function formatRoiRange(inputs) {
  const { lostRevenue, lostRevenueLow } = estimateLeak(inputs);
  return `${usd(lostRevenueLow)}–${usd(lostRevenue)}/mo`;
}

// One line stored on the lead, so the audit call starts from the owner's own numbers.
export function formatRoiEstimate(inputs) {
  const v = (key) => clean(inputs[key]);
  // Percentages as the math used them (capped at 100), so the lead matches the range it shows.
  const p = (key) => Math.round(pct(inputs[key]) * 100);
  return `${formatRoiRange(inputs)} (calls ${v('callsPerWeek')}/wk, missed ${p('missedPct')}%, late texts & DMs ${v('missedMessagesPerWeek')}/wk, booking ${p('bookPct')}%, value ${usd(v('treatmentValue'))})`;
}
