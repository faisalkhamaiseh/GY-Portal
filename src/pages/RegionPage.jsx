import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, MapPin, Train, CloudSun, Utensils, Moon, Lightbulb, Building2 } from 'lucide-react'
import RegionArt from '../components/RegionArt.jsx'
import VideoGrid from '../components/VideoGrid.jsx'
import UniversityCard from '../components/UniversityCard.jsx'
import PriceTable from '../components/PriceTable.jsx'
import { SectionHead, LinkRow, Callout } from '../components/ui.jsx'
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
  ['universities', 'الجامعات'],
  ['videos', 'الفيديوهات'],
  ['events', 'الفعاليات'],
  ['todo', 'أماكن للزيارة'],
  ['costs', 'التكاليف'],
  ['housing', 'السكن'],
  ['internships', 'التدريب العملي'],
  ['halal', 'الحلال والسفر'],
  ['life', 'الحياة اليومية'],
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
    // نخلط القوائم حتى تجمع الصفوف الأولى المنطقة والمدن والحرم.
    const out = []
    const lists = [regionV, mergeVideos(cityV), mergeVideos(uniV)]
    for (let i = 0; out.length < regionV.length + cityV.length + uniV.length && i < 400; i++) {
      for (const l of lists) if (l[i]) out.push(l[i])
    }
    return mergeVideos(out)
  }, [videos, region, videoFilter, cities, unis])

  const [costCity, setCostCity] = useState(null)
  if (!region) return <NotFound />

  const activeCostCity = costCity ?? cities[0]
  const cheapest = [...cities].sort((a, b) => rentFor(a).wg[0] - rentFor(b).wg[0])
  const idx = regions.findIndex((r) => r.code === region.code)
  const next = regions[(idx + 1) % regions.length]

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <RegionArt region={region} className="absolute inset-0 -z-10 size-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-paper via-paper/85 to-paper/10" />
        <div className="wrap py-14 sm:py-20">
          <div className="flex items-center justify-between gap-4">
            <Link to="/regions" className="inline-flex items-center gap-1.5 font-semibold text-ink-2 hover:text-ink">
              <ArrowRight className="size-4 rotate-180" /> كل المناطق
            </Link>
            <ShareButton title={`${region.name}: دليل السنة الألمانية`} />
          </div>
          <p className="eyebrow mt-8">{region.nameDe}</p>
          <h1 className="h-display mt-2 max-w-3xl text-5xl leading-[1.1] sm:text-7xl">{region.name}</h1>
          <p className="mt-4 max-w-2xl text-xl font-bold text-ink-2 sm:text-2xl">{region.tagline}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{region.intro}</p>
          <dl className="mt-8 flex flex-wrap gap-3">
            {[
              ['الجامعات المضيفة', unis.length],
              [abroad ? 'الدول' : 'المدن المضيفة', abroad ? new Set(unis.map((u) => u.countryName)).size : cities.length],
              !abroad && ['العاصمة', region.capital],
              !abroad && ['مستوى الإيجار', region.rentIndex.split(/[.؛;]/)[0]],
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <div key={k} className="rounded-xl border border-line bg-card/90 px-4 py-2.5 backdrop-blur">
                  <dt className="text-xs font-bold text-muted">{k}</dt>
                  <dd className="max-w-[280px] font-bold">{v}</dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {/* Section nav */}
      <nav className="sticky top-16 z-20 border-b border-line bg-paper/95 backdrop-blur" aria-label="في هذه الصفحة">
        <div className="wrap no-scrollbar flex gap-1 overflow-x-auto py-2">
          {sections
            .filter(([id]) => !abroad || ['universities', 'videos'].includes(id))
            .map(([id, label]) => (
              <a key={id} href={`#${id}`} className="shrink-0 rounded-full px-3.5 py-1.5 font-bold text-ink-2 hover:bg-sand">
                {label}
              </a>
            ))}
        </div>
      </nav>

      <div className="wrap space-y-24 pt-16">
        <section>
          <SectionHead id="universities" eyebrow={`${unis.length} جامعات مضيفة`} title={abroad ? 'الجامعات الشريكة خارج ألمانيا' : `الدراسة في ${region.name}`}>
            لكل جامعة دليل فيه فيديوهات الحرم وشروط GJU والأسعار المحلية وروابط السكن.
          </SectionHead>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {unis.map((u) => (
              <UniversityCard key={u.id} u={u} videoId={coverVideoId(videos, u.id)} />
            ))}
          </div>
        </section>

        <section>
          <SectionHead
            id="videos"
            eyebrow="شاهد"
            title={`${region.name} بالفيديو`}
            action={
              <div className="flex flex-wrap gap-2">
                {[
                  ['all', 'الكل'],
                  ['region', 'المنطقة'],
                  ['cities', 'المدن'],
                  ['campus', 'جولات الحرم'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setVideoFilter(id)}
                    aria-pressed={videoFilter === id}
                    className={`rounded-full border px-4 py-1.5 font-bold ${videoFilter === id ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            }
          >
            أدلة سفر وجولات في المدن وجولات في الحرم لكل مدينة مضيفة في {region.name}.
          </SectionHead>
          <VideoGrid key={videoFilter} videos={allVideos} limit={12} emptyQuery={`${region.nameDe} travel`} />
        </section>

        {!abroad && (
          <>
            <section>
              <SectionHead id="events" eyebrow="التقويم" title="مهرجانات وفعاليات تستحق عطلتك">
                معظمها مجاني الدخول، والوصول إليها بالقطارات الإقليمية مجاني بتذكرتك الفصلية.
              </SectionHead>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {region.events.map((e) => (
                  <article key={e.name} className="card flex gap-4 p-5">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-blush text-rust">
                      <CalendarDays className="size-5" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-rust">{e.when}</p>
                      <h3 className="mt-1 text-lg leading-snug font-extrabold">{e.name}</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                        <MapPin className="size-3.5" /> {e.city}
                      </p>
                      <p className="mt-2 leading-relaxed text-ink-2">{e.text}</p>
                    </div>
                  </article>
                ))}
                <article className="card flex flex-col justify-between bg-ink p-5 text-paper">
                  <p className="text-sm font-bold text-gold">كل المدن</p>
                  <p className="mt-2 text-xl font-extrabold">أسواق عيد الميلاد</p>
                  <p className="mt-2 text-paper/70">من أواخر نوفمبر تمتلئ ساحات كل المدن الألمانية بالأكشاك والأضواء واللوز المحمّص. ابحث عن الكريب والمشروبات الساخنة الخالية من الكحول (Kinderpunsch).</p>
                </article>
              </div>
            </section>

            <section>
              <SectionHead id="todo" eyebrow="استكشف" title="أماكن تستحق الزيارة" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {region.highlights.map((h) => (
                  <article key={h.title} className="card p-5">
                    <p className="eyebrow">{h.kind}</p>
                    <h3 className="mt-2 text-xl font-extrabold">{h.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{h.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <SectionHead id="costs" eyebrow="الأسعار" title={`تكلفة كل شيء في ${region.name}`}>
                الإيجار هو الأكثر اختلافاً بين المدن، والأسعار اليومية تتبعه قليلاً. اختر مدينة ليتعدّل الجدول كله.
              </SectionHead>
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
                      className={`rounded-2xl border p-4 text-start transition-colors ${active ? 'border-ink bg-ink text-paper' : 'border-line bg-card hover:border-ink'}`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span dir="ltr" className="font-extrabold">
                          {c}
                        </span>
                        <span className={`text-xs font-bold ${active ? 'text-gold' : 'text-muted'}`}>{tiers[r.tier].label}</span>
                      </span>
                      <span className={`mt-2 block text-sm ${active ? 'text-paper/80' : 'text-ink-2'}`}>
                        سكن <span dir="ltr" className="num">€{r.dorm[0]}–{r.dorm[1]}</span> · WG <span dir="ltr" className="num">€{r.wg[0]}–{r.wg[1]}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <PriceTable factor={rentFor(activeCostCity).factor} city={activeCostCity} />
              <div className="mt-5">
                <Link to="/costs" className="btn-primary">
                  خطط ميزانيتك الشهرية
                </Link>
              </div>
            </section>

            <section>
              <SectionHead id="housing" eyebrow="السكن" title="السكنات الطلابية ومواقع السكن الموثوقة">
                سكنات Studierendenwerk الطلابية هي الأرخص وتشمل الفواتير. قدّم يوم فتح التقديم.
              </SectionHead>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="card p-5 sm:p-6">
                  <p className="eyebrow">السكن الطلابي الرسمي</p>
                  <h3 className="mt-1 text-2xl font-extrabold">Studierendenwerke في {region.name}</h3>
                  <div className="mt-3">
                    {region.studierendenwerke.map((s) => (
                      <LinkRow key={s.name} href={s.url} title={s.name} text={`يخدم: ${s.serves}`} />
                    ))}
                  </div>
                </div>
                <div className="card p-5 sm:p-6">
                  <p className="eyebrow">البحث حسب المدينة</p>
                  <h3 className="mt-1 text-2xl font-extrabold">غرف في شقق مشتركة وشقق خاصة</h3>
                  <div className="mt-3">
                    {portals.slice(0, 7).map((p) => (
                      <LinkRow key={p.name} href={p.url} title={p.name} text={p.text} badge={p.trust} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 card p-5">
                <p className="font-bold">بحث سريع عن السكن الطلابي في كل مدينة مضيفة</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cities.map((c) => (
                    <a key={c} href={dormSearch(c)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-semibold hover:border-ink">
                      <Building2 className="size-4 text-forest" /> <span dir="ltr">{c}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <Callout title="احذر من النصب.">
                  لا ترسل أي تأمين قبل أن ترى الغرفة شخصياً أو بمكالمة فيديو مباشرة. المؤجر "المسافر" الذي سيرسل لك المفاتيح بالبريد نصّاب دائماً. <Link to="/housing" className="link">نصائح سكن أكثر</Link>
                </Callout>
              </div>
            </section>

            <section>
              <SectionHead id="internships" eyebrow="فصل التدريب العملي" title={`التدريب العملي في ${region.name}`} action={<Link to={`/internships?region=${region.code}`} className="btn-ghost">مركز التدريب</Link>}>
                شركات في {region.name} تستقبل متدربين في الهندسة وإدارة الأعمال وعلم الحاسوب. اضغط على الشركة لتبحث عن فرصها الحالية.
              </SectionHead>
              <CompanyList code={region.code} />
              <h3 className="mt-12 mb-5 text-2xl font-extrabold">معارض التوظيف</h3>
              <FairList code={region.code} />
            </section>

            <section>
              <SectionHead id="halal" eyebrow="خريطة البقاء" title="الطعام الحلال والمساجد والمطارات">
                ملاحم حلال وسوبرماركتات تركية وعربية ومساجد في كل مدينة مضيفة، والمطارات الاقتصادية القريبة.
              </SectionHead>
              <HalalMap cities={cities} initialCity={activeCostCity} />
              <h3 className="mt-12 mb-5 text-2xl font-extrabold">أقرب المطارات الاقتصادية</h3>
              <AirportList code={region.code} />
              <p className="mt-4 text-muted">
                تذكرتك الفصلية تغطي القطارات الإقليمية لمعظم هذه المطارات. <Link to="/survival-map#ticket" className="link">ماذا تغطي التذكرة</Link>
              </p>
            </section>

            <section>
              <SectionHead id="life" eyebrow="الحياة اليومية" title={`العيش في ${region.name}`} />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Train, title: 'التنقل', text: region.transit },
                  { icon: CloudSun, title: 'الطقس', text: region.climate },
                  { icon: Moon, title: 'الطعام الحلال والجالية', text: region.community },
                  { icon: Utensils, title: 'أكلات محلية تستحق التجربة', text: region.food.join(' · ') },
                  { icon: Lightbulb, title: 'نصيحة من طلاب سابقين', text: region.tip },
                ].map((b) => (
                  <article key={b.title} className="card p-5">
                    <b.icon className="size-6 text-forest" aria-hidden />
                    <h3 className="mt-3 text-xl font-extrabold">{b.title}</h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{b.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {abroad && <Callout title="قوانين مختلفة خارج ألمانيا.">{region.tip}</Callout>}

        <Link to={`/regions/${next.slug}`} className="group card flex items-center justify-between overflow-hidden">
          <div className="p-6">
            <p className="eyebrow">المنطقة التالية</p>
            <p className="h-display mt-1 text-3xl group-hover:text-rust">{next.name}</p>
          </div>
          <RegionArt region={next} label={false} className="h-28 w-48 shrink-0 sm:w-72" />
        </Link>
      </div>
    </>
  )
}
