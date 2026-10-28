"""Post-process src/data/videos.json: pin curated videos and drop off-target ones.

Run after fetch_videos.py. Curated lists come first and are never filtered.
"""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'videos.json'

# The 16 videos from the Schmalkalden Survival Book, in the book's order.
CURATED = {
    'universities': {
        'schmalkalden': [
            ('948oBYZTaMc', 'Hochschule Schmalkalden – international studieren', 'Hochschule Schmalkalden', '2:25'),
            ('CV4wUNUoYSQ', 'Die Hochschule Schmalkalden von oben', 'campusthueringen', '0:44'),
            ('AJM_rLmHzLg', '360-Degree Campus Tour', 'Freistaat Thüringen', '3:11'),
            ('dJ3GOz0aNHA', 'Is Hochschule Schmalkalden Worth It? Campus Tour & Accommodation', 'Knowledge Minded', '13:40'),
            ('0JjoS9mA6fw', 'Campus Tour | FH Schmalkalden', 'Anirudh Gowda T', '9:51'),
            ('bh5lYxErWyE', 'Student Room Tour | Life at Hochschule Schmalkalden', 'Faraway Finds', '9:09'),
            ('uetHhSX5lBU', '6 Dinge, die du im ersten Monat erledigen musst', 'Aqib Rana', '10:14'),
            ('z3vqvAYSb5I', 'Schmalympics 2024 Aftermovie', 'StuRa HS Schmalkalden', '7:54'),
        ],
    },
    'cities': {
        'Schmalkalden': [
            ('Vx-aiagqU2s', 'Explore Schmalkalden with Lea, Lara and Sophia', 'campusthueringen', '4:22'),
            ('kpEpP0b5ie8', 'Schmalkaldens Altstadt & Sehenswürdigkeiten', 'Schmalkalden entdecken', '7:42'),
            ('6DadhgrcE-Y', 'Rundflug durch Schmalkalden', 'Schmalkalden entdecken', '4:51'),
            ('qzujNmCyQs0', 'Urlaubsserie Stadt-Land-Fluss: Schmalkalden', 'ARD-Morgenmagazin', '4:58'),
            ('89dgCoye8mo', 'Schmalkalden: Die schönste Fachwerkstadt Thüringens', 'Reisevagabund', '16:24'),
            ('XqqCb2hQD4E', 'Wilhelmsburg Castle documentary', 'Schlösser & Burgen', '19:33'),
            ('tOlsB5iMpgw', 'Imagefilm Prachtregion Schmalkalden-Meiningen', 'Prachtregion Schmalkalden-Meiningen', '5:26'),
        ],
    },
}

# GJU's own channel video, shown on the home page.
GJU = {'id': 'Jvh-cDrSk70', 'title': 'German-Jordanian University (GJU)', 'channel': 'The German Jordanian University GJU', 'duration': '1:37'}

# Results that matched a keyword but are about another institution.
DROP_CHANNELS = ('IU Internationale', 'IU International')
DROP_PER_KEY = {
    'hbk-saar': ('htw saar',),
    'internship': ('doctors',),
}


def main():
    data = json.loads(OUT.read_text())
    for group in ('universities', 'cities', 'states', 'topics'):
        for key, vids in data.get(group, {}).items():
            drop = DROP_PER_KEY.get(key, ())
            data[group][key] = [
                v for v in vids
                if not any(c.lower() in v['channel'].lower() for c in DROP_CHANNELS)
                and not any(d.lower() in (v['title'] + ' ' + v['channel']).lower() for d in drop)
            ]
    for group, entries in CURATED.items():
        for key, vids in entries.items():
            pinned = [{'id': i, 'title': t, 'channel': c, 'duration': d, 'views': '', 'published': '', 'pinned': True}
                      for i, t, c, d in vids]
            ids = {v['id'] for v in pinned}
            rest = [v for v in data[group].get(key, []) if v['id'] not in ids]
            data[group][key] = pinned + rest
    data['gju'] = GJU
    OUT.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')))
    total = sum(len(v) for g in ('universities', 'cities', 'states') for v in data[g].values())
    print('videos:', total, 'unique:', len({v['id'] for g in ('universities', 'cities', 'states') for vs in data[g].values() for v in vs}))


if __name__ == '__main__':
    main()
