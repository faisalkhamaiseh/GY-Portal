// البحث الذكي: يفهم ما يبحث عنه الطالب بالعربية أو الإنجليزية أو الألمانية
// ("أسعار ميونخ"، "سكن انغولشتات"، "prices in munich")، ويتسامح مع الأخطاء
// الإملائية، ويوجّه مباشرة للصفحة والقسم الصحيحين.

import { regions, regionByCode } from '../data/regions.js'
import { universities } from './data.js'

// توحيد النص: أحرف صغيرة، إزالة التشكيل والهمزات، وتوحيد التهجئة الألمانية،
// فتصبح "München" و"Muenchen" و"munchen" كلها "munchen"، و"أسعار" = "اسعار".
export function fold(s) {
  return s
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^a-z0-9ء-ي]+/g, ' ')
    .trim()
}

const isArabic = (t) => /[ء-ي]/.test(t)

// إزالة "ال" وأخواتها من بداية الكلمة العربية.
function stem(t) {
  if (!isArabic(t)) return t
  for (const p of ['وال', 'بال', 'فال', 'كال']) if (t.startsWith(p) && t.length >= 6) return t.slice(3)
  if (t.startsWith('لل') && t.length >= 5) return t.slice(2)
  if (t.startsWith('ال') && t.length >= 5) return t.slice(2)
  return t
}

const tokenize = (s) => fold(s).split(' ').filter(Boolean).map(stem)

const STOP = new Set(
  tokenize(
    'in at am an der die das main the for of near a to my me what how much is are does do where find show give i want need about on with and or from best cheap cheapest good list all ' +
      'في من الى إلى على عن مع ما ماذا هل اين أين وين بدي اريد أريد ابغى ابي عايز شو ايش وش كيف افضل أفضل احسن أحسن او أو يا عند مدينة مدينه منطقة ولاية بخصوص',
  ),
)
const GENERIC = new Set(
  tokenize('university universitat universities uni hochschule college school th tu fh hs haw of applied sciences technology technical institute جامعة جامعات كلية هوخشوله'),
)

