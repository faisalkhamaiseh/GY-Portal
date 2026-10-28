import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export function SectionHead({ eyebrow, title, children, id, action }) {
  return (
    <div id={id} className="mb-8 flex scroll-mt-32 flex-col gap-4 border-t-2 border-ink pt-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h-display mt-2 text-3xl sm:text-4xl">{title}</h2>
        {children && <div className="mt-3 text-[15px] leading-relaxed text-muted max-lg:line-clamp-3">{children}</div>}
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
    <ExtLink
      href={href}
      className="group flex items-start justify-between gap-4 border-b border-dashed border-line py-3.5 last:border-0"
    >
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 font-semibold text-link group-hover:underline">
          {title}
          {badge && <span className="chip bg-mint text-forest">{badge}</span>}
        </span>
        {text && <span className="mt-0.5 block text-sm text-muted">{text}</span>}
      </span>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    </ExtLink>
  )
}

export function Callout({ title, children, tone = 'gold' }) {
  const bar = { gold: 'border-gold', rust: 'border-rust', forest: 'border-forest' }[tone]
  return (
    <div className={`border-l-4 ${bar} bg-card px-5 py-4 text-[15px] leading-relaxed`}>
      {title && <strong className="font-semibold">{title} </strong>}
      {children}
    </div>
  )
}

export function Stat({ value, label }) {
  return (
    <div className="px-5 py-4">
      <p className="font-display text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs leading-snug text-muted">{label}</p>
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
    <span title={ESTIMATE_TEXT} aria-label={ESTIMATE_TEXT} className={`chip cursor-help bg-amber text-[#7a5410] ${className}`}>
      *Estimate
    </span>
  )
}

export function EstimateNote({ className = '' }) {
  return (
    <p className={`flex flex-wrap items-center gap-2 text-sm text-muted ${className}`}>
      <EstimateBadge />
      <span>{ESTIMATE_TEXT} Figures are estimated ranges, not official prices.</span>
    </p>
  )
}

// Legal, governmental and academic steps always point to the official source.
export function OfficialLink({ href, label, internal, className = '' }) {
  const cls = `inline-flex items-center gap-1.5 rounded-full border-2 border-forest px-3 py-1.5 text-sm font-bold text-forest hover:bg-forest hover:text-paper ${className}`
  const body = (
    <>
      <ShieldCheck className="size-4" aria-hidden /> {internal ? label : `Check Official Website: ${label}`}
    </>
  )
  return internal ? (
    <a href={`/en${href}`} className={cls}>
      {body}
    </a>
  ) : (
    <ExtLink href={href} className={cls}>
      {body}
      <ArrowUpRight className="size-3.5" aria-hidden />
    </ExtLink>
  )
}
