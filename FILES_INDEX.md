# 📑 Индекс файлов проекта MKA STROY

Полный список всех файлов проекта с описанием назначения.

---

## 📱 Приложение (app/)

### Страницы
| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [app/page.tsx](app/page.tsx) | Главная страница (собирает все секции) | ❌ Редко |
| [app/layout.tsx](app/layout.tsx) | Root layout, Header, Footer, шрифты | ⚠️ При необходимости |
| [app/globals.css](app/globals.css) | Дизайн-система, CSS variables, стили | ✅ Цвета |
| [app/not-found.tsx](app/not-found.tsx) | 404 страница | ❌ Редко |
| [app/services/page.tsx](app/services/page.tsx) | Страница "Услуги" | ⚠️ При добавлении услуг |
| [app/projects/page.tsx](app/projects/page.tsx) | Страница "Проекты" | ⚠️ При добавлении проектов |
| [app/contacts/page.tsx](app/contacts/page.tsx) | Страница "Контакты" | ❌ Редко |
| [app/privacy/page.tsx](app/privacy/page.tsx) | Политика конфиденциальности | ⚠️ Юридические правки |

---

## 🧩 Компоненты (components/)

| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [components/Header.tsx](components/Header.tsx) | Шапка сайта, навигация | ✅ Меню, логотип |
| [components/Footer.tsx](components/Footer.tsx) | Подвал сайта | ✅ Ссылки, информация |
| [components/ScrollProgress.tsx](components/ScrollProgress.tsx) | Прогресс-бар скролла | ❌ Нет |
| [components/JsonLd.tsx](components/JsonLd.tsx) | SEO schema (JSON-LD) | ⚠️ При изменении данных |

---

## 📄 Секции главной страницы (sections/)

| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [sections/Hero.tsx](sections/Hero.tsx) | Приветственный экран | ✅ Заголовки, CTA |
| [sections/Services.tsx](sections/Services.tsx) | Список услуг (карточки) | ⚠️ При добавлении услуг |
| [sections/Projects.tsx](sections/Projects.tsx) | Портфолио проектов | ✅ Добавить проекты |
| [sections/Process.tsx](sections/Process.tsx) | Процесс работы (7 шагов) | ⚠️ Изменить шаги |
| [sections/PriceCalculator.tsx](sections/PriceCalculator.tsx) | Калькулятор стоимости | ⚠️ Настроить формулы |
| [sections/FAQ.tsx](sections/FAQ.tsx) | Частые вопросы (аккордеон) | ✅ Добавить вопросы |
| [sections/Contacts.tsx](sections/Contacts.tsx) | Контакты + карта | ✅ Контакты, координаты |

---

## 🎯 Данные и типы

| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [constants/company.ts](constants/company.ts) | ⭐ **ГЛАВНЫЙ ФАЙЛ** — все данные компании | ✅ **ОБЯЗАТЕЛЬНО** |
| [types/company.ts](types/company.ts) | TypeScript интерфейсы | ❌ Только при расширении |

---

## ⚙️ Конфигурация

| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [package.json](package.json) | Зависимости и скрипты | ⚠️ При добавлении библиотек |
| [tsconfig.json](tsconfig.json) | Настройки TypeScript | ❌ Нет |
| [next.config.js](next.config.js) | Настройки Next.js | ⚠️ При необходимости |
| [tailwind.config.ts](tailwind.config.ts) | Tailwind CSS конфиг | ⚠️ Расширение темы |
| [postcss.config.js](postcss.config.js) | PostCSS конфиг | ❌ Нет |
| [.eslintrc.json](.eslintrc.json) | ESLint правила | ❌ Нет |
| [next-env.d.ts](next-env.d.ts) | TypeScript definitions (автоген) | ❌ **НЕ ТРОГАТЬ** |

---

## 📦 Статические файлы (public/)

| Файл | Назначение | Редактировать? |
|------|-----------|----------------|
| [public/favicon.ico](public/favicon.ico) | Favicon (placeholder) | ✅ **Заменить** |

