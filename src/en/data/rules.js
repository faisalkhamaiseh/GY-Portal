// "Hidden" everyday rules that cost new students money. Amounts are typical
// fines or claims; all amounts are estimates and vary by case, state and year.

export const torrent = {
  title: 'Never download or stream films, series or music illegally',
  fine: 'Hundreds to thousands of euros per file',
  points: [
    'Torrent programs share (upload) while they download. In Germany that counts as distributing copyrighted material.',
    'Law firms track IP addresses and send a warning letter (Abmahnung) to whoever owns the internet contract. In a WG or dorm, that can be you.',
    'The letter demands a signed cease-and-desist declaration and a payment, which can reach hundreds or thousands of euros for a single film or album. Ignoring it can lead to court.',
    'Letters can arrive weeks or months later, even after you have moved.',
  ],
  ifYouGetOne: [
    'Do not ignore it, and do not pay or sign straight away. Deadlines are short.',
    'Go to a consumer advice centre (Verbraucherzentrale) or a lawyer. Many universities offer students free legal advice through the student council (AStA/StuRa).',
    'A modified cease-and-desist declaration (modifizierte Unterlassungserklärung) prepared by a lawyer often reduces the cost.',
  ],
  legal: ['Netflix, Disney+, Prime Video and others (often with student or shared plans)', 'ARD and ZDF Mediathek: free German TV, films and documentaries', 'Spotify, Apple Music, YouTube Music student plans', 'Your university library: free films, e-books and streaming databases'],
}

// Waste sorting. `color` matches the bin you will see in most German cities.
export const bins = [
  {
    id: 'paper',
    short: 'PAPER',
    name: 'Paper',
    de: 'Papier / Altpapier',
    color: '#2d63b7',
    lid: 'Blue bin',
    yes: ['Newspapers, magazines, flyers', 'Cardboard boxes (flattened)', 'Paper bags, envelopes', 'Egg cartons'],
    no: ['Pizza boxes with grease', 'Used tissues and kitchen paper', 'Receipts (thermal paper)', 'Coated drink cartons (yellow)'],
  },
  {
    id: 'yellow',
    short: 'PLASTIC',
    name: 'Plastic & packaging',
    de: 'Gelbe Tonne / Gelber Sack',
    color: '#e7b416',
    lid: 'Yellow bin or yellow bag',
    yes: ['Plastic packaging, bottles without deposit, yogurt pots', 'Cans and aluminium foil', 'Drink cartons (Tetra Pak)', 'Polystyrene packaging'],
    no: ['Toys, toothbrushes, plastic items that are not packaging (residual waste)', 'Glass', 'Bottles with a deposit (return them to the shop)'],
  },
  {
    id: 'bio',
    short: 'BIO',
    name: 'Organic',
    de: 'Biotonne / Biomüll',
    color: '#7a5a2e',
    lid: 'Brown bin',
    yes: ['Fruit and vegetable scraps', 'Coffee grounds and filters, tea bags', 'Eggshells', 'Cut flowers, plants'],
    no: ['Plastic bags, even "compostable" ones in many cities', 'Cooked meat and bones (some cities: residual waste)', 'Cat litter'],
  },
  {
    id: 'rest',
    short: 'REST',
    name: 'Residual waste',
    de: 'Restmüll',
    color: '#3a3f3c',
    lid: 'Black or grey bin',
    yes: ['Used tissues, nappies, vacuum-cleaner bags', 'Cigarette ends, ash', 'Broken ceramics, mirrors', 'Dirty packaging that cannot be cleaned'],
    no: ['Batteries and electronics', 'Anything recyclable', 'Paint, chemicals, medicines (ask the pharmacy)'],
  },
  {
    id: 'glass',
    short: 'GLASS',
    name: 'Glass',
    de: 'Altglas',
    color: '#3f8f5b',
    lid: 'Street containers: white, green, brown',
    yes: ['Jars and bottles without deposit', 'Sort by colour: white, green, brown (blue glass goes in green)'],
    no: ['Window glass, drinking glasses, light bulbs', 'Lids (put them in yellow)', 'Throwing glass in on Sundays or after 20:00: noise rules apply'],
  },
]

export const wasteExtras = [
  { title: 'Pfand: bottles are money', text: 'Bottles and cans with a deposit logo carry a small deposit. Return them to the machine in any supermarket and get a voucher.' },
  { title: 'Batteries & electronics', text: 'Free collection boxes in supermarkets and drugstores (batteries), electronics stores and municipal recycling centres (Wertstoffhof).' },
  { title: 'Big items (Sperrmüll)', text: 'Furniture is collected on request, often free once or twice a year. Book it with your city\'s waste service; never leave it on the street.' },
  { title: 'Why landlords care', text: 'Wrongly sorted bins can be refused or charged extra, and the cost is split across the house. Neighbours notice, and repeated problems can lead to warnings.' },
]

export const quietHours = {
  blocks: [
    { label: 'Night rest', time: '22:00 – 06:00', text: 'Every night. Some house rules say until 07:00.' },
    { label: 'Sundays & public holidays', time: 'All day', text: 'No drilling, hammering, loud music, lawn mowing or bottle-bank visits.' },
    { label: 'Midday rest', time: '13:00 – 15:00', text: 'Not law everywhere, but common in house rules (Hausordnung). Check yours.' },
  ],
  avoid: [
    'Washing machines and dryers at night or on Sundays (in many buildings)',
    'Loud music, parties or phone calls on the balcony after 22:00',
    'Showering or bathing late at night, if your house rules forbid it',
    'Drilling and furniture assembly on Sundays',
    'Throwing glass into bottle banks on Sundays and after 20:00',
  ],
  consequences: 'Neighbours usually complain to the landlord first. Repeated noise can lead to warnings, and in serious cases a substantial fine under the Ordnungswidrigkeitengesetz, or the end of your lease. Planning a party? Put a friendly note in the stairwell a few days before.',
}

export const otherRules = [
  { title: 'Riding without a ticket', fine: '€60', text: 'Carry your semester ticket and student ID or passport. Forgot it? Show your personal ticket to the transport company within a week and the fine drops to €7.' },
  { title: 'Late address registration', fine: 'Up to €1,000', text: 'Register (Anmeldung) within the legal deadline after moving in, and de-register when you leave Germany.' },
  { title: 'Cycling through a red light', fine: '€60', text: 'Bikes follow traffic law: €100 if the light was red for more than a second, plus a point in Flensburg.' },
  { title: 'Phone in hand while cycling', fine: '€55', text: 'Use a phone mount.' },
  { title: 'Cycling on the pavement', fine: '€55', text: 'Use the bike lane or the road. Only children may ride on pavements.' },
  { title: 'No lights on your bike', fine: '€20', text: 'Front and rear lights are required after dark.' },
  { title: 'E-scooter after drinking', fine: 'Like a car', text: 'The same alcohol limits as for drivers apply, plus driving bans.' },
  { title: 'Crossing on a red pedestrian light', fine: '€5', text: 'Small fine, but people will stare, especially near children.' },
  { title: 'Not airing your room (Lüften)', fine: 'Your deposit', text: 'Open windows wide for 5–10 minutes a few times a day, even in winter. Mould damage is deducted from your deposit.' },
  { title: 'Ignoring the broadcast fee', fine: 'Back payments', text: 'The monthly Rundfunkbeitrag per flat is mandatory. Unpaid months are collected later with fees.' },
]
