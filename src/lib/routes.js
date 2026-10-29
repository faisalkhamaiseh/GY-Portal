// Travel between German regions: a small model of the rail network with
// typical journey times, used by the route planner on the travel page. Times
// are typical timetable values, not live data; the planner links to DB
// Navigator and Google Maps for the real connection on the day.

// Stations. `pick` stations can be chosen in the planner (grouped by region):
// every host university's town plus the big cities. The others are only places
// where you change trains. `bus` marks cities with FlixBus stops.
export const stations = {
  // Schleswig-Holstein, Hamburg, Bremen, Lower Saxony
  KI: { de: 'Kiel Hbf', en: 'Kiel', ar: 'كيل', region: 'SH', lat: 54.315, lon: 10.132, pick: true, bus: true },
  HL: { de: 'Lübeck Hbf', en: 'Lübeck', ar: 'لوبيك', region: 'SH', lat: 53.868, lon: 10.67, pick: true, bus: true },
  FL: { de: 'Flensburg', en: 'Flensburg', ar: 'فلنسبورغ', region: 'SH', lat: 54.774, lon: 9.437, pick: true, bus: true },
  HH: { de: 'Hamburg Hbf', en: 'Hamburg', ar: 'هامبورغ', region: 'HH', lat: 53.553, lon: 10.007, pick: true, bus: true, air: 'HAM' },
  HB: { de: 'Bremen Hbf', en: 'Bremen', ar: 'بريمن', region: 'HB', lat: 53.083, lon: 8.813, pick: true, bus: true, air: 'BRE' },
  BHV: { de: 'Bremerhaven Hbf', en: 'Bremerhaven', ar: 'بريمرهافن', region: 'HB', lat: 53.535, lon: 8.596, pick: true, bus: true },
  H: { de: 'Hannover Hbf', en: 'Hannover', ar: 'هانوفر', region: 'NI', lat: 52.377, lon: 9.741, pick: true, bus: true, air: 'HAJ' },
  OS: { de: 'Osnabrück Hbf', en: 'Osnabrück', ar: 'أوسنابروك', region: 'NI', lat: 52.273, lon: 8.062, pick: true, bus: true },
  BS: { de: 'Braunschweig Hbf', en: 'Braunschweig', ar: 'براونشفايغ', region: 'NI', lat: 52.252, lon: 10.54, pick: true, bus: true },
  WF: { de: 'Wolfenbüttel', en: 'Wolfenbüttel', ar: 'فولفنبوتل', region: 'NI', lat: 52.161, lon: 10.533, pick: true },
  GOE: { de: 'Göttingen', en: 'Göttingen', ar: 'غوتينغن', region: 'NI', lat: 51.537, lon: 9.927, pick: true, bus: true },
  OL: { de: 'Oldenburg (Oldb) Hbf', en: 'Oldenburg', ar: 'أولدنبورغ', region: 'NI', lat: 53.144, lon: 8.222, pick: true, bus: true },
  EMD: { de: 'Emden Hbf', en: 'Emden', ar: 'إمدن', region: 'NI', lat: 53.367, lon: 7.205, pick: true },
  WHV: { de: 'Wilhelmshaven Hbf', en: 'Wilhelmshaven', ar: 'فيلهلمسهافن', region: 'NI', lat: 53.52, lon: 8.106, pick: true },
  // Mecklenburg-Vorpommern, Berlin, Brandenburg
  HRO: { de: 'Rostock Hbf', en: 'Rostock', ar: 'روستوك', region: 'MV', lat: 54.078, lon: 12.131, pick: true, bus: true },
  STR: { de: 'Stralsund Hbf', en: 'Stralsund', ar: 'شترالزوند', region: 'MV', lat: 54.309, lon: 13.077, pick: true, bus: true },
  NB: { de: 'Neubrandenburg', en: 'Neubrandenburg', ar: 'نويبراندنبورغ', region: 'MV', lat: 53.556, lon: 13.258, pick: true, bus: true },
  B: { de: 'Berlin Hbf', en: 'Berlin', ar: 'برلين', region: 'BE', lat: 52.525, lon: 13.369, pick: true, bus: true, air: 'BER' },
  P: { de: 'Potsdam Hbf', en: 'Potsdam', ar: 'بوتسدام', region: 'BB', lat: 52.392, lon: 13.067, pick: true, bus: true },
  BRB: { de: 'Brandenburg Hbf', en: 'Brandenburg an der Havel', ar: 'براندنبورغ آن در هافل', region: 'BB', lat: 52.401, lon: 12.556, pick: true },
  CB: { de: 'Cottbus Hbf', en: 'Cottbus', ar: 'كوتبوس', region: 'BB', lat: 51.751, lon: 14.325, pick: true, bus: true },
  WIL: { de: 'Wildau', en: 'Wildau', ar: 'فيلداو', region: 'BB', lat: 52.32, lon: 13.635, pick: true },
  // Saxony-Anhalt, Saxony, Thuringia
  MD: { de: 'Magdeburg Hbf', en: 'Magdeburg', ar: 'ماغدبورغ', region: 'ST', lat: 52.13, lon: 11.627, pick: true, bus: true },
  HAL: { de: 'Halle (Saale) Hbf', en: 'Halle', ar: 'هاله', region: 'ST', lat: 51.478, lon: 11.987, pick: true, bus: true },
  SDL: { de: 'Stendal Hbf', en: 'Stendal', ar: 'شتندال', region: 'ST', lat: 52.596, lon: 11.855, pick: true },
  WR: { de: 'Wernigerode', en: 'Wernigerode', ar: 'فيرنيغيروده', region: 'ST', lat: 51.836, lon: 10.785, pick: true },
  DE: { de: 'Dessau Hbf', en: 'Dessau', ar: 'ديساو', region: 'ST', lat: 51.84, lon: 12.232, pick: true, bus: true },
  KOT: { de: 'Köthen', en: 'Köthen', ar: 'كوتن', region: 'ST', lat: 51.755, lon: 11.981, pick: true },
  MER: { de: 'Merseburg Hbf', en: 'Merseburg', ar: 'ميرزبورغ', region: 'ST', lat: 51.354, lon: 11.985, pick: true },
  L: { de: 'Leipzig Hbf', en: 'Leipzig', ar: 'لايبزيغ', region: 'SN', lat: 51.346, lon: 12.382, pick: true, bus: true, air: 'LEJ' },
  DD: { de: 'Dresden Hbf', en: 'Dresden', ar: 'دريسدن', region: 'SN', lat: 51.041, lon: 13.732, pick: true, bus: true, air: 'DRS' },
  C: { de: 'Chemnitz Hbf', en: 'Chemnitz', ar: 'كيمنتس', region: 'SN', lat: 50.84, lon: 12.93, pick: true, bus: true },
  Z: { de: 'Zwickau (Sachs) Hbf', en: 'Zwickau', ar: 'تسفيكاو', region: 'SN', lat: 50.715, lon: 12.474, pick: true, bus: true },
  MW: { de: 'Mittweida', en: 'Mittweida', ar: 'ميتفايدا', region: 'SN', lat: 50.986, lon: 12.981, pick: true },
  FG: { de: 'Freiberg (Sachs)', en: 'Freiberg', ar: 'فرايبرغ', region: 'SN', lat: 50.911, lon: 13.338, pick: true },
  EF: { de: 'Erfurt Hbf', en: 'Erfurt', ar: 'إرفورت', region: 'TH', lat: 50.972, lon: 11.038, pick: true, bus: true },
  WE: { de: 'Weimar', en: 'Weimar', ar: 'فايمار', region: 'TH', lat: 50.992, lon: 11.327, pick: true, bus: true },
  J: { de: 'Jena Paradies', en: 'Jena', ar: 'ينا', region: 'TH', lat: 50.925, lon: 11.587, pick: true, bus: true },
  IL: { de: 'Ilmenau', en: 'Ilmenau', ar: 'إلميناو', region: 'TH', lat: 50.684, lon: 10.919, pick: true },
  NDH: { de: 'Nordhausen', en: 'Nordhausen', ar: 'نوردهاوزن', region: 'TH', lat: 51.495, lon: 10.792, pick: true },
  SMK: { de: 'Schmalkalden', en: 'Schmalkalden', ar: 'شمالكالدن', region: 'TH', lat: 50.721, lon: 10.45, pick: true },
  // Hesse
  KS: { de: 'Kassel-Wilhelmshöhe', en: 'Kassel', ar: 'كاسل', region: 'HE', lat: 51.313, lon: 9.447, pick: true, bus: true },
  F: { de: 'Frankfurt (Main) Hbf', en: 'Frankfurt', ar: 'فرانكفورت', region: 'HE', lat: 50.107, lon: 8.664, pick: true, bus: true, air: 'FRA' },
  FD: { de: 'Fulda', en: 'Fulda', ar: 'فولدا', region: 'HE', lat: 50.555, lon: 9.684, pick: true, bus: true },
  DA: { de: 'Darmstadt Hbf', en: 'Darmstadt', ar: 'دارمشتات', region: 'HE', lat: 49.873, lon: 8.629, pick: true, bus: true },
  DI: { de: 'Dieburg', en: 'Dieburg', ar: 'ديبورغ', region: 'HE', lat: 49.899, lon: 8.84, pick: true },
  WI: { de: 'Wiesbaden Hbf', en: 'Wiesbaden', ar: 'فيسبادن', region: 'HE', lat: 50.071, lon: 8.244, pick: true, bus: true },
  RUE: { de: 'Rüsselsheim', en: 'Rüsselsheim', ar: 'روسلسهايم', region: 'HE', lat: 49.993, lon: 8.414, pick: true },
  GI: { de: 'Gießen', en: 'Giessen', ar: 'غيسن', region: 'HE', lat: 50.58, lon: 8.663, pick: true, bus: true },
  MR: { de: 'Marburg (Lahn)', en: 'Marburg', ar: 'ماربورغ', region: 'HE', lat: 50.819, lon: 8.774, pick: true, bus: true },
  // Rhineland-Palatinate, Saarland
  MZ: { de: 'Mainz Hbf', en: 'Mainz', ar: 'ماينتس', region: 'RP', lat: 50.001, lon: 8.259, pick: true, bus: true },
  KO: { de: 'Koblenz Hbf', en: 'Koblenz', ar: 'كوبلنتس', region: 'RP', lat: 50.351, lon: 7.589, pick: true, bus: true },
  TR: { de: 'Trier Hbf', en: 'Trier', ar: 'ترير', region: 'RP', lat: 49.757, lon: 6.651, pick: true, bus: true },
  KL: { de: 'Kaiserslautern Hbf', en: 'Kaiserslautern', ar: 'كايزرسلاوترن', region: 'RP', lat: 49.445, lon: 7.769, pick: true, bus: true },
  WO: { de: 'Worms Hbf', en: 'Worms', ar: 'فورمس', region: 'RP', lat: 49.635, lon: 8.357, pick: true },
  BIN: { de: 'Bingen (Rhein) Hbf', en: 'Bingen', ar: 'بينغن', region: 'RP', lat: 49.966, lon: 7.904, pick: true },
  REM: { de: 'Remagen', en: 'Remagen', ar: 'ريماغن', region: 'RP', lat: 50.578, lon: 7.23, pick: true },
  GER: { de: 'Germersheim', en: 'Germersheim', ar: 'غيرمرسهايم', region: 'RP', lat: 49.224, lon: 8.371, pick: true },
  HWB: { de: 'Hoppstädten-Weiersbach Umwelt-Campus', en: 'Hoppstädten-Weiersbach (Umwelt-Campus)', ar: 'هوبشتيتن-فايرسباخ (Umwelt-Campus)', region: 'RP', lat: 49.613, lon: 7.2, pick: true },
  SB: { de: 'Saarbrücken Hbf', en: 'Saarbrücken', ar: 'زاربروكن', region: 'SL', lat: 49.241, lon: 6.991, pick: true, bus: true },
  // Baden-Württemberg
  S: { de: 'Stuttgart Hbf', en: 'Stuttgart', ar: 'شتوتغارت', region: 'BW', lat: 48.784, lon: 9.182, pick: true, bus: true, air: 'STR' },
  MA: { de: 'Mannheim Hbf', en: 'Mannheim', ar: 'مانهايم', region: 'BW', lat: 49.479, lon: 8.47, pick: true, bus: true },
  KA: { de: 'Karlsruhe Hbf', en: 'Karlsruhe', ar: 'كارلسروه', region: 'BW', lat: 48.994, lon: 8.402, pick: true, bus: true },
  UL: { de: 'Ulm Hbf', en: 'Ulm', ar: 'أولم', region: 'BW', lat: 48.399, lon: 9.983, pick: true, bus: true },
  HN: { de: 'Heilbronn Hbf', en: 'Heilbronn', ar: 'هايلبرون', region: 'BW', lat: 49.143, lon: 9.207, pick: true, bus: true },
  AA: { de: 'Aalen', en: 'Aalen', ar: 'آلن', region: 'BW', lat: 48.841, lon: 10.091, pick: true },
  HDH: { de: 'Heidenheim', en: 'Heidenheim', ar: 'هايدنهايم', region: 'BW', lat: 48.677, lon: 10.153, pick: true },
  BC: { de: 'Biberach (Riß)', en: 'Biberach', ar: 'بيبراخ', region: 'BW', lat: 48.098, lon: 9.791, pick: true },
  SIG: { de: 'Sigmaringen', en: 'Sigmaringen', ar: 'زيغمارينغن', region: 'BW', lat: 48.089, lon: 9.217, pick: true },
  ALB: { de: 'Albstadt-Ebingen', en: 'Albstadt', ar: 'ألبشتات', region: 'BW', lat: 48.21, lon: 9.02, pick: true },
  NT: { de: 'Nürtingen', en: 'Nürtingen', ar: 'نورتينغن', region: 'BW', lat: 48.627, lon: 9.336, pick: true },
  RT: { de: 'Reutlingen Hbf', en: 'Reutlingen', ar: 'رويتلينغن', region: 'BW', lat: 48.495, lon: 9.212, pick: true, bus: true },
  TUE: { de: 'Tübingen Hbf', en: 'Tübingen', ar: 'توبنغن', region: 'BW', lat: 48.516, lon: 9.055, pick: true, bus: true },
  OG: { de: 'Offenburg', en: 'Offenburg', ar: 'أوفنبورغ', region: 'BW', lat: 48.477, lon: 7.946, pick: true, bus: true },
  VS: { de: 'Villingen (Schwarzw)', en: 'Villingen-Schwenningen', ar: 'فيلينغن-شفيننغن', region: 'BW', lat: 48.059, lon: 8.465, pick: true },
  MGH: { de: 'Bad Mergentheim', en: 'Bad Mergentheim', ar: 'باد ميرغنتهايم', region: 'BW', lat: 49.493, lon: 9.774, pick: true },
  // Bavaria
  M: { de: 'München Hbf', en: 'Munich', ar: 'ميونخ', region: 'BY', lat: 48.14, lon: 11.558, pick: true, bus: true, air: 'MUC' },
  N: { de: 'Nürnberg Hbf', en: 'Nuremberg', ar: 'نورنبرغ', region: 'BY', lat: 49.446, lon: 11.082, pick: true, bus: true, air: 'NUE' },
  WUE: { de: 'Würzburg Hbf', en: 'Würzburg', ar: 'فورتسبورغ', region: 'BY', lat: 49.802, lon: 9.936, pick: true, bus: true },
  A: { de: 'Augsburg Hbf', en: 'Augsburg', ar: 'أوغسبورغ', region: 'BY', lat: 48.366, lon: 10.886, pick: true, bus: true },
  R: { de: 'Regensburg Hbf', en: 'Regensburg', ar: 'ريغنسبورغ', region: 'BY', lat: 49.012, lon: 12.1, pick: true, bus: true },
  IN: { de: 'Ingolstadt Hbf', en: 'Ingolstadt', ar: 'إنغولشتات', region: 'BY', lat: 48.745, lon: 11.437, pick: true, bus: true },
  LA: { de: 'Landshut (Bay) Hbf', en: 'Landshut', ar: 'لاندسهوت', region: 'BY', lat: 48.547, lon: 12.137, pick: true, bus: true },
  DEG: { de: 'Deggendorf Hbf', en: 'Deggendorf', ar: 'ديغندورف', region: 'BY', lat: 48.832, lon: 12.957, pick: true },
  RO: { de: 'Rosenheim', en: 'Rosenheim', ar: 'روزنهايم', region: 'BY', lat: 47.85, lon: 12.12, pick: true, bus: true },
  KE: { de: 'Kempten (Allgäu) Hbf', en: 'Kempten', ar: 'كمبتن', region: 'BY', lat: 47.712, lon: 10.317, pick: true, bus: true },
  NU: { de: 'Neu-Ulm', en: 'Neu-Ulm', ar: 'نوي-أولم', region: 'BY', lat: 48.393, lon: 10.004, pick: true },
  BT: { de: 'Bayreuth Hbf', en: 'Bayreuth', ar: 'بايرويت', region: 'BY', lat: 49.95, lon: 11.574, pick: true, bus: true },
  COB: { de: 'Coburg', en: 'Coburg', ar: 'كوبورغ', region: 'BY', lat: 50.264, lon: 10.965, pick: true },
  SW: { de: 'Schweinfurt Hbf', en: 'Schweinfurt', ar: 'شفاينفورت', region: 'BY', lat: 50.036, lon: 10.214, pick: true },
  ASH: { de: 'Aschaffenburg Hbf', en: 'Aschaffenburg', ar: 'أشافنبورغ', region: 'BY', lat: 49.981, lon: 9.143, pick: true, bus: true },
  AM: { de: 'Amberg', en: 'Amberg', ar: 'أمبرغ', region: 'BY', lat: 49.444, lon: 11.854, pick: true },
  WEN: { de: 'Weiden (Oberpf)', en: 'Weiden', ar: 'فايدن', region: 'BY', lat: 49.671, lon: 12.156, pick: true },
  // North Rhine-Westphalia
  K: { de: 'Köln Hbf', en: 'Cologne', ar: 'كولونيا', region: 'NW', lat: 50.943, lon: 6.959, pick: true, bus: true, air: 'CGN' },
  D: { de: 'Düsseldorf Hbf', en: 'Düsseldorf', ar: 'دوسلدورف', region: 'NW', lat: 51.22, lon: 6.794, pick: true, bus: true, air: 'DUS' },
  DO: { de: 'Dortmund Hbf', en: 'Dortmund', ar: 'دورتموند', region: 'NW', lat: 51.518, lon: 7.459, pick: true, bus: true },
  BO: { de: 'Bochum Hbf', en: 'Bochum', ar: 'بوخوم', region: 'NW', lat: 51.479, lon: 7.223, pick: true, bus: true },
  W: { de: 'Wuppertal Hbf', en: 'Wuppertal', ar: 'فوبرتال', region: 'NW', lat: 51.255, lon: 7.15, pick: true, bus: true },
  KR: { de: 'Krefeld Hbf', en: 'Krefeld', ar: 'كريفيلد', region: 'NW', lat: 51.326, lon: 6.569, pick: true, bus: true },
  MS: { de: 'Münster (Westf) Hbf', en: 'Münster', ar: 'مونستر', region: 'NW', lat: 51.957, lon: 7.635, pick: true, bus: true },
  BI: { de: 'Bielefeld Hbf', en: 'Bielefeld', ar: 'بيليفيلد', region: 'NW', lat: 52.029, lon: 8.533, pick: true, bus: true },
  AC: { de: 'Aachen Hbf', en: 'Aachen', ar: 'آخن', region: 'NW', lat: 50.768, lon: 6.092, pick: true, bus: true },
  BN: { de: 'Bonn Hbf', en: 'Bonn', ar: 'بون', region: 'NW', lat: 50.732, lon: 7.097, pick: true, bus: true },
  STA: { de: 'Sankt Augustin Hochschule', en: 'Sankt Augustin', ar: 'زانكت أوغستين', region: 'NW', lat: 50.776, lon: 7.193, pick: true },
  SI: { de: 'Siegen Hbf', en: 'Siegen', ar: 'زيغن', region: 'NW', lat: 50.875, lon: 8.017, pick: true, bus: true },
  GM: { de: 'Gummersbach', en: 'Gummersbach', ar: 'غومرسباخ', region: 'NW', lat: 51.026, lon: 7.565, pick: true },
  HMM: { de: 'Hamm (Westf) Hbf', en: 'Hamm', ar: 'هام', region: 'NW', lat: 51.678, lon: 7.808, pick: true, bus: true },
  LP: { de: 'Lippstadt', en: 'Lippstadt', ar: 'ليبشتات', region: 'NW', lat: 51.672, lon: 8.346, pick: true },
  PB: { de: 'Paderborn Hbf', en: 'Paderborn', ar: 'بادربورن', region: 'NW', lat: 51.713, lon: 8.742, pick: true, bus: true },
  HX: { de: 'Höxter Rathaus', en: 'Höxter', ar: 'هوكستر', region: 'NW', lat: 51.774, lon: 9.381, pick: true },
  DT: { de: 'Detmold', en: 'Detmold', ar: 'ديتمولد', region: 'NW', lat: 51.937, lon: 8.879, pick: true },
  LE: { de: 'Lemgo-Lüttfeld', en: 'Lemgo', ar: 'ليمغو', region: 'NW', lat: 52.028, lon: 8.9, pick: true },
  // Where you change trains.
  UE: { de: 'Uelzen', en: 'Uelzen', ar: 'أولتسن', lat: 52.966, lon: 10.558 },
  WBG: { de: 'Wittenberge', en: 'Wittenberge', ar: 'فيتنبرغه', lat: 53.0, lon: 11.753 },
  LW: { de: 'Lutherstadt Wittenberg Hbf', en: 'Lutherstadt Wittenberg', ar: 'فيتنبرغ', lat: 51.868, lon: 12.662 },
  EW: { de: 'Elsterwerda', en: 'Elsterwerda', ar: 'إلسترفيردا', lat: 51.463, lon: 13.522 },
  NZ: { de: 'Neustrelitz Hbf', en: 'Neustrelitz', ar: 'نويشتريليتس', lat: 53.363, lon: 13.066 },
  NMB: { de: 'Naumburg (Saale) Hbf', en: 'Naumburg', ar: 'ناومبورغ', lat: 51.164, lon: 11.824 },
  EA: { de: 'Eisenach', en: 'Eisenach', ar: 'آيزناخ', lat: 50.977, lon: 10.332 },
  WSH: { de: 'Wernshausen', en: 'Wernshausen', ar: 'فيرنسهاوزن', lat: 50.723, lon: 10.356 },
  ZM: { de: 'Zella-Mehlis', en: 'Zella-Mehlis', ar: 'تسيلا-ميليس', lat: 50.656, lon: 10.669 },
  BEB: { de: 'Bebra', en: 'Bebra', ar: 'بيبرا', lat: 50.971, lon: 9.792 },
  SAL: { de: 'Saalfeld (Saale)', en: 'Saalfeld', ar: 'زالفيلد', lat: 50.648, lon: 11.364 },
  LIF: { de: 'Lichtenfels', en: 'Lichtenfels', ar: 'ليشتنفلس', lat: 50.145, lon: 11.059 },
  CR: { de: 'Crailsheim', en: 'Crailsheim', ar: 'كرايلسهايم', lat: 49.135, lon: 10.071 },
  LAU: { de: 'Lauda', en: 'Lauda', ar: 'لاودا', lat: 49.564, lon: 9.703 },
  PLT: { de: 'Plattling', en: 'Plattling', ar: 'بلاتلينغ', lat: 48.777, lon: 12.871 },
  NEU: { de: 'Neubrücke (Nahe)', en: 'Neubrücke', ar: 'نويبروكه', lat: 49.635, lon: 7.135 },
  HA: { de: 'Hagen Hbf', en: 'Hagen', ar: 'هاغن', lat: 51.363, lon: 7.461 },
}

