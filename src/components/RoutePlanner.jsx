import { useMemo, useState } from 'react'
import { ArrowLeftRight, ArrowUpRight, Bus, Plane, TrainFront, Zap } from 'lucide-react'
import { stations, pickable, plan, verdict, links, SPARPREIS_FROM } from '../lib/routes.js'
import { regions } from '../data/regions.js'
import { EstimateNote, ExtLink } from './ui.jsx'

const name = (id) => stations[id].ar
const amount = (n) => (n % 1 ? n.toFixed(2) : String(n))
const euro = (n) => `${amount(n)} يورو`
const duration = (m) => (m < 60 ? `${m} دقيقة` : `${Math.floor(m / 60)} س ${String(m % 60).padStart(2, '0')} د`)
const changes = (n) => (n === 0 ? 'مباشر' : n === 1 ? 'تبديل واحد' : n === 2 ? 'تبديلان' : n <= 10 ? `${n} تبديلات` : `${n} تبديلاً`)
const longDistance = (t) => t.legs.find((l) => l.type !== 'RE' && l.type !== 'RB' && l.type !== 'S').type

const groups = regions
  .filter((r) => r.code !== 'INT')
  .map((r) => ({ label: r.name, ids: pickable.filter((id) => stations[id].region === r.code) }))
  .sort((a, b) => a.label.localeCompare(b.label, 'ar'))
const regionName = (id) => regions.find((r) => r.code === stations[id].region)?.name

