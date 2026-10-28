import { useEffect, useState } from 'react'
import { Check, Phone, Stethoscope } from 'lucide-react'
import { SectionHead, LinkRow, Callout, OfficialLink } from '../components/ui.jsx'
import Sections, { Panel } from '../components/Sections.jsx'
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
  // Start empty so the pre-rendered HTML matches, then load saved ticks.
  const [ticks, setTicks] = useState(null)
  useEffect(() => setTicks(loadTicks()), [])
  useEffect(() => {
    if (!ticks) return
    try {
      localStorage.setItem(KEY, JSON.stringify(ticks))
    } catch {
      // Storage can be blocked (private mode); ticks then last for this visit only.
    }
  }, [ticks])

  const total = checklist.reduce((n, g) => n + g.items.length, 0)
  const done = Object.values(ticks || {}).filter(Boolean).length

  return (
    <div className="wrap pt-6 lg:pt-12">
      <p className="eyebrow">دليل البقاء</p>

      <h1 className="h-display mt-2 max-w-4xl text-4xl sm:text-6xl">كل ما هو مشترك بين كل المدن</h1>

      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">خطة الوصول، وقوانين التدريب والعمل، وعبارات ألمانية للمواقف الحقيقية، وأرقام الطوارئ. مأخوذة من دليل شمالكالدن ومعدّلة لكل المدن المضيفة.</p>

      <Sections className="mt-8 lg:mt-12" label="أقسام الصفحة">
        <Panel id="plan" label="خطة الوصول">
          <SectionHead
            eyebrow="خطة الوصول"
            title="خطوة بخطوة، بالترتيب"
            action={
              <div className="w-full max-w-xs">
                <div className="flex justify-between text-sm font-bold">
                  <span>تقدّمك</span>
                  <span className="num">
                    {done}/{total}
                  </span>
                </div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-sand">
                  <div className="h-full rounded-full bg-forest transition-all" style={{ width: `${(done / total) * 100}%` }} />
                </div>
              </div>
            }
          >
            اضغط على أي مهمة لتؤشر عليها. علاماتك تُحفظ في هذا المتصفح.
          </SectionHead>
          <div className="space-y-12">
            {checklist.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-28">
                <h3 className="flex items-center gap-3 text-2xl font-extrabold">
                  {group.title}
                  <span className="chip bg-mint text-forest">{group.place}</span>
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => {
                    const on = !!ticks?.[item.id]
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setTicks((t) => ({ ...t, [item.id]: !t[item.id] }))}
                          aria-pressed={on}
                          className={`flex w-full gap-4 rounded-2xl border p-4 text-start transition-colors ${on ? 'border-forest bg-mint/60' : 'border-line bg-card hover:border-ink'}`}
                        >
                          <span className={`mt-1 grid size-6 shrink-0 place-items-center rounded-md border-2 ${on ? 'border-forest bg-forest text-paper' : 'border-ink'}`}>{on && <Check className="size-4" />}</span>
                          <span>
                            <span className={`block text-lg font-extrabold ${on ? 'text-forest line-through decoration-forest/40' : ''}`}>{item.title}</span>
                            <span className="mt-1 block leading-relaxed text-ink-2">{item.text}</span>
                          </span>
                        </button>
                        {item.official && <OfficialLink {...item.official} className="ms-14 mt-2" />}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Panel>

        <Panel id="timeline" label="التقويم">
          <SectionHead eyebrow="التقويم" title="سنتك خطوة بخطوة" />
          <ol className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {semester.map((s) => (
              <li key={s.month} className="card p-4">
                <p className="text-xl font-extrabold text-rust">{s.month}</p>
                <p className="mt-2 leading-snug text-ink-2">{s.label}</p>
              </li>
            ))}
          </ol>
        </Panel>

        <Panel id="internship" label="العمل">
          <SectionHead id="internship" eyebrow="الفصل الثاني" title="التدريب العملي والعمل الجانبي">
            السنة الألمانية نصفان: فصل دراسي في جامعتك المضيفة، ثم تدريب عملي في شركة ألمانية. تعامل مع البحث عن التدريب كأنه مادة تدرسها في فصلك الأول.
          </SectionHead>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="card p-6">
              <p className="eyebrow">خطة التدريب</p>
              <h3 className="mt-1 text-2xl font-extrabold">كيف تحصل عليه</h3>
              <ol className="mt-4 space-y-3">
                {internship.steps.map((s, i) => (
                  <li key={s} className="flex gap-3 leading-relaxed">
                    <span className="num text-lg font-black text-rust">{i + 1}</span>
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
              <p className="eyebrow">قوانين الطلاب من خارج الاتحاد الأوروبي</p>
              <h3 className="mt-1 text-2xl font-extrabold">العمل أثناء الدراسة</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {internship.rules.map((r) => (
                  <div key={r.label} className="rounded-xl bg-sand p-4">
                    <p className="text-xs font-bold text-muted">{r.label}</p>
                    <p className="mt-1 text-xl font-extrabold">{r.value}</p>
                    <p className="mt-1 text-sm text-ink-2">{r.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-muted">هذه مبادئ عامة فقط. تحقق من صيغة تصريح إقامتك ومن القوانين الحالية قبل أن تبدأ أي عمل.</p>
              <OfficialLink {...internship.rulesSource} className="mt-3" />
            </div>
          </div>
        </Panel>

        <Panel id="phrasebook" label="العبارات">
          <SectionHead id="phrasebook" eyebrow="العبارات" title="ألمانية للمواقف الحقيقية">
            المدن الصغيرة تتحدث الإنجليزية أقل من برلين. هذه العبارات تساعدك في الأسابيع الأولى.
          </SectionHead>
          <div className="grid gap-5 md:grid-cols-2">
            {phrasebook.map((g) => (
              <div key={g.group} className="card overflow-hidden">
                <p className="bg-mint px-5 py-2.5 font-extrabold text-forest">{g.group}</p>
                <dl className="divide-y divide-line">
                  {g.lines.map(([de, ar]) => (
                    <div key={de} className="grid gap-1 px-5 py-3 sm:grid-cols-2 sm:gap-4">
                      <dt dir="ltr" lang="de" className="text-start font-bold">
                        {de}
                      </dt>
                      <dd className="text-muted">{ar}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Panel>

        <Panel id="emergency" label="الطوارئ">
          <SectionHead id="emergency" eyebrow="الطوارئ" title="احفظ هذه الأرقام اليوم">
            الاتصال مجاني من أي هاتف.
          </SectionHead>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {emergency.map((e) => (
              <a key={e.number} href={`tel:${e.number.replace(/\s/g, '')}`} className="card border-t-4 border-t-rust p-5 transition-colors hover:border-ink">
                <Phone className="size-5 text-rust" aria-hidden />
                <p dir="ltr" className="num mt-3 text-start text-3xl font-black text-rust">
                  {e.number}
                </p>
                <p className="mt-1 text-ink-2">{e.label}</p>
              </a>
            ))}
          </div>
          <div className="mt-5">
            <Callout title="زيارة الطبيب.">
              <Stethoscope className="ms-1 inline size-4 text-forest" aria-hidden /> اذهب أولاً لطبيب عام (Hausarzt) مع بطاقة التأمين. الصيدليات (Apotheke) تبيع الأدوية، وهناك دائماً صيدلية مناوبة ليلاً مكتوبة على باب كل صيدلية. إن فقدت جوازك: أبلغ الشرطة، ثم تواصل مع السفارة الأردنية في برلين.
            </Callout>
          </div>
        </Panel>
      </Sections>
    </div>
  )
}
