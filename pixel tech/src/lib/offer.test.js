import { test } from 'node:test';
import assert from 'node:assert/strict';
import { foundingOffer } from './offer.js';

test('foundingOffer names the seats while any are left', () => {
  assert.equal(foundingOffer(3, 3), 'Founding partner pricing for the first 3 clinics');
  assert.equal(foundingOffer(1, 3), 'Founding partner pricing, 1 of 3 seats left');
});

test('foundingOffer closes the offer at 0 and on bad input, so the card stops saying "waived"', () => {
  for (const left of [0, -2, NaN, undefined, 'x']) assert.equal(foundingOffer(left, 3), null, String(left));
  assert.equal(foundingOffer(5, 3), 'Founding partner pricing for the first 3 clinics', 'never more seats than exist');
});
