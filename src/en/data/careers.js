// Internship hub data.
//
// `companies` lists large employers in each state that take interns
// (Pflichtpraktikanten) in the three GJU fields. Set `gju: true` on a company
// once the GJU German Year office or a past student confirms it hosted a GJU
// intern; the site then shows the "Hosted GJU interns" badge and lists it first.

export const fields = {
  engineering: { label: 'Engineering', short: 'ENG', tone: 'bg-[#e4ecf6] text-[#1d4f80]' },
  business: { label: 'Business', short: 'BUS', tone: 'bg-amber text-[#7a5410]' },
  cs: { label: 'Computer Science', short: 'CS', tone: 'bg-mint text-forest' },
}

const c = (name, city, field, text, gju = false) => ({ name, city, field, text, gju })

export const companies = {
  BW: [
    c('Bosch', 'Stuttgart / Gerlingen', 'engineering', 'Automotive, industrial tech and research campus in Renningen.'),
    c('Mercedes-Benz', 'Stuttgart', 'engineering', 'Car development and production around Stuttgart and Sindelfingen.'),
    c('Porsche', 'Stuttgart / Weissach', 'engineering', 'Sports-car R&D centre in Weissach.'),
    c('Carl Zeiss', 'Oberkochen (near Aalen)', 'engineering', 'Optics and semiconductor equipment.'),
    c('Voith', 'Heidenheim', 'engineering', 'Hydropower, paper machines and drive technology.'),
    c('Festo', 'Esslingen', 'engineering', 'Automation and pneumatics.'),
    c('Trumpf', 'Ditzingen', 'engineering', 'Machine tools and industrial lasers.'),
    c('Schwarz Group (Lidl, Kaufland)', 'Neckarsulm (near Heilbronn)', 'business', 'Retail, logistics and purchasing.'),
    c('Würth', 'Künzelsau', 'business', 'Global trade in assembly and fastening products.'),
    c('dm-drogerie markt', 'Karlsruhe', 'business', 'Retail, marketing and supply chain.'),
    c('EnBW', 'Karlsruhe', 'business', 'Energy company: controlling, projects and trading.'),
    c('SAP', 'Walldorf', 'cs', 'Europe\'s largest software company, with a huge intern programme.'),
    c('Schwarz Digits / STACKIT', 'Neckarsulm', 'cs', 'Cloud, IT and cyber security for the Schwarz Group.'),
    c('IBM R&D Germany', 'Böblingen', 'cs', 'Mainframe, cloud and AI development lab.'),
    c('Vector Informatik', 'Stuttgart', 'cs', 'Software and tools for automotive electronics.'),
  ],
  BY: [
    c('BMW Group', 'Munich, Dingolfing, Regensburg', 'engineering', 'Car development (FIZ Munich) and plants near Landshut and Regensburg.'),
    c('AUDI', 'Ingolstadt', 'engineering', 'Headquarters and main plant, next to TH Ingolstadt.'),
    c('Siemens', 'Munich, Erlangen, Amberg', 'engineering', 'The Amberg electronics plant is a showcase smart factory.'),
    c('Schaeffler', 'Herzogenaurach', 'engineering', 'Bearings, e-mobility and industrial drives.'),
    c('Continental', 'Regensburg', 'engineering', 'Automotive electronics and software.'),
    c('Krones', 'Neutraubling (Regensburg)', 'engineering', 'Filling and packaging machines.'),
    c('ZF & SKF', 'Schweinfurt', 'engineering', 'Drivetrain and bearing plants next to THWS Schweinfurt.'),
    c('Brose', 'Coburg', 'engineering', 'Automotive mechatronics supplier.'),
    c('adidas & PUMA', 'Herzogenaurach', 'business', 'Global sports brands: marketing, sourcing, digital.'),
    c('Allianz & Munich Re', 'Munich', 'business', 'Insurance, finance and risk.'),
    c('Siemens Healthineers', 'Erlangen', 'business', 'Medical technology, with business and engineering roles.'),
    c('Infineon', 'Neubiberg (Munich), Regensburg', 'cs', 'Semiconductors, embedded software and chip design.'),
    c('DATEV', 'Nuremberg', 'cs', 'Software for tax advisers and accounting.'),
    c('Celonis', 'Munich', 'cs', 'Process-mining software.'),
    c('Rohde & Schwarz', 'Munich', 'cs', 'Test equipment, secure communications and software.'),
  ],
  BE: [
    c('Siemens Energy', 'Berlin', 'engineering', 'Gas turbine plant in Moabit.'),
    c('BMW Motorrad', 'Berlin-Spandau', 'engineering', 'Motorcycle production.'),
    c('Deutsche Bahn', 'Berlin', 'business', 'Germany\'s railway: projects, infrastructure and IT.'),
    c('Bayer Pharmaceuticals', 'Berlin', 'business', 'Pharma research and business functions.'),
    c('Zalando', 'Berlin', 'cs', 'E-commerce tech, data and product roles in English.'),
    c('Delivery Hero', 'Berlin', 'cs', 'Food delivery platform, English-speaking teams.'),
    c('N26 & Trade Republic', 'Berlin', 'cs', 'Fintech start-ups with English-speaking teams.'),
    c('HelloFresh', 'Berlin', 'business', 'Operations, supply chain and analytics.'),
  ],
  BB: [
    c('Tesla Gigafactory', 'Grünheide', 'engineering', 'Electric-car production east of Berlin.'),
    c('Rolls-Royce Deutschland', 'Dahlewitz', 'engineering', 'Aircraft engine development.'),
    c('Mercedes-Benz Ludwigsfelde', 'Ludwigsfelde', 'engineering', 'Van production plant.'),
    c('BASF Schwarzheide', 'Schwarzheide (near Cottbus)', 'engineering', 'Chemicals and battery materials.'),
    c('LEAG', 'Cottbus', 'business', 'Energy company in transition from coal to renewables.'),
    c('SAP & Hasso Plattner Institute', 'Potsdam', 'cs', 'Software research and development.'),
  ],
  HB: [
    c('Airbus', 'Bremen', 'engineering', 'Wing high-lift systems and space.'),
    c('OHB', 'Bremen', 'engineering', 'Satellites and space systems.'),
    c('Mercedes-Benz Bremen', 'Bremen', 'engineering', 'One of the largest car plants in the group.'),
    c('BLG Logistics', 'Bremen / Bremerhaven', 'business', 'Port and automotive logistics.'),
    c('Eurogate', 'Bremerhaven', 'business', 'Container terminals.'),
    c('Atlas Elektronik', 'Bremen', 'cs', 'Maritime electronics and software.'),
  ],
  HH: [
    c('Airbus', 'Hamburg-Finkenwerder', 'engineering', 'A320 family final assembly and cabin engineering.'),
    c('Lufthansa Technik', 'Hamburg', 'engineering', 'Aircraft maintenance and engineering.'),
    c('Hapag-Lloyd', 'Hamburg', 'business', 'One of the world\'s largest container shipping lines.'),
    c('Beiersdorf', 'Hamburg', 'business', 'NIVEA maker: marketing, supply chain, finance.'),
    c('Otto Group', 'Hamburg', 'business', 'E-commerce and retail group.'),
    c('Google Hamburg', 'Hamburg', 'cs', 'Sales and tech roles.'),
    c('New Work (XING)', 'Hamburg', 'cs', 'Professional networking platform.'),
  ],
  HE: [
    c('Opel (Stellantis)', 'Rüsselsheim', 'engineering', 'Engineering centre next to RheinMain University.'),
    c('Merck', 'Darmstadt', 'engineering', 'Science and technology: chemistry, electronics, health.'),
    c('Continental', 'Frankfurt', 'engineering', 'Automotive systems.'),
    c('Viessmann', 'Allendorf (Eder)', 'engineering', 'Heating and climate technology.'),
    c('B. Braun', 'Melsungen (near Kassel)', 'engineering', 'Medical devices.'),
    c('Volkswagen Kassel', 'Baunatal', 'engineering', 'Electric drive and components plant.'),
    c('Fraport', 'Frankfurt', 'business', 'Frankfurt Airport operator.'),
    c('Deutsche Bank, Commerzbank & DZ BANK', 'Frankfurt', 'business', 'Banking and finance.'),
    c('Deutsche Börse', 'Frankfurt / Eschborn', 'business', 'Stock exchange and market infrastructure.'),
    c('ESA ESOC', 'Darmstadt', 'cs', 'European Space Agency mission control.'),
    c('Software AG', 'Darmstadt', 'cs', 'Enterprise software.'),
  ],
  MV: [
    c('Nordex', 'Rostock', 'engineering', 'Wind turbines.'),
    c('Liebherr', 'Rostock', 'engineering', 'Maritime and offshore cranes.'),
    c('AIDA Cruises', 'Rostock', 'business', 'Cruise line headquarters.'),
  ],
  NI: [
    c('Volkswagen', 'Wolfsburg, Emden, Hanover, Salzgitter', 'engineering', 'Headquarters in Wolfsburg; the Emden plant is next to HS Emden/Leer.'),
    c('Continental', 'Hanover', 'engineering', 'Tyres and automotive technology.'),
    c('Enercon', 'Aurich (near Emden)', 'engineering', 'Wind turbines.'),
    c('Meyer Werft', 'Papenburg', 'engineering', 'Cruise-ship shipyard.'),
    c('Sartorius', 'Göttingen', 'engineering', 'Lab and bioprocess equipment.'),
    c('Ottobock', 'Duderstadt (near Göttingen)', 'engineering', 'Prosthetics and medical technology.'),
    c('TUI', 'Hanover', 'business', 'Tourism group.'),
    c('Hannover Re & Talanx', 'Hanover', 'business', 'Insurance and reinsurance.'),
  ],
  NW: [
    c('Ford', 'Cologne', 'engineering', 'European headquarters and EV plant.'),
    c('thyssenkrupp', 'Essen / Duisburg', 'engineering', 'Steel, materials and industrial engineering.'),
    c('Phoenix Contact', 'Blomberg (near Lemgo)', 'engineering', 'Electrical connection and automation technology.'),
    c('Miele', 'Gütersloh (near Bielefeld)', 'engineering', 'Household appliances.'),
    c('FORVIA HELLA', 'Lippstadt', 'engineering', 'Automotive lighting and electronics, next to HSHL.'),
    c('RWE & E.ON', 'Essen', 'engineering', 'Energy companies.'),
    c('Bayer', 'Leverkusen', 'business', 'Pharma and crop science.'),
    c('DHL Group', 'Bonn', 'business', 'Logistics, close to Sankt Augustin.'),
    c('REWE Group & ALDI', 'Cologne / Essen / Mülheim', 'business', 'Retail.'),
    c('Bertelsmann', 'Gütersloh', 'business', 'Media and services.'),
    c('Deutsche Telekom', 'Bonn', 'cs', 'Telecommunications and IT.'),
    c('adesso & Materna', 'Dortmund', 'cs', 'IT consulting and software.'),
    c('Vodafone Germany', 'Düsseldorf', 'cs', 'Telecommunications.'),
  ],
  RP: [
    c('BASF', 'Ludwigshafen', 'engineering', 'The world\'s largest chemical site.'),
    c('Boehringer Ingelheim', 'Ingelheim (near Bingen)', 'engineering', 'Pharmaceutical research and production.'),
    c('Daimler Truck', 'Wörth (near Germersheim)', 'engineering', 'The largest truck plant in the world.'),
    c('SCHOTT', 'Mainz', 'engineering', 'Specialty glass.'),
    c('BioNTech', 'Mainz', 'business', 'Biotechnology.'),
    c('IONOS', 'Montabaur', 'cs', 'Web hosting and cloud.'),
    c('DFKI & Fraunhofer', 'Kaiserslautern', 'cs', 'AI and software research institutes.'),
  ],
  SL: [
    c('ZF', 'Saarbrücken', 'engineering', 'Transmission plant.'),
    c('Bosch & Schaeffler', 'Homburg', 'engineering', 'Automotive components.'),
    c('Villeroy & Boch', 'Mettlach', 'business', 'Ceramics brand.'),
    c('Globus', 'St. Wendel', 'business', 'Retail chain.'),
    c('DFKI & CISPA', 'Saarbrücken', 'cs', 'AI and cyber-security research.'),
  ],
  SN: [
    c('Volkswagen Sachsen', 'Zwickau / Dresden', 'engineering', 'Electric-car production, next to WHZ Zwickau.'),
    c('BMW & Porsche', 'Leipzig', 'engineering', 'Car plants.'),
    c('Infineon & GlobalFoundries', 'Dresden', 'engineering', 'Microchip production ("Silicon Saxony").'),
    c('Bosch', 'Dresden', 'engineering', 'Semiconductor fab.'),
    c('DHL Hub Leipzig', 'Leipzig', 'business', 'DHL\'s largest air hub.'),
    c('SAP', 'Dresden', 'cs', 'Software development centre.'),
  ],
  ST: [
    c('Dow', 'Schkopau (near Merseburg)', 'engineering', 'Chemical production.'),
    c('TotalEnergies', 'Leuna (near Merseburg)', 'engineering', 'Refinery and chemical park.'),
    c('Enercon', 'Magdeburg', 'engineering', 'Wind turbine production.'),
    c('Fraunhofer IFF', 'Magdeburg', 'cs', 'Factory automation research.'),
  ],
  SH: [
    c('Drägerwerk', 'Lübeck', 'engineering', 'Medical and safety technology.'),
    c('thyssenkrupp Marine Systems', 'Kiel', 'engineering', 'Naval shipbuilding.'),
    c('Danfoss', 'Flensburg', 'engineering', 'Compressors and drives.'),
    c('Dataport', 'Kiel / Altenholz', 'cs', 'Public-sector IT.'),
  ],
  TH: [
    c('ZEISS', 'Jena', 'engineering', 'Optics and medical technology.'),
    c('Jenoptik & SCHOTT', 'Jena', 'engineering', 'Photonics and specialty glass.'),
    c('Bosch', 'Eisenach', 'engineering', 'Automotive electronics.'),
    c('Opel (Stellantis)', 'Eisenach', 'engineering', 'Car plant.'),
    c('CATL', 'Arnstadt', 'engineering', 'Battery cell plant.'),
    c('Intershop', 'Jena', 'cs', 'E-commerce software.'),
  ],
}

