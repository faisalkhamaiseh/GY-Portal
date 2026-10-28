// Pre-renders every route to static HTML after `vite build`, so phones paint
// the page before any JavaScript runs; React then hydrates it.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'

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

// A shell without content for paths that are not pre-rendered (unknown URLs).
await writeFile(join(dist, 'spa.html'), shell.replace('<!--head-->', '').replace('<!--app-->', ''))

let count = 0
for (const path of routes()) {
  const en = path === '/en' || path.startsWith('/en/')
  const app = await render(path)
  const h1 = text(app.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '')
  const site = en ? 'German Year Guide for GJU students' : 'دليل السنة الألمانية لطلاب GJU'
  const title = path === '/' || path === '/en' ? site : `${h1} | ${site}`
  // Only fonts are preloaded: script preloads would compete with the first
  // paint, and the pre-rendered page is readable before any script runs.
  const head = fontLinks(en ? 'latin' : 'arabic')
  let html = template
    .replace('<div id="root"><!--app--></div>', `<div id="root" data-path="${path}">${app}</div>`)
    .replace('<!--head-->', head)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
  if (en) {
    html = html
      .replace('<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">')
      .replace(/<meta name="description" content="[^"]*"/, '<meta name="description" content="Every GJU German Year host university, region by region: videos, housing links, estimated costs, internships, halal food and travel."')
  }
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
  count++
}
await rm('dist-ssr', { recursive: true, force: true })
console.log(`Pre-rendered ${count} pages.`)
