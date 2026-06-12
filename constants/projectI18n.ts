// Localization for project titles and cities (stored in Russian in
// constants/company.ts). Brand-only titles (NEF UPTOWN, MEGA CENTER PLUS, …)
// pass through unchanged; "Магазин <Brand>" is handled by pattern; the rest are
// mapped explicitly. Falls back to the original Russian when a value is missing.

type L = { en?: string; kk?: string; de?: string; ky?: string; tr?: string }
type Loc = 'ru' | 'en' | 'kk' | 'de' | 'ky' | 'tr'

const TITLE_MAP: Record<string, L> = {
  'Международный аэропорт Алматы': { en: 'Almaty International Airport', de: 'Internationaler Flughafen Almaty', tr: 'Almatı Uluslararası Havalimanı', kk: 'Алматы халықаралық әуежайы', ky: 'Алматы эл аралык аэропорту' },
  'Международный аэропорт Туркестан': { en: 'Turkestan International Airport', de: 'Internationaler Flughafen Turkestan', tr: 'Türkistan Uluslararası Havalimanı', kk: 'Түркістан халықаралық әуежайы', ky: 'Түркстан эл аралык аэропорту' },
  'Coca-Cola Наманган': { en: 'Coca-Cola Namangan', de: 'Coca-Cola Namangan', tr: 'Coca-Cola Namangan' },
  'Coca-Cola Шымкент': { en: 'Coca-Cola Shymkent', de: 'Coca-Cola Shymkent', tr: 'Coca-Cola Şımkent' },
  'Coca-Cola Таджикистан — ПЭТ линия': { en: 'Coca-Cola Tajikistan — PET line', de: 'Coca-Cola Tadschikistan — PET-Linie', tr: 'Coca-Cola Tacikistan — PET hattı', kk: 'Coca-Cola Тәжікстан — ПЭТ желісі', ky: 'Coca-Cola Тажикстан — ПЭТ линиясы' },
  'Coca-Cola Ташкент — ПЭТ линия': { en: 'Coca-Cola Tashkent — PET line', de: 'Coca-Cola Taschkent — PET-Linie', tr: 'Coca-Cola Taşkent — PET hattı', kk: 'Coca-Cola Ташкент — ПЭТ желісі', ky: 'Coca-Cola Ташкент — ПЭТ линиясы' },
  'Coca-Cola Astana — ПЭТ линия': { en: 'Coca-Cola Astana — PET line', de: 'Coca-Cola Astana — PET-Linie', tr: 'Coca-Cola Astana — PET hattı', kk: 'Coca-Cola Астана — ПЭТ желісі', ky: 'Coca-Cola Астана — ПЭТ линиясы' },
  'Жилой дом Туркестан': { en: 'Turkestan Residential Building', de: 'Wohnhaus Turkestan', tr: 'Türkistan Konut Binası', kk: 'Түркістан тұрғын үйі', ky: 'Түркстан турак үйү' },
  'ТЦ RAMSTORE Mega Center Plus': { en: 'RAMSTORE Mall, Mega Center Plus', de: 'RAMSTORE Einkaufszentrum, Mega Center Plus', tr: 'RAMSTORE AVM, Mega Center Plus', kk: 'RAMSTORE сауда орталығы, Mega Center Plus', ky: 'RAMSTORE соода борбору, Mega Center Plus' },
  'ТЦ RAMSTORE Forum Mall': { en: 'RAMSTORE Mall, Forum Mall', de: 'RAMSTORE Einkaufszentrum, Forum Mall', tr: 'RAMSTORE AVM, Forum Mall', kk: 'RAMSTORE сауда орталығы, Forum Mall', ky: 'RAMSTORE соода борбору, Forum Mall' },
  'Бизнес-центр Жибек Жолы': { en: 'Zhibek Zholy Business Center', de: 'Geschäftszentrum Zhibek Zholy', tr: 'Jibek Joly İş Merkezi', kk: '«Жібек Жолы» бизнес-орталығы', ky: '«Жибек Жолы» бизнес борбору' },
  'Реконструкция ТЦ RAMSTORE SAMAL': { en: 'RAMSTORE SAMAL Mall renovation', de: 'Renovierung des RAMSTORE SAMAL Einkaufszentrums', tr: 'RAMSTORE SAMAL AVM yenileme', kk: 'RAMSTORE SAMAL сауда орталығын реконструкциялау', ky: 'RAMSTORE SAMAL соода борборун реконструкциялоо' },
  'Жилой комплекс BLOOM HOUSE': { en: 'BLOOM HOUSE Residential Complex', de: 'Wohnkomplex BLOOM HOUSE', tr: 'BLOOM HOUSE Konut Kompleksi', kk: 'BLOOM HOUSE тұрғын үй кешені', ky: 'BLOOM HOUSE турак жай комплекси' },
  "McDonald's Астана": { en: "McDonald's Astana", de: "McDonald's Astana", tr: "McDonald's Astana" },
  'ТРЦ Shymkent Plaza': { en: 'Shymkent Plaza Mall', de: 'Einkaufszentrum Shymkent Plaza', tr: 'Shymkent Plaza AVM', kk: 'Shymkent Plaza сауда-ойын-сауық орталығы', ky: 'Shymkent Plaza соода-көңүл ачуу борбору' },
  'Завод POLPAN': { en: 'POLPAN Factory', de: 'POLPAN Werk', tr: 'POLPAN Fabrikası', kk: 'POLPAN зауыты', ky: 'POLPAN заводу' },
  'Спортивная база ФК Кайрат': { en: 'FC Kairat Training Base', de: 'FC Kairat Trainingsbasis', tr: 'FK Kairat Antrenman Üssü', kk: '«Қайрат» ФК спорт базасы', ky: '«Кайрат» ФК спорт базасы' },
  'Стадион ФК Кайрат — реконструкция': { en: 'FC Kairat Stadium — renovation', de: 'FC Kairat Stadion — Renovierung', tr: 'FK Kairat Stadyumu — yenileme', kk: '«Қайрат» ФК стадионы — реконструкция', ky: '«Кайрат» ФК стадиону — реконструкция' },
}

