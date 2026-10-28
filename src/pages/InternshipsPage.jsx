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
import Sections, { Panel } from '../components/Sections.jsx'
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
            <p className="eyebrow !text-gold">مركز التدريب العملي</p>
            <h1 className="mt-3 font-display text-5xl leading-[1.15] font-extrabold sm:text-6xl">
              فصل للدراسة.
              <br />
              <span className="text-gold">وفصل للعمل.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
              كل سنة ألمانية في GJU فيها فصل دراسي وفصل تدريب عملي. اعثر على شركات قرب جامعتك، وخطط لطلباتك، ولا تفوّت معارض التوظيف المناسبة.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#companies" className="btn bg-paper text-ink hover:bg-gold">
                <Briefcase className="size-4" /> تصفّح {totalCompanies} شركة
              </a>
              <ShareButton className="btn border border-paper/25 text-paper hover:border-paper" title="مركز التدريب العملي لطلاب GJU" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 self-end">
            {internship.rules.map((r) => (
              <div key={r.label} className="rounded-2xl border border-paper/15 p-4">
                <p className="text-xs font-bold text-paper/50">{r.label}</p>
                <p className="mt-1 text-xl font-extrabold text-gold">{r.value}</p>
                <p className="mt-1 text-sm text-paper/60">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap space-y-12 lg:space-y-24 lg:pt-16">
        <Sections label="أقسام الصفحة">
          <Panel id="plan" label="الخطة">
            <SectionHead eyebrow="الجدول الزمني" title="كيف تحصل على تدريبك">
              ابدأ في شهرك الأول في ألمانيا. تعامل مع البحث كأنه مادة تدرسها مع فصلك.
            </SectionHead>
            <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applicationSteps.map((s, i) => (
                <li key={s.title} className="card p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="num text-3xl font-black text-rust">0{i + 1}</span>
                    <span className="text-sm font-bold text-muted">{s.when}</span>
                  </div>
                  <p className="mt-3 text-lg font-extrabold">{s.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-2">{s.text}</p>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel id="companies" label="الشركات">
            <section id="companies" className="scroll-mt-24">
              <SectionHead
                eyebrow="الشركات حسب المنطقة"
                title={`شركات في ${region.name}`}
                action={
                  <label className="flex items-center gap-3">
                    <span className="font-semibold">المنطقة</span>
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
                شركات كبيرة تستقبل متدربين في الهندسة وإدارة الأعمال وعلم الحاسوب. اضغط على أي شركة لتبحث عن فرص التدريب الحالية فيها.
              </SectionHead>
              <CompanyList key={code} code={code} />
              <p className="mt-5 flex items-start gap-2 text-muted">
                <Info className="mt-1 size-4 shrink-0" />
                الشركات التي يؤكد مكتب السنة الألمانية في GJU أو طلاب سابقون أنها استضافت متدربين من GJU تحصل على شارة خضراء "استضافت طلاب GJU" وتظهر أولاً. الشركات المتوسطة قرب جامعتك غالباً أسهل من العلامات الكبيرة.
              </p>
              <Link to={`/regions/${region.slug}#internships`} className="btn-ghost mt-5">
                المزيد عن {region.name}
              </Link>
            </section>
          </Panel>

          <Panel id="fairs" label="المعارض">
            <SectionHead eyebrow="معارض التوظيف" title={`أين تلتقي بمسؤولي التوظيف في ${region.name}`}>
              المواعيد تتغير كل سنة. كل بطاقة تفتح بحثاً عن الموعد القادم.
            </SectionHead>
            <FairList code={code} />
          </Panel>

          <Panel id="tips" label="النصائح" className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="card p-6">
              <p className="eyebrow">نصائح</p>
              <h2 className="mt-1 text-3xl font-extrabold">التقديم في ألمانيا</h2>
              <ul className="mt-5 space-y-3">
                {applicationTips.map((t) => (
                  <li key={t} className="flex gap-3 leading-relaxed">
                    <GraduationCap className="mt-1 size-5 shrink-0 text-forest" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <p className="eyebrow">البحث</p>
              <h2 className="mt-1 text-3xl font-extrabold">مواقع الوظائف</h2>
              <div className="mt-3">
                {jobPortals.map((p) => (
                  <LinkRow key={p.name} href={p.url} title={p.name} text={p.text} />
                ))}
              </div>
            </div>
          </Panel>

          <Panel id="videos" label="الفيديوهات">
            <SectionHead eyebrow="شاهد" title="كيف فعلها طلاب دوليون آخرون" />
            <VideoGrid videos={videos ? videos.topics?.internship || [] : null} limit={8} emptyQuery="internship in Germany international student" />
          </Panel>
        </Sections>

        <Callout title="قبل أن توقّع أي شيء.">
          احصل على موافقة GJU على التدريب أولاً، وتأكد أن تصريح إقامتك يسمح به، واحتفظ بنسخة من العقد. التدريب الإلزامي (Pflichtpraktikum) لا يُحتسب من أيام العمل الـ140.
        </Callout>
      </div>
    </>
  )
}
