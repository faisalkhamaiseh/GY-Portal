import { Component, Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation, useParams, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import DisclaimerModal from '../components/Disclaimer.jsx'
import HomePage from './pages/HomePage.jsx'

// Every page except the home page loads on demand, so the first visit only
// downloads what it shows.
const RegionsPage = lazy(() => import('./pages/RegionsPage.jsx'))
const RegionPage = lazy(() => import('./pages/RegionPage.jsx'))
const UniversitiesPage = lazy(() => import('./pages/UniversitiesPage.jsx'))
const UniversityPage = lazy(() => import('./pages/UniversityPage.jsx'))
const CostsPage = lazy(() => import('./pages/CostsPage.jsx'))
const HousingPage = lazy(() => import('./pages/HousingPage.jsx'))
const GuidePage = lazy(() => import('./pages/GuidePage.jsx'))
const VideosPage = lazy(() => import('./pages/VideosPage.jsx'))
const InternshipsPage = lazy(() => import('./pages/InternshipsPage.jsx'))
const SurvivalMapPage = lazy(() => import('./pages/SurvivalMapPage.jsx'))
const RulesPage = lazy(() => import('./pages/RulesPage.jsx'))
const ComparePage = lazy(() => import('./pages/ComparePage.jsx'))
const TravelPage = lazy(() => import('./pages/TravelPage.jsx'))
const AppsPage = lazy(() => import('./pages/AppsPage.jsx'))
const IngredientsPage = lazy(() => import('./pages/IngredientsPage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // Lazy pages render a moment later: wait for the target section, then
    // re-align while videos load above it, unless the visitor scrolls.
    let tries = 0
    let frame
    let userMoved = false
    const timers = []
    const id = decodeURIComponent(hash.slice(1))
    const stop = () => (userMoved = true)
    const align = () => !userMoved && document.getElementById(id)?.scrollIntoView()
    const seek = () => {
      if (document.getElementById(id)) {
        align()
        for (const ms of [300, 800, 1500]) timers.push(setTimeout(align, ms))
      } else if (tries++ < 120) frame = requestAnimationFrame(seek)
    }
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchmove', stop, { passive: true })
    window.addEventListener('keydown', stop)
    seek()
    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [pathname, search, hash])
  return null
}

// Remount a page when its URL changes so local state starts fresh.
function Keyed({ page: Page, param }) {
  const params = useParams()
  const { search } = useLocation()
  return <Page key={param ? params[param] : search} />
}

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (!this.state.error) return this.props.children
    // A new deploy can make old page files disappear: reload once to get them.
    const chunk = /dynamically imported module|Loading chunk|Importing a module script failed/i.test(String(this.state.error?.message))
    if (chunk && !sessionStorage.getItem('reloaded')) {
      try {
        sessionStorage.setItem('reloaded', '1')
      } catch {
        // ignore
      }
      window.location.reload()
      return null
    }
    return (
      <div className="wrap max-w-xl py-24 text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="h-display mt-2 text-4xl">This page did not load</h1>
        <p className="mt-4 text-ink-2">Check your connection and try again. The rest of the guide still works.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button type="button" onClick={() => window.location.reload()} className="btn-primary">
            Reload
          </button>
          <Link to="/" onClick={() => this.setState({ error: null })} className="btn-ghost">
            Home
          </Link>
        </div>
      </div>
    )
  }
}

function PageFallback() {
  return (
    <div className="wrap pt-14" aria-busy="true" aria-label="Loading">
      <div className="h-3 w-32 animate-pulse rounded bg-sand" />
      <div className="mt-4 h-12 w-2/3 animate-pulse rounded-lg bg-sand" />
      <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-sand" />
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-sand" />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/regions" element={<RegionsPage />} />
              <Route path="/regions/:slug" element={<Keyed page={RegionPage} param="slug" />} />
              <Route path="/universities" element={<UniversitiesPage />} />
              <Route path="/universities/:id" element={<Keyed page={UniversityPage} param="id" />} />
              <Route path="/costs" element={<Keyed page={CostsPage} />} />
              <Route path="/housing" element={<Keyed page={HousingPage} />} />
              <Route path="/internships" element={<Keyed page={InternshipsPage} />} />
              <Route path="/survival-map" element={<Keyed page={SurvivalMapPage} />} />
              <Route path="/guide" element={<GuidePage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/travel" element={<TravelPage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="/ingredients" element={<IngredientsPage />} />
              <Route path="/videos" element={<Keyed page={VideosPage} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <DisclaimerModal lang="en" />
    </div>
  )
}
