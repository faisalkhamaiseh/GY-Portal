import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import GermanyMap from '../components/GermanyMap.jsx'
import RegionArt from '../components/RegionArt.jsx'
import { SectionHead } from '../components/ui.jsx'
import { regions } from '../data/regions.js'
import { universitiesIn, cityList } from '../lib/data.js'

export default function RegionsPage() {
  return (
    <div className="wrap pt-6 lg:pt-12">
      <p className="eyebrow">المناطق</p>
      <h1 className="h-display mt-2 text-4xl sm:text-6xl">ألمانيا، ولاية بولاية</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        صفحة كل ولاية تجمع جامعاتها المضيفة وفيديوهاتها وفعالياتها وأماكنها السياحية وأسعارها المحلية وسكناتها الطلابية ونصائح الحياة اليومية.
      </p>
      <div className="mt-12">
        <GermanyMap />
      </div>

      <div className="mt-20">
        <SectionHead eyebrow="كل المناطق" title="اختر منطقتك" />
        <div className="space-y-4">
          {regions.map((r) => {
            const n = universitiesIn(r.code).length
            const cities = cityList(r.code)
            return (
              <Link key={r.code} to={`/regions/${r.slug}`} className="group card grid overflow-hidden transition-colors hover:border-ink md:grid-cols-[320px_1fr]">
                <RegionArt region={r} label={false} className="aspect-[2/1] w-full md:aspect-auto md:h-full" />
                <div className="flex flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-2xl font-extrabold group-hover:text-rust">{r.name}</h2>
                    <span className="text-sm font-semibold text-muted">{n} جامعات</span>
                  </div>
                  <p className="mt-1 font-semibold text-ink-2">{r.tagline}</p>
                  <p className="mt-3 line-clamp-2 leading-relaxed text-muted">{r.intro}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cities.slice(0, 10).map((c) => (
                      <span key={c} dir="ltr" className="chip bg-sand text-ink-2">
                        {c}
                      </span>
                    ))}
                    {cities.length > 10 && <span className="chip bg-sand text-ink-2">+{cities.length - 10}</span>}
                  </div>
                  <span className="mt-auto flex items-center gap-1 pt-4 font-bold text-forest">
                    استكشف {r.name} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
