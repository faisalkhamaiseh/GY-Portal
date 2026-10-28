import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Search, X, MapPinned, Scale, Columns3, Bus, AppWindow, Play, ListChecks, ScanBarcode } from 'lucide-react'
import LangSwitch from '../../components/LangSwitch.jsx'
import { FinderDialog } from './UniversityFinder.jsx'

const nav = [
  { to: '/regions', label: 'Regions' },
  { to: '/universities', label: 'Universities' },
  { to: '/internships', label: 'Internships' },
  { to: '/costs', label: 'Costs' },
  { to: '/housing', label: 'Housing' },
]

export const toolkit = [
  { to: '/survival-map', label: 'Survival map', text: 'Halal food, Deutschlandticket, airports', icon: MapPinned },
  { to: '/rules', label: 'Hidden rules', text: 'Torrents, waste sorting, quiet hours', icon: Scale },
  { to: '/compare', label: 'Comparisons', text: 'Banks, mobile plans, health insurance', icon: Columns3 },
  { to: '/travel', label: 'Budget travel', text: 'Border trips and cheap weekends', icon: Bus },
  { to: '/apps', label: 'App directory', text: 'Apps to install before you fly', icon: AppWindow },
  { to: '/ingredients', label: 'Ingredient guide', text: 'E-numbers, gelatine, hidden alcohol', icon: ScanBarcode },
  { to: '/videos', label: 'Video library', text: 'Campus and city tours', icon: Play },
  { to: '/guide', label: 'Survival guide', text: 'Checklist, phrasebook, emergencies', icon: ListChecks },
]

export function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="German Year Guide home">
      <span className="flex h-8 w-7 flex-col justify-center gap-[3px]" aria-hidden>
        <span className={`h-[7px] rounded-sm ${light ? 'bg-paper' : 'bg-ink'}`} />
        <span className="h-[7px] rounded-sm bg-rust" />
        <span className="h-[7px] rounded-sm bg-gold" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-semibold tracking-tight ${light ? 'text-paper' : 'text-ink'}`}>German Year</span>
        <span className={`block font-mono text-[9.5px] tracking-[0.18em] uppercase ${light ? 'text-paper/60' : 'text-muted'}`}>Guide for GJU students</span>
      </span>
    </Link>
  )
}

function ToolkitMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { pathname } = useLocation()
  const active = toolkit.some((t) => pathname.startsWith(t.to))

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${active ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sand'}`}
      >
        Student toolkit <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="rise absolute top-full right-0 mt-2 grid w-[560px] grid-cols-2 gap-1 rounded-2xl border border-line bg-card p-2 shadow-2xl">
          {toolkit.map((t) => (
            <Link key={t.to} to={t.to} className="flex gap-3 rounded-xl p-3 hover:bg-sand">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-mint text-forest">
                <t.icon className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{t.label}</span>
                <span className="block text-xs text-muted">{t.text}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [finder, setFinder] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenu(false), [pathname])
  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !/input|textarea|select/i.test(e.target.tagName))) {
        e.preventDefault()
        setFinder(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `rounded-full px-3 py-2 text-sm font-medium transition-colors ${isActive ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sand'}`}
            >
              {n.label}
            </NavLink>
          ))}
          <ToolkitMenu />
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch to="ar" />
          <button
            type="button"
            onClick={() => setFinder(true)}
            className="flex items-center gap-2 rounded-full border border-line bg-card py-2 pr-2 pl-3.5 text-sm text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden sm:inline">Search anything</span>
            <kbd className="hidden rounded-md border border-line bg-paper px-1.5 py-0.5 font-mono text-[10px] sm:inline">/</kbd>
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-card xl:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-label={menu ? 'Close menu' : 'Open menu'}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-paper xl:hidden" aria-label="Mobile">
          <div className="wrap py-4">
            <div className="grid grid-cols-2 gap-2">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) => `rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? 'bg-ink text-paper' : 'border border-line bg-card text-ink'}`}
                >
                  {n.label}
                </NavLink>
              ))}
            </div>
            <p className="mt-5 mb-2 font-mono text-[11px] tracking-wider text-muted uppercase">Student toolkit</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {toolkit.map((t) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive ? 'bg-ink text-paper' : 'border border-line bg-card text-ink'}`}
                >
                  <t.icon className="size-4 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold">{t.label}</span>
                    <span className="block text-xs opacity-70">{t.text}</span>
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      )}
      <FinderDialog open={finder} onClose={() => setFinder(false)} />
    </header>
  )
}
