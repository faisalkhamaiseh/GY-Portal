// A region's landscape poster: a pre-built, cached image (public/art), lazy
// unless it is the page's hero.
export default function RegionArt({ region, className = '', label = true, priority = false }) {
  return (
    <img
      src={`/art/${region.slug}.svg`}
      alt={label ? `رسم توضيحي لـ${region.name}` : ''}
      width={1200}
      height={600}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={`object-cover ${className}`}
    />
  )
}
