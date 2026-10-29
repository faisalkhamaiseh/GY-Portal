// Smart search: understands what a student is looking for ("prices in munich",
// "dorm ingolstat", "halal food erfurt"), forgives typos, and routes straight
// to the right page and section.

import { regions, regionByCode } from '../data/regions.js'
import { universities } from './data.js'

// Lower-case, strip accents and German spellings so "München", "Muenchen"
// and "munchen" all become "munchen".
export function fold(s) {
  return s
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

const STOP = new Set(
  'in at am an der die das main the for of near a to my me what how much is are does do where find show give i want need about on with and or from best cheap cheapest good list all'.split(' '),
)
const GENERIC = new Set('university universitat universities uni hochschule college school th tu fh hs haw of applied sciences technology technical institute'.split(' '))

// English and alternative names for host cities and regions.
const ALIASES = {
  munich: 'München', munchen: 'München', cologne: 'Köln', koln: 'Köln', nuremberg: 'Nürnberg', nurnberg: 'Nürnberg',
  hanover: 'Hannover', wuerzburg: 'Würzburg',
  'saarbrucken': 'Saarbrücken', gottingen: 'Göttingen', lubeck: 'Lübeck', munster: 'Münster', rosenheim: 'Rosenheim',
  bavaria: 'BY', bayern: 'BY', saxony: 'SN', sachsen: 'SN', thuringia: 'TH', thuringen: 'TH', hesse: 'HE', hessen: 'HE',
  nrw: 'NW', 'north rhine westphalia': 'NW', 'lower saxony': 'NI', niedersachsen: 'NI', bw: 'BW', 'baden wurttemberg': 'BW',
  'rhineland palatinate': 'RP', 'rheinland pfalz': 'RP', 'saxony anhalt': 'ST', 'sachsen anhalt': 'ST',
  'schleswig holstein': 'SH', 'mecklenburg vorpommern': 'MV', brandenburg: 'BB', saarland: 'SL',
}

// Short names students actually type.
const UNI_ALIASES = {
  'thi-ingolstadt': ['thi'], 'hm-muenchen': ['hm', 'hochschule munchen'], tum: ['tum', 'tu munchen', 'tu munich'],
  kit: ['kit', 'karlsruhe institute'], 'rwth-aachen': ['rwth'], 'hda-darmstadt': ['hda', 'h da'], 'hbrs-sankt-augustin': ['hbrs', 'h brs', 'bonn rhein sieg'],
  'thm-giessen': ['thm'], 'htwk-leipzig': ['htwk'], 'whz-zwickau': ['whz'], 'hsbi-bielefeld': ['hsbi', 'fh bielefeld'],
  'hshl-hamm': ['hshl'], 'hshl-lippstadt': ['hshl'], 'isd-koeln': ['kisd'], 'upv-valencia': ['upv'], 'bht-berlin': ['bht', 'beuth'],
  'htw-berlin': ['htw berlin'], 'hu-berlin': ['hu', 'humboldt'], 'haw-hamburg': ['haw hamburg'], 'hcu-hamburg': ['hcu'],
  'fhws-wuerzburg': ['fhws', 'thws'], 'fhws-schweinfurt': ['fhws', 'thws'], 'tu-dortmund': ['tu dortmund'], 'fh-dortmund': ['fh dortmund'],
  'oth-regensburg': ['oth'], 'eah-jena': ['eah'], 'htw-dresden': ['htw dresden'], 'htw-saar': ['htw saar'],
  schmalkalden: ['hs schmalkalden', 'fh schmalkalden'], 'frankfurt-uas': ['frankfurt uas', 'fra uas'],
}

// Topics: keywords → where to send the student. `place` is a city or region.
export const TOPICS = [
  { id: 'costs', label: 'Prices & budget', words: 'price prices cost costs budget money expensive preis preise kosten living spend afford', icon: 'Wallet' },
  { id: 'housing', label: 'Housing & dorms', words: 'housing dorm dorms room rooms wg flat flats apartment wohnung zimmer wohnheim accommodation studierendenwerk studentenwerk rent miete live', icon: 'Home' },
  { id: 'halal', label: 'Halal food & mosques', words: 'halal helal mosque mosques moschee prayer pray arab arabic turkish butcher meat supermarket shawarma food grocery groceries muslim', icon: 'Moon' },
  { id: 'internship', label: 'Internships & companies', words: 'internship internships intern praktikum pflichtpraktikum job jobs company companies career fair fairs work employer cv lebenslauf', icon: 'Briefcase' },
  { id: 'airport', label: 'Airports & cheap flights', words: 'airport airports flight flights ryanair wizz easyjet fly plane amman europe', icon: 'Plane' },
  { id: 'ticket', label: 'Deutschlandticket & transport', words: 'deutschlandticket ticket semesterticket train trains bus transport bahn db travel commute', icon: 'TrainFront' },
  { id: 'videos', label: 'Videos & campus tours', words: 'video videos tour tours youtube watch vlog', icon: 'Play' },
  { id: 'events', label: 'Events & things to do', words: 'event events festival festivals christmas oktoberfest carnival activities fun things weekend sightseeing', icon: 'CalendarDays' },
  { id: 'requirements', label: 'Requirements', words: 'requirement requirements gpa b1 b2 c1 level language exam conditions fee fees', icon: 'GraduationCap' },
  { id: 'arrival', label: 'Arrival checklist', words: 'visa anmeldung checklist arrival blocked sperrkonto residence permit register paperwork', icon: 'ListChecks' },
  { id: 'banks', label: 'Bank comparison', words: 'bank banks account konto sparkasse n26 deutsche girokonto', icon: 'Landmark' },
  { id: 'mobile', label: 'Mobile plan comparison', words: 'sim simcard mobile phone handy telekom vodafone o2 aldi talk data internet plan tarif', icon: 'Smartphone' },
  { id: 'health', label: 'Health insurance comparison', words: 'insurance krankenkasse krankenversicherung tk aok barmer health dental vaccination vaccine', icon: 'HeartPulse' },
  { id: 'rules', label: 'Hidden rules & fines', words: 'rule rules fine fines torrent torrents download downloading abmahnung piracy illegal penalty', icon: 'Scale' },
  { id: 'waste', label: 'Waste sorting', words: 'trash waste garbage rubbish recycling recycle mull mulltrennung pfand bottles bin bins sorting', icon: 'Scale' },
  { id: 'quiet', label: 'Quiet hours', words: 'quiet ruhezeit noise loud neighbours neighbors sunday laundry washing party music', icon: 'Moon' },
  { id: 'routes', label: 'Train between regions', words: 'route routes journey train trains ice ic regional bus flixbus flight plane between cities city region regions travel time get from to', icon: 'TrainFront' },
  { id: 'travel', label: 'Budget travel', words: 'weekend trips trip cheap travel flixbus blablacar border austria switzerland netherlands poland france holiday itinerary', icon: 'Bus' },
  { id: 'deals', label: 'Saving money', words: 'discount discounts sale sales deals save saving toogoodtogo too good go black friday second hand flohmarkt', icon: 'Tag' },
  { id: 'ingredients', label: 'Ingredient guide', words: 'ingredients ingredient additives additive gelatine gelatin pork schwein alkohol alcohol enumber enumbers zutaten halal-label', icon: 'ScanBarcode' },
  { id: 'apps', label: 'App directory', words: 'app apps doctolib check24 lieferando wolt navigator lime tier dott bolt deepl download', icon: 'AppWindow' },
  { id: 'emergency', label: 'Emergencies & doctors', words: 'emergency doctor police ambulance hospital sick 112 110 pharmacy', icon: 'Siren' },
  { id: 'phrases', label: 'Phrasebook', words: 'phrase phrases phrasebook german words sentences speak', icon: 'Languages' },
  { id: 'weather', label: 'Weather & daily life', words: 'weather climate cold snow winter', icon: 'CloudSun' },
]
const topicWords = new Map()
for (const t of TOPICS) for (const w of t.words.split(' ')) topicWords.set(w, t.id)
const topicVocab = [...topicWords.keys()]

// Damerau-Levenshtein distance, capped for speed.
function dist(a, b, max = 3) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      rowMin = Math.min(rowMin, d[i][j])
    }
    if (rowMin > max) return max + 1
  }
  return d[a.length][b.length]
}

