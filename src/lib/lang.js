// The visitor's language choice. Both languages share the same paths; English
// is prefixed with /en.
const KEY = 'gy-lang'

export function preferredLang() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

// The current page's path in the given language.
export function pathFor(lang, pathname = window.location.pathname) {
  const bare = pathname.replace(/^\/en(?=\/|$)/, '') || '/'
  return lang === 'en' ? (bare === '/' ? '/en' : `/en${bare}`) : bare
}

export function switchLang(lang) {
  try {
    localStorage.setItem(KEY, lang)
  } catch {
    // ignore: the link still switches for this visit
  }
  const { search, hash } = window.location
  window.location.assign(pathFor(lang) + search + hash)
}
