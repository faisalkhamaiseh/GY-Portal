// المواصلات والمطارات وخريطة البقاء الثقافية.
// شركات الطيران المذكورة هي منخفضة التكلفة التي تخدم كل مطار عادةً؛ الخطوط
// تتغير كل موسم، لذلك نربط دائماً ببحث رحلات مباشر.

export const dticket = {
  // السعر يتغير كل يناير؛ النصائح أدناه تذكر السعر الحالي.
  covered: [
    'كل القطارات الإقليمية: RB وRE وIRE وS-Bahn في كل ألمانيا',
    'المترو (U-Bahn) والترام والباصات في كل المدن',
    'معظم الباصات الإقليمية والكثير من العبّارات المحلية',
    'رحلات غير محدودة، أي يوم، على مدار الساعة',
  ],
  notCovered: [
    'القطارات السريعة: ICE وIC وEC (بعض مقاطع IC مسموحة محلياً؛ تحقق من تطبيق DB Navigator)',
    'FlixBus وFlixTrain',
    'الدرجة الأولى',
    'الدراجات في معظم الولايات (اشترِ تذكرة دراجة)',
    'معظم الخطوط بعد الحدود الألمانية',
  ],
  tips: [
    'تذكرتك الفصلية (Deutschlandsemesterticket، بـ226.80 يورو للفصل من الشتوي 2026/27) مشمولة غالباً في الرسوم الفصلية، فلا تشترِ Deutschlandticket منفصلة بـ63 يورو.',
    'احتفظ بالتذكرة على هاتفك (تطبيق الجامعة أو DB Navigator) واحمل بطاقتك الطلابية أو جوازك. المفتشون يتحققون من الاثنين.',
    'اختر "Nur Nahverkehr" (المواصلات المحلية فقط) في DB Navigator لترى الرحلات المجانية.',
    'للمسافات الطويلة احجز تذاكر ICE Sparpreis مبكراً. بطاقة My BahnCard 25 لمن هم دون 27 سعرها 39.90 يورو للسنة وتستحق ثمنها بعد رحلات قليلة.',
    'الركوب بدون تذكرة صالحة غرامته 60 يورو (7 يورو إذا أظهرت تذكرتك الفصلية الشخصية خلال أسبوع).',
  ],
}

