import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { preferredLang, pathFor } from './lib/lang.js'
import './index.css'

// Arabic lives at /, English at /en. Each language is its own bundle, so a
// visitor only downloads the one they read.
const ArabicApp = lazy(() => import('./App.jsx'))
const EnglishApp = lazy(() => import('./en/App.jsx'))

const { pathname, search, hash } = window.location
const isEnglish = pathname === '/en' || pathname.startsWith('/en/')
const wanted = preferredLang()

if (wanted && wanted !== (isEnglish ? 'en' : 'ar')) {
  window.location.replace(pathFor(wanted) + search + hash)
} else {
  document.documentElement.lang = isEnglish ? 'en' : 'ar'
  document.documentElement.dir = isEnglish ? 'ltr' : 'rtl'
  if (isEnglish) document.title = 'German Year Guide | for GJU students'

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <BrowserRouter basename={isEnglish ? '/en' : '/'}>
        <Suspense fallback={null}>{isEnglish ? <EnglishApp /> : <ArabicApp />}</Suspense>
      </BrowserRouter>
    </StrictMode>,
  )
}