export const careerFairs = {
  national: [
    { name: 'bonding company fairs', where: 'Aachen, Berlin, Bochum, Braunschweig, Dresden, Erlangen, Hamburg, Kaiserslautern, Karlsruhe, Magdeburg, Munich, Stuttgart', when: 'Each semester (dates vary by city)', text: 'Free student-run engineering and IT fairs.' },
    { name: 'VDI Recruiting Tag', where: 'Many cities', when: 'All year', text: 'Engineering recruiting days by the Association of German Engineers.' },
    { name: 'Your host university\'s Firmenkontaktmesse', where: 'On campus', when: 'Usually once or twice a year', text: 'Almost every university runs its own company fair. Ask the career service on day one.' },
  ],
  BW: [{ name: 'KIT Career Fair & bonding Karlsruhe / Stuttgart', when: 'Usually Oct–Dec and Apr–Jun', where: 'Karlsruhe, Stuttgart' }],
  BY: [
    { name: 'IKOM (TUM)', when: 'Usually once a year', where: 'Garching near Munich' },
    { name: 'akademika', when: 'Usually once a year', where: 'Nuremberg' },
    { name: 'bonding Munich / Erlangen', when: 'Each semester', where: 'Munich, Erlangen' },
  ],
  BE: [{ name: 'bonding Berlin', when: 'Each semester', where: 'Berlin' }],
  BB: [{ name: 'Career fairs in Berlin', when: 'Each semester', where: 'Berlin, 30–60 min away' }],
  HB: [{ name: 'Career days at HS Bremen & HS Bremerhaven', when: 'Each semester', where: 'Bremen, Bremerhaven' }],
  HH: [{ name: 'bonding Hamburg', when: 'Each semester', where: 'Hamburg' }],
  HE: [{ name: 'konaktiva Darmstadt', when: 'Usually spring', where: 'Darmstadt' }],
  MV: [{ name: 'Career fairs in Rostock and Hamburg', when: 'Each semester', where: 'Rostock, Hamburg' }],
  NI: [{ name: 'bonding Braunschweig', when: 'Each semester', where: 'Braunschweig' }],
  NW: [
    { name: 'bonding Aachen / Bochum', when: 'Each semester', where: 'Aachen, Bochum' },
    { name: 'konaktiva Dortmund', when: 'Usually autumn', where: 'Dortmund' },
  ],
  RP: [{ name: 'bonding Kaiserslautern', when: 'Each semester', where: 'Kaiserslautern' }],
  SL: [{ name: 'Career days at htw saar & Saarland University', when: 'Each semester', where: 'Saarbrücken' }],
  SN: [{ name: 'bonding Dresden', when: 'Each semester', where: 'Dresden' }],
  ST: [{ name: 'bonding Magdeburg', when: 'Each semester', where: 'Magdeburg' }],
  SH: [{ name: 'Career days in Kiel, Lübeck and Hamburg', when: 'Each semester', where: 'Kiel, Lübeck, Hamburg' }],
  TH: [{ name: 'Company fairs at TU Ilmenau, EAH Jena and FH Erfurt', when: 'Usually autumn and spring', where: 'Ilmenau, Jena, Erfurt' }],
}