const allowed = (len) => (len <= 3 ? 0 : len <= 5 ? 1 : 2)

// How well one query token matches one entry token (0 = no match).
function tokenScore(q, t) {
  if (q === t) return 3
  if (q.length >= 3 && t.startsWith(q)) return 2.5
  if (q.length >= 4 && t.includes(q)) return 2
  const max = allowed(Math.min(q.length, t.length))
  if (!max) return 0
  const d = dist(q, t, max)
  if (d <= max) return 1.6 - d * 0.25
  // Typo in the typed part of a longer word: "ingolst" vs "ingolstadt".
  if (q.length >= 5 && t.length > q.length && dist(q, t.slice(0, q.length), 1) <= 1) return 1.3
  return 0
}

// Alias words per city/region, so typos of English names still match.
const aliasWords = {}
for (const [k, v] of Object.entries(ALIASES)) (aliasWords[v] ??= []).push(...k.split(' '))

// Search index: universities, regions and cities.
const cityUnis = {}
for (const u of universities) (cityUnis[u.city] ??= []).push(u)

const entries = [
  ...universities.map((u) => {
    const aliases = UNI_ALIASES[u.id] || []
    return {
      type: 'uni',
      u,
      label: u.name,
      tokens: [...new Set(fold(`${u.name} ${u.city} ${aliases.join(' ')}`).split(' ').filter((t) => t && !GENERIC.has(t)))],
      aliases: aliases.map(fold),
      city: u.city,
      region: u.region,
    }
  }),
  ...regions.map((r) => ({
    type: 'region',
    r,
    label: r.name,
    tokens: [...new Set([...fold(`${r.name} ${r.nameDe}`).split(' '), ...(aliasWords[r.code] || [])])],
    region: r.code,
  })),
  ...Object.keys(cityUnis).map((city) => ({
    type: 'city',
    city,
    label: city,
    tokens: [...fold(city).split(' ').filter((t) => !STOP.has(t)), ...(aliasWords[city] || [])],
    region: cityUnis[city][0].region,
  })),
]