**TODO:** Добавьте сюда:
- `logo.png` — логотип компании
- `og-image.jpg` — изображение для соцсетей (1200×630px)
- `projects/` — фото проектов

---

## 📚 Документация

| Файл | Назначение | Читать? |
|------|-----------|---------|
| [README.md](README.md) | Основная документация | ✅ Обязательно |
| [QUICKSTART.md](QUICKSTART.md) | Быстрый старт (5 минут) | ✅ Первым делом |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Развертывание на Vercel/VPS | ✅ При деплое |
| [CUSTOMIZATION.md](CUSTOMIZATION.md) | Кастомизация дизайна и данных | ✅ При изменениях |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Итоговая сводка проекта | ✅ Обзор |
| [FILES_INDEX.md](FILES_INDEX.md) | Этот файл | 📄 Справка |

---

## 🗂️ Служебные файлы

| Файл | Назначение |
|------|-----------|
| [.gitignore](.gitignore) | Игнорируемые файлы для Git |

**Исключены из репозитория:**
- `node_modules/` — зависимости (устанавливаются через npm)
- `.next/` — сборка Next.js
- `.env` — переменные окружения (если есть)

---

## 📊 Статистика проекта

### По типам файлов:
- **TypeScript/TSX**: 20 файлов
- **CSS**: 1 файл (globals.css)
- **Config**: 6 файлов
- **Markdown**: 6 файлов документации
- **Всего**: 33 файла

### Структура кода:
```
Страницы:        8 файлов (app/)
Компоненты:      4 файла (components/)
Секции:          7 файлов (sections/)
Типы/данные:     2 файла (types/, constants/)
Конфигурация:    6 файлов
Документация:    6 файлов
```

---

## 🎯 Что редактировать в первую очередь

### 1. Обязательно (перед запуском):
✅ [constants/company.ts](constants/company.ts) — заполнить контакты

### 2. Желательно (в первую неделю):
✅ [constants/company.ts](constants/company.ts) — добавить проекты, цены
✅ [public/favicon.ico](public/favicon.ico) — заменить на реальный
✅ [sections/FAQ.tsx](sections/FAQ.tsx) — добавить свои вопросы

### 3. Опционально (для кастомизации):
⚠️ [app/globals.css](app/globals.css) — изменить цвета
⚠️ [components/Header.tsx](components/Header.tsx) — добавить логотип
⚠️ [sections/Hero.tsx](sections/Hero.tsx) — изменить заголовки

---

## 🔍 Поиск по функциям

Нужно изменить:

**Цвета?** → [app/globals.css](app/globals.css:21-28)
**Контакты?** → [constants/company.ts](constants/company.ts:182-203)
**Услуги?** → [constants/company.ts](constants/company.ts:33-113)
**Проекты?** → [constants/company.ts](constants/company.ts:116-128)
**FAQ?** → [constants/company.ts](constants/company.ts:149-180) или [sections/FAQ.tsx](sections/FAQ.tsx)
**Цены в калькуляторе?** → [constants/company.ts](constants/company.ts:132-147)
**Меню?** → [components/Header.tsx](components/Header.tsx:23-28)
**Футер?** → [components/Footer.tsx](components/Footer.tsx)
**SEO?** → [app/layout.tsx](app/layout.tsx:15-29)

---

## 🚀 Быстрые команды

```bash
# Установка
npm install

# Разработка
npm run dev              # http://localhost:3000

# Продакшен
npm run build            # Сборка
npm start                # Запуск

# Проверка
npm run lint             # ESLint
```

---

## 📞 Техническая поддержка

**Документация технологий:**
- Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- TailwindCSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- Framer Motion: [framer.com/motion](https://www.framer.com/motion)
- TypeScript: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)

**Вопросы по проекту:**
- Сначала читайте [README.md](README.md)
- Затем [CUSTOMIZATION.md](CUSTOMIZATION.md)
- Используйте поиск в файлах: `Ctrl+Shift+F` (VS Code)

---

Последнее обновление: 2026-01-30
