// Transport, airports and the cultural survival map.
// Airline lists are the low-cost carriers usually serving each airport; routes
// change every season, so the site always links to a live flight search.

export const dticket = {
  // The price changes regularly, so we never show a fixed figure.
  covered: [
    'All regional trains: RB, RE, IRE and S-Bahn, across all of Germany',
    'U-Bahn, trams and city buses in every city',
    'Most regional buses and many local ferries',
    'Unlimited trips, any day, 24 hours',
  ],
  notCovered: [
    'Long-distance trains: ICE, IC, EC (a few IC sections are approved locally; check the DB Navigator app)',
    'FlixBus and FlixTrain',
    'First class',
    'Bikes, in most states (buy a bike ticket)',
    'Most routes beyond the German border',
  ],
  tips: [
    'Your Deutschlandsemesterticket is usually included in the semester fee, so you do not buy a separate Deutschlandticket.',
    'Keep the ticket on your phone (the university app or DB Navigator) and carry your student card or passport. Inspectors check both.',
    'Filter for "only local transport" (Nur Nahverkehr) in DB Navigator to see which connections are free.',
    'For long distances, book ICE Sparpreis tickets early. A BahnCard 25 for under-27s pays for itself after a few trips.',
    'Riding without a valid ticket costs a fine (estimated about €60).',
  ],
}

