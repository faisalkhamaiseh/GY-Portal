// Budget travel: border trips on the Deutschlandticket, weekend plans under
// €50, travel apps and the cheapest times to buy things.

export const borderTrips = [
  { from: 'Baden-Württemberg', to: 'Switzerland', place: 'Konstanz → Kreuzlingen', how: 'Ride regional trains to Konstanz, then walk across the border into Kreuzlingen.', extra: 'Walk across: €0' },
  { from: 'Baden-Württemberg', to: 'Switzerland', place: 'Basel Badischer Bahnhof', how: 'German regional trains run to Basel Bad Bf, a German-operated station inside Basel. From there, walk or take the tram into the old town.', extra: 'Swiss tram ticket if you ride' },
  { from: 'Baden-Württemberg', to: 'France', place: 'Kehl → Strasbourg', how: 'Ride to Kehl, then take tram D across the Rhine into Strasbourg.', extra: 'Strasbourg tram ticket, a few euros' },
  { from: 'Bavaria', to: 'Austria', place: 'Lindau → Bregenz', how: 'Ride to Lindau on Lake Constance; Bregenz is a short local train or bus away.', extra: 'Short Austrian ticket' },
  { from: 'Bavaria', to: 'Austria', place: 'Freilassing → Salzburg', how: 'Regional trains from Munich via Rosenheim reach Freilassing on the border, minutes from Salzburg. Some trains continue into Salzburg; check ticket validity in DB Navigator.', extra: 'Check validity' },
  { from: 'North Rhine-Westphalia', to: 'Netherlands', place: 'Aachen → Vaals', how: 'Ride to Aachen, then take a local bus to Vaals and the three-country point (Germany, Netherlands, Belgium).', extra: 'Local bus' },
  { from: 'North Rhine-Westphalia', to: 'Netherlands', place: 'Gronau → Enschede', how: 'Regional trains from Münster reach Gronau on the border; Enschede is the next stop.', extra: 'Check validity' },
  { from: 'Saxony', to: 'Poland', place: 'Görlitz → Zgorzelec', how: 'Ride to Görlitz and walk across the bridge over the Neisse to Zgorzelec.', extra: 'Walk across: €0' },
  { from: 'Brandenburg', to: 'Poland', place: 'Frankfurt (Oder) → Słubice', how: 'Ride from Berlin to Frankfurt (Oder) and walk across the bridge to Słubice. Lunch in Poland is cheap.', extra: 'Walk across: €0' },
  { from: 'Saxony', to: 'Czechia', place: 'Bad Schandau → Děčín', how: 'Regional trains through Saxon Switzerland reach Bad Schandau; Czech trains continue along the Elbe to Děčín.', extra: 'Czech ticket' },
]

export const borderNote = 'The Deutschlandticket is valid in Germany. A few cross-border regional routes accept it; on all others you need a small local ticket from the border. Always carry your passport and residence permit.'

export const weekendPlans = [
  { title: 'Lake Constance & Switzerland', region: 'Baden-Württemberg, Bavaria', budget: 25, items: [['Regional trains', 0], ['Lunch picnic from Lidl', 8], ['Swiss chocolate in Kreuzlingen', 5], ['Ice cream on the lake', 3], ['Spare', 9]], text: 'Walk the Konstanz harbour, cross into Switzerland on foot, and end with sunset on the lake.' },
  { title: 'Rhine castles by train', region: 'Rhineland-Palatinate, Hesse', budget: 30, items: [['Regional train Bingen–Koblenz', 0], ['Castle entry (student)', 8], ['Lunch', 12], ['Snacks', 5], ['Spare', 5]], text: 'Sit on the Rhine side of the train, stop at the Loreley, and climb to a castle above St. Goar.' },
  { title: 'Görlitz & Poland', region: 'Saxony, Brandenburg', budget: 25, items: [['Regional trains', 0], ['Polish lunch in Zgorzelec', 10], ['Coffee and cake', 6], ['Spare', 9]], text: 'A perfect old town (the film set of The Grand Budapest Hotel), then lunch across the river in Poland.' },
  { title: 'Saxon Switzerland hike', region: 'Saxony', budget: 15, items: [['S-Bahn from Dresden', 0], ['Picnic', 8], ['Ferry across the Elbe', 2], ['Spare', 5]], text: 'Hike to the Bastei bridge and sandstone cliffs, all on your semester ticket.' },
  { title: 'Hamburg harbour weekend', region: 'North Germany', budget: 48, items: [['Regional trains', 0], ['Hostel bed, 1 night', 28], ['Fischbrötchen and food', 15], ['Ferry 62 harbour tour', 0], ['Spare', 5]], text: 'Free harbour tour on ferry line 62, Elbphilharmonie Plaza for free, and the Speicherstadt at night.' },
  { title: 'Berlin on a budget', region: 'East Germany', budget: 48, items: [['Regional trains', 0], ['Hostel bed, 1 night', 28], ['Food on Sonnenallee', 15], ['Reichstag dome (free)', 0], ['Spare', 5]], text: 'Brandenburg Gate, East Side Gallery, Tempelhofer Feld and the best Arabic food in Germany.' },
  { title: 'Aachen three-country point', region: 'North Rhine-Westphalia', budget: 20, items: [['Regional trains', 0], ['Local bus to Vaals', 3], ['Aachener Printen and lunch', 12], ['Spare', 5]], text: 'Stand in Germany, the Netherlands and Belgium at once, then visit Charlemagne\'s cathedral.' },
  { title: 'Christmas market tour', region: 'Anywhere, late Nov–Dec', budget: 30, items: [['Regional trains', 0], ['Food at the stalls', 15], ['Roasted almonds and crêpes', 8], ['Mug deposit (returned)', 0], ['Spare', 7]], text: 'Nuremberg, Erfurt, Dresden or Cologne. Go on a weekday evening to avoid crowds.' },
]

