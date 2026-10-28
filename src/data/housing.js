// مواقع السكن التي تعمل في كل ألمانيا. `search` يبني رابطاً خاصاً بالمدينة
// إن كان الموقع يدعم ذلك.

const enc = encodeURIComponent
const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const portals = [
  { name: 'WG-Gesucht', url: 'https://www.wg-gesucht.de/', kind: 'غرف في شقق مشتركة', text: 'الموقع الأول للشقق المشتركة في ألمانيا. فعّل تنبيهات البريد وراسل بسرعة.', trust: 'الأكثر استخداماً' },
  { name: 'Kleinanzeigen', url: 'https://www.kleinanzeigen.de/', search: (city) => `https://www.kleinanzeigen.de/s-${slug(`wg zimmer ${city}`)}/k0`, kind: 'غرف وإيجار مؤقت وأثاث', text: 'إعلانات مبوبة للغرف والإيجار المؤقت والدراجات والأثاث الرخيص.' },
  { name: 'ImmoScout24', url: 'https://www.immobilienscout24.de/', kind: 'شقق كاملة', text: 'أكبر موقع لإعلانات الشقق. المؤجرون يطلبون غالباً تقرير SCHUFA الائتماني.' },
  { name: 'Immowelt', url: 'https://www.immowelt.de/', kind: 'شقق كاملة', text: 'ثاني أكبر موقع لإعلانات الشقق.' },
  { name: 'Studenten-WG.de', url: 'https://www.studenten-wg.de/', kind: 'غرف طلابية', text: 'إعلانات غرف للطلاب فقط.' },
  { name: 'WG-Suche.de', url: 'https://www.wg-suche.de/', kind: 'غرف في شقق مشتركة', text: 'موقع أصغر يستحق البحث فيه في المدن الصغيرة.' },
  { name: 'HousingAnywhere', url: 'https://housinganywhere.com/', kind: 'احجز من الخارج', text: 'احجز غرفة من عمّان مع حماية للدفع. الأسعار أعلى، والإعلانات قليلة في المدن الصغيرة.', trust: 'حماية الدفع' },
  { name: 'Wunderflats', url: 'https://wunderflats.com/', kind: 'مفروش، شهري', text: 'شقق مفروشة من شهر إلى 12 شهراً. مناسبة لفترة التدريب العملي.' },
  { name: 'مجموعات فيسبوك', url: 'https://www.facebook.com/groups/', search: (city) => `https://www.facebook.com/search/groups/?q=${enc(`${city} WG`)}`, kind: 'مجتمع', text: 'ابحث عن "[المدينة] WG" و"طلاب [الجامعة]". اسأل طلاب GJU من السنة الماضية: كثيراً ما يسلّمون غرفهم للدفعة التالية.' },
]

export const dormSearch = (city) => `https://www.google.com/search?q=${enc(`Studierendenwerk ${city} Wohnheim`)}`

export const scamRules = [
  'لا ترسل أي تأمين قبل أن ترى الغرفة شخصياً أو بمكالمة فيديو مباشرة.',
  'لا تدفع أبداً عبر Western Union أو MoneyGram أو العملات الرقمية أو بطاقات الهدايا.',
  'المؤجر "المسافر للخارج" الذي سيرسل لك المفاتيح بالبريد نصّاب دائماً.',
  'افحص صور الإعلان ببحث الصور العكسي.',
  'وقّع عقد إيجار مكتوباً (Mietvertrag) واحصل على تأكيد المؤجر (Wohnungsgeberbestätigung)، فأنت تحتاجه لتسجيل العنوان.',
]

export const housingWords = [
  ['Warmmiete', 'إيجار شامل التدفئة وغالباً الماء'],
  ['Kaltmiete', 'إيجار بدون تدفئة وماء وكهرباء'],
  ['Nebenkosten (NK)', 'مصاريف تشغيل إضافية فوق الإيجار البارد'],
  ['Kaution', 'تأمين، عادة 1–3 أشهر من الإيجار البارد'],
  ['WG', 'شقة مشتركة (Wohngemeinschaft)'],
  ['Zwischenmiete', 'إيجار مؤقت لفترة محددة، مثالي لفصل واحد'],
  ['möbliert', 'مفروش'],
  ['Besichtigung', 'موعد معاينة'],
  ['Wohnungsgeberbestätigung', 'تأكيد المؤجر، مطلوب لتسجيل العنوان'],
  ['Studierendenwerk', 'الخدمة الطلابية الحكومية التي تدير السكنات والمطاعم الجامعية'],
]

export const housingTimeline = [
  { when: 'أول يوم بعد القبول', title: 'قدّم على Studierendenwerk', text: 'التقديم يفتح عادةً قبل بداية الفصل بعدة أشهر. الأولوية لمن يقدّم أولاً، فتابع موقع Studierendenwerk لمدينتك.' },
  { when: 'نفس الأسبوع', title: 'راسل طلاب GJU من السنة الماضية', text: 'الغرف تنتقل كثيراً من دفعة لأخرى، فاسأل في مجموعات السنة الألمانية.' },
  { when: 'قبل السفر بـ6–8 أسابيع', title: 'ابدأ البحث الخاص', text: 'فعّل التنبيهات على WG-Gesucht وKleinanzeigen، واكتب رسائل قصيرة لطيفة بالألمانية.' },
  { when: 'عند الوصول', title: 'وقّع وسجّل', text: 'وقّع العقد واحصل على Wohnungsgeberbestätigung، ثم احجز موعد تسجيل العنوان خلال المهلة القانونية.' },
]
