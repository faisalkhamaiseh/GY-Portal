// The numbers behind every price on the site, shared by both languages; the
// language files (src/data/costs.js, src/en/data/costs.js) add the words.
// Fixed official costs are exact 2026 rates. Everyday prices are realistic
// student ranges, built from German averages and scaled by a city's price tier.

// Monthly blocked-account payout for study visas in 2026 (€11,904 a year).
export const BLOCKED_MONTHLY = 992

// Rent per city tier: [min, max] a month, warm (bills included). `factor`
// scales everyday prices.
const tierRents = {
  1: { dorm: [320, 480], wg: [650, 850], flat: [950, 1350], factor: 1.2 },
  2: { dorm: [290, 420], wg: [520, 700], flat: [750, 1100], factor: 1.1 },
  3: { dorm: [260, 380], wg: [420, 560], flat: [600, 850], factor: 1.0 },
  4: { dorm: [240, 340], wg: [340, 460], flat: [480, 700], factor: 0.95 },
  5: { dorm: [220, 310], wg: [260, 380], flat: [360, 540], factor: 0.9 },
}

// City → tier. Anything missing falls back to tier 4.
export const cityTier = {
  'München': 1, Berlin: 2, Hamburg: 2, 'Frankfurt am Main': 2, Stuttgart: 2, 'Köln': 2, Darmstadt: 2, Wiesbaden: 2,
  Mainz: 2, Heidelberg: 2, Potsdam: 2, Mannheim: 3, Karlsruhe: 3, 'Nürnberg': 3, Augsburg: 3, Regensburg: 3,
  Ingolstadt: 3, 'Würzburg': 3, Rosenheim: 3, Hannover: 3, Bremen: 3, Aachen: 3, 'Münster': 3, Bochum: 3, Dortmund: 3,
  Ulm: 3, 'Neu-Ulm': 3, Reutlingen: 3, 'Göttingen': 3, Marburg: 3, Giessen: 3, Leipzig: 3, Dresden: 3, 'Lübeck': 3,
  Jena: 3, 'Sankt Augustin': 3, 'Rüsselsheim am Main': 3, Dieburg: 3, Heilbronn: 3, Landshut: 3, Kempten: 3,
  Bielefeld: 3, Krefeld: 3, Oldenburg: 3, 'Osnabrück': 3, Kaiserslautern: 4, Trier: 4, Koblenz: 4, Worms: 4,
  Bingen: 4, Remagen: 4, 'Saarbrücken': 4, Kassel: 4, Fulda: 4, Wuppertal: 4, Siegen: 4, Hamm: 4, Lippstadt: 4,
  Gummersbach: 4, Detmold: 4, Lemgo: 4, 'Höxter': 5, Erfurt: 4, Weimar: 4, Flensburg: 4, Aalen: 4, Biberach: 4,
  Albstadt: 5, Sigmaringen: 5, 'Nürtingen': 4, Offenburg: 4, 'Villingen-Schwenningen': 4, Heidenheim: 4,
  'Bad Mergentheim': 4, Amberg: 5, Weiden: 5, Bayreuth: 4, Coburg: 4, Schweinfurt: 4, Aschaffenburg: 4, Deggendorf: 4,
  'Wolfenbüttel': 4, Emden: 5, Wilhelmshaven: 5, Bremerhaven: 5, Germersheim: 4, 'Hoppstädten-Weiersbach': 5,
  Wildau: 4, 'Brandenburg an der Havel': 5, Cottbus: 5, Magdeburg: 5, Stendal: 5, Merseburg: 5, Dessau: 5,
  'Köthen': 5, Wernigerode: 5, Chemnitz: 5, Zwickau: 5, Freiberg: 5, Mittweida: 5, Ilmenau: 5, Nordhausen: 5,
  Schmalkalden: 5, Neubrandenburg: 5, Stralsund: 5,
}

// Verified local overrides (from the Schmalkalden survival book).
export const cityOverrides = {
  Schmalkalden: { dorm: [231, 300], wg: [230, 350], flat: [320, 480] },
}

