import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Plane, KeyRound, Landmark, Briefcase, Play, ShieldCheck, Home } from 'lucide-react'
import { FinderBox } from '../components/UniversityFinder.jsx'
import GermanyMap from '../components/GermanyMap.jsx'
import RegionArt from '../components/RegionArt.jsx'
import { VideoCard, VideoModal, thumb } from '../components/VideoGrid.jsx'
import { SectionHead, Stat } from '../components/ui.jsx'
import { regions } from '../data/regions.js'
import { universities, universitiesIn, gjuVideo } from '../lib/data.js'
import { rentFor, BLOCKED_MONTHLY, priceGroups } from '../data/costs.js'
import useVideos from '../lib/useVideos.js'
import Photo from '../../components/Photo.jsx'
import { QuickActions } from '../../components/AppShell.jsx'
import { toolkit } from '../components/Header.jsx'

const quickPicks = [
  ['tum', 'TUM Munich'],
  ['thi-ingolstadt', 'Ingolstadt'],
  ['htw-berlin', 'HTW Berlin'],
  ['th-koeln-deutz', 'TH Köln'],
  ['schmalkalden', 'Schmalkalden'],
  ['frankfurt-uas', 'Frankfurt'],
]

const rentCities = ['München', 'Hamburg', 'Frankfurt am Main', 'Berlin', 'Köln', 'Stuttgart', 'Nürnberg', 'Hannover', 'Leipzig', 'Erfurt', 'Schmalkalden']

const journey = [
  { icon: Plane, when: 'Before you fly', title: 'Visa, blocked account, insurance, dorm', to: '/guide#before' },
  { icon: KeyRound, when: 'Week 1', title: 'Keys, Anmeldung, student card, bank, SIM', to: '/guide#week1' },
  { icon: Landmark, when: 'First month', title: 'Residence permit, learning agreement', to: '/guide#month1' },
  { icon: Briefcase, when: 'Semester 2', title: 'Your internship in a German company', to: '/internships' },
]

