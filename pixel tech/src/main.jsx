import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { trackClicks } from './lib/track.js'

// Vercel Web Analytics (cookieless, plan 8.3 E1). Vercel serves this path once Analytics is enabled for the
// project; it doesn't exist under `vite dev`/`preview`, so only production builds load it.
if (import.meta.env.PROD) {
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
