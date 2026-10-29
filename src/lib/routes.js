// Travel between German regions: a small model of the rail network with
// typical journey times, used by the route planner on the travel page. Times
// are typical timetable values, not live data; the planner links to DB
// Navigator and Google Maps for the real connection on the day.

// Stations. `pick` stations can be chosen in the planner (grouped by region);
// the others are only places where you change trains.
export const stations = {
  KI: { de: 'Kiel Hbf', en: 'Kiel', ar: 'كيل', region: 'SH', lat: 54.315, lon: 10.132, pick: true },
  HL: { de: 'Lübeck Hbf', en: 'Lübeck', ar: 'لوبيك', region: 'SH', lat: 53.868, lon: 10.67, pick: true },
  FL: { de: 'Flensburg', en: 'Flensburg', ar: 'فلنسبورغ', region: 'SH', lat: 54.774, lon: 9.437, pick: true },
  HH: { de: 'Hamburg Hbf', en: 'Hamburg', ar: 'هامبورغ', region: 'HH', lat: 53.553, lon: 10.007, pick: true, air: 'HAM' },
  HB: { de: 'Bremen Hbf', en: 'Bremen', ar: 'بريمن', region: 'HB', lat: 53.083, lon: 8.813, pick: true, air: 'BRE' },
  H: { de: 'Hannover Hbf', en: 'Hannover', ar: 'هانوفر', region: 'NI', lat: 52.377, lon: 9.741, pick: true, air: 'HAJ' },
  OS: { de: 'Osnabrück Hbf', en: 'Osnabrück', ar: 'أوسنابروك', region: 'NI', lat: 52.273, lon: 8.062, pick: true },
  BS: { de: 'Braunschweig Hbf', en: 'Braunschweig', ar: 'براونشفايغ', region: 'NI', lat: 52.252, lon: 10.54, pick: true },
  GOE: { de: 'Göttingen', en: 'Göttingen', ar: 'غوتينغن', region: 'NI', lat: 51.537, lon: 9.927, pick: true },
  OL: { de: 'Oldenburg (Oldb) Hbf', en: 'Oldenburg', ar: 'أولدنبورغ', region: 'NI', lat: 53.144, lon: 8.222, pick: true },
  HRO: { de: 'Rostock Hbf', en: 'Rostock', ar: 'روستوك', region: 'MV', lat: 54.078, lon: 12.131, pick: true },
  B: { de: 'Berlin Hbf', en: 'Berlin', ar: 'برلين', region: 'BE', lat: 52.525, lon: 13.369, pick: true, air: 'BER' },
  P: { de: 'Potsdam Hbf', en: 'Potsdam', ar: 'بوتسدام', region: 'BB', lat: 52.392, lon: 13.067, pick: true },
  CB: { de: 'Cottbus Hbf', en: 'Cottbus', ar: 'كوتبوس', region: 'BB', lat: 51.751, lon: 14.325, pick: true },
  MD: { de: 'Magdeburg Hbf', en: 'Magdeburg', ar: 'ماغدبورغ', region: 'ST', lat: 52.13, lon: 11.627, pick: true },
  HAL: { de: 'Halle (Saale) Hbf', en: 'Halle', ar: 'هاله', region: 'ST', lat: 51.478, lon: 11.987, pick: true },
  L: { de: 'Leipzig Hbf', en: 'Leipzig', ar: 'لايبزيغ', region: 'SN', lat: 51.346, lon: 12.382, pick: true, air: 'LEJ' },
  DD: { de: 'Dresden Hbf', en: 'Dresden', ar: 'دريسدن', region: 'SN', lat: 51.041, lon: 13.732, pick: true, air: 'DRS' },
  C: { de: 'Chemnitz Hbf', en: 'Chemnitz', ar: 'كيمنتس', region: 'SN', lat: 50.84, lon: 12.93, pick: true },
  EF: { de: 'Erfurt Hbf', en: 'Erfurt', ar: 'إرفورت', region: 'TH', lat: 50.972, lon: 11.038, pick: true },
  J: { de: 'Jena Paradies', en: 'Jena', ar: 'ينا', region: 'TH', lat: 50.925, lon: 11.587, pick: true },
  SMK: { de: 'Schmalkalden', en: 'Schmalkalden', ar: 'شمالكالدن', region: 'TH', lat: 50.721, lon: 10.45, pick: true, noBus: true },
  KS: { de: 'Kassel-Wilhelmshöhe', en: 'Kassel', ar: 'كاسل', region: 'HE', lat: 51.313, lon: 9.447, pick: true },
  F: { de: 'Frankfurt (Main) Hbf', en: 'Frankfurt', ar: 'فرانكفورت', region: 'HE', lat: 50.107, lon: 8.664, pick: true, air: 'FRA' },
  FD: { de: 'Fulda', en: 'Fulda', ar: 'فولدا', region: 'HE', lat: 50.555, lon: 9.684, pick: true },
  MZ: { de: 'Mainz Hbf', en: 'Mainz', ar: 'ماينتس', region: 'RP', lat: 50.001, lon: 8.259, pick: true },
  KO: { de: 'Koblenz Hbf', en: 'Koblenz', ar: 'كوبلنتس', region: 'RP', lat: 50.351, lon: 7.589, pick: true },
  TR: { de: 'Trier Hbf', en: 'Trier', ar: 'ترير', region: 'RP', lat: 49.757, lon: 6.651, pick: true },
  KL: { de: 'Kaiserslautern Hbf', en: 'Kaiserslautern', ar: 'كايزرسلاوترن', region: 'RP', lat: 49.445, lon: 7.769, pick: true },
  SB: { de: 'Saarbrücken Hbf', en: 'Saarbrücken', ar: 'زاربروكن', region: 'SL', lat: 49.241, lon: 6.991, pick: true },
  S: { de: 'Stuttgart Hbf', en: 'Stuttgart', ar: 'شتوتغارت', region: 'BW', lat: 48.784, lon: 9.182, pick: true, air: 'STR' },
  MA: { de: 'Mannheim Hbf', en: 'Mannheim', ar: 'مانهايم', region: 'BW', lat: 49.479, lon: 8.47, pick: true },
  KA: { de: 'Karlsruhe Hbf', en: 'Karlsruhe', ar: 'كارلسروه', region: 'BW', lat: 48.994, lon: 8.402, pick: true },
  UL: { de: 'Ulm Hbf', en: 'Ulm', ar: 'أولم', region: 'BW', lat: 48.399, lon: 9.983, pick: true },
  M: { de: 'München Hbf', en: 'Munich', ar: 'ميونخ', region: 'BY', lat: 48.14, lon: 11.558, pick: true, air: 'MUC' },
  N: { de: 'Nürnberg Hbf', en: 'Nuremberg', ar: 'نورنبرغ', region: 'BY', lat: 49.446, lon: 11.082, pick: true, air: 'NUE' },
  WUE: { de: 'Würzburg Hbf', en: 'Würzburg', ar: 'فورتسبورغ', region: 'BY', lat: 49.802, lon: 9.936, pick: true },
  A: { de: 'Augsburg Hbf', en: 'Augsburg', ar: 'أوغسبورغ', region: 'BY', lat: 48.366, lon: 10.886, pick: true },
  R: { de: 'Regensburg Hbf', en: 'Regensburg', ar: 'ريغنسبورغ', region: 'BY', lat: 49.012, lon: 12.1, pick: true },
  K: { de: 'Köln Hbf', en: 'Cologne', ar: 'كولونيا', region: 'NW', lat: 50.943, lon: 6.959, pick: true, air: 'CGN' },
  D: { de: 'Düsseldorf Hbf', en: 'Düsseldorf', ar: 'دوسلدورف', region: 'NW', lat: 51.22, lon: 6.794, pick: true, air: 'DUS' },
  DO: { de: 'Dortmund Hbf', en: 'Dortmund', ar: 'دورتموند', region: 'NW', lat: 51.518, lon: 7.459, pick: true },
  MS: { de: 'Münster (Westf) Hbf', en: 'Münster', ar: 'مونستر', region: 'NW', lat: 51.957, lon: 7.635, pick: true },
  BI: { de: 'Bielefeld Hbf', en: 'Bielefeld', ar: 'بيليفيلد', region: 'NW', lat: 52.029, lon: 8.533, pick: true },
  AC: { de: 'Aachen Hbf', en: 'Aachen', ar: 'آخن', region: 'NW', lat: 50.768, lon: 6.092, pick: true },
  // Where you change trains.
  UE: { de: 'Uelzen', en: 'Uelzen', ar: 'أولتسن', lat: 52.966, lon: 10.558 },
  WBG: { de: 'Wittenberge', en: 'Wittenberge', ar: 'فيتنبرغه', lat: 53.0, lon: 11.753 },
  LW: { de: 'Lutherstadt Wittenberg Hbf', en: 'Lutherstadt Wittenberg', ar: 'فيتنبرغ', lat: 51.868, lon: 12.662 },
  EW: { de: 'Elsterwerda', en: 'Elsterwerda', ar: 'إلسترفيردا', lat: 51.463, lon: 13.522 },
  NMB: { de: 'Naumburg (Saale) Hbf', en: 'Naumburg', ar: 'ناومبورغ', lat: 51.164, lon: 11.824 },
  EA: { de: 'Eisenach', en: 'Eisenach', ar: 'آيزناخ', lat: 50.977, lon: 10.332 },
  WSH: { de: 'Wernshausen', en: 'Wernshausen', ar: 'فيرنسهاوزن', lat: 50.723, lon: 10.356 },
  ZM: { de: 'Zella-Mehlis', en: 'Zella-Mehlis', ar: 'تسيلا-ميليس', lat: 50.656, lon: 10.669 },
  BEB: { de: 'Bebra', en: 'Bebra', ar: 'بيبرا', lat: 50.971, lon: 9.792 },
  SAL: { de: 'Saalfeld (Saale)', en: 'Saalfeld', ar: 'زالفيلد', lat: 50.648, lon: 11.364 },
  LIF: { de: 'Lichtenfels', en: 'Lichtenfels', ar: 'ليشتنفلس', lat: 50.145, lon: 11.059 },
  CR: { de: 'Crailsheim', en: 'Crailsheim', ar: 'كرايلسهايم', lat: 49.135, lon: 10.071 },
}