// المطارات حسب الولاية، الأقرب والأفيد أولاً.
export const airports = {
  BW: [
    { code: 'STR', name: 'شتوتغارت', airlines: ['Eurowings'], note: 'المطار الرئيسي؛ قطار S-Bahn من شتوتغارت' },
    { code: 'FKB', name: 'كارلسروه/بادن-بادن', airlines: ['Ryanair', 'Wizz Air'], note: 'رحلات اقتصادية؛ باص من محطة بادن-بادن' },
    { code: 'FMM', name: 'ميمنغن', airlines: ['Ryanair', 'Wizz Air'], note: 'مطار اقتصادي على بُعد ساعة تقريباً من أولم' },
    { code: 'BSL', name: 'مطار بازل-مولوز الأوروبي', airlines: ['easyJet', 'Wizz Air'], note: 'قريب من أوفنبورغ وفورتفانغن' },
  ],
  BY: [
    { code: 'MUC', name: 'ميونخ', airlines: ['Eurowings', 'Lufthansa'], note: 'قطار S1/S8؛ رحلات بعيدة ورحلات الملكية الأردنية' },
    { code: 'FMM', name: 'ميمنغن', airlines: ['Ryanair', 'Wizz Air'], note: 'المطار الاقتصادي في بافاريا؛ باص من ميونخ' },
    { code: 'NUE', name: 'نورنبيرغ', airlines: ['Ryanair', 'Eurowings'], note: 'المترو للمطار في 12 دقيقة' },
    { code: 'PRG', name: 'براغ (التشيك)', airlines: ['Ryanair', 'Wizz Air'], note: 'خيار رخيص من فايدن أو أمبرغ' },
    { code: 'SZG', name: 'سالزبورغ (النمسا)', airlines: ['Ryanair', 'easyJet'], note: 'قريب من روزنهايم' },
  ],
  BE: [{ code: 'BER', name: 'برلين براندنبورغ', airlines: ['Ryanair', 'easyJet', 'Wizz Air', 'Eurowings'], note: 'من أكبر مراكز الطيران الاقتصادي في ألمانيا؛ القطارات الإقليمية مشمولة بتذكرتك' }],
  BB: [
    { code: 'BER', name: 'برلين براندنبورغ', airlines: ['Ryanair', 'easyJet', 'Wizz Air', 'Eurowings'], note: 'قريب من فيلداو وبوتسدام' },
    { code: 'DRS', name: 'دريسدن', airlines: ['Eurowings'], note: 'بديل من كوتبوس' },
  ],
  HB: [
    { code: 'BRE', name: 'بريمن', airlines: ['Ryanair', 'Eurowings'], note: 'الترام رقم 6 من وسط المدينة' },
    { code: 'HAM', name: 'هامبورغ', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'حوالي ساعة ونصف بالقطار الإقليمي' },
  ],
  HH: [{ code: 'HAM', name: 'هامبورغ', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'قطار S1 من المركز في 25 دقيقة' }],
  HE: [
    { code: 'FRA', name: 'فرانكفورت', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'المطار الرئيسي في ألمانيا؛ رحلات مباشرة إلى عمّان' },
    { code: 'HHN', name: 'فرانكفورت-هان', airlines: ['Ryanair'], note: 'مطار اقتصادي على بُعد ساعتين تقريباً من فرانكفورت بالباص' },
    { code: 'PAD', name: 'بادربورن-ليبشتات', airlines: ['Eurowings'], note: 'مطار صغير شمال كاسل' },
  ],
  MV: [
    { code: 'HAM', name: 'هامبورغ', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'حوالي 3 ساعات بالقطار' },
    { code: 'BER', name: 'برلين براندنبورغ', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'حوالي 2.5–3 ساعات بالقطار' },
  ],
  NI: [
    { code: 'HAJ', name: 'هانوفر', airlines: ['Ryanair', 'Eurowings'], note: 'قطار S5 من المحطة الرئيسية' },
    { code: 'BRE', name: 'بريمن', airlines: ['Ryanair', 'Eurowings'], note: 'قريب من أولدنبورغ وإمدن' },
    { code: 'HAM', name: 'هامبورغ', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'وجهات أكثر' },
  ],
  NW: [
    { code: 'CGN', name: 'كولونيا/بون', airlines: ['Ryanair', 'Eurowings'], note: 'قطار S-Bahn من محطة كولونيا الرئيسية' },
    { code: 'DTM', name: 'دورتموند', airlines: ['Wizz Air', 'Eurowings'], note: 'قاعدة Wizz Air مع رحلات كثيرة لأوروبا الشرقية' },
    { code: 'NRN', name: 'فيزه', airlines: ['Ryanair'], note: 'مطار Ryanair قرب الحدود الهولندية' },
    { code: 'DUS', name: 'دوسلدورف', airlines: ['Eurowings'], note: 'مطار كبير بوجهات سياحية كثيرة' },
    { code: 'EIN', name: 'آيندهوفن (هولندا)', airlines: ['Ryanair', 'Wizz Air', 'Transavia'], note: 'خيار اقتصادي من آخن وكريفيلد' },
  ],
  RP: [
    { code: 'HHN', name: 'فرانكفورت-هان', airlines: ['Ryanair'], note: 'في منطقة هونسروك، قرب ترير وبينغن' },
    { code: 'FRA', name: 'فرانكفورت', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'أقل من ساعة من ماينتس' },
    { code: 'LUX', name: 'لوكسمبورغ', airlines: ['easyJet', 'Luxair'], note: 'قريب من ترير' },
  ],
  SL: [
    { code: 'LUX', name: 'لوكسمبورغ', airlines: ['easyJet', 'Luxair'], note: 'حوالي ساعة بالباص' },
    { code: 'HHN', name: 'فرانكفورت-هان', airlines: ['Ryanair'], note: 'رحلات اقتصادية' },
    { code: 'FRA', name: 'فرانكفورت', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'حوالي ساعتين بالقطار' },
  ],
  SN: [
    { code: 'LEJ', name: 'لايبزيغ/هاله', airlines: ['Ryanair', 'Eurowings'], note: 'قطار S-Bahn من لايبزيغ' },
    { code: 'DRS', name: 'دريسدن', airlines: ['Eurowings'], note: 'قطار S2 من المركز' },
    { code: 'PRG', name: 'براغ (التشيك)', airlines: ['Ryanair', 'Wizz Air'], note: 'حوالي ساعتين من دريسدن' },
    { code: 'BER', name: 'برلين براندنبورغ', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'أكثر الرحلات الاقتصادية' },
  ],
  ST: [
    { code: 'LEJ', name: 'لايبزيغ/هاله', airlines: ['Ryanair', 'Eurowings'], note: 'قريب من ميرزبورغ وكوتن' },
    { code: 'BER', name: 'برلين براندنبورغ', airlines: ['Ryanair', 'easyJet', 'Wizz Air'], note: 'من ماغدبورغ وشتندال' },
    { code: 'HAJ', name: 'هانوفر', airlines: ['Ryanair', 'Eurowings'], note: 'من فيرنيغيروده' },
  ],
  SH: [
    { code: 'HAM', name: 'هامبورغ', airlines: ['Ryanair', 'easyJet', 'Eurowings'], note: 'حوالي ساعة من لوبيك' },
    { code: 'BLL', name: 'بيلوند (الدنمارك)', airlines: ['Ryanair'], note: 'خيار من فلنسبورغ' },
    { code: 'CPH', name: 'كوبنهاغن (الدنمارك)', airlines: ['Ryanair', 'easyJet', 'Norwegian'], note: 'مطار كبير، حوالي 3–4 ساعات بالقطار' },
  ],
  TH: [
    { code: 'LEJ', name: 'لايبزيغ/هاله', airlines: ['Ryanair', 'Eurowings'], note: 'حوالي ساعة ونصف من إرفورت أو ينا أو فايمار' },
    { code: 'NUE', name: 'نورنبيرغ', airlines: ['Ryanair', 'Eurowings'], note: 'من إلميناو وشمالكالدن' },
    { code: 'FRA', name: 'فرانكفورت', airlines: ['Lufthansa', 'Condor', 'Royal Jordanian'], note: 'مباشر إلى عمّان؛ حوالي 3 ساعات من شمالكالدن' },
    { code: 'ERF', name: 'إرفورت-فايمار', airlines: ['رحلات سياحية'], note: 'مطار صغير، ترام من إرفورت' },
  ],
}

