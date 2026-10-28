import { useEffect, useState } from 'react'
import { Check, Phone, Stethoscope } from 'lucide-react'
import { SectionHead, LinkRow, Callout, OfficialLink } from '../components/ui.jsx'
import { checklist, internship, phrasebook, emergency, semester } from '../data/guide.js'

const KEY = 'gju-guide-checklist'

function loadTicks() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

export default function GuidePage() {
  const [ticks, setTicks] = useState(loadTicks)
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ticks))
    } catch {
      // Storage can be blocked (private mode); ticks then last for this visit.
    }
  }, [ticks])

  const total = checklist.reduce((n, g) => n + g.items.length, 0)
  const done = Object.values(ticks).filter(Boolean).length

  return (
    <div className="wrap pt-12">
      <p className="eyebrow">Survival guide</p>
      <h1 className="h-display mt-2 max-w-4xl text-5xl sm:text-6xl">Everything that is the same in every city</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">
        The arrival plan, internship rules, a phrasebook for real situations, and emergency numbers. Based on the Schmalkalden Survival Book and adapted for every host city.
      </p>

      {/* Checklist */}
      <section className="mt-12">
        <SectionHead
          eyebrow="Arrival plan"
          title="Do these in order"
          action={
            <div className="w-full max-w-xs">
              <div className="flex justify-between font-mono text-xs">
                <span>Your progress</span>
                <span>
                  {done}/{total}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-sand">
                <div className="h-full rounded-full bg-forest transition-all" style={{ width: `${(done / total) * 100}%` }} />
              </div>
            </div>
          }
        >
          Tap a box to tick it. Your ticks are saved in this browser.
        </SectionHead>
        <div className="space-y-12">
          {checklist.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-28">
              <h3 className="flex items-center gap-3 font-display text-2xl font-semibold">
                {group.title}
                <span className="chip bg-mint text-forest">{group.place}</span>
              </h3>
              {group.note && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{group.note}</p>}
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => {
                  const on = !!ticks[item.id]
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => setTicks((t) => ({ ...t, [item.id]: !t[item.id] }))}
                        aria-pressed={on}
                        className={`flex w-full gap-4 rounded-2xl border p-4 text-left transition-colors ${on ? 'border-forest bg-mint/60' : 'border-line bg-card hover:border-ink'}`}
                      >
                        <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 ${on ? 'border-forest bg-forest text-paper' : 'border-ink'}`}>
                          {on && <Check className="size-4" />}
                        </span>
                        <span>
                          <span className={`block font-semibold ${on ? 'text-forest line-through decoration-forest/40' : ''}`}>{item.title}</span>
                          <span className="mt-1 block text-sm leading-relaxed text-ink-2">{item.text}</span>
                        </span>
                      </button>
                      {item.official && (
                        <div className="ml-10 mt-2 flex flex-wrap gap-2">
                          {[].concat(item.official).map((link) => (
                            <OfficialLink key={link.href} {...link} />
                          ))}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Year timeline */}
      <section className="mt-24">
        <SectionHead eyebrow="Calendar" title="Your year, step by step" />
        <ol className="relative grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {semester.map((s) => (
            <li key={s.month} className="card p-4">
              <p className="font-display text-2xl font-semibold text-rust">{s.month}</p>
              <p className="mt-2 text-sm leading-snug text-ink-2">{s.label}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Internship */}
      <section className="mt-24">
        <SectionHead id="internship" eyebrow="Semester 2" title="Internship and side jobs">
          The German Year has two halves: one semester at your host university, then an internship in a German company. Treat the internship search as a course you take during your first semester.
        </SectionHead>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card p-6">
            <p className="eyebrow">Internship plan</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">How to land it</h3>
            <ol className="mt-4 space-y-3">
              {internship.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[15px] leading-relaxed">
                  <span className="font-display text-lg font-semibold text-rust">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="mt-5 border-t border-line pt-3">
              {internship.portals.map((p) => (
                <LinkRow key={p.url} href={p.url} title={p.name} />
              ))}
            </div>
          </div>
          <div className="card p-6">
            <p className="eyebrow">Rules for non-EU students</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">Working while you study</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {internship.rules.map((r) => (
                <div key={r.label} className="rounded-xl bg-sand p-4">
                  <p className="font-mono text-[10px] tracking-wider text-muted uppercase">{r.label}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{r.value}</p>
                  <p className="mt-1 text-xs text-ink-2">{r.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">General principles only. Check the wording on your residence permit and the current law before you start any job.</p>
            <OfficialLink {...internship.rulesSource} className="mt-3" />
          </div>
        </div>
      </section>

      {/* Phrasebook */}
      <section className="mt-24">
        <SectionHead id="phrasebook" eyebrow="Phrasebook" title="German for real situations">
          Smaller towns speak less English than Berlin. These lines get you through the first weeks.
        </SectionHead>
        <div className="grid gap-5 md:grid-cols-2">
          {phrasebook.map((g) => (
            <div key={g.group} className="card overflow-hidden">
              <p className="bg-mint px-5 py-2.5 font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">{g.group}</p>
              <dl className="divide-y divide-line">
                {g.lines.map(([de, en]) => (
                  <div key={de} className="grid gap-1 px-5 py-3 sm:grid-cols-2 sm:gap-4">
                    <dt className="font-semibold" lang="de">
                      {de}
                    </dt>
                    <dd className="text-sm text-muted">{en}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Emergencies */}
      <section className="mt-24">
        <SectionHead id="emergency" eyebrow="Emergencies" title="Save these numbers today">
          Calls are free from any phone.
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {emergency.map((e) => (
            <a key={e.number} href={`tel:${e.number.replace(/\s/g, '')}`} className="card border-t-4 border-t-rust p-5 transition-colors hover:border-ink">
              <Phone className="size-5 text-rust" aria-hidden />
              <p className="mt-3 font-mono text-3xl font-medium text-rust">{e.number}</p>
              <p className="mt-1 text-sm text-ink-2">{e.label}</p>
            </a>
          ))}
        </div>
        <div className="mt-5">
          <Callout title="Seeing a doctor.">
            <Stethoscope className="mr-1 inline size-4 text-forest" aria-hidden />
            Go to a general practitioner (Hausarzt) first, with your insurance card. Pharmacies (Apotheke) sell medicine; one is always open at night, listed on the door of every pharmacy. Lost passport: report it to the police, then contact the Jordanian Embassy in Berlin.
          </Callout>
        </div>
      </section>
    </div>
  )
}
