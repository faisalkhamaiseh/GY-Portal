// Cost model for the German Year. Fixed official costs (blocked account, health
// insurance, broadcast fee, semester ticket, permits) are exact current rates.
// Everyday prices are realistic student ranges, built from German averages and
// scaled by a city's price tier. They are estimates, not quotes.

// Monthly blocked-account payout for study visas in 2026 (€11,904 a year).
export const BLOCKED_MONTHLY = 992

// Rent bands per city tier: [min, max] per month, warm (bills included).
export const tiers = {
  1: { label: 'Very expensive', note: 'Munich', dorm: [320, 480], wg: [650, 850], flat: [950, 1350], factor: 1.2 },
  2: { label: 'Expensive', note: 'Big western cities', dorm: [290, 420], wg: [520, 700], flat: [750, 1100], factor: 1.1 },
  3: { label: 'Above average', note: 'Larger university cities', dorm: [260, 380], wg: [420, 560], flat: [600, 850], factor: 1.0 },
  4: { label: 'Average', note: 'Mid-sized towns', dorm: [240, 340], wg: [340, 460], flat: [480, 700], factor: 0.95 },
  5: { label: 'Affordable', note: 'Small towns and the east', dorm: [220, 310], wg: [260, 380], flat: [360, 540], factor: 0.9 },
}

// City → tier. Anything missing falls back to tier 4.
export const cityTier = {
  'München': 1,
  Berlin: 2, Hamburg: 2, 'Frankfurt am Main': 2, Stuttgart: 2, 'Köln': 2, Darmstadt: 2, Wiesbaden: 2, Mainz: 2,
  Heidelberg: 2, Potsdam: 2,
  Mannheim: 3, Karlsruhe: 3, 'Nürnberg': 3, Augsburg: 3, Regensburg: 3, Ingolstadt: 3, 'Würzburg': 3, Rosenheim: 3,
  Hannover: 3, Bremen: 3, Aachen: 3, 'Münster': 3, Bochum: 3, Dortmund: 3, Ulm: 3, 'Neu-Ulm': 3, Reutlingen: 3,
  'Göttingen': 3, Marburg: 3, Giessen: 3, Leipzig: 3, Dresden: 3, 'Lübeck': 3, Jena: 3, 'Sankt Augustin': 3,
  'Rüsselsheim am Main': 3, Dieburg: 3, Heilbronn: 3, Landshut: 3, Kempten: 3, Bielefeld: 3, Krefeld: 3, Oldenburg: 3,
  'Osnabrück': 3, Kaiserslautern: 4, Trier: 4, Koblenz: 4, Worms: 4, Bingen: 4, Remagen: 4, 'Saarbrücken': 4, Kassel: 4, Fulda: 4,
  Wuppertal: 4, Siegen: 4, Hamm: 4, Lippstadt: 4, Gummersbach: 4, Detmold: 4, Lemgo: 4, 'Höxter': 5, Erfurt: 4,
  Weimar: 4, Flensburg: 4, Aalen: 4, Biberach: 4, Albstadt: 5, Sigmaringen: 5, 'Nürtingen': 4, Offenburg: 4,
  'Villingen-Schwenningen': 4, Heidenheim: 4, 'Bad Mergentheim': 4, Amberg: 5, Weiden: 5, Bayreuth: 4, Coburg: 4,
  Schweinfurt: 4, Aschaffenburg: 4, Deggendorf: 4, 'Wolfenbüttel': 4, Emden: 5, Wilhelmshaven: 5, Bremerhaven: 5,
  Germersheim: 4, 'Hoppstädten-Weiersbach': 5, Wildau: 4, 'Brandenburg an der Havel': 5, Cottbus: 5,
  Magdeburg: 5, Stendal: 5, Merseburg: 5, Dessau: 5, 'Köthen': 5, Wernigerode: 5, Chemnitz: 5, Zwickau: 5,
  Freiberg: 5, Mittweida: 5, Ilmenau: 5, Nordhausen: 5, Schmalkalden: 5, Neubrandenburg: 5, Stralsund: 5,
}

