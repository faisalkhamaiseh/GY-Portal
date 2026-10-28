import { useMemo, useState } from 'react'
import { EstimateNote } from './ui.jsx'
import { BLOCKED_MONTHLY, cityTier, fixedMonthly, lifestyles, rentFor, tiers } from '../data/costs.js'
import { universities } from '../lib/data.js'

const housingTypes = [
  { id: 'dorm', label: 'Dorm', sub: 'Studierendenwerk room, bills included' },
  { id: 'wg', label: 'WG room', sub: 'Private shared flat' },
  { id: 'flat', label: 'Own flat', sub: 'One-room flat, warm rent' },
]

const fixedTotal = fixedMonthly.reduce((s, f) => s + f.amount, 0)
const mid = ([a, b]) => Math.round((a + b) / 2 / 5) * 5
const germanCities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b))

function status(left) {
  if (left >= 100) return { label: 'Covered', tone: 'bg-mint border-forest text-forest', badge: 'bg-forest text-paper' }
  if (left >= 0) return { label: 'Tight', tone: 'bg-amber border-[#9a6a12] text-[#7a5410]', badge: 'bg-[#9a6a12] text-paper' }
  return { label: 'Over budget', tone: 'bg-blush border-rust text-rust-dark', badge: 'bg-rust text-paper' }
}