// Each line: transport type, then stops with the minutes from the first stop.
// Everything runs both ways. RE, RB, S-Bahn, trams and local buses are covered
// by the semester ticket; ICE, IC and EC are not.
const regionalLines = [
  ['RE', 'KI', 0, 'HH', 80],
  ['RE', 'HL', 0, 'HH', 45],
  ['RE', 'HL', 0, 'KI', 75],
  ['RE', 'FL', 0, 'HH', 115],
  ['RE', 'FL', 0, 'KI', 80],
  ['RE', 'HH', 0, 'HB', 75],
  ['RE', 'HH', 0, 'UE', 60],
  ['RE', 'UE', 0, 'H', 65],
  ['RE', 'HB', 0, 'BHV', 38],
  ['RE', 'H', 0, 'HB', 75, 'OL', 105, 'EMD', 160],
  ['RB', 'OL', 0, 'WHV', 50],
  ['RE', 'HB', 0, 'OS', 85],
  ['RE', 'OL', 0, 'OS', 75],
  ['RE', 'OS', 0, 'MS', 35],
  ['RE', 'OS', 0, 'H', 115],
  ['RB', 'OS', 0, 'BI', 60],
  ['RE', 'H', 0, 'BS', 42],
  ['RB', 'BS', 0, 'WF', 12],
  ['RE', 'H', 0, 'GOE', 95],
  ['RE', 'BS', 0, 'MD', 65],
  ['RE', 'MD', 0, 'KOT', 40, 'HAL', 75],
  ['S', 'HAL', 0, 'L', 30],
  ['S', 'HAL', 0, 'MER', 12],
  ['RE', 'MD', 0, 'BRB', 50, 'P', 85, 'B', 110],
  ['RE', 'MD', 0, 'SDL', 50, 'UE', 115],
  ['RE', 'MD', 0, 'WR', 75],
  ['RE', 'MD', 0, 'DE', 55],
  ['RE', 'DE', 0, 'L', 50],
  ['RE', 'B', 0, 'DE', 105],
  ['RE', 'B', 0, 'NZ', 80, 'HRO', 170],
  ['RB', 'NZ', 0, 'NB', 30],
  ['RE', 'B', 0, 'STR', 180],
  ['RE', 'HRO', 0, 'STR', 65],
  ['RE', 'HH', 0, 'HRO', 150],
  ['RE', 'B', 0, 'WBG', 95],
  ['RE', 'WBG', 0, 'HH', 105],
  ['RE', 'B', 0, 'CB', 85],
  ['S', 'B', 0, 'WIL', 45],
  ['RE', 'B', 0, 'LW', 85],
  ['RE', 'LW', 0, 'L', 50],
  ['RE', 'B', 0, 'EW', 105],
  ['RB', 'EW', 0, 'DD', 55],
  ['RE', 'CB', 0, 'DD', 100],
  ['RE', 'L', 0, 'DD', 100],
  ['RE', 'L', 0, 'C', 65],
  ['RE', 'DD', 0, 'FG', 35, 'C', 65, 'Z', 100],
  ['RB', 'C', 0, 'MW', 25],
  ['S', 'L', 0, 'Z', 70],
  ['RE', 'L', 0, 'NMB', 50],
  ['RB', 'HAL', 0, 'NMB', 40],
  ['RE', 'NMB', 0, 'WE', 35, 'EF', 50],
  ['RE', 'EF', 0, 'WE', 13, 'J', 40],
  ['RE', 'EF', 0, 'EA', 50],
  ['RB', 'EA', 0, 'WSH', 40],
  ['RB', 'WSH', 0, 'SMK', 15],
  ['RE', 'EF', 0, 'ZM', 55],
  ['RB', 'ZM', 0, 'SMK', 30],
  ['RB', 'EF', 0, 'IL', 55],
  ['RE', 'EF', 0, 'NDH', 75],
  ['RE', 'HAL', 0, 'NDH', 95],
  ['RB', 'GOE', 0, 'NDH', 100],
  ['RE', 'GOE', 0, 'EF', 110],
  ['RE', 'EF', 0, 'SAL', 80],
  ['RE', 'SAL', 0, 'LIF', 70],
  ['RE', 'LIF', 0, 'N', 65],
  ['RE', 'LIF', 0, 'COB', 20],
  ['RB', 'EA', 0, 'BEB', 35],
  ['RB', 'BEB', 0, 'KS', 55],
  ['RB', 'BEB', 0, 'FD', 50],
  ['RE', 'FD', 0, 'F', 85],
  ['RE', 'KS', 0, 'MR', 75, 'GI', 95, 'F', 140],
  ['RE', 'KS', 0, 'GOE', 60],
  ['RE', 'GI', 0, 'SI', 70],
  ['RE', 'F', 0, 'DA', 17],
  ['RE', 'DA', 0, 'MA', 50],
  ['RB', 'DA', 0, 'DI', 20],
  ['RB', 'DI', 0, 'ASH', 25],
  ['S', 'F', 0, 'WI', 40],
  ['S', 'F', 0, 'RUE', 22, 'MZ', 35, 'WI', 47],
  ['RE', 'F', 0, 'MZ', 35, 'BIN', 60, 'KO', 115],
  ['RE', 'F', 0, 'MZ', 35, 'NEU', 120, 'SB', 185],
  ['Bus', 'NEU', 0, 'HWB', 15],
  ['RE', 'F', 0, 'ASH', 40, 'WUE', 120],
  ['RE', 'WUE', 0, 'SW', 28],
  ['RE', 'WUE', 0, 'N', 70],
  ['RE', 'N', 0, 'IN', 50, 'M', 105],
  ['RE', 'N', 0, 'R', 60],
  ['RE', 'M', 0, 'LA', 50, 'R', 95],
  ['RE', 'LA', 0, 'PLT', 40],
  ['RE', 'R', 0, 'PLT', 45],
  ['RB', 'PLT', 0, 'DEG', 10],
  ['RE', 'N', 0, 'BT', 60],
  ['RE', 'N', 0, 'AM', 50],
  ['RE', 'R', 0, 'AM', 60],
  ['RE', 'N', 0, 'WEN', 80],
  ['RE', 'R', 0, 'WEN', 65],
  ['RE', 'M', 0, 'RO', 50],
  ['RE', 'M', 0, 'A', 45, 'UL', 95],
  ['RB', 'UL', 0, 'NU', 5],
  ['RE', 'M', 0, 'KE', 100],
  ['RE', 'A', 0, 'KE', 75],
  ['RE', 'UL', 0, 'KE', 90],
  ['RE', 'A', 0, 'N', 115],
  ['RE', 'UL', 0, 'S', 80],
  ['RE', 'WUE', 0, 'LAU', 35, 'HN', 115, 'S', 160],
  ['RB', 'LAU', 0, 'MGH', 15],
  ['RE', 'S', 0, 'CR', 105],
  ['RE', 'CR', 0, 'N', 90],
  ['RE', 'S', 0, 'AA', 70],
  ['RE', 'UL', 0, 'HDH', 45, 'AA', 75],
  ['RE', 'AA', 0, 'CR', 35],
  ['RE', 'UL', 0, 'BC', 30],
  ['RE', 'UL', 0, 'SIG', 85],
  ['RE', 'S', 0, 'NT', 25, 'RT', 40, 'TUE', 58],
  ['RB', 'TUE', 0, 'ALB', 60],
  ['RB', 'SIG', 0, 'ALB', 25],
  ['RE', 'S', 0, 'KA', 75],
  ['RE', 'KA', 0, 'MA', 60],
  ['S', 'KA', 0, 'GER', 40],
  ['S', 'MA', 0, 'GER', 45],
  ['RE', 'KA', 0, 'OG', 55],
  ['RE', 'OG', 0, 'VS', 75],
  ['RE', 'S', 0, 'VS', 125],
  ['RE', 'F', 0, 'MA', 75],
  ['RE', 'MZ', 0, 'WO', 30, 'MA', 50],
  ['RE', 'MA', 0, 'KL', 50],
  ['RE', 'KL', 0, 'SB', 65],
  ['RE', 'KO', 0, 'REM', 35, 'BN', 55, 'K', 85],
  ['Tram', 'BN', 0, 'STA', 25],
  ['RE', 'KO', 0, 'TR', 85, 'SB', 155],
  ['RE', 'DO', 0, 'BO', 10, 'D', 57, 'K', 85, 'AC', 140],
  ['RE', 'K', 0, 'D', 28, 'DO', 88, 'HMM', 108, 'BI', 158],
  ['RE', 'HMM', 0, 'LP', 25, 'PB', 50],
  ['RE', 'PB', 0, 'KS', 80],
  ['RB', 'PB', 0, 'HX', 60],
  ['RB', 'GOE', 0, 'HX', 80],
  ['RB', 'PB', 0, 'DT', 35],
  ['RB', 'BI', 0, 'DT', 40],
  ['RB', 'BI', 0, 'LE', 45],
  ['RE', 'BI', 0, 'H', 75],
  ['RE', 'MS', 0, 'HMM', 30, 'HA', 60, 'W', 75, 'K', 115],
  ['RB', 'MS', 0, 'DO', 50],
  ['RE', 'D', 0, 'KR', 20],
  ['RE', 'K', 0, 'KR', 45],
  ['RE', 'K', 0, 'SI', 90],
  ['RE', 'HA', 0, 'SI', 100],
  ['RB', 'K', 0, 'GM', 70],
]

