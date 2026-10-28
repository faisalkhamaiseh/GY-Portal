import { useState } from 'react'
import { ExternalLink, MapPinned, Plane } from 'lucide-react'
import { foodLayers, mapEmbed, mapLink, airports, flightSearch } from '../data/travel.js'

// Halal food and mosque finder for one city, using a live Google Maps search.
// The map only loads when the student asks for it, so pages stay fast.
export function HalalMap({ cities, initialCity }) {
  const [city, setCity] = useState(initialCity ?? cities[0])
  const [layer, setLayer] = useState(foodLayers[0].id)
  const [loaded, setLoaded] = useState(false)
  const q = foodLayers.find((l) => l.id === layer).query(city)

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          {cities.length > 1 ? (
            <label className="flex items-center gap-2 text-sm">
              <span className="font-medium">City</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-line bg-paper px-3 py-2">
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          ) : (
            <p className="font-display text-xl font-semibold">{city}</p>
          )}
          <a href={mapLink(q)} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline">
            Open in Google Maps <ExternalLink className="size-3.5" />
          </a>
        </div>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
          {foodLayers.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLayer(l.id)}
              aria-pressed={layer === l.id}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium ${layer === l.id ? 'border-ink bg-ink text-paper' : 'border-line bg-paper hover:border-ink'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative aspect-[4/3] bg-sand sm:aspect-[16/7]">
        {loaded ? (
          <iframe key={q} title={`Map: ${q}`} src={mapEmbed(q)} className="size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <button type="button" onClick={() => setLoaded(true)} className="grain group absolute inset-0 grid place-items-center">
            <span className="flex flex-col items-center gap-3 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-ink text-paper transition-transform group-hover:scale-110">
                <MapPinned className="size-6" />
              </span>
              <span className="font-semibold">Show {foodLayers.find((l) => l.id === layer).label.toLowerCase()} in {city}</span>
              <span className="text-xs text-muted">Loads a live Google Maps search</span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

export function AirportList({ code }) {
  const list = airports[code] || []
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {list.map((a) => (
        <li key={a.code} className="card flex gap-4 p-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-ink font-mono text-sm font-medium text-paper">{a.code}</span>
          <span className="min-w-0 flex-1">
            <span className="flex items-start justify-between gap-2">
              <span className="font-semibold">{a.name}</span>
              <a href={flightSearch(a.code)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-link hover:underline">
                <Plane className="size-3.5" /> Flights
              </a>
            </span>
            <span className="mt-1 flex flex-wrap gap-1">
              {a.airlines.map((x) => (
                <span key={x} className="chip bg-sand text-ink-2">
                  {x}
                </span>
              ))}
            </span>
            <span className="mt-1.5 block text-xs text-muted">{a.note}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}
