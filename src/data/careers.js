// بيانات مركز التدريب العملي.
//
// `companies` تضم شركات كبيرة في كل ولاية تستقبل متدربين (Pflichtpraktikanten)
// في مجالات GJU الثلاثة. ضع `gju: true` بجانب أي شركة بعد أن يؤكد مكتب السنة
// الألمانية أو طالب سابق أنها استضافت متدرباً من GJU؛ عندها تظهر شارة
// "استضافت طلاب GJU" وتنتقل للأعلى.

export const fields = {
  engineering: { label: 'الهندسة', short: 'ENG', tone: 'bg-[#e4ecf6] text-[#1d4f80]' },
  business: { label: 'إدارة الأعمال', short: 'BUS', tone: 'bg-amber text-[#7a5410]' },
  cs: { label: 'علم الحاسوب', short: 'CS', tone: 'bg-mint text-forest' },
}

const c = (name, city, field, text, gju = false) => ({ name, city, field, text, gju })

export const companies = {
  BW: [
    c('Bosch', 'Stuttgart / Gerlingen', 'engineering', 'تقنيات السيارات والصناعة، وحرم أبحاث في رينينغن.'),
    c('Mercedes-Benz', 'Stuttgart', 'engineering', 'تطوير وإنتاج السيارات حول شتوتغارت وزيندلفينغن.'),
    c('Porsche', 'Stuttgart / Weissach', 'engineering', 'مركز أبحاث وتطوير السيارات الرياضية في فايساخ.'),
    c('Carl Zeiss', 'Oberkochen (near Aalen)', 'engineering', 'البصريات ومعدات أشباه الموصلات.'),
    c('Voith', 'Heidenheim', 'engineering', 'الطاقة المائية وآلات الورق وتقنيات الدفع.'),
    c('Festo', 'Esslingen', 'engineering', 'الأتمتة والأنظمة الهوائية.'),
    c('Trumpf', 'Ditzingen', 'engineering', 'آلات التصنيع والليزر الصناعي.'),
    c('Schwarz Group (Lidl, Kaufland)', 'Neckarsulm (near Heilbronn)', 'business', 'التجزئة واللوجستيات والمشتريات.'),
    c('Würth', 'Künzelsau', 'business', 'تجارة عالمية في منتجات التثبيت والتجميع.'),
    c('dm-drogerie markt', 'Karlsruhe', 'business', 'التجزئة والتسويق وسلاسل الإمداد.'),
    c('EnBW', 'Karlsruhe', 'business', 'شركة طاقة: رقابة مالية ومشاريع وتجارة.'),
    c('SAP', 'Walldorf', 'cs', 'أكبر شركة برمجيات في أوروبا، مع برنامج تدريب ضخم.'),
    c('Schwarz Digits / STACKIT', 'Neckarsulm', 'cs', 'الحوسبة السحابية وتقنية المعلومات والأمن السيبراني.'),
    c('IBM R&D Germany', 'Böblingen', 'cs', 'مختبر تطوير للحواسيب المركزية والسحابة والذكاء الاصطناعي.'),
    c('Vector Informatik', 'Stuttgart', 'cs', 'برمجيات وأدوات لإلكترونيات السيارات.'),
  ],
  BY: [
    c('BMW Group', 'Munich, Dingolfing, Regensburg', 'engineering', 'تطوير السيارات (FIZ ميونخ) ومصانع قرب لاندسهوت وريغنسبورغ.'),
    c('AUDI', 'Ingolstadt', 'engineering', 'المقر الرئيسي والمصنع الأساسي بجانب TH Ingolstadt.'),
    c('Siemens', 'Munich, Erlangen, Amberg', 'engineering', 'مصنع الإلكترونيات في أمبرغ نموذج للمصنع الذكي.'),
    c('Schaeffler', 'Herzogenaurach', 'engineering', 'المحامل والتنقل الكهربائي ومحركات الصناعة.'),
    c('Continental', 'Regensburg', 'engineering', 'إلكترونيات وبرمجيات السيارات.'),
    c('Krones', 'Neutraubling (Regensburg)', 'engineering', 'آلات التعبئة والتغليف.'),
    c('ZF & SKF', 'Schweinfurt', 'engineering', 'مصانع نواقل الحركة والمحامل بجانب THWS شفاينفورت.'),
    c('Brose', 'Coburg', 'engineering', 'مورّد ميكاترونيات السيارات.'),
    c('adidas & PUMA', 'Herzogenaurach', 'business', 'علامتان رياضيتان عالميتان: تسويق وتوريد ورقمنة.'),
    c('Allianz & Munich Re', 'Munich', 'business', 'التأمين والمال وإدارة المخاطر.'),
    c('Siemens Healthineers', 'Erlangen', 'business', 'التكنولوجيا الطبية، بوظائف إدارية وهندسية.'),
    c('Infineon', 'Neubiberg (Munich), Regensburg', 'cs', 'أشباه الموصلات والبرمجيات المدمجة وتصميم الرقائق.'),
    c('DATEV', 'Nuremberg', 'cs', 'برمجيات المحاسبة والاستشارات الضريبية.'),
    c('Celonis', 'Munich', 'cs', 'برمجيات تحليل العمليات (Process Mining).'),
    c('Rohde & Schwarz', 'Munich', 'cs', 'أجهزة القياس والاتصالات الآمنة والبرمجيات.'),
  ],
  BE: [
    c('Siemens Energy', 'Berlin', 'engineering', 'مصنع التوربينات الغازية في موابيت.'),
    c('BMW Motorrad', 'Berlin-Spandau', 'engineering', 'إنتاج الدراجات النارية.'),
    c('Deutsche Bahn', 'Berlin', 'business', 'سكك الحديد الألمانية: مشاريع وبنية تحتية وتقنية معلومات.'),
    c('Bayer Pharmaceuticals', 'Berlin', 'business', 'أبحاث الأدوية والوظائف الإدارية.'),
    c('Zalando', 'Berlin', 'cs', 'التجارة الإلكترونية: تقنية وبيانات ومنتجات بالإنجليزية.'),
    c('Delivery Hero', 'Berlin', 'cs', 'منصة توصيل الطعام، فرق تعمل بالإنجليزية.'),
    c('N26 & Trade Republic', 'Berlin', 'cs', 'شركات تقنية مالية ناشئة، فرق تعمل بالإنجليزية.'),
    c('HelloFresh', 'Berlin', 'business', 'العمليات وسلاسل الإمداد والتحليلات.'),
  ],
  BB: [
    c('Tesla Gigafactory', 'Grünheide', 'engineering', 'إنتاج السيارات الكهربائية شرق برلين.'),
    c('Rolls-Royce Deutschland', 'Dahlewitz', 'engineering', 'تطوير محركات الطائرات.'),
    c('Mercedes-Benz Ludwigsfelde', 'Ludwigsfelde', 'engineering', 'مصنع إنتاج الشاحنات الصغيرة.'),
    c('BASF Schwarzheide', 'Schwarzheide (near Cottbus)', 'engineering', 'الكيماويات ومواد البطاريات.'),
    c('LEAG', 'Cottbus', 'business', 'شركة طاقة في مرحلة الانتقال من الفحم للطاقة المتجددة.'),
    c('SAP & Hasso Plattner Institute', 'Potsdam', 'cs', 'أبحاث وتطوير البرمجيات.'),
  ],
  HB: [
    c('Airbus', 'Bremen', 'engineering', 'أنظمة أجنحة الطائرات والفضاء.'),
    c('OHB', 'Bremen', 'engineering', 'الأقمار الصناعية والأنظمة الفضائية.'),
    c('Mercedes-Benz Bremen', 'Bremen', 'engineering', 'من أكبر مصانع السيارات في المجموعة.'),
    c('BLG Logistics', 'Bremen / Bremerhaven', 'business', 'لوجستيات الموانئ والسيارات.'),
    c('Eurogate', 'Bremerhaven', 'business', 'محطات الحاويات.'),
    c('Atlas Elektronik', 'Bremen', 'cs', 'الإلكترونيات والبرمجيات البحرية.'),
  ],
  HH: [
    c('Airbus', 'Hamburg-Finkenwerder', 'engineering', 'التجميع النهائي لطائرات A320 وهندسة المقصورات.'),
    c('Lufthansa Technik', 'Hamburg', 'engineering', 'صيانة وهندسة الطائرات.'),
    c('Hapag-Lloyd', 'Hamburg', 'business', 'من أكبر خطوط شحن الحاويات في العالم.'),
    c('Beiersdorf', 'Hamburg', 'business', 'صانع نيفيا: تسويق وسلاسل إمداد ومالية.'),
    c('Otto Group', 'Hamburg', 'business', 'مجموعة التجارة الإلكترونية والتجزئة.'),
    c('Google Hamburg', 'Hamburg', 'cs', 'وظائف المبيعات والتقنية.'),
    c('New Work (XING)', 'Hamburg', 'cs', 'منصة الشبكات المهنية.'),
  ],
  HE: [
    c('Opel (Stellantis)', 'Rüsselsheim', 'engineering', 'مركز هندسي بجانب جامعة RheinMain.'),
    c('Merck', 'Darmstadt', 'engineering', 'العلوم والتكنولوجيا: كيمياء وإلكترونيات وصحة.'),
    c('Continental', 'Frankfurt', 'engineering', 'أنظمة السيارات.'),
    c('Viessmann', 'Allendorf (Eder)', 'engineering', 'تقنيات التدفئة والمناخ.'),
    c('B. Braun', 'Melsungen (near Kassel)', 'engineering', 'الأجهزة الطبية.'),
    c('Volkswagen Kassel', 'Baunatal', 'engineering', 'مصنع المحركات الكهربائية والمكونات.'),
    c('Fraport', 'Frankfurt', 'business', 'مشغّل مطار فرانكفورت.'),
    c('Deutsche Bank, Commerzbank & DZ BANK', 'Frankfurt', 'business', 'البنوك والمالية.'),
    c('Deutsche Börse', 'Frankfurt / Eschborn', 'business', 'البورصة والبنية التحتية للأسواق.'),
    c('ESA ESOC', 'Darmstadt', 'cs', 'مركز التحكم بمهمات وكالة الفضاء الأوروبية.'),
    c('Software AG', 'Darmstadt', 'cs', 'برمجيات المؤسسات.'),
  ],
  MV: [
    c('Nordex', 'Rostock', 'engineering', 'توربينات الرياح.'),
    c('Liebherr', 'Rostock', 'engineering', 'الرافعات البحرية.'),
    c('AIDA Cruises', 'Rostock', 'business', 'المقر الرئيسي لخط الرحلات البحرية.'),
  ],
  NI: [
    c('Volkswagen', 'Wolfsburg, Emden, Hanover, Salzgitter', 'engineering', 'المقر في فولفسبورغ؛ ومصنع إمدن بجانب HS Emden/Leer.'),
    c('Continental', 'Hanover', 'engineering', 'الإطارات وتقنيات السيارات.'),
    c('Enercon', 'Aurich (near Emden)', 'engineering', 'توربينات الرياح.'),
    c('Meyer Werft', 'Papenburg', 'engineering', 'حوض بناء السفن السياحية.'),
    c('Sartorius', 'Göttingen', 'engineering', 'معدات المختبرات والعمليات الحيوية.'),
    c('Ottobock', 'Duderstadt (near Göttingen)', 'engineering', 'الأطراف الصناعية والتكنولوجيا الطبية.'),
    c('TUI', 'Hanover', 'business', 'مجموعة السياحة.'),
    c('Hannover Re & Talanx', 'Hanover', 'business', 'التأمين وإعادة التأمين.'),
  ],
  NW: [
    c('Ford', 'Cologne', 'engineering', 'المقر الأوروبي ومصنع السيارات الكهربائية.'),
    c('thyssenkrupp', 'Essen / Duisburg', 'engineering', 'الصلب والمواد والهندسة الصناعية.'),
    c('Phoenix Contact', 'Blomberg (near Lemgo)', 'engineering', 'تقنيات التوصيل الكهربائي والأتمتة.'),
    c('Miele', 'Gütersloh (near Bielefeld)', 'engineering', 'الأجهزة المنزلية.'),
    c('FORVIA HELLA', 'Lippstadt', 'engineering', 'إضاءة وإلكترونيات السيارات، بجانب HSHL.'),
    c('RWE & E.ON', 'Essen', 'engineering', 'شركات الطاقة.'),
    c('Bayer', 'Leverkusen', 'business', 'الأدوية وعلوم المحاصيل.'),
    c('DHL Group', 'Bonn', 'business', 'اللوجستيات، قرب سانكت أوغستين.'),
    c('REWE Group & ALDI', 'Cologne / Essen / Mülheim', 'business', 'التجزئة.'),
    c('Bertelsmann', 'Gütersloh', 'business', 'الإعلام والخدمات.'),
    c('Deutsche Telekom', 'Bonn', 'cs', 'الاتصالات وتقنية المعلومات.'),
    c('adesso & Materna', 'Dortmund', 'cs', 'استشارات تقنية المعلومات والبرمجيات.'),
    c('Vodafone Germany', 'Düsseldorf', 'cs', 'الاتصالات.'),
  ],
  RP: [
    c('BASF', 'Ludwigshafen', 'engineering', 'أكبر موقع كيماويات في العالم.'),
    c('Boehringer Ingelheim', 'Ingelheim (near Bingen)', 'engineering', 'أبحاث وإنتاج الأدوية.'),
    c('Daimler Truck', 'Wörth (near Germersheim)', 'engineering', 'أكبر مصنع شاحنات في العالم.'),
    c('SCHOTT', 'Mainz', 'engineering', 'الزجاج المتخصص.'),
    c('BioNTech', 'Mainz', 'business', 'التكنولوجيا الحيوية.'),
    c('IONOS', 'Montabaur', 'cs', 'استضافة المواقع والسحابة.'),
    c('DFKI & Fraunhofer', 'Kaiserslautern', 'cs', 'معاهد أبحاث الذكاء الاصطناعي والبرمجيات.'),
  ],
  SL: [
    c('ZF', 'Saarbrücken', 'engineering', 'مصنع نواقل الحركة.'),
    c('Bosch & Schaeffler', 'Homburg', 'engineering', 'مكونات السيارات.'),
    c('Villeroy & Boch', 'Mettlach', 'business', 'علامة السيراميك.'),
    c('Globus', 'St. Wendel', 'business', 'سلسلة متاجر تجزئة.'),
    c('DFKI & CISPA', 'Saarbrücken', 'cs', 'أبحاث الذكاء الاصطناعي والأمن السيبراني.'),
  ],
  SN: [
    c('Volkswagen Sachsen', 'Zwickau / Dresden', 'engineering', 'إنتاج السيارات الكهربائية، بجانب WHZ تسفيكاو.'),
    c('BMW & Porsche', 'Leipzig', 'engineering', 'مصانع سيارات.'),
    c('Infineon & GlobalFoundries', 'Dresden', 'engineering', 'إنتاج الرقائق الإلكترونية ("وادي السيليكون الساكسوني").'),
    c('Bosch', 'Dresden', 'engineering', 'مصنع أشباه موصلات.'),
    c('DHL Hub Leipzig', 'Leipzig', 'business', 'أكبر مركز شحن جوي لشركة DHL.'),
    c('SAP', 'Dresden', 'cs', 'مركز تطوير البرمجيات.'),
  ],
  ST: [
    c('Dow', 'Schkopau (near Merseburg)', 'engineering', 'إنتاج الكيماويات.'),
    c('TotalEnergies', 'Leuna (near Merseburg)', 'engineering', 'مصفاة ومجمع كيماويات.'),
    c('Enercon', 'Magdeburg', 'engineering', 'إنتاج توربينات الرياح.'),
    c('Fraunhofer IFF', 'Magdeburg', 'cs', 'أبحاث أتمتة المصانع.'),
  ],
  SH: [
    c('Drägerwerk', 'Lübeck', 'engineering', 'التكنولوجيا الطبية وتقنيات السلامة.'),
    c('thyssenkrupp Marine Systems', 'Kiel', 'engineering', 'بناء السفن.'),
    c('Danfoss', 'Flensburg', 'engineering', 'الضواغط وأنظمة الدفع.'),
    c('Dataport', 'Kiel / Altenholz', 'cs', 'تقنية المعلومات للقطاع العام.'),
  ],
  TH: [
    c('ZEISS', 'Jena', 'engineering', 'البصريات والتكنولوجيا الطبية.'),
    c('Jenoptik & SCHOTT', 'Jena', 'engineering', 'الفوتونيات والزجاج المتخصص.'),
    c('Bosch', 'Eisenach', 'engineering', 'إلكترونيات السيارات.'),
    c('Opel (Stellantis)', 'Eisenach', 'engineering', 'مصنع سيارات.'),
    c('CATL', 'Arnstadt', 'engineering', 'مصنع خلايا البطاريات.'),
    c('Intershop', 'Jena', 'cs', 'برمجيات التجارة الإلكترونية.'),
  ],
}