const longDistanceLines = [
  ['ICE', 'HH', 0, 'H', 82, 'GOE', 118, 'KS', 140, 'FD', 172, 'WUE', 207, 'N', 265, 'IN', 300, 'M', 335],
  ['ICE', 'HH', 0, 'H', 82, 'GOE', 118, 'KS', 140, 'F', 225, 'MA', 265, 'S', 305],
  ['ICE', 'B', 0, 'HAL', 70, 'EF', 105, 'N', 175, 'IN', 210, 'M', 245],
  ['ICE', 'B', 0, 'L', 75, 'EF', 120, 'N', 190, 'M', 262],
  ['ICE', 'B', 0, 'L', 75, 'EF', 120, 'F', 250],
  ['ICE', 'DD', 0, 'L', 65, 'EF', 115, 'EA', 140, 'FD', 190, 'F', 250],
  ['ICE', 'B', 0, 'SDL', 52, 'H', 98, 'BI', 145, 'HMM', 172, 'DO', 192, 'BO', 202, 'D', 240, 'K', 265],
  ['ICE', 'B', 0, 'H', 98, 'BI', 145, 'HMM', 172, 'HA', 197, 'W', 214, 'K', 250],
  ['IC', 'HH', 0, 'HB', 55, 'OS', 105, 'MS', 132, 'DO', 165, 'K', 240],
  ['ICE', 'K', 0, 'F', 65, 'WUE', 135, 'N', 190, 'M', 255],
  ['ICE', 'K', 0, 'MA', 88, 'S', 135, 'UL', 180, 'A', 222, 'M', 255],
  ['ICE', 'F', 0, 'MA', 38, 'S', 80, 'UL', 125, 'A', 165, 'M', 195],
  ['ICE', 'F', 0, 'MA', 38, 'KA', 65, 'OG', 90],
  ['ICE', 'F', 0, 'MA', 38, 'KL', 75, 'SB', 115],
  ['IC', 'K', 0, 'BN', 23, 'KO', 55, 'MZ', 105, 'MA', 145],
  ['ICE', 'F', 0, 'ASH', 30, 'WUE', 70, 'N', 125, 'R', 180, 'PLT', 210],
  ['EC', 'B', 0, 'DD', 115],
  ['IC', 'L', 0, 'MD', 70, 'BS', 125, 'H', 160, 'HB', 225, 'OL', 255, 'EMD', 305],
  ['IC', 'B', 0, 'P', 22, 'BRB', 45, 'MD', 95],
  ['ICE', 'B', 0, 'HH', 105],
  ['IC', 'HH', 0, 'HL', 40],
  ['IC', 'HH', 0, 'KI', 75],
  ['IC', 'HH', 0, 'HRO', 125, 'STR', 185],
  ['ICE', 'B', 0, 'HRO', 125],
  ['ICE', 'B', 0, 'BS', 85, 'GOE', 135, 'KS', 155, 'F', 240],
  ['ICE', 'K', 0, 'AC', 35],
  ['IC', 'OS', 0, 'H', 72, 'B', 180],
  ['IC', 'KS', 0, 'PB', 60, 'HMM', 95, 'DO', 115],
  ['IC', 'S', 0, 'AA', 65, 'CR', 95, 'N', 135],
  ['IC', 'F', 0, 'GI', 40, 'MR', 55, 'KS', 115],
  ['EC', 'M', 0, 'RO', 35],
]

