const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRateLimiter } = require('./rateLimit');

test('allows 5 per window per IP, blocks the 6th, and frees up once the window passes', () => {
  let t = 0;
  const allow = createRateLimiter({ limit: 5, windowMs: 600000, now: () => t });
  for (let i = 0; i < 5; i++) assert.equal(allow('1.1.1.1'), true, `request ${i + 1}`);
  assert.equal(allow('1.1.1.1'), false);
  assert.equal(allow('2.2.2.2'), true, 'other IPs keep their own count');
  t = 600000;
  assert.equal(allow('1.1.1.1'), true);
});

test('blocked requests do not extend the window', () => {
  let t = 0;
  const allow = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
  assert.equal(allow('ip'), true);
  t = 500;
  assert.equal(allow('ip'), false);
  t = 1000;
  assert.equal(allow('ip'), true);
});