// أسماء المدن والمناطق بالعربية والإنجليزية ← الاسم الألماني أو رمز الولاية.
const ALIASES = {
  munich: 'München', munchen: 'München', 'ميونخ': 'München', 'ميونيخ': 'München', 'ميونيج': 'München',
  cologne: 'Köln', koln: 'Köln', 'كولونيا': 'Köln', 'كولن': 'Köln', 'كولون': 'Köln',
  nuremberg: 'Nürnberg', nurnberg: 'Nürnberg', 'نورنبيرغ': 'Nürnberg', 'نورنبرغ': 'Nürnberg', 'نورنبيرج': 'Nürnberg', 'نورمبرغ': 'Nürnberg',
  hanover: 'Hannover', 'هانوفر': 'Hannover', wuerzburg: 'Würzburg', 'فورتسبورغ': 'Würzburg', 'فورتسبورج': 'Würzburg', 'فيرتسبورغ': 'Würzburg',
  saarbrucken: 'Saarbrücken', 'زاربروكن': 'Saarbrücken', 'ساربروكن': 'Saarbrücken', gottingen: 'Göttingen', 'غوتنغن': 'Göttingen', 'جوتنجن': 'Göttingen', 'غوتينغن': 'Göttingen',
  lubeck: 'Lübeck', 'لوبيك': 'Lübeck', munster: 'Münster', 'مونستر': 'Münster',
  'برلين': 'Berlin', 'هامبورغ': 'Hamburg', 'هامبورج': 'Hamburg', 'فرانكفورت': 'Frankfurt am Main', 'شتوتغارت': 'Stuttgart', 'شتوتجارت': 'Stuttgart', 'شتوتقارت': 'Stuttgart',
  'لايبزيغ': 'Leipzig', 'لايبزيج': 'Leipzig', 'لايبتسيغ': 'Leipzig', 'دريسدن': 'Dresden', 'درسدن': 'Dresden', 'اخن': 'Aachen', 'آخن': 'Aachen',
  'انغولشتات': 'Ingolstadt', 'انجولشتات': 'Ingolstadt', 'انغولشتادت': 'Ingolstadt', 'انقولشتات': 'Ingolstadt',
  'شمالكالدن': 'Schmalkalden', 'شمالكلدن': 'Schmalkalden', 'ارفورت': 'Erfurt', 'ينا': 'Jena', 'يينا': 'Jena', 'فايمار': 'Weimar', 'ويمار': 'Weimar',
  'ريغنسبورغ': 'Regensburg', 'ريجنسبورج': 'Regensburg', 'ريغينسبورغ': 'Regensburg', 'اوغسبورغ': 'Augsburg', 'اوجسبورج': 'Augsburg', 'اوكسبورغ': 'Augsburg',
  'دورتموند': 'Dortmund', 'بوخوم': 'Bochum', 'بيليفيلد': 'Bielefeld', 'بيلفيلد': 'Bielefeld', 'دارمشتات': 'Darmstadt', 'دارمشتادت': 'Darmstadt',
  'ماينتس': 'Mainz', 'ماينز': 'Mainz', 'فيسبادن': 'Wiesbaden', 'كاسل': 'Kassel', 'ماربورغ': 'Marburg', 'ماربورج': 'Marburg', 'غيسن': 'Giessen', 'جيسن': 'Giessen',
  'فولدا': 'Fulda', 'كارلسروه': 'Karlsruhe', 'كارلسروهه': 'Karlsruhe', 'مانهايم': 'Mannheim', 'هايلبرون': 'Heilbronn', 'اولم': 'Ulm', 'رويتلينغن': 'Reutlingen',
  'اوفنبورغ': 'Offenburg', 'آلن': 'Aalen', 'الن': 'Aalen', 'بايرويت': 'Bayreuth', 'شفاينفورت': 'Schweinfurt', 'روزنهايم': 'Rosenheim', 'لاندسهوت': 'Landshut',
  'ديغندورف': 'Deggendorf', 'ديجندورف': 'Deggendorf', 'كمبتن': 'Kempten', 'كوبورغ': 'Coburg', 'امبرغ': 'Amberg', 'فايدن': 'Weiden', 'اشافنبورغ': 'Aschaffenburg',
  'بريمن': 'Bremen', 'بريمرهافن': 'Bremerhaven', 'اولدنبورغ': 'Oldenburg', 'امدن': 'Emden', 'اوسنابروك': 'Osnabrück', 'فلنسبورغ': 'Flensburg',
  'شترالزوند': 'Stralsund', 'نويبراندنبورغ': 'Neubrandenburg', 'ماغدبورغ': 'Magdeburg', 'ماجدبورج': 'Magdeburg', 'كيمنتس': 'Chemnitz', 'كيمنيتس': 'Chemnitz',
  'تسفيكاو': 'Zwickau', 'زفيكاو': 'Zwickau', 'فرايبرغ': 'Freiberg', 'ميتفايدا': 'Mittweida', 'كوتبوس': 'Cottbus', 'بوتسدام': 'Potsdam',
  'ترير': 'Trier', 'كوبلنتس': 'Koblenz', 'كوبلنز': 'Koblenz', 'كايزرسلاوترن': 'Kaiserslautern', 'فورمس': 'Worms', 'زيغن': 'Siegen', 'سيغن': 'Siegen',
  'فوبرتال': 'Wuppertal', 'كريفيلد': 'Krefeld', 'ليبشتات': 'Lippstadt', 'المناو': 'Ilmenau', 'ايلميناو': 'Ilmenau', 'الميناو': 'Ilmenau', 'نوردهاوزن': 'Nordhausen',
  'ميرزبورغ': 'Merseburg', 'ديساو': 'Dessau', 'فيلداو': 'Wildau', 'فيرنيغيروده': 'Wernigerode', 'شتندال': 'Stendal', 'بينغن': 'Bingen', 'ريماغن': 'Remagen',
  'غراتس': 'Graz', 'غراز': 'Graz', 'ريكيافيك': 'Reykjavík', 'فالنسيا': 'València', 'بروكسل': 'Brussels', 'سيبيو': 'Sibiu', 'بورتو': 'Porto', 'بولونيا': 'Bologna',
  'فيلنيوس': 'Vilnius', 'غليفيتسه': 'Gliwice', 'كوتاهيا': 'Kütahya',
  bavaria: 'BY', bayern: 'BY', 'بايرن': 'BY', saxony: 'SN', sachsen: 'SN', 'زاكسن': 'SN', thuringia: 'TH', thuringen: 'TH', 'تورنغن': 'TH', 'تورينجن': 'TH',
  hesse: 'HE', hessen: 'HE', 'هيسن': 'HE', 'هسن': 'HE', nrw: 'NW', 'north rhine westphalia': 'NW', 'lower saxony': 'NI', niedersachsen: 'NI',
  bw: 'BW', 'baden wurttemberg': 'BW', 'rhineland palatinate': 'RP', 'rheinland pfalz': 'RP', 'saxony anhalt': 'ST', 'sachsen anhalt': 'ST',
  'schleswig holstein': 'SH', 'mecklenburg vorpommern': 'MV', brandenburg: 'BB', saarland: 'SL',
}

