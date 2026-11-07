const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isAllowedOrigin } = require('./origins');

test('allows the site, team previews and local dev', () => {
  assert.ok(isAllowedOrigin('https://pixeltech-agency.vercel.app', ''));
  assert.ok(isAllowedOrigin('https://pixeltech-agency-3fk2a9-m-a-muneeb-s-projects.vercel.app', ''));
  assert.ok(isAllowedOrigin('https://pixeltech-agency-git-main-m-a-muneeb-s-projects.vercel.app', ''));
  assert.ok(isAllowedOrigin('http://localhost:5173', ''));
  assert.ok(isAllowedOrigin('https://www.pixeltech.agency', ''));
  assert.ok(isAllowedOrigin('https://pixeltech.agency', ''));
});

test('rejects other origins, look-alikes and missing values', () => {
  for (const o of [
    'https://evil.example',
    'https://evilpixeltech.agency',
    'https://www.pixeltech.agency.evil.example',
    'https://pixeltech-agency-evil.vercel.app',
    'https://pixeltech-agency.vercel.app.evil.example',
    'https://pixeltech-agency-x-m-a-muneeb-s-projects.vercel.app.evil.example',
    'http://pixeltech-agency.vercel.app',
    'http://localhost.evil.example:5173',
    'null',
    undefined,
  ]) assert.equal(isAllowedOrigin(o, ''), false, String(o));
});

test('CORS_ORIGINS adds exact origins only', () => {
  assert.ok(isAllowedOrigin('https://glowclinic.com', 'https://glowclinic.com, https://x.com'));
  assert.equal(isAllowedOrigin('https://sub.glowclinic.com', 'https://glowclinic.com'), false);
});
