import { Languages } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { pathFor, switchLang } from '../lib/lang.js'

// Switches between Arabic and English on the same page.
export default function LangSwitch({ to }) {
  const { pathname } = useLocation()
  const label = to === 'en' ? 'English' : 'العربية'
  return (
    <a
      href={pathFor(to, pathname)}
      onClick={(e) => {
        e.preventDefault()
        switchLang(to, pathname)
      }}
      lang={to}
      hrefLang={to}
      className="flex h-10 items-center gap-1.5 rounded-full border border-line bg-card px-3 text-sm font-bold text-ink transition-colors hover:border-ink"
      aria-label={to === 'en' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <Languages className="size-4" aria-hidden />
      {label}
    </a>
  )
}