export const applicationSteps = [
  { when: 'Month 1', title: 'Get your documents ready', text: 'A German-style CV (Lebenslauf, 1–2 pages, with a photo and dates), a one-page cover letter (Anschreiben) for each company, your GJU transcript in English or German, and the GJU letter confirming the internship is mandatory.' },
  { when: 'Months 1–2', title: 'Search and shortlist', text: 'Search "Pflichtpraktikum" plus your field and city on StepStone, Indeed, LinkedIn and company career pages. Mid-sized firms near your campus reply more often than big brands.' },
  { when: 'Months 2–4', title: 'Apply widely', text: 'Send 30–60 tailored applications. Companies often plan 3–6 months ahead. Use the company fairs to talk to recruiters in person.' },
  { when: 'Interviews', title: 'Prepare in German and English', text: 'Expect a phone or video interview, sometimes a technical test. Explain clearly that the internship is mandatory for your degree and give exact dates.' },
  { when: 'Offer', title: 'Get GJU approval first', text: 'Send the offer to GJU for approval before you sign. Check working hours, pay, the start date and the location.' },
  { when: 'Before you start', title: 'Sort the paperwork', text: 'Check your residence permit wording, give notice on your room if you move, de-register (Abmeldung), and register in the new city within the legal deadline days.' },
]