export const careerFairs = {
  national: [
    { name: 'معارض bonding للشركات', where: 'آخن، برلين، بوخوم، براونشفايغ، دريسدن، إرلانغن، هامبورغ، كايزرسلاوترن، كارلسروه، ماغدبورغ، ميونخ، شتوتغارت', when: 'كل فصل (المواعيد حسب المدينة)', text: 'معارض مجانية للهندسة وتقنية المعلومات ينظمها الطلاب.', search: 'bonding Firmenkontaktmesse' },
    { name: 'يوم التوظيف VDI Recruiting Tag', where: 'مدن كثيرة', when: 'طوال السنة', text: 'أيام توظيف للمهندسين تنظمها جمعية المهندسين الألمان.', search: 'VDI Recruiting Tag' },
    { name: 'معرض الشركات في جامعتك (Firmenkontaktmesse)', where: 'داخل الحرم', when: 'مرة أو مرتين في السنة عادةً', text: 'كل جامعة تقريباً تنظم معرض شركات. اسأل مركز التوظيف من أول يوم.', search: 'Firmenkontaktmesse Hochschule' },
  ],
  BW: [{ name: 'معرض KIT للتوظيف وbonding كارلسروه/شتوتغارت', when: 'كل فصل', where: 'كارلسروه، شتوتغارت', search: 'KIT Karrieremesse bonding Karlsruhe' }],
  BY: [
    { name: 'IKOM (جامعة TUM)', when: 'مرة في السنة عادةً', where: 'غارشينغ قرب ميونخ', search: 'IKOM TUM' },
    { name: 'akademika', when: 'مرة في السنة عادةً', where: 'نورنبيرغ', search: 'akademika Nürnberg' },
    { name: 'bonding ميونخ / إرلانغن', when: 'كل فصل', where: 'ميونخ، إرلانغن', search: 'bonding München Erlangen' },
  ],
  BE: [{ name: 'bonding برلين', when: 'كل فصل', where: 'برلين', search: 'bonding Berlin' }],
  BB: [{ name: 'معارض التوظيف في برلين', when: 'كل فصل', where: 'برلين، على بُعد 30–60 دقيقة', search: 'Karrieremesse Berlin Studenten' }],
  HB: [{ name: 'أيام التوظيف في HS Bremen وHS Bremerhaven', when: 'كل فصل', where: 'بريمن، بريمرهافن', search: 'Karrieretag Hochschule Bremen' }],
  HH: [{ name: 'bonding هامبورغ', when: 'كل فصل', where: 'هامبورغ', search: 'bonding Hamburg' }],
  HE: [{ name: 'konaktiva دارمشتات', when: 'مرة أو مرتين في السنة', where: 'دارمشتات', search: 'konaktiva Darmstadt' }],
  MV: [{ name: 'معارض التوظيف في روستوك وهامبورغ', when: 'كل فصل', where: 'روستوك، هامبورغ', search: 'Karrieremesse Rostock' }],
  NI: [{ name: 'bonding براونشفايغ', when: 'كل فصل', where: 'براونشفايغ', search: 'bonding Braunschweig' }],
  NW: [
    { name: 'bonding آخن / بوخوم', when: 'كل فصل', where: 'آخن، بوخوم', search: 'bonding Aachen Bochum' },
    { name: 'konaktiva دورتموند', when: 'مرة أو مرتين في السنة', where: 'دورتموند', search: 'konaktiva Dortmund' },
  ],
  RP: [{ name: 'bonding كايزرسلاوترن', when: 'كل فصل', where: 'كايزرسلاوترن', search: 'bonding Kaiserslautern' }],
  SL: [{ name: 'أيام التوظيف في htw saar وجامعة زارلاند', when: 'كل فصل', where: 'زاربروكن', search: 'Karrieretag htw saar' }],
  SN: [{ name: 'bonding دريسدن', when: 'كل فصل', where: 'دريسدن', search: 'bonding Dresden' }],
  ST: [{ name: 'bonding ماغدبورغ', when: 'كل فصل', where: 'ماغدبورغ', search: 'bonding Magdeburg' }],
  SH: [{ name: 'أيام التوظيف في كيل ولوبيك وهامبورغ', when: 'كل فصل', where: 'كيل، لوبيك، هامبورغ', search: 'Karrieremesse Kiel Lübeck' }],
  TH: [{ name: 'معارض الشركات في TU Ilmenau وEAH Jena وFH Erfurt', when: 'كل فصل عادةً', where: 'إلميناو، ينا، إرفورت', search: 'Firmenkontaktmesse Ilmenau Jena Erfurt' }],
}