// Each line: train type, then stops with the minutes from the first stop.
// Trains run both ways.
const regionalLines = [
  ['RE', 'KI', 0, 'HH', 80],
  ['RE', 'HL', 0, 'HH', 45],
  ['RE', 'HL', 0, 'KI', 75],
  ['RE', 'FL', 0, 'HH', 115],
  ['RE', 'FL', 0, 'KI', 80],
  ['RE', 'HH', 0, 'HB', 75],
  ['RE', 'HH', 0, 'UE', 60],
  ['RE', 'UE', 0, 'H', 65],
  ['RE', 'HH', 0, 'HRO', 150],
  ['RE', 'HB', 0, 'OL', 30],
  ['RE', 'HB', 0, 'H', 75],
  ['RE', 'HB', 0, 'OS', 85],
  ['RE', 'OL', 0, 'OS', 75],
  ['RE', 'OS', 0, 'MS', 35],
  ['RE', 'OS', 0, 'H', 115],
  ['RB', 'OS', 0, 'BI', 60],
  ['RE', 'MS', 0, 'K', 125],
  ['RB', 'MS', 0, 'DO', 50],
  ['RE', 'DO', 0, 'D', 57, 'K', 85, 'AC', 140],
  ['RE', 'K', 0, 'D', 28, 'DO', 88, 'BI', 158],
  ['RE', 'BI', 0, 'H', 75],
  ['RE', 'H', 0, 'BS', 42],
  ['RE', 'H', 0, 'GOE', 95],
  ['RE', 'BS', 0, 'MD', 65],
  ['RE', 'MD', 0, 'HAL', 75],
  ['S', 'HAL', 0, 'L', 30],
  ['RE', 'MD', 0, 'P', 85, 'B', 110],
  ['RE', 'MD', 0, 'UE', 115],
  ['RE', 'B', 0, 'HRO', 170],
  ['RE', 'B', 0, 'WBG', 95],
  ['RE', 'WBG', 0, 'HH', 105],
  ['RE', 'B', 0, 'CB', 85],
  ['RE', 'B', 0, 'LW', 85],
  ['RE', 'LW', 0, 'L', 50],
  ['RE', 'B', 0, 'EW', 105],
  ['RB', 'EW', 0, 'DD', 55],
  ['RE', 'CB', 0, 'DD', 100],
  ['RE', 'L', 0, 'DD', 100],
  ['RE', 'L', 0, 'C', 65],
  ['RE', 'DD', 0, 'C', 65],
  ['RE', 'L', 0, 'NMB', 50],
  ['RB', 'HAL', 0, 'NMB', 40],
  ['RE', 'NMB', 0, 'EF', 50],
  ['RE', 'EF', 0, 'J', 40],
  ['RE', 'EF', 0, 'EA', 50],
  ['RB', 'EA', 0, 'WSH', 40],
  ['RB', 'WSH', 0, 'SMK', 15],
  ['RE', 'EF', 0, 'ZM', 55],
  ['RB', 'ZM', 0, 'SMK', 30],
  ['RB', 'EA', 0, 'BEB', 35],
  ['RB', 'BEB', 0, 'KS', 55],
  ['RB', 'BEB', 0, 'FD', 50],
  ['RE', 'FD', 0, 'F', 85],
  ['RE', 'KS', 0, 'F', 140],
  ['RE', 'KS', 0, 'GOE', 60],
  ['RE', 'GOE', 0, 'EF', 110],
  ['RE', 'EF', 0, 'SAL', 80],
  ['RE', 'SAL', 0, 'LIF', 70],
  ['RE', 'LIF', 0, 'N', 65],
  ['RE', 'F', 0, 'WUE', 120],
  ['RE', 'WUE', 0, 'N', 70],
  ['RE', 'N', 0, 'M', 105],
  ['RE', 'N', 0, 'R', 60],
  ['RE', 'R', 0, 'M', 95],
  ['RE', 'M', 0, 'A', 45, 'UL', 95],
  ['RE', 'UL', 0, 'S', 80],
  ['RE', 'A', 0, 'N', 115],
  ['RE', 'WUE', 0, 'S', 160],
  ['RE', 'S', 0, 'CR', 105],
  ['RE', 'CR', 0, 'N', 90],
  ['RE', 'S', 0, 'KA', 75],
  ['RE', 'KA', 0, 'MA', 60],
  ['RE', 'F', 0, 'MA', 75],
  ['RE', 'MZ', 0, 'MA', 50],
  ['RE', 'MA', 0, 'KL', 50],
  ['RE', 'KL', 0, 'SB', 65],
  ['RE', 'F', 0, 'MZ', 35, 'KO', 115],
  ['RE', 'F', 0, 'MZ', 35, 'SB', 185],
  ['RE', 'KO', 0, 'K', 90],
  ['RE', 'KO', 0, 'TR', 85, 'SB', 155],
]

