// Essential apps for Germany. Tiles use the app's initials and a colour, not
// official logos. `play` and `ios` search Google Play and the App Store; `web` is the official site.

const play = (q) => `https://play.google.com/store/search?q=${encodeURIComponent(q)}&c=apps`
const appStore = (q) => `https://apps.apple.com/de/search?term=${encodeURIComponent(q)}`

const app = (name, initials, color, text, web, essential = false) => ({
  name, initials, color, text, web, essential, play: play(name), ios: appStore(name),
})

export const appCategories = [
  {
    id: 'transport',
    title: 'Transport',
    apps: [
      app('DB Navigator', 'DB', '#ec0016', 'Every train and bus in Germany, live delays, tickets and your Deutschlandticket.', 'https://www.bahn.de/', true),
      app('FlixBus', 'FB', '#73d700', 'Cheap long-distance buses across Germany and Europe.', 'https://www.flixbus.de/'),
      app('BlaBlaCar', 'BB', '#054752', 'Shared rides with drivers going your way.', 'https://www.blablacar.de/'),
      app('Lime', 'Li', '#0bd02b', 'E-scooters and e-bikes in many cities. Pay per minute.', 'https://www.li.me/'),
      app('Dott (formerly TIER)', 'Do', '#1a1a1a', 'E-scooters and e-bikes; TIER and Dott merged into one app.', 'https://ridedott.com/'),
      app('Bolt', 'Bo', '#34d186', 'Taxis, rides and scooters, often cheaper than a taxi.', 'https://bolt.eu/'),
    ],
  },
  {
    id: 'health',
    title: 'Health',
    apps: [
      app('Doctolib', 'Dl', '#107aca', 'Book doctor appointments online, no phone call or German needed. Filter for English-speaking doctors.', 'https://www.doctolib.de/', true),
      app('TK-App', 'TK', '#0094d4', 'If you insure with TK: sick notes, documents and English service.', 'https://www.tk.de/'),
      app('nora', 'no', '#c8102e', 'Official emergency call app for police, fire and ambulance, also by text.', 'https://www.nora-notruf.de/'),
      app('NINA', 'NI', '#004b87', 'Official warnings for storms, floods and emergencies near you.', 'https://www.bbk.bund.de/'),
    ],
  },
  {
    id: 'services',
    title: 'Services & money',
    apps: [
      app('Check24', 'C24', '#063773', 'Compare prices for almost anything: mobile plans, insurance, electricity, flights, electronics.', 'https://www.check24.de/', true),
      app('Kleinanzeigen', 'Ka', '#86b817', 'Second-hand furniture, bikes, rooms and more. Germany\'s biggest classifieds site.', 'https://www.kleinanzeigen.de/', true),
      app('N26', 'N26', '#36a18b', 'Free online bank account in English, opened in minutes.', 'https://n26.com/'),
      app('PayPal', 'PP', '#003087', 'Pay online and send money to friends; very common in Germany.', 'https://www.paypal.com/de/'),
      app('WG-Gesucht', 'WG', '#e2574c', 'Find a room in a shared flat. Turn on alerts.', 'https://www.wg-gesucht.de/'),
    ],
  },
  {
    id: 'food',
    title: 'Food & shopping',
    apps: [
      app('Lieferando', 'Lf', '#ff8000', 'Food delivery from local restaurants, including many halal places.', 'https://www.lieferando.de/', true),
      app('Wolt', 'Wo', '#009de0', 'Food and grocery delivery in larger cities.', 'https://wolt.com/de'),
      app('Too Good To Go', 'TG', '#00615f', 'Rescue unsold food from bakeries and shops for a few euros.', 'https://www.toogoodtogo.com/', true),
      app('Marktguru', 'Mg', '#e30613', 'All supermarket offers of the week in one place.', 'https://www.marktguru.de/'),
      app('Lidl Plus', 'L+', '#0050aa', 'Coupons and digital receipts at Lidl.', 'https://www.lidl.de/'),
    ],
  },
  {
    id: 'language',
    title: 'Language & study',
    apps: [
      app('DeepL', 'DL', '#0f2b46', 'The best German–English translator, including photos of letters.', 'https://www.deepl.com/', true),
      app('Google Translate', 'GT', '#4285f4', 'Point your camera at signs and menus for instant translation.', 'https://translate.google.com/'),
      app('Duolingo', 'Du', '#58cc02', 'Keep your German practice going every day.', 'https://www.duolingo.com/'),
    ],
  },
]
