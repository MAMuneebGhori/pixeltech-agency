// Sliding-window limiter keyed by client IP. Returns true when the request is allowed.
// shortcut: in-memory and per-process, so a restart resets it and two Render instances don't share counts;
// move to Redis if the backend ever scales past one instance.
function createRateLimiter({ limit, windowMs, now = Date.now }) {
  const hits = new Map();
  return function allow(key) {
    const t = now();
    const recent = (hits.get(key) || []).filter((ts) => t - ts < windowMs);
    const ok = recent.length < limit;
    if (ok) recent.push(t);
    hits.set(key, recent);
    // Keep memory bounded: drop keys with nothing left in the window.
    if (hits.size > 1000) for (const [k, v] of hits) if (!v.some((ts) => t - ts < windowMs)) hits.delete(k);
    return ok;
  };
}

module.exports = { createRateLimiter };
