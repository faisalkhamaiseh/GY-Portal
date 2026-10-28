import { useMemo, useState } from 'react'
import { Search, X, ScanBarcode, Check, Ban, Info } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { eNumbers, hiddenTerms, gelling, shoppingTips, statusInfo } from '../data/additives.js'
import { normalise } from '../lib/data.js'

function StatusChip({ status }) {
  const s = statusInfo[status]
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold" style={{ color: s.color, background: s.bg }}>
      <span className="size-2 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  )
}

const filters = [['all', 'الكل'], ...Object.entries(statusInfo).map(([k, v]) => [k, v.label])]

export default function IngredientsPage() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')

  const match = useMemo(() => {
    const n = normalise(q.trim()).replace(/\s+/g, '')
    return (item, ...fields) => (status === 'all' || item.status === status) && (!n || fields.some((f) => normalise(f).replace(/\s+/g, '').includes(n)))
  }, [q, status])

  const eList = eNumbers.filter((e) => match(e, e.code, e.de, e.name, e.where))
  const terms = hiddenTerms.filter((t) => match(t, t.de, t.ar, t.text))

  return (
    <div className="-mb-24 bg-navy pb-24 text-white">
      <section className="wrap pt-10 pb-8 sm:pt-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-[#f5a524]">
              <ScanBarcode className="size-4" /> دليل المكونات للتسوق
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight font-extrabold sm:text-6xl">هل هذا المنتج حلال؟ اقرأ الملصق في 10 ثوانٍ</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
              أرقام E والكلمات الألمانية التي قد تخفي دهن خنزير أو جيلاتين حيواني أو كحولاً. افتح هذه الصفحة على هاتفك في السوبرماركت، واكتب الرقم المكتوب على العبوة.
            </p>
          </div>
          <ShareButton className="btn border border-white/25 text-white hover:border-white" title="دليل المكونات الحلال في ألمانيا" />
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Object.entries(statusInfo).map(([k, s]) => (
            <div key={k} className="rounded-2xl border border-white/10 p-3" style={{ background: s.bg }}>
              <p className="flex items-center gap-2 font-extrabold" style={{ color: s.color }}>
                <span className="size-2.5 rounded-full" style={{ background: s.color }} /> {s.label}
              </p>
              <p className="mt-1 text-sm text-white/70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky search */}
      <div className="sticky top-16 z-20 border-y border-white/10 bg-navy/95 backdrop-blur">
        <div className="wrap flex flex-col gap-3 py-3 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
            <Search className="size-5 text-white/60" aria-hidden />
            <span className="sr-only">ابحث عن رقم E أو كلمة</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="اكتب الرقم أو الكلمة: 471، Gelatine، Alkohol"
              className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:font-normal placeholder:text-white/40 focus-visible:outline-none"
              inputMode="search"
              dir="auto"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="مسح">
                <X className="size-5 text-white/60" />
              </button>
            )}
          </label>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {filters.map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setStatus(id)}
                aria-pressed={status === id}
                className={`shrink-0 rounded-full px-4 py-2 font-bold transition-colors ${status === id ? 'bg-white text-navy' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* E-numbers grid */}
      <section className="wrap pt-10">
        <h2 className="font-display text-3xl font-extrabold">أرقام E والإضافات</h2>
        <p className="mt-2 text-white/60">مكتوبة على العبوة مثل "E471" أو باسمها الألماني.</p>
        {eList.length ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {eList.map((e) => (
              <article key={e.code} className="flex flex-col rounded-2xl border border-white/10 bg-navy-2 p-4" style={{ borderTop: `4px solid ${statusInfo[e.status].color}` }}>
                <div className="flex items-start justify-between gap-2">
                  <p dir="ltr" className="num text-2xl font-black tracking-tight">
                    {e.code}
                  </p>
                  <StatusChip status={e.status} />
                </div>
                <p className="mt-2 text-lg font-extrabold">{e.name}</p>
                <p dir="ltr" className="text-start text-sm text-white/50">
                  {e.de}
                </p>
                <p className="mt-3 leading-relaxed text-white/80">{e.text}</p>
                <p className="mt-auto pt-3 text-sm text-white/50">
                  <span className="font-bold text-white/70">يوجد في:</span> {e.where}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl bg-white/5 p-6 text-white/70">لا نتائج. جرّب رقماً آخر أو امسح البحث.</p>
        )}
      </section>

      {/* Hidden terms grid */}
      <section className="wrap pt-14">
        <h2 className="font-display text-3xl font-extrabold">كلمات مخفية على الملصق</h2>
        <p className="mt-2 text-white/60">مكونات لا تظهر كأرقام، لكنها تعني خنزيراً أو كحولاً أو مصدراً حيوانياً.</p>
        {terms.length ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((t) => (
              <article key={t.de} className="rounded-2xl border border-white/10 bg-navy-2 p-4" style={{ borderInlineStart: `4px solid ${statusInfo[t.status].color}` }}>
                <div className="flex items-start justify-between gap-2">
                  <p dir="ltr" className="text-start text-lg font-black">
                    {t.de}
                  </p>
                  <StatusChip status={t.status} />
                </div>
                <p className="mt-1 font-bold text-[#f5a524]">{t.ar}</p>
                <p className="mt-2 leading-relaxed text-white/75">{t.text}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl bg-white/5 p-6 text-white/70">لا نتائج لهذه الكلمة.</p>
        )}
      </section>

      {/* Gelling agents */}
      <section className="wrap pt-14">
        <h2 className="font-display text-3xl font-extrabold">الفرق بين مواد التهلّم النباتية والجيلاتين</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[gelling.plant, gelling.animal].map((g) => {
            const s = statusInfo[g.status]
            const Icon = g.status === 'ok' ? Check : Ban
            return (
              <article key={g.de} className="rounded-3xl border-2 p-6" style={{ borderColor: s.color, background: s.bg }}>
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-2xl" style={{ background: s.color }}>
                    <Icon className="size-6 text-white" />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold">{g.title}</p>
                    <p dir="ltr" className="text-start font-bold text-white/60">
                      {g.de}
                    </p>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-white/85">{g.text}</p>
                <ul className="mt-4 space-y-2">
                  {g.list.map((x) => (
                    <li key={x} className="flex items-start gap-2 font-semibold">
                      <span className="mt-2 size-2 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span dir="auto">{x}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      {/* Tips */}
      <section className="wrap pt-14">
        <div className="rounded-3xl bg-white/5 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-extrabold">نصائح للتسوق</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {shoppingTips.map((t) => (
              <li key={t} className="flex gap-3 leading-relaxed text-white/85">
                <Check className="mt-1 size-5 shrink-0 text-[#30a46c]" /> {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-start gap-2 text-sm text-white/50">
            <Info className="mt-0.5 size-4 shrink-0" />
            هذا الدليل للتوعية فقط. الآراء الفقهية تختلف في بعض المكونات (مثل الحشرات والكحول بكميات ضئيلة). عند الشك اختر منتجاً عليه شهادة حلال أو كلمة "vegan"، واسأل مرجعك الديني.
          </p>
        </div>
      </section>
    </div>
  )
}