function scoreEntry(e, qTokens, qFold) {
  if (e.aliases?.some((a) => a === qFold)) return { score: 10, fuzzy: false }
  let total = 0
  let fuzzy = false
  for (const q of qTokens) {
    let best = 0
    for (const t of e.tokens) best = Math.max(best, tokenScore(q, t))
    if (best === 0) return { score: 0 }
    if (best < 2) fuzzy = true
    total += best
  }
  // Prefer entries whose words are mostly covered by the query.
  const coverage = qTokens.length / Math.max(e.tokens.length, 1)
  const typeBoost = e.type === 'city' ? 0.4 : e.type === 'region' ? 0.3 : 0
  return { score: total / qTokens.length + coverage * 0.6 + typeBoost, fuzzy }
}

function routeFor(topic, place) {
  const city = place?.city
  const regionCode = place?.region
  const region = regionCode ? regionByCode[regionCode] : null
  const unis = city ? cityUnis[city] : null
  const oneUni = unis?.length === 1 ? unis[0] : place?.type === 'uni' ? place.u : null
  const where = place?.label
  const enc = encodeURIComponent

  switch (topic) {
    case 'costs':
      if (oneUni && !oneUni.abroad) return { to: `/universities/${oneUni.id}#costs`, title: `Prices in ${oneUni.city}` }
      if (city) return { to: `/costs?city=${enc(city)}#prices`, title: `Prices in ${city}` }
      if (region) return { to: `/regions/${region.slug}#costs`, title: `Prices in ${region.name}` }
      return { to: '/costs', title: 'Costs & budget planner' }
    case 'housing':
      if (oneUni && !oneUni.abroad) return { to: `/universities/${oneUni.id}#housing`, title: `Dorms & rooms in ${oneUni.city}` }
      if (city) return { to: `/housing?city=${enc(city)}`, title: `Dorms & rooms in ${city}` }
      if (region) return { to: `/regions/${region.slug}#housing`, title: `Housing in ${region.name}` }
      return { to: '/housing', title: 'Housing & dorms' }
    case 'halal':
      if (city || oneUni) return { to: `/survival-map?city=${enc(city || oneUni.city)}#halal`, title: `Halal food & mosques in ${city || oneUni.city}` }
      if (region) return { to: `/regions/${region.slug}#halal`, title: `Halal food in ${region.name}` }
      return { to: '/survival-map#halal', title: 'Halal food guide' }
    case 'internship':
      if (region) return { to: `/internships?region=${region.code}#companies`, title: `Internships in ${region.name}` }
      return { to: '/internships', title: 'Internship hub' }
    case 'airport':
      if (region) return { to: `/survival-map?region=${region.code}#airports`, title: `Budget airports near ${where}` }
      return { to: '/survival-map#airports', title: 'Budget airports' }
    case 'ticket':
      return { to: '/survival-map#ticket', title: 'Deutschlandticket: what it covers' }
    case 'videos':
      if (oneUni) return { to: `/universities/${oneUni.id}#videos`, title: `Videos: ${oneUni.name}` }
      if (region) return { to: `/videos?region=${region.code}`, title: `Videos from ${where}` }
      return { to: '/videos', title: 'Video library' }
    case 'events':
      if (region) return { to: `/regions/${region.slug}#events`, title: `Events in ${region.name}` }
      return { to: '/regions', title: 'Events by region' }
    case 'requirements':
      if (oneUni) return { to: `/universities/${oneUni.id}#requirements`, title: `Requirements: ${oneUni.name}` }
      return { to: '/universities', title: 'Compare requirements' }
    case 'banks':
      return { to: '/compare#banks', title: 'Compare banks: Sparkasse vs N26 vs Deutsche Bank' }
    case 'mobile':
      return { to: '/compare#mobile', title: 'Compare mobile plans: Telekom, Vodafone, O2, Aldi Talk' }
    case 'health':
      return { to: '/compare#health', title: 'Compare health insurance: TK vs AOK' }
    case 'rules':
      return { to: '/rules', title: 'Hidden rules: torrents, waste sorting, quiet hours' }
    case 'waste':
      return { to: '/rules#waste', title: 'Waste sorting (Mülltrennung), illustrated' }
    case 'quiet':
      return { to: '/rules#quiet', title: 'Quiet hours (Ruhezeit): nights & Sundays' }
    case 'routes':
      return { to: '/travel#germany', title: 'From one region to another: train, bus or plane' }
    case 'travel':
      return { to: '/travel', title: 'Budget travel: border trips & weekends under €50' }
    case 'deals':
      return { to: '/travel#savings', title: 'When and where to buy for less' }
    case 'ingredients':
      return { to: '/ingredients', title: 'Ingredient guide: E-numbers, gelatine and alcohol' }
    case 'apps':
      return { to: '/apps', title: 'Essential apps for Germany' }
    case 'arrival':
      return { to: '/guide#before', title: 'Arrival checklist' }
    case 'emergency':
      return { to: '/guide#emergency', title: 'Emergency numbers & doctors' }
    case 'phrases':
      return { to: '/guide#phrasebook', title: 'Phrasebook' }
    case 'weather':
      if (region) return { to: `/regions/${region.slug}#life`, title: `Weather & daily life in ${region.name}` }
      return { to: '/regions', title: 'Weather by region' }
    default:
      return null
  }
}