// Average time to change trains, waiting included.
export const CHANGE_MINUTES = 15

function edges(lines) {
  const out = {}
  for (const [type, ...stops] of lines) {
    for (let i = 0; i < stops.length; i += 2) {
      for (let j = i + 2; j < stops.length; j += 2) {
        const [a, ta, b, tb] = [stops[i], stops[i + 1], stops[j], stops[j + 1]]
        for (const [from, to] of [[a, b], [b, a]]) (out[from] ??= []).push({ from, to, type, minutes: tb - ta })
      }
    }
  }
  return out
}

const regionalEdges = edges(regionalLines)
const allEdges = edges([...regionalLines, ...longDistanceLines])

// Shortest trip by time, counting each change as CHANGE_MINUTES.
function shortest(graph, from, to) {
  const best = { [from]: { cost: 0, legs: [] } }
  const open = [from]
  while (open.length) {
    open.sort((a, b) => best[a].cost - best[b].cost)
    const here = open.shift()
    if (here === to) break
    for (const e of graph[here] || []) {
      const cost = best[here].cost + e.minutes + (best[here].legs.length ? CHANGE_MINUTES : 0)
      if (!best[e.to] || cost < best[e.to].cost) {
        if (!best[e.to]) open.push(e.to)
        best[e.to] = { cost, legs: [...best[here].legs, e] }
      }
    }
  }
  const trip = best[to]
  return trip && { minutes: trip.cost, legs: trip.legs, changes: trip.legs.length - 1 }
}

