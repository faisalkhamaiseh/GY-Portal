import { useId, useMemo } from 'react'

// Illustrated, layered landscape poster for a region. Each `art.type` picks a
// scene; the code seeds the noise so every region looks different but stable.

const W = 1200
const H = 600

function rng(seedText) {
  let h = 2166136261
  for (const c of seedText) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// A smooth ridge across the full width, closed to the bottom.
function ridge(r, base, amp, steps, jag = 0) {
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W
    const y = base - amp * (0.5 + 0.5 * Math.sin(i * 0.9 + r() * 6)) - (jag ? (r() - 0.5) * jag : 0)
    pts.push([x, y])
  }
  let d = `M0 ${H} L0 ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]
    const [x1, y1] = pts[i]
    const cx = (x0 + x1) / 2
    d += ` Q${x0.toFixed(1)} ${y0.toFixed(1)} ${cx.toFixed(1)} ${((y0 + y1) / 2).toFixed(1)}`
  }
  return `${d} L${W} ${pts.at(-1)[1].toFixed(1)} L${W} ${H}Z`
}

// Sharp alpine peaks with snow caps.
function peaks(r, base, height, count) {
  const shapes = []
  let x = -80
  while (x < W + 80) {
    const w = 160 + r() * 220
    const h = height * (0.55 + r() * 0.45)
    shapes.push({ x, w, h })
    x += w * (0.45 + r() * 0.3)
  }
  const mount = shapes.map(({ x, w, h }) => `M${x} ${base} L${x + w / 2} ${base - h} L${x + w} ${base}Z`).join(' ')
  const snow = shapes
    .map(({ x, w, h }) => {
      const px = x + w / 2
      const py = base - h
      const s = h * 0.22
      return `M${px} ${py} L${px - s * 0.8} ${py + s} L${px - s * 0.3} ${py + s * 0.8} L${px} ${py + s * 1.1} L${px + s * 0.35} ${py + s * 0.75} L${px + s * 0.8} ${py + s}Z`
    })
    .join(' ')
  return { mount: `${mount} M0 ${base} L${W} ${base} L${W} ${H} L0 ${H}Z`, snow, count }
}

function pines(r, y0, y1, n, size) {
  let d = ''
  for (let i = 0; i < n; i++) {
    const x = r() * W
    const y = y0 + r() * (y1 - y0)
    const s = size * (0.6 + r() * 0.6)
    d += `M${x} ${y - s * 2.2} L${x - s * 0.7} ${y - s * 0.9} L${x - s * 0.35} ${y - s * 0.9} L${x - s} ${y} L${x + s} ${y} L${x + s * 0.35} ${y - s * 0.9} L${x + s * 0.7} ${y - s * 0.9}Z `
  }
  return d
}

// Little old-town: gabled houses and one church spire.
function town(r, baseY, x0, x1) {
  let houses = ''
  let windows = ''
  let x = x0
  while (x < x1) {
    const w = 34 + r() * 30
    const h = 34 + r() * 40
    const roof = 20 + r() * 18
    houses += `M${x} ${baseY} L${x} ${baseY - h} L${x + w / 2} ${baseY - h - roof} L${x + w} ${baseY - h} L${x + w} ${baseY}Z `
    for (let wy = baseY - h + 10; wy < baseY - 14; wy += 16) {
      windows += `M${x + w * 0.25} ${wy}h6v8h-6Z M${x + w * 0.62} ${wy}h6v8h-6Z `
    }
    x += w + 2
  }
  const sx = x0 + (x1 - x0) * (0.3 + r() * 0.4)
  const spire = `M${sx - 16} ${baseY} L${sx - 16} ${baseY - 120} L${sx} ${baseY - 210} L${sx + 16} ${baseY - 120} L${sx + 16} ${baseY}Z`
  return { houses, windows, spire }
}

function Scene({ type, c, r, uid }) {
  const sunX = 180 + r() * 840
  const sunY = 110 + r() * 80
  const common = (
    <>
      <circle cx={sunX} cy={sunY} r={54} fill={c.accent} opacity="0.9" />
      <circle cx={sunX} cy={sunY} r={84} fill={c.accent} opacity="0.12" />
    </>
  )

  if (type === 'alps') {
    const far = peaks(r, 430, 300, 0)
    const mid = peaks(r, 470, 200, 0)
    return (
      <>
        {common}
        <path d={far.mount} fill={c.far} />
        <path d={far.snow} fill="#fbfaf6" opacity="0.9" />
        <path d={mid.mount} fill={c.mid} />
        <path d={mid.snow} fill="#fbfaf6" opacity="0.55" />
        <path d={ridge(r, 520, 40, 8)} fill={c.near} />
        <path d={pines(r, 520, 600, 40, 18)} fill="#14261c" opacity="0.85" />
        <rect x="0" y="470" width={W} height="6" fill={`url(#${uid}-lake)`} opacity="0.5" />
      </>
    )
  }

  if (type === 'coast' || type === 'harbour') {
    const t = town(r, 430, 120, 560)
    return (
      <>
        {common}
        <path d={ridge(r, 420, 25, 6)} fill={c.far} />
        {type === 'harbour' ? (
          <g fill={c.near}>
            <path d="M700 430 L700 300 L860 270 L1020 300 L1020 430Z" />
            <path d="M700 300 Q760 250 820 285 Q880 240 940 280 Q990 250 1020 300Z" fill={c.mid} />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${560 + i * 50} 0)`}>
                <rect x="0" y="300" width="6" height="130" />
                <path d="M0 300 L70 300 L70 306 L0 306Z" />
                <path d="M60 306 L62 360 L64 306Z" />
              </g>
            ))}
          </g>
        ) : (
          <g>
            <path d="M900 430 L912 270 L936 270 L948 430Z" fill="#fbfaf6" />
            {[290, 330, 370, 410].map((y) => (
              <path key={y} d={`M${911 + (y - 270) * 0.075} ${y} L${937 - (y - 270) * 0.075} ${y} L${938 - (y - 250) * 0.075} ${y + 18} L${910 + (y - 250) * 0.075} ${y + 18}Z`} fill={c.accent} />
            ))}
            <path d="M906 270 L924 245 L942 270Z" fill={c.near} />
          </g>
        )}
        <path d={t.houses} fill={c.mid} />
        <path d={t.spire} fill={c.mid} />
        <path d={t.windows} fill={c.sky} opacity="0.55" />
        <rect x="0" y="430" width={W} height="170" fill={c.near} />
        {[455, 485, 520, 560].map((y, i) => (
          <path key={y} d={`M0 ${y} Q150 ${y - 8} 300 ${y} T600 ${y} T900 ${y} T1200 ${y}`} stroke={c.sky} strokeOpacity={0.25 - i * 0.04} strokeWidth="3" fill="none" />
        ))}
      </>
    )
  }

  if (type === 'metro' || type === 'skyline') {
    const towers = []
    let x = 40
    while (x < W - 40) {
      const w = 40 + r() * 60
      const h = type === 'skyline' ? 120 + r() * 260 : 70 + r() * 110
      towers.push({ x, w, h })
      x += w + 6 + r() * 14
    }
    return (
      <>
        {common}
        <path d={ridge(r, 470, 20, 6)} fill={c.far} />
        <g fill={c.mid}>
          {towers.map((t, i) => (
            <rect key={i} x={t.x} y={470 - t.h} width={t.w} height={t.h} rx="2" />
          ))}
        </g>
        <g fill={c.sky} opacity="0.35">
          {towers.flatMap((t, i) =>
            Array.from({ length: Math.floor(t.h / 26) }, (_, k) => (
              <rect key={`${i}-${k}`} x={t.x + 8} y={470 - t.h + 12 + k * 26} width={t.w - 16} height="6" />
            )),
          )}
        </g>
        {type === 'metro' ? (
          <g fill={c.near}>
            <rect x="590" y="140" width="14" height="330" />
            <circle cx="597" cy="200" r="30" />
            <rect x="594" y="80" width="6" height="70" />
            <path d="M820 470 L820 360 L1000 360 L1000 470 L975 470 L975 390 L950 390 L950 470 L925 470 L925 390 L895 390 L895 470 L870 470 L870 390 L845 390 L845 470Z" />
            <path d="M812 360 L1008 360 L1000 335 L820 335Z" />
          </g>
        ) : (
          <g fill={c.near}>
            <path d="M760 470 L770 150 L800 120 L830 150 L840 470Z" />
            <path d="M880 470 L885 190 L915 175 L945 190 L950 470Z" />
          </g>
        )}
        <rect x="0" y="470" width={W} height="130" fill={c.near} />
        <path d={`M0 520 Q300 500 600 525 T1200 515 L1200 600 L0 600Z`} fill={c.sky} opacity="0.12" />
      </>
    )
  }

  if (type === 'river' || type === 'baroque') {
    const t = town(r, 450, 80, 520)
    return (
      <>
        {common}
        <path d={ridge(r, 360, 60, 7)} fill={c.far} />
        <path d={ridge(r, 420, 40, 7)} fill={c.mid} />
        {type === 'baroque' ? (
          <g fill={c.near}>
            <path d="M700 450 L700 320 Q760 220 820 320 L820 450Z" />
            <rect x="752" y="200" width="16" height="50" />
            <circle cx="760" cy="196" r="9" />
            <path d="M860 450 L860 330 L920 330 L920 450Z" />
            <path d="M870 330 Q890 290 910 330Z" />
          </g>
        ) : (
          <g fill={c.near}>
            <path d="M720 450 L724 230 L742 150 L760 230 L764 450Z" />
            <path d="M790 450 L794 230 L812 150 L830 230 L834 450Z" />
            <rect x="720" y="300" width="114" height="150" />
          </g>
        )}
        <path d={t.houses} fill={c.near} />
        <path d={t.spire} fill={c.near} />
        <path d={t.windows} fill={c.sky} opacity="0.45" />
        <rect x="0" y="450" width={W} height="150" fill={c.near} />
        <path d="M0 520 C300 470 700 600 1200 500 L1200 560 C800 640 300 520 0 580Z" fill={c.sky} opacity="0.3" />
        <path d="M560 450 Q640 390 720 450" stroke={c.mid} strokeWidth="10" fill="none" />
      </>
    )
  }

  if (type === 'vineyard') {
    const hill = ridge(r, 380, 90, 6)
    return (
      <>
        {common}
        <path d={ridge(r, 330, 50, 6)} fill={c.far} />
        <path d={hill} fill={c.mid} />
        <g stroke={c.near} strokeOpacity="0.35" strokeWidth="3">
          {Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1={i * 60 - 40} y1="600" x2={i * 60 + 80} y2="330" />
          ))}
        </g>
        <g fill={c.near}>
          <path d="M880 300 L880 230 L900 230 L900 215 L912 215 L912 230 L930 230 L930 215 L942 215 L942 230 L960 230 L960 300Z" />
          <path d="M840 300 L840 250 L860 230 L880 250 L880 300Z" />
          <path d="M800 320 L1000 320 L960 300 L840 300Z" />
        </g>
        <path d="M0 470 C300 430 600 520 1200 450 L1200 600 L0 600Z" fill={c.near} />
        <path d="M0 520 C400 480 800 560 1200 500 L1200 540 C800 600 400 520 0 560Z" fill={c.sky} opacity="0.35" />
      </>
    )
  }

  if (type === 'plains' || type === 'lakes') {
    const t = town(r, 430, 140, 480)
    return (
      <>
        {common}
        <path d={ridge(r, 400, 20, 5)} fill={c.far} />
        {type === 'plains' &&
          [760, 880, 1010].map((x, i) => (
            <g key={x} stroke={c.mid} strokeWidth="5" strokeLinecap="round">
              <line x1={x} y1="420" x2={x} y2={250 + i * 20} />
              <g transform={`rotate(${i * 40 + 15} ${x} ${250 + i * 20})`}>
                <line x1={x} y1={250 + i * 20} x2={x} y2={180 + i * 20} />
                <line x1={x} y1={250 + i * 20} x2={x + 60} y2={285 + i * 20} />
                <line x1={x} y1={250 + i * 20} x2={x - 60} y2={285 + i * 20} />
              </g>
            </g>
          ))}
        <path d={t.houses} fill={c.mid} />
        <path d={t.spire} fill={c.mid} />
        <path d={t.windows} fill={c.sky} opacity="0.5" />
        <rect x="0" y="430" width={W} height="170" fill={c.near} />
        {type === 'lakes' ? (
          <>
            <ellipse cx="820" cy="500" rx="300" ry="38" fill={c.sky} opacity="0.4" />
            <path d={pines(r, 440, 470, 26, 16)} fill="#14261c" opacity="0.8" />
          </>
        ) : (
          <g stroke={c.mid} strokeOpacity="0.5" strokeWidth="2">
            {Array.from({ length: 10 }, (_, i) => (
              <line key={i} x1="0" y1={450 + i * 16} x2={W} y2={445 + i * 16 + (i % 2 ? 6 : -6)} />
            ))}
          </g>
        )}
      </>
    )
  }

  if (type === 'europe') {
    return (
      <>
        <path d={ridge(r, 470, 40, 7)} fill={c.far} />
        <path d={ridge(r, 520, 30, 7)} fill={c.mid} />
        <g fill={c.accent}>
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2
            const x = 600 + Math.cos(a) * 140
            const y = 250 + Math.sin(a) * 140
            return <path key={i} d={`M${x} ${y - 14} L${x + 4} ${y - 4} L${x + 14} ${y - 4} L${x + 6} ${y + 3} L${x + 9} ${y + 14} L${x} ${y + 7} L${x - 9} ${y + 14} L${x - 6} ${y + 3} L${x - 14} ${y - 4} L${x - 4} ${y - 4}Z`} />
          })}
        </g>
        <rect x="0" y="540" width={W} height="60" fill={c.near} />
      </>
    )
  }

  // forest (default)
  const t = town(r, 470, 640, 1040)
  return (
    <>
      {common}
      <path d={ridge(r, 330, 70, 6)} fill={c.far} />
      <path d={pines(r, 330, 380, 50, 12)} fill={c.mid} opacity="0.7" />
      <path d={ridge(r, 410, 60, 7)} fill={c.mid} />
      <path d={pines(r, 410, 470, 60, 16)} fill={c.near} opacity="0.9" />
      <path d={t.houses} fill={c.near} />
      <path d={t.spire} fill={c.near} />
      <path d={t.windows} fill={c.sky} opacity="0.5" />
      <rect x="0" y="470" width={W} height="130" fill={c.near} />
      <path d={pines(r, 500, 600, 35, 22)} fill="#132219" opacity="0.9" />
    </>
  )
}

export default function RegionArt({ region, className = '', label = true }) {
  const uid = useId().replace(/:/g, '')
  const c = region.art
  const seedKey = region.code
  // Remount-stable random stream for this region.
  const scene = useMemo(() => {
    const r = rng(seedKey)
    return <Scene type={c.type} c={c} r={r} uid={uid} />
  }, [seedKey, c, uid])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label ? `رسم توضيحي لـ${region.name}` : undefined}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.sky} />
          <stop offset="1" stopColor="#fbf8f1" />
        </linearGradient>
        <linearGradient id={`${uid}-lake`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
      {scene}
    </svg>
  )
}