// Verified local overrides (from the Schmalkalden survival book).
export const cityOverrides = {
  Schmalkalden: { dorm: [231, 300], wg: [230, 350], flat: [320, 480] },
}

export function rentFor(city) {
  const tier = tiers[cityTier[city] ?? 4]
  return { ...tier, ...(cityOverrides[city] || {}), tier: cityTier[city] ?? 4 }
}

// Everyday price list. `fixed: true` items are the same everywhere in
// Germany; others are scaled by the city's tier factor.
export const priceGroups = [
  {
    id: 'fees',
    title: 'Fees & paperwork',
    icon: 'FileText',
    items: [
      { name: 'Semester fee', min: 280, max: 420, unit: 'semester', fixed: true, note: 'Set by each university and includes the €226.80 Deutschlandsemesterticket. Hochschule Schmalkalden: €331.80 for winter 2026/27.' },
      { name: 'Blocked account payout', min: 992, max: 992, unit: 'month', fixed: true, note: 'Official 2026 amount for study visas: €11,904 for 12 months. Providers charge a one-off fee.' },
      { name: 'Public health insurance', min: 141.16, max: 141.16, unit: 'month', fixed: true, note: 'TK student rate for 2026, under 23. From 23 without children: €146.29. Other public insurers differ by a few euros.' },
      { name: 'Visa (national D visa)', min: 75, max: 75, unit: 'once', fixed: true, note: 'Paid at the German embassy in Amman.' },
      { name: 'Residence permit', min: 100, max: 100, unit: 'once', fixed: true, note: 'First permit at the immigration office (Ausländerbehörde). Extending it by more than 3 months costs €93.' },
      { name: 'Broadcast fee (Rundfunkbeitrag)', min: 18.36, max: 18.36, unit: 'month', fixed: true, note: 'Per flat, split among flatmates: €6.12 each with three.' },
      { name: 'Biometric photos', min: 10, max: 15, unit: 'once', note: 'Photo booth or drugstore (dm, Rossmann).' },
    ],
  },
  {
    id: 'housing',
    title: 'Housing extras',
    icon: 'Home',
    items: [
      { name: 'Deposit (Kaution)', min: 300, max: 1500, unit: 'once', fixed: true, note: 'Dorms usually a few hundred euros; private flats up to 3 months of cold rent.' },
      { name: 'Home internet', min: 10, max: 30, unit: 'month', note: 'Dorm LAN is sometimes extra, or split a WG contract.' },
      { name: 'Furniture & kitchen basics', min: 50, max: 200, unit: 'once', note: 'Kleinanzeigen, IKEA, leftovers from outgoing students.' },
      { name: 'Bedding & towels', min: 40, max: 80, unit: 'once', note: 'IKEA, Primark, TK Maxx.' },
      { name: 'Household liability insurance', min: 3, max: 6, unit: 'month', note: 'Haftpflicht: cheap and strongly recommended.' },
    ],
  },
  {
    id: 'food',
    title: 'Food & groceries',
    icon: 'ShoppingBasket',
    items: [
      { name: 'Groceries', min: 150, max: 230, unit: 'month', note: 'Cooking at home, shopping at Aldi, Lidl, Netto, Penny and Kaufland.' },
      { name: 'Mensa main meal', min: 2.5, max: 4.8, unit: 'meal', note: 'Student price with your student card.' },
      { name: 'Bread rolls (Brötchen)', min: 0.4, max: 0.8, unit: 'piece', note: 'Supermarket rolls are cheaper than bakery ones.' },
      { name: 'Halal chicken (1 kg)', min: 7, max: 11, unit: 'kg', note: 'Turkish or Arabic supermarkets.' },
      { name: 'Rice (1 kg)', min: 1.5, max: 3, unit: 'kg', note: 'Basmati costs more.' },
      { name: 'Hummus / tahini jar', min: 2, max: 4, unit: 'jar', note: 'Arabic shops and big supermarkets.' },
      { name: 'Milk (1 L)', min: 1, max: 1.3, unit: 'litre' },
      { name: 'Eggs (10)', min: 2.5, max: 3.5, unit: 'pack' },
    ],
  },
  {
    id: 'eating-out',
    title: 'Eating out & drinks',
    icon: 'UtensilsCrossed',
    items: [
      { name: 'Döner / falafel', min: 7, max: 9, unit: 'meal', note: 'The student staple.' },
      { name: 'Pizza in a restaurant', min: 9, max: 14, unit: 'meal' },
      { name: 'Restaurant main course', min: 13, max: 22, unit: 'meal' },
      { name: 'Shawarma plate', min: 10, max: 15, unit: 'meal', note: 'Arabic restaurants in bigger cities.' },
      { name: 'Coffee / cappuccino', min: 2.5, max: 4.5, unit: 'cup', note: 'Cheaper in the Mensa café.' },
      { name: 'Soft drink / juice in a café', min: 3, max: 4.5, unit: 'glass' },
      { name: 'Water bottle (supermarket)', min: 0.3, max: 0.8, unit: 'bottle', note: 'Plus a small deposit you get back. Tap water is safe to drink.' },
      { name: 'Ice cream scoop', min: 1.8, max: 2.5, unit: 'scoop' },
    ],
  },
  {
    id: 'transport',
    title: 'Transport',
    icon: 'TrainFront',
    items: [
      { name: 'Regional trains & buses, all Germany', min: 0, max: 0, unit: 'extra', fixed: true, note: 'The Deutschlandsemesterticket is part of the semester fee at almost every host university: €226.80 a semester (€37.80 a month) from winter 2026/27.' },
      { name: 'Deutschlandticket (no semester ticket)', min: 63, max: 63, unit: 'month', fixed: true, note: 'Only if your university has no semester ticket. Monthly subscription, cancel any month.' },
      { name: 'My BahnCard 25 (under 27)', min: 39.9, max: 39.9, unit: 'year', fixed: true, note: '25% off ICE and IC tickets, 2nd class. Cancel at least 6 weeks before the year ends, or it renews.' },
      { name: 'ICE / IC long-distance train', min: 18, max: 80, unit: 'trip', fixed: true, note: 'Book early for Sparpreis tickets.' },
      { name: 'FlixBus to big cities', min: 10, max: 35, unit: 'trip', fixed: true },
      { name: 'Used bike', min: 80, max: 200, unit: 'once', note: 'Kleinanzeigen or university bike markets. Buy a good lock.' },
      { name: 'E-scooter ride', min: 3, max: 6, unit: 'ride', note: 'Lime, Tier and Voi in bigger cities.' },
      { name: 'Taxi (5 km)', min: 15, max: 22, unit: 'ride' },
      { name: 'Flight to Amman (return)', min: 220, max: 480, unit: 'return', fixed: true, note: 'From Frankfurt, Berlin or Munich. Book 2–3 months ahead.' },
    ],
  },
  {
    id: 'services',
    title: 'Services & phone',
    icon: 'Smartphone',
    items: [
      { name: 'Prepaid SIM with data', min: 8, max: 15, unit: 'month', fixed: true, note: 'Aldi Talk, Lidl Connect, Congstar, Fraenk.' },
      { name: 'Bank account', min: 0, max: 6, unit: 'month', fixed: true, note: 'Online banks (N26, DKB, C24) are usually free.' },
      { name: 'Haircut', min: 15, max: 25, unit: 'cut', note: 'Barbers are often cheaper.' },
      { name: 'Laundry (dorm machine)', min: 1.5, max: 3, unit: 'wash' },
      { name: 'Printing (per page)', min: 0.05, max: 0.1, unit: 'page', fixed: true, note: 'University printers with your student card.' },
      { name: 'Doctor visit', min: 0, max: 0, unit: 'visit', fixed: true, note: 'Covered by public health insurance. Bring your card.' },
      { name: 'Prescription medicine', min: 5, max: 10, unit: 'item', fixed: true, note: 'Co-payment set by law: 10% of the price, at least €5 and at most €10 per item.' },
    ],
  },
  {
    id: 'fitness',
    title: 'Gyms & sport',
    icon: 'Dumbbell',
    items: [
      { name: 'University sports courses', min: 0, max: 30, unit: 'semester', fixed: true, note: 'Football, volleyball, climbing, fitness: often free or almost free.' },
      { name: 'Budget gym (McFit, FitX, clever fit)', min: 20, max: 35, unit: 'month', note: 'Check the contract length and sign-up fee.' },
      { name: 'Public swimming pool', min: 3, max: 6, unit: 'entry', note: 'Student discount with ID.' },
      { name: 'Climbing / bouldering hall', min: 10, max: 15, unit: 'entry' },
      { name: 'Football boots / sports gear', min: 30, max: 80, unit: 'once', note: 'Decathlon is the budget choice.' },
    ],
  },
  {
    id: 'fun',
    title: 'Fun & activities',
    icon: 'Ticket',
    items: [
      { name: 'Cinema', min: 8, max: 13, unit: 'ticket', note: 'Cheaper on discount days (often Tue or Wed).' },
      { name: 'Museum', min: 4, max: 10, unit: 'entry', note: 'Student prices with ID; many museums are free on certain days.' },
      { name: 'Castle / palace visit', min: 5, max: 15, unit: 'entry' },
      { name: 'Bundesliga football ticket', min: 15, max: 45, unit: 'ticket', note: 'Standing tickets are cheapest. Book early.' },
      { name: 'Escape room / bowling', min: 12, max: 25, unit: 'person' },
      { name: 'Student party entry', min: 3, max: 10, unit: 'entry' },
      { name: 'Christmas market snack', min: 3, max: 6, unit: 'item', note: 'Roasted almonds, crêpes, children\'s punch.' },
      { name: 'Weekend trip (hostel + food)', min: 60, max: 150, unit: 'trip', note: 'Travel is free on regional trains with your ticket.' },
    ],
  },
  {
    id: 'seasonal',
    title: 'Clothes & seasonal',
    icon: 'Snowflake',
    items: [
      { name: 'Winter jacket', min: 60, max: 150, unit: 'once', note: 'You will need it from November to March.' },
      { name: 'Winter boots', min: 40, max: 100, unit: 'once', note: 'Waterproof. Snow and slush are common.' },
      { name: 'Rain jacket / umbrella', min: 15, max: 60, unit: 'once' },
      { name: 'Toiletries & drugstore', min: 25, max: 40, unit: 'month', note: 'dm and Rossmann.' },
    ],
  },
]