// الأسماء المختصرة التي يكتبها الطلاب فعلاً.
const UNI_ALIASES = {
  'thi-ingolstadt': ['thi'], 'hm-muenchen': ['hm', 'hochschule munchen'], tum: ['tum', 'tu munchen', 'tu munich', 'جامعه ميونخ التقنيه'],
  kit: ['kit', 'karlsruhe institute'], 'rwth-aachen': ['rwth', 'ار دبليو تي اتش'], 'hda-darmstadt': ['hda', 'h da'], 'hbrs-sankt-augustin': ['hbrs', 'h brs', 'bonn rhein sieg'],
  'thm-giessen': ['thm'], 'htwk-leipzig': ['htwk'], 'whz-zwickau': ['whz'], 'hsbi-bielefeld': ['hsbi', 'fh bielefeld'],
  'hshl-hamm': ['hshl'], 'hshl-lippstadt': ['hshl'], 'isd-koeln': ['kisd'], 'upv-valencia': ['upv'], 'bht-berlin': ['bht', 'beuth'],
  'htw-berlin': ['htw berlin'], 'hu-berlin': ['hu', 'humboldt', 'هومبولت'], 'haw-hamburg': ['haw hamburg'], 'hcu-hamburg': ['hcu'],
  'fhws-wuerzburg': ['fhws', 'thws'], 'fhws-schweinfurt': ['fhws', 'thws'], 'tu-dortmund': ['tu dortmund'], 'fh-dortmund': ['fh dortmund'],
  'oth-regensburg': ['oth'], 'eah-jena': ['eah'], 'htw-dresden': ['htw dresden'], 'htw-saar': ['htw saar'],
  schmalkalden: ['hs schmalkalden', 'fh schmalkalden'], 'frankfurt-uas': ['frankfurt uas', 'fra uas'],
}

