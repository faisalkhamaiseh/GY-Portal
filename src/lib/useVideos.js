import { useEffect, useState } from 'react'
import { loadVideos } from './data.js'

// Returns the video index once loaded (null while loading).
export default function useVideos() {
  const [data, setData] = useState(null)
  useEffect(() => {
    let live = true
    loadVideos().then((d) => live && setData(d))
    return () => {
      live = false
    }
  }, [])
  return data
}

// Merge lists, dropping duplicates while keeping order.
export function mergeVideos(...lists) {
  const seen = new Set()
  const out = []
  for (const list of lists) {
    for (const v of list || []) {
      if (!seen.has(v.id)) {
        seen.add(v.id)
        out.push(v)
      }
    }
  }
  return out
}
