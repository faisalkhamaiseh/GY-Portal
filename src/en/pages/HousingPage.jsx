import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShieldAlert, Building2 } from 'lucide-react'
import { SectionHead, LinkRow, EstimateNote } from '../components/ui.jsx'
import { portals, scamRules, housingWords, housingTimeline, dormSearch } from '../data/housing.js'
import { regions } from '../data/regions.js'
import { rentFor } from '../data/costs.js'
import Sections, { Panel } from '../../components/Sections.jsx'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b))

export default function HousingPage() {
  const [params] = useSearchParams()
  const [city, setCity] = useState(() => (cities.includes(params.get('city')) ? params.get('city') : ''))
  const rent = city ? rentFor(city) : null
  const region = city ? regions.find((r) => r.code === universities.find((u) => u.city === city)?.region) : null

  return (
    <div className="wrap pt-6 lg:pt-12">
      <p className="eyebrow">Housing</p>

      <h1 className="h-display mt-2 max-w-4xl text-4xl sm:text-6xl">Find a room you can trust</h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        Most GJU students live in a Studierendenwerk dorm: cheap, furnished and with bills included. If you miss out, use the trusted portals below, start early, and never pay before you have seen the room.
      </p>

      <section className="mt-10 card p-5 sm:p-7">
        <label className="block max-w-md">
          <span className="font-mono text-[11px] tracking-wider text-muted uppercase">Search rooms in your host city</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base">
            <option value="">Choose a city…</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {city && <EstimateNote className="mt-4" />}
        {city && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-display text-2xl font-semibold">{city}</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ['Dorm', rent.dorm],
                  ['WG', rent.wg],
                  ['Flat', rent.flat],
                ].map(([k, [a, b]]) => (
                  <div key={k} className="rounded-xl bg-sand p-3">
                    <p className="font-mono text-[10px] text-muted uppercase">{k}</p>
                    <p className="font-semibold">
                      €{a}–{b}
                    </p>
                  </div>
                ))}
              </div>
              <a href={dormSearch(city)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
                <Building2 className="size-4" /> Find dorms in {city}
              </a>
              {region && (
                <div className="mt-4">
                  {region.studierendenwerke
                    .filter((s) => s.serves.includes(city))
                    .map((s) => (
                      <LinkRow key={s.name} href={s.url} title={s.name} text={`Serves ${s.serves}`} badge="Official" />
                    ))}
                </div>
              )}
            </div>
            <div>
              {portals.map((p) => (
                <LinkRow key={p.name} href={p.search ? p.search(city) : p.url} title={p.name} text={p.text} badge={p.trust} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Sections className="mt-8 lg:mt-20" label="Page sections">
        <Panel id="timeline" label="Timeline">
          <SectionHead eyebrow="Timeline" title="When to do what" />
          <ol className="grid gap-4 md:grid-cols-4">
            {housingTimeline.map((t, i) => (
              <li key={t.title} className="card p-5">
                <p className="font-display text-3xl font-semibold text-rust">0{i + 1}</p>
                <p className="mt-3 font-mono text-[11px] tracking-wider text-muted uppercase">{t.when}</p>
                <p className="mt-1 text-lg font-semibold">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.text}</p>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel id="portals" label="Trusted sites" className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="card p-5 sm:p-7">
            <p className="eyebrow">Trusted portals</p>
            <h2 className="mt-1 font-display text-3xl font-semibold">WG rooms and private flats</h2>
            <div className="mt-3">
              {portals.map((p) => (
                <LinkRow key={p.name} href={p.url} title={p.name} text={`${p.kind}. ${p.text}`} badge={p.trust} />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-rust bg-blush/60 p-5 sm:p-7">
              <ShieldAlert className="size-8 text-rust" aria-hidden />
              <h2 className="mt-3 font-display text-3xl font-semibold">Avoid scams</h2>
              <ul className="mt-4 space-y-3">
                {scamRules.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rust" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card overflow-hidden">
              <p className="px-5 pt-5 font-display text-xl font-semibold">Words in every listing</p>
              <dl className="mt-3 divide-y divide-line">
                {housingWords.map(([de, en]) => (
                  <div key={de} className="grid grid-cols-[150px_1fr] gap-3 px-5 py-2.5 text-sm">
                    <dt className="font-semibold">{de}</dt>
                    <dd className="text-muted">{en}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Panel>

        <Panel id="dorms" label="Dorms">
          <SectionHead eyebrow="Official student housing" title="Every Studierendenwerk, by state">
            Studierendenwerke are public, non-profit student services. Their dorms are the cheapest rooms in every city.
          </SectionHead>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {regions
              .filter((r) => r.studierendenwerke.length)
              .map((r) => (
                <div key={r.code} className="card p-5">
                  <Link to={`/regions/${r.slug}#housing`} className="font-display text-xl font-semibold hover:text-rust">
                    {r.name}
                  </Link>
                  <div className="mt-1">
                    {r.studierendenwerke.map((s) => (
                      <LinkRow key={s.name} href={s.url} title={s.name} text={s.serves} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </Panel>
      </Sections>
    </div>
  )
}
