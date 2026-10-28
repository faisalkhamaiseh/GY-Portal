// إرشادات عامة تنطبق على كل ألمانيا. سياسة المحتوى: لا تواريخ ولا مواعيد نهائية
// ثابتة ولا مبالغ رسمية؛ نصف الخطوات العامة فقط، ونحيل للمصدر الرسمي في كل
// إجراء قانوني أو حكومي أو أكاديمي (`official`).

export const officialSources = {
  visa: { label: 'السفارة الألمانية في عمّان', href: 'https://amman.diplo.de/' },
  foreignOffice: { label: 'وزارة الخارجية الألمانية: التأشيرات', href: 'https://www.auswaertiges-amt.de/en/visa-service' },
  makeIt: { label: 'البوابة الرسمية Make it in Germany', href: 'https://www.make-it-in-germany.com/en/' },
  rundfunk: { label: 'الموقع الرسمي لرسوم البث', href: 'https://www.rundfunkbeitrag.de/' },
  gju: { label: 'الجامعة الألمانية الأردنية (GJU)', href: 'https://www.gju.edu.jo/' },
  gjuEligibility: { label: 'GJU: شروط بدء السنة الألمانية', href: 'https://www.gju.edu.jo/node/13323' },
  gjuTerms: { label: 'GJU: متطلبات بدء السنة الألمانية', href: 'https://www.gju.edu.jo/node/16241' },
  gjuLanguage: { label: 'GJU: أنظمة اللغة الألمانية للسنة الألمانية', href: 'https://www.gju.edu.jo/content/german-language-regulations-german-year-12359' },
  gjuManual: { label: 'GJU: دليل السنة الألمانية (PDF)', href: 'https://www.gju.edu.jo/sites/default/files/german_year_manual_final.pdf' },
  fintiba: { label: 'الحساب المجمّد من Fintiba', href: 'https://www.fintiba.com/solutions/blocked-account-germany/' },
  daad: { label: 'DAAD: الدراسة في ألمانيا', href: 'https://www.daad.de/en/' },
  dticket: { label: 'الموقع الرسمي لتذكرة ألمانيا', href: 'https://deutschlandticket.de/' },
  ba: { label: 'الوكالة الاتحادية للعمل', href: 'https://www.arbeitsagentur.de/en/' },
}

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`

export const checklist = [
  {
    id: 'gju',
    title: 'قبل أن تذهب: متطلبات GJU',
    place: 'GJU',
    note: 'لا تسمح لك GJU ببدء السنة الألمانية قبل إنهاء هذه الخطوات. الشروط والمواعيد والرسوم الدقيقة تحددها GJU وقد تختلف حسب الكلية والدفعة، فتأكد من كل خطوة مع منسق التبادل ودائرة الشؤون الدولية.',
    items: [
      { id: 'gy-eligible', title: 'تأكد أنك تستوفي شروط بدء السنة الألمانية', text: 'تحدد GJU حداً أدنى للمعدل وعدداً أدنى من الساعات المنجزة (دون مساقات اللغة الألمانية) لكل كلية، ويجب أن يبقى معدلك فوق الحد الأدنى عند السفر.', official: officialSources.gjuEligibility },
      { id: 'gy-german', title: 'حقّق متطلب اللغة الألمانية', text: 'أنهِ مساقات اللغة والمستوى المطلوب (مسار B1 أو أعلى) حسب أنظمة اللغة في GJU، واسأل مبكراً عمّا يحدث إن لم تنجح في المستوى الأخير قبل السفر.', official: officialSources.gjuLanguage },
      { id: 'gy-apply', title: 'قدّم طلبك عبر منسق التبادل', text: 'قدّم طلب السنة الألمانية عبر منسق التبادل في كليتك ودائرة الشؤون الدولية لتُدرج في قائمة الطلبة المغادرين وتُوزّع على جامعة شريكة.', official: officialSources.gjuTerms },
      { id: 'gy-training', title: 'أنهِ أي تدريب تشترطه خطتك الدراسية أولاً', text: 'بعض الكليات تشترط التدريب الميداني في الأردن قبل السنة الألمانية. راجع خطتك الدراسية وأنهِه في الوقت المناسب.', official: officialSources.gjuManual },
      { id: 'gy-fee', title: 'ادفع رسوم السنة الألمانية قبل موعد GJU', text: 'تتقاضى GJU رسوماً تنظيمية للسنة الألمانية. تحقق من المبلغ الحالي والموعد وشروط الإلغاء لدى GJU قبل الدفع.', official: officialSources.gjuManual },
    ],
  },
  {
    id: 'before',
    title: 'قبل السفر',
    place: 'عمّان',
    items: [
      { id: 'dorm', title: 'قدّم على السكن الطلابي بمجرد فتح التقديم', text: 'التقديم يفتح عادةً قبل بداية الفصل بعدة أشهر، والغرف بالأسبقية. يمكن غالباً التقديم قبل وصول رسالة القبول، ويجب تأكيد الحجز عبر رسالة المتابعة.', official: { label: 'ابحث عن Studierendenwerk مدينتك', href: search('Studierendenwerk Wohnheim Bewerbung') } },
      { id: 'sperrkonto', title: 'افتح الحساب المجمّد (Sperrkonto)', text: 'تودع فيه مبلغ سنة كاملة يُصرف لك شهرياً. مزودون مثل Fintiba يتيحون فتحه عبر الإنترنت خلال دقائق، وهو مقبول للتأشيرة. المبلغ المطلوب يحدده القانون الألماني ويتغير، فتحقق منه رسمياً قبل التحويل، وأضف مبلغاً بسيطاً لرسوم التحويل.', official: [officialSources.foreignOffice, officialSources.fintiba] },
      { id: 'visa', title: 'احصل على تأشيرة الدراسة', text: 'احجز موعد السفارة مبكراً قدر الإمكان. الوثائق المطلوبة وطريقة الحجز تُحدد رسمياً من السفارة.', official: officialSources.visa },
      { id: 'insurance', title: 'اختر التأمين الصحي', text: 'التأمين الصحي إلزامي للتسجيل في الجامعة. قارن بين شركات التأمين الحكومية، واحرص على تأمين سفر للأيام الأولى حتى يبدأ تأمينك.', official: { label: 'قارن TK وAOK', href: '/compare#health', internal: true } },
      { id: 'folder', title: 'جهّز ملف الوثائق', text: 'جواز السفر والتأشيرة وصور بيومترية ورسالة القبول ووثائق GJU وكشف العلامات ورسالة التأمين وعقد الإيجار، مع نسخ ورقية من كل شيء، ومبلغ نقدي يكفي الأيام الأولى.' },
      { id: 'ticket', title: 'فعّل تذكرتك الفصلية', text: 'إن أرسلتها جامعتك قبل السفر، فعّلها قبل الهبوط لتستخدم القطار من المطار.', official: officialSources.dticket },
    ],
  },
  {
    id: 'week1',
    title: 'الأسبوع الأول',
    place: 'مدينتك المضيفة',
    items: [
      { id: 'keys', title: 'استلم المفاتيح ووقّع عقد الإيجار', text: 'اطلب تأكيد المؤجر (Wohnungsgeberbestätigung)، فأنت تحتاجه لتسجيل العنوان.' },
      { id: 'anmeldung', title: 'سجّل عنوانك (Anmeldung)', text: 'في مكتب المواطنين في مدينتك خلال المهلة القانونية بعد السكن (عادةً أسبوعان). احجز الموعد من موقع البلدية واحتفظ بشهادة التسجيل.', official: { label: 'موقع مكتب المواطنين في مدينتك', href: search('Bürgeramt Anmeldung Termin') } },
      { id: 'enrol', title: 'أكمل التسجيل في الجامعة واستلم بطاقتك', text: 'خطوات التسجيل والأوراق المطلوبة تحددها جامعتك المضيفة. البطاقة الطلابية غالباً هي هويتك ومحفظة المطعم وإثبات التذكرة.', official: { label: 'بوابة جامعتك المضيفة', href: '/universities', internal: true } },
      { id: 'bank', title: 'افتح حساباً بنكياً ألمانياً', text: 'بنك إلكتروني أو فرع محلي. أموال حسابك المجمّد تُصرف إلى هذا الحساب.', official: { label: 'قارن البنوك', href: '/compare#banks', internal: true } },
      { id: 'sim', title: 'اشترِ شريحة هاتف', text: 'شريحة مسبقة الدفع هي الأسهل. تحتاج جوازك للتفعيل.', official: { label: 'قارن الباقات', href: '/compare#mobile', internal: true } },
      { id: 'orientation', title: 'احضر توجيه المكتب الدولي', text: 'ستتعرف على مرافقك (Buddy) والطلاب الجدد، وتسأل عن كل الإجراءات المحلية.' },
    ],
  },
  {
    id: 'month1',
    title: 'الشهر الأول',
    place: 'الاستقرار',
    items: [
      { id: 'permit', title: 'قدّم على تصريح الإقامة', text: 'في مكتب الأجانب (Ausländerbehörde) التابع لمدينتك قبل انتهاء التأشيرة. الوثائق والرسوم والمواعيد يحددها المكتب نفسه.', official: { label: 'مكتب الأجانب في مدينتك', href: search('Ausländerbehörde Aufenthaltstitel Studium Termin') } },
      { id: 'rundfunk', title: 'سجّل رسوم البث (Rundfunkbeitrag)', text: 'رسوم شهرية إلزامية لكل شقة، وفي الشقة المشتركة يدفعها شخص واحد ويتقاسمها الآخرون. المبلغ والتسجيل من الموقع الرسمي.', official: officialSources.rundfunk },
      { id: 'learning', title: 'وقّع اتفاقية التعلّم', text: 'أكّد موادك مع منسق الجامعة المضيفة ومع GJU حتى تُعادل ساعاتك. قواعد المعادلة تحددها GJU.', official: officialSources.gju },
      { id: 'internship', title: 'ابدأ التقديم على التدريب العملي', text: 'التدريب هو النصف الثاني من السنة الألمانية، والشركات توظف قبل أشهر.', official: { label: 'مركز التدريب العملي', href: '/internships', internal: true } },
      { id: 'taxid', title: 'احتفظ برسالة الرقم الضريبي', text: 'الرقم الضريبي (Steuer-ID) يصلك بالبريد بعد تسجيل العنوان، وكل صاحب عمل سيطلبه.' },
      { id: 'liability', title: 'فكّر في تأمين المسؤولية', text: 'تأمين المسؤولية الشخصية (Haftpflicht) رخيص عادةً ويغطي حوادث مثل كسر نافذة أو تسرب ماء.' },
    ],
  },
]

export const internship = {
  steps: [
    'اكتب سيرة ذاتية ألمانية (Lebenslauf) مع صورة، ورسالة تغطية من صفحة واحدة (Anschreiben).',
    'ابحث في StepStone وIndeed وLinkedIn وXING وصفحات الشركات عن "Pflichtpraktikum".',
    'استخدم مركز التوظيف في الجامعة ومعارض الشركات، واسأل الأساتذة عن علاقاتهم مع الشركات.',
    'احصل على موافقة GJU على التدريب قبل توقيع العقد.',
    'ستنتقل لمدينة أخرى؟ أبلغ عن ترك غرفتك مبكراً، وألغِ تسجيلك (Abmeldung)، وسجّل في المدينة الجديدة.',
  ],
  // القوانين تتغير؛ نذكر المبدأ فقط ونحيل للمصدر الرسمي.
  rules: [
    { label: 'أيام العمل في السنة', value: 'عدد محدود', text: 'للطلاب من خارج الاتحاد الأوروبي حد سنوي لأيام العمل خارج التدريب الإلزامي.' },
    { label: 'الحد الأدنى للأجور', value: 'يُحدد قانونياً', text: 'ينطبق على الأعمال الاختيارية ويتغير دورياً؛ التدريب الإلزامي قد يكون بلا أجر.' },
    { label: 'الميني جوب', value: 'حد شهري', text: 'للعمل البسيط حد دخل شهري معفى غالباً من الضريبة.' },
    { label: 'التدريب الإلزامي', value: 'لا يُحتسب عادةً', text: 'التدريب الإلزامي (Pflichtpraktikum) لا يستهلك عادةً أيام العمل المسموحة.' },
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
  { group: 'الأوراق الرسمية', lines: [
    ['Ich möchte mich anmelden.', 'أريد تسجيل عنواني.'],
    ['Ich habe einen Termin um zehn Uhr.', 'عندي موعد الساعة العاشرة.'],
    ['Welche Unterlagen brauche ich?', 'ما الأوراق التي أحتاجها؟'],
    ['Können Sie bitte langsamer sprechen?', 'هل يمكنك التحدث ببطء من فضلك؟'],
  ] },
  { group: 'السكن', lines: [
    ['Ist das Zimmer noch frei?', 'هل الغرفة ما زالت متاحة؟'],
    ['Ist die Miete warm oder kalt?', 'هل الإيجار شامل التدفئة والفواتير؟'],
    ['Wann kann ich das Zimmer besichtigen?', 'متى يمكنني معاينة الغرفة؟'],
    ['Ist das Zimmer möbliert?', 'هل الغرفة مفروشة؟'],
  ] },
  { group: 'الطعام والتسوق', lines: [
    ['Ist da Schweinefleisch drin?', 'هل فيه لحم خنزير؟'],
    ['Ist das halal?', 'هل هذا حلال؟'],
    ['Ist da Alkohol drin?', 'هل فيه كحول؟'],
    ['Eine Tüte, bitte.', 'كيس من فضلك.'],
    ['Kann ich mit Karte zahlen?', 'هل يمكنني الدفع بالبطاقة؟'],
  ] },
  { group: 'التنقل', lines: [
    ['Wo fährt der Zug nach … ab?', 'من أين ينطلق القطار إلى …؟'],
    ['Ist dieser Zug mit dem Deutschlandticket erlaubt?', 'هل يُسمح بهذا القطار مع Deutschlandticket؟'],
  ] },
  { group: 'الصحة والعمل', lines: [
    ['Ich brauche einen Arzttermin.', 'أحتاج موعداً عند الطبيب.'],
    ['Ich suche einen Praktikumsplatz.', 'أبحث عن مكان تدريب.'],
  ] },
]

// أرقام الطوارئ الأوروبية ثابتة منذ عقود.
export const emergency = [
  { number: '112', label: 'الإسعاف والإطفاء' },
  { number: '110', label: 'الشرطة' },
  { number: '116 117', label: 'طبيب مناوب ليلاً وفي العطل' },
  { number: '0800 1110111', label: 'خط دعم نفسي مجاني على مدار الساعة' },
]

// خط زمني نسبي، صالح لكل سنة.
export const semester = [
  { month: 'قبل الفصل بأشهر', label: 'التقديم على السكن والحساب المجمّد والتأشيرة' },
  { month: 'قبل السفر بأسابيع', label: 'التأمين وملف الوثائق وتفعيل التذكرة' },
  { month: 'أسبوع الوصول', label: 'المفاتيح وتسجيل العنوان والبنك والتوجيه' },
  { month: 'الشهر الأول', label: 'تصريح الإقامة واتفاقية التعلّم وبدء البحث عن تدريب' },
  { month: 'نهاية الفصل', label: 'الامتحانات وتجهيز الانتقال للتدريب' },
  { month: 'الفصل الثاني', label: 'التدريب العملي في شركة ألمانية' },
]
