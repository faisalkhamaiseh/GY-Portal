import tsv from '../data/universities.tsv?raw'
import { regionByCode, countryNames } from '../data/regions.js'
import covers from '../data/covers.json'
import { rentFor } from '../data/costs.js'

const LEVEL_RANK = { B1: 1, B2: 2, C1: 3 }

function parse(text) {
  const [head, ...rows] = text.trim().split('\n')
  const keys = head.split('\t')
  return rows.map((line) => {
    const cells = line.split('\t')
    const row = Object.fromEntries(keys.map((k, i) => [k, (cells[i] ?? '').trim()]))
    const abroad = row.country !== 'DE'
    const note = row.note
    // A note can ask for more than the headline level for some programmes.
    const stricter = /C1/.test(note) && row.german !== 'C1' ? 'C1' : /B2/.test(note) && !row.german ? 'B2' : null
    return {
      id: row.id,
      name: row.name,
      city: row.city,
      zip: row.zip,
      country: row.country,
      countryName: abroad ? countryNames[row.state] || row.country : 'ألمانيا',
      region: abroad ? 'INT' : row.state,
      german: row.german || null,
      germanNote: stricter ? `${stricter} لبعض التخصصات` : null,
      gpa: row.gpa ? Number(row.gpa) : null,
      fee: row.fee || null,
      note,
      site: row.site,
      abroad,
    }
  })
}

export const universities = parse(tsv).sort((a, b) => a.name.localeCompare(b.name, 'de'))
export const universityById = Object.fromEntries(universities.map((u) => [u.id, u]))

export const universitiesIn = (code) => universities.filter((u) => u.region === code)
export const cityList = (code) => [...new Set(universitiesIn(code).map((u) => u.city))].sort()

export const regionOf = (u) => regionByCode[u.region]

export function rentForUniversity(u) {
  return u.abroad ? null : rentFor(u.city)
}

export function levelRank(level) {
  return LEVEL_RANK[level] ?? 0
}

export function requirementTags(u) {
  const tags = []
  if (u.german) tags.push({ kind: 'german', label: `ألماني ${u.german}` })
  else if (u.germanNote) tags.push({ kind: 'german', label: u.germanNote })
  if (u.gpa) tags.push({ kind: 'gpa', label: `معدل > ${u.gpa}%` })
  if (u.fee) tags.push({ kind: 'fee', label: u.fee })
  if (!tags.length && !u.note) tags.push({ kind: 'open', label: 'لا شروط إضافية' })
  return tags
}

// Videos are ~350 KB, so they load on demand and are cached for the session.
let videoCache
export function loadVideos() {
  videoCache ??= import('../data/videos.json').then((m) => m.default)
  return videoCache
}

export function normalise(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
}

export function searchUniversities(q, list = universities) {
  const n = normalise(q.trim())
  if (!n) return list
  const parts = n.split(/\s+/)
  return list.filter((u) => {
    const hay = normalise(`${u.name} ${u.city} ${regionByCode[u.region]?.name ?? ''} ${u.zip}`)
    return parts.every((p) => hay.includes(p))
  })
}

// One cover video per university (precomputed by scripts/covers.mjs so cards
// render before the full video index loads).
export const coverVideoId = (_videos, id) => covers.universities[id]?.cover
export const heroVideo = (id) => covers.universities[id]?.hero
export const gjuVideo = covers.gju
