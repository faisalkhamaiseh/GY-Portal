import { Link } from 'react-router-dom'
import { Logo } from './Header.jsx'
import { regions } from '../data/regions.js'
import { emergency } from '../data/guide.js'
import { DisclaimerText } from '../../components/Disclaimer.jsx'

export default function Footer() {
  return (
    <footer className="mt-12 bg-ink text-paper lg:mt-24">
      <div className="wrap grid gap-12 py-8 md:grid-cols-[1.3fr_2fr] lg:py-16">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/70">
            An unofficial, independent guide for German Year students. Always confirm requirements and deadlines with the official authorities.
          </p>
          <div className="mt-8 grid max-w-sm grid-cols-2 gap-2">
            {emergency.map((e) => (
              <a key={e.number} href={`tel:${e.number.replace(/\s/g, '')}`} className="rounded-xl border border-paper/15 px-3 py-2.5 hover:border-paper/40">
                <span className="block font-mono text-lg text-gold">{e.number}</span>
                <span className="block text-xs text-paper/60">{e.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-10 max-xl:hidden sm:grid-cols-3">
          <div>
            <p className="font-mono text-[11px] tracking-[0.14em] text-paper/50 uppercase">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ['/universities', 'All 126 host universities'],
                ['/regions', 'Regions of Germany'],
                ['/internships', 'Internship hub'],
                ['/costs', 'Costs & budget planner'],
                ['/housing', 'Housing & dorms'],
                ['/survival-map', 'Halal food & travel'],
                ['/rules', 'Hidden rules & fines'],
                ['/compare', 'Banks, SIMs & insurance'],
                ['/travel', 'Budget travel'],
                ['/apps', 'App directory'],
                ['/ingredients', 'Ingredient guide'],
                ['/videos', 'Video library'],
                ['/guide', 'Survival guide'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-paper/80 hover:text-paper">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.14em] text-paper/50 uppercase">Regions</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {regions.map((r) => (
                <li key={r.code}>
                  <Link to={`/regions/${r.slug}`} className="text-paper/80 hover:text-paper">
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10 bg-navy">
        <div className="wrap py-6 text-sm">
          <DisclaimerText lang="en" className="max-w-4xl leading-relaxed text-paper/85" />
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p>*Estimated cost. Prices are subject to change.</p>
          <p>Videos © their YouTube creators. Photos: A.Savin (FAL), Maxl2003 (CC BY 4.0), Wikimedia Commons.</p>
        </div>
        <div className="wrap pb-6 text-center text-[11px] tracking-wide text-paper/60 sm:text-left">
          Designed &amp; built by <span className="font-semibold text-paper/70">Faisal Khamaiseh</span>
        </div>
      </div>
    </footer>
  )
}
