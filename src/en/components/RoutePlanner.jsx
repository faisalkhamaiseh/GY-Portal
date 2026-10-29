import { useMemo, useState } from 'react'
import { ArrowLeftRight, ArrowUpRight, Bus, Plane, TrainFront, Zap } from 'lucide-react'
import { stations, pickable, plan, verdict, links, longDistance, SPARPREIS_FROM } from '../../lib/routes.js'
import { regions } from '../data/regions.js'
import { EstimateNote, ExtLink } from './ui.jsx'

const name = (id) => stations[id].en
const euro = (n) => (n % 1 ? `€${n.toFixed(2)}` : `€${n}`)
const duration = (m) => (m < 60 ? `${m} min` : `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')}`)
const changes = (n) => (n === 0 ? 'direct' : n === 1 ? '1 change' : `${n} changes`)
const fastType = (t) => t.legs.find(longDistance).type

const groups = regions
  .filter((r) => r.code !== 'INT')
  .map((r) => ({ label: r.name, ids: pickable.filter((id) => stations[id].region === r.code) }))
  .sort((a, b) => a.label.localeCompare(b.label))
const regionName = (id) => regions.find((r) => r.code === stations[id].region)?.name

function StationSelect({ label, value, onChange }) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="text-sm font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-line bg-card px-3 py-3 text-base">
        {groups.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.ids.map((id) => (
              <option key={id} value={id}>
                {name(id)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}

function Legs({ trip }) {
  return (
    <ol className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
      {trip.legs.map((l, i) => (
        <li key={i}>
          {i > 0 && <p className="mb-2 ps-1 font-mono text-[11px] tracking-wider text-muted uppercase">Change in {name(l.from)}</p>}
          <p className="flex items-center gap-2">
            <span className={`chip shrink-0 ${longDistance(l) ? 'bg-blush text-rust-dark' : 'bg-mint text-forest'}`}>{l.type}</span>
            <span className="min-w-0 flex-1 font-medium">
              {name(l.from)} → {name(l.to)}
            </span>
            <span className="shrink-0 font-mono text-xs text-muted">{duration(l.minutes)}</span>
          </p>
        </li>
      ))}
    </ol>
  )
}

function Option({ icon: Icon, title, price, tone, time, sub, children }) {
  return (
    <article className={`flex flex-col rounded-2xl border border-t-4 border-line bg-card p-5 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold">
          <Icon className="size-5 shrink-0" aria-hidden /> {title}
        </p>
        <span className="chip shrink-0 bg-paper font-mono text-ink">{price}</span>
      </div>
      <p className="mt-3 font-display text-4xl font-semibold tracking-tight">{time}</p>
      <p className="text-sm text-muted">{sub}</p>
      {children}
    </article>
  )
}

function Advice({ r }) {
  const { free, fast, bus, flight } = r
  const saved = fast && free.minutes - fast.minutes
  switch (verdict(r)) {
    case 'free':
      return (
        <>
          <strong>Take the regional trains.</strong> They are free with your semester ticket
          {fast ? ` and only ${duration(saved)} slower than the ${fastType(fast)}.` : ', and nothing faster runs on this route.'}
        </>
      )
    case 'free-or-fast':
      return (
        <>
          <strong>Free if you have the time:</strong> regional trains take {duration(free.minutes)} ({changes(free.changes)}). If time matters, the {fastType(fast)} saves {duration(saved)} from {euro(SPARPREIS_FROM)} when you book early.
        </>
      )
    case 'bus':
      return (
        <>
          <strong>FlixBus is the cheapest paid option:</strong> from {euro(bus.from)}, and only {duration(bus.minutes - fast.minutes)} slower than the train. Regional trains are free but take {duration(free.minutes)}.
        </>
      )
    default:
      return (
        <>
          <strong>Book an ICE Sparpreis early</strong> (from {euro(SPARPREIS_FROM)}): {duration(fast.minutes)} instead of {duration(free.minutes)} and {changes(free.changes)} on regional trains.
          {bus && ` FlixBus (from ${euro(bus.from)}) beats a last-minute train ticket (about ${euro(fast.flex)}), but takes ${duration(bus.minutes)}.`}
          {flight && ` Flying is rarely worth it: usually €70–200 and still about ${duration(flight.minutes)} door to door.`}
        </>
      )
  }
}

export default function RoutePlanner() {
  const [from, setFrom] = useState('SMK')
  const [to, setTo] = useState('B')
  const r = useMemo(() => (from === to ? null : plan(from, to)), [from, to])

  return (
    <div>
      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:p-5">
        <StationSelect label="From" value={from} onChange={setFrom} />
        <button
          type="button"
          onClick={() => {
            setFrom(to)
            setTo(from)
          }}
          className="press grid size-11 shrink-0 place-items-center self-center rounded-full border border-line bg-paper hover:border-ink sm:self-end"
          aria-label="Swap start and destination"
        >
          <ArrowLeftRight className="size-4 max-sm:rotate-90" />
        </button>
        <StationSelect label="To" value={to} onChange={setTo} />
      </div>

      {!r ? (
        <p className="mt-6 text-muted">Pick two different places.</p>
      ) : (
        <>
          <p className="mt-6 font-mono text-[11px] tracking-wider text-muted uppercase">
            {name(from)} ({regionName(from)}) → {name(to)} ({regionName(to)}) · {r.km} km in a straight line
          </p>
          <div className="mt-3 border-l-4 border-forest bg-card px-5 py-4 text-[15px] leading-relaxed">
            <Advice r={r} />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <Option icon={TrainFront} title="Regional trains & local transport" price="€0" tone="border-t-forest" time={duration(r.free.minutes)} sub={`${changes(r.free.changes)} · free with your Deutschlandsemesterticket`}>
              <Legs trip={r.free} />
              {r.free.minutes > 600 && <p className="mt-4 rounded-lg bg-blush px-3 py-2 text-xs text-rust-dark">Over 10 hours: too long for one day on regional trains. Plan a night on the way, or take the faster train.</p>}
              <p className="mt-4 text-xs text-muted">No semester ticket? The €63 Deutschlandticket covers this trip too, buses and trams included.</p>
            </Option>

            {!r.fast && (
              <article className="flex flex-col justify-center rounded-2xl border border-dashed border-line p-5 text-sm text-ink-2">
                <p className="flex items-center gap-2 font-semibold text-ink">
                  <Zap className="size-5 shrink-0" aria-hidden /> No faster ICE or IC
                </p>
                <p className="mt-2">On this route long-distance trains save little or no time, so the free regional trains above are the best way to go.</p>
              </article>
            )}

            {r.fast && (
              <Option icon={Zap} title={`Fastest: ${fastType(r.fast)}`} price={`from ${euro(SPARPREIS_FROM)}`} tone="border-t-rust" time={duration(r.fast.minutes)} sub={`${changes(r.fast.changes)} · saves ${duration(r.free.minutes - r.fast.minutes)}`}>
                <Legs trip={r.fast} />
                <ul className="mt-4 space-y-1 border-t border-line pt-4 text-sm">
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">Booked weeks ahead (Super Sparpreis)</span>
                    <span className="shrink-0 font-mono">from {euro(SPARPREIS_FROM)}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">On the day (Flexpreis)*</span>
                    <span className="shrink-0 font-mono">about {euro(r.fast.flex)}</span>
                  </li>
                  <li className="text-xs text-muted">My BahnCard 25 (€39.90 a year, under 27) takes 25% off both. Regional legs are free with your ticket.</li>
                </ul>
              </Option>
            )}

            {r.bus && (
              <Option icon={Bus} title="FlixBus" price={`from ${euro(r.bus.from)}*`} tone="border-t-gold" time={duration(r.bus.minutes)} sub="usually direct, city centre to city centre">
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">
                  {r.fast
                    ? r.bus.minutes > r.fast.minutes
                      ? `${duration(r.bus.minutes - r.fast.minutes)} slower than the train, but often cheaper than a train ticket bought late.`
                      : 'About as fast as the train, and often cheaper.'
                    : r.bus.minutes < r.free.minutes
                      ? `${duration(r.free.minutes - r.bus.minutes)} faster than the regional trains, but you pay for it.`
                      : 'Slower than the free regional trains.'}{' '}
                  Prices rise as seats sell, so book 1–2 weeks ahead.
                </p>
              </Option>
            )}

            {r.flight && (
              <Option icon={Plane} title={`Flight ${r.flight.airA} → ${r.flight.airB}`} price="€70–200*" tone="border-t-ink" time={duration(r.flight.minutes)} sub={`door to door · about ${duration(r.flight.air)} in the air`}>
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">
                  Add about 2 hours for the airport train, security and boarding. Only a few domestic routes are left, and a checked bag costs extra.
                </p>
              </Option>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <ExtLink href={links.maps(from, to)} className="btn-ghost">
              Live connections <ArrowUpRight className="size-4" />
            </ExtLink>
            <ExtLink href="https://int.bahn.de/en" className="btn-ghost">
              Book on bahn.de <ArrowUpRight className="size-4" />
            </ExtLink>
            {r.bus && (
              <ExtLink href="https://global.flixbus.com/" className="btn-ghost">
                FlixBus <ArrowUpRight className="size-4" />
              </ExtLink>
            )}
            {r.flight && (
              <ExtLink href={links.flights(r.flight.airA, r.flight.airB)} className="btn-ghost">
                Google Flights <ArrowUpRight className="size-4" />
              </ExtLink>
            )}
            <ExtLink href={links.compare(from, to)} className="btn-ghost">
              Compare everything <ArrowUpRight className="size-4" />
            </ExtLink>
          </div>
        </>
      )}

      <EstimateNote className="mt-6" />
      <p className="mt-2 text-sm text-muted">
        Times are typical timetable values, not live data, and construction can add hours. Before you go, check the DB Navigator app; tick “Nur Nahverkehr” (local transport only) to see the trains your ticket covers. Every host university’s town is in the list; for any other town, pick the nearest one, since the local train or bus there is free with your ticket.
      </p>
    </div>
  )
}