const longDistanceLines = [
  ['ICE', 'HH', 0, 'H', 82, 'GOE', 118, 'KS', 140, 'FD', 172, 'WUE', 207, 'N', 265, 'M', 335],
  ['ICE', 'HH', 0, 'H', 82, 'GOE', 118, 'KS', 140, 'F', 225, 'MA', 265, 'S', 305],
  ['ICE', 'B', 0, 'HAL', 70, 'EF', 105, 'N', 175, 'M', 245],
  ['ICE', 'B', 0, 'L', 75, 'EF', 120, 'N', 190, 'M', 262],
  ['ICE', 'B', 0, 'L', 75, 'EF', 120, 'F', 250],
  ['ICE', 'DD', 0, 'L', 65, 'EF', 115, 'EA', 140, 'FD', 190, 'F', 250],
  ['ICE', 'B', 0, 'H', 98, 'BI', 145, 'DO', 200, 'D', 245, 'K', 268],
  ['IC', 'HH', 0, 'HB', 55, 'OS', 105, 'MS', 132, 'DO', 165, 'K', 240],
  ['ICE', 'K', 0, 'F', 65, 'WUE', 135, 'N', 190, 'M', 255],
  ['ICE', 'K', 0, 'MA', 88, 'S', 135, 'UL', 180, 'A', 222, 'M', 255],
  ['ICE', 'F', 0, 'MA', 38, 'S', 80, 'UL', 125, 'A', 165, 'M', 195],
  ['ICE', 'F', 0, 'MA', 38, 'KA', 65],
  ['ICE', 'F', 0, 'MA', 38, 'KL', 75, 'SB', 115],
  ['IC', 'K', 0, 'KO', 55, 'MZ', 105, 'MA', 145],
  ['ICE', 'F', 0, 'WUE', 70, 'N', 125, 'R', 180],
  ['EC', 'B', 0, 'DD', 115],
  ['IC', 'L', 0, 'MD', 70, 'BS', 125, 'H', 160, 'HB', 225, 'OL', 255],
  ['IC', 'B', 0, 'P', 22, 'MD', 95],
  ['ICE', 'B', 0, 'HH', 105],
  ['IC', 'HH', 0, 'HL', 40],
  ['IC', 'HH', 0, 'KI', 75],
  ['IC', 'HH', 0, 'HRO', 125],
  ['ICE', 'B', 0, 'HRO', 125],
  ['ICE', 'B', 0, 'BS', 85, 'GOE', 135, 'KS', 155, 'F', 240],
  ['ICE', 'K', 0, 'AC', 35],
  ['IC', 'OS', 0, 'H', 72, 'B', 180],
]

