import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BudgetPlanner, { BudgetMatrix } from '../components/BudgetPlanner.jsx'
import PriceTable from '../components/PriceTable.jsx'
import { SectionHead, Callout, EstimateNote } from '../components/ui.jsx'
import { BLOCKED_MONTHLY, cityTier, fixedMonthly, rentFor, tiers } from '../data/costs.js'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b))

export default function CostsPage() {
  const [params] = useSearchParams()
  const [city, setCity] = useState(() => (cities.includes(params.get('city')) ? params.get('city') : 'Schmalkalden'))
  const rent = rentFor(city)

  const byTier = Object.keys(tiers).map((t) => ({
    tier: Number(t),
    ...tiers[t],
    cities: cities.filter((c) => (cityTier[c] ?? 4) === Number(t)),
  }))

  return (
    <div className="wrap pt-12">
      <p className="eyebrow">Costs · estimated ranges</p>
      <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">What your German Year really costs</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Your blocked account pays out about €{BLOCKED_MONTHLY} a month (an estimate; the official amount changes). About €{fixedMonthly.reduce((s, f) => s + f.amount, 0)} of that goes on fixed costs; rent decides the rest. Pick your city and see where the money goes.
      </p>
      <EstimateNote className="mt-4" />

      <section className="mt-12">
        <SectionHead eyebrow="Interactive" title="Budget planner" />
        <BudgetPlanner key={city} initialCity={city} />
      </section>

      <section className="mt-24">
        <SectionHead
          id="prices"
          eyebrow="Price list"
          title="Prices for everything"
          action={
            <label className="flex items-center gap-3 text-sm">
              <span className="font-medium">City</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2">
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          }
        >
          {city} is rated <strong className="text-ink">{tiers[rent.tier].label.toLowerCase()}</strong>. Rent: dorm €{rent.dorm[0]}–{rent.dorm[1]}, WG room €{rent.wg[0]}–{rent.wg[1]}, own flat €{rent.flat[0]}–{rent.flat[1]} per month.
        </SectionHead>
        <PriceTable factor={rent.factor} city={city} />
      </section>

      <section className="mt-24">
        <SectionHead eyebrow={`${city}`} title="All nine combinations">
          Every combination of housing and lifestyle, compared with the €{BLOCKED_MONTHLY} a month from your blocked account. The same layout as the Schmalkalden Survival Book.
        </SectionHead>
        <div className="mb-6 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full border border-forest bg-mint px-3 py-1 text-forest">Covered: €100+ left</span>
          <span className="rounded-full border border-[#9a6a12] bg-amber px-3 py-1 text-[#7a5410]">Tight: €0–99 left</span>
          <span className="rounded-full border border-rust bg-blush px-3 py-1 text-rust-dark">Over budget</span>
        </div>
        <BudgetMatrix city={city} />
      </section>

      <section className="mt-24">
        <SectionHead eyebrow="Rent levels" title="Every host city by price level">
          Rent bands are realistic student ranges from German rent surveys and Studierendenwerk prices. A WG room in a level-1 city can cost three times as much as one in a level-5 town.
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {byTier.map((t) => (
            <div key={t.tier} className="card flex flex-col p-5">
              <p className="font-mono text-[11px] tracking-wider text-rust uppercase">Level {t.tier}</p>
              <p className="mt-1 font-display text-xl font-semibold">{t.label}</p>
              <p className="mt-2 font-mono text-xs text-ink-2">
                Dorm €{t.dorm[0]}–{t.dorm[1]}
                <br />
                WG €{t.wg[0]}–{t.wg[1]}
                <br />
                Flat €{t.flat[0]}–{t.flat[1]}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {t.cities.map((c) => (
                  <button key={c} type="button" onClick={() => setCity(c)} className="chip bg-sand text-ink-2 hover:bg-ink hover:text-paper">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Callout title="How to read these numbers.">
          Every figure is an estimate, including official fees (blocked account, semester ticket, broadcast fee, residence permit), which change regularly. Everyday prices are typical ranges, not quotes, and Schmalkalden rents come from the Studierendenwerk Thüringen. Confirm fees and deadlines on the official pages before you pay.
        </Callout>
      </div>
    </div>
  )
}
