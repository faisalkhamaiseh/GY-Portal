// نموذج تكاليف السنة الألمانية. التكاليف الرسمية الثابتة (الحساب المجمّد، التأمين
// الصحي، رسوم البث، التذكرة الفصلية، التصاريح) بأسعارها الحالية الدقيقة. الأسعار
// اليومية نطاقات تقديرية تُعرض مع شارة "تقديري".

// الصرف الشهري من الحساب المجمّد لتأشيرة الدراسة في 2026 (11,904 يورو للسنة).
export const BLOCKED_MONTHLY = 992

// نطاقات الإيجار لكل فئة مدينة: [أدنى، أعلى] شهرياً، شاملة الفواتير.
export const tiers = {
  1: { label: 'غالية جداً', note: 'ميونخ', dorm: [320, 480], wg: [650, 850], flat: [950, 1350], factor: 1.2 },
  2: { label: 'غالية', note: 'المدن الغربية الكبيرة', dorm: [290, 420], wg: [520, 700], flat: [750, 1100], factor: 1.1 },
  3: { label: 'فوق المتوسط', note: 'المدن الجامعية الكبيرة', dorm: [260, 380], wg: [420, 560], flat: [600, 850], factor: 1.0 },
  4: { label: 'متوسطة', note: 'المدن المتوسطة', dorm: [240, 340], wg: [340, 460], flat: [480, 700], factor: 0.95 },
  5: { label: 'رخيصة', note: 'المدن الصغيرة والشرق', dorm: [220, 310], wg: [260, 380], flat: [360, 540], factor: 0.9 },
}

// المدينة ← الفئة. أي مدينة غير مذكورة تُعتبر من الفئة 4.
export const cityTier = {
  'München': 1,
  Berlin: 2, Hamburg: 2, 'Frankfurt am Main': 2, Stuttgart: 2, 'Köln': 2, Darmstadt: 2, Wiesbaden: 2, Mainz: 2,
  Heidelberg: 2, Potsdam: 2,
  Mannheim: 3, Karlsruhe: 3, 'Nürnberg': 3, Augsburg: 3, Regensburg: 3, Ingolstadt: 3, 'Würzburg': 3, Rosenheim: 3,
  Hannover: 3, Bremen: 3, Aachen: 3, 'Münster': 3, Bochum: 3, Dortmund: 3, Ulm: 3, 'Neu-Ulm': 3, Reutlingen: 3,
  'Göttingen': 3, Marburg: 3, Giessen: 3, Leipzig: 3, Dresden: 3, 'Lübeck': 3, Jena: 3, 'Sankt Augustin': 3,
  'Rüsselsheim am Main': 3, Dieburg: 3, Heilbronn: 3, Landshut: 3, Kempten: 3, Bielefeld: 3, Krefeld: 3, Oldenburg: 3,
  'Osnabrück': 3, Kaiserslautern: 4, Trier: 4, Koblenz: 4, Worms: 4, Bingen: 4, Remagen: 4, 'Saarbrücken': 4, Kassel: 4, Fulda: 4,
  Wuppertal: 4, Siegen: 4, Hamm: 4, Lippstadt: 4, Gummersbach: 4, Detmold: 4, Lemgo: 4, 'Höxter': 5, Erfurt: 4,
  Weimar: 4, Flensburg: 4, Aalen: 4, Biberach: 4, Albstadt: 5, Sigmaringen: 5, 'Nürtingen': 4, Offenburg: 4,
  'Villingen-Schwenningen': 4, Heidenheim: 4, 'Bad Mergentheim': 4, Amberg: 5, Weiden: 5, Bayreuth: 4, Coburg: 4,
  Schweinfurt: 4, Aschaffenburg: 4, Deggendorf: 4, 'Wolfenbüttel': 4, Emden: 5, Wilhelmshaven: 5, Bremerhaven: 5,
  Germersheim: 4, 'Hoppstädten-Weiersbach': 5, Wildau: 4, 'Brandenburg an der Havel': 5, Cottbus: 5,
  Magdeburg: 5, Stendal: 5, Merseburg: 5, Dessau: 5, 'Köthen': 5, Wernigerode: 5, Chemnitz: 5, Zwickau: 5,
  Freiberg: 5, Mittweida: 5, Ilmenau: 5, Nordhausen: 5, Schmalkalden: 5, Neubrandenburg: 5, Stralsund: 5,
}

// أسعار محلية موثّقة (من دليل شمالكالدن).
export const cityOverrides = {
  Schmalkalden: { dorm: [231, 300], wg: [230, 350], flat: [320, 480] },
}

export function rentFor(city) {
  const tier = tiers[cityTier[city] ?? 4]
  return { ...tier, ...(cityOverrides[city] || {}), tier: cityTier[city] ?? 4 }
}

