import { useState } from 'react'
import { FileText, Home, ShoppingBasket, UtensilsCrossed, TrainFront, Smartphone, Dumbbell, Ticket, Snowflake } from 'lucide-react'
import { priceGroups, fmt, scale } from '../data/costs.js'
import { EstimateNote } from './ui.jsx'

const icons = { FileText, Home, ShoppingBasket, UtensilsCrossed, TrainFront, Smartphone, Dumbbell, Ticket, Snowflake }

const unitLabel = (u) => ({ month: '/ month', semester: '/ semester', once: 'once', extra: 'extra' })[u] ?? `/ ${u}`

function range(item, factor) {
  const a = scale(item.min, factor, item.fixed)
  const b = scale(item.max, factor, item.fixed)
  if (a === 0 && b === 0) return '€0'
  return a === b ? fmt(a) : `${fmt(a)}–${fmt(b).slice(1)}`
}

export default function PriceTable({ factor = 1, city }) {
  const [tab, setTab] = useState('all')
  const groups = tab === 'all' ? priceGroups : priceGroups.filter((g) => g.id === tab)

  return (
    <div>
      <EstimateNote className="mb-4" />
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Price categories">
        {[{ id: 'all', title: 'Everything' }, ...priceGroups].map((g) => {
          const Icon = icons[g.icon]
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={tab === g.id}
              onClick={() => setTab(g.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${tab === g.id ? 'border-ink bg-ink text-paper' : 'border-line bg-card text-ink-2 hover:border-ink'}`}
            >
              {Icon && <Icon className="size-3.5" aria-hidden />}
              {g.title}
            </button>
          )
        })}
      </div>

      <div className="card mt-5 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="hidden border-b border-line font-mono text-[10.5px] tracking-wider text-muted uppercase sm:table-header-group">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">{city ? `Price in ${city}` : 'Price'}</th>
              <th className="px-4 py-3 font-medium">Notes</th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.id}>
              <tr className="bg-mint">
                <th colSpan={3} className="px-4 py-2.5 font-mono text-[11px] font-semibold tracking-wider text-forest uppercase">
                  {g.title}
                </th>
              </tr>
              {g.items.map((item) => (
                <tr key={item.name} className="flex flex-col border-b border-line px-4 py-3 last:border-0 sm:table-row sm:px-0 sm:py-0">
                  <td className="font-medium sm:w-[34%] sm:px-4 sm:py-3">{item.name}</td>
                  <td className="font-mono text-[13px] whitespace-nowrap text-ink-2 sm:w-[22%] sm:px-4 sm:py-3">
                    {range(item, factor)} <span className="text-muted">{unitLabel(item.unit)}</span>
                  </td>
                  <td className="text-[13px] text-muted sm:px-4 sm:py-3">{item.note}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}
