import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, MapPin, CornerDownLeft, X, Sparkles, Wallet, Home, Moon, Briefcase, Plane, TrainFront, Play,
  CalendarDays, GraduationCap, ListChecks, Siren, Languages, CloudSun, Landmark, Smartphone, HeartPulse, Scale, Bus, Tag, AppWindow, ScanBarcode,
} from 'lucide-react'
import { regionByCode } from '../data/regions.js'
import { smartSearch } from '../lib/search.js'

const icons = { Wallet, Home, Moon, Briefcase, Plane, TrainFront, Play, CalendarDays, GraduationCap, ListChecks, Siren, Languages, CloudSun, MapPin, Landmark, Smartphone, HeartPulse, Scale, Bus, Tag, AppWindow, ScanBarcode }

const examples = ['prices in munich', 'dorm ingolstadt', 'halal food erfurt', 'internship bavaria', 'n26 or sparkasse', 'waste sorting', 'weekend trips']

// Search universities, cities, regions and topics; used inline (hero) and
// as a dialog (header).
export function FinderBox({ autoFocus = false, onPick, size = 'lg' }) {
  const [q, setQ] = useState('')
  const deferred = useDeferredValue(q)
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const { answers, results, corrected } = useMemo(() => smartSearch(deferred), [deferred])
  const items = useMemo(
    () => [...answers.map((a) => ({ kind: 'answer', a, to: a.to })), ...results.map((r) => ({ kind: r.type, r, to: r.type === 'uni' ? `/universities/${r.u.id}` : `/regions/${r.r.slug}` }))],
    [answers, results],
  )

  useEffect(() => setActive(0), [deferred])
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  function go(item) {
    if (!item) return
    navigate(item.to)
    setQ('')
    onPick?.()
  }

  function onKey(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(items[active])
    } else if (e.key === 'Escape' && q) {
      e.stopPropagation()
      setQ('')
    }
  }

  const big = size === 'lg'
  const open = q.trim().length > 0

  return (
    <div className="relative w-full">
      <label className="sr-only" htmlFor={`finder-${size}`}>
        Search a university, city, region or topic
      </label>
      <div
        className={`flex items-center gap-3 rounded-2xl border border-line bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(29,36,32,0.35)] ${big ? 'px-5 py-4' : 'px-4 py-3'}`}
      >
        <Search className="size-5 shrink-0 text-muted" aria-hidden />
        <input
          id={`finder-${size}`}
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          placeholder="Try “prices in munich” or “dorm ingolstadt”"
          className={`w-full bg-transparent outline-none focus-visible:outline-none placeholder:text-muted/70 ${big ? 'text-lg' : 'text-base'}`}
          role="combobox"
          aria-expanded={open}
          aria-controls={`finder-results-${size}`}
          aria-activedescendant={open && items.length ? `finder-${size}-opt-${active}` : undefined}
          autoComplete="off"
          spellCheck="false"
        />
        {q && (
          <button type="button" onClick={() => setQ('')} className="rounded-full p-1 text-muted hover:text-ink" aria-label="Clear search">
            <X className="size-4" />
          </button>
        )}
      </div>

      {open && (
        <div id={`finder-results-${size}`} role="listbox" className="absolute inset-x-0 top-full z-40 mt-2 max-h-[65vh] overflow-auto rounded-2xl border border-line bg-card p-1.5 shadow-2xl">
          {corrected && (
            <p className="flex items-center gap-2 px-3 pt-2 pb-1 text-sm text-muted">
              <Sparkles className="size-4 text-gold" /> Showing results for <strong className="text-ink">{corrected}</strong>
            </p>
          )}
          {items.length === 0 && (
            <div className="px-4 py-5 text-sm text-muted">
              <p>Nothing matches “{q}” yet. Try a city, a university short name, or one of these:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button key={ex} type="button" onMouseDown={(e) => { e.preventDefault(); setQ(ex) }} className="rounded-full border border-line px-3 py-1 text-ink hover:border-ink">
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          )}
          {items.map((item, i) => {
            const isActive = i === active
            const common = {
              id: `finder-${size}-opt-${i}`,
              role: 'option',
              'aria-selected': isActive,
              onMouseEnter: () => setActive(i),
              onMouseDown: (e) => {
                e.preventDefault()
                go(item)
              },
              className: `flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 ${isActive ? 'bg-sand' : ''}`,
            }
            if (item.kind === 'answer') {
              const Icon = icons[item.a.topic?.icon] || Sparkles
              return (
                <div key={item.to + i} {...common}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-rust text-paper">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{item.a.title}</span>
                    <span className="block truncate text-xs text-muted">Go straight there · {item.a.topic?.label}</span>
                  </span>
                  {isActive && <CornerDownLeft className="size-4 shrink-0 text-muted" aria-hidden />}
                </div>
              )
            }
            if (item.kind === 'region') {
              return (
                <div key={item.r.r.code} {...common}>
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink font-mono text-xs text-paper">{item.r.r.code === 'INT' ? 'EU' : item.r.r.code}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{item.r.r.name}</span>
                    <span className="block truncate text-xs text-muted">Region · {item.r.r.tagline}</span>
                  </span>
                  {isActive && <CornerDownLeft className="size-4 shrink-0 text-muted" aria-hidden />}
                </div>
              )
            }
            const u = item.r.u
            return (
              <div key={u.id} {...common}>
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-mint text-forest">
                  <MapPin className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{u.name}</span>
                  <span className="block truncate text-xs text-muted">
                    {u.city} · {u.abroad ? u.countryName : regionByCode[u.region]?.name}
                  </span>
                </span>
                {isActive && <CornerDownLeft className="size-4 shrink-0 text-muted" aria-hidden />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function FinderDialog({ open, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="mx-auto mt-[12vh] w-[min(640px,calc(100%-2rem))] overflow-visible bg-transparent p-0 backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="rise">
          <p className="mb-3 text-center font-mono text-xs tracking-widest text-paper/90 uppercase">Ask anything: a university, a city, prices, dorms, halal food…</p>
          <FinderBox autoFocus onPick={onClose} size="md" />
        </div>
      )}
    </dialog>
  )
}
