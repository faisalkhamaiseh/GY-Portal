// Pre-renders every route to static HTML after `vite build`, so phones paint
// the page before any JavaScript runs; React then hydrates it.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createHash } from 'node:crypto'

const dist = 'dist'
const { render, routes, regionArt } = await import(pathToFileURL(join('dist-ssr', 'entry-server.js')).href)
// Inline the stylesheet: the page paints from the HTML alone, without waiting
// for a second request. (The client takes over with in-app navigation, so the
// HTML is downloaded once per visit.)
const shell = await readFile(join(dist, 'index.html'), 'utf8')
const cssLink = shell.match(/<link rel="stylesheet"[^>]*href="\/([^"]+\.css)">/)
const css = await readFile(join(dist, cssLink[1]), 'utf8')
const template = shell.replace(cssLink[0], `<style>${css}</style>`)
// Preload the body and heading fonts for the page's script so text renders in
// its final face right away.
const assets = await readdir(join(dist, 'assets'))
const font = (name) => assets.find((f) => f.startsWith(name) && f.endsWith('.woff2'))
const fontLinks = (script) =>
  [font(`ibm-plex-sans-arabic-${script}-400-normal`), font(`cairo-${script}-800-normal`)]
    .filter(Boolean)
    .map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}">`)
    .join('')

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

// Region posters, written to public/ too so the dev server has them.
for (const [slug, svg] of Object.entries(regionArt())) {
  for (const dir of [join(dist, 'art'), join('public', 'art')]) {
    await mkdir(dir, { recursive: true })
    await writeFile(join(dir, `${slug}.svg`), svg)
  }
}

// The app shell without content: every host serves 404.html for unknown
// paths, and the app then renders its own "not found" page. The service
// worker also uses it to open any page offline.
await writeFile(join(dist, '404.html'), template.replace('<!--head-->', '').replace('<!--app-->', ''))

// The public address for canonical links and the sitemap: SITE_URL if set,
// else the production domain Vercel provides at build time.
const origin = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://gy-portal.vercel.app')).replace(/\/$/, '')
const bare = (path) => path.replace(/^\/en(?=\/|$)/, '') || '/'
const inLang = (lang, path) => (lang === 'en' ? (bare(path) === '/' ? '/en' : `/en${bare(path)}`) : bare(path))
// Canonical address plus the same page in the other language, for search engines.
const seoLinks = (path) =>
  `<link rel="canonical" href="${origin}${path}">` +
  `<link rel="alternate" hreflang="ar" href="${origin}${inLang('ar', path)}">` +
  `<link rel="alternate" hreflang="en" href="${origin}${inLang('en', path)}">` +
  `<link rel="alternate" hreflang="x-default" href="${origin}${inLang('ar', path)}">`

let count = 0
for (const path of routes()) {
  const en = path === '/en' || path.startsWith('/en/')
  const app = await render(path)
  const h1 = text(app.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '')
  const site = en ? 'German Year Guide for GJU students' : 'دليل السنة الألمانية لطلاب GJU'
  const title = path === '/' || path === '/en' ? site : `${h1} | ${site}`
  // Only fonts are preloaded: script preloads would compete with the first
  // paint, and the pre-rendered page is readable before any script runs.
  const head = fontLinks(en ? 'latin' : 'arabic') + seoLinks(path)
  let html = template
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-path="${path}">${app}</div>`)
    .replace('<!--head-->', head)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    // Link previews (WhatsApp, social apps) need absolute addresses.
    .replace('content="/og-image.jpg"', `content="${origin}/og-image.jpg"`)
    .replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="website" /><meta property="og:url" content="${origin}${path}" />`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escape(title)}"`)
  if (en) {
    const description = 'Every GJU German Year host university, region by region: videos, housing links, estimated costs, internships, halal food and travel.'
    html = html
      .replace('<html lang="ar" dir="rtl"', '<html lang="en" dir="ltr"')
      .replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${description}"`)
      .replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${description}"`)
  }
  // regions/bavaria.html is served at /regions/bavaria by Vercel (cleanUrls),
  // Cloudflare Pages, Netlify and `vite preview`.
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  count++
}
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes()
    .map((path) => `  <url><loc>${origin}${path}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
await rm('dist-ssr', { recursive: true, force: true })
console.log(`Pre-rendered ${count} pages.`)

// Service worker: keeps the whole app on the phone after the first visit, so
// it opens instantly and keeps working when the network is slow, offline, or
// blocks the site's address (some Wi-Fi providers filter hosting domains).
const precache = [
  '/',
  '/en',
  '/404.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  ...assets.filter((f) => /\.(js|css|woff2)$/.test(f) && !f.startsWith('videos-') && !f.includes('latin-ext')).map((f) => `/assets/${f}`),
]
const workerSource = await readFile('scripts/sw-template.js', 'utf8')
// A new file list or new worker code gets a fresh cache.
const version = createHash('sha256').update(precache.join() + workerSource).digest('hex').slice(0, 12)
const worker = workerSource.replace('__VERSION__', version).replace('__PRECACHE__', JSON.stringify(precache))
await writeFile(join(dist, 'sw.js'), worker)
console.log(`Service worker ${version}: ${precache.length} files kept for offline use.`)
