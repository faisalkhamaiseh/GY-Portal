import { Landmark, Smartphone, HeartPulse, Lightbulb } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout } from '../components/ui.jsx'
import Sections, { Panel } from '../components/Sections.jsx'
import { comparisons, compareNote } from '../data/compare.js'

const icons = { banks: Landmark, mobile: Smartphone, health: HeartPulse }

export default function ComparePage() {
  return (
    <div className="wrap pt-6 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">مركز المقارنات</p>
          <h1 className="h-display mt-2 max-w-4xl text-4xl sm:text-6xl">قرّر في خمس دقائق، لا خمسة أسابيع</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">جداول جنباً إلى جنب للاختيارات الثلاثة التي يتخذها كل طالب GJU في أسبوعه الأول: البنك والشريحة والتأمين الصحي.</p>
        </div>
        <ShareButton title="مركز المقارنات لطلاب GJU" />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 max-lg:hidden">
        {comparisons.map((c) => {
          const Icon = icons[c.id]
          return (
            <a key={c.id} href={`#${c.id}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 font-bold hover:border-ink">
              <Icon className="size-4 text-forest" /> {c.title}
            </a>
          )
        })}
      </div>

      <Sections className="mt-8 lg:mt-20" label="أقسام الصفحة">
        {comparisons.map((c) => (
          <Panel key={c.id} id={c.id} label={c.title}>
            <SectionHead id={c.id} eyebrow={c.title} title={c.question}>
              {c.intro}
            </SectionHead>
            <div className="card overflow-x-auto">
              <table className="w-full min-w-[640px] text-start">
                <thead>
                  <tr className="border-b border-line bg-sand/60">
                    <th className="w-36 px-4 py-4" />
                    {c.options.map((o) => (
                      <th key={o} dir="ltr" className="px-4 py-4 text-start text-lg font-extrabold">
                        {o}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map(([label, ...cells]) => (
                    <tr key={label} className={`border-b border-line last:border-0 ${label === 'الأنسب لـ' ? 'bg-mint/50' : ''}`}>
                      <th className="px-4 py-3.5 text-start align-top text-sm font-bold text-muted">{label}</th>
                      {cells.map((cell, i) => (
                        <td key={i} className={`px-4 py-3.5 align-top leading-relaxed ${label === 'الأنسب لـ' ? 'font-bold text-forest' : 'text-ink-2'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex gap-4 rounded-2xl bg-ink p-5 text-paper sm:p-6">
              <Lightbulb className="mt-1 size-6 shrink-0 text-gold" />
              <div>
                <p className="text-sm font-bold text-gold">رأينا لطلاب GJU</p>
                <p className="mt-1 text-lg leading-relaxed text-paper/90">{c.verdict}</p>
              </div>
            </div>
          </Panel>
        ))}
      </Sections>

      <div className="mt-12">
        <Callout>{compareNote}</Callout>
      </div>
    </div>
  )
}
