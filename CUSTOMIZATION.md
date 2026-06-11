# Руководство по кастомизации MKA STROY

Это руководство поможет вам настроить сайт под ваши нужды.

## Изменение данных компании

Все данные хранятся в одном месте: [constants/company.ts](constants/company.ts)

### 1. Основная информация

```typescript
// Строки 8-12
name: 'MKA STROY',
legalForm: 'ТОО',
city: 'Алматы',
description: 'Ваше новое описание',
tagline: 'Ваш новый слоган',
```

### 2. Контакты

```typescript
// Строки 182-203
contacts: {
  phone: '+7 (XXX) XXX-XX-XX',      // Замените на реальный
  whatsapp: '+7XXXXXXXXXX',          // Без пробелов и дефисов
  telegram: '@yourcompany',          // Ваш username в Telegram
  email: 'info@yourcompany.kz',     // Ваш email
  address: {
    city: 'Алматы',
    street: 'улица Примерная',      // Точный адрес
    building: 'дом 123, офис 45',   // Номер здания/офиса
    coords: {
      lat: 43.2220,                 // Широта вашего офиса
      lng: 76.8512,                 // Долгота вашего офиса
    },
  },
  workingHours: {
    weekdays: 'Пн–Пт: 09:00–18:00', // Ваш график
    weekend: 'Сб–Вс: выходной',
  },
}
```

**Как получить координаты:**
1. Откройте [Google Maps](https://maps.google.com)
2. Найдите ваш офис
3. Кликните правой кнопкой мыши → "Что здесь?"
4. Скопируйте координаты (первое число — latitude, второе — longitude)

### 3. Услуги

Каждая услуга имеет структуру:

```typescript
{
  id: 'unique-id',                    // Уникальный ID
  title: 'Название услуги',
  description: 'Описание',
  icon: 'Building2',                   // Название иконки из lucide-react
  features: [                          // Список того, что входит
    'Пункт 1',
    'Пункт 2',
  ],
  priceRange: 'от 50 000 ₸/м²',       // Цена
  duration: 'от 14 дней',              // Срок
}
```

**Доступные иконки** (lucide-react):
- `Building2` — здания
- `Home` — дом
- `Paintbrush` — кисть
- `Plug` — электричество
- `Pencil` — проектирование
- `HardHat` — демонтаж
- Полный список: [lucide.dev](https://lucide.dev)

### 4. Проекты

Добавьте свои проекты в массив `projects`:

```typescript
{
  id: 'project-1',
  title: 'Жилой комплекс "Название"',
  category: 'Жилой комплекс',          // или 'Офис', 'Дом', etc.
  location: 'Алматы, район',
  year: 2024,
  description: 'Подробное описание проекта',
  area: '500 м²',
  duration: '6 месяцев',
  services: ['Строительство', 'Отделка'],
  image: '/projects/project-1.jpg',    // Опционально
}
```

### 5. Калькулятор цен

Настройте базовые цены:

```typescript
// Строки 132-144
pricing: {
  workTypes: [
    { id: 'renovation', label: 'Ремонт квартиры', basePrice: 25000 },
    { id: 'finishing', label: 'Отделочные работы', basePrice: 15000 },
    // Цена = basePrice × площадь
  ],
  additionalOptions: [
    { id: 'design', label: 'Дизайн-проект', basePrice: 5000 },
    { id: 'materials', label: 'Закупка материалов', multiplier: 1.15 },
    // basePrice добавляется, multiplier умножает итоговую сумму
  ],
}
```

### 6. FAQ

Измените или добавьте вопросы:

```typescript
{
  id: 'faq-1',
  question: 'Ваш вопрос?',
  answer: 'Подробный ответ на вопрос.',
}
```

## Изменение дизайна

### Цветовая схема

Цвета настраиваются через CSS variables в [app/globals.css](app/globals.css):

```css
:root {
  --bg: #f1f1f1;         /* Фон */
  --text: #424242;       /* Текст */
  --accent: #c0430b;     /* Акцент */
  --accent2: #dd4d0d;    /* Акцент hover */
  --accentDark: #903208; /* Темный акцент */
  --border: #d4d4d4;     /* Границы */
  --card: #ffffff;       /* Карточки */
}
```

**Как изменить цвета:**
1. Замените HEX-коды на свои
2. Сохраните файл
3. Перезапустите dev-сервер

### Шрифты

Текущий шрифт: **Inter**

Чтобы изменить:

1. Откройте [app/layout.tsx](app/layout.tsx:2)
2. Импортируйте другой шрифт из `next/font/google`:

```typescript
import { Manrope } from 'next/font/google'  // Вместо Inter

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-family',
})
```

**Популярные шрифты для строительных компаний:**
- **Inter** (текущий) — универсальный гротеск
- **Manrope** — современный, немного мягче
- **Plus Jakarta Sans** — геометрический гротеск
- **Onest** — русский гротеск (для кириллицы)

### Анимации

Все анимации используют Framer Motion.

**Отключить анимации:**

1. Откройте файл секции (например, [sections/Hero.tsx](sections/Hero.tsx))
2. Удалите `motion.div` и замените на обычный `div`
3. Удалите `variants` и `initial/animate` props

**Изменить скорость анимаций:**

```typescript
// В любом motion-компоненте
transition={{
  duration: 0.6,  // Измените на 0.3 (быстрее) или 1.0 (медленнее)
}}
```

## Добавление новых секций

### Пример: Секция "Сертификаты"

1. Создайте файл [sections/Certificates.tsx](sections/Certificates.tsx):

```typescript
'use client'

import { motion } from 'framer-motion'

export function Certificates() {
  return (
    <section className="section bg-card">
      <div className="container">
        <h2 className="text-center mb-12">Сертификаты</h2>
        {/* Ваш контент */}
      </div>
    </section>
  )
}
```

2. Добавьте в [app/page.tsx](app/page.tsx):

```typescript
import { Certificates } from '@/sections/Certificates'

export default function HomePage() {
  return (
    <>
      {/* ... существующие секции ... */}
      <Certificates />
    </>
  )
}
```

## Добавление новых страниц

1. Создайте папку в `app/`:

```bash
mkdir app/about
```

2. Создайте файл `page.tsx`:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О компании — MKA STROY',
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="section">
        <div className="container">
          <h1>О компании</h1>
          {/* Контент */}
        </div>
      </section>
    </div>
  )
}
```

3. Добавьте ссылку в меню ([components/Header.tsx](components/Header.tsx:28)):

```typescript
const navItems = [
  // ...
  { href: '/about', label: 'О компании' },
]
```

## Интеграция с внешними сервисами

### Google Analytics

1. Получите ID отслеживания (например, `G-XXXXXXXXXX`)
2. Создайте [components/Analytics.tsx](components/Analytics.tsx):

```typescript
import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>
    </>
  )
}
```

3. Добавьте в [app/layout.tsx](app/layout.tsx):

```typescript
import { Analytics } from '@/components/Analytics'