function detectTopics(tokens) {
  const found = []
  const rest = []
  for (const t of tokens) {
    let id = /^e\d{3}/.test(t) ? 'ingredients' : topicWords.get(t)
    if (!id && t.length >= 5) {
      // Typo-tolerant topic words: "internshp", "accomodation".
      const near = topicVocab.find((w) => w.length >= 6 && dist(t, w, 1) <= 1)
      if (near) id = topicWords.get(near)
    }
    if (id) {
      if (!found.includes(id)) found.push(id)
    } else rest.push(t)
  }
  return { found, rest }
}

export function smartSearch(input) {
  const qFold = fold(input)
  if (!qFold) return { answers: [], results: [], corrected: null }
  const raw = qFold.split(' ').filter(Boolean)

  // Aliases may span words ("lower saxony", "tu munich").
  let joined = ` ${qFold} `
  for (const [k, v] of Object.entries(ALIASES)) {
    if (joined.includes(` ${k} `)) joined = joined.replace(` ${k} `, ` ${fold(regionByCode[v]?.name ?? v)} `)
  }
  const tokens = joined.trim().split(' ').filter((t) => t && !STOP.has(t))
  const { found: topicIds, rest } = detectTopics(tokens)
  let placeTokens = rest.filter((t) => !GENERIC.has(t))

  const rank = (toks) =>
    entries
      .map((e) => ({ e, ...scoreEntry(e, toks, toks.join(' ')) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

  let ranked = []
  if (placeTokens.length) {
    ranked = rank(placeTokens)
    if (!ranked.length && placeTokens.length > 1) {
      // Drop words that match nothing ("halal fod erfurt" → "erfurt").
      placeTokens = placeTokens.filter((t) => entries.some((e) => e.tokens.some((x) => tokenScore(t, x) > 0)))
      if (placeTokens.length) ranked = rank(placeTokens)
    }
  } else if (rest.length && !topicIds.length) {
    // Only generic words like "university": list everything.
    ranked = entries.filter((e) => e.type === 'uni').map((e) => ({ e, score: 1 }))
  }

  const place = ranked[0]?.e
  const corrected = ranked[0]?.fuzzy ? place.label : null

  const answers = []
  const level = raw.find((t) => ['b1', 'b2', 'c1'].includes(t))
  if (level && level !== 'c1') {
    answers.push({ to: `/universities?level=${level.toUpperCase()}`, title: `Universities you can choose with ${level.toUpperCase()}`, topic: TOPICS.find((t) => t.id === 'requirements') })
  }
  for (const id of topicIds) {
    if (id === 'requirements' && level && level !== 'c1' && !place) continue
    const r = routeFor(id, place)
    if (r) answers.push({ ...r, topic: TOPICS.find((t) => t.id === id) })
  }

  // A city on its own: offer its main guides as quick answers.
  if (!topicIds.length && place?.type === 'city' && cityUnis[place.city].length > 1) {
    answers.push({ to: `/universities?q=${encodeURIComponent(place.city)}`, title: `All ${cityUnis[place.city].length} universities in ${place.city}`, topic: { icon: 'MapPin', label: 'City' } })
  }

  const seen = new Set()
  const results = []
  for (const { e } of ranked) {
    if (results.length >= 8) break
    if (e.type === 'city') {
      // Cities show their universities instead of a separate entry.
      for (const u of cityUnis[e.city]) {
        if (!seen.has(u.id)) {
          seen.add(u.id)
          results.push({ type: 'uni', u })
        }
      }
    } else if (e.type === 'uni') {
      if (!seen.has(e.u.id)) {
        seen.add(e.u.id)
        results.push({ type: 'uni', u: e.u })
      }
    } else if (!seen.has(e.r.code)) {
      seen.add(e.r.code)
      results.push({ type: 'region', r: e.r })
    }
  }

  // Topic only, no place: still useful answers, no results needed.
  return { answers, results: results.slice(0, 8), corrected }
}
