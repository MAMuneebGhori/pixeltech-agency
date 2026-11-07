// Browsers may call this API only from the site itself, its Vercel previews, or local dev.
// Previews end in the team slug, which only this Vercel team can create, so a look-alike project name can't match.
// CORS_ORIGINS (comma-separated) adds exact origins, e.g. a custom domain.
const PREVIEW = /^https:\/\/pixeltech-agency-[a-z0-9-]+-m-a-muneeb-s-projects\.vercel\.app$/;
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1):\d{2,5}$/;
const DEFAULTS = ['https://pixeltech-agency.vercel.app', 'https://www.pixeltech.agency', 'https://pixeltech.agency'];

function isAllowedOrigin(origin, extra = process.env.CORS_ORIGINS) {
  if (typeof origin !== 'string') return false;
  const exact = DEFAULTS.concat(String(extra || '').split(',').map((s) => s.trim()).filter(Boolean));
  return exact.includes(origin) || PREVIEW.test(origin) || LOCAL.test(origin);
}

module.exports = { isAllowedOrigin };
