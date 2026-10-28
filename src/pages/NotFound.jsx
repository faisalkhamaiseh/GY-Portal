import { Link } from 'react-router-dom'
import { FinderBox } from '../components/UniversityFinder.jsx'

export default function NotFound() {
  return (
    <div className="wrap max-w-2xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-2 text-5xl">لم نجد هذه الصفحة</h1>
      <p className="mt-4 text-lg text-ink-2">قد يكون الرابط قديماً. ابحث عن جامعتك، أو ارجع للصفحة الرئيسية.</p>
      <div className="mt-8 text-start">
        <FinderBox />
      </div>
      <Link to="/" className="btn-primary mt-8">
        الصفحة الرئيسية
      </Link>
    </div>
  )
}