export default function HomePage() {
  const videos = useVideos()
  const [playing, setPlaying] = useState(null)
  const navigate = useNavigate()
  const german = universities.filter((u) => !u.abroad)

  const featured = useMemo(() => {
    if (!videos) return null
    const picks = ['schmalkalden', 'tum', 'kit', 'haw-hamburg', 'htw-dresden', 'rwth-aachen', 'thi-ingolstadt', 'hu-berlin']
    return picks.map((id) => videos.universities[id]?.[0]).filter(Boolean)
  }, [videos])

  const maxRent = rentFor('München').wg[1]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grain absolute inset-0 opacity-60" aria-hidden />
        <div className="wrap relative grid items-center gap-6 py-6 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20">
          <div className="min-w-0">
            <p className="eyebrow">GJU German Year · unofficial guide</p>
            <h1 className="h-display mt-4 text-4xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Your German Year,
              <br />
              <span className="text-rust italic">city by city.</span>
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-2 max-sm:line-clamp-3 sm:mt-6 sm:text-lg">
              All {universities.length} host universities in one place. For each one: campus and city videos, estimated rent and price ranges, trusted housing links, local events, and the paperwork that gets you through the year.
            </p>
            <div className="mt-5 max-w-xl lg:mt-8">
              <FinderBox />
              <div className="no-scrollbar -mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 [&>*]:shrink-0">
                <span className="font-mono text-[11px] text-muted uppercase">Popular</span>
                {quickPicks.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navigate(`/universities/${id}`)} className="rounded-full border border-line bg-card px-3 py-1 text-sm hover:border-ink">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[16/10] sm:aspect-[4/3.6] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(29,36,32,0.6)]">
              <Photo src="/images/schmalkalden-altmarkt.jpg" alt="The Altmarkt square and St. Georg church in Schmalkalden" width={1800} height={1633} sizes="(min-width: 1024px) 45vw, 100vw" priority className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute right-5 bottom-5 left-5 text-paper">
                <p className="font-mono text-[11px] tracking-widest uppercase opacity-80">Featured guide</p>
                <p className="font-display text-3xl font-semibold">Hochschule Schmalkalden</p>
                <Link to="/universities/schmalkalden" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink hover:bg-gold">
                  Open the full guide <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="absolute -top-5 -left-4 hidden w-56 rotate-[-3deg] rounded-2xl border border-line bg-card p-4 shadow-xl sm:block">
              <p className="eyebrow">Monthly payout</p>
              <p className="mt-1 font-display text-3xl font-semibold">€{BLOCKED_MONTHLY}</p>
              <p className="text-xs text-muted">from your blocked account (official 2026 amount). See how far it goes in each city.</p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying(gjuVideo)}
              className="absolute -top-8 -right-3 hidden w-56 rotate-[2deg] overflow-hidden rounded-2xl border border-line bg-card text-left shadow-xl sm:block"
            >
              <span className="relative block aspect-video">
                <img src={thumb(gjuVideo.id)} alt="" width={320} height={180} loading="lazy" decoding="async" className="size-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-ink/20">
                  <span className="grid size-10 place-items-center rounded-full bg-paper">
                    <Play className="ml-0.5 size-4 fill-ink" />
                  </span>
                </span>
              </span>
              <span className="block p-3 text-sm font-semibold">Watch: German-Jordanian University</span>
            </button>
          </div>
        </div>
        <div className="wrap relative pb-10 max-sm:hidden">
          <div className="card grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
            <Stat value={universities.length} label="host universities, from Aachen to Zwickau" />
            <Stat value={`${regions.length - 1} + ${universitiesIn('INT').length}`} label="German states + partners abroad" />
            <Stat value={videos ? new Set(['universities', 'cities', 'states'].flatMap((g) => Object.values(videos[g]).flat().map((v) => v.id))).size.toLocaleString('en-US') : '1,900+'} label="campus, city and region videos" />
            <Stat value={priceGroups.reduce((n, g) => n + g.items.length, 0)} label="everyday prices, adjusted to each city" />
          </div>
        </div>
      </section>

      <QuickActions title="Student toolkit" items={[{ to: '/internships', label: 'Internships', icon: Briefcase }, { to: '/housing', label: 'Housing', icon: Home }, ...toolkit.filter((t) => !['/videos', '/apps'].includes(t.to))]} />

      {/* Map */}
      <section className="wrap pt-12 lg:pt-20">
        <SectionHead eyebrow="Explore by region" title="Where in Germany will you live?" action={<Link to="/regions" className="btn-ghost">All regions <ArrowRight className="size-4" /></Link>}>
          Every state has its own feel, prices, festivals and transport network. Pick a state to see all its host universities, videos, events, costs and housing links together.
        </SectionHead>
        <GermanyMap />
      </section>

      {/* Journey */}
      <section className="wrap pt-12 lg:pt-24">
        <SectionHead eyebrow="The year at a glance" title="Do these in order">
          This checklist comes from the Schmalkalden Survival Book and works in every host city. Tick items off in the survival guide; your progress is saved in this browser.
        </SectionHead>
        <ol className="rail grid gap-4 md:grid-cols-4">
          {journey.map((j, i) => (
            <li key={j.when}>
              <Link to={j.to} className="group card flex h-full flex-col p-5 transition-colors hover:border-ink">
                <span className="flex items-center justify-between">
                  <span className="font-display text-4xl font-semibold text-rust">0{i + 1}</span>
                  <j.icon className="size-6 text-forest" aria-hidden />
                </span>
                <span className="mt-6 font-mono text-[11px] tracking-wider text-muted uppercase">{j.when}</span>
                <span className="mt-1 text-lg leading-snug font-semibold">{j.title}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-forest">
                  Checklist <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Toolkit */}
      <section className="wrap pt-12 max-lg:hidden lg:pt-24">
        <SectionHead eyebrow="Student toolkit" title="Everything else you need to survive the year">
          Internships, halal food, the rules nobody tells you, the best bank and SIM card, cheap weekend trips and the apps to install before you fly.
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{ to: '/internships', label: 'Internship hub', text: 'Employers by region, career fairs, tips', icon: Briefcase }, ...toolkit.filter((t) => !['/videos', '/guide'].includes(t.to))].map((t, i) => (
            <Link key={t.to} to={t.to} className={`group flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${i === 0 ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}>
              <span className={`grid size-11 place-items-center rounded-xl ${i === 0 ? 'bg-gold text-ink' : 'bg-mint text-forest'}`}>
                <t.icon className="size-5" />
              </span>
              <span className="mt-5 font-display text-xl font-semibold">{t.label}</span>
              <span className={`mt-1 text-sm ${i === 0 ? 'text-paper/70' : 'text-muted'}`}>{t.text}</span>
              <span className={`mt-auto flex items-center gap-1 pt-4 text-sm font-semibold ${i === 0 ? 'text-gold' : 'text-forest'}`}>
                Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Rent comparison */}
      <section className="mt-12 bg-ink py-12 text-paper lg:mt-24 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow !text-gold">Costs</p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">The same monthly budget, very different months.</h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/70">
              Rent decides your budget. A WG room in Munich can cost three times as much as one in Schmalkalden, while groceries, the semester ticket and health insurance cost about the same everywhere.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/costs" className="btn bg-paper text-ink hover:bg-gold">
                Open the budget planner <ArrowRight className="size-4" />
              </Link>
              <Link to="/housing" className="btn border border-paper/25 text-paper hover:border-paper">
                Housing links
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-3 flex justify-between font-mono text-[10px] tracking-wider text-paper/50 uppercase">
              <span>Typical WG room per month</span>
              <span>Dorm range shown in green</span>
            </div>
            <ul className="space-y-2.5">
              {rentCities.map((c) => {
                const r = rentFor(c)
                return (
                  <li key={c} className="grid grid-cols-[110px_1fr_88px] items-center gap-3 text-sm sm:grid-cols-[150px_1fr_96px]">
                    <span className="truncate">{c.replace(' am Main', '')}</span>
                    <span className="relative h-6 rounded bg-paper/5">
                      <span className="absolute inset-y-0 rounded bg-rust/90" style={{ left: `${(r.wg[0] / maxRent) * 100}%`, width: `${((r.wg[1] - r.wg[0]) / maxRent) * 100}%` }} />
                      <span className="absolute inset-y-2 rounded-full bg-[#7fc3a0]" style={{ left: `${(r.dorm[0] / maxRent) * 100}%`, width: `${((r.dorm[1] - r.dorm[0]) / maxRent) * 100}%` }} />
                    </span>
                    <span className="text-right font-mono text-xs text-paper/80">
                      €{r.wg[0]}–{r.wg[1]}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="wrap pt-12 lg:pt-24">
        <SectionHead eyebrow="Watch before you go" title="Campus tours from students who were there" action={<Link to="/videos" className="btn-ghost">Video library <ArrowRight className="size-4" /></Link>}>
          Every university and host city has its own playlist of campus tours, dorm room tours and city guides, filtered so that every video is about that place.
        </SectionHead>
        {featured ? (
          <div className="rail grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v) => (
              <VideoCard key={v.id} v={v} onPlay={setPlaying} />
            ))}
          </div>
        ) : (
          <div className="rail grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="aspect-video animate-pulse rounded-xl bg-sand" />
            ))}
          </div>
        )}
      </section>

      {/* Regions */}
      <section className="wrap pt-12 lg:pt-24">
        <SectionHead eyebrow="16 states" title="Find your region" />
        <div className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regions
            .filter((r) => r.code !== 'INT')
            .map((r) => (
              <Link key={r.code} to={`/regions/${r.slug}`} className="group card overflow-hidden transition-all hover:-translate-y-0.5 hover:border-ink">
                <RegionArt region={r} label={false} className="aspect-[2/1] w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="border-t border-line p-4">
                  <p className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-lg font-semibold">{r.name}</span>
                    <span className="font-mono text-xs text-muted">{universitiesIn(r.code).length} unis</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{r.tagline}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* Trust */}
      <section className="wrap pt-12 lg:pt-24">
        <div className="card grid gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:items-center">
          <ShieldCheck className="size-10 text-forest" aria-hidden />
          <div>
            <p className="font-display text-2xl font-semibold">Built from the GJU host-university list</p>
            <p className="mt-1 text-[15px] text-muted">
              The language, GPA and fee notes on every university page match the GJU host-university list for {german.length} German and {universities.length - german.length} international places. Always confirm before you choose.
            </p>
          </div>
          <Link to="/universities" className="btn-primary">
            Compare all universities
          </Link>
        </div>
      </section>

      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
