import { Component, StrictMode, Suspense } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './fonts.js'
import './index.css'
import { isMissingFile, reloadOnce } from './lib/reload.js'

// Arabic lives at /, English at /en. Each language is its own bundle, so a
// visitor only downloads the one they read.
const { pathname, search } = window.location
const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
const load = isEnglish ? import('./en/App.jsx') : import('./App.jsx')

// Last line of defence: if anything outside a page (header, footer, dialogs)
// crashes, offer a reload instead of leaving a blank screen.
class RootBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (!this.state.error) return this.props.children
    if (isMissingFile(this.state.error) && reloadOnce()) return null
    return (
      <div className="wrap max-w-xl py-24 text-center">
        <h1 className="h-display text-4xl">{isEnglish ? 'Something went wrong' : 'حدث خطأ'}</h1>
        <p className="mt-4 text-ink-2">{isEnglish ? 'Reload the page to try again.' : 'أعد تحميل الصفحة وحاول مجدداً.'}</p>
        <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-8">
          {isEnglish ? 'Reload' : 'إعادة التحميل'}
        </button>
      </div>
    )
  }
}

load.then(({ default: App }) => {
  const app = (
    <StrictMode>
      <RootBoundary>
        <BrowserRouter basename={isEnglish ? '/en' : '/'}>
          <Suspense fallback={null}>
            <App />
          </Suspense>
        </BrowserRouter>
      </RootBoundary>
    </StrictMode>
  )
  const root = document.getElementById('root')
  // Pages are pre-rendered without query strings; hydrate those, and render
  // fresh when the URL carries filters or the HTML belongs to another path.
  if (root.dataset.path === pathname.replace(/(.)\/$/, '$1') && !search) hydrateRoot(root, app)
  else createRoot(root).render(app)
}).catch(() => {
  // The app could not load (offline, blocked). The pre-rendered page stays:
  // it is readable and its links work without the app.
})

// Chrome offers installing the app; keep the offer for the install card
// (components/InstallPrompt.jsx) instead of Chrome's own banner.
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  window.installPrompt = e
})

// Keep the app on the phone for instant and offline visits (see scripts/sw-template.js).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}))
}
