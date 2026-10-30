import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import UniversityCard from '../components/UniversityCard.jsx'
import { universities, searchUniversities, levelRank, coverVideoId } from '../lib/data.js'
import { regions } from '../data/regions.js'
import { rentFor } from '../data/costs.js'
import { schools, majorById, offersMajor } from '../lib/majors.js'
import useVideos from '../lib/useVideos.js'

const levels = [
  ['any', 'الكل'],
  ['none', 'بدون B1/B2'],
  ['B1', 'حتى B1'],
  ['B2', 'حتى B2'],
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
    if (sort === 'city') l = [...l].sort((a, b) => a.city.localeCompare(b.city, 'de'))
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
        <p className="text-sm font-bold text-muted">المنطقة</p>
        <select value={region} onChange={(e) => set('region', e.target.value, 'all')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5">
          <option value="all">كل المناطق ({universities.length})</option>
          {regions.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name} ({universities.filter((u) => u.region === r.code).length})
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm font-bold text-muted">تخصصك</p>
        <select value={major} onChange={(e) => set('major', e.target.value, 'any')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5 text-sm">
          <option value="any">أي تخصص</option>
          {schools.map((s) => (
            <optgroup key={s.id} label={s.ar}>
              {s.majors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.ar}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-bold text-muted">امتحان الألمانية المطلوب</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {levels.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => set('level', id, 'any')}
              aria-pressed={level === id}
              className={`rounded-xl border px-3 py-2 font-bold ${level === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="text-sm font-bold text-muted">شروط أخرى</legend>
        {[
          ['gpa', noGpa, 'بدون حد أدنى إضافي للمعدل'],
          ['fees', noFee, 'بدون رسوم دراسية إضافية'],
        ].map(([key, on, label]) => (
          <label key={key} className="mt-2 flex cursor-pointer items-center gap-3 font-semibold">
            <input type="checkbox" checked={on} onChange={(e) => set(key, e.target.checked ? 'none' : false)} className="size-4 accent-[#1f5b45]" />
            {label}
          </label>
        ))}
      </fieldset>
      <div>
        <p className="text-sm font-bold text-muted">الترتيب</p>
        <select value={sort} onChange={(e) => set('sort', e.target.value, 'name')} className="mt-2 w-full rounded-xl border border-line bg-card px-3 py-2.5">
          <option value="name">الاسم</option>
          <option value="city">المدينة</option>
          <option value="rent">الأرخص إيجاراً أولاً</option>
        </select>
      </div>
      {active && (
        <button type="button" onClick={clear} className="font-bold text-link hover:underline">
          مسح كل الفلاتر
        </button>
      )}
    </div>
  )

  return (
    <div className="wrap pt-6 lg:pt-12">
      <p className="eyebrow">الجامعات المضيفة</p>
      <h1 className="h-display mt-2 text-4xl sm:text-6xl">قارن كل الأماكن الـ{universities.length}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        فلتر حسب المنطقة ومستوى الألمانية والمعدل والرسوم، بنفس شروط قائمة الجامعات المضيفة من GJU. كل بطاقة تفتح دليلاً كاملاً بالفيديوهات والأسعار والسكن.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filters}</div>
        </aside>

        <div>
          <div className="flex gap-3">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3">
              <Search className="size-5 text-muted" aria-hidden />
              <span className="sr-only">ابحث في الجامعات</span>
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  set('q', e.target.value, '')
                }}
                placeholder="ابحث بالاسم أو المدينة أو المنطقة"
                className="w-full bg-transparent font-semibold outline-none focus-visible:outline-none"
                dir="auto"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => {
                    setQ('')
                    set('q', '', '')
                  }}
                  aria-label="مسح البحث"
                >
                  <X className="size-4 text-muted" />
                </button>
              )}
            </label>
            <button type="button" onClick={() => setFiltersOpen((o) => !o)} className="btn-ghost lg:hidden" aria-expanded={filtersOpen}>
              <SlidersHorizontal className="size-4" /> الفلاتر
            </button>
          </div>
          {filtersOpen && <div className="card mt-4 p-5 lg:hidden">{filters}</div>}

          <p className="mt-6 mb-5 text-sm font-bold text-muted">{list.length} جامعة</p>
          {major !== 'any' && (
            <p className="-mt-2 mb-5 text-sm text-ink-2">
              الجامعات التي ترسل لها GJU طلاب <strong>{majorById[major].ar}</strong> حسب قائمة الجامعات المضيفة في MyGJU.
              {maybe.length > 0 && (
                <>
                  {' '}
                  قائمتنا غير مكتملة لـ{' '}
                  {maybe.map((u, i) => (
                    <span key={u.id}>
                      {i > 0 && '، '}
                      <Link to={`/universities/${u.id}`} className="link">
                        {u.name}
                      </Link>
                    </span>
                  ))}
                  ؛ تأكد منها في MyGJU.
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
              <p className="text-2xl font-extrabold">لا توجد جامعات تطابق هذه الفلاتر</p>
              <p className="mt-2 text-muted">جرّب تهجئة أخرى للمدينة أو أزل أحد الفلاتر.</p>
              <button type="button" onClick={clear} className="btn-primary mt-6">
                مسح الفلاتر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
