// دليل المكونات للتسوق: أرقام E والمصطلحات الألمانية التي قد تخفي خنزيراً أو
// جيلاتين حيواني أو كحولاً.
//
// status: 'avoid'  = مصدر حيواني أو محرّم في الغالب
//         'check'  = قد يكون نباتياً أو حيوانياً، تحقق من المصدر أو الشهادة
//         'insect' = مصدر حشري، تختلف آراء العلماء فيه
//         'ok'     = نباتي أو صناعي عادةً
// الآراء الفقهية تختلف؛ المنتج المكتوب عليه "vegan" أو شهادة حلال هو الأضمن.

export const statusInfo = {
  avoid: { label: 'تجنّب', text: 'مصدر حيواني أو خنزير في الغالب', color: '#e5484d', bg: 'rgba(229,72,77,0.14)' },
  check: { label: 'مشكوك', text: 'قد يكون نباتياً أو حيوانياً', color: '#f5a524', bg: 'rgba(245,165,36,0.14)' },
  insect: { label: 'حشري', text: 'مصدره حشرات، والآراء تختلف', color: '#b388ff', bg: 'rgba(179,136,255,0.14)' },
  ok: { label: 'آمن غالباً', text: 'نباتي أو صناعي عادةً', color: '#30a46c', bg: 'rgba(48,164,108,0.14)' },
}

