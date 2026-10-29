import { useId, useState } from 'react'
import { AlertTriangle, Check, X, Moon, WashingMachine, Music, Hammer, Wine, ShowerHead, Scale } from 'lucide-react'
import ShareButton from '../components/ShareButton.jsx'
import { SectionHead, Callout } from '../components/ui.jsx'
import Sections, { Panel } from '../components/Sections.jsx'
import { torrent, bins, wasteExtras, quietHours, otherRules } from '../data/rules.js'

function Bin({ color, label, active }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 120 150" className={`h-24 w-auto transition-transform sm:h-28 ${active ? 'scale-110' : ''}`} aria-hidden>
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <rect x="22" y="40" width="76" height="98" rx="8" fill={color} />
      <rect x="22" y="40" width="76" height="98" rx="8" fill={`url(#${id}-shade)`} />
      <rect x="14" y="26" width="92" height="16" rx="5" fill={color} />
      <rect x="14" y="26" width="92" height="16" rx="5" fill="#000" opacity="0.18" />
      <rect x="48" y="18" width="24" height="9" rx="3" fill={color} />
      <rect x="32" y="62" width="56" height="30" rx="4" fill="#fff" opacity="0.94" />
      <text x="60" y="83" textAnchor="middle" fontFamily="Cairo, sans-serif" fontSize="15" fontWeight="800" fill="#1d2420">
        {label}
      </text>
      <circle cx="34" cy="140" r="7" fill="#1d2420" />
      <circle cx="86" cy="140" r="7" fill="#1d2420" />
    </svg>
  )
}

function Clock() {
  // ساعة 24 ساعة: هدوء الليل 22–06 مظلل، وهدوء الظهيرة 13–15 بلون فاتح.
  const arc = (from, to, r) => {
    const a = (h) => ((h / 24) * 360 - 90) * (Math.PI / 180)
    const [x1, y1] = [100 + r * Math.cos(a(from)), 100 + r * Math.sin(a(from))]
    const [x2, y2] = [100 + r * Math.cos(a(to)), 100 + r * Math.sin(a(to))]
    const span = (to - from + 24) % 24
    return `M100 100 L${x1} ${y1} A${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${x2} ${y2}Z`
  }
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-56" role="img" aria-label="ساعة 24 ساعة: هدوء من 22:00 إلى 06:00 ومن 13:00 إلى 15:00">
      <circle cx="100" cy="100" r="90" fill="#fffdf8" stroke="#ddd6c8" strokeWidth="2" />
      <path d={arc(22, 6, 88)} fill="#1d2420" />
      <path d={arc(13, 15, 88)} fill="#d9a43b" opacity="0.7" />
      {Array.from({ length: 24 }, (_, h) => {
        const a = ((h / 24) * 360 - 90) * (Math.PI / 180)
        return (
          <text key={h} x={100 + 72 * Math.cos(a)} y={100 + 72 * Math.sin(a) + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Cairo, sans-serif" fill={h >= 22 || h < 6 ? '#f7f4ee' : '#66706a'}>
            {h % 3 === 0 ? h : '·'}
          </text>
        )
      })}
      <circle cx="100" cy="100" r="32" fill="#fffdf8" />
      <text x="100" y="98" textAnchor="middle" fontSize="13" fontWeight="800" fill="#1d2420" fontFamily="Cairo, sans-serif">
        هدوء
      </text>
      <text x="100" y="113" textAnchor="middle" fontSize="9" fontWeight="700" fill="#66706a" fontFamily="Cairo, sans-serif" direction="ltr" unicodeBidi="bidi-override">
        22–06
      </text>
    </svg>
  )
}

const avoidIcons = [WashingMachine, Music, ShowerHead, Hammer, Wine]

