import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bus, Car, TrainFront, Plane, Tag } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout, EstimateNote } from '../components/ui.jsx'
import { borderTrips, borderNote, weekendPlans, travelApps, saveMoney } from '../data/budgetTravel.js'

const appIcons = [Bus, Car, TrainFront, Plane]

export default function TravelPage() {
  const [from, setFrom] = useState('All')
  const origins = ['All', ...new Set(borderTrips.map((t) => t.from))]
  const trips = from === 'All' ? borderTrips : borderTrips.filter((t) => t.from === from)

  return (
    <>
      <section className="border-b border-line bg-forest text-paper">
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="eyebrow !text-gold">Budget travel</p>
              <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">
                See Europe on a
                <span className="text-gold italic"> student budget.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
                Your semester ticket is free travel across Germany. Ride it to the borders, use FlixBus and BlaBlaCar for the rest, and spend your money on the trip, not the transport.
              </p>
            </div>
            <ShareButton className="btn border border-paper/25 text-paper hover:border-paper" title="Budget travel for GJU students" />
          </div>
        </div>
      </section>

      <div className="wrap space-y-24 pt-16">
        <section>
          <SectionHead
            id="borders"
            eyebrow="Deutschlandticket to the border"
            title="Neighbouring countries for (almost) free"
            action={
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2 text-sm" aria-label="Starting region">
                {origins.map((o) => (
                  <option key={o}>{o === 'All' ? 'From any region' : `From ${o}`}</option>
                ))}
              </select>
            }
          >
            Ride regional trains (RB, RE, S-Bahn) to a border town, then walk or take a short local connection into the next country.
          </SectionHead>
          <div className="grid gap-4 md:grid-cols-2">
            {trips.map((t) => (
              <article key={t.place} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] tracking-wider text-rust uppercase">
                    {t.from} → {t.to}
                  </p>
                  <span className="chip bg-mint text-forest">{t.extra}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold">{t.place}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.how}</p>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <Callout>{borderNote}</Callout>
          </div>
        </section>

        <section>
          <SectionHead id="weekends" eyebrow="Ready-made plans" title="Weekend trips under €50" />
          <EstimateNote className="mb-4" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {weekendPlans.map((p) => (
              <article key={p.title} className="card flex flex-col overflow-hidden">
                <div className="bg-ink p-5 text-paper">
                  <p className="font-mono text-[10px] tracking-wider text-paper/60 uppercase">{p.region}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 font-display text-4xl font-semibold text-gold">€{p.budget}</p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4 font-mono text-xs">
                    {p.items.map(([k, v]) => (
                      <li key={k} className="flex justify-between gap-2">
                        <span className="text-muted">{k}</span>
                        <span className={v === 0 ? 'text-forest' : ''}>{v === 0 ? 'free' : `€${v}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHead id="apps" eyebrow="Travel apps" title="FlixBus, BlaBlaCar & co." action={<Link to="/apps" className="btn-ghost">All essential apps <ArrowRight className="size-4" /></Link>} />
          <div className="grid gap-5 md:grid-cols-2">
            {travelApps.map((a, i) => {
              const Icon = appIcons[i]
              return (
                <article key={a.name} className="card p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-mint text-forest">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-display text-2xl font-semibold">{a.name}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{a.text}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {a.tips.map((t) => (
                      <li key={t} className="flex gap-2 text-sm">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rust" /> {t}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
          <p className="mt-5 text-sm text-muted">
            Flying further? See the <Link to="/survival-map#airports" className="link">budget airports near each region</Link>.
          </p>
        </section>

        <section>
          <SectionHead id="savings" eyebrow="Discount seasons" title="When and where to buy for less" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saveMoney.map((s) => (
              <article key={s.title} className="card p-5">
                <p className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-rust uppercase">
                  <Tag className="size-3.5" /> {s.when}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
