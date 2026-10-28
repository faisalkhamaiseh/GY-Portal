import { Landmark, Smartphone, HeartPulse, Lightbulb } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout } from '../components/ui.jsx'
import { comparisons, compareNote } from '../data/compare.js'

const icons = { banks: Landmark, mobile: Smartphone, health: HeartPulse }

export default function ComparePage() {
  return (
    <div className="wrap pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Comparisons hub</p>
          <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">Decide in five minutes, not five weeks</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">Side-by-side tables for the three choices every GJU student makes in the first week: a bank, a SIM card and a health insurer.</p>
        </div>
        <ShareButton title="Comparisons hub: GJU German Year Guide" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {comparisons.map((c) => {
          const Icon = icons[c.id]
          return (
            <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold hover:border-ink">
              <Icon className="size-4 text-forest" /> {c.title}
            </a>
          )
        })}
      </div>

      {comparisons.map((c) => (
        <section key={c.id} className="mt-20">
          <SectionHead id={c.id} eyebrow={c.title} title={c.question}>
            {c.intro}
          </SectionHead>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-sand/60">
                  <th className="w-40 px-4 py-4" />
                  {c.options.map((o) => (
                    <th key={o} className="px-4 py-4 font-display text-lg font-semibold">
                      {o}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map(([label, ...cells]) => (
                  <tr key={label} className={`border-b border-line last:border-0 ${label === 'Best for' ? 'bg-mint/50' : ''}`}>
                    <th className="px-4 py-3.5 align-top font-mono text-[11px] font-medium tracking-wider text-muted uppercase">{label}</th>
                    {cells.map((cell, i) => (
                      <td key={i} className={`px-4 py-3.5 align-top leading-relaxed ${label === 'Best for' ? 'font-semibold text-forest' : 'text-ink-2'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex gap-4 rounded-2xl bg-ink p-5 text-paper sm:p-6">
            <Lightbulb className="mt-0.5 size-6 shrink-0 text-gold" />
            <div>
              <p className="font-mono text-[11px] tracking-wider text-gold uppercase">Our take for GJU students</p>
              <p className="mt-1 leading-relaxed text-paper/85">{c.verdict}</p>
            </div>
          </div>
        </section>
      ))}

      <div className="mt-12">
        <Callout>{compareNote}</Callout>
      </div>
    </div>
  )
}
