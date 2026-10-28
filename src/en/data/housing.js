// Housing portals that work across Germany. `search` builds a city-specific
// link where the portal supports it; otherwise students search on the site.

const enc = encodeURIComponent
const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const portals = [
  {
    name: 'WG-Gesucht',
    url: 'https://www.wg-gesucht.de/',
    kind: 'WG rooms',
    text: 'The main shared-flat portal in Germany. Turn on email alerts and message fast.',
    trust: 'Most used',
  },
  {
    name: 'Kleinanzeigen',
    url: 'https://www.kleinanzeigen.de/',
    search: (city) => `https://www.kleinanzeigen.de/s-${slug(`wg zimmer ${city}`)}/k0`,
    kind: 'Rooms, sublets, furniture',
    text: 'Classifieds for rooms, sublets, bikes and cheap furniture.',
  },
  {
    name: 'ImmoScout24',
    url: 'https://www.immobilienscout24.de/',
    kind: 'Whole flats',
    text: 'The largest listing site for flats. Landlords often ask for a SCHUFA credit report.',
  },
  {
    name: 'Immowelt',
    url: 'https://www.immowelt.de/',
    kind: 'Whole flats',
    text: 'The second big listing site for flats.',
  },
  {
    name: 'Studenten-WG.de',
    url: 'https://www.studenten-wg.de/',
    kind: 'Student rooms',
    text: 'Student-only room listings.',
  },
  {
    name: 'WG-Suche.de',
    url: 'https://www.wg-suche.de/',
    kind: 'WG rooms',
    text: 'A smaller WG portal, worth checking in smaller towns.',
  },
  {
    name: 'HousingAnywhere',
    url: 'https://housinganywhere.com/',
    kind: 'Book from abroad',
    text: 'Book a room from Amman with payment protection. Prices are higher; few listings in small towns.',
    trust: 'Payment protection',
  },
  {
    name: 'Wunderflats',
    url: 'https://wunderflats.com/',
    kind: 'Furnished, monthly',
    text: 'Furnished flats for 1–12 months. Good for the internship half of the year.',
  },
  {
    name: 'Facebook groups',
    url: 'https://www.facebook.com/groups/',
    search: (city) => `https://www.facebook.com/search/groups/?q=${enc(`${city} WG`)}`,
    kind: 'Community',
    text: 'Search "[City] WG" and "[University] students". Ask GJU students from last year: they often hand their rooms on.',
  },
]

export const dormSearch = (city) =>
  `https://www.google.com/search?q=${enc(`Studierendenwerk ${city} Wohnheim`)}`

export const scamRules = [
  'Never send a deposit before you have seen the room in person or on a live video call.',
  'Never pay through Western Union, MoneyGram, crypto or gift cards.',
  'A "landlord abroad" who will post you the keys is always a scam.',
  'Check the listing\'s photos with a reverse image search.',
  'Sign a written rental contract (Mietvertrag) and get the landlord confirmation (Wohnungsgeberbestätigung). You need it for the Anmeldung.',
]

export const housingWords = [
  ['Warmmiete', 'Rent including heating and usually water'],
  ['Kaltmiete', 'Rent without heating, water or electricity'],
  ['Nebenkosten (NK)', 'Extra running costs on top of cold rent'],
  ['Kaution', 'Deposit, usually 1–3 months of cold rent'],
  ['WG', 'Shared flat (Wohngemeinschaft)'],
  ['Zwischenmiete', 'Sublet for a fixed period, perfect for one semester'],
  ['möbliert', 'Furnished'],
  ['Besichtigung', 'Viewing appointment'],
  ['Wohnungsgeberbestätigung', 'Landlord confirmation, needed to register your address'],
  ['Studierendenwerk', 'The public student service that runs dorms and Mensas'],
]

export const housingTimeline = [
  { when: 'Day 1 of placement', title: 'Apply to the Studierendenwerk', text: 'Applications usually open several months before the semester. It is first come, first served, so watch your city\'s Studierendenwerk website.' },
  { when: 'Same week', title: 'Message last year\'s GJU students', text: 'Rooms are often handed from one GJU cohort to the next, so ask in the German Year group chats.' },
  { when: '6–8 weeks before', title: 'Start private searches', text: 'Set alerts on WG-Gesucht and Kleinanzeigen, and write short, friendly messages in German.' },
  { when: 'On arrival', title: 'Sign and register', text: 'Sign the contract, get the Wohnungsgeberbestätigung, then book your Anmeldung within the legal deadline.' },
]
