import { Children, cloneElement, isValidElement, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// Long pages become app-style tabs on phones: a sticky, swipeable tab strip
// shows one section at a time, so nothing needs endless scrolling. From lg up
// every section is stacked as a normal page. All panels are in the HTML (for
// search engines and instant switching); only the active one shows on phones.

export function Panel({ hidden, className = '', children, label: _label, id }) {
  return (
    <section data-panel={id} className={`panel ${hidden ? 'max-lg:hidden' : ''} ${className}`}>
      {children}
    </section>
  )
}

export default function Sections({ children, className = '', label }) {
  const panels = Children.toArray(children).filter((c) => isValidElement(c) && c.props.label)
  const [active, setActive] = useState(panels[0]?.props.id)
  const { hash } = useLocation()
  const bar = useRef(null)
  const touch = useRef(null)

  // Open the panel a link points to (#housing, or any id inside a panel).
  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1))
    if (!id) return
    const panel = panels.some((p) => p.props.id === id) ? id : document.getElementById(id)?.closest('[data-panel]')?.dataset.panel
    if (panel) setActive(panel)
  }, [hash]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the active tab visible in the strip.
  useEffect(() => {
    const el = bar.current?.querySelector('[aria-selected="true"]')
    if (!el || !bar.current) return
    const strip = bar.current
    const left = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2
    strip.scrollTo({ left, behavior: 'smooth' })
  }, [active])

  const select = useCallback((id) => {
    setActive(id)
    history.replaceState(history.state, '', `#${id}`)
    // Start the new section at its top, just under the tab strip.
    const top = bar.current?.parentElement.getBoundingClientRect().top ?? 0
    if (top < 0) window.scrollBy({ top: top - 1 })
  }, [])

  const ids = panels.map((p) => p.props.id)
  const onTouchStart = (e) => {
    // Leave horizontal scrollers (card rails, tables) alone.
    if (e.target.closest('.rail, .overflow-x-auto, input, [data-noswipe]')) return (touch.current = null)
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.8) return
    const rtl = document.documentElement.dir === 'rtl'
    const step = (dx < 0) !== rtl ? 1 : -1
    const next = ids[ids.indexOf(active) + step]
    if (next) select(next)
  }

  return (
    <div className={className}>
      <div className="sticky top-14 z-20 -mx-4 border-b border-line bg-paper sm:-mx-6 lg:hidden">
        <div ref={bar} role="tablist" aria-label={label} className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 py-2.5 sm:px-6">
          {panels.map((p) => (
            <button
              key={p.props.id}
              type="button"
              role="tab"
              aria-selected={active === p.props.id}
              onClick={() => select(p.props.id)}
              className={`press min-h-10 shrink-0 rounded-full px-4 text-[15px] font-bold transition-colors ${active === p.props.id ? 'bg-ink text-paper' : 'bg-card text-ink-2 ring-1 ring-line'}`}
            >
              {p.props.label}
            </button>
          ))}
        </div>
      </div>
      <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="pt-5 lg:space-y-24 lg:pt-0">
        {panels.map((p) => cloneElement(p, { hidden: p.props.id !== active }))}
      </div>
    </div>
  )
}
