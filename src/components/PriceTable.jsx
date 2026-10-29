import { useState } from 'react'
import { FileText, Home, ShoppingBasket, UtensilsCrossed, TrainFront, Smartphone, Dumbbell, Ticket, Snowflake } from 'lucide-react'
import { priceGroups, fmt, scale } from '../data/costs.js'
import { EstimateNote } from './ui.jsx'

const icons = { FileText, Home, ShoppingBasket, UtensilsCrossed, TrainFront, Smartphone, Dumbbell, Ticket, Snowflake }

const units = {
  month: '/ شهر', semester: '/ فصل', once: 'مرة واحدة', extra: 'إضافي', meal: '/ وجبة', piece: '/ حبة', kg: '/ كغ',
  jar: '/ علبة', litre: '/ لتر', pack: '/ علبة', cup: '/ كوب', glass: '/ كأس', bottle: '/ زجاجة', scoop: '/ كرة',
  trip: '/ رحلة', ride: '/ رحلة', return: 'ذهاب وعودة', cut: '/ مرة', wash: '/ غسلة', page: '/ صفحة', visit: '/ زيارة',
  item: '/ صنف', entry: '/ دخول', ticket: '/ تذكرة', person: '/ شخص', year: '/ سنة',
}

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
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="فئات الأسعار">
        {[{ id: 'all', title: 'الكل' }, ...priceGroups].map((g) => {
          const Icon = icons[g.icon]
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={tab === g.id}
              onClick={() => setTab(g.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors ${tab === g.id ? 'border-ink bg-ink text-paper' : 'border-line bg-card text-ink-2 hover:border-ink'}`}
            >
              {Icon && <Icon className="size-4" aria-hidden />}
              {g.title}
            </button>
          )
        })}
      </div>

      <div className="card mt-5 overflow-hidden">
        <table className="w-full text-start">
          <thead className="hidden border-b border-line text-xs font-bold text-muted sm:table-header-group">
            <tr>
              <th className="px-4 py-3 text-start">البند</th>
              <th className="px-4 py-3 text-start">{city ? <>السعر في <span dir="ltr">{city}</span></> : 'السعر'}</th>
              <th className="px-4 py-3 text-start">ملاحظات</th>
            </tr>
          </thead>
          {groups.map((g) => (
            <tbody key={g.id}>
              <tr className="bg-mint">
                <th colSpan={3} className="px-4 py-2.5 text-start text-sm font-extrabold text-forest">
                  {g.title}
                </th>
              </tr>
              {g.items.map((item) => (
                <tr key={item.name} className="flex flex-col border-b border-line px-4 py-3 last:border-0 sm:table-row sm:px-0 sm:py-0">
                  <td className="font-semibold sm:w-[34%] sm:px-4 sm:py-3">{item.name}</td>
                  <td className="whitespace-nowrap text-ink-2 sm:w-[22%] sm:px-4 sm:py-3">
                    <span dir="ltr" className="num font-bold">
                      {range(item, factor)}
                    </span>{' '}
                    <span className="text-sm text-muted">{units[item.unit] ?? ''}</span>
                  </td>
                  <td className="text-sm text-muted sm:px-4 sm:py-3">{item.note}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}