export function BudgetMatrix({ city }) {
  const rent = rentFor(city)
  return (
    <div className="space-y-6">
      {housingTypes.map((h) => {
        const r = mid(rent[h.id])
        return (
          <div key={h.id}>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold">{h.label}</span>
              <span className="text-sm text-muted">
                €{r} rent · {h.sub}
              </span>
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {Object.entries(lifestyles).map(([id, l]) => {
                const total = r + l.food + l.trips + l.fun + fixedTotal
                const left = BLOCKED_MONTHLY - total
                const s = status(left)
                return (
                  <div key={id} className={`rounded-xl border border-t-4 p-4 ${s.tone}`}>
                    <div className="flex items-center justify-between font-mono text-[10.5px] tracking-wider uppercase">
                      <span>
                        {h.label} · {l.label}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 normal-case ${s.badge}`}>{s.label}</span>
                    </div>
                    <p className="mt-2 font-display text-4xl font-semibold tracking-tight">€{total.toLocaleString('en-US')}</p>
                    <p className="mt-1 text-sm font-semibold">
                      {left >= 0 ? `€${left} left of €${BLOCKED_MONTHLY}` : `€${-left} over €${BLOCKED_MONTHLY}`}
                    </p>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed opacity-75">
                      Rent €{r} · Food €{l.food} · Trips €{l.trips} · Fun €{l.fun} · Fixed €{fixedTotal}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function BudgetPlanner({ initialCity = 'Schmalkalden', lockCity = false }) {
  const [city, setCity] = useState(initialCity)
  const [housing, setHousing] = useState('dorm')
  const [style, setStyle] = useState('typical')
  const rent = rentFor(city)
  const [rentValue, setRentValue] = useState(null)
  const [extra, setExtra] = useState({ food: null, trips: null, fun: null, gym: 0 })

  const l = lifestyles[style]
  const r = rentValue ?? mid(rent[housing])
  const food = extra.food ?? l.food
  const trips = extra.trips ?? l.trips
  const fun = extra.fun ?? l.fun

  const parts = useMemo(
    () => [
      { label: 'Rent', value: r, color: '#1d2420' },
      { label: 'Fixed costs', value: fixedTotal, color: '#1f5b45' },
      { label: 'Food', value: food, color: '#b0472d' },
      { label: 'Trips', value: trips, color: '#d9a43b' },
      { label: 'Fun', value: fun, color: '#7d9db5' },
      { label: 'Gym', value: extra.gym, color: '#9b8bb4' },
    ],
    [r, food, trips, fun, extra.gym],
  )
  const total = parts.reduce((s, p) => s + p.value, 0)
  const left = BLOCKED_MONTHLY - total
  const s = status(left)
  const scaleMax = Math.max(total, BLOCKED_MONTHLY) * 1.05

  const reset = () => {
    setRentValue(null)
    setExtra({ food: null, trips: null, fun: null, gym: 0 })
  }

  const slider = (key, label, value, max, onChange) => (
    <label className="block">
      <span className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-ink-2">€{value}</span>
      </span>
      <input type="range" min={0} max={max} step={5} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[#b0472d]" aria-label={label} />
    </label>
  )

  return (
    <>
    <EstimateNote className="mb-4" />
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card space-y-6 p-5 sm:p-6">
        {!lockCity && (
          <label className="block">
            <span className="text-sm font-medium">City</span>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
                setRentValue(null)
              }}
              className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-2.5"
            >
              {germanCities.map((c) => (
                <option key={c} value={c}>
                  {c} — {tiers[cityTier[c] ?? 4].label}
                </option>
              ))}
            </select>
          </label>
        )}
        <fieldset>
          <legend className="text-sm font-medium">Housing</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {housingTypes.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  setHousing(h.id)
                  setRentValue(null)
                }}
                aria-pressed={housing === h.id}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm ${housing === h.id ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink'}`}
              >
                <span className="block font-semibold">{h.label}</span>
                <span className="block font-mono text-[11px] opacity-70">
                  €{rent[h.id][0]}–{rent[h.id][1]}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-medium">Lifestyle</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {Object.entries(lifestyles).map(([id, x]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setStyle(id)
                  setExtra((e) => ({ ...e, food: null, trips: null, fun: null }))
                }}
                aria-pressed={style === id}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm ${style === id ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink'}`}
              >
                <span className="block font-semibold">{x.label}</span>
                <span className="block text-[11px] leading-snug opacity-70">{x.text}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="space-y-4 border-t border-line pt-5">
          {slider('rent', 'Rent', r, Math.max(rent.flat[1] + 100, 600), setRentValue)}
          {slider('food', 'Food & groceries', food, 500, (v) => setExtra((e) => ({ ...e, food: v })))}
          {slider('trips', 'Trips & travel', trips, 300, (v) => setExtra((e) => ({ ...e, trips: v })))}
          {slider('fun', 'Going out & fun', fun, 300, (v) => setExtra((e) => ({ ...e, fun: v })))}
          {slider('gym', 'Gym & sport', extra.gym, 60, (v) => setExtra((e) => ({ ...e, gym: v })))}
          <button type="button" onClick={reset} className="text-sm font-medium text-link hover:underline">
            Reset to the {l.label.toLowerCase()} defaults
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border border-t-[6px] p-5 sm:p-7 ${s.tone}`} aria-live="polite">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-wider uppercase">
            {city} · {housingTypes.find((h) => h.id === housing).label} · {l.label}
          </p>
          <span className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${s.badge}`}>{s.label}</span>
        </div>
        <p className="mt-4 font-display text-6xl font-semibold tracking-tight sm:text-7xl">€{total.toLocaleString('en-US')}</p>
        <p className="mt-2 text-lg font-semibold">
          {left >= 0 ? `€${left} left of your €${BLOCKED_MONTHLY} monthly payout` : `€${-left} more than your €${BLOCKED_MONTHLY} monthly payout`}
        </p>

        <div className="relative mt-8 h-10 overflow-hidden rounded-lg bg-paper/70">
          <div className="flex h-full">
            {parts
              .filter((p) => p.value > 0)
              .map((p) => (
                <div key={p.label} style={{ width: `${(p.value / scaleMax) * 100}%`, background: p.color }} className="h-full border-r border-paper/60 transition-all" title={`${p.label}: €${p.value}`} />
              ))}
          </div>
          <div className="absolute inset-y-0 border-l-2 border-dashed border-ink" style={{ left: `${(BLOCKED_MONTHLY / scaleMax) * 100}%` }}>
            <span className="absolute -top-0 left-1 font-mono text-[10px] text-ink">€{BLOCKED_MONTHLY}</span>
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink sm:grid-cols-3">
          {parts.map((p) => (
            <li key={p.label} className="flex items-center gap-2">
              <span className="size-3 rounded-sm" style={{ background: p.color }} />
              <span className="flex-1">{p.label}</span>
              <span className="font-mono">€{p.value}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-ink/15 pt-4 text-sm text-ink-2">
          <p className="font-semibold">Fixed costs every month (€{fixedTotal})</p>
          <p className="mt-1 text-[13px] text-muted">{fixedMonthly.map((f) => `${f.name} ~€${f.amount}*`).join(' · ')}</p>
        </div>
      </div>
    </div>
    </>
  )
}
