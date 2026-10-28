// A local photo served as responsive WebP (480/640/800/1200 px, made from the JPG
// in public/images), with the JPG as fallback. Width and height reserve space
// so nothing shifts while it loads.
export default function Photo({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', priority = false, width, height, className = '' }) {
  const base = src.replace(/\.jpg$/, '')
  return (
    <picture>
      <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-640.webp 640w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`} sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