// Airports by state, nearest and most useful first.
export const airports = {
  BW: [
    { code: 'STR', name: 'Stuttgart', airlines: ['Eurowings'], note: 'Main airport; S-Bahn from Stuttgart' },
    { code: 'FKB', name: 'Karlsruhe/Baden-Baden', airlines: ['Ryanair', 'Wizz Air'], note: 'Budget flights; shuttle bus from Baden-Baden station' },
    { code: 'FMM', name: 'Memmingen', airlines: ['Ryanair', 'Wizz Air'], note: 'Budget airport about 1 h from Ulm' },
    { code: 'BSL', name: 'EuroAirport Basel-Mulhouse', airlines: ['easyJet', 'Wizz Air'], note: 'Close to Offenburg and Furtwangen' },
  ],
  BY: [
    { code: 'MUC', name: 'Munich', airlines: ['Eurowings', 'Lufthansa'], note: 'S-Bahn S1/S8; long-haul and Royal Jordanian flights' },
    { code: 'FMM', name: 'Memmingen', airlines: ['Ryanair', 'Wizz Air'], note: 'Bavaria\'s budget airport; bus from Munich' },
    { code: 'NUE', name: 'Nuremberg', airlines: ['Ryanair', 'Eurowings'], note: 'U-Bahn to the airport in 12 min' },
    { code: 'PRG', name: 'Prague (Czechia)', airlines: ['Ryanair', 'Wizz Air'], note: 'Cheap option from Weiden or Amberg' },
    { code: 'SZG', name: 'Salzburg (Austria)', airlines: ['Ryanair', 'easyJet'], note: 'Close to Rosenheim' },
  ],
  BE: [{ code: 'BER', name: 'Berlin Brandenburg', airlines: ['Ryanair', 'easyJet', 'Wizz Air', 'Eurowings'], note: 'One of Germany\'s biggest budget hubs; regional trains included in your ticket' }],
  BB: [
    { code: 'BER', name: 'Berlin Brandenburg', airlines: ['Ryanair', 'easyJet', 'Wizz Air', 'Eurowings'], note: 'Close to Wildau and Potsdam' },
    { code: 'DRS', name: 'Dresden', airlines: ['Eurowings'], note: 'Alternative from Cottbus' },
  ],
  HB: [
    { code: 'BRE', name: 'Bremen', airlines: ['Ryanair', 'Eurowings'], note: 'Tram line 6 from the city centre' },
    { code: 'HAM', name: 'Hamburg', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'About 1.5 h by regional train' },
  ],
  HH: [{ code: 'HAM', name: 'Hamburg', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'S-Bahn S1 from the centre in 25 min' }],
  HE: [
    { code: 'FRA', name: 'Frankfurt', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'Germany\'s main hub; direct flights to Amman' },
    { code: 'HHN', name: 'Frankfurt-Hahn', airlines: ['Ryanair'], note: 'Budget airport about 2 h from Frankfurt by bus' },
    { code: 'PAD', name: 'Paderborn-Lippstadt', airlines: ['Eurowings'], note: 'Small airport north of Kassel' },
  ],
  MV: [
    { code: 'HAM', name: 'Hamburg', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'About 3 h by train' },
    { code: 'BER', name: 'Berlin Brandenburg', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'About 2.5–3 h by train' },
  ],
  NI: [
    { code: 'HAJ', name: 'Hannover', airlines: ['Ryanair', 'Eurowings'], note: 'S-Bahn S5 from the main station' },
    { code: 'BRE', name: 'Bremen', airlines: ['Ryanair', 'Eurowings'], note: 'Close to Oldenburg and Emden' },
    { code: 'HAM', name: 'Hamburg', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'More destinations' },
  ],
  NW: [
    { code: 'CGN', name: 'Cologne Bonn', airlines: ['Ryanair', 'Eurowings'], note: 'S-Bahn from Cologne main station' },
    { code: 'DTM', name: 'Dortmund', airlines: ['Wizz Air', 'Eurowings'], note: 'Wizz Air base with many Eastern European routes' },
    { code: 'NRN', name: 'Weeze', airlines: ['Ryanair'], note: 'Ryanair airport near the Dutch border' },
    { code: 'DUS', name: 'Düsseldorf', airlines: ['Eurowings'], note: 'Large hub with many holiday routes' },
    { code: 'EIN', name: 'Eindhoven (Netherlands)', airlines: ['Ryanair', 'Wizz Air', 'Transavia'], note: 'Budget option from Aachen and Krefeld' },
  ],
  RP: [
    { code: 'HHN', name: 'Frankfurt-Hahn', airlines: ['Ryanair'], note: 'In the Hunsrück, near Trier and Bingen' },
    { code: 'FRA', name: 'Frankfurt', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'Under 1 h from Mainz' },
    { code: 'LUX', name: 'Luxembourg', airlines: ['easyJet', 'Luxair'], note: 'Close to Trier' },
  ],
  SL: [
    { code: 'LUX', name: 'Luxembourg', airlines: ['easyJet', 'Luxair'], note: 'About 1 h by bus' },
    { code: 'HHN', name: 'Frankfurt-Hahn', airlines: ['Ryanair'], note: 'Budget flights' },
    { code: 'FRA', name: 'Frankfurt', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'About 2 h by train' },
  ],
  SN: [
    { code: 'LEJ', name: 'Leipzig/Halle', airlines: ['Ryanair', 'Eurowings'], note: 'S-Bahn from Leipzig' },
    { code: 'DRS', name: 'Dresden', airlines: ['Eurowings'], note: 'S-Bahn S2 from the centre' },
    { code: 'PRG', name: 'Prague (Czechia)', airlines: ['Ryanair', 'Wizz Air'], note: 'About 2 h from Dresden' },
    { code: 'BER', name: 'Berlin Brandenburg', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'Most budget routes' },
  ],
  ST: [
    { code: 'LEJ', name: 'Leipzig/Halle', airlines: ['Ryanair', 'Eurowings'], note: 'Close to Merseburg and Köthen' },
    { code: 'BER', name: 'Berlin Brandenburg', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'From Magdeburg and Stendal' },
    { code: 'HAJ', name: 'Hannover', airlines: ['Ryanair', 'Eurowings'], note: 'From Wernigerode' },
  ],
  SH: [
    { code: 'HAM', name: 'Hamburg', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'About 1 h from Lübeck' },
    { code: 'BLL', name: 'Billund (Denmark)', airlines: ['Ryanair'], note: 'Option from Flensburg' },
    { code: 'CPH', name: 'Copenhagen (Denmark)', airlines: ['Ryanair', 'easyJet', 'Norwegian'], note: 'Large hub, about 3–4 h by train' },
  ],
  TH: [
    { code: 'LEJ', name: 'Leipzig/Halle', airlines: ['Ryanair', 'Eurowings'], note: 'About 1.5 h from Erfurt, Jena or Weimar' },
    { code: 'NUE', name: 'Nuremberg', airlines: ['Ryanair', 'Eurowings'], note: 'From Ilmenau and Schmalkalden' },
    { code: 'FRA', name: 'Frankfurt', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'Direct to Amman; about 3 h from Schmalkalden' },
    { code: 'ERF', name: 'Erfurt-Weimar', airlines: ['Holiday charters'], note: 'Small airport, tram from Erfurt' },
  ],
}

