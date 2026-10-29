import { useMemo, useState } from 'react'
import { EstimateNote } from './ui.jsx'
import { BLOCKED_MONTHLY, cityTier, fixedMonthly, fixedTotal, lifestyles, rentFor, tiers } from '../data/costs.js'
import { universities } from '../lib/data.js'

const housingTypes = [
  { id: 'dorm', label: 'سكن طلابي', sub: 'غرفة Studierendenwerk شاملة الفواتير' },
  { id: 'wg', label: 'غرفة WG', sub: 'شقة مشتركة خاصة' },
  { id: 'flat', label: 'شقة خاصة', sub: 'شقة غرفة واحدة، إيجار شامل' },
]

const mid = ([a, b]) => Math.round((a + b) / 2 / 5) * 5
const germanCities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'de'))

function status(left) {
  if (left >= 100) return { label: 'مغطّى', tone: 'bg-mint border-forest text-forest', badge: 'bg-forest text-paper' }
  if (left >= 0) return { label: 'ضيّق', tone: 'bg-amber border-[#9a6a12] text-[#7a5410]', badge: 'bg-[#9a6a12] text-paper' }
  return { label: 'فوق الميزانية', tone: 'bg-blush border-rust text-rust-dark', badge: 'bg-rust text-paper' }
}

const euro = (n) => <span dir="ltr" className="num">€{n.toLocaleString('en-US')}</span>

export function BudgetMatrix({ city }) {
  const rent = rentFor(city)
  return (
    <div className="space-y-6">
      {housingTypes.map((h) => {
        const r = mid(rent[h.id])
        return (
          <div key={h.id}>
            <p className="flex flex-wrap items-baseline gap-3">
              <span className="text-xl font-extrabold">{h.label}</span>
              <span className="text-sm text-muted">
                إيجار {euro(r)} · {h.sub}
              </span>
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {Object.entries(lifestyles).map(([id, l]) => {
                const total = r + l.food + l.trips + l.fun + fixedTotal
                const left = BLOCKED_MONTHLY - total
                const s = status(left)
                return (
                  <div key={id} className={`rounded-xl border border-t-4 p-4 ${s.tone}`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>
                        {h.label} · {l.label}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 ${s.badge}`}>{s.label}</span>
                    </div>
                    <p className="mt-2 text-4xl font-extrabold">{euro(total)}</p>
                    <p className="mt-1 font-bold">
                      {left >= 0 ? (
                        <>
                          يتبقى {euro(left)} من {euro(BLOCKED_MONTHLY)}
                        </>
                      ) : (
                        <>
                          تتجاوز {euro(BLOCKED_MONTHLY)} بـ{euro(-left)}
                        </>
                      )}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed opacity-80">
                      إيجار {r} · أكل {l.food} · رحلات {l.trips} · ترفيه {l.fun} · ثابتة {fixedTotal}
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
      { label: 'الإيجار', value: r, color: '#1d2420' },
      { label: 'المصاريف الثابتة', value: fixedTotal, color: '#1f5b45' },
      { label: 'الأكل', value: food, color: '#b0472d' },
      { label: 'الرحلات', value: trips, color: '#d9a43b' },
      { label: 'الترفيه', value: fun, color: '#7d9db5' },
      { label: 'النادي الرياضي', value: extra.gym, color: '#9b8bb4' },
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

  const slider = (label, value, max, onChange) => (
    <label className="block">
      <span className="flex justify-between">
        <span className="font-semibold">{label}</span>
        <span className="font-bold text-ink-2">{euro(value)}</span>
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
            <span className="font-semibold">المدينة</span>
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
          <legend className="font-semibold">السكن</legend>
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
                className={`rounded-xl border px-3 py-2.5 text-start ${housing === h.id ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink'}`}
              >
                <span className="block font-bold">{h.label}</span>
                <span dir="ltr" className="num block text-xs opacity-70">
                  €{rent[h.id][0]}–{rent[h.id][1]}
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold">نمط الحياة</legend>
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
                className={`rounded-xl border px-3 py-2.5 text-start ${style === id ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink'}`}
              >
                <span className="block font-bold">{x.label}</span>
                <span className="block text-xs leading-snug opacity-70">{x.text}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <div className="space-y-4 border-t border-line pt-5">
          {slider('الإيجار', r, Math.max(rent.flat[1] + 100, 600), setRentValue)}
          {slider('الأكل والبقالة', food, 500, (v) => setExtra((e) => ({ ...e, food: v })))}
          {slider('الرحلات والسفر', trips, 300, (v) => setExtra((e) => ({ ...e, trips: v })))}
          {slider('الخروج والترفيه', fun, 300, (v) => setExtra((e) => ({ ...e, fun: v })))}
          {slider('النادي الرياضي', extra.gym, 60, (v) => setExtra((e) => ({ ...e, gym: v })))}
          <button type="button" onClick={reset} className="text-sm font-bold text-link hover:underline">
            إرجاع لقيم نمط "{l.label}"
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border border-t-[6px] p-5 sm:p-7 ${s.tone}`} aria-live="polite">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            <span dir="ltr">{city}</span> · {housingTypes.find((h) => h.id === housing).label} · {l.label}
          </p>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.badge}`}>{s.label}</span>
        </div>
        <p className="mt-4 text-6xl font-extrabold sm:text-7xl">{euro(total)}</p>
        <p className="mt-2 text-lg font-bold">
          {left >= 0 ? (
            <>
              يتبقى {euro(left)} من مصروفك الشهري {euro(BLOCKED_MONTHLY)}
            </>
          ) : (
            <>
              تتجاوز مصروفك الشهري {euro(BLOCKED_MONTHLY)} بـ{euro(-left)}
            </>
          )}
        </p>

        <div dir="ltr" className="relative mt-8 h-10 overflow-hidden rounded-lg bg-paper/70">
          <div className="flex h-full">
            {parts
              .filter((p) => p.value > 0)
              .map((p) => (
                <div key={p.label} style={{ width: `${(p.value / scaleMax) * 100}%`, background: p.color }} className="h-full border-r border-paper/60 transition-all" title={`${p.label}: €${p.value}`} />
              ))}
          </div>
          <div className="absolute inset-y-0 border-l-2 border-dashed border-ink" style={{ left: `${(BLOCKED_MONTHLY / scaleMax) * 100}%` }}>
            <span className="num absolute top-0 left-1 text-[10px] font-bold text-ink">€{BLOCKED_MONTHLY}</span>
          </div>
        </div>
        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink sm:grid-cols-3">
          {parts.map((p) => (
            <li key={p.label} className="flex items-center gap-2">
              <span className="size-3 rounded-sm" style={{ background: p.color }} />
              <span className="flex-1">{p.label}</span>
              <span className="font-bold">{euro(p.value)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-ink/15 pt-4 text-ink-2">
          <p className="font-bold">المصاريف الثابتة كل شهر ({euro(fixedTotal)})</p>
          <p className="mt-1 text-sm text-muted">{fixedMonthly.map((f) => (f.exact ? `${f.name} ${f.amount.toFixed(2)} يورو` : `${f.name} ~${f.amount} يورو*`)).join(' · ')}</p>
        </div>
      </div>
    </div>
    </>
  )
}
