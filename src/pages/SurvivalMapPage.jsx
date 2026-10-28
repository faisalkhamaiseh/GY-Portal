import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, X, TrainFront, Plane, Moon, ScanBarcode } from 'lucide-react'
import { HalalMap, AirportList } from '../components/SurvivalMap.jsx'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, LinkRow, Callout } from '../components/ui.jsx'
import { regions } from '../data/regions.js'
import { dticket, airlines, europeTrips, halalTips } from '../data/travel.js'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'de'))
const german = regions.filter((r) => r.code !== 'INT')

export default function SurvivalMapPage() {
  const [params] = useSearchParams()
  const [code, setCode] = useState(() => (german.some((r) => r.code === params.get('region')) ? params.get('region') : 'TH'))
  const startCity = cities.includes(params.get('city')) ? params.get('city') : 'Schmalkalden'

  return (
    <div className="wrap pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">خريطة البقاء الثقافية</p>
          <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">الطعام الحلال والمساجد والتنقل</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
            اعثر على السوبرماركتات التركية والعربية والملاحم الحلال والمساجد في أي مدينة مضيفة. ثم اعرف ماذا تغطي تذكرة ألمانيا ومن أين تنطلق الرحلات الرخيصة.
          </p>
        </div>
        <ShareButton title="خريطة البقاء الثقافية لطلاب GJU" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          ['#halal', Moon, 'دليل الطعام الحلال'],
          ['/ingredients', ScanBarcode, 'دليل المكونات (أرقام E)'],
          ['#ticket', TrainFront, 'تذكرة ألمانيا'],
          ['#airports', Plane, 'المطارات الاقتصادية'],
        ].map(([href, Icon, label]) =>
          href.startsWith('#') ? (
            <a key={href} href={href} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-bold hover:border-ink">
              <Icon className="size-4 text-forest" /> {label}
            </a>
          ) : (
            <Link key={href} to={href} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 font-bold text-white">
              <Icon className="size-4 text-[#f5a524]" /> {label}
            </Link>
          ),
        )}
      </div>

      <section className="mt-16">
        <SectionHead id="halal" eyebrow="دليل الطعام الحلال" title="اعثر على الطعام الحلال في مدينتك">
          اختر مدينتك وما تحتاجه. الخريطة المباشرة تعرض الملاحم الحلال والسوبرماركتات التركية والعربية والمطاعم العربية والمساجد القريبة.
        </SectionHead>
        <HalalMap key={startCity} cities={cities} initialCity={startCity} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {halalTips.map((t) => (
            <article key={t.title} className="card p-5">
              <h3 className="text-lg font-extrabold">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-2">{t.text}</p>
            </article>
          ))}
        </div>
        <Link to="/ingredients" className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-navy p-5 text-white">
          <span>
            <span className="block text-lg font-extrabold">هل هذا المنتج حلال؟</span>
            <span className="block text-white/70">أرقام E والجيلاتين والكحول المخفي في جدول واحد للهاتف.</span>
          </span>
          <ScanBarcode className="size-8 shrink-0 text-[#f5a524]" />
        </Link>
      </section>

      <section className="mt-24">
        <SectionHead id="ticket" eyebrow="المواصلات" title="تذكرة ألمانيا (Deutschlandticket) ببساطة">
          تذكرة واحدة لكل باص وترام ومترو وقطار إقليمي في ألمانيا. الطلاب يحصلون عليها غالباً كتذكرة فصلية مشمولة في الرسوم الفصلية. السعر الحالي على الموقع الرسمي.
        </SectionHead>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border-2 border-forest bg-mint/60 p-6">
            <p className="font-extrabold text-forest">مشمول</p>
            <ul className="mt-4 space-y-3">
              {dticket.covered.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-forest" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-rust bg-blush/60 p-6">
            <p className="font-extrabold text-rust">غير مشمول</p>
            <ul className="mt-4 space-y-3">
              {dticket.notCovered.map((x) => (
                <li key={x} className="flex gap-3">
                  <X className="mt-0.5 size-5 shrink-0 text-rust" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-5 card p-6">
          <p className="text-xl font-extrabold">نصائح</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            {dticket.tips.map((t) => (
              <li key={t} className="flex gap-3 leading-relaxed text-ink-2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-rust" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-x-10 border-t border-line pt-2 md:grid-cols-2">
            <LinkRow href="https://www.bahn.com/en" title="Deutsche Bahn" text="المواعيد وتذاكر Sparpreis وBahnCard. حمّل تطبيق DB Navigator." />
            <LinkRow href="https://www.flixbus.de/" title="FlixBus" text="باصات رخيصة بعيدة المدى في أوروبا." />
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHead
          id="airports"
          eyebrow="سافر في أوروبا"
          title="أقرب المطارات الاقتصادية"
          action={
            <label className="flex items-center gap-3">
              <span className="font-semibold">المنطقة</span>
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
          شركات الطيران الاقتصادية التي تخدم كل مطار عادةً. الخطوط تتغير كل موسم، لذلك تفتح كل بطاقة بحث رحلات مباشراً.
        </SectionHead>
        <AirportList code={code} />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card overflow-hidden">
            <p className="px-5 pt-5 text-xl font-extrabold">أفكار لرحلات نهاية الأسبوع</p>
            <table className="mt-3 w-full text-start">
              <thead className="border-y border-line text-xs font-bold text-muted">
                <tr>
                  <th className="px-5 py-2.5 text-start">إلى</th>
                  <th className="hidden px-5 py-2.5 text-start sm:table-cell">كيف</th>
                  <th className="px-5 py-2.5 text-start">السعر المعتاد</th>
                </tr>
              </thead>
              <tbody>
                {europeTrips.map((t) => (
                  <tr key={t.to} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-bold">
                      {t.to}
                      <span className="mt-0.5 block text-sm font-normal text-muted sm:hidden">{t.how}</span>
                    </td>
                    <td className="hidden px-5 py-3 text-muted sm:table-cell">{t.how}</td>
                    <td className="px-5 py-3 text-sm font-bold whitespace-nowrap">{t.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="eyebrow">شركات الطيران</p>
            <div className="mt-2">
              {airlines.map((a) => (
                <LinkRow key={a.name} href={a.url} title={a.name} text={a.text} />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Callout title="مسافر خارج ألمانيا؟">
            احمل دائماً جوازك وتصريح إقامتك (أو تأشيرتك مع رسالة موعد التصريح). تذكرتك الفصلية تتوقف عند الحدود، والطيران الاقتصادي يفرض رسوماً على أي حقيبة أكبر من حقيبة اليد الصغيرة.
          </Callout>
        </div>
      </section>
    </div>
  )
}