export const flightSearch = (code) => `https://www.google.com/travel/flights?q=${encodeURIComponent(`flights from ${code}`)}`

export const airlines = [
  { name: 'Ryanair', url: 'https://www.ryanair.com/', text: 'Cabin bag only is cheapest; check in online to avoid fees.' },
  { name: 'Wizz Air', url: 'https://wizzair.com/', text: 'Strong in Eastern Europe; the Wizz Discount Club can pay off for frequent trips.' },
  { name: 'easyJet', url: 'https://www.easyjet.com/', text: 'Berlin, Hamburg and Basel bases.' },
  { name: 'Eurowings', url: 'https://www.eurowings.com/', text: 'Lufthansa\'s budget airline, with many German airports.' },
  { name: 'Royal Jordanian', url: 'https://www.rj.com/', text: 'Direct flights home to Amman, mainly from Frankfurt.' },
]

export const europeTrips = [
  { to: 'Amsterdam', how: 'Train or FlixBus from NRW, or a flight', from: '€20–60' },
  { to: 'Paris', how: 'TGV/ICE from Frankfurt, Stuttgart or Saarbrücken', from: '€30–80' },
  { to: 'Prague', how: 'Bus or train from Dresden, Nuremberg or Berlin', from: '€15–40' },
  { to: 'Vienna & Budapest', how: 'Flights from Memmingen or Dortmund, or night trains', from: '€20–70' },
  { to: 'Rome, Milan & Bologna', how: 'Ryanair from BER, CGN, HHN and FKB', from: '€20–80' },
  { to: 'Barcelona & Valencia', how: 'Ryanair and Wizz Air from many German airports', from: '€30–90' },
  { to: 'Istanbul', how: 'Pegasus and Turkish Airlines from most big airports', from: '€60–150' },
  { to: 'Amman', how: 'Royal Jordanian from Frankfurt; compare with connections via Istanbul', from: '€220–480 return' },
]

// Cultural survival map: Google Maps searches per city.
export const foodLayers = [
  { id: 'butcher', label: 'Halal butchers', query: (city) => `Halal Metzgerei ${city}` },
  { id: 'turkish', label: 'Turkish supermarkets', query: (city) => `türkischer Supermarkt ${city}` },
  { id: 'arab', label: 'Arab supermarkets', query: (city) => `arabischer Supermarkt ${city}` },
  { id: 'restaurant', label: 'Arabic restaurants', query: (city) => `arabisches Restaurant ${city}` },
  { id: 'mosque', label: 'Mosques', query: (city) => `Moschee ${city}` },
]

export const mapEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=13&output=embed`
export const mapLink = (q) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`

export const halalTips = [
  { title: 'Look for "Helal" or "Halal"', text: 'Turkish shops label halal meat "Helal". Many big supermarkets (REWE, Kaufland, Edeka) also sell halal-certified chicken and sucuk from Turkish brands.' },
  { title: 'Read the labels', text: 'Watch for Schwein (pork), Gelatine (often pork; look for "Rindergelatine" or "Halal-Gelatine"), Schmalz (lard) and Alkohol in sweets and sauces.' },
  { title: 'Small towns', text: 'If your town has no halal butcher, buy in bulk in the nearest city and freeze it, or order online from German halal shops that deliver chilled meat.' },
  { title: 'In the Mensa', text: 'Menus mark pork and often vegetarian or vegan dishes. Ask the staff "Ist da Schweinefleisch drin?"' },
  { title: 'Friday prayer', text: 'Ask the International Office and last year\'s GJU students about the nearest mosque and any prayer room on campus.' },
  { title: 'Ramadan', text: 'Many mosques host free iftar evenings, a great way to meet the local community.' },
]