export const travelApps = [
  { name: 'FlixBus', text: 'Long-distance buses across Europe that are much cheaper when you book early. Overnight buses save a hotel night.', tips: ['Book 2–4 weeks ahead; prices rise as seats sell.', 'Seat reservations and extra bags cost extra.', 'Check the exact bus stop: in some cities it is far from the main station.'] },
  { name: 'BlaBlaCar', text: 'Shared car rides with drivers going your way. Often cheaper and faster than the bus.', tips: ['Choose drivers with many good reviews and a verified profile.', 'Message the driver before you book. A short hello in German helps.', 'Women-only rides are available on some routes.'] },
  { name: 'DB Navigator', text: 'Every train in Germany. Use "Nur Nahverkehr" (local transport only) to see trips that are free with your ticket.', tips: ['Sparpreis tickets for ICE are much cheaper when booked early.', 'A BahnCard 25 for under-27s pays off after a few trips.'] },
  { name: 'Google Flights & Skyscanner', text: 'Compare budget airlines from all nearby airports at once.', tips: ['Search "whole month" for the cheapest days.', 'Ryanair and Wizz Air prices are lowest with a small cabin bag only.'] },
]

export const saveMoney = [
  { when: 'Every evening', title: 'Too Good To Go', text: 'Rescue bakery, supermarket and restaurant food for a small price per "magic bag". Great for bread and pastries.' },
  { when: 'Every evening', title: '"Reduziert" stickers', text: 'Supermarkets mark down fresh food that expires soon, often by 30–50%, late in the day.' },
  { when: 'Every week', title: 'Supermarket flyers', text: 'Aldi, Lidl, Penny and Netto change their offers every week. The Marktguru and kaufDA apps collect them all.' },
  { when: 'After the holidays', title: 'Winter sales', text: 'Clothes, shoes and winter jackets at their cheapest. Buy next year\'s winter gear now.' },
  { when: 'Midsummer', title: 'Summer sales', text: 'Summer clothes and sports gear are heavily reduced.' },
  { when: 'Before the holidays', title: 'Black Friday & Cyber Week', text: 'Electronics, laptops and headphones. Compare prices first on Idealo or Check24.' },
  { when: 'Semester start & end', title: 'Leftovers from other students', text: 'Outgoing students sell furniture, bikes and kitchen kits cheaply on Kleinanzeigen at the end of every semester.' },
  { when: 'Weekends', title: 'Flea markets (Flohmarkt)', text: 'Cheap furniture, kitchenware and winter clothes. Look for "Flohmarkt" plus your city.' },
  { when: 'Anytime', title: 'Second-hand apps', text: 'Vinted for clothes, Kleinanzeigen for everything else. Meet in public places and pay on collection.' },
  { when: 'Anytime', title: 'Student discounts', text: 'Show your student card at museums, cinemas, theatres and swimming pools. Many software companies (Microsoft, Apple, Spotify) have student prices.' },
]