// المواضيع: الكلمات ← الصفحة المناسبة. `place` مدينة أو منطقة.
export const TOPICS = [
  { id: 'costs', label: 'الأسعار والميزانية', icon: 'Wallet', words: 'price prices cost costs budget money expensive preis preise kosten living spend afford سعر اسعار أسعار الأسعار تكلفة تكاليف كلفة ميزانية مصاريف مصروف غالي غلاء رخيص فلوس معيشة' },
  { id: 'housing', label: 'السكن', icon: 'Home', words: 'housing dorm dorms room rooms wg flat flats apartment wohnung zimmer wohnheim accommodation studierendenwerk studentenwerk rent miete سكن سكنات مساكن غرفة غرف شقة شقق ايجار إيجار مهجع داخلية' },
  { id: 'halal', label: 'الطعام الحلال والمساجد', icon: 'Moon', words: 'halal helal mosque mosques moschee prayer pray arab arabic turkish butcher meat supermarket shawarma food grocery groceries muslim حلال مسجد مساجد جامع صلاة لحم لحمة ملحمة ملاحم جزار عربي عربية تركي سوبرماركت بقالة شاورما اكل أكل طعام مطاعم مسلم' },
  { id: 'internship', label: 'التدريب والشركات', icon: 'Briefcase', words: 'internship internships intern praktikum pflichtpraktikum job jobs company companies career fair fairs work employer cv lebenslauf تدريب التدريب شركات شركة وظيفة وظائف عمل شغل معرض معارض سيرة توظيف' },
  { id: 'airport', label: 'المطارات والطيران الرخيص', icon: 'Plane', words: 'airport airports flight flights ryanair wizz easyjet fly plane amman europe مطار مطارات طيران طيارة طائرة رايان راين اير ويز عمان' },
  { id: 'ticket', label: 'تذكرة ألمانيا والمواصلات', icon: 'TrainFront', words: 'deutschlandticket ticket semesterticket train trains bus transport bahn db commute تذكرة تذاكر قطار قطارات مواصلات باص باصات نقل ترام' },
  { id: 'videos', label: 'الفيديوهات وجولات الحرم', icon: 'Play', words: 'video videos tour tours youtube watch vlog فيديو فيديوهات جولة جولات يوتيوب' },
  { id: 'events', label: 'الفعاليات والأنشطة', icon: 'CalendarDays', words: 'event events festival festivals christmas oktoberfest carnival activities fun things sightseeing فعاليات فعالية مهرجان مهرجانات احتفال أنشطة نشاطات معالم سياحه' },
  { id: 'requirements', label: 'الشروط', icon: 'GraduationCap', words: 'requirement requirements gpa b1 b2 c1 level language exam conditions fee fees شروط شرط معدل مستوى لغة امتحان رسوم متطلبات' },
  { id: 'arrival', label: 'قائمة الوصول', icon: 'ListChecks', words: 'visa anmeldung checklist arrival blocked sperrkonto residence permit register paperwork فيزا تأشيرة تاشيره وصول تسجيل قائمة اوراق أوراق مجمد مجمّد اقامة إقامة' },
  { id: 'banks', label: 'مقارنة البنوك', icon: 'Landmark', words: 'bank banks account konto sparkasse n26 deutsche girokonto بنك بنوك حساب' },
  { id: 'mobile', label: 'مقارنة باقات الهاتف', icon: 'Smartphone', words: 'sim simcard mobile phone handy telekom vodafone o2 aldi talk data internet plan tarif شريحة شريحه خط موبايل جوال هاتف انترنت إنترنت باقة باقات' },
  { id: 'health', label: 'مقارنة التأمين الصحي', icon: 'HeartPulse', words: 'insurance krankenkasse krankenversicherung tk aok barmer health dental vaccination vaccine تأمين تامين صحي اسنان أسنان تطعيم' },
  { id: 'ingredients', label: 'دليل المكونات', icon: 'ScanBarcode', words: 'ingredients additives gelatine gelatin schwein alkohol enumber zutaten مكونات مكون جيلاتين جلاتين خنزير كحول اضافات إضافات حافظة' },
  { id: 'rules', label: 'القوانين والغرامات', icon: 'Scale', words: 'rule rules fine fines torrent torrents download downloading abmahnung piracy illegal penalty قوانين قانون غرامة غرامات مخالفة مخالفات تورنت تحميل افلام أفلام قرصنة' },
  { id: 'waste', label: 'فرز النفايات', icon: 'Scale', words: 'trash waste garbage rubbish recycling recycle mull mulltrennung pfand bottles bin bins sorting نفايات زبالة قمامة فرز تدوير' },
  { id: 'quiet', label: 'ساعات الهدوء', icon: 'Moon', words: 'quiet ruhezeit noise loud neighbours neighbors sunday laundry washing party music هدوء ازعاج إزعاج ضجيج غسالة جيران الاحد الأحد' },
  { id: 'routes', label: 'السفر بين الولايات', icon: 'TrainFront', words: 'route routes journey train trains ice ic regional bus flixbus flight between cities travel قطار قطارات طريق مواصلات سفر تنقل بين المدن الولايات ولاية حافلة باص طيران كيف أصل' },
  { id: 'travel', label: 'السفر الاقتصادي', icon: 'Bus', words: 'weekend trips trip cheap travel flixbus blablacar border austria switzerland netherlands poland france holiday itinerary سفر رحلة رحلات حدود فليكس بلابلا عطلة' },
  { id: 'deals', label: 'التوفير', icon: 'Tag', words: 'discount discounts sale sales deals save saving toogoodtogo black friday second hand flohmarkt خصم خصومات تخفيضات تنزيلات توفير عروض' },
  { id: 'apps', label: 'دليل التطبيقات', icon: 'AppWindow', words: 'app apps doctolib check24 lieferando wolt navigator lime tier dott bolt deepl تطبيق تطبيقات برنامج برامج' },
  { id: 'emergency', label: 'الطوارئ والأطباء', icon: 'Siren', words: 'emergency doctor police ambulance hospital sick 112 110 pharmacy طوارئ اسعاف إسعاف شرطة مستشفى صيدلية مريض دكتور طبيب' },
  { id: 'phrases', label: 'العبارات الألمانية', icon: 'Languages', words: 'phrase phrases phrasebook german words sentences speak عبارات جمل كلمات' },
  { id: 'weather', label: 'الطقس والحياة اليومية', icon: 'CloudSun', words: 'weather climate cold snow winter طقس جو برد ثلج شتاء' },
]
const topicWords = new Map()
for (const t of TOPICS) for (const w of tokenize(t.words)) topicWords.set(w, t.id)
const topicVocab = [...topicWords.keys()]