export const applicationSteps = [
  { when: 'الشهر الأول', title: 'جهّز أوراقك', text: 'سيرة ذاتية بالأسلوب الألماني (Lebenslauf، صفحة أو صفحتان، مع صورة وتواريخ)، ورسالة تغطية من صفحة لكل شركة (Anschreiben)، وكشف علامات GJU بالإنجليزية أو الألمانية، ورسالة GJU التي تؤكد أن التدريب إلزامي.' },
  { when: 'الشهر 1–2', title: 'ابحث واصنع قائمة', text: 'ابحث عن "Pflichtpraktikum" مع تخصصك ومدينتك على StepStone وIndeed وLinkedIn وصفحات الشركات. الشركات المتوسطة قرب جامعتك ترد أكثر من العلامات الكبيرة.' },
  { when: 'الشهر 2–4', title: 'قدّم بكثرة', text: 'أرسل 30–60 طلباً مخصصاً. الشركات تخطط قبل 3–6 أشهر. استخدم معارض الشركات للحديث مع المسؤولين وجهاً لوجه.' },
  { when: 'المقابلات', title: 'استعد بالألمانية والإنجليزية', text: 'توقع مقابلة هاتفية أو بالفيديو، وأحياناً اختباراً تقنياً. وضّح أن التدريب إلزامي لشهادتك وحدد التواريخ بدقة.' },
  { when: 'العرض', title: 'احصل على موافقة GJU أولاً', text: 'أرسل العرض لـGJU للموافقة قبل التوقيع. تأكد من ساعات العمل والراتب وتاريخ البدء والمكان.' },
  { when: 'قبل البدء', title: 'رتّب الأوراق', text: 'تأكد من صيغة تصريح إقامتك، وأبلغ عن ترك غرفتك إن كنت ستنتقل، وألغِ تسجيلك (Abmeldung)، وسجّل في المدينة الجديدة خلال 14 يوماً.' },
]