// Everyday prices by group: [group, icon, items], each item [id, min, max,
// unit, fixed]. Fixed prices are the same everywhere in Germany; the others
// are scaled by the city's tier factor.
const prices = [
  ['fees', 'FileText', [
    ['semester-fee', 280, 420, 'semester', true],
    ['blocked-account-payout', 992, 992, 'month', true],
    ['public-health-insurance', 141.16, 141.16, 'month', true],
    ['visa', 75, 75, 'once', true],
    ['residence-permit', 100, 100, 'once', true],
    ['broadcast-fee', 18.36, 18.36, 'month', true],
    ['biometric-photos', 10, 15, 'once'],
  ]],
  ['housing', 'Home', [
    ['deposit', 300, 1500, 'once', true],
    ['home-internet', 10, 30, 'month'],
    ['furniture-kitchen-basics', 50, 200, 'once'],
    ['bedding-towels', 40, 80, 'once'],
    ['household-liability-insurance', 3, 6, 'month'],
  ]],
  ['food', 'ShoppingBasket', [
    ['groceries', 150, 230, 'month'],
    ['mensa-main-meal', 2.5, 4.8, 'meal'],
    ['bread-rolls', 0.4, 0.8, 'piece'],
    ['halal-chicken', 7, 11, 'kg'],
    ['rice', 1.5, 3, 'kg'],
    ['hummus-tahini-jar', 2, 4, 'jar'],
    ['milk', 1, 1.3, 'litre'],
    ['eggs', 2.5, 3.5, 'pack'],
  ]],
  ['eating-out', 'UtensilsCrossed', [
    ['d-ner-falafel', 7, 9, 'meal'],
    ['pizza-in-a-restaurant', 9, 14, 'meal'],
    ['restaurant-main-course', 13, 22, 'meal'],
    ['shawarma-plate', 10, 15, 'meal'],
    ['coffee-cappuccino', 2.5, 4.5, 'cup'],
    ['soft-drink-juice-in-a-caf', 3, 4.5, 'glass'],
    ['water-bottle', 0.3, 0.8, 'bottle'],
    ['ice-cream-scoop', 1.8, 2.5, 'scoop'],
  ]],
  ['transport', 'TrainFront', [
    ['regional-trains-buses-all-germany', 0, 0, 'extra', true],
    ['deutschlandticket', 63, 63, 'month', true],
    ['my-bahncard-25', 39.9, 39.9, 'year', true],
    ['ice-ic-long-distance-train', 18, 80, 'trip', true],
    ['flixbus-to-big-cities', 10, 35, 'trip', true],
    ['used-bike', 80, 200, 'once'],
    ['e-scooter-ride', 3, 6, 'ride'],
    ['taxi', 15, 22, 'ride'],
    ['flight-to-amman', 220, 480, 'return', true],
  ]],
  ['services', 'Smartphone', [
    ['prepaid-sim-with-data', 8, 15, 'month', true],
    ['bank-account', 0, 6, 'month', true],
    ['haircut', 15, 25, 'cut'],
    ['laundry', 1.5, 3, 'wash'],
    ['printing', 0.05, 0.1, 'page', true],
    ['doctor-visit', 0, 0, 'visit', true],
    ['prescription-medicine', 5, 10, 'item', true],
  ]],
  ['fitness', 'Dumbbell', [
    ['university-sports-courses', 0, 30, 'semester', true],
    ['budget-gym', 20, 35, 'month'],
    ['public-swimming-pool', 3, 6, 'entry'],
    ['climbing-bouldering-hall', 10, 15, 'entry'],
    ['football-boots-sports-gear', 30, 80, 'once'],
  ]],
  ['fun', 'Ticket', [
    ['cinema', 8, 13, 'ticket'],
    ['museum', 4, 10, 'entry'],
    ['castle-palace-visit', 5, 15, 'entry'],
    ['bundesliga-football-ticket', 15, 45, 'ticket'],
    ['escape-room-bowling', 12, 25, 'person'],
    ['student-party-entry', 3, 10, 'entry'],
    ['christmas-market-snack', 3, 6, 'item'],
    ['weekend-trip', 60, 150, 'trip'],
  ]],
  ['seasonal', 'Snowflake', [
    ['winter-jacket', 60, 150, 'once'],
    ['winter-boots', 40, 100, 'once'],
    ['rain-jacket-umbrella', 15, 60, 'once'],
    ['toiletries-drugstore', 25, 40, 'month'],
  ]],
]

// Fixed monthly costs in the budget planner. `exact` amounts are official
// 2026 rates; the rest are estimates.
const fixedAmounts = [
  ['health', 141.16, true],
  ['semester', 55.3, true],
  ['phone', 12],
  ['broadcast', 6.12, true],
  ['toiletries', 35],
]

// Rounded to whole euros for the planner's totals.
export const fixedTotal = Math.round(fixedAmounts.reduce((s, [, amount]) => s + amount, 0))

const lifestyleBudgets = {
  saver: { food: 170, trips: 20, fun: 30 },
  typical: { food: 230, trips: 60, fun: 70 },
  comfort: { food: 320, trips: 140, fun: 130 },
}

export const fmt = (n) => (n % 1 === 0 ? `€${n.toLocaleString('en-US')}` : `€${n.toFixed(2)}`)

// Round a scaled price to something a human would write.
export function scale(value, factor, fixed) {
  if (fixed || value === 0) return value
  const v = value * factor
  if (v < 3) return Math.round(v * 10) / 10
  if (v < 30) return Math.round(v * 2) / 2
  return Math.round(v / 5) * 5
}

// The language files call these with their words, keyed like the numbers above.
export const tiersWith = (words) =>
  Object.fromEntries(Object.entries(tierRents).map(([k, rents]) => [k, { label: words[k][0], note: words[k][1], ...rents }]))

export function rentForTiers(tiers, city) {
  const tier = tiers[cityTier[city] ?? 4]
  return { ...tier, ...(cityOverrides[city] || {}), tier: cityTier[city] ?? 4 }
}

export const priceGroupsWith = (titles, words) =>
  prices.map(([id, icon, items]) => ({
    id,
    title: titles[id],
    icon,
    items: items.map(([item, min, max, unit, fixed]) => {
      const [name, note] = words[item]
      return { name, min, max, unit, ...(fixed && { fixed }), ...(note && { note }) }
    }),
  }))

export const fixedMonthlyWith = (names) => fixedAmounts.map(([id, amount, exact]) => ({ name: names[id], amount, ...(exact && { exact }) }))

export const lifestylesWith = (words) =>
  Object.fromEntries(Object.entries(lifestyleBudgets).map(([k, budget]) => [k, { label: words[k][0], text: words[k][1], ...budget }]))
