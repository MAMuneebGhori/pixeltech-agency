// Vercel Web Analytics custom events (plan 8.3 E1). The insights script (injected in main.jsx) defines window.va;
// until it loads, calls queue in window.vaq. Custom events need a paid Vercel plan; on Hobby they are dropped
// server-side and page views still work. Never throws: analytics must not break a page or a form submit.
export function track(name, data) {
  try {
    if (typeof window === 'undefined') return;
    window.va = window.va || function (...args) { (window.vaq = window.vaq || []).push(args); };
    window.va('event', data ? { name, data } : { name });
  } catch {
    // shortcut: swallowed on purpose; an adblocker or a missing script is not an error worth surfacing.
  }
}

// One delegated listener covers every CTA: <a data-cta="hero"> sends cta_click {location: 'hero'},
// <a data-event="demo_tel_tap"> sends that event. Returns a cleanup function.
export function trackClicks(root = document) {
  const onClick = (e) => {
    const el = e.target instanceof Element ? e.target.closest('[data-cta],[data-event]') : null;
    if (!el) return;
    if (el.dataset.cta) track('cta_click', { location: el.dataset.cta });
    if (el.dataset.event) track(el.dataset.event);
  };
  root.addEventListener('click', onClick);
  return () => root.removeEventListener('click', onClick);
}
