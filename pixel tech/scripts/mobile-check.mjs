// Phone-width layout check (plan §6, eng review X7): serves dist/ with vite preview, opens each route in
// local headless Chrome at 320 and 375px wide and exits 1 if any page is wider than the screen (sideways scroll).
// Run with `npm run check:mobile` (builds first). Chrome is found at CHROME_PATH or the usual install paths.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { preview } from 'vite';

// 320px is the narrowest phone in common use (iPhone SE); 375px is the most common.
const WIDTHS = [320, 375];
const ROUTES = ['/', '/pricing', '/booking', '/booking?calls=80&missed=37&dms=10&book=25&value=500', '/about'];
const CHROME_PATHS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const chromePath = CHROME_PATHS.find((p) => existsSync(p));
if (!chromePath) {
  console.error('mobile-check: no Chrome found. Set CHROME_PATH to a Chrome or Edge binary.');
  process.exit(2);
}

const server = await preview({ preview: { port: 4320, strictPort: true }, logLevel: 'silent' });
const base = server.resolvedUrls.local[0].replace(/\/$/, '');
const profile = mkdtempSync(join(tmpdir(), 'mobile-check-'));
// Port 0: Chrome picks a free port and writes it to DevToolsActivePort, so a leftover Chrome can't collide.
const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
let send;

let failed = false;
try {
  let target;
  for (let i = 0; i < 100 && !target; i++) { // up to 30s: a busy machine can be slow to start Chrome
    try {
      const port = readFileSync(join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0];
      target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
    } catch {
      await wait(300);
    }
  }
  if (!target) throw new Error('Chrome did not start its debugging port');

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener('open', r, { once: true }); ws.addEventListener('error', j, { once: true }); });
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

  // html and body carry overflow-x: clip (DESIGN.md), which hides overflow from scrollWidth. So the check looks
  // for any element poking past the screen edge, unless an inner ancestor clips or scrolls it on purpose
  // (a truncated line, a scrolling table). It names the outermost offenders so a failure points at the culprit.
  const probe = `(() => {
    const vw = document.documentElement.clientWidth;
    const clippedInside = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        if (getComputedStyle(p).overflowX !== 'visible') return true;
      }
      return false;
    };
    const out = [...document.querySelectorAll('body *')].filter((el) => {
      if (el.closest('[aria-hidden="true"]') || getComputedStyle(el).position === 'fixed') return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 1 || r.left < -1) && !clippedInside(el);
    });
    const outer = out.filter((el) => !out.some((o) => o !== el && o.contains(el)));
    const wide = outer.slice(0, 3).map((el) => el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 60) + ' [' + Math.round(el.getBoundingClientRect().left) + '..' + Math.round(el.getBoundingClientRect().right) + ']');
    return { vw, scrollWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, wide, rendered: !!document.querySelector('main') };
  })()`;

  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 812, deviceScaleFactor: 2, mobile: true });
    for (const route of ROUTES) {
      await send('Page.navigate', { url: base + route });
      // Poll until the app has rendered (up to 15s) instead of a fixed wait, then let fonts settle.
      let res;
      for (let i = 0; i < 50; i++) {
        res = (await send('Runtime.evaluate', { expression: probe, returnByValue: true })).result?.result?.value;
        if (res?.rendered && res.height > 812) break;
        await wait(300);
      }
      await wait(600);
      res = (await send('Runtime.evaluate', { expression: probe, returnByValue: true })).result.result.value;
      const { scrollWidth, height, wide } = res;
      // A page no taller than the screen means the app didn't render; that's a failure, not a pass.
      const ok = scrollWidth <= width && height > 812 && wide.length === 0;
      if (!ok) failed = true;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${width}px ${route}  width ${scrollWidth}/${width}${height > 812 ? '' : '  (page did not render)'}${wide.length ? '  past the edge: ' + wide.join(' | ') : ''}`);
    }
  }
} catch (err) {
  failed = true;
  console.error('mobile-check:', err.message);
} finally {
  // Browser.close shuts down every Chrome process; kill() alone leaves children running on Windows.
  if (send) await Promise.race([send('Browser.close'), wait(2000)]);
  chrome.kill();
  await server.close();
  await wait(300);
  try { rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold the profile on Windows */ }
}
process.exit(failed ? 1 : 0);
