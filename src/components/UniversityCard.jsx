import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { regionByCode } from '../data/regions.js'
import { requirementTags } from '../lib/data.js'
import { Tag } from './ui.jsx'
import { thumb } from './VideoGrid.jsx'

export default function UniversityCard({ u, videoId }) {
  const region = regionByCode[u.region]
  return (
    <Link
      to={`/universities/${u.id}`}
      className="group card flex flex-col overflow-hidden transition-all hover:-translate-y-0.5 hover:border-ink hover:shadow-[0_20px_40px_-24px_rgba(29,36,32,0.45)]"
    >
      <div className="relative aspect-[16/8] overflow-hidden bg-sand">
        {videoId ? <img src={thumb(videoId)} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /> : <div className="grain size-full" />}
        <span className="absolute top-3 start-3 rounded-md bg-paper/95 px-2 py-1 text-[11px] font-bold text-ink">{u.abroad ? u.countryName : `${region.name} · ${u.zip}`}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p dir="auto" className="text-start text-lg leading-snug font-extrabold">
          {u.name}
        </p>
        <p className="mt-1 text-sm text-muted">
          <span dir="ltr">{u.city}</span> · {u.abroad ? u.countryName : region.name}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {requirementTags(u).map((t) => (
            <Tag key={t.label} {...t} />
          ))}
        </div>
        <span className="mt-auto flex items-center gap-1 pt-4 font-bold text-forest">
          افتح الدليل <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
