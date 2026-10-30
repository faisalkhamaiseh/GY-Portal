import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Building2, GraduationCap, Info, MapPin, Play } from 'lucide-react'
import RegionArt from '../components/RegionArt.jsx'
import VideoGrid, { VideoModal, thumb } from '../components/VideoGrid.jsx'
import PriceTable from '../components/PriceTable.jsx'
import BudgetPlanner from '../components/BudgetPlanner.jsx'
import UniversityCard from '../components/UniversityCard.jsx'
import { SectionHead, LinkRow, Callout, Tag, ExtLink, OfficialLink, EstimateNote } from '../components/ui.jsx'
import { universityById, universitiesIn, regionOf, requirementTags, rentForUniversity, coverVideoId, heroVideo } from '../lib/data.js'
import { tiers } from '../data/costs.js'
import { portals, dormSearch } from '../data/housing.js'
import { localGuides } from '../data/localGuides.js'
import useVideos from '../lib/useVideos.js'
import { CompanyList, FairList } from '../components/Careers.jsx'
import { HalalMap, AirportList } from '../components/SurvivalMap.jsx'
import ShareButton from '../components/ShareButton.jsx'
import Photo from '../components/Photo.jsx'
import Sections, { Panel } from '../components/Sections.jsx'
import { majorsAt, majorById, incomplete } from '../lib/majors.js'
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
  const hero = uniVideos?.[0] ?? heroVideo(id)
  const siblings = universitiesIn(u.region).filter((x) => x.id !== u.id).slice(0, 3)
  const tags = requirementTags(u)

  const nav = [
    ['requirements', 'الشروط'],
    ['videos', 'الفيديوهات'],
    local && ['campus', 'الحرم'],
    !u.abroad && ['housing', 'السكن'],
    !u.abroad && ['costs', 'التكاليف'],
    !u.abroad && ['budget', 'الميزانية'],
    !u.abroad && ['internships', 'التدريب العملي'],
    !u.abroad && ['halal', 'الحلال والسفر'],
    local && ['town', 'المدينة'],
  ].filter(Boolean)

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <RegionArt region={region} label={false} className="absolute inset-x-0 bottom-0 h-40 w-full opacity-40" />
        <div className="wrap relative grid gap-6 py-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:py-16">
          <div>
            <nav className="flex flex-wrap items-center gap-1.5 font-semibold text-muted" aria-label="مسار التنقل">
              <Link to="/universities" className="inline-flex items-center gap-1 hover:text-ink">
                <ArrowRight className="size-4 rotate-180" /> الجامعات
              </Link>
              <span>/</span>
              <Link to={`/regions/${region.slug}`} className="hover:text-ink">
                {region.name}
              </Link>
            </nav>
            <p className="eyebrow mt-4 lg:mt-8">
              {u.abroad ? u.countryName : region.name} · <span dir="ltr">{u.zip} {u.city}</span>
            </p>
            <h1 dir="auto" className="h-display mt-2 text-start text-[2rem] leading-[1.15] sm:text-6xl lg:mt-3">
              {u.name}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-ink-2">
              <MapPin className="size-5 text-rust" /> <span dir="ltr">{u.city}</span>
              {!u.abroad && <span className="text-muted">· مدينة {tiers[rent.tier].label}</span>}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t.label} {...t} />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 lg:mt-8 [&>*]:max-sm:justify-center [&>*]:max-sm:px-2 [&>*]:max-sm:text-sm">
              <ExtLink href={u.site} className="btn-primary">
                موقع الجامعة <ArrowUpRight className="size-4" />
              </ExtLink>
              <a href={`https://www.google.com/maps/search/${encodeURIComponent(`${u.name.split('·')[0]} ${u.city}`)}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <MapPin className="size-4" /> الخريطة
              </a>
              <ShareButton title={`${u.name}: دليل السنة الألمانية`} />
            </div>
          </div>
          <div className="relative">
            {local?.photos ? (
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Photo src={local.photos[1].src} alt={local.photos[1].alt} width={1600} height={900} sizes="(min-width: 1024px) 45vw, 100vw" priority className="size-full object-cover" />
              </div>
            ) : hero ? (
              <button type="button" onClick={() => setPlaying(hero)} className="group relative block aspect-video w-full overflow-hidden rounded-3xl bg-ink text-start shadow-xl">
                <img src={thumb(hero.id, 'hqdefault')} alt="" width={480} height={360} fetchPriority="high" className="size-full scale-[1.34] object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.4]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper shadow-xl">
                  <Play className="ms-1 size-6 fill-ink" />
                </span>
                <span className="absolute inset-x-5 bottom-4 text-paper">
                  <span className="block text-xs font-bold opacity-70">شاهد أولاً</span>
                  <span dir="auto" className="line-clamp-2 block font-bold">
                    {hero.title}
                  </span>
                </span>
              </button>
            ) : (
              <div className="aspect-video animate-pulse rounded-3xl bg-sand" />
            )}
            {local?.photos && (
              <p className="mt-2 text-xs text-muted">
                {local.photos[1].alt}. الصورة: {local.photos[1].credit}.
              </p>
            )}
          </div>
        </div>
        {local?.facts && (
          <div className="wrap relative pb-10">
            <div className="card grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x sm:divide-x-reverse">
              {local.facts.map((f) => (
                <div key={f.label} className="px-5 py-4">
                  <p dir="auto" className="num text-start text-2xl font-extrabold">
                    {f.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <nav className="sticky top-14 z-20 border-b max-lg:hidden lg:top-16 border-line bg-paper lg:bg-paper/95 lg:backdrop-blur" aria-label="في هذه الصفحة">
        <div className="wrap no-scrollbar flex gap-1 overflow-x-auto py-2">
          {nav.map(([sid, label]) => (
            <a key={sid} href={`#${sid}`} className="shrink-0 rounded-full px-3.5 py-1.5 font-bold text-ink-2 hover:bg-sand">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <Sections className="wrap lg:pt-16" label="أقسام الصفحة">
        <Panel id="requirements" label="الشروط">
          <SectionHead id="requirements" eyebrow="قبل أن تختار" title="شروط GJU لهذه الجامعة" />
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#e4ecf6] text-[#1d4f80]">
                  <GraduationCap className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-muted">الملاحظة في قائمة الجامعات المضيفة من GJU</p>
                  <p className="mt-2 text-xl leading-relaxed font-semibold">{u.note || 'لا توجد شروط إضافية في اللغة أو المعدل أو الرسوم لهذه الجامعة.'}</p>
                </div>
              </div>
            </div>
            <div className="card divide-y divide-line">
              {[
                ['مستوى الألمانية', u.german ? `اجتياز الأجزاء الأربعة لـ${u.german}` : u.germanNote ? u.germanNote : 'شرط GJU المعتاد'],
                ['الحد الأدنى للمعدل', u.gpa ? `أعلى من ${u.gpa}%` : 'لا حد أدنى إضافي'],
                ['رسوم إضافية', u.fee || 'لا يوجد'],
                ['الموقع', u.abroad ? `${u.city}، ${u.countryName}` : `${u.zip} ${u.city}، ${region.name}`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3.5">
                  <span className="text-muted">{k}</span>
                  <span className="text-end font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>
          {majorsAt[u.id] && (
            <div className="card mt-5 p-6">
              <p className="text-sm font-bold text-muted">التخصصات التي ترسلها GJU إلى هنا (MyGJU)</p>
              {majorsAt[u.id].length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {majorsAt[u.id].map((id) => (
                    <Link key={id} to={`/universities?major=${id}`} className="chip bg-mint text-forest hover:bg-forest hover:text-paper">
                      {majorById[id].ar}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-ink-2">لا توجد تخصصات مدرجة لهذه الجامعة في MyGJU حالياً.</p>
              )}
              {incomplete.has(u.id) && <p className="mt-3 text-sm text-muted">نسختنا من هذه القائمة غير مكتملة؛ راجع الباقي في MyGJU.</p>}
            </div>
          )}
          <p className="mt-4 flex items-start gap-2 text-muted">
            <Info className="mt-1 size-4 shrink-0" /> الشروط والرسوم والمواعيد قد تتغير في أي وقت. هذه معلومات عامة فقط؛ تأكد مع مكتب السنة الألمانية في GJU ومع الجامعة المضيفة قبل تقديم اختياراتك.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <OfficialLink href={u.site} label="الجامعة المضيفة" />
            <OfficialLink href="https://www.gju.edu.jo/" label="GJU" />
          </div>
        </Panel>

        <Panel id="videos" label="الفيديوهات">
          <SectionHead id="videos" eyebrow="شاهد قبل أن تذهب" title="الحرم والسكن وحياة الطلاب">
            جولات في الحرم والغرف ومدونات فيديو لطلاب عن <span dir="ltr">{u.name.split('·')[0].trim()}</span>. كل فيديو يعمل هنا أو على يوتيوب.
          </SectionHead>
          <VideoGrid videos={uniVideos} limit={8} emptyQuery={`${u.name} campus tour`} />
          {cityVideos && cityVideos.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-6 text-2xl font-extrabold">
                <span dir="ltr">{u.city}</span>: المدينة والمنطقة
              </h3>
              <VideoGrid videos={cityVideos} limit={4} />
            </div>
          )}
        </Panel>

        {local && (
          <Panel id="campus" label="الحرم">
            <SectionHead id="campus" eyebrow="في الحرم" title="جامعة شمالكالدن">
              {local.about}
            </SectionHead>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {local.campus.map((c) => (
                <article key={c.title} className="card p-5">
                  <p className="eyebrow">{c.kind}</p>
                  <h3 className="mt-2 text-xl font-extrabold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{c.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 card p-5 sm:p-6">
              <p className="eyebrow">روابط مهمة</p>
              <div className="mt-2 grid gap-x-10 md:grid-cols-2">
                {local.uniLinks.map((l) => (
                  <LinkRow key={l.url} href={l.url} title={l.title} text={l.text} />
                ))}
              </div>
            </div>
          </Panel>
        )}

        {!u.abroad && (
          <Panel id="housing" label="السكن">
            <SectionHead id="housing" eyebrow="السكن" title={<>أين تسكن في <span dir="ltr">{u.city}</span></>}>
              معظم طلاب GJU يسكنون في سكن Studierendenwerk: رخيص ومفروش وشامل الفواتير. إن فاتك، استخدم المواقع الخاصة أدناه وابدأ مبكراً.
            </SectionHead>
            <EstimateNote className="mb-4" />
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              {[
                ['غرفة سكن طلابي', rent.dorm, 'شاملة الفواتير'],
                ['غرفة في شقة مشتركة', rent.wg, 'اسأل: هل الإيجار شامل أم لا؟'],
                ['شقة غرفة واحدة', rent.flat, 'تأمين حتى 3 أشهر'],
              ].map(([k, [a, b], n]) => (
                <div key={k} className="card p-5">
                  <p className="text-sm font-bold text-muted">{k}</p>
                  <p className="mt-1 text-3xl font-extrabold">
                    <span dir="ltr" className="num">
                      €{a}–{b}
                    </span>
                    <span className="text-base font-normal text-muted"> / شهر</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">{n}</p>
                </div>
              ))}
            </div>

            {local?.dorms && (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  {local.dorms.map((d) => (
                    <article key={d.name} className="card p-6">
                      <p className="eyebrow">سكن طلابي · {d.where}</p>
                      <h3 dir="ltr" className="mt-1 text-start text-2xl font-extrabold">
                        {d.name}
                      </h3>
                      <div className="mt-2 flex gap-2">
                        <span className="chip bg-mint text-forest">{d.price}</span>
                        <span className="chip bg-mint text-forest">تأمين {d.deposit}</span>
                      </div>
                      <ul className="mt-4 list-disc space-y-1.5 ps-5 text-ink-2">
                        {d.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                      <ExtLink href={d.url} className="link mt-4 inline-block font-bold">
                        صفحة <span dir="ltr">{d.name}</span> على موقع Studierendenwerk
                      </ExtLink>
                    </article>
                  ))}
                </div>
                <div className="mt-5">
                  <Callout title="قوانين السكن المهمة.">{local.dormNote}</Callout>
                </div>
              </>
            )}

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="card p-5 sm:p-6">
                <p className="eyebrow">التقديم</p>
                <h3 className="mt-1 text-2xl font-extrabold">السكن الرسمي</h3>
                <div className="mt-2">
                  {local?.links
                    ? local.links.map((l) => <LinkRow key={l.url} href={l.url} title={l.title} text={l.text} />)
                    : region.studierendenwerke.map((s) => <LinkRow key={s.name} href={s.url} title={s.name} text={`يخدم: ${s.serves}`} />)}
                  <LinkRow href={dormSearch(u.city)} title={<>ابحث عن سكن طلابي في <span dir="ltr">{u.city}</span></>} text="ابحث في قائمة سكنات Studierendenwerk لهذه المدينة" />
                </div>
              </div>
              <div className="card p-5 sm:p-6">
                <p className="eyebrow">
                  البحث في “<span dir="ltr">{u.city}</span>”
                </p>
                <h3 className="mt-1 text-2xl font-extrabold">غرف في شقق مشتركة وشقق خاصة</h3>
                <div className="mt-2">
                  {portals.map((p) => (
                    <LinkRow key={p.name} href={p.search ? p.search(u.city) : p.url} title={p.name} text={p.text} badge={p.trust} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Callout title="احذر من النصب." tone="rust">
                لا ترسل أي تأمين قبل أن ترى الغرفة شخصياً أو بمكالمة فيديو مباشرة. لا تدفع عبر Western Union أو بطاقات الهدايا. اسأل طلاب GJU من السنة الماضية: كثيراً ما يسلّمون غرفهم للدفعة التالية.
              </Callout>
            </div>
          </Panel>
        )}

        {!u.abroad && (
          <Panel id="costs" label="الأسعار">
            <SectionHead id="costs" eyebrow="الأسعار" title={<>أسعار كل شيء في <span dir="ltr">{u.city}</span></>}>
              نطاقات أسعار تقديرية لطالب في هذه المدينة، مبنية على المتوسطات الألمانية ومعدّلة لمدينة {tiers[rent.tier].label}. الأسعار تتغير باستمرار.
            </SectionHead>
            <PriceTable factor={rent.factor} city={u.city} />
          </Panel>
        )}

        {!u.abroad && (
          <Panel id="budget" label="الميزانية">
            <SectionHead id="budget" eyebrow="الميزانية الشهرية" title="هل يكفيك مصروفك الشهري؟">
              حرّك المؤشرات لتطابق حياتك. الخط المتقطع هو المبلغ الشهري من حسابك المجمّد.
            </SectionHead>
            <BudgetPlanner initialCity={u.city} lockCity />
          </Panel>
        )}

        {!u.abroad && (
          <Panel id="internships" label="التدريب">
            <SectionHead id="internships" eyebrow="فصل التدريب العملي" title={<>التدريب العملي قرب <span dir="ltr">{u.city}</span></>} action={<Link to={`/internships?region=${u.region}`} className="btn-ghost">مركز التدريب</Link>}>
              شركات في {region.name} تستقبل متدربين، والأقرب للمدينة أولاً. اضغط على الشركة لتبحث عن فرصها.
            </SectionHead>
            <CompanyList code={u.region} city={u.city} limit={6} />
            <h3 className="mt-12 mb-5 text-2xl font-extrabold">معارض التوظيف</h3>
            <FairList code={u.region} />
          </Panel>
        )}

        {!u.abroad && (
          <Panel id="halal" label="الحلال">
            <SectionHead id="halal" eyebrow="خريطة البقاء" title={<>الطعام الحلال والمساجد في <span dir="ltr">{u.city}</span></>}>
              ملاحم حلال وسوبرماركتات تركية وعربية ومطاعم عربية ومساجد على خريطة مباشرة. في المدن الصغيرة يتسوق الطلاب غالباً من أقرب مدينة كبيرة.
            </SectionHead>
            <HalalMap cities={[u.city]} />
            <h3 className="mt-12 mb-5 text-2xl font-extrabold">أقرب المطارات الاقتصادية</h3>
            <AirportList code={u.region} />
          </Panel>
        )}

        {local && (
          <Panel id="town" label="المدينة">
            <SectionHead id="town" eyebrow="المدينة" title="شمالكالدن وما حولها" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {local.sights.map((c) => (
                <article key={c.title} className="card p-5">
                  <p className="eyebrow">{c.kind}</p>
                  <h3 className="mt-2 text-xl font-extrabold">{c.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{c.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.3fr]">
              <div className="card p-6">
                <p className="eyebrow">الوصول</p>
                <h3 className="mt-1 text-2xl font-extrabold">من مطار فرانكفورت إلى شمالكالدن</h3>
                <ul className="mt-4 list-disc space-y-2 ps-5 text-ink-2">
                  {local.arrival.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
              <div className="card overflow-hidden">
                <table className="w-full text-start">
                  <thead className="border-b border-line text-xs font-bold text-muted">
                    <tr>
                      <th className="px-4 py-3 text-start">الوجهة</th>
                      <th className="px-4 py-3 text-start">بالقطار</th>
                      <th className="px-4 py-3 text-start">لماذا تذهب</th>
                    </tr>
                  </thead>
                  <tbody>
                    {local.trips.map(([d, t, w]) => (
                      <tr key={d} className="border-b border-line last:border-0">
                        <td className="px-4 py-3 font-bold">{d}</td>
                        <td className="px-4 py-3 text-sm whitespace-nowrap">{t}</td>
                        <td className="px-4 py-3 text-muted">{w}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <figure className="mt-5 overflow-hidden rounded-3xl">
              <Photo src={local.photos[0].src} alt={local.photos[0].alt} width={1800} height={1633} className="aspect-[21/9] w-full object-cover" />
              <figcaption className="mt-2 text-xs text-muted">الصورة: {local.photos[0].credit}.</figcaption>
            </figure>
          </Panel>
        )}

        <Panel id="region" label="المنطقة" className="space-y-12 lg:space-y-24">
          <section>
            <Link to={`/regions/${region.slug}`} className="group relative block overflow-hidden rounded-3xl border border-line">
              <RegionArt region={region} label={false} className="h-64 w-full sm:h-80" />
              <div className="absolute inset-0 bg-gradient-to-l from-ink/85 via-ink/50 to-transparent" />
              <div className="absolute inset-y-0 start-0 flex max-w-xl flex-col justify-center p-6 text-paper sm:p-10">
                <p className="text-sm font-bold text-gold">{u.abroad ? 'شركاء خارج ألمانيا' : 'منطقتك'}</p>
                <p className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">{region.name}</p>
                <p className="mt-2 text-paper/80">{u.abroad ? 'كل الجامعات الشريكة خارج ألمانيا' : 'الفعاليات والمهرجانات والأماكن والمواصلات والطعام الحلال وكل الجامعات المضيفة القريبة.'}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-bold">
                  استكشف المنطقة <ArrowUpRight className="size-4" />
                </span>
              </div>
            </Link>
          </section>

          {siblings.length > 0 && (
            <section>
              <SectionHead eyebrow="قارن" title={`جامعات مضيفة أخرى في ${u.abroad ? 'أوروبا' : region.name}`} />
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
                  <p className="text-xl font-extrabold">قائمة الوصول والعبارات والطوارئ</p>
                  <p className="text-muted">كل ما هو مشترك بين كل المدن الألمانية.</p>
                </div>
              </div>
              <Link to="/guide" className="btn-primary">
                افتح دليل البقاء
              </Link>
            </div>
          )}
        </Panel>
      </Sections>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
