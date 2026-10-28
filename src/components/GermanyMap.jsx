import { useState } from 'react'
import { Link } from 'react-router-dom'
import { regions, tileLayout } from '../data/regions.js'
import { universitiesIn } from '../lib/data.js'

// خريطة مربعات للولايات الـ16: نفس الجغرافيا تقريباً، وكل ولاية بنفس الحجم،
// ملوّنة حسب عدد الجامعات المضيفة. الشبكة تبقى من اليسار لليمين (الغرب يسار).

const counts = Object.fromEntries(regions.map((r) => [r.code, universitiesIn(r.code).length]))
const max = Math.max(...Object.values(counts))
const germanTotal = Object.keys(tileLayout).reduce((a, c) => a + counts[c], 0)

function shade(n) {
  const t = n / max
  if (t > 0.66) return 'bg-ink text-paper border-ink'
  if (t > 0.33) return 'bg-forest text-paper border-forest'
  if (t > 0.12) return 'bg-[#9dbfae] text-ink border-[#9dbfae]'
  return 'bg-mint text-ink border-[#cfe2d7]'
}

export default function GermanyMap({ activeCode }) {
  const [hover, setHover] = useState(null)
  const focus = regions.find((r) => r.code === (hover ?? activeCode))

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,640px)_1fr]">
      <div dir="ltr" className="grid w-full max-w-[640px] grid-cols-5 gap-1.5 [grid-auto-rows:clamp(62px,15vw,112px)] sm:gap-2.5" role="group" aria-label="الولايات الألمانية">
        {Object.entries(tileLayout).map(([code, [col, row, span = 1]]) => {
          const r = regions.find((x) => x.code === code)
          const n = counts[code]
          return (
            <Link
              key={code}
              to={`/regions/${r.slug}`}
              onMouseEnter={() => setHover(code)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(code)}
              onBlur={() => setHover(null)}
              style={{ gridColumn: `${col + 1} / span ${span}`, gridRow: row + 1 }}
              className={`group relative flex flex-col justify-between rounded-xl border p-2 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:rounded-2xl sm:p-3 ${shade(n)} ${activeCode === code ? 'ring-2 ring-rust ring-offset-2 ring-offset-paper' : ''}`}
            >
              <span className="text-[10px] font-bold opacity-90 sm:text-xs">{code}</span>
              <span dir="rtl" className="text-start">
                <span className="num block text-xl leading-none font-extrabold sm:text-3xl">{n}</span>
                <span className="sr-only mt-1 truncate text-[11px] leading-tight font-semibold opacity-85 sm:not-sr-only sm:block">{r.name}</span>
                <span className="sr-only"> جامعات مضيفة</span>
              </span>
            </Link>
          )
        })}
      </div>
      <div className="card p-5 lg:sticky lg:top-24">
        {focus ? (
          <>
            <p className="eyebrow">{focus.nameDe}</p>
            <p className="h-display mt-1 text-2xl">{focus.name}</p>
            <p className="mt-2 leading-relaxed text-muted">{focus.tagline}</p>
            <p className="mt-4 text-sm font-semibold text-ink-2">
              {counts[focus.code]} جامعات مضيفة · العاصمة {focus.capital}
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">اختر ولاية</p>
            <p className="h-display mt-1 text-2xl">16 ولاية، {germanTotal} حرماً جامعياً</p>
            <p className="mt-2 leading-relaxed text-muted">المربعات الأغمق فيها جامعات مضيفة أكثر. اضغط على أي ولاية لترى جامعاتها وفيديوهاتها وفعالياتها وتكاليفها وروابط السكن.</p>
          </>
        )}
        <div className="mt-5 flex items-center gap-2 text-xs text-muted">
          <span>أقل</span>
          <span className="h-2.5 w-5 rounded-sm bg-mint" />
          <span className="h-2.5 w-5 rounded-sm bg-[#9dbfae]" />
          <span className="h-2.5 w-5 rounded-sm bg-forest" />
          <span className="h-2.5 w-5 rounded-sm bg-ink" />
          <span>أكثر</span>
        </div>
      </div>
    </div>
  )
}
