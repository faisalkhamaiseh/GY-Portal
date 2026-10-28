// Hand-checked, city-level detail. Schmalkalden comes from the Schmalkalden
// Survival Book. Prices are always estimates; add more universities in the same shape.

export const localGuides = {
  schmalkalden: {
    photos: [
      { src: '/images/schmalkalden-altmarkt.jpg', alt: 'Altmarkt square with St. Georg church', credit: 'A.Savin, Wikimedia Commons, Free Art License' },
      { src: '/images/schmalkalden-campus.jpg', alt: 'Blechhammer campus from above, with the dorm behind the Mensa', credit: 'Maxl2003, Wikimedia Commons, CC BY 4.0' },
    ],
    facts: [
      { value: '~19,000', label: 'people in town, about 2,500 students' },
      { value: '5', label: 'faculties, every campus a few minutes\' walk apart' },
      { value: '€230–300', label: 'dorm room per month, bills included', estimate: true },
      { value: '~3.5 h', label: 'by train from Frankfurt Airport' },
    ],
    about:
      'A small university of applied sciences founded in 1991, with about 2,500 students in five faculties: Electrical Engineering, Computer Science, Mechanical Engineering, Business and Economics, and Business Law. Everything on campus is a few minutes\' walk apart.',
    dorms: [
      {
        name: 'Blechhammer 9b',
        where: 'On campus',
        price: 'about €230–300 / month',
        deposit: 'about €300',
        points: ['285 places, directly on campus behind the Mensa', 'Single rooms of 9–20 m² in 2- and 3-person flats; 10 single apartments of 19 m²', 'Furnished, fitted kitchen, own shower/WC per flat, LAN in every room', 'Washing machines, dryers, bike room; very few parking spaces'],
        url: 'https://www.stw-thueringen.de/en/housing/schmalkalden/blechhammer-9b.html',
      },
      {
        name: 'Martin-Luther-Ring 38',
        where: 'About 8 min walk',
        price: 'about €240–300 / month',
        deposit: 'about €300',
        points: ['258 places, close to the old town and shops', 'Single rooms of 11–20 m² in 3- and 4-person flats; 18 single apartments of 20 m²', 'Furnished, fitted kitchen, shower/WC, LAN in every room', 'Washing machines, dryer, bike room'],
        url: 'https://www.stw-thueringen.de/en/housing/schmalkalden/martin-luther-ring-38.html',
      },
    ],
    dormNote:
      'Rent includes water, electricity and heating. Internet is billed separately by the provider (Telesystems Thorwarth). Prices assume you stay at least one full semester; shorter stays cost more and are billed in whole months. Rental office: vermietung-schmalkalden@stw-thueringen.de',
    links: [
      { title: 'Dorm application form', text: 'Studierendenwerk Thüringen, online only', url: 'https://www.stw-thueringen.de/en/housing/application/' },
      { title: 'All Studierendenwerk dorms', text: 'Overview, room types, rules', url: 'https://www.stw-thueringen.de/en/housing/residential-homes.html' },
      { title: 'Living in Schmalkalden', text: 'The university\'s own housing page', url: 'https://www.hs-schmalkalden.de/en/students-information/living-in-schmalkalden' },
      { title: 'Wohnungsgenossenschaft Schmalkalden', text: 'Housing cooperative, flats across town', url: 'https://www.wgschmalkalden.de/' },
      { title: 'Wohnungsbau GmbH Schmalkalden', text: 'The town\'s own housing company', url: 'https://www.wobausm.de/' },
    ],
    uniLinks: [
      { title: 'Hochschule Schmalkalden', text: 'Main website in English', url: 'https://www.hs-schmalkalden.de/en/' },
      { title: 'International Office', text: 'Orientation, buddy programme, permits', url: 'https://www.hs-schmalkalden.de/en/international' },
      { title: 'Mensa', text: 'Menus and opening hours', url: 'https://www.hs-schmalkalden.de/en/university/campus/mensa' },
      { title: 'Paying the semester fee', text: 'Amounts, deadlines, bank details', url: 'https://www.hs-schmalkalden.de/en/university/organization/departments/dep-1-studies-and-international-relatations/student-administration/payment-semester-fee' },
      { title: 'Semester fee breakdown', text: 'Studierendenwerk Thüringen', url: 'https://www.stw-thueringen.de/finanzen/semesterbeitrag/beitragshoehe.html' },
      { title: 'Town of Schmalkalden', text: 'Bürgerbüro appointments, events, tourist information', url: 'https://www.schmalkalden.de/' },
      { title: 'Museum Schloss Wilhelmsburg', text: 'Opening hours and tickets', url: 'https://www.museumwilhelmsburg.de/' },
      { title: 'Campus on Google Maps', text: 'Blechhammer, 98574 Schmalkalden', url: 'https://www.google.com/maps/place/Hochschule+Schmalkalden/@50.717416,10.463766,15z' },
    ],
    campus: [
      { kind: 'Eat', title: 'Mensa', text: 'Run by the Studierendenwerk. Several dishes daily, with vegetarian options. Pay with your thoska card for the student price.' },
      { kind: 'Your card', title: 'thoska', text: 'Student ID, Mensa wallet, library card, printing, and proof of your semester ticket. Top it up at the machines in the Mensa.' },
      { kind: 'Help', title: 'International Office', text: 'Your first stop for orientation, the buddy programme, residence-permit questions and learning agreements.' },
      { kind: 'Study', title: 'Library', text: 'On campus, with group rooms and long opening hours in exam season.' },
      { kind: 'Social', title: 'Student council and club', text: 'The StuRa runs events, and the student club holds weekly themed parties. Join the Schmalympics, the summer games between faculties.' },
      { kind: 'Move', title: 'University sports', text: 'Football, volleyball, climbing, fitness and more, mostly free. A public swimming pool is next to campus.' },
    ],
    arrival: [
      'About 3–4 hours by train from Frankfurt Airport, usually changing in Eisenach and Wernshausen, or via Erfurt and Zella-Mehlis.',
      'Get off at Schmalkalden Fachhochschule for the campus and the Blechhammer dorm; the stop is under a minute\'s walk away.',
      'Use Schmalkalden station for the old town and Martin-Luther-Ring.',
      'Try to arrive on a weekday before 18:00 so you can collect your keys.',
    ],
    trips: [
      ['Meiningen', '~45 min', 'Famous theatre, castle, shopping'],
      ['Eisenach', '~1 h', 'Wartburg castle (UNESCO), Bach and Luther houses'],
      ['Suhl / Zella-Mehlis', '~40 min', 'Shopping centre, swimming, cinema'],
      ['Erfurt', '~1.5–2 h', 'Thuringia\'s capital, Krämerbrücke, IKEA, Arabic grocery shops, mosque'],
      ['Würzburg', '~2.5 h', 'Residenz palace, the Main river'],
      ['Frankfurt', '~3 h', 'Big city, airport, large Arab community'],
      ['Leipzig / Berlin', '3–5 h', 'Weekend city breaks (faster by ICE)'],
    ],
    sights: [
      { kind: 'Old town', title: 'Altmarkt', text: 'The main square with the town hall, the Gothic church of St. Georg and the Christmas market in December.' },
      { kind: 'Castle', title: 'Schloss Wilhelmsburg', text: 'A Renaissance palace above the town, with a museum and one of Germany\'s oldest playable organs.' },
      { kind: 'History', title: 'Lutherhaus & Hessenhof', text: 'Where Luther stayed in 1537, and the oldest secular wall paintings in Germany (Iwein frescoes).' },
      { kind: 'Sweet', title: 'Viba Nougat-Welt', text: 'The local nougat factory, with a shop and café.' },
      { kind: 'Hike', title: 'Rennsteig & Inselsberg', text: 'The Großer Inselsberg (916 m) has wide views. Trusetal has a waterfall.' },
      { kind: 'Winter', title: 'Oberhof', text: 'Sledging, skiing and biathlon events a short trip away.' },
    ],
  },
}
