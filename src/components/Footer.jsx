import { Link } from 'react-router-dom'
import { Logo } from './Header.jsx'
import { regions } from '../data/regions.js'
import { emergency } from '../data/guide.js'
import { DisclaimerText } from './Disclaimer.jsx'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed text-paper/70">
            دليل مستقل وغير رسمي لطلاب السنة الألمانية. تحقق دائماً من الشروط والمواعيد مع الجهات الرسمية.
          </p>
          <div className="mt-8 grid max-w-sm grid-cols-2 gap-2">
            {emergency.map((e) => (
              <a key={e.number} href={`tel:${e.number.replace(/\s/g, '')}`} className="rounded-xl border border-paper/15 px-3 py-2.5 hover:border-paper/40">
                <span className="num block text-lg font-bold text-gold" dir="ltr">
                  {e.number}
                </span>
                <span className="block text-xs text-paper/60">{e.label}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-sm font-bold text-paper/50">استكشف</p>
            <ul className="mt-4 space-y-2">
              {[
                ['/universities', 'كل الجامعات الـ126'],
                ['/regions', 'مناطق ألمانيا'],
                ['/internships', 'مركز التدريب العملي'],
                ['/costs', 'التكاليف ومخطط الميزانية'],
                ['/housing', 'السكن والسكنات الطلابية'],
                ['/survival-map', 'الطعام الحلال والسفر'],
                ['/ingredients', 'دليل المكونات'],
                ['/rules', 'القوانين والغرامات'],
                ['/compare', 'البنوك والشرائح والتأمين'],
                ['/travel', 'السفر الاقتصادي'],
                ['/apps', 'دليل التطبيقات'],
                ['/videos', 'مكتبة الفيديو'],
                ['/guide', 'دليل البقاء'],
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
            <p className="text-sm font-bold text-paper/50">المناطق</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
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
          <DisclaimerText className="max-w-4xl space-y-2 leading-relaxed text-paper/85" />
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="wrap flex flex-col gap-2 py-6 text-xs text-paper/50 sm:flex-row sm:justify-between">
          <p dir="ltr">*Estimated cost. Prices are subject to change.</p>
          <p>الفيديوهات © لأصحابها على يوتيوب. الصور: A.Savin (FAL) وMaxl2003 (CC BY 4.0)، ويكيميديا كومنز.</p>
        </div>
        <div className="wrap pb-6 text-center text-xs text-paper/40 sm:text-start">
          تصميم وتطوير <span className="font-bold text-paper/70">Faisal Khamaiseh</span>
        </div>
      </div>
    </footer>
  )
}