export const applicationTips = [
  'Write "Pflichtpraktikum im Rahmen meines Studiums" (mandatory internship as part of my degree) in your subject line. Mandatory internships are easier for companies to offer.',
  'German companies read CVs closely: no gaps, exact months, and a short skills section with your German level (e.g. "Deutsch – B2").',
  'A simple, professional photo is still common on German CVs.',
  'Tailor each cover letter to the company. Name the department and say why its products matter to you.',
  'Follow up politely after 1–2 weeks if you hear nothing.',
  'Ask GJU students from previous years where they did their internships. Companies that took a GJU student before are often happy to take another.',
  'Pay: mandatory internships may be unpaid by law, but many engineering and IT companies pay a monthly stipend. Ask about it in the interview.',
]

export const jobPortals = [
  { name: 'StepStone', url: 'https://www.stepstone.de/', text: 'Germany\'s biggest job portal' },
  { name: 'Indeed', url: 'https://de.indeed.com/', text: 'Search "Pflichtpraktikum"' },
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', text: 'Good for English-speaking teams' },
  { name: 'XING Jobs', url: 'https://www.xing.com/jobs', text: 'German professional network' },
  { name: 'Praktikum.info', url: 'https://www.praktikum.info/', text: 'Internship-only listings' },
  { name: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/en/', text: 'Official portal for working in Germany' },
]

export const jobSearch = (company, city) =>
  `https://www.google.com/search?q=${encodeURIComponent(`${company} Pflichtpraktikum ${city.split(/[,/(]/)[0].trim()}`)}`
export const fairSearch = (name) => `https://www.google.com/search?q=${encodeURIComponent(`${name} Termin`)}`