// قائمة الأسعار اليومية. العناصر `fixed: true` ثابتة في كل ألمانيا؛
// الباقي يُضرب بمعامل فئة المدينة.
export const priceGroups = [
  {
    id: 'fees',
    title: 'الرسوم والأوراق',
    icon: 'FileText',
    items: [
      { name: 'الرسوم الفصلية', min: 280, max: 420, unit: 'semester', fixed: true, note: 'تحددها كل جامعة، وتشمل التذكرة الفصلية بـ226.80 يورو. جامعة شمالكالدن: 331.80 يورو للفصل الشتوي 2026/27.' },
      { name: 'صرف الحساب المجمّد', min: 992, max: 992, unit: 'month', fixed: true, note: 'المبلغ الرسمي لتأشيرة الدراسة في 2026: 11,904 يورو لـ12 شهراً. للمزوّد رسوم لمرة واحدة.' },
      { name: 'التأمين الصحي الحكومي', min: 141.16, max: 141.16, unit: 'month', fixed: true, note: 'اشتراك الطلاب في TK لعام 2026 لمن هم دون 23. من عمر 23 بدون أطفال: 146.29 يورو. باقي الشركات الحكومية تفرق ببضعة يوروهات.' },
      { name: 'التأشيرة (تأشيرة وطنية D)', min: 75, max: 75, unit: 'once', fixed: true, note: 'تُدفع في السفارة الألمانية في عمّان.' },
      { name: 'تصريح الإقامة', min: 100, max: 100, unit: 'once', fixed: true, note: 'أول تصريح من مكتب الأجانب (Ausländerbehörde). تمديده لأكثر من 3 أشهر: 93 يورو.' },
      { name: 'رسوم البث (Rundfunkbeitrag)', min: 18.36, max: 18.36, unit: 'month', fixed: true, note: 'لكل شقة وتُقسم بين السكان: 6.12 يورو لكل شخص إذا كنتم ثلاثة.' },
      { name: 'صور بيومترية', min: 10, max: 15, unit: 'once', note: 'كشك تصوير أو صيدلية تجميل (dm، Rossmann).' },
    ],
  },
  {
    id: 'housing',
    title: 'مصاريف السكن الإضافية',
    icon: 'Home',
    items: [
      { name: 'التأمين (Kaution)', min: 300, max: 1500, unit: 'once', fixed: true, note: 'السكن الطلابي حوالي 300 يورو؛ الشقق الخاصة حتى 3 أشهر من الإيجار البارد.' },
      { name: 'إنترنت المنزل', min: 10, max: 30, unit: 'month', note: 'إنترنت السكن الطلابي أحياناً منفصل، أو قسّم عقد الشقة المشتركة.' },
      { name: 'أثاث وأدوات مطبخ أساسية', min: 50, max: 200, unit: 'once', note: 'Kleinanzeigen وIKEA وما يتركه الطلاب المغادرون.' },
      { name: 'أغطية سرير ومناشف', min: 40, max: 80, unit: 'once', note: 'IKEA وPrimark وTK Maxx.' },
      { name: 'تأمين المسؤولية الشخصية', min: 3, max: 6, unit: 'month', note: 'Haftpflicht: رخيص وننصح به بشدة.' },
    ],
  },
  {
    id: 'food',
    title: 'الطعام والبقالة',
    icon: 'ShoppingBasket',
    items: [
      { name: 'البقالة', min: 150, max: 230, unit: 'month', note: 'الطبخ في البيت والتسوق من Aldi وLidl وNetto وPenny وKaufland.' },
      { name: 'وجبة رئيسية في المطعم الجامعي', min: 2.5, max: 4.8, unit: 'meal', note: 'بسعر الطلاب مع بطاقتك الجامعية.' },
      { name: 'خبز صغير (Brötchen)', min: 0.4, max: 0.8, unit: 'piece', note: 'خبز السوبرماركت أرخص من المخبز.' },
      { name: 'دجاج حلال (1 كغ)', min: 7, max: 11, unit: 'kg', note: 'من السوبرماركتات التركية والعربية.' },
      { name: 'أرز (1 كغ)', min: 1.5, max: 3, unit: 'kg', note: 'البسمتي أغلى.' },
      { name: 'علبة حمص أو طحينة', min: 2, max: 4, unit: 'jar', note: 'المحلات العربية والسوبرماركتات الكبيرة.' },
      { name: 'حليب (1 لتر)', min: 1, max: 1.3, unit: 'litre' },
      { name: 'بيض (10)', min: 2.5, max: 3.5, unit: 'pack' },
    ],
  },
  {
    id: 'eating-out',
    title: 'الأكل خارج البيت والمشروبات',
    icon: 'UtensilsCrossed',
    items: [
      { name: 'دونر أو فلافل', min: 7, max: 9, unit: 'meal', note: 'الوجبة الأساسية للطلاب.' },
      { name: 'بيتزا في مطعم', min: 9, max: 14, unit: 'meal' },
      { name: 'طبق رئيسي في مطعم', min: 13, max: 22, unit: 'meal' },
      { name: 'صحن شاورما', min: 10, max: 15, unit: 'meal', note: 'المطاعم العربية في المدن الكبيرة.' },
      { name: 'قهوة / كابتشينو', min: 2.5, max: 4.5, unit: 'cup', note: 'أرخص في مقهى الجامعة.' },
      { name: 'مشروب غازي أو عصير في مقهى', min: 3, max: 4.5, unit: 'glass' },
      { name: 'زجاجة ماء (سوبرماركت)', min: 0.3, max: 0.8, unit: 'bottle', note: 'زائد تأمين صغير يُسترد. ماء الحنفية صالح للشرب.' },
      { name: 'كرة آيس كريم', min: 1.8, max: 2.5, unit: 'scoop' },
    ],
  },
  {
    id: 'transport',
    title: 'المواصلات',
    icon: 'TrainFront',
    items: [
      { name: 'القطارات الإقليمية والباصات في كل ألمانيا', min: 0, max: 0, unit: 'extra', fixed: true, note: 'التذكرة الفصلية (Deutschlandsemesterticket) جزء من الرسوم الفصلية في كل الجامعات المضيفة تقريباً: 226.80 يورو للفصل (37.80 شهرياً) من الفصل الشتوي 2026/27.' },
      { name: 'Deutschlandticket (بدون تذكرة فصلية)', min: 63, max: 63, unit: 'month', fixed: true, note: 'فقط إذا لم تكن لجامعتك تذكرة فصلية. اشتراك شهري تلغيه متى شئت.' },
      { name: 'My BahnCard 25 (دون 27)', min: 39.9, max: 39.9, unit: 'year', fixed: true, note: 'خصم 25% على تذاكر ICE وIC، الدرجة الثانية. ألغِها قبل نهاية السنة بـ6 أسابيع على الأقل وإلا تتجدد.' },
      { name: 'قطار سريع ICE / IC', min: 18, max: 80, unit: 'trip', fixed: true, note: 'احجز مبكراً للحصول على تذاكر Sparpreis.' },
      { name: 'فليكس باص للمدن الكبيرة', min: 10, max: 35, unit: 'trip', fixed: true },
      { name: 'دراجة مستعملة', min: 80, max: 200, unit: 'once', note: 'من Kleinanzeigen أو أسواق الدراجات في الجامعة. اشترِ قفلاً جيداً.' },
      { name: 'رحلة سكوتر كهربائي', min: 3, max: 6, unit: 'ride', note: 'Lime وDott وVoi في المدن الكبيرة.' },
      { name: 'تاكسي (5 كم)', min: 15, max: 22, unit: 'ride' },
      { name: 'طيران إلى عمّان (ذهاب وعودة)', min: 220, max: 480, unit: 'return', fixed: true, note: 'من فرانكفورت أو برلين أو ميونخ. احجز قبل شهرين إلى ثلاثة.' },
    ],
  },
  {
    id: 'services',
    title: 'الخدمات والهاتف',
    icon: 'Smartphone',
    items: [
      { name: 'شريحة مسبقة الدفع مع إنترنت', min: 8, max: 15, unit: 'month', fixed: true, note: 'Aldi Talk وLidl Connect وCongstar وFraenk.' },
      { name: 'حساب بنكي', min: 0, max: 6, unit: 'month', fixed: true, note: 'البنوك الإلكترونية مجانية غالباً.' },
      { name: 'قص شعر', min: 15, max: 25, unit: 'cut', note: 'الحلاقون غالباً أرخص.' },
      { name: 'غسيل (غسالة السكن)', min: 1.5, max: 3, unit: 'wash' },
      { name: 'طباعة (للصفحة)', min: 0.05, max: 0.1, unit: 'page', fixed: true, note: 'طابعات الجامعة ببطاقتك الطلابية.' },
      { name: 'زيارة طبيب', min: 0, max: 0, unit: 'visit', fixed: true, note: 'مشمولة بالتأمين الحكومي. أحضر بطاقتك.' },
      { name: 'دواء بوصفة طبية', min: 5, max: 10, unit: 'item', fixed: true, note: 'مساهمة يحددها القانون: 10% من السعر، بحد أدنى 5 يورو وحد أعلى 10 يورو لكل دواء.' },
    ],
  },
  {
    id: 'fitness',
    title: 'النوادي والرياضة',
    icon: 'Dumbbell',
    items: [
      { name: 'دورات الرياضة الجامعية', min: 0, max: 30, unit: 'semester', fixed: true, note: 'كرة قدم وطائرة وتسلق ولياقة: غالباً مجانية أو شبه مجانية.' },
      { name: 'نادي رياضي اقتصادي (McFit، FitX، clever fit)', min: 20, max: 35, unit: 'month', note: 'انتبه لمدة العقد ورسوم الاشتراك.' },
      { name: 'مسبح عام', min: 3, max: 6, unit: 'entry', note: 'خصم للطلاب مع البطاقة.' },
      { name: 'صالة تسلق', min: 10, max: 15, unit: 'entry' },
      { name: 'حذاء كرة قدم / ملابس رياضية', min: 30, max: 80, unit: 'once', note: 'ديكاتلون الخيار الاقتصادي.' },
    ],
  },
  {
    id: 'fun',
    title: 'الترفيه والأنشطة',
    icon: 'Ticket',
    items: [
      { name: 'سينما', min: 8, max: 13, unit: 'ticket', note: 'أرخص في أيام الخصم (غالباً الثلاثاء أو الأربعاء).' },
      { name: 'متحف', min: 4, max: 10, unit: 'entry', note: 'أسعار طلابية، وكثير من المتاحف مجانية في أيام معينة.' },
      { name: 'زيارة قلعة أو قصر', min: 5, max: 15, unit: 'entry' },
      { name: 'تذكرة مباراة بوندسليغا', min: 15, max: 45, unit: 'ticket', note: 'تذاكر الوقوف الأرخص. احجز مبكراً.' },
      { name: 'غرفة هروب / بولينغ', min: 12, max: 25, unit: 'person' },
      { name: 'دخول حفلة طلابية', min: 3, max: 10, unit: 'entry' },
      { name: 'وجبة خفيفة في سوق الميلاد', min: 3, max: 6, unit: 'item', note: 'لوز محمّص وكريب.' },
      { name: 'رحلة نهاية أسبوع (نُزل + أكل)', min: 60, max: 150, unit: 'trip', note: 'السفر مجاني بالقطارات الإقليمية مع تذكرتك.' },
    ],
  },
  {
    id: 'seasonal',
    title: 'الملابس والمواسم',
    icon: 'Snowflake',
    items: [
      { name: 'جاكيت شتوي', min: 60, max: 150, unit: 'once', note: 'ستحتاجه من نوفمبر إلى مارس.' },
      { name: 'حذاء شتوي', min: 40, max: 100, unit: 'once', note: 'مقاوم للماء. الثلج والوحل شائعان.' },
      { name: 'جاكيت مطر / مظلة', min: 15, max: 60, unit: 'once' },
      { name: 'أدوات العناية الشخصية', min: 25, max: 40, unit: 'month', note: 'dm وRossmann.' },
    ],
  },
]