export default function RulesPage() {
  const [bin, setBin] = useState('paper')
  const b = bins.find((x) => x.id === bin)

  return (
    <div className="wrap pt-6 lg:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">القوانين الخفية</p>
          <h1 className="h-display mt-2 max-w-4xl text-4xl sm:text-6xl">القوانين اليومية التي تكلّف الطلاب أموالاً</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-2">لا أحد يخبرك بها في التوجيه. كل واحدة منها كلّفت طلاب GJU مالاً حقيقياً: رسالة تورنت، أو إنذار من المؤجر، أو غرامة في الترام. اقرأها قبل أن تسكن.</p>
        </div>
        <ShareButton title="القوانين الخفية في ألمانيا: دليل السنة الألمانية" />
      </div>

      <Sections className="mt-8 lg:mt-12" label="أقسام الصفحة">
        <Panel id="torrents" label="التورنت">
          <div className="overflow-hidden rounded-3xl border-2 border-rust bg-blush/50">
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-rust px-3 py-1 text-sm font-bold text-paper">
                  <AlertTriangle className="size-4" /> تحذير صارم
                </p>
                <h2 className="mt-4 text-3xl leading-snug font-extrabold sm:text-4xl">{torrent.title}</h2>
                <p className="mt-3 text-4xl font-black text-rust sm:text-5xl">{torrent.fine}</p>
                <p className="text-muted">المطالبة المعتادة في رسالة الإنذار</p>
                <ul className="mt-6 space-y-3">
                  {torrent.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed">
                      <X className="mt-1 size-5 shrink-0 text-rust" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5">
                <div className="rounded-2xl bg-card p-5">
                  <p className="text-lg font-extrabold">إن وصلتك رسالة إنذار (Abmahnung)</p>
                  <ol className="mt-3 space-y-2 leading-relaxed text-ink-2">
                    {torrent.ifYouGetOne.map((t, i) => (
                      <li key={t} className="flex gap-2">
                        <span className="num font-black text-rust">{i + 1}.</span> {t}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-2xl bg-card p-5">
                  <p className="text-lg font-extrabold">شاهد واستمع بشكل قانوني</p>
                  <ul className="mt-3 space-y-2 text-ink-2">
                    {torrent.legal.map((t) => (
                      <li key={t} className="flex gap-2">
                        <Check className="mt-1 size-4 shrink-0 text-forest" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel id="waste" label="النفايات">
          <SectionHead id="waste" eyebrow="Mülltrennung" title="فرز النفايات">
            ألمانيا تفرز النفايات إلى خمسة أنواع. ألوان الحاويات قد تختلف قليلاً حسب المدينة، والملصق على الغطاء يخبرك دائماً. اضغط على أي حاوية.
          </SectionHead>
          <div className="grid grid-cols-5 items-end gap-1 sm:gap-6" role="tablist" aria-label="حاويات النفايات">
            {bins.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={bin === x.id}
                onClick={() => setBin(x.id)}
                className={`flex flex-col items-center rounded-2xl border-2 px-1 pt-4 pb-3 transition-colors ${bin === x.id ? 'border-ink bg-card' : 'border-transparent hover:bg-card'}`}
              >
                <Bin color={x.color} label={x.short} active={bin === x.id} />
                <span className="mt-2 text-center text-xs font-extrabold sm:text-base">{x.name}</span>
                <span dir="ltr" className="hidden text-center text-xs text-muted sm:block">
                  {x.de}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2" role="tabpanel">
            <div className="rounded-2xl border-2 border-forest bg-mint/60 p-6">
              <p className="flex items-center gap-2 text-xl font-extrabold">
                <span className="size-4 rounded" style={{ background: b.color }} /> {b.name}: نعم
              </p>
              <p className="mt-1 text-sm text-muted">
                {b.lid} · <span dir="ltr">{b.de}</span>
              </p>
              <ul className="mt-4 space-y-2">
                {b.yes.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-1 size-5 shrink-0 text-forest" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-rust bg-blush/60 p-6">
              <p className="text-xl font-extrabold">ليس في هذه الحاوية</p>
              <ul className="mt-4 space-y-2">
                {b.no.map((t) => (
                  <li key={t} className="flex gap-2">
                    <X className="mt-1 size-5 shrink-0 text-rust" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {wasteExtras.map((w) => (
              <article key={w.title} className="card p-5">
                <h3 className="text-lg font-extrabold">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{w.text}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel id="quiet" label="الهدوء">
          <SectionHead id="quiet" eyebrow="Ruhezeit" title="ساعات الهدوء">
            البنايات الألمانية تأخذ وقت الهدوء بجدية. قوانين البناية (Hausordnung) جزء من عقد إيجارك، فاقرأها.
          </SectionHead>
          <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr]">
            <div className="card p-6">
              <Clock />
              <div className="mt-4 flex justify-center gap-4 text-xs font-bold text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded-sm bg-ink" /> هدوء الليل
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-3 rounded-sm bg-gold" /> الظهيرة (حسب البناية)
                </span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {quietHours.blocks.map((q) => (
                <div key={q.label} className="card p-5">
                  <Moon className="size-5 text-forest" />
                  <p className="mt-3 text-sm font-bold text-muted">{q.label}</p>
                  <p dir="auto" className="num mt-1 text-start text-2xl font-extrabold">
                    {q.time}
                  </p>
                  <p className="mt-2 text-ink-2">{q.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 card p-6">
            <p className="text-xl font-extrabold">تجنّب في ساعات الهدوء</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quietHours.avoid.map((t, i) => {
                const Icon = avoidIcons[i % avoidIcons.length]
                return (
                  <li key={t} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blush text-rust">
                      <Icon className="size-4" />
                    </span>
                    {t}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="mt-5">
            <Callout title="ماذا يحدث إن تجاهلتها؟" tone="rust">
              {quietHours.consequences}
            </Callout>
          </div>
        </Panel>

        <Panel id="fines" label="الغرامات">
          <SectionHead id="fines" eyebrow="غرامات أخرى" title="أخطاء صغيرة، تكاليف حقيقية" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherRules.map((r) => (
              <article key={r.title} className="card flex gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber text-[#7a5410]">
                  <Scale className="size-5" />
                </span>
                <div>
                  <p className="text-lg font-extrabold">{r.title}</p>
                  <p className="font-bold text-rust">{r.fine}</p>
                  <p className="mt-1.5 leading-relaxed text-ink-2">{r.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-muted">الغرامات هي المبالغ المعتمدة في كتالوج المخالفات الألماني (Bußgeldkatalog) وقوانين المواصلات، وتزيد إذا عرّضت أحداً للخطر أو سببت ضرراً. Prices are subject to change.</p>
        </Panel>
      </Sections>
    </div>
  )
}
