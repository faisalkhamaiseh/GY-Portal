import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BudgetPlanner, { BudgetMatrix } from '../components/BudgetPlanner.jsx'
import PriceTable from '../components/PriceTable.jsx'
import { SectionHead, Callout, EstimateNote } from '../components/ui.jsx'
import { BLOCKED_MONTHLY, cityTier, fixedMonthly, rentFor, tiers } from '../data/costs.js'
import { universities } from '../lib/data.js'

const cities = [...new Set(universities.filter((u) => !u.abroad).map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'de'))

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
      <p className="eyebrow">التكاليف · نطاقات تقديرية</p>
      <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">كم تكلّف سنتك الألمانية فعلاً؟</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        حسابك المجمّد يصرف حوالي {BLOCKED_MONTHLY} يورو شهرياً (تقديرياً؛ المبلغ الرسمي يتغير). حوالي {fixedMonthly.reduce((s, f) => s + f.amount, 0)} يورو منها تذهب للمصاريف الثابتة، والإيجار يحدد الباقي. اختر مدينتك وشاهد أين تذهب أموالك.
      </p>
      <EstimateNote className="mt-4" />

      <section className="mt-12">
        <SectionHead eyebrow="تفاعلي" title="مخطط الميزانية" />
        <BudgetPlanner key={city} initialCity={city} />
      </section>

      <section className="mt-24">
        <SectionHead
          id="prices"
          eyebrow="قائمة الأسعار"
          title="أسعار كل شيء"
          action={
            <label className="flex items-center gap-3">
              <span className="font-semibold">المدينة</span>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2">
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          }
        >
          تصنيف <span dir="ltr">{city}</span>: <strong className="text-ink">{tiers[rent.tier].label}</strong>. الإيجار: سكن طلابي {rent.dorm[0]}–{rent.dorm[1]} يورو، غرفة WG {rent.wg[0]}–{rent.wg[1]} يورو، شقة خاصة {rent.flat[0]}–{rent.flat[1]} يورو شهرياً.
        </SectionHead>
        <PriceTable factor={rent.factor} city={city} />
      </section>

      <section className="mt-24">
        <SectionHead eyebrow={city} title="كل الاحتمالات التسعة">
          كل تركيبة من السكن ونمط الحياة، مقارنة بـ{BLOCKED_MONTHLY} يورو شهرياً من حسابك المجمّد. بنفس تصميم دليل شمالكالدن.
        </SectionHead>
        <div className="mb-6 flex flex-wrap gap-2 text-sm font-bold">
          <span className="rounded-full border border-forest bg-mint px-3 py-1 text-forest">مغطّى: يتبقى 100+ يورو</span>
          <span className="rounded-full border border-[#9a6a12] bg-amber px-3 py-1 text-[#7a5410]">ضيّق: يتبقى 0–99 يورو</span>
          <span className="rounded-full border border-rust bg-blush px-3 py-1 text-rust-dark">فوق الميزانية</span>
        </div>
        <BudgetMatrix city={city} />
      </section>

      <section className="mt-24">
        <SectionHead eyebrow="مستويات الإيجار" title="كل مدينة مضيفة حسب مستوى الأسعار">
          نطاقات الإيجار واقعية للطلاب من مسوح الإيجار الألمانية وأسعار Studierendenwerk. غرفة WG في مدينة من المستوى 1 قد تكلف ثلاثة أضعاف مثيلتها في المستوى 5.
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {byTier.map((t) => (
            <div key={t.tier} className="card flex flex-col p-5">
              <p className="text-sm font-bold text-rust">المستوى {t.tier}</p>
              <p className="mt-1 text-xl font-extrabold">{t.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                سكن طلابي {t.dorm[0]}–{t.dorm[1]} يورو
                <br />
                غرفة WG {t.wg[0]}–{t.wg[1]} يورو
                <br />
                شقة {t.flat[0]}–{t.flat[1]} يورو
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {t.cities.map((c) => (
                  <button key={c} type="button" onClick={() => setCity(c)} dir="ltr" className="chip bg-sand text-ink-2 hover:bg-ink hover:text-paper">
                    {c}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12">
        <Callout title="كيف تقرأ هذه الأرقام؟">
          كل الأرقام تقديرية، حتى الرسوم الرسمية (الحساب المجمّد، التذكرة الفصلية، رسوم البث، تصريح الإقامة) التي تتغير باستمرار. الأسعار اليومية نطاقات نموذجية وليست عروض أسعار، وإيجارات شمالكالدن من Studierendenwerk Thüringen. تأكد من الرسوم والمواعيد من المصادر الرسمية قبل الدفع.
        </Callout>
      </div>
    </div>
  )
}
