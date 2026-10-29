// إرشادات عامة تنطبق على كل ألمانيا. المواعيد والمبالغ من دائرة الشؤون الدولية في
// GJU (لقاء الانطلاق للفصل الشتوي 2026/27) أو من الأسعار الرسمية، وكل إجراء
// قانوني أو حكومي أو أكاديمي يحيل إلى مصدره الرسمي (`official`).

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
  iad: { label: 'راسل فريق IAD للطلاب المغادرين', href: 'mailto:IAD.Outgoing.Team@gju.edu.jo' },
  iadBooking: { label: 'احجز موعداً مع IAD', href: 'https://outlook.office365.com/owa/calendar/AppointmentBooking@gju.edu.jo/bookings/' },
  gjuFaq: { label: 'GJU: الأسئلة الشائعة عن السنة الألمانية', href: 'https://www.gju.edu.jo/content/faqs-16127' },
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
    id: 'apply',
    title: 'خطوات السفر لألمانيا: طلبك',
    place: 'GJU، من نوفمبر إلى يناير',
    note: 'من لقاء الانطلاق الذي عقدته دائرة الشؤون الدولية (IAD) في GJU للفصل الشتوي 2026/27. مواعيد التأشيرة الدقيقة تُعلن بالإيميل، فافحص بريدك الجامعي يومياً.',
    items: [
      { id: 'apply-research', title: 'تعرّف على جامعتك القادمة', text: 'اقرأ موقع الجامعة المضيفة (التخصصات والمساقات والمواعيد)، واعرف مكتبها الدولي (International Office) لأنه أول جهة تتواصل معها هناك، وابحث عن المدينة: موقعها ومواصلاتها والحياة فيها.', official: { label: 'الجامعات المضيفة', href: '/universities', internal: true } },
      { id: 'apply-mailbox', title: 'أبقِ بريدك الجامعي فعّالاً وفيه مساحة', text: 'كل خطوة تصلك بالإيميل من IAD ومن جامعتك المضيفة، والبريد الممتلئ يرفض رسائلهم. وانضم إلى GJU Outgoings Index عندما يرسل لك IAD الرابط.' },
      { id: 'apply-transcript', title: 'استخرج كشف العلامات (Transcript of records)', text: 'إلزامي. اطلب من دائرة القبول والتسجيل في GJU كشف علامات رسمياً بالإنجليزية ومختوماً. اطلبه مبكراً لأنه قد يأخذ بضعة أيام عمل.' },
      { id: 'apply-enrolment', title: 'استخرج إثبات طالب (Certificate of enrolment)', text: 'إلزامي. من دائرة القبول والتسجيل نفسها: رسالة رسمية بالإنجليزية تثبت أنك طالب حالي في GJU.' },
      { id: 'apply-german', title: 'احصل على شهادة اللغة الألمانية (Sprachzeugnis)', text: 'إلزامية. شهادة DaF من مساقات الألماني في GJU، أو شهادة B1 من معهد غوته أو ÖSD. احجز الامتحانات الخارجية مبكراً لأن المقاعد تمتلئ.', official: [{ label: 'أنظمة اللغة الألمانية في GJU', href: 'https://www.gju.edu.jo/content/german-language-regulations-german-year-12359' }, { label: 'معهد غوته في الأردن: الامتحانات', href: 'https://www.goethe.de/ins/jo/en/spr/prf.html' }, { label: 'امتحانات ÖSD', href: 'https://www.osd.at/en/' }] },
      { id: 'apply-passport', title: 'صوّر صفحة بيانات جواز السفر بوضوح', text: 'يجب أن يكون الجواز سارياً طوال سنتك في ألمانيا وبعدها ببضعة أشهر. إذا قارب على الانتهاء جدّده الآن من دائرة الأحوال المدنية والجوازات، فهو مطلوب للتأشيرة أيضاً.', official: { label: 'دائرة الأحوال المدنية والجوازات', href: 'https://www.cspd.gov.jo/' } },
      { id: 'apply-photos', title: 'صوّر 3 صور بيومترية للجواز', text: 'لطلب التأشيرة: مقاس 35 × 45 ملم، حديثة، بخلفية فاتحة سادة، والوجه مباشرة للكاميرا. أي استوديو تصوير في عمّان يعملها؛ قل لهم إنها لتأشيرة ألمانية.' },
      { id: 'apply-send', title: 'أرسل كل الوثائق لمنسّق الطلاب المغادرين بالإيميل', text: 'كشف العلامات وإثبات الطالب وشهادة الألماني وصورة الجواز والصور، ممسوحة في إيميل واحد. اكتب في كل إيميل اسمك ورقمك الجامعي وتخصصك وسنتك الألمانية وجامعتك المضيفة.', official: { label: 'IAD.Outgoing.Team@gju.edu.jo', href: 'mailto:IAD.Outgoing.Team@gju.edu.jo' } },
      { id: 'apply-learning', title: 'عبّئ اتفاقية التعلّم (Learning Agreement) مع منسّق التبادل', text: 'اختر مساقاتك في الجامعة المضيفة مع منسّق التبادل في كليتك. هي التي تحدد الساعات التي تعادلها GJU.' },
      { id: 'apply-forms', title: 'وقّع نماذج IAD', text: 'قواعد الانسحاب، وقواعد السلوك (لـ IAD في GJU ولجامعتك المضيفة)، وإجراءات IAD وجدولها الزمني للسنة الألمانية. يرسل لك IAD النماذج.' },
      { id: 'apply-extra', title: 'جهّز وثائق إضافية إذا طلبتها جامعتك', text: 'نموذج التقديم للجامعة والسكن؛ رسالة تحفيزية (صفحة تقريباً، نصفها على الأقل بالألمانية)؛ ملف أعمال (Portfolio) لطلاب العمارة والتصميم؛ سيرة ذاتية بالألمانية أو الإنجليزية مع صورتك. كل جامعة قد تطلب شيئاً إضافياً، فاقرأ كل إيميل.', official: { label: 'نموذج السيرة الذاتية Europass', href: 'https://europass.europa.eu/en/create-europass-cv' } },
      { id: 'dorm', title: 'ابحث عن سكن بثلاث طرق معاً', text: 'عن طريق نموذج التقديم للجامعة (تلقائياً)، أو مباشرة مع Studierendenwerk (بنفسك)، أو بشكل خاص في السوق. غرف السكن الطلابي غير مضمونة، فابحث بشكل خاص في الوقت نفسه. بدون عنوان ثابت لا تستطيع تسجيل سكنك في المدينة، وبدون التسجيل لا تصل لأموالك. لا تدفع أبداً قبل مكالمة فيديو مباشرة وعقد حقيقي.', official: [{ label: 'مواقع سكن موثوقة', href: '/housing', internal: true }, { label: 'باحث السكن الطلابي من DAAD', href: 'https://www.daad.de/deutschland/nach-deutschland/bewerbung/en/22222-wohnheimfinder/' }] },
      { id: 'sperrkonto', title: 'أودِع الحساب المجمّد قبل 1 ديسمبر', text: 'تطلب GJU إيداع 12,163 يورو (حوالي 9,339 ديناراً) في Fintiba (بنك Sutor) وإرسال تأكيد التجميد للتأشيرة. يغطي مصاريف 12 شهراً ويصرف لك 992 يورو شهرياً بعد وصولك إلى ألمانيا. التسجيل في Fintiba والتحويل في الوقت مسؤوليتك أنت.', official: [officialSources.fintiba, officialSources.foreignOffice] },
      { id: 'visa', title: 'قدّم على التأشيرة (من نهاية نوفمبر حتى يناير)', text: 'يحدد IAD مواعيد السفارة ويعلنها بالإيميل. أحضر رسالة القبول وتأكيد الحساب المجمّد وجواز السفر والصور البيومترية. رسوم التأشيرة 75 يورو.', official: officialSources.visa },
      { id: 'apply-letters', title: 'انتظر رسالة القبول (نهاية ديسمبر)', text: 'ترسل الجامعة المضيفة رسالة الدعوة أو القبول. أرسلها لـ IAD واحتفظ بالأصل للتأشيرة.' },
      { id: 'apply-depart', title: 'حفل الوداع في 14 يناير 2027، والسفر من فبراير إلى مارس', text: 'احجز رحلتك بعد أن تصبح التأشيرة في جوازك، ووصّل في يوم عمل لتستلم مفاتيحك.' },
    ],
  },
  {
    id: 'before',
    title: 'قبل السفر',
    place: 'عمّان',
    items: [
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
      { id: 'permit', title: 'قدّم على تصريح الإقامة', text: 'في مكتب الأجانب (Ausländerbehörde) التابع لمدينتك قبل انتهاء التأشيرة. الرسوم 100 يورو. الوثائق والمواعيد يحددها المكتب نفسه.', official: { label: 'مكتب الأجانب في مدينتك', href: search('Ausländerbehörde Aufenthaltstitel Studium Termin') } },
      { id: 'rundfunk', title: 'سجّل رسوم البث (Rundfunkbeitrag)', text: '18.36 يورو شهرياً لكل شقة، وهي إلزامية. في الشقة المشتركة يدفعها شخص واحد ويتقاسمها الآخرون. التسجيل من الموقع الرسمي.', official: officialSources.rundfunk },
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

// من تسأل عن ماذا، من لقاء الانطلاق في IAD.
export const contacts = [
  { who: 'منسّق التبادل', where: 'في كليتك', what: 'الأسئلة الأكاديمية: اتفاقية التعلّم والمساقات وكشف العلامات' },
  { who: 'منسّقو الطلاب المغادرين في IAD', where: 'دائرة الشؤون الدولية', what: 'التقديم للجامعة والتأشيرة ووثائقك' },
  { who: 'منسّقو التدريب في IAD', where: 'دائرة الشؤون الدولية', what: 'نصف التدريب العملي: العقد وفرص العمل' },
  { who: 'أنت', where: 'مسؤوليتك الشخصية', what: 'السكن، وتسجيل العنوان في ألمانيا، والتسجيل في الجامعة، والتسجيل في Fintiba وتأكيد التحويل، في الوقت المحدد' },
]

// المواعيد المهمة لدفعة الفصل الشتوي 2026/27 (لقاء الانطلاق في IAD).
export const keyDates = [
  { when: 'نوفمبر', what: 'التقديم للجامعات' },
  { when: '1 ديسمبر', what: 'إيداع الحساب المجمّد وتأكيده للتأشيرة' },
  { when: 'نهاية نوفمبر حتى يناير', what: 'طلبات التأشيرة (المواعيد تُعلن بالإيميل)' },
  { when: 'نهاية ديسمبر', what: 'رسائل الدعوة والقبول' },
  { when: '14 يناير 2027', what: 'حفل الوداع' },
  { when: 'فبراير إلى مارس', what: 'السفر إلى ألمانيا' },
]

export const emailRules = ['اكتب من بريدك الجامعي، لا من بريد شخصي', 'عنوان واضح، مثل "Question about my German Year application"', 'ابدأ بـ "Dear Ms./Mr." واسم العائلة', 'اختم باسمك ورقمك الجامعي وتخصصك وسنتك الألمانية وجامعتك المضيفة', 'انتظر الرد في ساعات الدوام؛ إيميل واحد يكفي']
