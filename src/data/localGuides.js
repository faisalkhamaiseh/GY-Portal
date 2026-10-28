// تفاصيل محلية على مستوى المدينة، مأخوذة من دليل شمالكالدن للبقاء.
// الأسعار تقديرية دائماً؛ أضف جامعات أخرى بنفس الشكل.

export const localGuides = {
  schmalkalden: {
    photos: [
      { src: '/images/schmalkalden-altmarkt.jpg', alt: 'ساحة ألتماركت وكنيسة القديس جورج', credit: 'A.Savin، ويكيميديا كومنز، رخصة الفن الحر' },
      { src: '/images/schmalkalden-campus.jpg', alt: 'حرم بليشهامر من الأعلى، والسكن خلف المطعم الجامعي', credit: 'Maxl2003، ويكيميديا كومنز، CC BY 4.0' },
    ],
    facts: [
      { value: '~19,000', label: 'نسمة في المدينة، منهم حوالي 2,500 طالب' },
      { value: '5', label: 'كليات، وكل الحرم على بُعد دقائق مشياً' },
      { value: '€230–300', label: 'غرفة السكن الطلابي شهرياً شاملة الفواتير', estimate: true },
      { value: '~3.5 ساعة', label: 'بالقطار من مطار فرانكفورت' },
    ],
    about:
      'جامعة علوم تطبيقية صغيرة تأسست عام 1991، فيها حوالي 2,500 طالب في خمس كليات: الهندسة الكهربائية وعلم الحاسوب والهندسة الميكانيكية وإدارة الأعمال والاقتصاد وقانون الأعمال. كل شيء في الحرم على بُعد دقائق مشياً.',
    dorms: [
      {
        name: 'Blechhammer 9b',
        where: 'داخل الحرم',
        price: 'حوالي 230–300 يورو / شهر',
        deposit: 'حوالي 300 يورو',
        points: ['285 سريراً، داخل الحرم مباشرة خلف المطعم الجامعي', 'غرف فردية 9–20 م² في شقق لشخصين أو ثلاثة؛ و10 شقق فردية مساحتها 19 م²', 'مفروشة، مع مطبخ مجهز ودش وحمام خاص لكل شقة، وإنترنت سلكي في كل غرفة', 'غسالات ونشافات وغرفة دراجات؛ مواقف سيارات قليلة جداً'],
        url: 'https://www.stw-thueringen.de/en/housing/schmalkalden/blechhammer-9b.html',
      },
      {
        name: 'Martin-Luther-Ring 38',
        where: 'حوالي 8 دقائق مشياً',
        price: 'حوالي 240–300 يورو / شهر',
        deposit: 'حوالي 300 يورو',
        points: ['258 سريراً، قريب من البلدة القديمة والمحلات', 'غرف فردية 11–20 م² في شقق لـ3 أو 4 أشخاص؛ و18 شقة فردية مساحتها 20 م²', 'مفروشة، مع مطبخ مجهز ودش وحمام، وإنترنت سلكي في كل غرفة', 'غسالات ونشافة وغرفة دراجات'],
        url: 'https://www.stw-thueringen.de/en/housing/schmalkalden/martin-luther-ring-38.html',
      },
    ],
    dormNote:
      'الإيجار يشمل الماء والكهرباء والتدفئة. الإنترنت يُدفع منفصلاً للمزود (Telesystems Thorwarth). الأسعار على أساس الإقامة فصلاً كاملاً على الأقل؛ الإقامة الأقصر أغلى وتُحسب بالشهر الكامل. مكتب الإيجار: vermietung-schmalkalden@stw-thueringen.de',
    links: [
      { title: 'نموذج التقديم على السكن', text: 'Studierendenwerk Thüringen، أونلاين فقط', url: 'https://www.stw-thueringen.de/en/housing/application/' },
      { title: 'كل سكنات Studierendenwerk', text: 'نظرة عامة وأنواع الغرف والقوانين', url: 'https://www.stw-thueringen.de/en/housing/residential-homes.html' },
      { title: 'العيش في شمالكالدن', text: 'صفحة السكن الخاصة بالجامعة', url: 'https://www.hs-schmalkalden.de/en/students-information/living-in-schmalkalden' },
      { title: 'Wohnungsgenossenschaft Schmalkalden', text: 'تعاونية سكنية، شقق في أنحاء المدينة', url: 'https://www.wgschmalkalden.de/' },
      { title: 'Wohnungsbau GmbH Schmalkalden', text: 'شركة الإسكان التابعة للبلدية', url: 'https://www.wobausm.de/' },
    ],
    uniLinks: [
      { title: 'Hochschule Schmalkalden', text: 'الموقع الرئيسي بالإنجليزية', url: 'https://www.hs-schmalkalden.de/en/' },
      { title: 'المكتب الدولي', text: 'التوجيه وبرنامج المرافقين والتصاريح', url: 'https://www.hs-schmalkalden.de/en/international' },
      { title: 'المطعم الجامعي (Mensa)', text: 'القوائم وأوقات العمل', url: 'https://www.hs-schmalkalden.de/en/university/campus/mensa' },
      { title: 'دفع الرسوم الفصلية', text: 'المبالغ والمواعيد وبيانات البنك', url: 'https://www.hs-schmalkalden.de/en/university/organization/departments/dep-1-studies-and-international-relatations/student-administration/payment-semester-fee' },
      { title: 'تفاصيل الرسوم الفصلية', text: 'Studierendenwerk Thüringen', url: 'https://www.stw-thueringen.de/finanzen/semesterbeitrag/beitragshoehe.html' },
      { title: 'بلدية شمالكالدن', text: 'مواعيد مكتب المواطنين والفعاليات ومعلومات السياحة', url: 'https://www.schmalkalden.de/' },
      { title: 'متحف قصر فيلهلمسبورغ', text: 'أوقات العمل والتذاكر', url: 'https://www.museumwilhelmsburg.de/' },
      { title: 'الحرم على خرائط Google', text: 'Blechhammer، 98574 Schmalkalden', url: 'https://www.google.com/maps/place/Hochschule+Schmalkalden/@50.717416,10.463766,15z' },
    ],
    campus: [
      { kind: 'الأكل', title: 'المطعم الجامعي (Mensa)', text: 'تديره Studierendenwerk. عدة أطباق يومياً مع خيارات نباتية. ادفع ببطاقة thoska لسعر الطلاب.' },
      { kind: 'بطاقتك', title: 'thoska', text: 'هوية طالب ومحفظة المطعم وبطاقة المكتبة والطباعة وإثبات التذكرة الفصلية. اشحنها من الآلات في المطعم.' },
      { kind: 'المساعدة', title: 'المكتب الدولي', text: 'محطتك الأولى للتوجيه وبرنامج المرافقين وأسئلة الإقامة واتفاقيات التعلم.' },
      { kind: 'الدراسة', title: 'المكتبة', text: 'داخل الحرم، مع غرف دراسة جماعية وساعات عمل طويلة في فترة الامتحانات.' },
      { kind: 'الحياة الاجتماعية', title: 'مجلس الطلبة والنادي', text: 'مجلس الطلبة (StuRa) ينظم الفعاليات، والنادي الطلابي يقيم حفلات أسبوعية. شارك في "شمالمبيكس"، الألعاب الصيفية بين الكليات.' },
      { kind: 'الرياضة', title: 'الرياضة الجامعية', text: 'كرة قدم وطائرة وتسلق ولياقة وغيرها، ومعظمها مجاني. ومسبح عام بجانب الحرم.' },
    ],
    arrival: [
      'حوالي 3–4 ساعات بالقطار من مطار فرانكفورت، غالباً مع تغيير في آيزناخ وفيرنسهاوزن، أو عبر إرفورت وتسيلا-ميليس.',
      'انزل في محطة Schmalkalden Fachhochschule للحرم وسكن بليشهامر؛ المحطة على بُعد أقل من دقيقة مشياً.',
      'استخدم محطة Schmalkalden للبلدة القديمة وسكن مارتن-لوثر-رينغ.',
      'حاول الوصول في يوم عمل قبل الساعة 18:00 لتستلم مفاتيحك.',
    ],
    trips: [
      ['ماينينغن', '~45 دقيقة', 'مسرح شهير وقلعة وتسوق'],
      ['آيزناخ', '~ساعة', 'قلعة فارتبورغ (يونسكو)، وبيتا باخ ولوثر'],
      ['زول / تسيلا-ميليس', '~40 دقيقة', 'مركز تسوق ومسبح وسينما'],
      ['إرفورت', '~1.5–2 ساعة', 'عاصمة تورينغن، جسر كريمر، IKEA، بقالات عربية، مسجد'],
      ['فورتسبورغ', '~2.5 ساعة', 'قصر الريزيدنس ونهر الماين'],
      ['فرانكفورت', '~3 ساعات', 'مدينة كبيرة، المطار، جالية عربية كبيرة'],
      ['لايبزيغ / برلين', '3–5 ساعات', 'رحلات نهاية أسبوع (أسرع بالقطار السريع)'],
    ],
    sights: [
      { kind: 'البلدة القديمة', title: 'ألتماركت', text: 'الساحة الرئيسية مع دار البلدية وكنيسة القديس جورج القوطية وسوق الميلاد في ديسمبر.' },
      { kind: 'قلعة', title: 'قصر فيلهلمسبورغ', text: 'قصر من عصر النهضة فوق المدينة، فيه متحف وأحد أقدم الأورغنات العاملة في ألمانيا.' },
      { kind: 'تاريخ', title: 'بيت لوثر وهسنهوف', text: 'حيث أقام لوثر عام 1537، وأقدم لوحات جدارية غير دينية في ألمانيا.' },
      { kind: 'حلويات', title: 'عالم نوغا فيبا', text: 'مصنع النوغا المحلي مع متجر ومقهى.' },
      { kind: 'مشي', title: 'رينشتايغ وإنزلسبيرغ', text: 'جبل إنزلسبيرغ (916 م) بإطلالات واسعة، وفي تروزيتال شلال.' },
      { kind: 'شتاء', title: 'أوبرهوف', text: 'تزلج وزلاجات وفعاليات بياثلون على بُعد رحلة قصيرة.' },
    ],
  },
}
