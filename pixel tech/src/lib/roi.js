export const MONTHLY_PRICE = 297;
const WEEKS_PER_MONTH = 4.3;

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

// Monthly estimate: (calls x missed% + late DMs/texts) x 4.3 weeks, then x book% x treatment value.
export function estimateLeak({ callsPerWeek, missedPct, missedMessagesPerWeek, bookPct, treatmentValue }) {
  const missed = (clean(callsPerWeek) * pct(missedPct) + clean(missedMessagesPerWeek)) * WEEKS_PER_MONTH;
  const bookings = missed * pct(bookPct);
  return {
    missedLeads: Math.round(missed),
    lostBookings: Math.round(bookings),
    lostRevenue: Math.round(bookings * clean(treatmentValue)),
  };
}

// Recovered bookings per month needed to cover the plan; null when no value is entered.
export function bookingsToBreakEven(avgTreatmentValue, price = MONTHLY_PRICE) {
  const v = clean(avgTreatmentValue);
  return v ? Math.ceil(price / v) : null;
}
