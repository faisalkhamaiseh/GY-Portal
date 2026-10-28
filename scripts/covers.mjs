// Builds src/data/covers.json: the one cover thumbnail per university (no two
// sister campuses share one), each university's hero video and the GJU video.
// Pages show these instantly; the full video index (~350 KB) loads later.
import { readFile, writeFile } from 'node:fs/promises'

const videos = JSON.parse(await readFile('src/data/videos.json', 'utf8'))
const [, ...rows] = (await readFile('src/data/universities.tsv', 'utf8')).trim().split('\n')
const ids = rows
  .map((r) => r.split('\t'))
  .sort((a, b) => a[1].localeCompare(b[1], 'de'))
  .map((c) => c[0])

const used = new Set()
const universities = {}
for (const id of ids) {
  const list = videos.universities[id] || []
  const pick = list.find((v) => !used.has(v.id)) ?? list[0]
  if (!pick) continue
  used.add(pick.id)
  universities[id] = { cover: pick.id, hero: { id: list[0].id, title: list[0].title } }
}

await writeFile('src/data/covers.json', JSON.stringify({ gju: { id: videos.gju.id, title: videos.gju.title }, universities }))
console.log(`Covers for ${Object.keys(universities).length} universities.`)
