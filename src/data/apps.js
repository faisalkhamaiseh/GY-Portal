// التطبيقات الأساسية في ألمانيا. المربعات تستخدم الأحرف الأولى ولوناً، وليست
// شعارات رسمية. `play` يبحث في Google Play و`ios` في App Store؛ و`web` هو الموقع الرسمي.

const play = (q) => `https://play.google.com/store/search?q=${encodeURIComponent(q)}&c=apps`
const appStore = (q) => `https://apps.apple.com/de/search?term=${encodeURIComponent(q)}`

const app = (name, initials, color, text, web, essential = false) => ({
  name, initials, color, text, web, essential, play: play(name), ios: appStore(name),
})

export const appCategories = [
  {
    id: 'transport',
    title: 'المواصلات',
    apps: [
      app('DB Navigator', 'DB', '#ec0016', 'كل قطارات وباصات ألمانيا، والتأخيرات المباشرة، والتذاكر وتذكرة ألمانيا.', 'https://www.bahn.de/', true),
      app('FlixBus', 'FB', '#73d700', 'باصات رخيصة بعيدة المدى في ألمانيا وأوروبا.', 'https://www.flixbus.de/'),
      app('BlaBlaCar', 'BB', '#054752', 'رحلات مشتركة مع سائقين ذاهبين لوجهتك.', 'https://www.blablacar.de/'),
      app('Lime', 'Li', '#0bd02b', 'سكوترات ودراجات كهربائية في مدن كثيرة. الدفع بالدقيقة.', 'https://www.li.me/'),
      app('Dott (formerly TIER)', 'Do', '#1a1a1a', 'سكوترات ودراجات كهربائية؛ TIER وDott اندمجتا في تطبيق واحد.', 'https://ridedott.com/'),
      app('Bolt', 'Bo', '#34d186', 'تاكسي وتوصيل وسكوترات، غالباً أرخص من التاكسي العادي.', 'https://bolt.eu/'),
    ],
  },
  {
    id: 'health',
    title: 'الصحة',
    apps: [
      app('Doctolib', 'Dl', '#107aca', 'احجز مواعيد الأطباء أونلاين بدون مكالمة أو ألمانية. فلتر للأطباء الذين يتحدثون الإنجليزية.', 'https://www.doctolib.de/', true),
      app('TK-App', 'TK', '#0094d4', 'إن كان تأمينك مع TK: إجازات مرضية ووثائق وخدمة بالإنجليزية.', 'https://www.tk.de/'),
      app('nora', 'no', '#c8102e', 'تطبيق الطوارئ الرسمي للشرطة والإطفاء والإسعاف، حتى بالرسائل.', 'https://www.nora-notruf.de/'),
      app('NINA', 'NI', '#004b87', 'تحذيرات رسمية من العواصف والفيضانات والطوارئ قربك.', 'https://www.bbk.bund.de/'),
    ],
  },
  {
    id: 'services',
    title: 'الخدمات والمال',
    apps: [
      app('Check24', 'C24', '#063773', 'قارن أسعار كل شيء تقريباً: باقات الهاتف والتأمين والكهرباء والطيران والإلكترونيات.', 'https://www.check24.de/', true),
      app('Kleinanzeigen', 'Ka', '#86b817', 'أثاث ودراجات وغرف مستعملة وأكثر. أكبر موقع إعلانات مبوبة في ألمانيا.', 'https://www.kleinanzeigen.de/', true),
      app('N26', 'N26', '#36a18b', 'حساب بنكي مجاني أونلاين بالإنجليزية، يُفتح في دقائق.', 'https://n26.com/'),
      app('PayPal', 'PP', '#003087', 'ادفع أونلاين وحوّل لأصدقائك؛ شائع جداً في ألمانيا.', 'https://www.paypal.com/de/'),
      app('WG-Gesucht', 'WG', '#e2574c', 'ابحث عن غرفة في شقة مشتركة. فعّل التنبيهات.', 'https://www.wg-gesucht.de/'),
    ],
  },
  {
    id: 'food',
    title: 'الطعام والتسوق',
    apps: [
      app('Lieferando', 'Lf', '#ff8000', 'توصيل طعام من المطاعم المحلية، ومنها مطاعم حلال كثيرة.', 'https://www.lieferando.de/', true),
      app('Wolt', 'Wo', '#009de0', 'توصيل طعام وبقالة في المدن الكبيرة.', 'https://wolt.com/de'),
      app('Too Good To Go', 'TG', '#00615f', 'أنقذ الأكل غير المباع من المخابز والمحلات ببضعة يوروهات.', 'https://www.toogoodtogo.com/', true),
      app('Marktguru', 'Mg', '#e30613', 'كل عروض السوبرماركتات الأسبوعية في مكان واحد.', 'https://www.marktguru.de/'),
      app('Lidl Plus', 'L+', '#0050aa', 'كوبونات وإيصالات رقمية في Lidl.', 'https://www.lidl.de/'),
    ],
  },
  {
    id: 'language',
    title: 'اللغة والدراسة',
    apps: [
      app('DeepL', 'DL', '#0f2b46', 'أفضل مترجم ألماني–إنجليزي، حتى لصور الرسائل الرسمية.', 'https://www.deepl.com/', true),
      app('Google Translate', 'GT', '#4285f4', 'وجّه الكاميرا على اللافتات والقوائم لترجمة فورية، والعربية مدعومة.', 'https://translate.google.com/'),
      app('Duolingo', 'Du', '#58cc02', 'حافظ على تدريب الألمانية يومياً.', 'https://www.duolingo.com/'),
    ],
  },
]
