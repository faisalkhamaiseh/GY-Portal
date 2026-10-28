import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bus, Car, TrainFront, Plane, Tag } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout } from '../components/ui.jsx'
import { borderTrips, borderNote, weekendPlans, travelApps, saveMoney } from '../data/budgetTravel.js'

const appIcons = [Bus, Car, TrainFront, Plane]

export default function TravelPage() {
  const [from, setFrom] = useState('all')
  const origins = [...new Set(borderTrips.map((t) => t.from))]
  const trips = from === 'all' ? borderTrips : borderTrips.filter((t) => t.from === from)

  return (
    <>
      <section className="border-b border-line bg-forest text-paper">
        <div className="wrap py-14 sm:py-20">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="eyebrow !text-gold">السفر الاقتصادي</p>
              <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.15] font-extrabold sm:text-6xl">
                شاهد أوروبا <span className="text-gold">بميزانية طالب.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
                تذكرتك الفصلية سفر مجاني في كل ألمانيا. اركب بها حتى الحدود، واستخدم FlixBus وBlaBlaCar للباقي، وأنفق مالك على الرحلة لا على المواصلات.
              </p>
            </div>
            <ShareButton className="btn border border-paper/25 text-paper hover:border-paper" title="السفر الاقتصادي لطلاب GJU" />
          </div>
        </div>
      </section>

      <div className="wrap space-y-24 pt-16">
        <section>
          <SectionHead
            id="borders"
            eyebrow="بتذكرة ألمانيا حتى الحدود"
            title="الدول المجاورة (شبه) مجاناً"
            action={
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2" aria-label="منطقة الانطلاق">
                <option value="all">من أي منطقة</option>
                {origins.map((o) => (
                  <option key={o} value={o}>
                    من {o}
                  </option>
                ))}
              </select>
            }
          >
            اركب القطارات الإقليمية (RB وRE وS-Bahn) حتى مدينة حدودية، ثم امشِ أو اركب مواصلات محلية قصيرة للدولة المجاورة.
          </SectionHead>
          <div className="grid gap-4 md:grid-cols-2">
            {trips.map((t) => (
              <article key={t.place} className="card p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-rust">
                    {t.from} ← {t.to}
                  </p>
                  <span className="chip bg-mint text-forest">{t.extra}</span>
                </div>
                <h3 dir="ltr" className="mt-2 text-start text-xl font-extrabold">
                  {t.place}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-2">{t.how}</p>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <Callout>{borderNote}</Callout>
          </div>
        </section>

        <section>
          <SectionHead id="weekends" eyebrow="خطط جاهزة" title="رحلات نهاية أسبوع تحت 50 يورو" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {weekendPlans.map((p) => (
              <article key={p.title} className="card flex flex-col overflow-hidden">
                <div className="bg-ink p-5 text-paper">
                  <p className="text-xs font-bold text-paper/60">{p.region}</p>
                  <h3 className="mt-1 text-xl font-extrabold">{p.title}</h3>
                  <p dir="ltr" className="num mt-3 text-start text-4xl font-black text-gold">
                    €{p.budget}
                  </p>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="leading-relaxed text-ink-2">{p.text}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                    {p.items.map(([k, v]) => (
                      <li key={k} className="flex justify-between gap-2">
                        <span className="text-muted">{k}</span>
                        <span className={`font-bold ${v === 0 ? 'text-forest' : ''}`}>{v === 0 ? 'مجاناً' : `${v} يورو`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHead id="apps" eyebrow="تطبيقات السفر" title="FlixBus وBlaBlaCar وغيرها" action={<Link to="/apps" className="btn-ghost">كل التطبيقات الأساسية <ArrowRight className="size-4" /></Link>} />
          <div className="grid gap-5 md:grid-cols-2">
            {travelApps.map((a, i) => {
              const Icon = appIcons[i]
              return (
                <article key={a.name} className="card p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-mint text-forest">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-2xl font-extrabold">{a.name}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-2">{a.text}</p>
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {a.tips.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-rust" /> {t}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
          <p className="mt-5 text-muted">
            تسافر أبعد؟ شاهد <Link to="/survival-map#airports" className="link">المطارات الاقتصادية قرب كل منطقة</Link>.
          </p>
        </section>

        <section>
          <SectionHead id="savings" eyebrow="مواسم الخصومات" title="متى وأين تشتري بأرخص سعر" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saveMoney.map((s) => (
              <article key={s.title} className="card p-5">
                <p className="flex items-center gap-1.5 text-sm font-bold text-rust">
                  <Tag className="size-4" /> {s.when}
                </p>
                <h3 className="mt-2 text-lg font-extrabold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{s.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
