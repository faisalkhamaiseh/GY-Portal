"""Collect real YouTube videos for every university, city and state.

Reads src/data/universities.tsv, queries YouTube search, keeps only results whose
title or channel actually mentions the place, and writes src/data/videos.json.
Re-run any time to refresh the video lists.
"""
import csv, json, re, sys, time, unicodedata, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'data' / 'videos.json'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36'

STATES = {
    'BW': 'Baden-Württemberg', 'BY': 'Bavaria', 'BE': 'Berlin', 'BB': 'Brandenburg',
    'HB': 'Bremen', 'HH': 'Hamburg', 'HE': 'Hesse', 'MV': 'Mecklenburg-Vorpommern',
    'NI': 'Lower Saxony', 'NW': 'North Rhine-Westphalia', 'RP': 'Rhineland-Palatinate',
    'SL': 'Saarland', 'SN': 'Saxony', 'ST': 'Saxony-Anhalt', 'SH': 'Schleswig-Holstein',
    'TH': 'Thuringia',
}
STATE_DE = {
    'BW': 'Baden-Württemberg', 'BY': 'Bayern', 'BE': 'Berlin', 'BB': 'Brandenburg',
    'HB': 'Bremen', 'HH': 'Hamburg', 'HE': 'Hessen', 'MV': 'Mecklenburg-Vorpommern',
    'NI': 'Niedersachsen', 'NW': 'Nordrhein-Westfalen', 'RP': 'Rheinland-Pfalz',
    'SL': 'Saarland', 'SN': 'Sachsen', 'ST': 'Sachsen-Anhalt', 'SH': 'Schleswig-Holstein',
    'TH': 'Thüringen',
}
GENERIC = {'hochschule', 'universitat', 'university', 'universitaet', 'th', 'tu', 'fh', 'oth',
           'haw', 'campus', 'technische', 'of', 'the', 'and', 'fur', 'applied', 'sciences', 'de',
           'di', 'do', 'politecnico', 'institute', 'technology', 'technical', 'school', 'international'}


def norm(s):
    s = s.lower().replace('ß', 'ss').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue')
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()


def variants(word):
    """Match 'München' as muenchen/munchen/munich and 'Köln' as koeln/koln/cologne."""
    n = norm(word)
    out = {n, n.replace('ae', 'a').replace('oe', 'o').replace('ue', 'u')}
    extra = {'muenchen': 'munich', 'koeln': 'cologne', 'nuernberg': 'nuremberg',
             'hannover': 'hanover', 'braunschweig': 'brunswick', 'bayern': 'bavaria',
             'thueringen': 'thuringia', 'sachsen': 'saxony', 'hessen': 'hesse',
             'valencia': 'valencia', 'reykjavik': 'reykjavik', 'brussels': 'bruxelles'}
    if n in extra:
        out.add(extra[n])
    if n == 'brussels':
        out.update({'brussel', 'bruxelles'})
    return {v for v in out if v}


def search(query):
    url = 'https://www.youtube.com/results?' + urllib.parse.urlencode(
        {'search_query': query, 'hl': 'en', 'gl': 'DE'})
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept-Language': 'en'})
            html = urllib.request.urlopen(req, timeout=25).read().decode('utf-8', 'replace')
            break
        except Exception as e:  # network hiccup: back off and retry
            print('  retry', query, e, file=sys.stderr)
            time.sleep(2 ** (attempt + 1))
    else:
        return []
    m = re.search(r'var ytInitialData = (\{.*?\});</script>', html, re.S)
    if not m:
        return []
    data = json.loads(m.group(1))
    found = []

    def walk(node):
        if isinstance(node, dict):
            vr = node.get('videoRenderer')
            if vr and 'lengthText' in vr:
                found.append({
                    'id': vr['videoId'],
                    'title': ''.join(r.get('text', '') for r in vr['title'].get('runs', [])),
                    'channel': ''.join(r.get('text', '') for r in vr.get('ownerText', {}).get('runs', [])),
                    'duration': vr['lengthText'].get('simpleText', ''),
                    'views': vr.get('shortViewCountText', {}).get('simpleText', ''),
                    'published': vr.get('publishedTimeText', {}).get('simpleText', ''),
                })
            for v in node.values():
                walk(v)
        elif isinstance(node, list):
            for v in node:
                walk(v)
    walk(data)
    return found


def minutes(d):
    parts = [int(p) for p in d.split(':') if p.isdigit()]
    total = 0
    for p in parts:
        total = total * 60 + p
    return total / 60


def collect(queries, keywords, limit, seen_global=None):
    keys = set()
    for k in keywords:
        keys |= variants(k)
    out, seen = [], set()
    for q in queries:
        for v in search(q):
            if v['id'] in seen or not (0.5 <= minutes(v['duration']) <= 45):
                continue
            hay = ' ' + norm(v['title'] + ' ' + v['channel']) + ' '
            if any(f' {k} ' in hay for k in keys):
                seen.add(v['id'])
                out.append(v)
        time.sleep(0.6)
        if len(out) >= limit:
            break
    return out[:limit]


def main():
    rows = list(csv.DictReader(open(ROOT / 'src' / 'data' / 'universities.tsv', encoding='utf-8'), delimiter='\t'))
    result = json.loads(OUT.read_text()) if OUT.exists() else {'universities': {}, 'cities': {}, 'states': {}}
    only = set(sys.argv[1:])

    for r in rows:
        if r['id'] in result['universities'] and not only or (only and r['id'] not in only):
            continue
        tokens = [t for t in norm(r['yt']).split() if t not in GENERIC and len(t) > 2]
        kws = tokens + [r['city'].split(' ')[0]]
        vids = collect([f"{r['yt']} campus tour", f"{r['yt']}", f"{r['yt']} international students"], kws, 8)
        result['universities'][r['id']] = vids
        print(f"uni {r['id']}: {len(vids)}", flush=True)
        OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))

    for city in sorted({r['city'] for r in rows}):
        if city in result['cities'] and not only:
            continue
        if only:
            continue
        kw = [city.split(' ')[0] if city not in ('Frankfurt am Main', 'Rüsselsheim am Main') else city.split(' ')[0]]
        vids = collect([f'{city} travel guide', f'{city} Sehenswürdigkeiten', f'{city} student life'], kw, 8)
        result['cities'][city] = vids
        print(f'city {city}: {len(vids)}', flush=True)
        OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))

    for code, name in STATES.items():
        if code in result['states'] and not only:
            continue
        if only:
            continue
        vids = collect([f'{name} Germany travel', f'{STATE_DE[code]} Sehenswürdigkeiten', f'{name} things to do'],
                       [name, STATE_DE[code]], 8)
        result['states'][code] = vids
        print(f'state {code}: {len(vids)}', flush=True)
        OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))


# Topic playlists shown on the internship hub. Keywords keep results on topic.
TOPICS = {
    'internship': (['internship in Germany international student', 'Pflichtpraktikum finden Tipps',
                    'German CV Lebenslauf tips', 'job interview in Germany tips international students'],
                   ['internship', 'praktikum', 'lebenslauf', 'cv', 'interview', 'bewerbung', 'job']),
}


def topics():
    result = json.loads(OUT.read_text())
    result.setdefault('topics', {})
    for key, (queries, kws) in TOPICS.items():
        result['topics'][key] = collect(queries, kws, 12)
        print(f'topic {key}: {len(result["topics"][key])}', flush=True)
    OUT.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')))


if __name__ == '__main__' and sys.argv[1:] == ['--topics']:
    topics()
elif __name__ == '__main__':
    main()
