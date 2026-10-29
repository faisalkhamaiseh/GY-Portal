import { StrictMode, Suspense } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import ArabicApp from './App.jsx'
import EnglishApp from './en/App.jsx'
import { regions } from './data/regions.js'
import { RegionArtSvg } from './components/RegionArtSvg.jsx'
import { universities } from './lib/data.js'

function tree(url) {
  const en = url === '/en' || url.startsWith('/en/')
  const App = en ? EnglishApp : ArabicApp
  return (
    <StrictMode>
      <StaticRouter location={url} basename={en ? '/en' : '/'}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </StaticRouter>
    </StrictMode>
  )
}

// Renders one route to HTML at build time. `prerender` waits until the
// route's lazy page modules have loaded; `renderToString` then writes the
// page with its content in place. (prerender's own output moves large content
// out of place, behind a loading skeleton that an inline script swaps later:
// a slower first paint, and stuck on the skeleton if that script fails.)
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(tree(url))
  for await (const _ of prelude); // drain
  return renderToString(tree(url))
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
