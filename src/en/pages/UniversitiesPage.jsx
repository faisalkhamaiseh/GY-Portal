import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import UniversityCard from '../components/UniversityCard.jsx'
import { universities, searchUniversities, levelRank, coverVideoId } from '../lib/data.js'
import { regions } from '../data/regions.js'
import { rentFor } from '../data/costs.js'
import { schools, majorById, offersMajor } from '../../lib/majors.js'
import useVideos from '../lib/useVideos.js'

const levels = [
  ['any', 'Any'],
  ['none', 'No B1/B2 listed'],
  ['B1', 'Up to B1'],
  ['B2', 'Up to B2'],
]

export default function UniversitiesPage() {
  const videos = useVideos()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const region = params.get('region') ?? 'all'
  const level = params.get('level') ?? 'any'
  const noGpa = params.get('gpa') === 'none'
  const noFee = params.get('fees') === 'none'
  const sort = params.get('sort') ?? 'name'
  const major = majorById[params.get('major')] ? params.get('major') : 'any'
  const [filtersOpen, setFiltersOpen] = useState(false)

  const set = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (value === fallback || value === false) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    let l = searchUniversities(q)
    if (region !== 'all') l = l.filter((u) => u.region === region)
    if (level === 'none') l = l.filter((u) => !u.german && !u.germanNote)
    if (level === 'B1') l = l.filter((u) => levelRank(u.german) <= 1 && !u.germanNote)
    if (level === 'B2') l = l.filter((u) => levelRank(u.german) <= 2)
    if (noGpa) l = l.filter((u) => !u.gpa)
    if (noFee) l = l.filter((u) => !u.fee)
    if (major !== 'any') l = l.filter((u) => offersMajor(u.id, major))
    if (sort === 'rent') l = [...l].sort((a, b) => (a.abroad ? 9999 : rentFor(a.city).wg[0]) - (b.abroad ? 9999 : rentFor(b.city).wg[0]))
    if (sort === 'city') l = [...l].sort((a, b) => a.city.localeCompare(b.city))
    return l
  }, [q, region, level, noGpa, noFee, sort, major])
  // Universities whose list of majors we only have in part.
  const maybe = major === 'any' ? [] : universities.filter((u) => !u.abroad && offersMajor(u.id, major) === null)

  const active = region !== 'all' || level !== 'any' || noGpa || noFee || major !== 'any'
  const clear = () => {
    setQ('')
    setParams({}, { replace: true })
  }

  const filters = (
    <div className="space-y-7">
      <div>
        <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Region</p>
        <select value={region} onChange={(e) => set('region', e.target.value, 'all')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5 text-sm">
          <option value="all">All regions ({universities.length})</option>
          {regions.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name} ({universities.filter((u) => u.region === r.code).length})
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Your major</p>
        <select value={major} onChange={(e) => set('major', e.target.value, 'any')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5 text-sm">
          <option value="any">Any major</option>
          {schools.map((s) => (
            <optgroup key={s.id} label={s.en}>
              {s.majors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.en}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="font-mono text-[11px] tracking-wider text-muted uppercase">German exam required</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {levels.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => set('level', id, 'any')}
              aria-pressed={level === id}
              className={`rounded-xl border px-3 py-2 text-sm ${level === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="font-mono text-[11px] tracking-wider text-muted uppercase">Other conditions</legend>
        {[
          ['gpa', noGpa, 'No extra GPA minimum'],
          ['fees', noFee, 'No extra tuition fees'],
        ].map(([key, on, label]) => (
          <label key={key} className="mt-2 flex cursor-pointer items-center gap-3 text-sm">
            <input type="checkbox" checked={on} onChange={(e) => set(key, e.target.checked ? 'none' : false)} className="size-4 accent-[#1f5b45]" />
            {label}
          </label>
        ))}
      </fieldset>
      <div>
        <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Sort</p>
        <select value={sort} onChange={(e) => set('sort', e.target.value, 'name')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5 text-sm">
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="rent">Cheapest rent first</option>
        </select>
      </div>
      {active && (
        <button type="button" onClick={clear} className="text-sm font-semibold text-link hover:underline">
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="wrap pt-6 lg:pt-12">
      <p className="eyebrow">Host universities</p>
      <h1 className="h-display mt-2 text-4xl sm:text-6xl">All {universities.length} places, compared</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Filter by region, German level, GPA and fees, the same conditions as the GJU host-university list. Every card opens a full guide with videos, prices and housing.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="flex gap-3">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3">
              <Search className="size-5 text-muted" aria-hidden />
              <span className="sr-only">Search universities</span>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  set('q', e.target.value, '')
                }}
                placeholder="Search by name, city or region"
                className="w-full bg-transparent outline-none"
              />
              {q && (
                <button type="button" onClick={() => { setQ(''); set('q', '', '') }} aria-label="Clear search">
                  <X className="size-4 text-muted" />
                </button>
              )}
            </label>
            <button type="button" onClick={() => setFiltersOpen((o) => !o)} className="btn-ghost lg:hidden" aria-expanded={filtersOpen}>
              <SlidersHorizontal className="size-4" /> Filters
            </button>
          </div>
          {filtersOpen && <div className="card mt-4 p-5 lg:hidden">{filters}</div>}

          <p className="mt-6 mb-5 font-mono text-xs text-muted">
            {list.length} {list.length === 1 ? 'university' : 'universities'}
          </p>
          {major !== 'any' && (
            <p className="-mt-2 mb-5 text-sm text-ink-2">
              Universities GJU sends <strong>{majorById[major].en}</strong> students to, from the MyGJU host-university list.
              {maybe.length > 0 && (
                <>
                  {' '}
                  Our list is incomplete for{' '}
                  {maybe.map((u, i) => (
                    <span key={u.id}>
                      {i > 0 && ', '}
                      <Link to={`/universities/${u.id}`} className="link">
                        {u.name}
                      </Link>
                    </span>
                  ))}
                  ; check MyGJU for those.
                </>
              )}
            </p>
          )}
          {list.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {list.map((u) => (
                <UniversityCard key={u.id} u={u} videoId={coverVideoId(videos, u.id)} />
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center">
              <p className="font-display text-2xl font-semibold">No universities match these filters</p>
              <p className="mt-2 text-muted">Try a different city spelling or remove a filter.</p>
              <button type="button" onClick={clear} className="btn-primary mt-6">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