export const applicationTips = [
  'اكتب "Pflichtpraktikum im Rahmen meines Studiums" (تدريب إلزامي ضمن دراستي) في عنوان الرسالة. التدريب الإلزامي أسهل على الشركات.',
  'الشركات الألمانية تقرأ السيرة الذاتية بدقة: بلا فجوات، بأشهر محددة، وقسم مهارات قصير يذكر مستوى ألمانيتك (مثلاً "Deutsch – B2").',
  'الصورة البسيطة الاحترافية ما زالت شائعة في السير الذاتية الألمانية.',
  'خصّص كل رسالة تغطية للشركة. اذكر القسم ولماذا تهمك منتجاتهم.',
  'تابع بلطف بعد أسبوع أو أسبوعين إن لم يصلك رد.',
  'اسأل طلاب GJU من السنوات السابقة أين تدربوا. الشركات التي استقبلت طالباً من GJU غالباً ترحب بآخر.',
  'الراتب: التدريب الإلزامي يمكن قانونياً أن يكون بلا أجر، لكن كثيراً من شركات الهندسة والتقنية تدفع مكافأة شهرية. اسأل عنها في المقابلة.',
]

export const jobPortals = [
  { name: 'StepStone', url: 'https://www.stepstone.de/', text: 'أكبر موقع وظائف في ألمانيا' },
  { name: 'Indeed', url: 'https://de.indeed.com/', text: 'ابحث عن "Pflichtpraktikum"' },
  { name: 'LinkedIn Jobs', url: 'https://www.linkedin.com/jobs/', text: 'جيد للفرق التي تعمل بالإنجليزية' },
  { name: 'XING Jobs', url: 'https://www.xing.com/jobs', text: 'الشبكة المهنية الألمانية' },
  { name: 'Praktikum.info', url: 'https://www.praktikum.info/', text: 'إعلانات التدريب فقط' },
  { name: 'Make it in Germany', url: 'https://www.make-it-in-germany.com/en/', text: 'البوابة الرسمية للعمل في ألمانيا' },
]

export const jobSearch = (company, city) =>
  `https://www.google.com/search?q=${encodeURIComponent(`${company} Pflichtpraktikum ${city.split(/[,/(]/)[0].trim()}`)}`
export const fairSearch = (f) => `https://www.google.com/search?q=${encodeURIComponent(`${f.search ?? f.name} Termin`)}`
