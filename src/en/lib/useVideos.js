import { useEffect, useState } from 'react'
import { loadVideos } from './data.js'

// Returns the video index once loaded (null while loading).
// By default it waits until the browser is idle, so the first paint and
// scrolling never compete with parsing the index; pass `eager` when videos are
// the page's main content.
export default function useVideos({ eager = false } = {}) {
  const [data, setData] = useState(null)
  useEffect(() => {
    let live = true
    const load = () => loadVideos().then((d) => live && setData(d))
    if (eager || !('requestIdleCallback' in window)) {
      load()
      return () => {
        live = false
      }
    }
    const handle = requestIdleCallback(load, { timeout: 2500 })
    return () => {
      live = false
      cancelIdleCallback(handle)
    }
  }, [eager])
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
