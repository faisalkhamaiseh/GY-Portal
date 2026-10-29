// The words for the cost model in English. The numbers live once, for both
// languages, in src/lib/costModel.js.
import { BLOCKED_MONTHLY, cityTier, cityOverrides, fixedTotal, fmt, scale, tiersWith, rentForTiers, priceGroupsWith, fixedMonthlyWith, lifestylesWith } from '../../lib/costModel.js'

export { BLOCKED_MONTHLY, cityTier, cityOverrides, fixedTotal, fmt, scale }

export const tiers = tiersWith({
  1: ['Very expensive', 'Munich'],
  2: ['Expensive', 'Big western cities'],
  3: ['Above average', 'Larger university cities'],
  4: ['Average', 'Mid-sized towns'],
  5: ['Affordable', 'Small towns and the east'],
})

export const rentFor = (city) => rentForTiers(tiers, city)

export const priceGroups = priceGroupsWith(
  {
    fees: 'Fees & paperwork',
    housing: 'Housing extras',
    food: 'Food & groceries',
    'eating-out': 'Eating out & drinks',
    transport: 'Transport',
    services: 'Services & phone',
    fitness: 'Gyms & sport',
    fun: 'Fun & activities',
    seasonal: 'Clothes & seasonal',
  },
  {
    'semester-fee': ['Semester fee', 'Set by each university and includes the €226.80 Deutschlandsemesterticket. Hochschule Schmalkalden: €331.80 for winter 2026/27.'],
    'blocked-account-payout': ['Blocked account payout', 'Official 2026 amount for study visas: €11,904 for 12 months. Providers charge a one-off fee.'],
    'public-health-insurance': ['Public health insurance', 'TK student rate for 2026, under 23. From 23 without children: €146.29. Other public insurers differ by a few euros.'],
    'visa': ['Visa (national D visa)', 'Paid at the German embassy in Amman.'],
    'residence-permit': ['Residence permit', 'First permit at the immigration office (Ausländerbehörde). Extending it by more than 3 months costs €93.'],
    'broadcast-fee': ['Broadcast fee (Rundfunkbeitrag)', 'Per flat, split among flatmates: €6.12 each with three.'],
    'biometric-photos': ['Biometric photos', 'Photo booth or drugstore (dm, Rossmann).'],
    'deposit': ['Deposit (Kaution)', 'Dorms usually a few hundred euros; private flats up to 3 months of cold rent.'],
    'home-internet': ['Home internet', 'Dorm LAN is sometimes extra, or split a WG contract.'],
    'furniture-kitchen-basics': ['Furniture & kitchen basics', 'Kleinanzeigen, IKEA, leftovers from outgoing students.'],
    'bedding-towels': ['Bedding & towels', 'IKEA, Primark, TK Maxx.'],
    'household-liability-insurance': ['Household liability insurance', 'Haftpflicht: cheap and strongly recommended.'],
    'groceries': ['Groceries', 'Cooking at home, shopping at Aldi, Lidl, Netto, Penny and Kaufland.'],
    'mensa-main-meal': ['Mensa main meal', 'Student price with your student card.'],
    'bread-rolls': ['Bread rolls (Brötchen)', 'Supermarket rolls are cheaper than bakery ones.'],
    'halal-chicken': ['Halal chicken (1 kg)', 'Turkish or Arabic supermarkets.'],
    'rice': ['Rice (1 kg)', 'Basmati costs more.'],
    'hummus-tahini-jar': ['Hummus / tahini jar', 'Arabic shops and big supermarkets.'],
    'milk': ['Milk (1 L)'],
    'eggs': ['Eggs (10)'],
    'd-ner-falafel': ['Döner / falafel', 'The student staple.'],
    'pizza-in-a-restaurant': ['Pizza in a restaurant'],
    'restaurant-main-course': ['Restaurant main course'],
    'shawarma-plate': ['Shawarma plate', 'Arabic restaurants in bigger cities.'],
    'coffee-cappuccino': ['Coffee / cappuccino', 'Cheaper in the Mensa café.'],
    'soft-drink-juice-in-a-caf': ['Soft drink / juice in a café'],
    'water-bottle': ['Water bottle (supermarket)', 'Plus a small deposit you get back. Tap water is safe to drink.'],
    'ice-cream-scoop': ['Ice cream scoop'],
    'regional-trains-buses-all-germany': ['Regional trains & buses, all Germany', 'The Deutschlandsemesterticket is part of the semester fee at almost every host university: €226.80 a semester (€37.80 a month) from winter 2026/27.'],
    'deutschlandticket': ['Deutschlandticket (no semester ticket)', 'Only if your university has no semester ticket. Monthly subscription, cancel any month.'],
    'my-bahncard-25': ['My BahnCard 25 (under 27)', '25% off ICE and IC tickets, 2nd class. Cancel at least 6 weeks before the year ends, or it renews.'],
    'ice-ic-long-distance-train': ['ICE / IC long-distance train', 'Book early for Sparpreis tickets.'],
    'flixbus-to-big-cities': ['FlixBus to big cities'],
    'used-bike': ['Used bike', 'Kleinanzeigen or university bike markets. Buy a good lock.'],
    'e-scooter-ride': ['E-scooter ride', 'Lime, Tier and Voi in bigger cities.'],
    'taxi': ['Taxi (5 km)'],
    'flight-to-amman': ['Flight to Amman (return)', 'From Frankfurt, Berlin or Munich. Book 2–3 months ahead.'],
    'prepaid-sim-with-data': ['Prepaid SIM with data', 'Aldi Talk, Lidl Connect, Congstar, Fraenk.'],
    'bank-account': ['Bank account', 'Online banks (N26, DKB, C24) are usually free.'],
    'haircut': ['Haircut', 'Barbers are often cheaper.'],
    'laundry': ['Laundry (dorm machine)'],
    'printing': ['Printing (per page)', 'University printers with your student card.'],
    'doctor-visit': ['Doctor visit', 'Covered by public health insurance. Bring your card.'],
    'prescription-medicine': ['Prescription medicine', 'Co-payment set by law: 10% of the price, at least €5 and at most €10 per item.'],
    'university-sports-courses': ['University sports courses', 'Football, volleyball, climbing, fitness: often free or almost free.'],
    'budget-gym': ['Budget gym (McFit, FitX, clever fit)', 'Check the contract length and sign-up fee.'],
    'public-swimming-pool': ['Public swimming pool', 'Student discount with ID.'],
    'climbing-bouldering-hall': ['Climbing / bouldering hall'],
    'football-boots-sports-gear': ['Football boots / sports gear', 'Decathlon is the budget choice.'],
    'cinema': ['Cinema', 'Cheaper on discount days (often Tue or Wed).'],
    'museum': ['Museum', 'Student prices with ID; many museums are free on certain days.'],
    'castle-palace-visit': ['Castle / palace visit'],
    'bundesliga-football-ticket': ['Bundesliga football ticket', 'Standing tickets are cheapest. Book early.'],
    'escape-room-bowling': ['Escape room / bowling'],
    'student-party-entry': ['Student party entry'],
    'christmas-market-snack': ['Christmas market snack', 'Roasted almonds, crêpes, children\'s punch.'],
    'weekend-trip': ['Weekend trip (hostel + food)', 'Travel is free on regional trains with your ticket.'],
    'winter-jacket': ['Winter jacket', 'You will need it from November to March.'],
    'winter-boots': ['Winter boots', 'Waterproof. Snow and slush are common.'],
    'rain-jacket-umbrella': ['Rain jacket / umbrella'],
    'toiletries-drugstore': ['Toiletries & drugstore', 'dm and Rossmann.'],
  },
)

export const fixedMonthly = fixedMonthlyWith({
  health: 'Health insurance',
  semester: 'Semester fee ÷ 6',
  phone: 'Phone',
  broadcast: 'Broadcast fee ÷ 3',
  toiletries: 'Toiletries',
})

export const lifestyles = lifestylesWith({
  saver: ['Saver', 'Cook almost always, rare trips, low going out'],
  typical: ['Typical', 'Cook + Mensa, trips twice a month'],
  comfort: ['Comfort', 'Eat out often, every weekend + ICE'],
})
