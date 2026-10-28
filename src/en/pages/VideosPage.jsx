import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import VideoGrid from '../components/VideoGrid.jsx'
import { regions } from '../data/regions.js'
import { universities, universityById, normalise } from '../lib/data.js'
import useVideos, { mergeVideos } from '../lib/useVideos.js'

const kinds = [
  ['campus', 'Campus tours'],
  ['cities', 'Cities'],
  ['region', 'Regions'],
]

export default function VideosPage() {
  const videos = useVideos()
  const [params] = useSearchParams()
  const [region, setRegion] = useState(() => (regions.some((r) => r.code === params.get('region')) ? params.get('region') : 'all'))
  const [uni, setUni] = useState(() => (universityById[params.get('uni')] ? params.get('uni') : 'all'))
  const [kind, setKind] = useState('campus')
  const [q, setQ] = useState('')

  const unisInRegion = region === 'all' ? universities : universities.filter((u) => u.region === region)

  const list = useMemo(() => {
    if (!videos) return null
    let l
    if (uni !== 'all') {
      const u = universityById[uni]
      l = kind === 'cities' ? videos.cities[u.city] || [] : kind === 'region' ? videos.states[u.region] || [] : videos.universities[uni] || []
    } else if (kind === 'campus') {
      l = mergeVideos(...unisInRegion.map((u) => videos.universities[u.id]))
    } else if (kind === 'cities') {
      l = mergeVideos(...[...new Set(unisInRegion.map((u) => u.city))].map((c) => videos.cities[c]))
    } else {
      l = region === 'all' ? mergeVideos(...Object.values(videos.states)) : videos.states[region] || []
    }
    const n = normalise(q.trim())
    return n ? l.filter((v) => normalise(`${v.title} ${v.channel}`).includes(n)) : l
  }, [videos, uni, kind, region, q, unisInRegion])

  return (
    <div className="wrap pt-12">
      <p className="eyebrow">Video library</p>
      <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">See it before you choose it</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Campus tours, dorm room tours, student vlogs and city guides for every host university and city. Filter by region or university, then press play.
      </p>

      <div className="sticky top-16 z-20 -mx-4 mt-10 border-b border-line bg-paper/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.3fr]">
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value)
              setUni('all')
            }}
            className="rounded-xl border border-line bg-card px-3 py-2.5 text-sm"
            aria-label="Region"
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r.code} value={r.code}>
                {r.name}
              </option>
            ))}
          </select>
          <select value={uni} onChange={(e) => setUni(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2.5 text-sm" aria-label="University">
            <option value="all">All universities</option>
            {unisInRegion.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-card px-3">
            <Search className="size-4 text-muted" aria-hidden />
            <span className="sr-only">Search video titles</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, e.g. room tour" className="w-full bg-transparent py-2.5 text-sm outline-none" />
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {kinds.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setKind(id)}
              aria-pressed={kind === id}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${kind === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs text-muted">{list ? `${list.length} videos` : 'Loading…'}</span>
        </div>
      </div>

      <div className="mt-10">
        <VideoGrid key={`${region}-${uni}-${kind}-${q}`} videos={list} limit={24} emptyQuery={uni !== 'all' ? `${universityById[uni].name} campus tour` : 'study in Germany campus tour'} />
      </div>
    </div>
  )
}