// В body:
<body>
  <Analytics />
  {/* ... остальное ... */}
</body>
```

### Yandex.Metrika

Аналогично Google Analytics, но используйте код Яндекс.Метрики.

### Форма обратной связи

Для добавления рабочей формы:

1. Используйте сервис типа [Formspree](https://formspree.io)
2. Или настройте свой API endpoint
3. Создайте компонент формы с `fetch()` для отправки данных

## Оптимизация изображений

### Добавление логотипа

1. Поместите файл в `/public/logo.png`
2. В [components/Header.tsx](components/Header.tsx:30-37):

```typescript
import Image from 'next/image'

<Link href="/">
  <Image src="/logo.png" alt="MKA STROY" width={150} height={50} />
</Link>
```

### Добавление фото проектов

1. Поместите фото в `/public/projects/`
2. В [constants/company.ts](constants/company.ts):

```typescript
{
  // ...
  image: '/projects/project-1.jpg',
}
```

3. В [sections/Projects.tsx](sections/Projects.tsx) замените placeholder на `next/image`:

```typescript
import Image from 'next/image'

{project.image && (
  <Image
    src={project.image}
    alt={project.title}
    width={400}
    height={300}
    className="w-full h-48 object-cover"
  />
)}
```

## Мультиязычность

Для добавления казахского/английского языка:

1. Установите `next-intl`:

```bash
npm install next-intl
```

2. Следуйте [документации Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

Если возникли вопросы, проверьте [README.md](README.md) или документацию Next.js.
