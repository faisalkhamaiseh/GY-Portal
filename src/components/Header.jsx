import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Search, X, MapPinned, Scale, Columns3, Bus, AppWindow, Play, ListChecks, ScanBarcode } from 'lucide-react'
import LangSwitch from './LangSwitch.jsx'
import { FinderDialog } from './UniversityFinder.jsx'

const nav = [
  { to: '/regions', label: 'المناطق' },
  { to: '/universities', label: 'الجامعات' },
  { to: '/internships', label: 'التدريب العملي' },
  { to: '/costs', label: 'التكاليف' },
  { to: '/housing', label: 'السكن' },
]

export const toolkit = [
  { to: '/survival-map', label: 'خريطة البقاء', text: 'طعام حلال، تذكرة ألمانيا، المطارات', icon: MapPinned },
  { to: '/ingredients', label: 'دليل المكونات', text: 'أرقام E والجيلاتين والكحول المخفي', icon: ScanBarcode },
  { to: '/rules', label: 'القوانين الخفية', text: 'التورنت وفرز النفايات وساعات الهدوء', icon: Scale },
  { to: '/compare', label: 'المقارنات', text: 'البنوك وباقات الهاتف والتأمين الصحي', icon: Columns3 },
  { to: '/travel', label: 'السفر الاقتصادي', text: 'رحلات الحدود ونهاية أسبوع تحت 50 يورو', icon: Bus },
  { to: '/apps', label: 'دليل التطبيقات', text: 'تطبيقات حمّلها قبل السفر', icon: AppWindow },
  { to: '/videos', label: 'مكتبة الفيديو', text: 'جولات الحرم والمدن', icon: Play },
  { to: '/guide', label: 'دليل البقاء', text: 'قائمة المهام، العبارات، الطوارئ', icon: ListChecks },
]

export function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="الصفحة الرئيسية لدليل السنة الألمانية">
      <span className="flex h-8 w-7 flex-col justify-center gap-[3px]" aria-hidden>
        <span className={`h-[7px] rounded-sm ${light ? 'bg-paper' : 'bg-ink'}`} />
        <span className="h-[7px] rounded-sm bg-rust" />
        <span className="h-[7px] rounded-sm bg-gold" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold ${light ? 'text-paper' : 'text-ink'}`}>السنة الألمانية</span>
        <span className={`block text-[11px] font-semibold ${light ? 'text-paper/60' : 'text-muted'}`}>دليل طلاب GJU</span>
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
        className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-bold transition-colors ${active ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sand'}`}
      >
        أدوات الطالب <ChevronDown className={`size-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="rise absolute top-full end-0 mt-2 grid w-[580px] grid-cols-2 gap-1 rounded-2xl border border-line bg-card p-2 shadow-2xl">
          {toolkit.map((t) => (
            <Link key={t.to} to={t.to} className="flex gap-3 rounded-xl p-3 hover:bg-sand">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-mint text-forest">
                <t.icon className="size-5" />
              </span>
              <span>
                <span className="block font-bold">{t.label}</span>
                <span className="block text-sm text-muted">{t.text}</span>
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
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="القائمة الرئيسية">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `rounded-full px-3.5 py-2 text-[15px] font-bold transition-colors ${isActive ? 'bg-ink text-paper' : 'text-ink-2 hover:bg-sand'}`}
            >
              {n.label}
            </NavLink>
          ))}
          <ToolkitMenu />
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch to="en" />
          <button
            type="button"
            onClick={() => setFinder(true)}
            className="flex items-center gap-2 rounded-full border border-line bg-card py-2 ps-3.5 pe-2 text-sm font-semibold text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden sm:inline">ابحث عن أي شيء</span>
            <kbd className="hidden rounded-md border border-line bg-paper px-1.5 py-0.5 text-[10px] sm:inline">/</kbd>
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-card xl:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-label={menu ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {menu && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-paper xl:hidden" aria-label="قائمة الهاتف">
          <div className="wrap py-4">
            <div className="grid grid-cols-2 gap-2">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => `rounded-xl px-4 py-3 font-bold ${isActive ? 'bg-ink text-paper' : 'border border-line bg-card text-ink'}`}>
                  {n.label}
                </NavLink>
              ))}
            </div>
            <p className="mt-5 mb-2 text-sm font-bold text-muted">أدوات الطالب</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {toolkit.map((t) => (
                <NavLink key={t.to} to={t.to} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 ${isActive ? 'bg-ink text-paper' : 'border border-line bg-card text-ink'}`}>
                  <t.icon className="size-5 shrink-0" />
                  <span>
                    <span className="block font-bold">{t.label}</span>
                    <span className="block text-sm opacity-70">{t.text}</span>
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