export const eNumbers = [
  { code: 'Gelatine', de: 'Gelatine / Speisegelatine', name: 'الجيلاتين', status: 'avoid', text: 'في ألمانيا غالباً من الخنزير ما لم يُكتب Rindergelatine أو Fischgelatine أو Halal-Gelatine. ليس له رقم E لأنه يُعتبر غذاءً (كان سابقاً E441).', where: 'الحلوى الجيلاتينية، الزبادي، الكريمة، الكعك المبرّد، الكبسولات' },
  { code: 'E120', de: 'Karmin / Echtes Karmin / Cochenille', name: 'القرمز (الكارمين)', status: 'insect', text: 'صبغة حمراء مستخلصة من حشرة القرمز.', where: 'المشروبات الحمراء، الحلويات، الزبادي بالفواكه، النقانق' },
  { code: 'E422', de: 'Glycerin', name: 'الجلسرين', status: 'check', text: 'قد يكون من زيوت نباتية أو دهون حيوانية.', where: 'الحلويات، العلكة، المخبوزات' },
  { code: 'E470a', de: 'Salze der Speisefettsäuren', name: 'أملاح الأحماض الدهنية', status: 'check', text: 'من دهون نباتية أو حيوانية.', where: 'الأطعمة المعالجة، المكملات' },
  { code: 'E470b', de: 'Magnesiumsalze der Speisefettsäuren', name: 'أملاح المغنيسيوم للأحماض الدهنية', status: 'check', text: 'من دهون نباتية أو حيوانية.', where: 'الأقراص، البهارات' },
  { code: 'E471', de: 'Mono- und Diglyceride von Speisefettsäuren', name: 'أحادي وثنائي الغليسريد', status: 'check', text: 'من أكثر المستحلبات انتشاراً. قد يُصنع من دهن الخنزير أو من زيوت نباتية. إن لم يُكتب "pflanzlich" فتحقق.', where: 'الخبز الجاهز، الآيس كريم، الشوكولاتة، الكعك، المارجرين' },
  { code: 'E472a–f', de: 'Ester von Mono- und Diglyceriden', name: 'استرات أحادي وثنائي الغليسريد', status: 'check', text: 'مشتقات من E471، فمصدرها الدهني قد يكون حيوانياً.', where: 'المخبوزات، الكريمات، الحلويات' },
  { code: 'E473–E477', de: 'Zuckerester / Polyglycerinester', name: 'استرات السكر والبوليغليسرين', status: 'check', text: 'مبنية على أحماض دهنية قد تكون حيوانية.', where: 'الحلويات، الكريمات المخفوقة، المخبوزات' },
  { code: 'E481–E483', de: 'Stearoyllactylate / Stearyltartrat', name: 'لاكتيلات الستيرويل', status: 'check', text: 'مبنية على حمض الستياريك الذي قد يكون حيوانياً.', where: 'الخبز، التوست، العجائن' },
  { code: 'E491–E495', de: 'Sorbitanester', name: 'استرات السوربيتان', status: 'check', text: 'مبنية على أحماض دهنية قد تكون حيوانية.', where: 'الخميرة الجافة، الطلاءات، الحلويات' },
  { code: 'E432–E436', de: 'Polysorbate', name: 'البوليسوربات', status: 'check', text: 'مبنية على أحماض دهنية قد تكون حيوانية.', where: 'الآيس كريم، الصلصات، الحلويات' },
  { code: 'E542', de: 'Knochenphosphat', name: 'فوسفات العظام', status: 'avoid', text: 'مستخلص من عظام الحيوانات.', where: 'مضاد للتكتل في بعض الأطعمة' },
  { code: 'E570', de: 'Fettsäuren / Stearinsäure', name: 'الأحماض الدهنية (حمض الستياريك)', status: 'check', text: 'من دهون نباتية أو حيوانية.', where: 'العلكة، الحلويات، الأقراص' },
  { code: 'E572', de: 'Magnesiumstearat', name: 'ستيرات المغنيسيوم', status: 'check', text: 'قد يكون حيوانياً أو نباتياً.', where: 'الأقراص والمكملات والحلويات المضغوطة' },
  { code: 'E627 / E631 / E635', de: 'Guanylat / Inosinat / Ribonukleotide', name: 'معززات النكهة', status: 'check', text: 'تُنتج غالباً بالتخمير، وأحياناً من اللحم أو السمك.', where: 'الشيبس، الشوربات الجاهزة، المرق، البهارات' },
  { code: 'E904', de: 'Schellack', name: 'الشيلاك', status: 'insect', text: 'مادة لامعة تفرزها حشرة اللك.', where: 'تلميع الحلويات والفواكه والأقراص' },
  { code: 'E920', de: 'L-Cystein', name: 'إل-سيستئين', status: 'check', text: 'مُحسّن للدقيق، قد يُستخرج من الريش أو الشعر الحيواني، أو يُصنع صناعياً.', where: 'الخبز والكعك الصناعي' },
  { code: 'E322', de: 'Lecithin', name: 'الليسيثين', status: 'ok', text: 'من الصويا أو دوار الشمس غالباً (نادراً من البيض).', where: 'الشوكولاتة، المخبوزات' },
  { code: 'E440', de: 'Pektin', name: 'البكتين', status: 'ok', text: 'مادة هلامية نباتية من التفاح والحمضيات.', where: 'المربيات، الحلوى الجيلاتينية النباتية' },
  { code: 'E406', de: 'Agar-Agar', name: 'الأغار', status: 'ok', text: 'مادة هلامية من الطحالب البحرية.', where: 'الحلويات النباتية، البودينغ' },
  { code: 'E407', de: 'Carrageen', name: 'الكاراجينان', status: 'ok', text: 'من الطحالب الحمراء.', where: 'الحليب بالنكهات، البودينغ، الكريمة' },
  { code: 'E410 / E412', de: 'Johannisbrotkernmehl / Guarkernmehl', name: 'صمغ الخروب وصمغ الغوار', status: 'ok', text: 'مثخّنات نباتية من البذور.', where: 'الآيس كريم، الصلصات، الألبان' },
  { code: 'E901', de: 'Bienenwachs', name: 'شمع العسل', status: 'ok', text: 'من النحل، ويعتبر حلالاً عند معظم العلماء.', where: 'تلميع الحلويات والفواكه' },
]

