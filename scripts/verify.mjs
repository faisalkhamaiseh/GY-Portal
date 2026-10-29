// Checks the finished build before it can go live. Vercel runs this as part of
// `npm run build`: if anything is missing or broken, the build fails and the
// previous version of the site stays online.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const dist = 'dist'
const problems = []
const fail = (msg) => problems.push(msg)

for (const file of ['404.html', 'sw.js', 'robots.txt', 'sitemap.xml', 'manifest.webmanifest', 'favicon.svg']) {
  if (!existsSync(join(dist, file))) fail(`missing ${file}`)
}

const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : ''
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1] || '/')
// Far fewer pages than usual means routes went missing.
if (paths.length < 250) fail(`only ${paths.length} pages in the sitemap`)

const exists = new Map()
const fileExists = (path) => {
  if (!exists.has(path)) exists.set(path, existsSync(join(dist, path)) && statSync(join(dist, path)).isFile())
  return exists.get(path)
}

for (const path of paths) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  if (!fileExists(file)) {
    fail(`${path}: no ${file}`)
    continue
  }
  const html = readFileSync(join(dist, file), 'utf8')
  if (!html.includes(`<div id="root" data-path="${path}">`)) fail(`${path}: page content missing`)
  if (!/<h1[^>]*>[\s\S]*?\S[\s\S]*?<\/h1>/.test(html)) fail(`${path}: no heading`)
  if (!/<title>[^<]+<\/title>/.test(html)) fail(`${path}: no title`)
  if (!html.includes('Disclaimer: This portal is an unofficial')) fail(`${path}: disclaimer missing`)
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ')
  const broken = text.match(/\b(undefined|NaN|\[object Object\])\b/)
  if (broken) fail(`${path}: shows "${broken[1]}"`)
  for (const [, ref] of html.matchAll(/(?:src|href)="(\/(?:assets|images|art)\/[^"?#]+)"/g)) {
    if (!fileExists(ref.slice(1))) fail(`${path}: links to missing ${ref}`)
  }
}

const worker = existsSync(join(dist, 'sw.js')) ? readFileSync(join(dist, 'sw.js'), 'utf8') : ''
for (const [, ref] of worker.matchAll(/"(\/assets\/[^"]+)"/g)) {
  if (!fileExists(ref.slice(1))) fail(`sw.js keeps missing ${ref}`)
}

if (problems.length) {
  console.error(`Build check failed (${problems.length}):\n  ${problems.slice(0, 30).join('\n  ')}`)
  process.exit(1)
}
const pages = readdirSync(dist, { recursive: true }).filter((f) => String(f).endsWith('.html')).length
console.log(`Build check passed: ${paths.length} pages in the sitemap, ${pages} HTML files.`)
