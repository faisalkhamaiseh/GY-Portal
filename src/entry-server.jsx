import { StrictMode, Suspense } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import ArabicApp from './App.jsx'
import EnglishApp from './en/App.jsx'
import { regions } from './data/regions.js'
import { RegionArtSvg } from './components/RegionArtSvg.jsx'
import { universities } from './lib/data.js'

// Renders one route to HTML at build time, waiting for every lazy page.
export async function render(url) {
  const en = url === '/en' || url.startsWith('/en/')
  const App = en ? EnglishApp : ArabicApp
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={url} basename={en ? '/en' : '/'}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </StaticRouter>
    </StrictMode>,
  )
  let html = ''
  for await (const chunk of prelude) html += chunk
  return html
}

// Every pre-rendered path, in both languages.
export function routes() {
  const pages = ['/', '/regions', '/universities', '/costs', '/housing', '/guide', '/videos', '/internships', '/survival-map', '/rules', '/compare', '/travel', '/apps', '/ingredients']
  const all = [...pages, ...regions.map((r) => `/regions/${r.slug}`), ...universities.map((u) => `/universities/${u.id}`)]
  return [...all, ...all.map((p) => (p === '/' ? '/en' : `/en${p}`))]
}

// Each region's poster as a standalone SVG file, keyed by slug.
export function regionArt() {
  return Object.fromEntries(regions.map((r) => [r.slug, renderToStaticMarkup(<RegionArtSvg region={r} />)]))
}