// Brand for the lone non-Latin store name.
const BRAND_MAP: Record<string, L> = {
  'Золотое Яблоко': { en: 'Golden Apple', de: 'Golden Apple', tr: 'Golden Apple', kk: 'Алтын Алма', ky: 'Алтын Алма' },
}

const STORE_FORMAT: Record<Loc, (b: string) => string> = {
  ru: (b) => `Магазин ${b}`,
  en: (b) => `${b} Store`,
  de: (b) => `${b}-Geschäft`,
  tr: (b) => `${b} Mağazası`,
  kk: (b) => `${b} дүкені`,
  ky: (b) => `${b} дүкөнү`,
}

const CITY_MAP: Record<string, L> = {
  'Алматы, Казахстан': { en: 'Almaty, Kazakhstan', de: 'Almaty, Kasachstan', tr: 'Almatı, Kazakistan', kk: 'Алматы, Қазақстан', ky: 'Алматы, Казакстан' },
  'Наманган, Узбекистан': { en: 'Namangan, Uzbekistan', de: 'Namangan, Usbekistan', tr: 'Namangan, Özbekistan', kk: 'Наманган, Өзбекстан', ky: 'Наманган, Өзбекстан' },
  'Шымкент, Казахстан': { en: 'Shymkent, Kazakhstan', de: 'Schymkent, Kasachstan', tr: 'Şımkent, Kazakistan', kk: 'Шымкент, Қазақстан', ky: 'Шымкент, Казакстан' },
  'Душанбе, Таджикистан': { en: 'Dushanbe, Tajikistan', de: 'Duschanbe, Tadschikistan', tr: 'Duşanbe, Tacikistan', kk: 'Душанбе, Тәжікстан', ky: 'Душанбе, Тажикстан' },
  'Ташкент, Узбекистан': { en: 'Tashkent, Uzbekistan', de: 'Taschkent, Usbekistan', tr: 'Taşkent, Özbekistan', kk: 'Ташкент, Өзбекстан', ky: 'Ташкент, Өзбекстан' },
  'Туркестан, Казахстан': { en: 'Turkestan, Kazakhstan', de: 'Turkestan, Kasachstan', tr: 'Türkistan, Kazakistan', kk: 'Түркістан, Қазақстан', ky: 'Түркстан, Казакстан' },
  'Астана, Казахстан': { en: 'Astana, Kazakhstan', de: 'Astana, Kasachstan', tr: 'Astana, Kazakistan', kk: 'Астана, Қазақстан', ky: 'Астана, Казакстан' },
  'Алматы / Астана, Казахстан': { en: 'Almaty / Astana, Kazakhstan', de: 'Almaty / Astana, Kasachstan', tr: 'Almatı / Astana, Kazakistan', kk: 'Алматы / Астана, Қазақстан', ky: 'Алматы / Астана, Казакстан' },
}

export function translateTitle(title: string, locale: string): string {
  if (locale === 'ru') return title
  const mapped = TITLE_MAP[title]?.[locale as keyof L]
  if (mapped) return mapped
  const store = title.match(/^Магазин (.+)$/)
  if (store) {
    const brand = BRAND_MAP[store[1]]?.[locale as keyof L] ?? store[1]
    const fmt = STORE_FORMAT[locale as Loc]
    if (fmt) return fmt(brand)
  }
  return title
}

export function translateCity(city: string, locale: string): string {
  if (locale === 'ru') return city
  return CITY_MAP[city]?.[locale as keyof L] ?? city
}
