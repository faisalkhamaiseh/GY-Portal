import { Link } from 'react-router-dom'
import { FinderBox } from '../components/UniversityFinder.jsx'

export default function NotFound() {
  return (
    <div className="wrap max-w-2xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="h-display mt-2 text-5xl">We could not find that page</h1>
      <p className="mt-4 text-ink-2">The link may be old. Search for your university instead, or go back to the start.</p>
      <div className="mt-8 text-left">
        <FinderBox />
      </div>
      <Link to="/" className="btn-primary mt-8">
        Back to the home page
      </Link>
    </div>
  )
}