// Average time to change trains, waiting included.
export const CHANGE_MINUTES = 15

function edges(lines) {
  const out = {}
  for (const [type, ...stops] of lines) {
    for (let i = 0; i < stops.length; i += 2) {
      for (let j = i + 2; j < stops.length; j += 2) {
        const [a, ta, b, tb] = [stops[i], stops[i + 1], stops[j], stops[j + 1]]
        for (const [from, to] of [[a, b], [b, a]]) (out[from] ??= []).push({ from, to, type, minutes: tb - ta })
      }
    }
  }
  return out
}

const regionalEdges = edges(regionalLines)
const allEdges = edges([...regionalLines, ...longDistanceLines])

// Shortest trip by time, counting each change as CHANGE_MINUTES.
function shortest(graph, from, to) {
  const best = { [from]: { cost: 0, legs: [] } }
  const open = [from]
  while (open.length) {
    open.sort((a, b) => best[a].cost - best[b].cost)
    const here = open.shift()
    if (here === to) break
    for (const e of graph[here] || []) {
      const cost = best[here].cost + e.minutes + (best[here].legs.length ? CHANGE_MINUTES : 0)
      if (!best[e.to] || cost < best[e.to].cost) {
        if (!best[e.to]) open.push(e.to)
        best[e.to] = { cost, legs: [...best[here].legs, e] }
      }
    }
  }
  const trip = best[to]
  return trip && { minutes: trip.cost, legs: trip.legs, changes: trip.legs.length - 1 }
}

