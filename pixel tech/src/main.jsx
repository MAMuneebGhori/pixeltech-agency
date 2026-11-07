import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { trackClicks } from './lib/track.js'

// Vercel Web Analytics (cookieless, plan 8.3 E1). Vercel serves this path once Analytics is enabled for the
// project; it doesn't exist under `vite dev`/`preview`, so only production builds load it.
// Only once Analytics is enabled for the Vercel project: until then the path is a text/plain 404, which nosniff turns
// into a console error on every page. Enable it in the dashboard, then set VITE_ANALYTICS=1 in Vercel and redeploy.
if (import.meta.env.PROD && import.meta.env.VITE_ANALYTICS === '1') {
  const s = document.createElement('script')
  s.src = '/_vercel/insights/script.js'
  s.defer = true
  document.head.appendChild(s)
}
trackClicks()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
