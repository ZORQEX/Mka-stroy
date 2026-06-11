# 🌍 Руководство по мультиязычности MKA STROY

Сайт поддерживает 5 языков: **Русский (ru)**, **English (en)**, **Қазақша (kk)**, **Deutsch (de)**, **Кыргызча (ky)**.

---

## 📁 Структура файлов i18n

```
leason1/
├── messages/                    # Переводы
│   ├── ru.json                 # Русский (основной)
│   ├── en.json                 # English
│   ├── kk.json                 # Қазақша
│   ├── de.json                 # Deutsch
│   └── ky.json                 # Кыргызча
├── i18n.config.ts              # Конфигурация языков
├── middleware.ts               # Автоматическое определение языка
├── lib/i18n.ts                 # Утилиты для переводов
├── components/
│   └── LanguageSwitcher.tsx    # Переключатель языков
└── app/
    ├── layout.tsx              # Root layout (минимальный)
    └── [locale]/               # Локализованные страницы
        ├── layout.tsx          # Локализованный layout
        ├── page.tsx            # Главная
        ├── services/           # Услуги
        ├── projects/           # Проекты
        ├── contacts/           # Контакты
        └── privacy/            # Политика
```

---

## 🚀 Как работает i18n

### 1. Middleware определяет язык

При заходе на сайт middleware (`middleware.ts`) проверяет:
1. Cookie `NEXT_LOCALE` (если пользователь уже выбрал язык)
2. Заголовок `Accept-Language` браузера
3. По умолчанию использует русский (ru)

Затем перенаправляет на URL с языком: `/ru`, `/en`, `/kk`, etc.

### 2. Layout загружает переводы

`app/[locale]/layout.tsx` загружает словарь переводов через `getDictionary(locale)`.

### 3. Компоненты используют переводы

Компоненты принимают:
- `locale` — текущий язык (Locale)
- `dict` — словарь переводов (Dictionary)

**Пример:**
```tsx
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <h1>{dict.hero.title}</h1>
    <p>{dict.hero.tagline}</p>
  )
}
```

---

## ✏️ Как редактировать переводы

### Изменить существующий перевод

1. Откройте файл языка: `messages/ru.json` (или en, kk, de, ky)
2. Найдите ключ:
```json
{
  "hero": {
    "title": "MKA STROY",
    "tagline": "Профессиональное строительство..."
  }
}
```
3. Измените текст
4. Сохраните файл

**Важно:** Изменяйте ВСЕ языковые файлы одновременно, чтобы переводы были синхронизированы.

### Добавить новый перевод

1. Добавьте ключ во ВСЕ файлы `messages/*.json`:
```json
// messages/ru.json
{
  "newSection": {
    "title": "Новый раздел",
    "description": "Описание"
  }
}

// messages/en.json
{
  "newSection": {
    "title": "New Section",
    "description": "Description"
  }
}
```

2. Используйте в компоненте:
```tsx
<h2>{dict.newSection.title}</h2>
```

---

## 🔧 Как обновить компоненты для i18n

### Шаблон обновления секции

**Было (без i18n):**
```tsx
export function MySection() {
  return (
    <section>
      <h2>Заголовок</h2>
      <p>Текст</p>
    </section>
  )
}
```

**Стало (с i18n):**
```tsx
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function MySection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section>
      <h2>{dict.mySection.title}</h2>
      <p>{dict.mySection.description}</p>
    </section>
  )
}
```

### Обновление ссылок

**Было:**
```tsx
<Link href="/services">Услуги</Link>
```

**Стало:**
```tsx
<Link href={`/${locale}/services`}>{dict.nav.services}</Link>
```

---

## 📄 Список компонентов для обновления

### ✅ Обновлены:
- [x] Header (с LanguageSwitcher)
- [x] Footer
- [x] app/[locale]/layout.tsx
- [x] app/[locale]/page.tsx

### ⚠️ Требуют обновления:

**Секции (sections/):**
1. `Hero.tsx` — главный экран
2. `Services.tsx` — услуги
3. `Projects.tsx` — проекты
4. `Process.tsx` — процесс работы
5. `PriceCalculator.tsx` — калькулятор
6. `FAQ.tsx` — частые вопросы
7. `Contacts.tsx` — контакты

**Страницы (app/[locale]/):**
1. `services/page.tsx`
2. `projects/page.tsx`
3. `contacts/page.tsx`
4. `privacy/page.tsx`
5. `not-found.tsx`

**Другие компоненты:**
1. `ScrollProgress.tsx` (не требует переводов)
2. `JsonLd.tsx` (обновить metadata)

---

