import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Train, CloudSun, Utensils, Moon, Lightbulb, Building2 } from 'lucide-react'
import RegionArt from '../components/RegionArt.jsx'
import VideoGrid from '../components/VideoGrid.jsx'
import UniversityCard from '../components/UniversityCard.jsx'
import PriceTable from '../components/PriceTable.jsx'
import { SectionHead, LinkRow, Callout, EstimateNote } from '../components/ui.jsx'
import { regionBySlug, regions } from '../data/regions.js'
import { portals, dormSearch } from '../data/housing.js'
import { rentFor, tiers } from '../data/costs.js'
import { universitiesIn, cityList, coverVideoId } from '../lib/data.js'
import useVideos, { mergeVideos } from '../lib/useVideos.js'
import { CompanyList, FairList } from '../components/Careers.jsx'
import { HalalMap, AirportList } from '../components/SurvivalMap.jsx'
import ShareButton from '../components/ShareButton.jsx'
import NotFound from './NotFound.jsx'

const sections = [
  ['universities', 'Universities'],
  ['videos', 'Videos'],
  ['events', 'Events'],
  ['todo', 'Things to do'],
  ['costs', 'Costs'],
  ['housing', 'Housing'],
  ['internships', 'Internships'],
  ['halal', 'Halal & travel'],
  ['life', 'Daily life'],
]

