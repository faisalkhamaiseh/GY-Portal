// Germany-wide guidance. Dates and amounts come from GJU's International
// Affairs Department (kick-off meeting, winter semester 2026/27) or official
// rates; every legal, governmental or academic step links to its official
// source (`official`).

export const officialSources = {
  visa: { label: 'German Embassy Amman', href: 'https://amman.diplo.de/' },
  foreignOffice: { label: 'German Federal Foreign Office: visas', href: 'https://www.auswaertiges-amt.de/en/visa-service' },
  makeIt: { label: 'Make it in Germany (official portal)', href: 'https://www.make-it-in-germany.com/en/' },
  rundfunk: { label: 'Rundfunkbeitrag (official site)', href: 'https://www.rundfunkbeitrag.de/' },
  gju: { label: 'German Jordanian University (GJU)', href: 'https://www.gju.edu.jo/' },
  gjuEligibility: { label: 'GJU: eligibility to start the German Year', href: 'https://www.gju.edu.jo/node/13323' },
  gjuTerms: { label: 'GJU: terms to start the German Year', href: 'https://www.gju.edu.jo/node/16241' },
  gjuLanguage: { label: 'GJU: German language regulations for the German Year', href: 'https://www.gju.edu.jo/content/german-language-regulations-german-year-12359' },
  gjuManual: { label: 'GJU: German Year manual (PDF)', href: 'https://www.gju.edu.jo/sites/default/files/german_year_manual_final.pdf' },
  fintiba: { label: 'Fintiba blocked account', href: 'https://www.fintiba.com/solutions/blocked-account-germany/' },
  daad: { label: 'DAAD: study in Germany', href: 'https://www.daad.de/en/' },
  dticket: { label: 'Deutschlandticket (official site)', href: 'https://deutschlandticket.de/' },
  iad: { label: 'Email the IAD outgoings team', href: 'mailto:IAD.Outgoing.Team@gju.edu.jo' },
  iadBooking: { label: 'Book an IAD appointment', href: 'https://outlook.office365.com/owa/calendar/AppointmentBooking@gju.edu.jo/bookings/' },
  gjuFaq: { label: 'GJU: German Year FAQs', href: 'https://www.gju.edu.jo/content/faqs-16127' },
  ba: { label: 'Federal Employment Agency', href: 'https://www.arbeitsagentur.de/en/' },
}

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`

export const checklist = [
  {
    id: 'gju',
    title: 'Before you go: GJU requirements',
    place: 'GJU',
    note: 'GJU only lets you start the German Year once these are done. The exact conditions, deadlines and fees are set by GJU and can differ by school and intake, so confirm each one with your Exchange Coordinator and the International Affairs Department.',
    items: [
      { id: 'gy-eligible', title: 'Check you meet the German Year eligibility conditions', text: 'GJU sets a minimum GPA and a minimum number of completed credit hours (German levels not counted) for your school. Your GPA must still meet the minimum when you leave.', official: officialSources.gjuEligibility },
      { id: 'gy-german', title: 'Meet the German language requirement', text: 'Finish the required German courses and level (B1 track or above) as set in the GJU language regulations. Ask early what happens if you have not passed the last level before departure.', official: officialSources.gjuLanguage },
      { id: 'gy-apply', title: 'Apply through your Exchange Coordinator', text: 'Submit the German Year application through your school\'s Exchange Coordinator and the International Affairs Department so you are placed on the outgoing list and matched with a partner university.', official: officialSources.gjuTerms },
      { id: 'gy-training', title: 'Complete any training your study plan requires first', text: 'Some schools require field training in Jordan before the German Year. Check your study plan and finish it in time.', official: officialSources.gjuManual },
      { id: 'gy-fee', title: 'Pay the German Year fee before the GJU deadline', text: 'GJU charges an organisational fee for the German Year. Check the current amount, deadline and cancellation rules with GJU before you pay.', official: officialSources.gjuManual },
    ],
  },
  {
    id: 'apply',
    title: 'Steps to Germany: your application',
    place: 'GJU, November to January',
    note: 'From the GJU International Affairs Department (IAD) kick-off meeting for the winter semester 2026/27. Exact visa appointment dates are announced by email, so check your GJU mailbox every day.',
    items: [
      { id: 'apply-research', title: 'Get to know your future university', text: 'Read the host university\'s website (programmes, courses, deadlines), find its International Office, your first contact on site, and look up the city: location, transport and daily life.', official: { label: 'Host universities', href: '/universities', internal: true } },
      { id: 'apply-mailbox', title: 'Keep your GJU mailbox active and with free space', text: 'Every step arrives by email from IAD and from your host university. A full mailbox bounces their messages. Also join the GJU Outgoings Index when IAD sends the link.' },
      { id: 'apply-transcript', title: 'Get your transcript of records (كشف العلامات)', text: 'Required. Ask GJU\'s Admission and Registration Department for an official English transcript with the stamp. Order it early: it can take a few working days.' },
      { id: 'apply-enrolment', title: 'Get your certificate of enrolment (إثبات طالب)', text: 'Required. From the same Registration Department: an official letter in English confirming you are a current GJU student.' },
      { id: 'apply-german', title: 'Get your German language certificate (Sprachzeugnis)', text: 'Required. The GJU DaF certificate from your German courses, or a Goethe B1 or ÖSD B1 certificate. Book outside exams early: places fill up.', official: [{ label: 'GJU German language rules', href: 'https://www.gju.edu.jo/content/german-language-regulations-german-year-12359' }, { label: 'Goethe-Institut Jordan: exams', href: 'https://www.goethe.de/ins/jo/en/spr/prf.html' }, { label: 'ÖSD exams', href: 'https://www.osd.at/en/' }] },
      { id: 'apply-passport', title: 'Make a clear copy of your passport data page', text: 'Your passport must be valid for the whole year abroad and some months after. If it expires soon, renew it now at the Civil Status and Passports Department: you need it for the visa too.', official: { label: 'Civil Status and Passports Department', href: 'https://www.cspd.gov.jo/' } },
      { id: 'apply-photos', title: 'Take 3 biometric passport photos', text: 'For the visa application: 35 × 45 mm, recent, light plain background, face straight to the camera. Any photo studio in Amman can do them; say they are for a German visa.' },
      { id: 'apply-send', title: 'Email all documents to your outgoing coordinator', text: 'Transcript, enrolment certificate, German certificate, passport copy and photos, scanned in one email. Put your name, student ID, major, German Year and host university in every email.', official: { label: 'IAD.Outgoing.Team@gju.edu.jo', href: 'mailto:IAD.Outgoing.Team@gju.edu.jo' } },
      { id: 'apply-learning', title: 'Fill in the Learning Agreement with your Exchange Coordinator', text: 'Choose your courses at the host university together with the Exchange Coordinator at your school. It decides which credits GJU recognises.' },
      { id: 'apply-forms', title: 'Sign the IAD forms', text: 'The cancellation rules, the code of conduct (GJU IAD and your host university) and the German Year IAD procedures and timeline. IAD sends the templates.' },
      { id: 'apply-extra', title: 'Prepare extra documents if your university asks', text: 'The university and dormitory application form; a motivation letter (about one page, at least half in German); a portfolio for Architecture and Design students; a CV in German or English with your photo. Each university can ask for something extra, so read every email.', official: { label: 'Europass CV template', href: 'https://europass.europa.eu/en/create-europass-cv' } },
      { id: 'dorm', title: 'Find housing: three ways, all at once', text: 'Through the university application form (automatic), directly with the Studierendenwerk (on your own), or privately on the open market. Dorm rooms are not guaranteed, so search privately at the same time. Without a fixed address you cannot register in your city, and without registering you cannot reach your money. Never pay before a live video call and a real contract.', official: [{ label: 'Trusted housing sites', href: '/housing', internal: true }, { label: 'DAAD dormitory finder', href: 'https://www.daad.de/deutschland/nach-deutschland/bewerbung/en/22222-wohnheimfinder/' }] },
      { id: 'sperrkonto', title: 'Deposit the blocked account by 1 December', text: 'GJU asks you to deposit €12,163 (about 9,339 JOD) with Fintiba (Sutor Bank) and send the blocking confirmation for the visa. It covers 12 months of living costs and pays out €992 a month once you are in Germany. Signing up with Fintiba and transferring on time is your own responsibility.', official: [officialSources.fintiba, officialSources.foreignOffice] },
      { id: 'visa', title: 'Apply for the visa (end of November to January)', text: 'IAD sets the embassy appointment dates and announces them by email. Bring your acceptance letter, the blocked account confirmation, your passport and the biometric photos. The visa fee is €75.', official: officialSources.visa },
      { id: 'apply-letters', title: 'Wait for your acceptance letter (end of December)', text: 'The host university sends the invitation or acceptance letter. Forward it to IAD and keep the original for the visa.' },
      { id: 'apply-depart', title: 'Farewell on 14 January 2027, departure from February to March', text: 'Book your flight once the visa is in your passport, and arrive on a weekday so you can collect your keys.' },
    ],
  },
  {
    id: 'before',
    title: 'Before you fly',
    place: 'Amman',
    items: [
      { id: 'insurance', title: 'Choose health insurance', text: 'Health insurance is required to enrol. Compare the public insurers, and get travel insurance for the first days until it starts.', official: { label: 'Compare TK and AOK', href: '/compare#health', internal: true } },
      { id: 'folder', title: 'Pack the document folder', text: 'Passport, visa, biometric photos, admission letter, GJU documents, transcripts, insurance letter, rental contract, and paper copies of everything. Bring enough cash for the first days.' },
      { id: 'ticket', title: 'Activate your semester ticket', text: 'If your university already sent it, activate it before you land so you can take the train from the airport.', official: officialSources.dticket },
    ],
  },
  {
    id: 'week1',
    title: 'Week 1',
    place: 'Your host city',
    items: [
      { id: 'keys', title: 'Pick up your keys and sign the rental contract', text: 'Ask for the Wohnungsgeberbestätigung (landlord confirmation). You need it to register your address.' },
      { id: 'anmeldung', title: 'Register your address (Anmeldung)', text: 'At your city\'s Bürgeramt within the legal deadline after moving in (usually about two weeks). Book online and keep your Meldebescheinigung safe.', official: { label: 'Your city\'s Bürgeramt', href: search('Bürgeramt Anmeldung Termin') } },
      { id: 'enrol', title: 'Enrol and collect your student card', text: 'Your host university sets the enrolment steps and documents. The card is usually your student ID, Mensa wallet and ticket proof.', official: { label: 'Your host university\'s portal', href: '/universities', internal: true } },
      { id: 'bank', title: 'Open a German bank account', text: 'An online bank or a local branch. Your blocked-account money is paid out here.', official: { label: 'Compare banks', href: '/compare#banks', internal: true } },
      { id: 'sim', title: 'Buy a SIM card', text: 'Prepaid is easiest. You need your passport to activate it.', official: { label: 'Compare plans', href: '/compare#mobile', internal: true } },
      { id: 'orientation', title: 'Go to the International Office orientation', text: 'Meet your buddy and the other new students, and ask about every local procedure.' },
    ],
  },
  {
    id: 'month1',
    title: 'First month',
    place: 'Settling in',
    items: [
      { id: 'permit', title: 'Apply for the residence permit', text: 'At your city\'s immigration office (Ausländerbehörde) before your visa expires. The fee is €100. The office itself sets the documents and appointments.', official: { label: 'Your city\'s Ausländerbehörde', href: search('Ausländerbehörde Aufenthaltstitel Studium Termin') } },
      { id: 'rundfunk', title: 'Register the broadcast fee (Rundfunkbeitrag)', text: '€18.36 a month per flat, mandatory; in a shared flat one person pays and the others share it. Register on the official site.', official: officialSources.rundfunk },
      { id: 'learning', title: 'Sign the learning agreement', text: 'Confirm your courses with your host coordinator and GJU so your credits transfer. GJU sets the recognition rules.', official: officialSources.gju },
      { id: 'internship', title: 'Start applying for your internship', text: 'The internship is the second half of the German Year, and companies hire months ahead.', official: { label: 'Internship hub', href: '/internships', internal: true } },
      { id: 'taxid', title: 'Keep your tax ID letter', text: 'Your Steuer-ID arrives by post after the Anmeldung. Every employer will ask for it.' },
      { id: 'liability', title: 'Consider liability insurance', text: 'Private liability insurance (Haftpflicht) is usually cheap and covers accidents such as a broken window or a flooded bathroom.' },
    ],
  },
]

export const internship = {
  steps: [
    'Write a German CV (Lebenslauf) with a photo and a one-page cover letter (Anschreiben).',
    'Search StepStone, Indeed, LinkedIn, XING and company career pages for "Pflichtpraktikum".',
    'Use the university career service and job fairs. Ask professors about company contacts.',
    'Get the internship approved by GJU before you sign the contract.',
    'Moving cities? Give notice on your room early, de-register (Abmeldung), and register again in the new town.',
  ],
  // Laws change; we state the principle only and link to the official source.
  rules: [
    { label: 'Working days per year', value: 'Limited', text: 'Non-EU students have a yearly cap on working days outside the mandatory internship.' },
    { label: 'Minimum wage', value: 'Set by law', text: 'Applies to voluntary jobs and changes regularly; mandatory internships can be unpaid.' },
    { label: 'Minijob', value: 'Monthly cap', text: 'Simple jobs have a monthly income cap that is mostly tax-free.' },
    { label: 'Mandatory internship', value: 'Usually exempt', text: 'A Pflichtpraktikum usually does not use up your allowed working days.' },
  ],
  rulesSource: officialSources.makeIt,
  portals: [
    { name: 'StepStone', url: 'https://www.stepstone.de/' },
    { name: 'Indeed Germany', url: 'https://de.indeed.com/' },
    { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/' },
    { name: 'XING Jobs', url: 'https://www.xing.com/jobs' },
    { name: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/en/' },
    { name: 'DAAD', url: 'https://www.daad.de/en/' },
  ],
}

export const phrasebook = [
  { group: 'Paperwork', lines: [
    ['Ich möchte mich anmelden.', 'I would like to register my address.'],
    ['Ich habe einen Termin um zehn Uhr.', 'I have an appointment at ten.'],
    ['Welche Unterlagen brauche ich?', 'Which documents do I need?'],
    ['Können Sie bitte langsamer sprechen?', 'Could you speak more slowly, please?'],
  ] },
  { group: 'Housing', lines: [
    ['Ist das Zimmer noch frei?', 'Is the room still available?'],
    ['Ist die Miete warm oder kalt?', 'Does the rent include heating and bills?'],
    ['Wann kann ich das Zimmer besichtigen?', 'When can I view the room?'],
    ['Ist das Zimmer möbliert?', 'Is the room furnished?'],
  ] },
  { group: 'Food & shops', lines: [
    ['Ist da Schweinefleisch drin?', 'Does this contain pork?'],
    ['Ist das halal?', 'Is this halal?'],
    ['Eine Tüte, bitte.', 'A bag, please.'],
    ['Kann ich mit Karte zahlen?', 'Can I pay by card?'],
  ] },
  { group: 'Getting around', lines: [
    ['Wo fährt der Zug nach … ab?', 'Where does the train to … leave from?'],
    ['Ist dieser Zug mit dem Deutschlandticket erlaubt?', 'Can I take this train with the Deutschlandticket?'],
  ] },
  { group: 'Health & work', lines: [
    ['Ich brauche einen Arzttermin.', 'I need a doctor\'s appointment.'],
    ['Ich suche einen Praktikumsplatz.', 'I am looking for an internship.'],
  ] },
]

export const emergency = [
  { number: '112', label: 'Ambulance and fire' },
  { number: '110', label: 'Police' },
  { number: '116 117', label: 'Doctor on call at night and weekends' },
  { number: '0800 1110111', label: 'Free counselling hotline, 24/7' },
]

// A relative timeline that works for every year.
export const semester = [
  { month: 'Months before', label: 'Apply for housing, the blocked account and the visa' },
  { month: 'Weeks before', label: 'Insurance, document folder, activate your ticket' },
  { month: 'Arrival week', label: 'Keys, address registration, bank and orientation' },
  { month: 'First month', label: 'Residence permit, learning agreement, start internship search' },
  { month: 'End of semester', label: 'Exams and getting ready to move to your internship' },
  { month: 'Second half', label: 'Internship at a German company' },
]

// Who answers what, from the IAD kick-off meeting.
export const contacts = [
  { who: 'Exchange Coordinator', where: 'At your school', what: 'Academic questions: Learning Agreement, courses, transcripts' },
  { who: 'IAD Outgoing Coordinators', where: 'International Affairs Department', what: 'University application, visa and your documents' },
  { who: 'IAD Internship Coordinators', where: 'International Affairs Department', what: 'The internship half: contract and job opportunities' },
  { who: 'You', where: 'Your own responsibility', what: 'Housing, address registration in Germany, enrolment, Fintiba sign-up and transfer confirmation, on time' },
]

// Key dates for the winter semester 2026/27 intake (IAD kick-off meeting).
export const keyDates = [
  { when: 'November', what: 'University applications' },
  { when: '1 December', what: 'Blocked account deposit and confirmation for the visa' },
  { when: 'End Nov to January', what: 'Visa applications (dates announced by email)' },
  { when: 'End of December', what: 'Invitation and acceptance letters' },
  { when: '14 January 2027', what: 'Farewell gathering' },
  { when: 'February to March', what: 'Departure to Germany' },
]

export const emailRules = ['Write from your GJU email, never a private address', 'Use a clear subject, for example "Question about my German Year application"', 'Start with "Dear Ms./Mr." and the family name', 'End with your name, student ID, major, German Year and host university', 'Wait for a reply in working hours; one email is enough']