## 📝 Пример: Обновление секции Hero

**Файл:** `sections/Hero.tsx`

### До:
```tsx
'use client'

import { motion } from 'framer-motion'
import { companyData } from '@/constants/company'

export function Hero() {
  return (
    <section>
      <h1>MKA STROY</h1>
      <p>Профессиональное строительство и ремонт в Алматы</p>
      <a href="#calculator">Рассчитать стоимость</a>
    </section>
  )
}
```

### После:
```tsx
'use client'

import { motion } from 'framer-motion'
import { companyData } from '@/constants/company'
import type { Locale } from '@/i18n.config'
import type { Dictionary } from '@/lib/i18n'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section>
      <h1>{dict.hero.title}</h1>
      <p>{dict.hero.tagline}</p>
      <a href={`/${locale}#calculator`}>{dict.hero.cta.calculate}</a>
    </section>
  )
}
```

---

## 🌐 Переключатель языков

Компонент `LanguageSwitcher.tsx` уже создан и интегрирован в Header.

**Функции:**
- Показывает текущий язык (флаг + код)
- Dropdown с 5 языками
- Сохраняет выбор в cookie
- Плавная анимация

**Расположение:**
- Desktop: в Header справа от навигации
- Mobile: слева от кнопки меню

---

## 🔍 SEO и hreflang

### Автоматические hreflang теги

В `app/[locale]/layout.tsx` автоматически добавляются:
```html
<link rel="alternate" hrefLang="ru" href="/ru" />
<link rel="alternate" hrefLang="en" href="/en" />
<link rel="alternate" hrefLang="kk" href="/kk" />
<link rel="alternate" hrefLang="de" href="/de" />
<link rel="alternate" hrefLang="ky" href="/ky" />
<link rel="alternate" hrefLang="x-default" href="/ru" />
```

### Локализованные metadata

Каждая страница имеет переведенные title и description:
```tsx
export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)
  return {
    title: dict.seo.home.title,
    description: dict.seo.home.description,
  }
}
```

---

## 🎨 URL Structure

**Формат:** `/{locale}/{page}`

**Примеры:**
- `/ru` — главная (русский)
- `/en/services` — услуги (английский)
- `/kk/projects` — проекты (казахский)
- `/de/contacts` — контакты (немецкий)
- `/ky/privacy` — политика (киргизский)

**Перенаправления:**
- `/` → `/ru` (default locale)
- `/services` → `/ru/services`

---

## ➕ Как добавить новый язык

### 1. Создайте файл переводов

`messages/fr.json`:
```json
{
  "nav": {
    "home": "Accueil",
    "services": "Services",
    ...
  },
  ...
}
```

### 2. Обновите конфигурацию

`i18n.config.ts`:
```ts
export const i18n = {
  defaultLocale: 'ru',
  locales: ['ru', 'en', 'kk', 'de', 'ky', 'fr'], // Добавьте 'fr'
} as const

export const localeNames: Record<Locale, string> = {
  ...
  fr: 'Français', // Добавьте
}

export const localeFlags: Record<Locale, string> = {
  ...
  fr: '🇫🇷', // Добавьте
}
```

### 3. Готово!

Middleware и компоненты автоматически поддержат новый язык.

---

## 🐛 Отладка

### Язык не переключается?

1. Очистите cookie:
```js
document.cookie = 'NEXT_LOCALE=; Max-Age=0'
```
2. Перезагрузите страницу

### Перевод не отображается?

1. Проверьте ключ в `messages/{locale}.json`
2. Проверьте, что компонент получает `dict`
3. Консоль: `console.log(dict.path.to.key)`

### TypeScript ошибки?

Убедитесь, что все секции обновлены:
```tsx
// Правильно:
<Hero locale={locale} dict={dict} />

// Неправильно:
<Hero /> // Missing props!
```

---

## ✅ Контрольный список

После полного внедрения i18n:

- [ ] Все секции обновлены (Hero, Services, etc.)
- [ ] Все страницы перемещены в `app/[locale]/`
- [ ] Все ссылки содержат `/{locale}/`
- [ ] Все тексты переведены в `messages/*.json`
- [ ] LanguageSwitcher отображается корректно
- [ ] Переключение языка работает
- [ ] Выбор сохраняется в cookie
- [ ] SEO metadata локализованы
- [ ] hreflang теги добавлены
- [ ] Тестирование на всех 5 языках

---

## 📚 Дополнительные ресурсы

- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [i18n Best Practices](https://phrase.com/blog/posts/i18n-best-practices/)
- [Словарь переводов](/messages/)

---

Последнее обновление: 2026-01-30