// مسافة دامراو-ليفنشتاين، بحد أقصى للسرعة.
function dist(a, b, max = 3) {
  if (Math.abs(a.length - b.length) > max) return max + 1
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1)
      rowMin = Math.min(rowMin, d[i][j])
    }
    if (rowMin > max) return max + 1
  }
  return d[a.length][b.length]
}

const allowed = (len) => (len <= 3 ? 0 : len <= 5 ? 1 : 2)

// مدى تطابق كلمة البحث مع كلمة في الفهرس (0 = لا تطابق).
function tokenScore(q, t) {
  if (q === t) return 3
  if (q.length >= 3 && t.startsWith(q)) return 2.5
  if (q.length >= 4 && t.includes(q)) return 2
  const max = allowed(Math.min(q.length, t.length))
  if (!max) return 0
  const d = dist(q, t, max)
  if (d <= max) return 1.6 - d * 0.25
  // خطأ في الجزء المكتوب من كلمة أطول: "ingolst" مقابل "ingolstadt".
  if (q.length >= 5 && t.length > q.length && dist(q, t.slice(0, q.length), 1) <= 1) return 1.3
  return 0
}

// كلمات الأسماء البديلة لكل مدينة/منطقة، حتى تُطابق الأخطاء الإملائية فيها.
const aliasPairs = Object.entries(ALIASES).map(([k, v]) => [tokenize(k).join(' '), v])
const aliasWords = {}
for (const [k, v] of aliasPairs) (aliasWords[v] ??= []).push(...k.split(' '))

// فهرس البحث: الجامعات والمناطق والمدن.
const cityUnis = {}
for (const u of universities) (cityUnis[u.city] ??= []).push(u)

const entries = [
  ...universities.map((u) => {
    const aliases = UNI_ALIASES[u.id] || []
    return {
      type: 'uni',
      u,
      label: u.name,
      tokens: [...new Set([...tokenize(`${u.name} ${u.city} ${aliases.join(' ')}`).filter((t) => !GENERIC.has(t)), ...(aliasWords[u.city] || [])])],
      aliases: aliases.map((a) => tokenize(a).join(' ')),
      city: u.city,
      region: u.region,
    }
  }),
  ...regions.map((r) => ({
    type: 'region',
    r,
    label: r.name,
    tokens: [...new Set([...tokenize(`${r.name} ${r.nameDe}`), ...(aliasWords[r.code] || [])])],
    region: r.code,
  })),
  ...Object.keys(cityUnis).map((city) => ({
    type: 'city',
    city,
    label: city,
    tokens: [...tokenize(city).filter((t) => !STOP.has(t)), ...(aliasWords[city] || [])],
    region: cityUnis[city][0].region,
  })),
]

function scoreEntry(e, qTokens, qJoined) {
  if (e.aliases?.some((a) => a === qJoined)) return { score: 10, fuzzy: false }
  let total = 0
  let fuzzy = false
  for (const q of qTokens) {
    let best = 0
    for (const t of e.tokens) best = Math.max(best, tokenScore(q, t))
    if (best === 0) return { score: 0 }
    if (best < 2) fuzzy = true
    total += best
  }
  const coverage = qTokens.length / Math.max(e.tokens.length, 1)
  const typeBoost = e.type === 'city' ? 0.4 : e.type === 'region' ? 0.3 : 0
  return { score: total / qTokens.length + coverage * 0.6 + typeBoost, fuzzy }
}