const rad = (d) => (d * Math.PI) / 180
export function km(a, b) {
  const [p, q] = [stations[a], stations[b]]
  const h = Math.sin(rad(q.lat - p.lat) / 2) ** 2 + Math.cos(rad(p.lat)) * Math.cos(rad(q.lat)) * Math.sin(rad(q.lon - p.lon) / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

export const longDistance = (leg) => leg.type === 'ICE' || leg.type === 'IC' || leg.type === 'EC'
const round5 = (n) => Math.round(n / 5) * 5
const euros = (n) => Math.floor(n) + 0.99

// Lowest published ICE/IC fare (Super Sparpreis, 2nd class) when booked early.
export const SPARPREIS_FROM = 17.99

export function plan(from, to) {
  const free = shortest(regionalEdges, from, to)
  let fast = shortest(allEdges, from, to)
  // Only worth showing when the ICE or IC saves real time.
  if (!fast?.legs.some(longDistance) || fast.minutes > free.minutes - 20) fast = null
  const straight = km(from, to)
  const result = { from, to, km: Math.round(straight), free, fast }

  if (fast) {
    const railKm = fast.legs.filter(longDistance).reduce((s, l) => s + km(l.from, l.to) * 1.2, 0)
    // Flexpreis on the day; Sparpreis tickets booked weeks ahead start at SPARPREIS_FROM.
    result.fast.flex = Math.min(175, round5(25 + 0.28 * railKm))
  }

  // FlixBus between larger cities: about 90 km/h on the road, plus city traffic.
  if (straight >= 120 && stations[from].bus && stations[to].bus) {
    const road = straight * 1.25
    result.bus = { minutes: round5((road / 90) * 60 + 15), from: euros(Math.max(5, road * 0.03)) }
  }

  // Domestic flights only make sense across the country.
  const [airA, airB] = [stations[from].air, stations[to].air]
  if (airA && airB && straight >= 400) {
    const air = round5((straight / 750) * 60 + 30)
    result.flight = { airA, airB, air, minutes: air + 120 }
  }
  return result
}

// Which option to recommend, compared on time and money.
export function verdict({ free, fast, bus }) {
  if (!fast || free.minutes - fast.minutes <= 45) return 'free'
  if (free.minutes <= 300) return 'free-or-fast'
  if (bus && bus.from < SPARPREIS_FROM && bus.minutes - fast.minutes <= 90) return 'bus'
  return 'fast'
}

export const pickable = Object.entries(stations).filter(([, s]) => s.pick).map(([id]) => id)

export const links = {
  maps: (a, b) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(stations[a].de)}&destination=${encodeURIComponent(stations[b].de)}&travelmode=transit`,
  flights: (a, b) => `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights from ${a} to ${b}`)}`,
  compare: (a, b) => `https://www.rome2rio.com/map/${encodeURIComponent(stations[a].en)}/${encodeURIComponent(stations[b].en)}`,
}
