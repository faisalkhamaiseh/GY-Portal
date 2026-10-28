import { useState } from 'react'
import { Link } from 'react-router-dom'
import { regions, tileLayout } from '../data/regions.js'
import { universitiesIn } from '../lib/data.js'

// A tile cartogram of the 16 states: same rough geography, every state the
// same tappable size, shaded by how many host universities it has.

const counts = Object.fromEntries(regions.map((r) => [r.code, universitiesIn(r.code).length]))
const max = Math.max(...Object.values(counts))

function shade(n) {
  const t = n / max
  if (t > 0.66) return 'bg-ink text-paper border-ink'
  if (t > 0.33) return 'bg-forest text-paper border-forest'
  if (t > 0.12) return 'bg-[#9dbfae] text-ink border-[#9dbfae]'
  return 'bg-mint text-ink border-[#cfe2d7]'
}

export default function GermanyMap({ activeCode }) {
  const [hover, setHover] = useState(null)
  const focus = regions.find((r) => r.code === (hover ?? activeCode))

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,640px)_1fr]">
      <div className="grid w-full max-w-[640px] grid-cols-5 gap-1.5 [grid-auto-rows:clamp(62px,15vw,112px)] sm:gap-2.5" role="list" aria-label="German states">
        {Object.entries(tileLayout).map(([code, [col, row, span = 1]]) => {
          const r = regions.find((x) => x.code === code)
          const n = counts[code]
          return (
            <Link
              key={code}
              role="listitem"
              to={`/regions/${r.slug}`}
              onMouseEnter={() => setHover(code)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(code)}
              onBlur={() => setHover(null)}
              style={{ gridColumn: `${col + 1} / span ${span}`, gridRow: row + 1 }}
              className={`group relative flex flex-col justify-between rounded-xl border p-2 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:rounded-2xl sm:p-3 ${shade(n)} ${activeCode === code ? 'ring-2 ring-rust ring-offset-2 ring-offset-paper' : ''}`}
              aria-label={`${r.name}: ${n} host universities`}
            >
              <span className="font-mono text-[10px] font-medium tracking-wider opacity-70 sm:text-xs">{code}</span>
              <span>
                <span className="block font-display text-xl leading-none font-semibold sm:text-3xl">{n}</span>
                <span className="mt-1 hidden truncate text-[11px] leading-tight opacity-80 sm:block">{r.name}</span>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="card p-5 lg:sticky lg:top-24">
        {focus ? (
          <>
            <p className="eyebrow">{focus.nameDe}</p>
            <p className="h-display mt-1 text-2xl">{focus.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{focus.tagline}</p>
            <p className="mt-4 font-mono text-xs text-ink-2">
              {counts[focus.code]} host {counts[focus.code] === 1 ? 'university' : 'universities'} · capital {focus.capital}
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">Pick a state</p>
            <p className="h-display mt-1 text-2xl">16 states, {Object.keys(tileLayout).reduce((a, c) => a + counts[c], 0)} campuses</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Darker tiles have more GJU host universities. Tap a state for its universities, videos, events, costs and housing links.
            </p>
          </>
        )}
        <div className="mt-5 flex items-center gap-2 font-mono text-[10px] text-muted">
          <span>fewer</span>
          <span className="h-2.5 w-5 rounded-sm bg-mint" />
          <span className="h-2.5 w-5 rounded-sm bg-[#9dbfae]" />
          <span className="h-2.5 w-5 rounded-sm bg-forest" />
          <span className="h-2.5 w-5 rounded-sm bg-ink" />
          <span>more</span>
        </div>
      </div>
    </div>
  )
}