function routeFor(topic, place) {
  const city = place?.city
  const regionCode = place?.region
  const region = regionCode ? regionByCode[regionCode] : null
  const unis = city ? cityUnis[city] : null
  const oneUni = unis?.length === 1 ? unis[0] : place?.type === 'uni' ? place.u : null
  const where = place?.type === 'region' ? place.r.name : place?.label
  const enc = encodeURIComponent

  switch (topic) {
    case 'costs':
      if (oneUni && !oneUni.abroad) return { to: `/universities/${oneUni.id}#costs`, title: `الأسعار في ${oneUni.city}` }
      if (city) return { to: `/costs?city=${enc(city)}#prices`, title: `الأسعار في ${city}` }
      if (region) return { to: `/regions/${region.slug}#costs`, title: `الأسعار في ${region.name}` }
      return { to: '/costs', title: 'التكاليف ومخطط الميزانية' }
    case 'housing':
      if (oneUni && !oneUni.abroad) return { to: `/universities/${oneUni.id}#housing`, title: `السكن والغرف في ${oneUni.city}` }
      if (city) return { to: `/housing?city=${enc(city)}`, title: `السكن والغرف في ${city}` }
      if (region) return { to: `/regions/${region.slug}#housing`, title: `السكن في ${region.name}` }
      return { to: '/housing', title: 'السكن والسكنات الطلابية' }
    case 'halal':
      if (city || oneUni) return { to: `/survival-map?city=${enc(city || oneUni.city)}#halal`, title: `الطعام الحلال والمساجد في ${city || oneUni.city}` }
      if (region) return { to: `/regions/${region.slug}#halal`, title: `الطعام الحلال في ${region.name}` }
      return { to: '/survival-map#halal', title: 'دليل الطعام الحلال' }
    case 'internship':
      if (region) return { to: `/internships?region=${region.code}#companies`, title: `التدريب العملي في ${region.name}` }
      return { to: '/internships', title: 'مركز التدريب العملي' }
    case 'airport':
      if (region) return { to: `/survival-map?region=${region.code}#airports`, title: `المطارات الاقتصادية قرب ${where}` }
      return { to: '/survival-map#airports', title: 'المطارات الاقتصادية' }
    case 'ticket':
      return { to: '/survival-map#ticket', title: 'تذكرة ألمانيا: ماذا تغطي' }
    case 'videos':
      if (oneUni) return { to: `/universities/${oneUni.id}#videos`, title: `فيديوهات: ${oneUni.name}` }
      if (region) return { to: `/videos?region=${region.code}`, title: `فيديوهات من ${where}` }
      return { to: '/videos', title: 'مكتبة الفيديو' }
    case 'events':
      if (region) return { to: `/regions/${region.slug}#events`, title: `الفعاليات في ${region.name}` }
      return { to: '/regions', title: 'الفعاليات حسب المنطقة' }
    case 'requirements':
      if (oneUni) return { to: `/universities/${oneUni.id}#requirements`, title: `شروط ${oneUni.name}` }
      return { to: '/universities', title: 'قارن الشروط' }
    case 'banks':
      return { to: '/compare#banks', title: 'مقارنة البنوك: Sparkasse وN26 وDeutsche Bank' }
    case 'mobile':
      return { to: '/compare#mobile', title: 'مقارنة باقات الهاتف: Telekom وVodafone وO2 وAldi Talk' }
    case 'health':
      return { to: '/compare#health', title: 'مقارنة التأمين الصحي: TK وAOK' }
    case 'ingredients':
      return { to: '/ingredients', title: 'دليل المكونات: أرقام E والجيلاتين والكحول' }
    case 'rules':
      return { to: '/rules', title: 'القوانين الخفية: التورنت وفرز النفايات وساعات الهدوء' }
    case 'waste':
      return { to: '/rules#waste', title: 'فرز النفايات (Mülltrennung) بالصور' }
    case 'quiet':
      return { to: '/rules#quiet', title: 'ساعات الهدوء (Ruhezeit): الليل والأحد' }
    case 'routes':
      return { to: '/travel#germany', title: 'من ولاية إلى أخرى: قطار أو حافلة أو طائرة' }
    case 'travel':
      return { to: '/travel', title: 'السفر الاقتصادي: رحلات الحدود ونهاية أسبوع تحت 50 يورو' }
    case 'deals':
      return { to: '/travel#savings', title: 'متى وأين تشتري بأرخص سعر' }
    case 'apps':
      return { to: '/apps', title: 'التطبيقات الأساسية في ألمانيا' }
    case 'arrival':
      return { to: '/guide#before', title: 'قائمة مهام الوصول' }
    case 'emergency':
      return { to: '/guide#emergency', title: 'أرقام الطوارئ والأطباء' }
    case 'phrases':
      return { to: '/guide#phrasebook', title: 'العبارات الألمانية' }
    case 'weather':
      if (region) return { to: `/regions/${region.slug}#life`, title: `الطقس والحياة في ${region.name}` }
      return { to: '/regions', title: 'الطقس حسب المنطقة' }
    default:
      return null
  }
}