// Fixed monthly costs used by the budget planner. `exact` items are official
// 2026 rates; the rest are estimates.
export const fixedMonthly = [
  { name: 'Health insurance', amount: 141.16, exact: true },
  { name: 'Semester fee ÷ 6', amount: 55.3, exact: true },
  { name: 'Phone', amount: 12 },
  { name: 'Broadcast fee ÷ 3', amount: 6.12, exact: true },
  { name: 'Toiletries', amount: 35 },
]

// Rounded to whole euros for the planner's totals.
export const fixedTotal = Math.round(fixedMonthly.reduce((s, f) => s + f.amount, 0))

export const lifestyles = {
  saver: { label: 'Saver', text: 'Cook almost always, rare trips, low going out', food: 170, trips: 20, fun: 30 },
  typical: { label: 'Typical', text: 'Cook + Mensa, trips twice a month', food: 230, trips: 60, fun: 70 },
  comfort: { label: 'Comfort', text: 'Eat out often, every weekend + ICE', food: 320, trips: 140, fun: 130 },
}

export const fmt = (n) =>
  n % 1 === 0 ? `€${n.toLocaleString('en-US')}` : `€${n.toFixed(2)}`

export const fmtRange = (min, max) => (min === max ? fmt(min) : `${fmt(min)}–${fmt(max).slice(1)}`)

// Round a scaled price to something a human would write.
export function scale(value, factor, fixed) {
  if (fixed || value === 0) return value
  const v = value * factor
  if (v < 3) return Math.round(v * 10) / 10
  if (v < 30) return Math.round(v * 2) / 2
  return Math.round(v / 5) * 5
}
