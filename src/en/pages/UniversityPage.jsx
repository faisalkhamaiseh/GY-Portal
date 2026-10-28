import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Building2, GraduationCap, Info, MapPin, Play } from 'lucide-react'
import RegionArt from '../components/RegionArt.jsx'
import VideoGrid, { VideoModal, thumb } from '../components/VideoGrid.jsx'
import PriceTable from '../components/PriceTable.jsx'
import BudgetPlanner from '../components/BudgetPlanner.jsx'
import UniversityCard from '../components/UniversityCard.jsx'
import { SectionHead, LinkRow, Callout, Tag, ExtLink, OfficialLink, EstimateNote } from '../components/ui.jsx'
import { universityById, universitiesIn, regionOf, requirementTags, rentForUniversity, coverVideoId } from '../lib/data.js'
import { tiers } from '../data/costs.js'
import { portals, dormSearch } from '../data/housing.js'
import { localGuides } from '../data/localGuides.js'
import useVideos from '../lib/useVideos.js'
import { CompanyList, FairList } from '../components/Careers.jsx'
import { HalalMap, AirportList } from '../components/SurvivalMap.jsx'
import ShareButton from '../components/ShareButton.jsx'
import NotFound from './NotFound.jsx'

export default function UniversityPage() {
  const { id } = useParams()
  const u = universityById[id]
  const videos = useVideos()
  const [playing, setPlaying] = useState(null)

  const uniVideos = videos ? videos.universities[id] || [] : null
  const cityVideos = useMemo(() => {
    if (!videos || !u) return null
    const own = new Set((videos.universities[id] || []).map((v) => v.id))
    return (videos.cities[u.city] || []).filter((v) => !own.has(v.id))
  }, [videos, u, id])

  if (!u) return <NotFound />

  const region = regionOf(u)
  const rent = rentForUniversity(u)
  const local = localGuides[id]
  const hero = uniVideos?.[0]
  const siblings = universitiesIn(u.region).filter((x) => x.id !== u.id).slice(0, 3)
  const tags = requirementTags(u)

  const nav = [
    ['requirements', 'Requirements'],
    ['videos', 'Videos'],
    local && ['campus', 'Campus'],
    !u.abroad && ['housing', 'Housing'],
    !u.abroad && ['costs', 'Costs'],
    !u.abroad && ['budget', 'Budget'],
    !u.abroad && ['internships', 'Internships'],
    !u.abroad && ['halal', 'Halal & travel'],
    local && ['town', 'The town'],
  ].filter(Boolean)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <RegionArt region={region} label={false} className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40" />
        <div className="wrap relative grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr] lg:py-16">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
              <Link to="/universities" className="inline-flex items-center gap-1 hover:text-ink">
                <ArrowLeft className="size-4" /> Universities
              </Link>
              <span>/</span>
              <Link to={`/regions/${region.slug}`} className="hover:text-ink">
                {region.name}
              </Link>
            </nav>
            <p className="eyebrow mt-8">{u.abroad ? u.countryName : `${region.name} · ${u.zip} ${u.city}`}</p>
            <h1 className="h-display mt-3 text-4xl leading-[1.02] sm:text-6xl">{u.name}</h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-ink-2">
              <MapPin className="size-5 text-rust" /> {u.city}
              {!u.abroad && <span className="text-muted">· {tiers[rent.tier].label} city</span>}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t.label} {...t} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExtLink href={u.site} className="btn-primary">
                University website <ArrowUpRight className="size-4" />
              </ExtLink>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${u.name.split('·')[0]} ${u.city}`)}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MapPin className="size-4" /> Map
              </a>
              <ShareButton title={`${u.name}: German Year Guide`} />
            </div>
          </div>
          <div className="relative">
            {local?.photos ? (
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <img src={local.photos[1].src} alt={local.photos[1].alt} className="size-full object-cover" />
              </div>
            ) : hero ? (
              <button type="button" onClick={() => setPlaying(hero)} className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-ink text-left shadow-xl">
                <img src={thumb(hero.id, 'hqdefault')} alt="" className="size-full scale-[1.34] object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.4]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper shadow-xl">
                  <Play className="ml-1 size-6 fill-ink" />
                </span>
                <span className="absolute right-5 bottom-4 left-5 text-paper">
                  <span className="block font-mono text-[10px] tracking-widest uppercase opacity-70">Watch first</span>
                  <span className="line-clamp-2 font-semibold">{hero.title}</span>
                </span>
              </button>
            ) : (
              <div className="aspect-video animate-pulse rounded-3xl bg-sand" />
            )}
            {local?.photos && <p className="mt-2 text-xs text-muted">{local.photos[1].alt}. Photo: {local.photos[1].credit}.</p>}
          </div>
        </div>
        {local?.facts && (
          <div className="wrap relative pb-10">
            <div className="card grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
              {local.facts.map((f) => (
                <div key={f.label} className="px-5 py-4">
                  <p className="font-display text-2xl font-semibold">{f.value}</p>
                  <p className="mt-1 text-xs text-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <nav className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur" aria-label="On this page">
        <div className="wrap no-scrollbar flex gap-1 overflow-x-auto py-2">
          {nav.map(([sid, label]) => (
            <a key={sid} href={`#${sid}`} className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-2 hover:bg-sand">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="wrap space-y-24 pt-16">
        {/* Requirements */}
        <section>
          <SectionHead id="requirements" eyebrow="Before you choose" title="GJU conditions for this university" />
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e4ecf6] text-[#1d4f80]">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-muted uppercase">Note on the GJU host-university list</p>
                  <p className="mt-2 text-lg leading-relaxed">{u.note || 'No extra language, GPA or fee conditions are listed for this university.'}</p>
                </div>
              </div>
            </div>
            <div className="card divide-y divide-line">
              {[
                ['German level', u.german ? `Pass all 4 parts of ${u.german}` : u.germanNote ? u.germanNote : 'Standard GJU requirement'],
                ['Minimum GPA', u.gpa ? `Higher than ${u.gpa}%` : 'No extra minimum listed'],
                ['Extra fees', u.fee || 'None listed'],
                ['Location', u.abroad ? `${u.city}, ${u.countryName}` : `${u.zip} ${u.city}, ${region.name}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3.5 text-sm">
                  <span className="text-muted">{k}</span>
                  <span className="text-right font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <Info className="mt-0.5 size-4 shrink-0" /> Conditions, fees and deadlines can change at any time. This is general information only; confirm with the GJU German Year office and the host university before you submit your choices.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <OfficialLink href={u.site} label="Host university" />
            <OfficialLink href="https://www.gju.edu.jo/" label="GJU" />
          </div>
        </section>

        {/* Videos */}
        <section>
          <SectionHead id="videos" eyebrow="Watch before you go" title="Campus, dorms and student life">
            Campus tours, room tours and student vlogs about {u.name.split('·')[0].trim()}. Each video plays here or opens on YouTube.
          </SectionHead>
          <VideoGrid videos={uniVideos} limit={8} emptyQuery={`${u.name} campus tour`} />
          {cityVideos && cityVideos.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-6 font-display text-2xl font-semibold">{u.city}: the town and the region</h3>
              <VideoGrid videos={cityVideos} limit={4} />
            </div>
          )}
        </section>

        {/* Campus (local guide) */}
        {local && (
          <section>
            <SectionHead id="campus" eyebrow="On campus" title={u.name}>
              {local.about}
            </SectionHead>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {local.campus.map((c) => (
                <article key={c.title} className="card p-5">
                  <p className="eyebrow">{c.kind}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 card p-5 sm:p-6">
              <p className="eyebrow">Bookmarks</p>
              <div className="mt-2 grid gap-x-10 md:grid-cols-2">
                {local.uniLinks.map((l) => (
                  <LinkRow key={l.url} href={l.url} title={l.title} text={l.text} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Housing */}
        {!u.abroad && (
          <section>
            <SectionHead id="housing" eyebrow="Housing" title={`Where to live in ${u.city}`}>
              Most GJU students live in a Studierendenwerk dorm: cheap, furnished and with bills included. If you miss out, use the private portals below and start early.
            </SectionHead>
            <EstimateNote className="mb-4" />
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Dorm room', rent.dorm, 'Bills included'],
                ['WG room', rent.wg, 'Ask if rent is warm or cold'],
                ['One-room flat', rent.flat, 'Deposit up to 3 months'],
              ].map(([k, [a, b], n]) => (
                <div key={k} className="card p-5">
                  <p className="font-mono text-[11px] tracking-wider text-muted uppercase">{k}</p>
                  <p className="mt-1 font-display text-3xl font-semibold">
                    €{a}–{b}
                    <span className="text-base font-normal text-muted"> / month</span>
                  </p>
                  <p className="mt-1 text-xs text-muted">{n}</p>
                </div>
              ))}
            </div>

            {local?.dorms && (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  {local.dorms.map((d) => (
                    <article key={d.name} className="card p-6">
                      <p className="eyebrow">Dorm · {d.where}</p>
                      <h3 className="mt-1 font-display text-2xl font-semibold">{d.name}</h3>
                      <div className="mt-2 flex gap-2">
                        <span className="chip bg-mint text-forest">{d.price}</span>
                        <span className="chip bg-mint text-forest">Deposit {d.deposit}</span>
                      </div>
                      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] text-ink-2">
                        {d.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <ExtLink href={d.url} className="link mt-4 inline-block text-sm font-semibold">
                        See {d.name} on the Studierendenwerk site
                      </ExtLink>
                    </article>
                  ))}
                </div>
                <div className="mt-5">
                  <Callout title="Dorm rules to know.">{local.dormNote}</Callout>
                </div>
              </>
            )}

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="card p-5 sm:p-6">
                <p className="eyebrow">Apply</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">Official housing</h3>
                <div className="mt-2">
                  {local?.links
                    ? local.links.map((l) => <LinkRow key={l.url} href={l.url} title={l.title} text={l.text} />)
                    : region.studierendenwerke.map((s) => <LinkRow key={s.name} href={s.url} title={s.name} text={`Serves ${s.serves}`} />)}
                  <LinkRow href={dormSearch(u.city)} title={`Find dorms in ${u.city}`} text="Search the Studierendenwerk dorm list for this city" />
                </div>
              </div>
              <div className="card p-5 sm:p-6">
                <p className="eyebrow">Search “{u.city}”</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">WG rooms and private flats</h3>
                <div className="mt-2">
                  {portals.map((p) => (
                    <LinkRow key={p.name} href={p.search ? p.search(u.city) : p.url} title={p.name} text={p.text} badge={p.trust} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Callout title="Avoid scams." tone="rust">
                Never send a deposit before you have seen the room in person or on a live video call. Never pay through Western Union or a gift card. Ask GJU students from the previous year: they often hand their rooms on.
              </Callout>
            </div>
          </section>
        )}

        {/* Costs */}
        {!u.abroad && (
          <section>
            <SectionHead id="costs" eyebrow="Prices" title={`Prices for everything in ${u.city}`}>
              Estimated ranges for a student in {u.city}, based on German averages and adjusted for a {tiers[rent.tier].label.toLowerCase()} city. Prices change constantly.
            </SectionHead>
            <PriceTable factor={rent.factor} city={u.city} />
          </section>
        )}

        {!u.abroad && (
          <section>
            <SectionHead id="budget" eyebrow="Monthly budget" title="Will your monthly budget be enough?">
              Move the sliders to match your life. The dashed line is your blocked-account payout.
            </SectionHead>
            <BudgetPlanner initialCity={u.city} lockCity />
          </section>
        )}

        {!u.abroad && (
          <section>
            <SectionHead
              id="internships"
              eyebrow="Internship semester"
              title={`Internships near ${u.city}`}
              action={<Link to={`/internships?region=${u.region}`} className="btn-ghost">Internship hub</Link>}
            >
              Employers in {region.name} that take interns, with companies closest to {u.city} first. Click a company to search its openings.
            </SectionHead>
            <CompanyList code={u.region} city={u.city} limit={6} />
            <h3 className="mt-12 mb-5 font-display text-2xl font-semibold">Career fairs</h3>
            <FairList code={u.region} />
          </section>
        )}

        {!u.abroad && (
          <section>
            <SectionHead id="halal" eyebrow="Cultural survival map" title={`Halal food & mosques in ${u.city}`}>
              Halal butchers, Turkish and Arab supermarkets, Arabic restaurants and mosques, on a live map. In small towns, students often shop in the nearest big city.
            </SectionHead>
            <HalalMap cities={[u.city]} />
            <h3 className="mt-12 mb-5 font-display text-2xl font-semibold">Nearest budget airports</h3>
            <AirportList code={u.region} />
          </section>
        )}

        {/* Town (local guide) */}
        {local && (
          <section>
            <SectionHead id="town" eyebrow="The town" title={`${u.city} and around`} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {local.sights.map((c) => (
                <article key={c.title} className="card p-5">
                  <p className="eyebrow">{c.kind}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{c.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
              <div className="card p-6">
                <p className="eyebrow">Arriving</p>
                <h3 className="mt-1 font-display text-2xl font-semibold">Frankfurt Airport to {u.city}</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] text-ink-2">
                  {local.arrival.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="card overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-line font-mono text-[10.5px] tracking-wider text-muted uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Destination</th>
                      <th className="px-4 py-3 font-medium">By train</th>
                      <th className="px-4 py-3 font-medium">Why go</th>
                    </tr>
                  </thead>
                  <tbody>
                    {local.trips.map(([d, t, w]) => (
                      <tr key={d} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 font-medium">{d}</td>
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{t}</td>
                        <td className="px-4 py-3 text-muted">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <figure className="mt-5 overflow-hidden rounded-3xl">
              <img src={local.photos[0].src} alt={local.photos[0].alt} loading="lazy" className="aspect-[21/9] w-full object-cover" />
              <figcaption className="mt-2 text-xs text-muted">Photo: {local.photos[0].credit}.</figcaption>
            </figure>
          </section>
        )}

        {/* Region teaser */}
        <section>
          <Link to={`/regions/${region.slug}`} className="group relative block overflow-hidden rounded-3xl border border-line">
            <RegionArt region={region} label={false} className="h-64 w-full sm:h-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-6 text-paper sm:p-10">
              <p className="font-mono text-[11px] tracking-widest text-gold uppercase">{u.abroad ? 'Partners abroad' : 'Your region'}</p>
              <p className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{region.name}</p>
              <p className="mt-2 text-paper/80">{u.abroad ? 'All partner universities outside Germany' : 'Events, festivals, things to do, transport, halal food, and every host university nearby.'}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-semibold">
                Explore the region <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </section>

        {siblings.length > 0 && (
          <section>
            <SectionHead eyebrow="Compare" title={`Other host universities in ${u.abroad ? 'Europe' : region.name}`} />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <UniversityCard key={s.id} u={s} videoId={coverVideoId(videos, s.id)} />
              ))}
            </div>
          </section>
        )}

        {!u.abroad && (
          <div className="card flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Building2 className="size-8 text-forest" />
              <div>
                <p className="font-display text-xl font-semibold">Arrival checklist, phrasebook & emergencies</p>
                <p className="text-sm text-muted">Everything that is the same in every German city.</p>
              </div>
            </div>
            <Link to="/guide" className="btn-primary">
              Open the survival guide
            </Link>
          </div>
        )}
      </div>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
