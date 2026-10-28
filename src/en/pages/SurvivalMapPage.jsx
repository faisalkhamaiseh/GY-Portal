import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, X, TrainFront, Plane, Moon } from 'lucide-react'
import { HalalMap, AirportList } from '../components/SurvivalMap.jsx'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, LinkRow, Callout } from '../components/ui.jsx'
import { regions } from '../data/regions.js'
import { dticket, airlines, europeTrips, halalTips } from '../data/travel.js'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b))
const german = regions.filter((r) => r.code !== 'INT')

export default function SurvivalMapPage() {
  const [params] = useSearchParams()
  const [code, setCode] = useState(() => (german.some((r) => r.code === params.get('region')) ? params.get('region') : 'TH'))
  const startCity = cities.includes(params.get('city')) ? params.get('city') : 'Schmalkalden'

  return (
    <div className="wrap pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Cultural survival map</p>
          <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">Halal food, mosques & getting around</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            Find Turkish and Arab supermarkets, halal butchers and mosques in any host city. Then learn what your Deutschlandticket covers and where the cheap flights leave from.
          </p>
        </div>
        <ShareButton title="Cultural survival map for GJU students" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          ['#halal', Moon, 'Halal food guide'],
          ['#ticket', TrainFront, 'Deutschlandticket'],
          ['#airports', Plane, 'Budget airports'],
        ].map(([href, Icon, label]) => (
          <a key={href} href={href} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-ink">
            <Icon className="size-4 text-forest" /> {label}
          </a>
        ))}
      </div>

      <section className="mt-16">
        <SectionHead id="halal" eyebrow="Halal food guide" title="Find halal food in your city">
          Pick your city and what you need. The live map shows halal butchers, Turkish and Arab supermarkets, Arabic restaurants and mosques nearby.
        </SectionHead>
        <HalalMap key={startCity} cities={cities} initialCity={startCity} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {halalTips.map((t) => (
            <article key={t.title} className="card p-5">
              <h3 className="font-display text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHead id="ticket" eyebrow="Transport" title="The Deutschlandticket, explained">
          One ticket for every bus, tram, U-Bahn, S-Bahn and regional train in Germany. Students usually get it as the Deutschlandsemesterticket, included in the semester fee. The current price is on the official site.
        </SectionHead>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-forest bg-mint/60 p-6">
            <p className="font-mono text-[11px] tracking-wider text-forest uppercase">Covered</p>
            <ul className="mt-4 space-y-3">
              {dticket.covered.map((x) => (
                <li key={x} className="flex gap-3 text-[15px]">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-rust bg-blush/60 p-6">
            <p className="font-mono text-[11px] tracking-wider text-rust uppercase">Not covered</p>
            <ul className="mt-4 space-y-3">
              {dticket.notCovered.map((x) => (
                <li key={x} className="flex gap-3 text-[15px]">
                  <X className="mt-0.5 size-5 shrink-0 text-rust" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 card p-6">
          <p className="font-display text-xl font-semibold">Tips</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {dticket.tips.map((t) => (
              <li key={t} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rust" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-x-10 border-t border-line pt-2 md:grid-cols-2">
            <LinkRow href="https://www.bahn.com/en" title="Deutsche Bahn" text="Timetables, Sparpreis tickets, BahnCard. Get the DB Navigator app." />
            <LinkRow href="https://www.flixbus.de/" title="FlixBus" text="Cheap long-distance buses across Europe." />
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHead
          id="airports"
          eyebrow="Travel Europe"
          title="Nearest budget airports"
          action={
            <label className="flex items-center gap-3 text-sm">
              <span className="font-medium">Region</span>
              <select value={code} onChange={(e) => setCode(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2">
                {german.map((r) => (
                  <option key={r.code} value={r.code}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
          }
        >
          Low-cost airlines usually serving each airport. Routes change every season, so each card opens a live flight search.
        </SectionHead>
        <AirportList code={code} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card overflow-hidden">
            <p className="px-5 pt-5 font-display text-xl font-semibold">Weekend trip ideas</p>
            <table className="mt-3 w-full text-left text-sm">
              <thead className="border-y border-line font-mono text-[10.5px] tracking-wider text-muted uppercase">
                <tr>
                  <th className="px-5 py-2.5 font-medium">To</th>
                  <th className="hidden px-5 py-2.5 font-medium sm:table-cell">How</th>
                  <th className="px-5 py-2.5 font-medium">Typical fare</th>
                </tr>
              </thead>
              <tbody>
                {europeTrips.map((t) => (
                  <tr key={t.to} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium">
                      {t.to}
                      <span className="mt-0.5 block text-xs font-normal text-muted sm:hidden">{t.how}</span>
                    </td>
                    <td className="hidden px-5 py-3 text-muted sm:table-cell">{t.how}</td>
                    <td className="px-5 py-3 font-mono text-xs whitespace-nowrap">{t.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="eyebrow">Airlines</p>
            <div className="mt-2">
              {airlines.map((a) => (
                <LinkRow key={a.name} href={a.url} title={a.name} text={a.text} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Callout title="Travelling outside Germany?">
            Always carry your passport and residence permit (or your visa plus the permit appointment letter). Your semester ticket stops at the border, and low-cost airlines charge for anything bigger than a small cabin bag.
          </Callout>
        </div>
      </section>
    </div>
  )
}
