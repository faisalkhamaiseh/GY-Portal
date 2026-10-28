// Comparison tables. General information only; providers change prices and
// conditions often, so every table ends with "check before you sign".

export const comparisons = [
  {
    id: 'banks',
    title: 'Banks',
    question: 'Which bank account should I open?',
    intro: 'Your blocked account pays a monthly amount into a German account, so you need one in your first week. All three below give you a German IBAN.',
    options: ['Sparkasse', 'N26', 'Deutsche Bank'],
    rows: [
      ['Type', 'Local savings bank with branches in every town', 'Online-only bank, everything in the app', 'Large national bank with branches in cities'],
      ['Opening', 'Appointment at a branch; usually needs your Meldebescheinigung (address registration)', 'In the app in about 10 minutes with passport video ID; needs a German address', 'Online or at a branch; ask for the student account'],
      ['Monthly fee', 'Often free for students (age limits vary by Sparkasse)', 'Basic account free', 'Free or reduced for students with proof of enrolment'],
      ['English app', 'Mostly German', 'Yes, fully in English', 'Yes, English available'],
      ['Cash', 'Its own ATMs everywhere, even in small towns', 'Limited free withdrawals per month; deposit cash at partner shops', 'Free at Cash Group ATMs (Deutsche Bank, Commerzbank, Postbank, HypoVereinsbank)'],
      ['Card', 'Girocard + often a debit/credit card', 'Mastercard debit', 'Girocard and/or Visa debit'],
      ['Best for', 'Small towns, cash users, face-to-face help', 'Fast start, English speakers, travel in Europe', 'Big cities, a full-service bank in English'],
    ],
    verdict: 'Most GJU students start with N26 (or another free online bank such as DKB or C24) because they can open it before registering their address. If you prefer a branch and cash in a small town, Sparkasse is the safe choice.',
  },
  {
    id: 'mobile',
    title: 'Mobile plans',
    question: 'Which SIM card gives me the best internet for the money?',
    intro: 'Germany has three networks: Telekom, Vodafone and O2. Discount brands use the same networks for less. Prepaid has no contract, which is ideal for one year.',
    options: ['Telekom', 'Vodafone', 'O2', 'Aldi Talk'],
    rows: [
      ['Network', 'Telekom (D1)', 'Vodafone (D2)', 'O2 (Telefónica)', 'Uses the O2 network'],
      ['Coverage', 'Best overall, especially rural areas and trains', 'Very good', 'Good in cities, weaker in the countryside', 'Same as O2'],
      ['Typical price', 'Usually highest', 'High; frequent student deals', 'Mid; good-value unlimited plans', 'Usually lowest; prepaid packs'],
      ['Contract', 'Mostly 24-month contracts; prepaid available', 'Mostly 24-month contracts; prepaid available', 'Contracts, monthly options and prepaid', 'Prepaid only, no contract'],
      ['Where to buy', 'Telekom shop or online', 'Vodafone shop or online', 'O2 shop or online', 'At any Aldi supermarket'],
      ['Best for', 'Small towns and lots of train travel', 'Student deals and bundles', 'Big-city students who want lots of data', 'A cheap, simple start in week 1'],
    ],
    verdict: 'Buy an Aldi Talk (or Lidl Connect, Congstar, Fraenk) prepaid SIM in your first week; you need your passport to activate it. Avoid 24-month contracts: your German Year is 12 months. In a small town, check coverage maps first; Telekom-network brands such as Fraenk or Congstar are usually best there.',
  },
  {
    id: 'health',
    title: 'Health insurance',
    question: 'TK or AOK: which public insurer should I choose?',
    intro: 'Both are public (statutory) insurers. By law, about 95% of their benefits are identical, and students pay a similar monthly contribution set by law. The differences are the additional contribution (Zusatzbeitrag), service and extras.',
    options: ['TK (Techniker Krankenkasse)', 'AOK'],
    rows: [
      ['Organisation', 'One nationwide insurer', '11 regional AOKs; extras depend on your region'],
      ['Service in English', 'Strong: English website, app and hotline', 'Varies by region; branch staff in every town'],
      ['Digital', 'Very good app (documents, sick notes, uploads)', 'Good apps; many questions handled in local branches'],
      ['Travel vaccinations', 'Covers many recommended travel vaccines', 'Often covered; depends on your regional AOK'],
      ['Dental cleaning', 'Contribution towards professional teeth cleaning (amount set yearly)', 'Many regional AOKs subsidise cleaning; amounts vary'],
      ['Extras', 'Bonus programme, online doctor services', 'Bonus programmes, local health courses'],
      ['Best for', 'English speakers who want everything online', 'Students who like face-to-face help in a small town'],
    ],
    verdict: 'Either is a good choice; there is no "bad" public insurer. Many GJU students pick TK for its English service. Compare the current Zusatzbeitrag and the extras of your regional AOK before you decide; you can switch later.',
  },
]

export const compareNote = 'A general comparison for guidance only. Prices, fees and benefits change constantly, so always confirm on the provider\'s website before you sign.'