export default function RegionPage() {
  const { slug } = useParams()
  const region = regionBySlug[slug]
  const videos = useVideos()
  const [videoFilter, setVideoFilter] = useState('all')

  const unis = region ? universitiesIn(region.code) : []
  const cities = region ? cityList(region.code) : []
  const abroad = region?.code === 'INT'

  const allVideos = useMemo(() => {
    if (!videos || !region) return null
    const regionV = videos.states[region.code] || []
    const cityV = cities.flatMap((c) => videos.cities[c] || [])
    const uniV = unis.flatMap((u) => videos.universities[u.id] || [])
    if (videoFilter === 'region') return regionV
    if (videoFilter === 'cities') return mergeVideos(cityV)
    if (videoFilter === 'campus') return mergeVideos(uniV)
    // Interleave so the first rows mix region, city and campus videos.
    const out = []
    const lists = [regionV, mergeVideos(cityV), mergeVideos(uniV)]
    for (let i = 0; out.length < regionV.length + cityV.length + uniV.length && i < 400; i++) {
      for (const l of lists) if (l[i]) out.push(l[i])
    }
    return mergeVideos(out)
  }, [videos, region, videoFilter, cities, unis])

  const [costCity, setCostCity] = useState(null)
  if (!region) return <NotFound />

  const activeCostCity = costCity ?? (cities.includes(region.capital) ? region.capital : cities[0])
  const cheapest = [...cities].sort((a, b) => rentFor(a).wg[0] - rentFor(b).wg[0])
  const idx = regions.findIndex((r) => r.code === region.code)
  const next = regions[(idx + 1) % regions.length]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <RegionArt region={region} className="absolute inset-0 -z-10 size-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-paper via-paper/85 to-paper/10" />
        <div className="wrap py-14 sm:py-20">
          <div className="flex items-center justify-between gap-4">
            <Link to="/regions" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 hover:text-ink">
              <ArrowLeft className="size-4" /> All regions
            </Link>
            <ShareButton title={`${region.name}: German Year Guide`} />
          </div>
          <p className="eyebrow mt-8">{region.nameDe}</p>
          <h1 className="h-display mt-2 max-w-3xl text-5xl leading-[1] sm:text-7xl">{region.name}</h1>
          <p className="mt-4 max-w-2xl font-display text-xl text-ink-2 italic sm:text-2xl">{region.tagline}</p>
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-2">{region.intro}</p>
          <dl className="mt-8 flex flex-wrap gap-3">
            {[
              ['Host universities', unis.length],
              [abroad ? 'Countries' : 'Host cities', abroad ? new Set(unis.map((u) => u.countryName)).size : cities.length],
              !abroad && ['Capital', region.capital],
              !abroad && ['Rent level', region.rentIndex.split(/[.;]/)[0]],
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-card/90 px-4 py-2.5 backdrop-blur">
                  <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">{k}</dt>
                  <dd className="max-w-[260px] text-sm font-semibold">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {/* Section nav */}
      <nav className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur" aria-label="On this page">
        <div className="wrap no-scrollbar flex gap-1 overflow-x-auto py-2">
          {sections
            .filter(([id]) => !abroad || ['universities', 'videos'].includes(id))
            .map(([id, label]) => (
              <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-2 hover:bg-sand">
                {label}
              </a>
            ))}
        </div>
      </nav>

      <div className="wrap space-y-24 pt-16">
        {/* Universities */}
        <section>
          <SectionHead id="universities" eyebrow={`${unis.length} host universities`} title={abroad ? 'Partner universities abroad' : `Study in ${region.name}`}>
            Each guide has campus videos, the GJU entry conditions, local prices and housing links.
          </SectionHead>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {unis.map((u) => (
              <UniversityCard key={u.id} u={u} videoId={coverVideoId(videos, u.id)} />
            ))}
          </div>
        </section>

        {/* Videos */}
        <section>
          <SectionHead
            id="videos"
            eyebrow="Watch"
            title={`${region.name} on video`}
            action={
              <div className="flex flex-wrap gap-2">
                {[
                  ['all', 'Everything'],
                  ['region', 'The region'],
                  ['cities', 'The cities'],
                  ['campus', 'Campus tours'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setVideoFilter(id)}
                    aria-pressed={videoFilter === id}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${videoFilter === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            }
          >
            Travel guides, city walks and campus tours for every host city in {region.name}.
          </SectionHead>
          <VideoGrid key={videoFilter} videos={allVideos} limit={12} emptyQuery={`${region.name} travel`} />
        </section>

        {!abroad && (
          <>
            {/* Events */}
            <section>
              <SectionHead id="events" eyebrow="Calendar" title="Festivals & events worth your weekend">
                Most are free to enter. With your semester ticket, getting there on regional trains costs nothing.
              </SectionHead>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {region.events.map((e) => (
                  <article key={e.name} className="card flex gap-4 p-5">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blush text-rust">
                      <CalendarDays className="size-5" aria-hidden />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] tracking-wider text-rust uppercase">{e.when}</p>
                      <h3 className="mt-1 font-display text-lg leading-snug font-semibold">{e.name}</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                        <MapPin className="size-3" /> {e.city}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">{e.text}</p>
                    </div>
                  </article>
                ))}
                <article className="card flex flex-col justify-between bg-ink p-5 text-paper">
                  <p className="font-mono text-[11px] tracking-wider text-gold uppercase">Every city</p>
                  <p className="mt-2 font-display text-xl font-semibold">Christmas markets</p>
                  <p className="mt-2 text-sm text-paper/70">From late November, every town square in Germany fills with stalls, lights and roasted almonds. Look for halal crêpes and children's punch (non-alcoholic).</p>
                </article>
              </div>
            </section>

            {/* Things to do */}
            <section>
              <SectionHead id="todo" eyebrow="Explore" title="Things to do" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {region.highlights.map((h) => (
                  <article key={h.title} className="card p-5">
                    <p className="eyebrow">{h.kind}</p>
                    <h3 className="mt-2 font-display text-xl font-semibold">{h.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{h.text}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* Costs */}
            <section>
              <SectionHead id="costs" eyebrow="Prices" title={`What things cost in ${region.name}`}>
                Rent changes most from city to city; everyday prices follow it a little. Pick a city to adjust the whole table.
              </SectionHead>
              <EstimateNote className="mb-4" />
              <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {cheapest.map((c) => {
                  const r = rentFor(c)
                  const active = c === activeCostCity
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCostCity(c)}
                      aria-pressed={active}
                      className={`rounded-2xl border p-4 text-left transition-colors ${active ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
                    >
                      <span className="flex items-center justify-between">
                        <span className="font-semibold">{c}</span>
                        <span className={`font-mono text-[10px] uppercase ${active ? 'text-gold' : 'text-muted'}`}>{tiers[r.tier].label}</span>
                      </span>
                      <span className={`mt-2 block font-mono text-xs ${active ? 'text-paper/80' : 'text-ink-2'}`}>
                        Dorm €{r.dorm[0]}–{r.dorm[1]} · WG €{r.wg[0]}–{r.wg[1]}
                      </span>
                    </button>
                  )
                })}
              </div>
              <PriceTable factor={rentFor(activeCostCity).factor} city={activeCostCity} />
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/costs" className="btn-primary">
                  Plan your monthly budget
                </Link>
              </div>
            </section>

            {/* Housing */}
            <section>
              <SectionHead id="housing" eyebrow="Housing" title="Dorms and trusted housing sites">
                Student dorms run by the Studierendenwerk are the cheapest option and include bills. Apply the day applications open.
              </SectionHead>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="card p-5 sm:p-6">
                  <p className="eyebrow">Official student housing</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">Studierendenwerke in {region.name}</h3>
                  <div className="mt-3">
                    {region.studierendenwerke.map((s) => (
                      <LinkRow key={s.name} href={s.url} title={s.name} text={`Serves ${s.serves}`} />
                    ))}
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <p className="eyebrow">Search by city</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold">WG rooms and private flats</h3>
                  <div className="mt-3">
                    {portals.slice(0, 7).map((p) => (
                      <LinkRow key={p.name} href={p.url} title={p.name} text={p.text} badge={p.trust} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 card p-5">
                <p className="text-sm font-semibold">Quick dorm search for each host city</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <a key={c} href={dormSearch(c)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm hover:border-ink">
                      <Building2 className="size-3.5 text-forest" /> {c}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <Callout title="Avoid scams.">
                  Never send a deposit before you have seen the room in person or on a live video call. A "landlord abroad" who will post you the keys is always a scam. <Link to="/housing" className="link">More housing advice</Link>
                </Callout>
              </div>
            </section>

            {/* Internships */}
            <section>
              <SectionHead
                id="internships"
                eyebrow="Internship semester"
                title={`Internships in ${region.name}`}
                action={<Link to={`/internships?region=${region.code}`} className="btn-ghost">Internship hub</Link>}
              >
                Employers in {region.name} that take interns in engineering, business and computer science. Click a company to search its current openings.
              </SectionHead>
              <CompanyList code={region.code} />
              <h3 className="mt-12 mb-5 font-display text-2xl font-semibold">Career fairs</h3>
              <FairList code={region.code} />
            </section>

            {/* Halal & travel */}
            <section>
              <SectionHead id="halal" eyebrow="Cultural survival map" title="Halal food, mosques & airports">
                Find halal butchers, Turkish and Arab supermarkets and mosques in each host city, plus the budget airports nearby.
              </SectionHead>
              <HalalMap cities={cities} initialCity={activeCostCity} />
              <h3 className="mt-12 mb-5 font-display text-2xl font-semibold">Nearest budget airports</h3>
              <AirportList code={region.code} />
              <p className="mt-4 text-sm text-muted">
                Your Deutschlandsemesterticket covers the regional trains to most of these airports. <Link to="/survival-map#ticket" className="link">What the ticket covers</Link>
              </p>
            </section>

            {/* Daily life */}
            <section>
              <SectionHead id="life" eyebrow="Daily life" title={`Living in ${region.name}`} />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Train, title: 'Getting around', text: region.transit },
                  { icon: CloudSun, title: 'Weather', text: region.climate },
                  { icon: Moon, title: 'Halal food & community', text: region.community },
                  { icon: Utensils, title: 'Local food to try', text: region.food.join(' · ') },
                  { icon: Lightbulb, title: 'Tip from past students', text: region.tip },
                ].map((b) => (
                  <article key={b.title} className="card p-5">
                    <b.icon className="size-6 text-forest" aria-hidden />
                    <h3 className="mt-3 font-display text-xl font-semibold">{b.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{b.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {abroad && <Callout title="Different rules abroad.">{region.tip}</Callout>}

        <Link to={`/regions/${next.slug}`} className="group card flex items-center justify-between overflow-hidden">
          <div className="p-6">
            <p className="eyebrow">Next region</p>
            <p className="h-display mt-1 text-3xl group-hover:text-rust">{next.name}</p>
          </div>
          <RegionArt region={next} label={false} className="h-28 w-48 shrink-0 sm:w-72" />
        </Link>
      </div>
    </>
  )
}
