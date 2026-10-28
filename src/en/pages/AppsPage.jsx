import { useState } from 'react'
import { Apple, Download, Globe, Star } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { appCategories } from '../data/apps.js'

export default function AppsPage() {
  const [cat, setCat] = useState('all')
  const cats = cat === 'all' ? appCategories : appCategories.filter((c) => c.id === cat)
  const essentials = appCategories.flatMap((c) => c.apps.filter((a) => a.essential))

  return (
    <div className="wrap pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">App directory</p>
          <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">Install these before you fly</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">The apps GJU students use every day in Germany, sorted by what you need them for. Download them in Amman over Wi-Fi.</p>
        </div>
        <ShareButton title="Essential apps for Germany: GJU German Year Guide" />
      </div>

      {/* Essentials shelf */}
      <section className="mt-10 overflow-hidden rounded-3xl bg-ink p-6 text-paper sm:p-8">
        <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-gold uppercase">
          <Star className="size-3.5 fill-gold" /> Editors' picks: the essential {essentials.length}
        </p>
        <div className="no-scrollbar mt-5 -mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
          {essentials.map((a) => (
            <a key={a.name} href={a.web} target="_blank" rel="noopener noreferrer" className="group w-24 shrink-0 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-[22px] text-xl font-bold text-white shadow-lg transition-transform group-hover:-translate-y-1" style={{ background: a.color }}>
                {a.initials}
              </span>
              <span className="mt-2 block truncate text-xs font-semibold">{a.name}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="no-scrollbar sticky top-16 z-20 -mx-4 mt-10 flex gap-2 overflow-x-auto border-b border-line bg-paper/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0" role="tablist" aria-label="App categories">
        {[{ id: 'all', title: 'All apps' }, ...appCategories].map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={cat === c.id}
            onClick={() => setCat(c.id)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${cat === c.id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {cats.map((c) => (
        <section key={c.id} className="mt-10">
          <h2 className="font-display text-2xl font-semibold">{c.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.apps.map((a) => (
              <article key={a.name} className="card flex gap-4 p-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-[18px] text-lg font-bold text-white shadow-md" style={{ background: a.color }} aria-hidden>
                  {a.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold">{a.name}</h3>
                    {a.essential && <span className="chip bg-gold/30 text-[#7a5410]">Essential</span>}
                  </div>
                  <p className="mt-1 text-sm leading-snug text-ink-2">{a.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={a.play} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper hover:bg-forest">
                      <Download className="size-3.5" aria-hidden /> Google Play
                    </a>
                    <a href={a.ios} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper hover:bg-forest">
                      <Apple className="size-3.5" aria-hidden /> App Store
                    </a>
                    <a href={a.web} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold hover:border-ink">
                      <Globe className="size-3.5" /> Website
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      <p className="mt-10 text-sm text-muted">Store links open the app's search results on Google Play and the App Store. App tiles use initials and colours for quick recognition; they are not official logos.</p>
    </div>
  )
}