function StationSelect({ label, value, onChange }) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="text-sm font-bold">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-xl border border-line bg-card px-3 py-3 text-base">
        {groups.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.ids.map((id) => (
              <option key={id} value={id}>
                {name(id)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  )
}

function Legs({ trip }) {
  return (
    <ol className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
      {trip.legs.map((l, i) => (
        <li key={i}>
          {i > 0 && <p className="mb-2 ps-1 text-xs font-bold text-muted">التبديل في {name(l.from)}</p>}
          <p className="flex items-center gap-2">
            <span className={`chip shrink-0 ${l.type === 'RE' || l.type === 'RB' || l.type === 'S' ? 'bg-mint text-forest' : 'bg-blush text-rust-dark'}`}>{l.type}</span>
            <span className="min-w-0 flex-1 font-bold">
              {name(l.from)} ← {name(l.to)}
            </span>
            <span className="shrink-0 text-xs text-muted">{duration(l.minutes)}</span>
          </p>
        </li>
      ))}
    </ol>
  )
}

function Option({ icon: Icon, title, price, tone, time, sub, children }) {
  return (
    <article className={`flex flex-col rounded-2xl border border-t-4 border-line bg-card p-5 ${tone}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 font-bold">
          <Icon className="size-5 shrink-0" aria-hidden /> {title}
        </p>
        <span className="chip num shrink-0 bg-paper text-ink" dir="ltr">
          {price}
        </span>
      </div>
      <p className="mt-3 text-3xl font-extrabold">{time}</p>
      <p className="text-sm text-muted">{sub}</p>
      {children}
    </article>
  )
}

function Advice({ r }) {
  const { free, fast, bus, flight } = r
  const saved = fast && free.minutes - fast.minutes
  switch (verdict(r)) {
    case 'free':
      return (
        <>
          <strong>خذ القطارات الإقليمية.</strong> مجانية مع تذكرتك الفصلية
          {fast ? ` وأبطأ من ${longDistance(fast)} بـ${duration(saved)} فقط.` : '، ولا يوجد قطار أسرع على هذا الطريق.'}
        </>
      )
    case 'free-or-fast':
      return (
        <>
          <strong>مجاناً إذا كان عندك وقت:</strong> القطارات الإقليمية تأخذ {duration(free.minutes)} ({changes(free.changes)}). وإذا كان الوقت مهماً، فقطار {longDistance(fast)} يوفّر {duration(saved)} بسعر يبدأ من {euro(SPARPREIS_FROM)} إذا حجزت مبكراً.
        </>
      )
    case 'bus':
      return (
        <>
          <strong>FlixBus أرخص خيار مدفوع:</strong> يبدأ من {euro(bus.from)}، وأبطأ من القطار بـ{duration(bus.minutes - fast.minutes)} فقط. القطارات الإقليمية مجانية لكنها تأخذ {duration(free.minutes)}.
        </>
      )
    default:
      return (
        <>
          <strong>احجز تذكرة ICE Sparpreis مبكراً</strong> (من {euro(SPARPREIS_FROM)}): {duration(fast.minutes)} بدلاً من {duration(free.minutes)} و{changes(free.changes)} بالقطارات الإقليمية.
          {bus && ` حافلة FlixBus (من ${euro(bus.from)}) أرخص من تذكرة قطار في آخر لحظة (حوالي ${euro(fast.flex)})، لكنها تأخذ ${duration(bus.minutes)}.`}
          {flight && ` الطيران نادراً ما يستحق: غالباً 70–200 يورو، ومع ذلك حوالي ${duration(flight.minutes)} من الباب إلى الباب.`}
        </>
      )
  }
}

export default function RoutePlanner() {
  const [from, setFrom] = useState('SMK')
  const [to, setTo] = useState('B')
  const r = useMemo(() => (from === to ? null : plan(from, to)), [from, to])

  return (
    <div>
      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:p-5">
        <StationSelect label="من" value={from} onChange={setFrom} />
        <button
          type="button"
          onClick={() => {
            setFrom(to)
            setTo(from)
          }}
          className="press grid size-11 shrink-0 place-items-center self-center rounded-full border border-line bg-paper hover:border-ink sm:self-end"
          aria-label="بدّل نقطة الانطلاق والوجهة"
        >
          <ArrowLeftRight className="size-4 max-sm:rotate-90" />
        </button>
        <StationSelect label="إلى" value={to} onChange={setTo} />
      </div>

      {!r ? (
        <p className="mt-6 text-muted">اختر مكانين مختلفين.</p>
      ) : (
        <>
          <p className="mt-6 text-xs font-bold text-muted">
            {name(from)} ({regionName(from)}) ← {name(to)} ({regionName(to)}) · {r.km} كم بخط مستقيم
          </p>
          <div className="mt-3 border-s-4 border-forest bg-card px-5 py-4 text-[15px] leading-relaxed">
            <Advice r={r} />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <Option icon={TrainFront} title="القطارات الإقليمية فقط" price="€0" tone="border-t-forest" time={duration(r.free.minutes)} sub={`${changes(r.free.changes)} · مجانية مع تذكرتك الفصلية`}>
              <Legs trip={r.free} />
              <p className="mt-4 text-xs text-muted">ما عندك تذكرة فصلية؟ تذكرة Deutschlandticket بـ63 يورو تغطي هذه الرحلة أيضاً.</p>
            </Option>

            {r.fast && (
              <Option icon={Zap} title={`الأسرع: ${longDistance(r.fast)}`} price={`€${amount(SPARPREIS_FROM)}+`} tone="border-t-rust" time={duration(r.fast.minutes)} sub={`${changes(r.fast.changes)} · يوفّر ${duration(r.free.minutes - r.fast.minutes)}`}>
                <Legs trip={r.fast} />
                <ul className="mt-4 space-y-1 border-t border-line pt-4 text-sm">
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">حجز قبل أسابيع (Super Sparpreis)</span>
                    <span className="shrink-0">من {euro(SPARPREIS_FROM)}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span className="text-muted">في نفس اليوم (Flexpreis)*</span>
                    <span className="shrink-0">حوالي {euro(r.fast.flex)}</span>
                  </li>
                  <li className="text-xs text-muted">بطاقة My BahnCard 25 (39.90 يورو للسنة لمن دون 27) تخصم 25% من الاثنين. الأجزاء الإقليمية مجانية مع تذكرتك.</li>
                </ul>
              </Option>
            )}

            {r.bus && (
              <Option icon={Bus} title="FlixBus" price={`€${amount(r.bus.from)}+*`} tone="border-t-gold" time={duration(r.bus.minutes)} sub="غالباً مباشر، من وسط المدينة إلى وسط المدينة">
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">
                  {r.fast
                    ? r.bus.minutes > r.fast.minutes
                      ? `أبطأ من القطار بـ${duration(r.bus.minutes - r.fast.minutes)}، لكنه غالباً أرخص من تذكرة قطار تشتريها متأخراً.`
                      : 'بسرعة القطار تقريباً، وغالباً أرخص.'
                    : r.bus.minutes < r.free.minutes
                      ? `أسرع من القطارات الإقليمية بـ${duration(r.free.minutes - r.bus.minutes)}، لكنه مدفوع.`
                      : 'أبطأ من القطارات الإقليمية المجانية.'}{' '}
                  الأسعار ترتفع مع امتلاء المقاعد، فاحجز قبل أسبوع أو أسبوعين.
                </p>
              </Option>
            )}

            {r.flight && (
              <Option icon={Plane} title={`طيران ${r.flight.airA}–${r.flight.airB}`} price="€70–200*" tone="border-t-ink" time={duration(r.flight.minutes)} sub={`من الباب إلى الباب · حوالي ${duration(r.flight.air)} في الجو`}>
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink-2">أضف حوالي ساعتين لقطار المطار والتفتيش والصعود. بقيت رحلات داخلية قليلة، والحقيبة المشحونة بتكلفة إضافية.</p>
              </Option>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <ExtLink href={links.maps(from, to)} className="btn-ghost">
              المواعيد المباشرة <ArrowUpRight className="size-4" />
            </ExtLink>
            <ExtLink href="https://www.bahn.de" className="btn-ghost">
              احجز على bahn.de <ArrowUpRight className="size-4" />
            </ExtLink>
            {r.bus && (
              <ExtLink href="https://www.flixbus.de" className="btn-ghost">
                FlixBus <ArrowUpRight className="size-4" />
              </ExtLink>
            )}
            {r.flight && (
              <ExtLink href={links.flights(r.flight.airA, r.flight.airB)} className="btn-ghost">
                Google Flights <ArrowUpRight className="size-4" />
              </ExtLink>
            )}
            <ExtLink href={links.compare(from, to)} className="btn-ghost">
              قارن كل الخيارات <ArrowUpRight className="size-4" />
            </ExtLink>
          </div>
        </>
      )}

      <EstimateNote className="mt-6" />
      <p className="mt-2 text-sm text-muted">
        الأوقات قيم نموذجية من جدول المواعيد وليست بيانات مباشرة، وأعمال الصيانة قد تضيف ساعات. قبل السفر افحص تطبيق DB Navigator، وفعّل خيار «Nur Nahverkehr» (المواصلات المحلية فقط) لترى القطارات التي تغطيها تذكرتك. إذا كنت في بلدة صغيرة، أضف القطار الإقليمي المجاني إلى أقرب مدينة في القائمة.
      </p>
    </div>
  )
}
