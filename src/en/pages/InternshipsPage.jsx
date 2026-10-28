import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Briefcase, GraduationCap, Info } from 'lucide-react'
import { CompanyList, FairList } from '../components/Careers.jsx'
import VideoGrid from '../components/VideoGrid.jsx'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, LinkRow, Callout } from '../components/ui.jsx'
import { regions } from '../data/regions.js'
import { companies, applicationSteps, applicationTips, jobPortals } from '../data/careers.js'
import { internship } from '../data/guide.js'
import useVideos from '../lib/useVideos.js'

const german = regions.filter((r) => r.code !== 'INT')
const totalCompanies = Object.values(companies).reduce((n, l) => n + l.length, 0)

export default function InternshipsPage() {
  const [params] = useSearchParams()
  const [code, setCode] = useState(() => (german.some((r) => r.code === params.get('region')) ? params.get('region') : 'BY'))
  const videos = useVideos()
  const region = regions.find((r) => r.code === code)

  return (
    <>
      <section className="border-b border-line bg-ink text-paper">
        <div className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow !text-gold">Practical training & internship hub</p>
            <h1 className="mt-3 font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl">
              One semester of study.
              <br />
              <span className="text-gold italic">One semester of work.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
              Every GJU German Year has an academic semester and an internship semester. Find companies near your campus, plan your applications and catch the right career fairs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#companies" className="btn bg-paper text-ink hover:bg-gold">
                <Briefcase className="size-4" /> Browse {totalCompanies} employers
              </a>
              <ShareButton className="btn border border-paper/25 text-paper hover:border-paper" title="GJU Internship Hub" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end">
            {internship.rules.map((r) => (
              <div key={r.label} className="rounded-2xl border border-paper/15 p-4">
                <p className="font-mono text-[10px] tracking-wider text-paper/50 uppercase">{r.label}</p>
                <p className="mt-1 font-display text-xl font-semibold text-gold">{r.value}</p>
                <p className="mt-1 text-xs text-paper/60">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap space-y-24 pt-16">
        <section>
          <SectionHead eyebrow="Timeline" title="How to land your internship">
            Start in your first month in Germany. Treat the search like a course you take alongside your semester.
          </SectionHead>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {applicationSteps.map((s, i) => (
              <li key={s.title} className="card p-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl font-semibold text-rust">0{i + 1}</span>
                  <span className="font-mono text-[11px] tracking-wider text-muted uppercase">{s.when}</span>
                </div>
                <p className="mt-3 text-lg font-semibold">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="companies" className="scroll-mt-24">
          <SectionHead
            eyebrow="Employers by region"
            title={`Companies in ${region.name}`}
            action={
              <label className="flex items-center gap-3 text-sm">
                <span className="font-medium">Region</span>
                <select value={code} onChange={(e) => setCode(e.target.value)} className="rounded-xl border border-line bg-card px-3 py-2">
                  {german.map((r) => (
                    <option key={r.code} value={r.code}>
                      {r.name} ({companies[r.code]?.length ?? 0})
                    </option>
                  ))}
                </select>
              </label>
            }
          >
            Large employers that take interns in engineering, business and computer science. Click a company to search its current internship openings.
          </SectionHead>
          <CompanyList key={code} code={code} />
          <p className="mt-5 flex items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" />
            Companies confirmed by the GJU German Year office or past students get a green “Hosted GJU interns” badge and move to the top. Mid-sized local firms near your campus are often easier to get into than big brands.
          </p>
          <Link to={`/regions/${region.slug}#internships`} className="btn-ghost mt-5">
            More about {region.name}
          </Link>
        </section>

        <section>
          <SectionHead eyebrow="Career fairs" title={`Where to meet recruiters in ${region.name}`}>
            Dates change every year. Each card opens a search for the next date.
          </SectionHead>
          <FairList code={code} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="card p-6">
            <p className="eyebrow">Tips</p>
            <h2 className="mt-1 font-display text-3xl font-semibold">Applying in Germany</h2>
            <ul className="mt-5 space-y-3">
              {applicationTips.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed">
                  <GraduationCap className="mt-0.5 size-5 shrink-0 text-forest" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <p className="eyebrow">Search</p>
            <h2 className="mt-1 font-display text-3xl font-semibold">Job portals</h2>
            <div className="mt-3">
              {jobPortals.map((p) => (
                <LinkRow key={p.name} href={p.url} title={p.name} text={p.text} />
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionHead eyebrow="Watch" title="How other international students did it" />
          <VideoGrid videos={videos ? videos.topics?.internship || [] : null} limit={8} emptyQuery="internship in Germany international student" />
        </section>

        <Callout title="Before you sign anything.">
          Get the internship approved by GJU first, check that your residence permit allows it, and keep a copy of the contract. A mandatory internship (Pflichtpraktikum) does not count toward your 140 working days.
        </Callout>
      </div>
    </>
  )
}
