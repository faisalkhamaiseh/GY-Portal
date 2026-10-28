import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShieldAlert, Building2 } from 'lucide-react'
import { SectionHead, LinkRow, EstimateNote } from '../components/ui.jsx'
import { portals, scamRules, housingWords, housingTimeline, dormSearch } from '../data/housing.js'
import { regions } from '../data/regions.js'
import { rentFor } from '../data/costs.js'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'de'))

export default function HousingPage() {
  const [params] = useSearchParams()
  const [city, setCity] = useState(() => (cities.includes(params.get('city')) ? params.get('city') : ''))
  const rent = city ? rentFor(city) : null
  const region = city ? regions.find((r) => r.code === universities.find((u) => u.city === city)?.region) : null

  return (
    <div className="wrap pt-12">
      <p className="eyebrow">السكن</p>
      <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">اعثر على غرفة تثق بها</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        معظم طلاب GJU يسكنون في سكن Studierendenwerk: رخيص ومفروش وشامل الفواتير. إن فاتك، استخدم المواقع الموثوقة أدناه، وابدأ مبكراً، ولا تدفع أبداً قبل أن ترى الغرفة.
      </p>

      <section className="mt-10 card p-5 sm:p-7">
        <label className="block max-w-md">
          <span className="text-sm font-bold text-muted">ابحث عن غرف في مدينتك المضيفة</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-2 w-full rounded-xl border border-line bg-paper px-3 py-3 text-base">
            <option value="">اختر مدينة…</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {city && <EstimateNote className="mt-4" />}
        {city && (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p dir="ltr" className="text-start text-2xl font-extrabold">
                {city}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ['سكن طلابي', rent.dorm],
                  ['غرفة WG', rent.wg],
                  ['شقة', rent.flat],
                ].map(([k, [a, b]]) => (
                  <div key={k} className="rounded-xl bg-sand p-3">
                    <p className="text-xs font-bold text-muted">{k}</p>
                    <p dir="ltr" className="num text-start font-extrabold">
                      €{a}–{b}
                    </p>
                  </div>
                ))}
              </div>
              <a href={dormSearch(city)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4">
                <Building2 className="size-4" /> ابحث عن سكن طلابي في <span dir="ltr">{city}</span>
              </a>
              {region && (
                <div className="mt-4">
                  {region.studierendenwerke
                    .filter((s) => s.serves.length)
                    .slice(0, 8)
                    .map((s) => (
                      <LinkRow key={s.name} href={s.url} title={s.name} text={`يخدم: ${s.serves}`} badge="رسمي" />
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

      <section className="mt-20">
        <SectionHead eyebrow="الجدول الزمني" title="ماذا تفعل ومتى" />
        <ol className="grid gap-4 md:grid-cols-4">
          {housingTimeline.map((t, i) => (
            <li key={t.title} className="card p-5">
              <p className="num text-3xl font-black text-rust">0{i + 1}</p>
              <p className="mt-3 text-sm font-bold text-muted">{t.when}</p>
              <p className="mt-1 text-lg font-extrabold">{t.title}</p>
              <p className="mt-2 leading-relaxed text-ink-2">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="card p-5 sm:p-7">
          <p className="eyebrow">مواقع موثوقة</p>
          <h2 className="mt-1 text-3xl font-extrabold">غرف في شقق مشتركة وشقق خاصة</h2>
          <div className="mt-3">
            {portals.map((p) => (
              <LinkRow key={p.name} href={p.url} title={p.name} text={`${p.kind}. ${p.text}`} badge={p.trust} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-rust bg-blush/60 p-5 sm:p-7">
            <ShieldAlert className="size-8 text-rust" aria-hidden />
            <h2 className="mt-3 text-3xl font-extrabold">احذر من النصب</h2>
            <ul className="mt-4 space-y-3">
              {scamRules.map((r) => (
                <li key={r} className="flex gap-3 leading-relaxed">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-rust" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="card overflow-hidden">
            <p className="px-5 pt-5 text-xl font-extrabold">كلمات ستراها في كل إعلان</p>
            <dl className="mt-3 divide-y divide-line">
              {housingWords.map(([de, ar]) => (
                <div key={de} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-3 px-5 py-2.5">
                  <dt dir="ltr" className="text-start font-bold">
                    {de}
                  </dt>
                  <dd className="text-muted">{ar}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <SectionHead eyebrow="السكن الطلابي الرسمي" title="كل مؤسسات Studierendenwerk حسب الولاية">
          Studierendenwerke خدمات طلابية حكومية غير ربحية. سكناتها أرخص الغرف في كل مدينة.
        </SectionHead>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {regions
            .filter((r) => r.studierendenwerke.length)
            .map((r) => (
              <div key={r.code} className="card p-5">
                <Link to={`/regions/${r.slug}#housing`} className="text-xl font-extrabold hover:text-rust">
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
      </section>
    </div>
  )
}
