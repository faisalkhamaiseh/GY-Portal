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
import Photo from '../components/Photo.jsx'
import { QuickActions } from '../components/AppShell.jsx'
import { toolkit } from '../components/Header.jsx'

const quickPicks = [
  ['tum', 'TUM ميونخ'],
  ['thi-ingolstadt', 'إنغولشتات'],
  ['htw-berlin', 'HTW برلين'],
  ['th-koeln-deutz', 'TH كولونيا'],
  ['schmalkalden', 'شمالكالدن'],
  ['frankfurt-uas', 'فرانكفورت'],
]

const rentCities = [
  ['München', 'ميونخ'], ['Hamburg', 'هامبورغ'], ['Frankfurt am Main', 'فرانكفورت'], ['Berlin', 'برلين'], ['Köln', 'كولونيا'], ['Stuttgart', 'شتوتغارت'],
  ['Nürnberg', 'نورنبيرغ'], ['Hannover', 'هانوفر'], ['Leipzig', 'لايبزيغ'], ['Erfurt', 'إرفورت'], ['Schmalkalden', 'شمالكالدن'],
]

const journey = [
  { icon: Plane, when: 'قبل السفر', title: 'التأشيرة والحساب المجمّد والتأمين والسكن', to: '/guide#before' },
  { icon: KeyRound, when: 'الأسبوع الأول', title: 'المفاتيح وتسجيل العنوان والبطاقة الجامعية والبنك والشريحة', to: '/guide#week1' },
  { icon: Landmark, when: 'الشهر الأول', title: 'تصريح الإقامة واتفاقية التعلّم', to: '/guide#month1' },
  { icon: Briefcase, when: 'الفصل الثاني', title: 'التدريب العملي في شركة ألمانية', to: '/internships' },
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
            <p className="eyebrow">السنة الألمانية في GJU · دليل غير رسمي</p>
            <h1 className="h-display mt-4 text-4xl leading-[1.15] sm:text-6xl lg:text-7xl">
              سنتك الألمانية،
              <br />
              <span className="text-rust">مدينة بمدينة.</span>
            </h1>
            <p className="mt-3 max-w-xl leading-relaxed text-ink-2 max-sm:line-clamp-3 sm:mt-6 sm:text-lg">
              كل الجامعات المضيفة الـ{universities.length} في مكان واحد. لكل جامعة: فيديوهات الحرم والمدينة، نطاقات تقديرية لأسعار الإيجار والمعيشة، روابط سكن موثوقة، الفعاليات المحلية، والأوراق التي تحتاجها طوال السنة.
            </p>
            <div className="mt-5 max-w-xl lg:mt-8">
              <FinderBox />
              <div className="no-scrollbar -mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 [&>*]:shrink-0">
                <span className="text-sm font-bold text-muted">الأكثر بحثاً</span>
                {quickPicks.map(([id, label]) => (
                  <button key={id} type="button" onClick={() => navigate(`/universities/${id}`)} className="rounded-full border border-line bg-card px-3 py-1 font-semibold hover:border-ink">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[16/10] sm:aspect-[4/3.6] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(29,36,32,0.6)]">
              <Photo src="/images/schmalkalden-altmarkt.jpg" alt="ساحة ألتماركت وكنيسة القديس جورج في شمالكالدن" width={1800} height={1633} sizes="(min-width: 1024px) 45vw, 100vw" priority className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-paper">
                <p className="text-sm font-bold opacity-80">دليل مميّز</p>
                <p className="font-display text-3xl font-extrabold">جامعة شمالكالدن</p>
                <Link to="/universities/schmalkalden" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 font-bold text-ink hover:bg-gold">
                  افتح الدليل الكامل <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="absolute -top-5 -start-4 hidden w-56 rotate-[3deg] rounded-2xl border border-line bg-card p-4 shadow-xl sm:block">
              <p className="eyebrow">المصروف الشهري</p>
              <p className="num mt-1 text-3xl font-extrabold" dir="ltr">
                €{BLOCKED_MONTHLY}
              </p>
              <p className="text-sm text-muted">من حسابك المجمّد (المبلغ الرسمي لعام 2026). شاهد إلى أين يوصلك في كل مدينة.</p>
            </div>
            <button type="button" onClick={() => setPlaying(gjuVideo)} className="absolute -top-8 -end-3 hidden w-56 rotate-[-2deg] overflow-hidden rounded-2xl border border-line bg-card text-start shadow-xl sm:block">
              <span className="relative block aspect-video">
                <img src={thumb(gjuVideo.id)} alt="" width={320} height={180} loading="lazy" decoding="async" className="size-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-ink/20">
                  <span className="grid size-10 place-items-center rounded-full bg-paper">
                    <Play className="ms-0.5 size-4 fill-ink" />
                  </span>
                </span>
              </span>
              <span className="block p-3 font-bold">شاهد: الجامعة الألمانية الأردنية</span>
            </button>
          </div>
        </div>
        <div className="wrap relative pb-10 max-sm:hidden">
          <div className="card grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x sm:divide-x-reverse">
            <Stat value={universities.length} label="جامعة مضيفة، من آخن إلى تسفيكاو" />
            <Stat value={`${regions.length - 1} + ${universitiesIn('INT').length}`} label="ولاية ألمانية + شركاء خارج ألمانيا" />
            <Stat value={videos ? new Set(['universities', 'cities', 'states'].flatMap((g) => Object.values(videos[g]).flat().map((v) => v.id))).size.toLocaleString('en-US') : '1,900+'} label="فيديو للحرم والمدن والمناطق" />
            <Stat value={priceGroups.reduce((n, g) => n + g.items.length, 0)} label="سعراً يومياً معدّلاً لكل مدينة" />
          </div>
        </div>
      </section>

      <QuickActions title="أدوات الطالب" items={[{ to: '/internships', label: 'التدريب', icon: Briefcase }, { to: '/housing', label: 'السكن', icon: Home }, ...toolkit.filter((t) => !['/videos', '/apps'].includes(t.to))]} />

      {/* Map */}
      <section className="wrap pt-12 lg:pt-20">
        <SectionHead eyebrow="استكشف حسب المنطقة" title="أين ستعيش في ألمانيا؟" action={<Link to="/regions" className="btn-ghost">كل المناطق <ArrowRight className="size-4" /></Link>}>
          لكل ولاية طابعها وأسعارها ومهرجاناتها وشبكة مواصلاتها. اختر ولاية لترى كل جامعاتها وفيديوهاتها وفعالياتها وتكاليفها وروابط السكن معاً.
        </SectionHead>
        <GermanyMap />
      </section>

      {/* Journey */}
      <section className="wrap pt-12 lg:pt-24">
        <SectionHead eyebrow="السنة في لمحة" title="خطوة بخطوة، بالترتيب">
          هذه القائمة من دليل شمالكالدن وتنطبق على كل المدن. أشّر على المهام في دليل البقاء، وتقدّمك يُحفظ في متصفحك.
        </SectionHead>
        <ol className="rail grid gap-4 md:grid-cols-4">
          {journey.map((j, i) => (
            <li key={j.when}>
              <Link to={j.to} className="group card flex h-full flex-col p-5 transition-colors hover:border-ink">
                <span className="flex items-center justify-between">
                  <span className="num text-4xl font-black text-rust">0{i + 1}</span>
                  <j.icon className="size-6 text-forest" aria-hidden />
                </span>
                <span className="mt-6 text-sm font-bold text-muted">{j.when}</span>
                <span className="mt-1 text-lg leading-snug font-extrabold">{j.title}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 font-bold text-forest">
                  القائمة <ArrowRight className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Toolkit */}
      <section className="wrap pt-12 max-lg:hidden lg:pt-24">
        <SectionHead eyebrow="أدوات الطالب" title="كل ما تحتاجه لتنجو طوال السنة">
          التدريب العملي، الطعام الحلال، دليل المكونات، القوانين التي لا يخبرك بها أحد، أفضل بنك وشريحة، رحلات رخيصة، والتطبيقات التي تحمّلها قبل السفر.
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[{ to: '/internships', label: 'مركز التدريب العملي', text: 'الشركات حسب المنطقة ومعارض التوظيف والنصائح', icon: Briefcase }, ...toolkit.filter((t) => !['/videos', '/guide'].includes(t.to))].map((t, i) => (
            <Link key={t.to} to={t.to} className={`group flex flex-col rounded-2xl border p-5 transition-all hover:-translate-y-0.5 ${i === 0 ? 'border-ink bg-ink text-paper' : t.to === '/ingredients' ? 'border-navy bg-navy text-white' : 'border-line bg-card hover:border-ink'}`}>
              <span className={`grid size-11 place-items-center rounded-xl ${i === 0 ? 'bg-gold text-ink' : t.to === '/ingredients' ? 'bg-[#f5a524] text-navy' : 'bg-mint text-forest'}`}>
                <t.icon className="size-5" />
              </span>
              <span className="mt-5 text-xl font-extrabold">{t.label}</span>
              <span className={`mt-1 ${i === 0 || t.to === '/ingredients' ? 'text-white/70' : 'text-muted'}`}>{t.text}</span>
              <span className={`mt-auto flex items-center gap-1 pt-4 font-bold ${i === 0 ? 'text-gold' : t.to === '/ingredients' ? 'text-[#f5a524]' : 'text-forest'}`}>
                افتح <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Rent comparison */}
      <section className="mt-12 bg-ink py-12 text-paper lg:mt-24 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow !text-gold">التكاليف</p>
            <h2 className="mt-2 font-display text-4xl leading-tight font-extrabold sm:text-5xl">نفس المصروف الشهري، وأشهر مختلفة تماماً.</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">
              الإيجار هو الذي يحدد ميزانيتك. غرفة في شقة مشتركة في ميونخ قد تكلف ثلاثة أضعاف مثيلتها في شمالكالدن، بينما البقالة والتذكرة الفصلية والتأمين الصحي متقاربة في كل مكان.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/costs" className="btn bg-paper text-ink hover:bg-gold">
                افتح مخطط الميزانية <ArrowRight className="size-4" />
              </Link>
              <Link to="/housing" className="btn border border-paper/25 text-paper hover:border-paper">
                روابط السكن
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-3 flex justify-between text-xs font-bold text-paper/50">
              <span>غرفة WG شهرياً (أحمر)</span>
              <span>السكن الطلابي (أخضر)</span>
            </div>
            <ul className="space-y-2.5">
              {rentCities.map(([c, ar]) => {
                const r = rentFor(c)
                return (
                  <li key={c} className="grid grid-cols-[90px_1fr_88px] items-center gap-3 sm:grid-cols-[120px_1fr_96px]">
                    <span className="truncate font-semibold">{ar}</span>
                    <span dir="ltr" className="relative h-6 rounded bg-paper/5">
                      <span className="absolute inset-y-0 rounded bg-rust/90" style={{ left: `${(r.wg[0] / maxRent) * 100}%`, width: `${((r.wg[1] - r.wg[0]) / maxRent) * 100}%` }} />
                      <span className="absolute inset-y-2 rounded-full bg-[#7fc3a0]" style={{ left: `${(r.dorm[0] / maxRent) * 100}%`, width: `${((r.dorm[1] - r.dorm[0]) / maxRent) * 100}%` }} />
                    </span>
                    <span dir="ltr" className="num text-end text-sm font-bold text-paper/80">
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
        <SectionHead eyebrow="شاهد قبل أن تذهب" title="جولات في الحرم من طلاب عاشوا التجربة" action={<Link to="/videos" className="btn-ghost">مكتبة الفيديو <ArrowRight className="size-4" /></Link>}>
          لكل جامعة ومدينة قائمة فيديوهات خاصة: جولات الحرم والسكن وأدلة المدن، مُنتقاة بحيث يكون كل فيديو عن ذلك المكان فعلاً.
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
        <SectionHead eyebrow="16 ولاية" title="اعثر على منطقتك" />
        <div className="rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regions
            .filter((r) => r.code !== 'INT')
            .map((r) => (
              <Link key={r.code} to={`/regions/${r.slug}`} className="group card overflow-hidden transition-all hover:-translate-y-0.5 hover:border-ink">
                <RegionArt region={r} label={false} className="aspect-[2/1] w-full transition-transform duration-700 group-hover:scale-105" />
                <div className="border-t border-line p-4">
                  <p className="flex items-baseline justify-between gap-2">
                    <span className="text-lg font-extrabold">{r.name}</span>
                    <span className="text-sm font-semibold text-muted">{universitiesIn(r.code).length} جامعات</span>
                  </p>
                  <p className="mt-1 line-clamp-2 text-muted">{r.tagline}</p>
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
            <p className="text-2xl font-extrabold">مبني على قائمة الجامعات المضيفة من GJU</p>
            <p className="mt-1 text-muted">
              شروط اللغة والمعدل والرسوم في صفحة كل جامعة مطابقة لقائمة الجامعات المضيفة لـ{german.length} جامعة ألمانية و{universities.length - german.length} جامعات دولية. تأكد دائماً قبل الاختيار.
            </p>
          </div>
          <Link to="/universities" className="btn-primary">
            قارن كل الجامعات
          </Link>
        </div>
      </section>

      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
