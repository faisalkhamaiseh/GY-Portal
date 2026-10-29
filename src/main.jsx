import { StrictMode, Suspense } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './fonts.js'
import './index.css'

// Arabic lives at /, English at /en. Each language is its own bundle, so a
// visitor only downloads the one they read.
const { pathname, search } = window.location
const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
const load = isEnglish ? import('./en/App.jsx') : import('./App.jsx')

load.then(({ default: App }) => {
  const app = (
    <StrictMode>
      <BrowserRouter basename={isEnglish ? '/en' : '/'}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </BrowserRouter>
    </StrictMode>
  )
  const root = document.getElementById('root')
  // Pages are pre-rendered without query strings; hydrate those, and render
  // fresh when the URL carries filters or the HTML belongs to another path.
  if (root.dataset.path === pathname.replace(/(.)\/$/, '$1') && !search) hydrateRoot(root, app)
  else createRoot(root).render(app)
})

// Keep the app on the phone for instant and offline visits (see scripts/sw-template.js).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