const rad = (d) => (d * Math.PI) / 180
export function km(a, b) {
  const [p, q] = [stations[a], stations[b]]
  const h = Math.sin(rad(q.lat - p.lat) / 2) ** 2 + Math.cos(rad(p.lat)) * Math.cos(rad(q.lat)) * Math.sin(rad(q.lon - p.lon) / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

const longDistance = (leg) => leg.type === 'ICE' || leg.type === 'IC' || leg.type === 'EC'
const round5 = (n) => Math.round(n / 5) * 5
const euros = (n) => Math.floor(n) + 0.99

// Lowest published ICE/IC fare (Super Sparpreis, 2nd class) when booked early.
export const SPARPREIS_FROM = 17.99

export function plan(from, to) {
  const free = shortest(regionalEdges, from, to)
  let fast = shortest(allEdges, from, to)
  // Only worth showing when the ICE or IC saves real time.
  if (!fast?.legs.some(longDistance) || fast.minutes > free.minutes - 20) fast = null
  const straight = km(from, to)
  const result = { from, to, km: Math.round(straight), free, fast }

  if (fast) {
    const railKm = fast.legs.filter(longDistance).reduce((s, l) => s + km(l.from, l.to) * 1.2, 0)
    // Flexpreis on the day; Sparpreis tickets booked weeks ahead start at SPARPREIS_FROM.
    result.fast.flex = Math.min(175, round5(25 + 0.28 * railKm))
  }

  // FlixBus between larger cities: about 90 km/h on the road, plus city traffic.
  if (straight >= 120 && !stations[from].noBus && !stations[to].noBus) {
    const road = straight * 1.25
    result.bus = { minutes: round5((road / 90) * 60 + 15), from: euros(Math.max(5, road * 0.03)) }
  }

  // Domestic flights only make sense across the country.
  const [airA, airB] = [stations[from].air, stations[to].air]
  if (airA && airB && straight >= 400) {
    const air = round5((straight / 750) * 60 + 30)
    result.flight = { airA, airB, air, minutes: air + 120 }
  }
  return result
}

// Which option to recommend, compared on time and money.
export function verdict({ free, fast, bus }) {
  if (!fast || free.minutes - fast.minutes <= 45) return 'free'
  if (free.minutes <= 300) return 'free-or-fast'
  if (bus && bus.from < SPARPREIS_FROM && bus.minutes - fast.minutes <= 90) return 'bus'
  return 'fast'
}

export const pickable = Object.entries(stations).filter(([, s]) => s.pick).map(([id]) => id)

export const links = {
  maps: (a, b) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(stations[a].de)}&destination=${encodeURIComponent(stations[b].de)}&travelmode=transit`,
  flights: (a, b) => `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights from ${a} to ${b}`)}`,
  compare: (a, b) => `https://www.rome2rio.com/map/${encodeURIComponent(stations[a].en)}/${encodeURIComponent(stations[b].en)}`,
}
