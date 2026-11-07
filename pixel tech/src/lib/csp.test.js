import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// vercel.json's CSP allows index.html's inline script and onload handler by hash. Editing either one without
// updating the hash makes the browser block it (no html.js class, web fonts never applied), so this test fails first.
const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8');
const vercel = JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8'));
const csp = vercel.headers.flatMap((h) => h.headers).find((h) => h.key === 'Content-Security-Policy').value;
const sha = (t) => `'sha256-${createHash('sha256').update(t).digest('base64')}'`;

test('every inline script and handler in index.html is allowed by the CSP hash list', () => {
  const inline = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const handlers = [...html.matchAll(/\son[a-z]+="([^"]*)"/g)].map((m) => m[1]);
  assert.ok(inline.length + handlers.length > 0);
  for (const code of [...inline, ...handlers]) assert.ok(csp.includes(sha(code)), `missing hash for: ${code}`);
  if (handlers.length) assert.ok(csp.includes("'unsafe-hashes'"), 'inline handlers need unsafe-hashes');
});

test('the CSP keeps its hard limits', () => {
  for (const d of ["object-src 'none'", "frame-ancestors 'none'", "base-uri 'self'"]) assert.ok(csp.includes(d), d);
  assert.ok(!/script-src[^;]*'unsafe-inline'/.test(csp), 'no unsafe-inline scripts');
});
