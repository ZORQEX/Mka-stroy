// Translations for the project "works" tags (constants/company.ts stores them in
// Russian). Keyed by the exact Russian string; falls back to the original when a
// locale or term is missing. Keeps the project modal fully localized.

type WorkLocales = { en: string; kk: string; de: string; ky: string; tr: string }

const WORKS_I18N: Record<string, WorkLocales> = {
  'ОВиК': { en: 'HVAC', kk: 'Жылыту-желдету', de: 'HLK', ky: 'Жылытуу-желдетүү', tr: 'HVAC' },
  'ВК': { en: 'Plumbing', kk: 'Сумен жабдықтау-кәріз', de: 'Sanitär', ky: 'Суу-канализация', tr: 'Tesisat' },
  'АПТ': { en: 'Fire suppression', kk: 'Өрт сөндіру', de: 'Brandschutz', ky: 'Өрт өчүрүү', tr: 'Yangın söndürme' },
  'Система умягченной воды': { en: 'Water softening system', kk: 'Суды жұмсарту жүйесі', de: 'Wasserenthärtungsanlage', ky: 'Сууну жумшартуу системасы', tr: 'Su yumuşatma sistemi' },
  'Паровая котельная': { en: 'Steam boiler house', kk: 'Бу қазандығы', de: 'Dampfkesselhaus', ky: 'Буу казандыгы', tr: 'Buhar kazan dairesi' },
  'Система CO2 (AISI 304)': { en: 'CO2 system (AISI 304)', kk: 'CO2 жүйесі (AISI 304)', de: 'CO2-System (AISI 304)', ky: 'CO2 системасы (AISI 304)', tr: 'CO2 sistemi (AISI 304)' },
  'Система Caustic (AISI 304)': { en: 'Caustic system (AISI 304)', kk: 'Caustic жүйесі (AISI 304)', de: 'Caustic-System (AISI 304)', ky: 'Caustic системасы (AISI 304)', tr: 'Kostik sistemi (AISI 304)' },
  'Система высокого давления воздуха 40 бар': { en: 'High-pressure air system 40 bar', kk: 'Жоғары қысымды ауа жүйесі 40 бар', de: 'Hochdruckluftsystem 40 bar', ky: 'Жогорку басымдагы аба системасы 40 бар', tr: 'Yüksek basınçlı hava sistemi 40 bar' },
  'Система стерильного воздуха': { en: 'Sterile air system', kk: 'Стерильді ауа жүйесі', de: 'Sterilluftsystem', ky: 'Стерилдүү аба системасы', tr: 'Steril hava sistemi' },
  'Система CO2': { en: 'CO2 system', kk: 'CO2 жүйесі', de: 'CO2-System', ky: 'CO2 системасы', tr: 'CO2 sistemi' },
  'Система Caustic': { en: 'Caustic system', kk: 'Caustic жүйесі', de: 'Caustic-System', ky: 'Caustic системасы', tr: 'Kostik sistemi' },
  'Котельная': { en: 'Boiler house', kk: 'Қазандық', de: 'Heizraum', ky: 'Казан үй', tr: 'Kazan dairesi' },
  'Трубопровод центрального отопления и горячей воды': { en: 'Central heating and hot water piping', kk: 'Орталық жылыту және ыстық су құбыры', de: 'Rohrleitungen für Zentralheizung und Warmwasser', ky: 'Борбордук жылытуу жана ысык суу түтүгү', tr: 'Merkezi ısıtma ve sıcak su boru hattı' },
  'Технологические трубопроводы': { en: 'Process piping', kk: 'Технологиялық құбырлар', de: 'Prozessrohrleitungen', ky: 'Технологиялык түтүктөр', tr: 'Proses boru hatları' },
  'Система очистки сточных вод': { en: 'Wastewater treatment system', kk: 'Ағынды суларды тазалау жүйесі', de: 'Abwasserbehandlungssystem', ky: 'Агынды сууларды тазалоо системасы', tr: 'Atık su arıtma sistemi' },
  'Система охлаждения для производства': { en: 'Industrial cooling system', kk: 'Өндіріске арналған салқындату жүйесі', de: 'Kühlsystem für die Produktion', ky: 'Өндүрүш үчүн муздатуу системасы', tr: 'Üretim için soğutma sistemi' },
  'Поставка и установка систем кондиционирования': { en: 'Supply and installation of air conditioning systems', kk: 'Кондиционерлеу жүйелерін жеткізу және орнату', de: 'Lieferung und Installation von Klimaanlagen', ky: 'Кондиционерлөө системаларын жеткирүү жана орнотуу', tr: 'İklimlendirme sistemlerinin tedariki ve kurulumu' },
  'Закупка и установка систем кондиционирования DAIKIN VRV': { en: 'Procurement and installation of DAIKIN VRV air conditioning systems', kk: 'DAIKIN VRV кондиционерлеу жүйелерін сатып алу және орнату', de: 'Beschaffung und Installation von DAIKIN VRV Klimaanlagen', ky: 'DAIKIN VRV кондиционерлөө системаларын сатып алуу жана орнотуу', tr: 'DAIKIN VRV iklimlendirme sistemlerinin tedariki ve kurulumu' },
  'Под ключ: ОВиК, ВК, АПТ, электромонтаж, слаботочные системы': {
    en: 'Turnkey: HVAC, plumbing, fire suppression, electrical, low-voltage systems',
    kk: 'Кілтпен: ОВиК, сумен жабдықтау-кәріз, өрт сөндіру, электромонтаж, әлсіз ток жүйелері',
    de: 'Schlüsselfertig: HLK, Sanitär, Brandschutz, Elektroinstallation, Schwachstromsysteme',
    ky: 'Ачкыч менен: ОВиК, суу-канализация, өрт өчүрүү, электромонтаж, алсыз ток системалары',
    tr: 'Anahtar teslim: HVAC, tesisat, yangın söndürme, elektrik, zayıf akım sistemleri',
  },
  'Под ключ: ОВиК, ВК, АПТ, электромонтаж, слаботочные системы, вентиляция, кондиционирование': {
    en: 'Turnkey: HVAC, plumbing, fire suppression, electrical, low-voltage systems, ventilation, air conditioning',
    kk: 'Кілтпен: ОВиК, сумен жабдықтау-кәріз, өрт сөндіру, электромонтаж, әлсіз ток жүйелері, желдету, кондиционерлеу',
    de: 'Schlüsselfertig: HLK, Sanitär, Brandschutz, Elektroinstallation, Schwachstromsysteme, Lüftung, Klimatisierung',
    ky: 'Ачкыч менен: ОВиК, суу-канализация, өрт өчүрүү, электромонтаж, алсыз ток системалары, желдетүү, кондиционерлөө',
    tr: 'Anahtar teslim: HVAC, tesisat, yangın söndürme, elektrik, zayıf akım sistemleri, havalandırma, iklimlendirme',
  },
}

export function translateWork(work: string, locale: string): string {
  if (locale === 'ru') return work
  const entry = WORKS_I18N[work]
  if (!entry) return work
  return (entry as Record<string, string>)[locale] ?? work
}
