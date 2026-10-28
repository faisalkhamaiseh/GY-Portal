import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export function SectionHead({ eyebrow, title, children, id, action }) {
  return (
    <div id={id} className="mb-8 flex scroll-mt-32 flex-col gap-4 border-t-2 border-ink pt-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h-display mt-1 text-3xl sm:text-4xl">{title}</h2>
        {children && <div className="mt-3 text-base leading-relaxed text-muted">{children}</div>}
      </div>
      {action}
    </div>
  )
}

export function ExtLink({ href, children, className = '' }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

export function LinkRow({ href, title, text, badge }) {
  return (
    <ExtLink href={href} className="group flex items-start justify-between gap-4 border-b border-dashed border-line py-3.5 last:border-0">
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 font-bold text-link group-hover:underline">
          {title}
          {badge && <span className="chip bg-mint text-forest">{badge}</span>}
        </span>
        {text && <span className="mt-0.5 block text-sm text-muted">{text}</span>}
      </span>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-forest" aria-hidden />
    </ExtLink>
  )
}

export function Callout({ title, children, tone = 'gold' }) {
  const bar = { gold: 'border-gold', rust: 'border-rust', forest: 'border-forest' }[tone]
  return (
    <div className={`border-s-4 ${bar} bg-card px-5 py-4 text-base leading-relaxed`}>
      {title && <strong className="font-bold">{title} </strong>}
      {children}
    </div>
  )
}

export function Stat({ value, label }) {
  return (
    <div className="px-5 py-4">
      <p className="num text-3xl font-extrabold">{value}</p>
      <p className="mt-1 text-sm leading-snug text-muted">{label}</p>
    </div>
  )
}

export function Tag({ kind, label }) {
  const tone = {
    german: 'bg-[#e4ecf6] text-[#1d4f80]',
    gpa: 'bg-amber text-[#7a5410]',
    fee: 'bg-blush text-rust-dark',
    open: 'bg-mint text-forest',
  }[kind]
  return <span className={`chip ${tone}`}>{label}</span>
}

export const ESTIMATE_TEXT = '*Estimated cost. Prices are subject to change.'

// Every price, rent or fine on the site is an estimate; this badge says so.
export function EstimateBadge({ className = '' }) {
  return (
    <span title={ESTIMATE_TEXT} aria-label={`تقديري. ${ESTIMATE_TEXT}`} className={`chip cursor-help bg-amber text-[#7a5410] ${className}`}>
      *تقديري
    </span>
  )
}

export function EstimateNote({ className = '' }) {
  return (
    <p className={`flex flex-wrap items-center gap-2 text-sm text-muted ${className}`}>
      <EstimateBadge />
      <span dir="ltr">{ESTIMATE_TEXT}</span>
      <span>الأرقام نطاقات تقديرية وليست أسعاراً رسمية.</span>
    </p>
  )
}

// Legal, governmental and academic steps always point to the official source.
export function OfficialLink({ href, label, internal, className = '' }) {
  const cls = `inline-flex items-center gap-1.5 rounded-full border-2 border-forest px-3 py-1.5 text-sm font-bold text-forest hover:bg-forest hover:text-paper ${className}`
  const body = (
    <>
      <ShieldCheck className="size-4" aria-hidden /> {internal ? label : `تحقق من الموقع الرسمي: ${label}`}
    </>
  )
  return internal ? (
    <a href={href} className={cls}>
      {body}
    </a>
  ) : (
    <ExtLink href={href} className={cls}>
      {body}
      <ArrowUpRight className="size-3.5" aria-hidden />
    </ExtLink>
  )
}
