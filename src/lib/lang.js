// The visitor's language choice. Both languages share the same paths; English
// is prefixed with /en. index.html redirects to the saved language before the
// page paints.
const KEY = 'gy-lang'

// `path` is the router path without the /en prefix.
export const pathFor = (lang, path) => (lang === 'en' ? (path === '/' ? '/en' : `/en${path}`) : path)

export function switchLang(lang, path) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    // ignore: the link still switches for this visit
  }
  const { search, hash } = window.location
  window.location.assign(pathFor(lang, path) + search + hash)
}