export const flightSearch = (code) => `https://www.google.com/travel/flights?q=${encodeURIComponent(`flights from ${code}`)}`

export const airlines = [
  { name: 'Ryanair', url: 'https://www.ryanair.com/', text: 'الأرخص مع حقيبة يد صغيرة فقط؛ سجّل أونلاين لتجنب الرسوم.' },
  { name: 'Wizz Air', url: 'https://wizzair.com/', text: 'قوية في أوروبا الشرقية؛ اشتراك Wizz Discount Club مفيد إن سافرت كثيراً.' },
  { name: 'easyJet', url: 'https://www.easyjet.com/', text: 'قواعد في برلين وهامبورغ وبازل.' },
  { name: 'Eurowings', url: 'https://www.eurowings.com/', text: 'الذراع الاقتصادية للوفتهانزا، من مطارات ألمانية كثيرة.' },
  { name: 'Royal Jordanian', url: 'https://www.rj.com/', text: 'رحلات مباشرة إلى عمّان، أساساً من فرانكفورت.' },
]

export const europeTrips = [
  { to: 'أمستردام', how: 'قطار أو فليكس باص من شمال الراين-وستفاليا، أو طيران', from: '20–60 يورو' },
  { to: 'باريس', how: 'TGV/ICE من فرانكفورت أو شتوتغارت أو زاربروكن', from: '30–80 يورو' },
  { to: 'براغ', how: 'باص أو قطار من دريسدن أو نورنبيرغ أو برلين', from: '15–40 يورو' },
  { to: 'فيينا وبودابست', how: 'طيران من ميمنغن أو دورتموند، أو قطارات ليلية', from: '20–70 يورو' },
  { to: 'روما وميلانو وبولونيا', how: 'Ryanair من BER وCGN وHHN وFKB', from: '20–80 يورو' },
  { to: 'برشلونة وفالنسيا', how: 'Ryanair وWizz Air من مطارات ألمانية كثيرة', from: '30–90 يورو' },
  { to: 'إسطنبول', how: 'Pegasus والخطوط التركية من معظم المطارات الكبيرة', from: '60–150 يورو' },
  { to: 'عمّان', how: 'الملكية الأردنية من فرانكفورت؛ قارن مع الرحلات عبر إسطنبول', from: '220–480 يورو ذهاب وعودة' },
]

// خريطة البقاء الثقافية: بحث Google Maps لكل مدينة.
export const foodLayers = [
  { id: 'butcher', label: 'ملاحم حلال', query: (city) => `Halal Metzgerei ${city}` },
  { id: 'turkish', label: 'سوبرماركت تركي', query: (city) => `türkischer Supermarkt ${city}` },
  { id: 'arab', label: 'سوبرماركت عربي', query: (city) => `arabischer Supermarkt ${city}` },
  { id: 'restaurant', label: 'مطاعم عربية', query: (city) => `arabisches Restaurant ${city}` },
  { id: 'mosque', label: 'مساجد', query: (city) => `Moschee ${city}` },
]

export const mapEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=13&hl=ar&output=embed`
export const mapLink = (q) => `https://www.google.com/maps/search/${encodeURIComponent(q)}`

export const halalTips = [
  { title: 'ابحث عن "Helal" أو "Halal"', text: 'المحلات التركية تكتب على اللحم الحلال "Helal". كثير من السوبرماركتات الكبيرة (REWE وKaufland وEdeka) تبيع دجاجاً وسجقاً حلالاً معتمداً من علامات تركية.' },
  { title: 'اقرأ المكونات', text: 'انتبه لـSchwein (خنزير) وGelatine (غالباً من الخنزير؛ ابحث عن "Rindergelatine" أو "Halal-Gelatine") وSchmalz (دهن خنزير) وAlkohol في الحلويات والصلصات.' },
  { title: 'المدن الصغيرة', text: 'إن لم توجد ملحمة حلال في مدينتك، اشترِ كمية من أقرب مدينة كبيرة وجمّدها، أو اطلب من متاجر حلال ألمانية توصل لحماً مبرداً.' },
  { title: 'في المطعم الجامعي', text: 'القوائم تشير لأطباق الخنزير، وغالباً للنباتية. اسأل الموظفين: "Ist da Schweinefleisch drin?"' },
  { title: 'صلاة الجمعة', text: 'اسأل المكتب الدولي وطلاب GJU من السنة الماضية عن أقرب مسجد وعن غرفة صلاة في الحرم.' },
  { title: 'رمضان', text: 'كثير من المساجد تقيم إفطارات مجانية، وهي فرصة رائعة للتعرف على الجالية المحلية.' },
]