export const hiddenTerms = [
  { de: 'Schweinefleisch / Schwein', ar: 'لحم خنزير / خنزير', status: 'avoid', text: 'واضح، لكنه يظهر في أماكن غير متوقعة: الصلصات والشوربات والبيتزا المجمدة.' },
  { de: 'Speck / Schinken', ar: 'لحم خنزير مقدد / جامبون', status: 'avoid', text: 'شائع في السلطات والمعجنات والكيش.' },
  { de: 'Schmalz / Schweineschmalz', ar: 'دهن الخنزير (شحم)', status: 'avoid', text: 'يُستخدم في بعض المخابز والمقالي والمخبوزات التقليدية.' },
  { de: 'Gelatine / Speisegelatine', ar: 'جيلاتين / جيلاتين غذائي', status: 'avoid', text: 'غالباً من الخنزير. الآمن: Rindergelatine (بقري حلال)، Fischgelatine (سمك)، Halal-Gelatine.' },
  { de: 'Ethylalkohol / Alkohol / Weingeist', ar: 'كحول إيثيلي / كحول', status: 'avoid', text: 'يُرش أحياناً على الخبز المعبأ والتوست ليبقى طازجاً، ويوجد في بعض الحلويات والكريمات.' },
  { de: 'Rum / Weinbrand / Likör / Kirschwasser', ar: 'روم / براندي / ليكيور', status: 'avoid', text: 'في الشوكولاتة المحشوة (Mon Chéri) وكرات الروم (Rumkugeln) وكعكة الغابة السوداء وكعك عيد الميلاد.' },
  { de: 'Aroma (in Alkohol gelöst)', ar: 'منكّه (مذاب في الكحول)', status: 'check', text: 'بعض النكهات تُحمل في كحول. الكمية صغيرة جداً، والآراء تختلف.' },
  { de: 'tierisches Fett / Tierfett', ar: 'دهن حيواني', status: 'check', text: 'نوع الحيوان غير محدد. تجنبه إن لم يُذكر المصدر.' },
  { de: 'Lab / tierisches Lab', ar: 'منفحة حيوانية (في الأجبان)', status: 'check', text: 'من معدة العجل غالباً. الآمن: mikrobielles Lab أو "vegetarisch" على الجبن.' },
  { de: 'Molke / Molkenpulver', ar: 'مصل اللبن', status: 'check', text: 'من الحليب، لكنه قد يُنتج باستخدام منفحة حيوانية.' },
  { de: 'Kollagen', ar: 'كولاجين', status: 'avoid', text: 'من جلد أو عظام الحيوانات، وغالباً الخنزير. في أغلفة النقانق وبعض المكملات.' },
  { de: 'Bier / Wein (in Soße, Brot)', ar: 'بيرة / نبيذ (في الصلصة والخبز)', status: 'avoid', text: 'بعض أنواع الخبز (Bierbrot) والصلصات والخردل فيها بيرة أو نبيذ.' },
  { de: 'vegan', ar: 'نباتي صرف', status: 'ok', text: 'لا مكونات حيوانية إطلاقاً. أسهل علامة للتسوق الآمن (لكن انتبه للكحول).' },
  { de: 'pflanzlich / vegetarisch', ar: 'نباتي', status: 'ok', text: '"vegetarisch" قد يحتوي حليباً وبيضاً، لكن بلا لحم أو جيلاتين.' },
]

export const gelling = {
  plant: {
    title: 'مواد التهلّم النباتية',
    de: 'Pflanzliches Geliermittel',
    status: 'ok',
    text: 'تُستخرج من النباتات والطحالب، وهي آمنة. ابحث عن هذه الكلمات على الحلويات والمربيات والبودينغ:',
    list: ['Pektin (E440): من التفاح والحمضيات', 'Agar-Agar (E406): من الطحالب', 'Carrageen (E407): من الطحالب الحمراء', 'Johannisbrotkernmehl (E410): من بذور الخروب', 'Stärke: نشا الذرة أو البطاطا'],
  },
  animal: {
    title: 'الجيلاتين الحيواني',
    de: 'Speisegelatine',
    status: 'avoid',
    text: 'يُصنع من جلد وعظام الحيوانات. في ألمانيا معظمه من الخنزير، والقليل من البقر غير المذبوح حلالاً:',
    list: ['Gelatine / Speisegelatine: غالباً خنزير', 'Schweinegelatine: خنزير بالتأكيد', 'Rindergelatine: بقري (ليس حلالاً بالضرورة)', 'Halal-Gelatine: الخيار الحلال المعتمد', 'Fischgelatine: من السمك، آمن عند معظم العلماء'],
  },
}

export const shoppingTips = [
  'العلامات الآمنة: "vegan" أو شعار "Halal" معتمد أو "ohne Gelatine" (بدون جيلاتين).',
  'الحلوى الجيلاتينية الحلال (مثل Haribo Halal) تُباع في المحلات التركية والعربية، وأحياناً في السوبرماركتات الكبيرة.',
  'تطبيق الكاميرا في Google Translate يترجم قائمة المكونات فوراً إلى العربية.',
  'اسأل في المخبز: "Ist da Schmalz oder Alkohol drin?" (هل فيه دهن خنزير أو كحول؟)',
  'المنتجات العضوية (Bio) ليست حلالاً بالضرورة. اقرأ المكونات دائماً.',
]
