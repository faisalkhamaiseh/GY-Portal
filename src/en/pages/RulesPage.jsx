import { useState } from 'react'
import { AlertTriangle, Check, X, Moon, WashingMachine, Music, Hammer, Wine, ShowerHead, Scale } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout } from '../components/ui.jsx'
import { torrent, bins, wasteExtras, quietHours, otherRules } from '../data/rules.js'

function Bin({ color, label, active }) {
  return (
    <svg viewBox="0 0 120 150" className={`h-28 w-auto transition-transform ${active ? 'scale-110' : ''}`} aria-hidden>
      <rect x="22" y="40" width="76" height="98" rx="8" fill={color} />
      <rect x="22" y="40" width="76" height="98" rx="8" fill="url(#shade)" />
      <rect x="14" y="26" width="92" height="16" rx="5" fill={color} />
      <rect x="14" y="26" width="92" height="16" rx="5" fill="#000" opacity="0.18" />
      <rect x="48" y="18" width="24" height="9" rx="3" fill={color} />
      <rect x="34" y="62" width="52" height="30" rx="4" fill="#fff" opacity="0.92" />
      <text x="60" y="82" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600" fill="#1d2420">
        {label}
      </text>
      <circle cx="34" cy="140" r="7" fill="#1d2420" />
      <circle cx="86" cy="140" r="7" fill="#1d2420" />
      <defs>
        <linearGradient id="shade" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function Clock() {
  // 24h dial: night rest 22–06 shaded, quiet midday 13–15 lightly.
  const arc = (from, to, r) => {
    const a = (h) => ((h / 24) * 360 - 90) * (Math.PI / 180)
    const [x1, y1] = [100 + r * Math.cos(a(from)), 100 + r * Math.sin(a(from))]
    const [x2, y2] = [100 + r * Math.cos(a(to)), 100 + r * Math.sin(a(to))]
    const span = (to - from + 24) % 24
    return `M100 100 L${x1} ${y1} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x2} ${y2}Z`
  }
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-56" role="img" aria-label="24-hour clock: quiet from 22:00 to 06:00 and 13:00 to 15:00">
      <circle cx="100" cy="100" r="90" fill="#fffdf8" stroke="#ddd6c8" strokeWidth="2" />
      <path d={arc(22, 6, 88)} fill="#1d2420" />
      <path d={arc(13, 15, 88)} fill="#d9a43b" opacity="0.7" />
      {Array.from({ length: 24 }, (_, h) => {
        const a = ((h / 24) * 360 - 90) * (Math.PI / 180)
        return (
          <text key={h} x={100 + 72 * Math.cos(a)} y={100 + 72 * Math.sin(a) + 3.5} textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono, monospace" fill={h >= 22 || h < 6 ? '#f7f4ee' : '#66706a'}>
            {h % 3 === 0 ? h : '·'}
          </text>
        )
      })}
      <circle cx="100" cy="100" r="30" fill="#fffdf8" />
      <text x="100" y="97" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d2420" fontFamily="Fraunces, serif">
        Ruhezeit
      </text>
      <text x="100" y="111" textAnchor="middle" fontSize="8" fill="#66706a" fontFamily="JetBrains Mono, monospace">
        22–06
      </text>
    </svg>
  )
}

const avoidIcons = [WashingMachine, Music, ShowerHead, Hammer, Wine]

export default function RulesPage() {
  const [bin, setBin] = useState('paper')
  const b = bins.find((x) => x.id === bin)

  return (
    <div className="wrap pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Hidden rules</p>
          <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">The everyday rules that cost students money</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            Nobody tells you these at orientation. Each one has cost GJU students real money: a torrent letter, a landlord warning, a fine on the tram. Read this before you move in.
          </p>
        </div>
        <ShareButton title="Hidden rules in Germany: GJU German Year Guide" />
      </div>

      {/* Torrents */}
      <section className="mt-14">
        <div className="overflow-hidden rounded-3xl border-2 border-rust bg-blush/50">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-rust px-3 py-1 font-mono text-[11px] tracking-wider text-paper uppercase">
                <AlertTriangle className="size-3.5" /> Strict warning
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{torrent.title}</h2>
              <p className="mt-3 font-display text-5xl font-semibold text-rust">{torrent.fine}</p>
              <p className="text-sm text-muted">typical warning-letter claim</p>
              <ul className="mt-6 space-y-3">
                {torrent.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] leading-relaxed">
                    <X className="mt-0.5 size-5 shrink-0 text-rust" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl bg-card p-5">
                <p className="font-semibold">If you get a warning letter (Abmahnung)</p>
                <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
                  {torrent.ifYouGetOne.map((t, i) => (
                    <li key={t} className="flex gap-2">
                      <span className="font-display font-semibold text-rust">{i + 1}.</span> {t}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-2xl bg-card p-5">
                <p className="font-semibold">Watch and listen legally</p>
                <ul className="mt-3 space-y-2 text-sm text-ink-2">
                  {torrent.legal.map((t) => (
                    <li key={t} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-forest" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste */}
      <section className="mt-24">
        <SectionHead id="waste" eyebrow="Mülltrennung" title="Sorting your rubbish">
          Germany sorts waste into five streams. Bin colours can vary slightly by city; the sticker on the lid always tells you. Tap a bin.
        </SectionHead>
        <div className="grid grid-cols-5 items-end gap-2 sm:gap-6" role="tablist" aria-label="Waste bins">
          {bins.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={bin === x.id}
              onClick={() => setBin(x.id)}
              className={`flex flex-col items-center rounded-2xl border-2 px-1 pt-4 pb-3 transition-colors ${bin === x.id ? 'border-ink bg-card' : 'border-transparent hover:bg-card'}`}
            >
              <Bin color={x.color} label={x.short} active={bin === x.id} />
              <span className="mt-2 text-center text-xs font-semibold sm:text-sm">{x.name}</span>
              <span className="hidden text-center font-mono text-[10px] text-muted sm:block">{x.de}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2" role="tabpanel">
          <div className="rounded-2xl border-2 border-forest bg-mint/60 p-6">
            <p className="flex items-center gap-2 font-display text-xl font-semibold">
              <span className="size-4 rounded" style={{ background: b.color }} /> {b.de}: yes
            </p>
            <p className="mt-1 text-xs text-muted">{b.lid}</p>
            <ul className="mt-4 space-y-2">
              {b.yes.map((t) => (
                <li key={t} className="flex gap-2 text-[15px]">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-rust bg-blush/60 p-6">
            <p className="font-display text-xl font-semibold">Not in this bin</p>
            <ul className="mt-4 space-y-2">
              {b.no.map((t) => (
                <li key={t} className="flex gap-2 text-[15px]">
                  <X className="mt-0.5 size-5 shrink-0 text-rust" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wasteExtras.map((w) => (
            <article key={w.title} className="card p-5">
              <h3 className="font-display text-lg font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{w.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quiet hours */}
      <section className="mt-24">
        <SectionHead id="quiet" eyebrow="Ruhezeit" title="Quiet hours">
          German buildings take quiet time seriously. Your house rules (Hausordnung) are part of your rental contract, so read them.
        </SectionHead>
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
          <div className="card p-6">
            <Clock />
            <div className="mt-4 flex justify-center gap-4 font-mono text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-ink" /> Night rest
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-3 rounded-sm bg-gold" /> Midday (house rules)
              </span>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {quietHours.blocks.map((q) => (
              <div key={q.label} className="card p-5">
                <Moon className="size-5 text-forest" />
                <p className="mt-3 font-mono text-[11px] tracking-wider text-muted uppercase">{q.label}</p>
                <p className="mt-1 font-display text-2xl font-semibold">{q.time}</p>
                <p className="mt-2 text-sm text-ink-2">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 card p-6">
          <p className="font-display text-xl font-semibold">Avoid during quiet hours</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quietHours.avoid.map((t, i) => {
              const Icon = avoidIcons[i % avoidIcons.length]
              return (
                <li key={t} className="flex items-start gap-3 text-[15px]">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blush text-rust">
                    <Icon className="size-4" />
                  </span>
                  {t}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-5">
          <Callout title="What happens if you ignore it?" tone="rust">
            {quietHours.consequences}
          </Callout>
        </div>
      </section>

      {/* Other fines */}
      <section className="mt-24">
        <SectionHead id="fines" eyebrow="Other fines" title="Small mistakes, real costs" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherRules.map((r) => (
            <article key={r.title} className="card flex gap-4 p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber text-[#7a5410]">
                <Scale className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="font-mono text-sm text-rust">{r.fine}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">Fine amounts are estimates based on the German fine catalogue and court practice; they change and vary by state and case. *Estimated cost. Prices are subject to change.</p>
      </section>
    </div>
  )
}
