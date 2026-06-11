# 🚀 Быстрый старт MKA STROY

## За 5 минут до запуска

### 1. Установка зависимостей (1 мин)

```bash
npm install
```

### 2. Заполните критичные данные (2 мин)

Откройте [constants/company.ts](constants/company.ts) и замените TODO:

**Строки 182-192** — Контакты:
```typescript
phone: '+7 707 123 45 67',           // ✏️ Ваш телефон
whatsapp: '+77071234567',            // ✏️ Без пробелов
telegram: 'MKA_STROY_bot',           // ✏️ Telegram-бот (без @)
email: 'info@mkastroy.kz',          // ✏️ Ваш email
```

**Строка 186-188** — Адрес:
```typescript
street: 'улица Абая',               // ✏️ Ваша улица
building: 'дом 123, офис 45',       // ✏️ Номер здания
```

Остальное можно заполнить позже!

### 3. Запуск (1 мин)

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) 🎉

---

## Что вы увидите

✅ Главная страница с 7 секциями:
- Hero (приветственный экран)
- Услуги (6 карточек)
- Проекты (с placeholder)
- Процесс работы (7 шагов)
- Калькулятор стоимости
- FAQ (8 вопросов)
- Контакты

✅ Дополнительные страницы:
- /services — подробно об услугах
- /projects — портфолио
- /contacts — контакты
- /privacy — политика конфиденциальности

---

## Быстрая кастомизация

### Изменить цвета

[app/globals.css](app/globals.css:21-28) — CSS variables:
```css
--accent: #c0430b;  /* Ваш основной цвет */
```

### Добавить логотип

1. Поместите `logo.png` в `/public/`
2. В [components/Header.tsx](components/Header.tsx:30-37):
```tsx
<Image src="/logo.png" alt="MKA STROY" width={150} height={50} />
```

### Изменить услуги

[constants/company.ts](constants/company.ts:33-113) — массив `services`:
```typescript
{
  title: 'Новая услуга',
  description: 'Описание',
  priceRange: 'от 10 000 ₸',
}
```

---

## Развертывание на Vercel (3 мин)

### Вариант 1: Через GitHub

1. Загрузите проект на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. Нажмите "Import Project"
4. Выберите ваш репозиторий
5. Нажмите "Deploy" ✨

### Вариант 2: Через CLI

```bash
npm i -g vercel
vercel
```

Следуйте инструкциям в терминале.

---

## Проверка перед запуском

- [ ] Заполнены контакты (телефон, email)
- [ ] Проверена работа на мобильном (Chrome DevTools → Toggle Device)
- [ ] Открывается без ошибок в консоли
- [ ] Ссылки в меню работают

Всё ✅? Разворачивайте!

---

## Что дальше?

### Сразу после развертывания:
1. Добавьте сайт в Google Search Console
2. Настройте Google Analytics (см. [CUSTOMIZATION.md](CUSTOMIZATION.md))
3. Создайте favicon.ico (можно на [favicon.io](https://favicon.io))

### В течение недели:
1. Заполните реальные проекты (с фото)
2. Обновите цены на актуальные
3. Добавьте сертификаты (если есть)
4. Настройте форму обратной связи

### Опционально:
1. Настройте SSL (автоматически на Vercel)
2. Подключите Yandex.Metrika для рынка Казахстана
3. Добавьте отзывы клиентов (новая секция)

---

## Помощь

**Ошибка при установке?**
- Проверьте версию Node.js: `node -v` (должна быть 18+)
- Очистите кеш: `npm cache clean --force`

**Сайт не открывается?**
- Проверьте, что порт 3000 свободен
- Перезапустите: `Ctrl+C`, затем `npm run dev`

**Нужна кастомизация?**
- Читайте [CUSTOMIZATION.md](CUSTOMIZATION.md)
- Вся документация в [README.md](README.md)

---

## Структура важных файлов

```
📁 Главные файлы для редактирования:
├── constants/company.ts       ⭐ ДАННЫЕ КОМПАНИИ (начните здесь)
├── app/globals.css            🎨 Дизайн-система и цвета
├── components/Header.tsx      📱 Меню навигации
└── sections/                  📄 Все секции главной страницы

📁 Конфигурация:
├── package.json               📦 Зависимости
├── tailwind.config.ts         🎨 Tailwind настройки
└── next.config.js             ⚙️ Next.js настройки

📁 Документация:
├── README.md                  📖 Основная документация
├── QUICKSTART.md             🚀 Этот файл
├── DEPLOYMENT.md             🌐 Развертывание
├── CUSTOMIZATION.md          ✏️ Кастомизация
└── PROJECT_SUMMARY.md        📊 Итоговая сводка
```

---

## Команды

```bash
# Разработка
npm run dev          # Запуск dev-сервера

# Продакшен
npm run build        # Сборка для продакшена
npm start            # Запуск production-сервера

# Проверка
npm run lint         # Проверка кода (ESLint)
```

---

**Готово к запуску за 5 минут!** ⏱️

Удачи! 🎉
