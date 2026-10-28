import { useEffect, useRef, useState } from 'react'
import { Play, X, ExternalLink, Youtube } from 'lucide-react'

export const thumb = (id, q = 'mqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`

export function VideoCard({ v, onPlay, compact = false }) {
  return (
    <button type="button" onClick={() => onPlay(v)} className="group block w-full text-left">
      <span className="relative block aspect-video overflow-hidden rounded-xl bg-sand">
        <img
          src={thumb(v.id)}
          alt=""
          width={320}
          height={180}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70" />
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-lg transition-transform group-hover:scale-110">
          <Play className="ml-0.5 size-5 fill-current" aria-hidden />
        </span>
        {v.duration && (
          <span className="absolute right-2 bottom-2 rounded-md bg-ink/85 px-1.5 py-0.5 font-mono text-[11px] text-paper">{v.duration}</span>
        )}
        {v.pinned && <span className="absolute top-2 left-2 chip bg-gold text-ink">Picked for GJU</span>}
      </span>
      <span className={`mt-2.5 block font-semibold leading-snug text-ink group-hover:text-link ${compact ? 'line-clamp-2 text-sm' : 'line-clamp-2'}`}>
        {v.title}
      </span>
      <span className="mt-0.5 block truncate text-xs text-muted">
        {v.channel}
        {v.views ? ` · ${v.views}` : ''}
      </span>
    </button>
  )
}

export function VideoModal({ video, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (video && d && !d.open) d.showModal()
    if (!video && d?.open) d.close()
  }, [video])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-auto w-[min(1000px,calc(100%-2rem))] overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
    >
      {video && (
        <div className="rise">
          <div className="mb-3 flex items-start justify-between gap-4 text-paper">
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold">{video.title}</p>
              <p className="text-sm text-paper/60">{video.channel}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-10 place-items-center rounded-full bg-paper/10 hover:bg-paper/20"
                aria-label="Open on YouTube"
              >
                <ExternalLink className="size-4" />
              </a>
              <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-paper/10 hover:bg-paper/20" aria-label="Close video">
                <X className="size-5" />
              </button>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl bg-ink shadow-2xl">
            <iframe
              className="size-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function VideoGrid({ videos, limit = 8, cols = 'sm:grid-cols-2 lg:grid-cols-4', emptyQuery }) {
  const [playing, setPlaying] = useState(null)
  const [all, setAll] = useState(false)

  if (!videos) {
    return (
      <div className={`grid gap-5 ${cols}`}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <div className="aspect-video animate-pulse rounded-xl bg-sand" />
            <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-sand" />
          </div>
        ))}
      </div>
    )
  }

  if (!videos.length) {
    return (
      <div className="card flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We have not found good videos for this one yet. Search YouTube directly:</p>
        {emptyQuery && (
          <a className="btn-ghost" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(emptyQuery)}`} target="_blank" rel="noopener noreferrer">
            <Youtube className="size-4" /> Search “{emptyQuery}”
          </a>
        )}
      </div>
    )
  }

  const shown = all ? videos : videos.slice(0, limit)
  return (
    <>
      <div className={`grid gap-x-5 gap-y-7 ${cols}`}>
        {shown.map((v) => (
          <VideoCard key={v.id} v={v} onPlay={setPlaying} />
        ))}
      </div>
      {videos.length > limit && (
        <button type="button" onClick={() => setAll((a) => !a)} className="btn-ghost mt-8">
          {all ? 'Show fewer' : `Show all ${videos.length} videos`}
        </button>
      )}
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </>
  )
}