// المصاريف الثابتة الشهرية في مخطط الميزانية. البنود `exact` أسعار رسمية لعام
// 2026، والباقي تقديري.
export const fixedMonthly = [
  { name: 'التأمين الصحي', amount: 141.16, exact: true },
  { name: 'الرسوم الفصلية ÷ 6', amount: 55.3, exact: true },
  { name: 'الهاتف', amount: 12 },
  { name: 'رسوم البث ÷ 3', amount: 6.12, exact: true },
  { name: 'العناية الشخصية', amount: 35 },
]

// مقرّبة لأقرب يورو لمجاميع المخطط.
export const fixedTotal = Math.round(fixedMonthly.reduce((s, f) => s + f.amount, 0))

export const lifestyles = {
  saver: { label: 'مقتصد', text: 'طبخ دائماً، رحلات نادرة، خروج قليل', food: 170, trips: 20, fun: 30 },
  typical: { label: 'معتدل', text: 'طبخ ومطعم جامعي، رحلتان في الشهر', food: 230, trips: 60, fun: 70 },
  comfort: { label: 'مرتاح', text: 'أكل خارجي كثير، رحلة كل أسبوع وقطار سريع', food: 320, trips: 140, fun: 130 },
}

export const fmt = (n) => (n % 1 === 0 ? `€${n.toLocaleString('en-US')}` : `€${n.toFixed(2)}`)

export const fmtRange = (min, max) => (min === max ? fmt(min) : `${fmt(min)}–${fmt(max).slice(1)}`)

// تقريب السعر المعدّل إلى رقم طبيعي.
export function scale(value, factor, fixed) {
  if (fixed || value === 0) return value
  const v = value * factor
  if (v < 3) return Math.round(v * 10) / 10
  if (v < 30) return Math.round(v * 2) / 2
  return Math.round(v / 5) * 5
}
