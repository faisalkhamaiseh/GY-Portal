import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Home, GraduationCap, Search, Wallet, LayoutGrid, X } from 'lucide-react'
import LangSwitch from './LangSwitch.jsx'

// Phone navigation that behaves like a native app: a bottom tab bar within
// thumb reach, and a "More" sheet that slides up with every tool as an icon.
// Both are hidden from xl up, where the desktop header takes over.

export function TabBar({ t, onSearch, onMore, moreOpen }) {
  const { pathname } = useLocation()
  const tab = 'press flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-bold'
  const link = ({ isActive }) => `${tab} ${isActive && !moreOpen ? 'text-rust' : 'text-muted'}`
  const toolkitActive = !['/', '/universities', '/costs'].some((p) => (p === '/' ? pathname === '/' : pathname.startsWith(p)))
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper pb-[env(safe-area-inset-bottom)] xl:hidden" aria-label={t.tabs}>
      <div className="mx-auto flex max-w-xl items-stretch px-1">
        <NavLink to="/" end className={link}>
          <Home className="size-6" aria-hidden />
          {t.home}
        </NavLink>
        <NavLink to="/universities" className={link}>
          <GraduationCap className="size-6" aria-hidden />
          {t.universities}
        </NavLink>
        <button type="button" onClick={onSearch} className={`${tab} text-ink`}>
          <span className="-mt-5 grid size-12 place-items-center rounded-full bg-ink text-paper shadow-lg ring-4 ring-paper">
            <Search className="size-5" aria-hidden />
          </span>
          {t.search}
        </button>
        <NavLink to="/costs" className={link}>
          <Wallet className="size-6" aria-hidden />
          {t.costs}
        </NavLink>
        <button type="button" onClick={onMore} aria-expanded={moreOpen} className={`${tab} ${moreOpen || toolkitActive ? 'text-rust' : 'text-muted'}`}>
          <LayoutGrid className="size-6" aria-hidden />
          {t.more}
        </button>
      </div>
    </nav>
  )
}

export function MoreSheet({ open, onClose, t, nav, toolkit, lang }) {
  const { pathname } = useLocation()
  useEffect(() => onClose(), [pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!open) return
    const esc = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', esc)
    // Keep the page behind the sheet from scrolling.
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', esc)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label={t.more}>
      <button type="button" className="fade-in absolute inset-0 bg-ink/50" onClick={onClose} aria-label={t.close} />
      <div className="sheet-up absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-[28px] bg-paper px-4 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between">
          <span className="w-10" />
          <span className="h-1.5 w-10 rounded-full bg-line" aria-hidden />
          <button type="button" onClick={onClose} className="press grid size-10 place-items-center rounded-full bg-sand" aria-label={t.close}>
            <X className="size-5" />
          </button>
        </div>

        <p className="mt-3 text-sm font-bold text-muted">{t.toolkit}</p>
        <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-4">
          {toolkit.map((x) => (
            <Link key={x.to} to={x.to} className="press flex flex-col items-center gap-1.5 text-center">
              <span className={`grid size-14 place-items-center rounded-2xl ${pathname.startsWith(x.to) ? 'bg-ink text-paper' : 'bg-mint text-forest'}`}>
                <x.icon className="size-6" aria-hidden />
              </span>
              <span className="text-[12px] leading-tight font-bold">{x.label}</span>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-sm font-bold text-muted">{t.explore}</p>
        <div className="mt-2 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `press flex min-h-13 items-center px-4 font-bold ${isActive ? 'text-rust' : ''}`}>
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-bold text-muted">{t.language}</span>
          <LangSwitch to={lang === 'en' ? 'ar' : 'en'} />
        </div>
      </div>
    </div>
  )
}

// The home screen's app grid on phones: every tool one tap away.
export function QuickActions({ title, items }) {
  return (
    <section className="wrap pt-6 lg:hidden" aria-label={title}>
      <p className="text-sm font-bold text-muted">{title}</p>
      <div className="mt-3 grid grid-cols-4 gap-x-2 gap-y-4">
        {items.map((x) => (
          <Link key={x.to} to={x.to} className="press flex flex-col items-center gap-1.5 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-card text-forest shadow-sm ring-1 ring-line">
              <x.icon className="size-6" aria-hidden />
            </span>
            <span className="text-[12px] leading-tight font-bold">{x.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
