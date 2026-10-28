import { useState } from 'react'
import { Apple, Download, Globe, Star } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { appCategories } from '../data/apps.js'

export default function AppsPage() {
  const [cat, setCat] = useState('all')
  const cats = cat === 'all' ? appCategories : appCategories.filter((c) => c.id === cat)
  const essentials = appCategories.flatMap((c) => c.apps.filter((a) => a.essential))

  return (
    <div className="wrap pt-6 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">دليل التطبيقات</p>
          <h1 className="h-display mt-2 max-w-4xl text-4xl sm:text-6xl">حمّلها قبل أن تسافر</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">التطبيقات التي يستخدمها طلاب GJU يومياً في ألمانيا، مرتبة حسب حاجتك لها. حمّلها في عمّان على شبكة Wi-Fi.</p>
        </div>
        <ShareButton title="التطبيقات الأساسية في ألمانيا لطلاب GJU" />
      </div>

      <section className="mt-10 overflow-hidden rounded-3xl bg-ink p-6 text-paper sm:p-8">
        <p className="flex items-center gap-2 font-bold text-gold">
          <Star className="size-4 fill-gold" /> اختياراتنا: التطبيقات الـ{essentials.length} الأساسية
        </p>
        <div className="no-scrollbar mt-5 -mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
          {essentials.map((a) => (
            <a key={a.name} href={a.web} target="_blank" rel="noopener noreferrer" className="group w-24 shrink-0 text-center">
              <span dir="ltr" className="mx-auto grid size-20 place-items-center rounded-[22px] text-xl font-black text-white shadow-lg transition-transform group-hover:-translate-y-1" style={{ background: a.color }}>
                {a.initials}
              </span>
              <span dir="ltr" className="mt-2 block truncate text-sm font-bold">
                {a.name}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="no-scrollbar sticky top-14 lg:top-16 z-20 -mx-4 mt-10 flex gap-2 overflow-x-auto border-b border-line bg-paper lg:bg-paper/95 px-4 py-3 lg:backdrop-blur sm:mx-0 sm:px-0" role="tablist" aria-label="فئات التطبيقات">
        {[{ id: 'all', title: 'كل التطبيقات' }, ...appCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full border px-4 py-1.5 font-bold ${cat === c.id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {cats.map((c) => (
        <section key={c.id} className="mt-10">
          <h2 className="text-2xl font-extrabold">{c.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.apps.map((a) => (
              <article key={a.name} className="card flex gap-4 p-4">
                <span dir="ltr" className="grid size-16 shrink-0 place-items-center rounded-[18px] text-lg font-black text-white shadow-md" style={{ background: a.color }} aria-hidden>
                  {a.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 dir="ltr" className="truncate font-extrabold">
                      {a.name}
                    </h3>
                    {a.essential && <span className="chip bg-gold/30 text-[#7a5410]">أساسي</span>}
                  </div>
                  <p className="mt-1 leading-snug text-ink-2">{a.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={a.play} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-paper hover:bg-forest">
                      <Download className="size-3.5" aria-hidden /> Google Play
                    </a>
                    <a href={a.ios} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-bold text-paper hover:bg-forest">
                      <Apple className="size-3.5" aria-hidden /> App Store
                    </a>
                    <a href={a.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-bold hover:border-ink">
                      <Globe className="size-3.5" /> الموقع
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <p className="mt-10 text-muted">روابط المتاجر تفتح نتائج البحث عن التطبيق في Google Play وApp Store. المربعات تستخدم الأحرف الأولى والألوان للتعرّف السريع، وليست الشعارات الرسمية.</p>
    </div>
  )
}
