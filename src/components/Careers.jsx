import { useState } from 'react'
import { ArrowUpRight, BadgeCheck, CalendarDays, MapPin } from 'lucide-react'
import { companies, careerFairs, fields, jobSearch, fairSearch } from '../data/careers.js'
import { normalise } from '../lib/data.js'

function FieldTag({ field }) {
  const f = fields[field]
  return <span className={`chip ${f.tone}`}>{f.label}</span>
}

const cityLabel = (city) => city.replace(/\(near /g, '(قرب ')

// شركات منطقة، مع فلترة حسب المجال. مع `city` تظهر الشركات الأقرب أولاً.
export function CompanyList({ code, city, limit }) {
  const [field, setField] = useState('all')
  const list = companies[code] || []
  const near = (c) => (city && normalise(c.city).includes(normalise(city)) ? 0 : 1)
  const sorted = [...list].sort((a, b) => Number(b.gju) - Number(a.gju) || near(a) - near(b))
  const shown = sorted.filter((c) => field === 'all' || c.field === field).slice(0, limit)

  if (!list.length) return null
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[['all', 'كل المجالات'], ...Object.entries(fields).map(([k, f]) => [k, f.label])].map(([id, label]) => {
          const n = id === 'all' ? list.length : list.filter((c) => c.field === id).length
          if (!n) return null
          return (
            <button
              key={id}
              type="button"
              onClick={() => setField(id)}
              aria-pressed={field === id}
              className={`rounded-full border px-4 py-1.5 font-bold ${field === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
            >
              {label} <span className="num text-sm opacity-60">{n}</span>
            </button>
          )
        })}
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <a
            key={c.name}
            href={jobSearch(c.name, c.city)}
            target="_blank"
            rel="noopener noreferrer"
            className={`group card flex flex-col p-5 transition-colors hover:border-ink ${c.gju ? 'border-forest ring-1 ring-forest' : ''}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p dir="ltr" className="text-start text-lg leading-snug font-extrabold">
                {c.name}
              </p>
              <ArrowUpRight className="size-4 shrink-0 text-forest" aria-hidden />
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <MapPin className="size-3" /> <span dir="ltr">{cityLabel(c.city)}</span>
            </p>
            <p className="mt-2 leading-relaxed text-ink-2">{c.text}</p>
            <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
              <FieldTag field={c.field} />
              {c.gju && (
                <span className="chip bg-forest text-paper">
                  <BadgeCheck className="size-3" /> استضافت طلاب GJU
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export function FairList({ code }) {
  const list = [...(careerFairs[code] || []), ...careerFairs.national]
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {list.map((f) => (
        <li key={f.name}>
          <a href={fairSearch(f)} target="_blank" rel="noopener noreferrer" className="group card flex gap-4 p-4 transition-colors hover:border-ink">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush text-rust">
              <CalendarDays className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-bold text-rust">{f.when}</span>
              <span className="mt-0.5 block font-extrabold group-hover:text-link">{f.name}</span>
              <span className="block text-sm text-muted">{f.where}</span>
              {f.text && <span className="mt-1 block text-ink-2">{f.text}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