function detectTopics(tokens) {
  const found = []
  const rest = []
  for (const t of tokens) {
    let id = /^e\d{3}/.test(t) ? 'ingredients' : topicWords.get(t)
    if (!id && t.length >= 5) {
      // كلمات المواضيع مع خطأ حرف واحد: "internshp"، "تكاليفف".
      const near = topicVocab.find((w) => w.length >= (isArabic(w) ? 4 : 6) && dist(t, w, 1) <= 1)
      if (near) id = topicWords.get(near)
    }
    if (id) {
      if (!found.includes(id)) found.push(id)
    } else rest.push(t)
  }
  return { found, rest }
}

export function smartSearch(input) {
  const raw = tokenize(input)
  if (!raw.length) return { answers: [], results: [], corrected: null }

  // الأسماء البديلة قد تتكون من أكثر من كلمة ("lower saxony").
  let joined = ` ${raw.join(' ')} `
  for (const [k, v] of aliasPairs) {
    if (joined.includes(` ${k} `)) joined = joined.replace(` ${k} `, ` ${tokenize(regionByCode[v]?.name ?? v).join(' ')} `)
  }
  const tokens = joined.trim().split(' ').filter((t) => t && !STOP.has(t))
  const { found: topicIds, rest } = detectTopics(tokens)
  let placeTokens = rest.filter((t) => !GENERIC.has(t))

  const rank = (toks) =>
    entries
      .map((e) => ({ e, ...scoreEntry(e, toks, toks.join(' ')) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)

  let ranked = []
  if (placeTokens.length) {
    ranked = rank(placeTokens)
    if (!ranked.length && placeTokens.length > 1) {
      // تجاهل الكلمات التي لا تطابق شيئاً ("halal fod erfurt" ← "erfurt").
      placeTokens = placeTokens.filter((t) => entries.some((e) => e.tokens.some((x) => tokenScore(t, x) > 0)))
      if (placeTokens.length) ranked = rank(placeTokens)
    }
  } else if (rest.length && !topicIds.length) {
    ranked = entries.filter((e) => e.type === 'uni').map((e) => ({ e, score: 1 }))
  }

  const place = ranked[0]?.e
  const corrected = ranked[0]?.fuzzy ? place.label : null

  const answers = []
  const level = raw.find((t) => ['b1', 'b2', 'c1'].includes(t))
  if (level && level !== 'c1') {
    answers.push({ to: `/universities?level=${level.toUpperCase()}`, title: `الجامعات المتاحة بمستوى ${level.toUpperCase()}`, topic: TOPICS.find((t) => t.id === 'requirements') })
  }
  for (const id of topicIds) {
    if (id === 'requirements' && level && level !== 'c1' && !place) continue
    const r = routeFor(id, place)
    if (r) answers.push({ ...r, topic: TOPICS.find((t) => t.id === id) })
  }

  // مدينة وحدها فيها أكثر من جامعة: اعرض رابطاً لكل جامعاتها.
  if (!topicIds.length && place?.type === 'city' && cityUnis[place.city].length > 1) {
    answers.push({ to: `/universities?q=${encodeURIComponent(place.city)}`, title: `كل الجامعات في ${place.city} (${cityUnis[place.city].length})`, topic: { icon: 'MapPin', label: 'مدينة' } })
  }

  const seen = new Set()
  const results = []
  for (const { e } of ranked) {
    if (results.length >= 8) break
    if (e.type === 'city') {
      for (const u of cityUnis[e.city]) {
        if (!seen.has(u.id)) {
          seen.add(u.id)
          results.push({ type: 'uni', u })
        }
      }
    } else if (e.type === 'uni') {
      if (!seen.has(e.u.id)) {
        seen.add(e.u.id)
        results.push({ type: 'uni', u: e.u })
      }
    } else if (!seen.has(e.r.code)) {
      seen.add(e.r.code)
      results.push({ type: 'region', r: e.r })
    }
  }

  return { answers, results: results.slice(0, 8), corrected }
}
