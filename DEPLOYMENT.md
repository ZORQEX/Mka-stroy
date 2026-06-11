# Инструкция по развертыванию MKA STROY

## Локальная разработка

### Требования
- Node.js 18.x или выше
- npm или yarn

### Первый запуск

1. Установите зависимости:
```bash
npm install
```

2. Запустите dev-сервер:
```bash
npm run dev
```

3. Откройте браузер: [http://localhost:3000](http://localhost:3000)

## Развертывание на Vercel (рекомендуется)

Vercel — это платформа от создателей Next.js, идеально подходит для проектов Next.js.

### Шаги развертывания

1. Создайте аккаунт на [vercel.com](https://vercel.com)

2. Установите Vercel CLI (опционально):
```bash
npm i -g vercel
```

3. Два способа развертывания:

#### Способ 1: Через GitHub (рекомендуется)

1. Загрузите проект на GitHub
2. Импортируйте репозиторий в Vercel
3. Vercel автоматически определит Next.js и настроит сборку
4. Нажмите "Deploy"

#### Способ 2: Через CLI

```bash
vercel
```

Следуйте инструкциям в терминале.

### Environment Variables

Если вы добавите переменные окружения (например, для API ключей карт), настройте их в Vercel:

1. Перейдите в Settings → Environment Variables
2. Добавьте необходимые переменные
3. Пересоберите проект

## Развертывание на других платформах

### Netlify

1. Установите Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Соберите проект:
```bash
npm run build
```

3. Разверните:
```bash
netlify deploy --prod
```

### VPS (Ubuntu/Debian)

1. Установите Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Клонируйте проект:
```bash
git clone <your-repo-url>
cd leason1
```

3. Установите зависимости и соберите:
```bash
npm install
npm run build
```

4. Запустите с PM2:
```bash
npm i -g pm2
pm2 start npm --name "mka-stroy" -- start
pm2 save
pm2 startup
```

5. Настройте Nginx как reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Оптимизация для продакшена

### Перед развертыванием

1. Заполните все TODO в [constants/company.ts](constants/company.ts)
2. Добавьте реальные контакты
3. Замените цены на актуальные
4. Добавьте реальные проекты
5. Создайте favicon и добавьте в `/public/`

### Проверка производительности

```bash
npm run build
npm run start
```

Откройте [http://localhost:3000](http://localhost:3000) и проверьте:
- Lighthouse в Chrome DevTools (должен быть 90+ по всем метрикам)
- Скорость загрузки
- Отсутствие ошибок в консоли

### SEO чеклист перед запуском

- ✅ Уникальные title и description для всех страниц
- ✅ JSON-LD schema для поисковых систем
- ✅ Правильные Open Graph теги
- ✅ Robots.txt (создайте в `/public/robots.txt`)
- ✅ Sitemap.xml (можно сгенерировать через next-sitemap)

### Создание robots.txt

Создайте файл `/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

### Создание sitemap.xml

Установите next-sitemap:

```bash
npm install next-sitemap
```

Создайте `next-sitemap.config.js`:

```js
module.exports = {
  siteUrl: 'https://yourdomain.com',
  generateRobotsTxt: true,
}
```

Добавьте в `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

## Мониторинг

После развертывания рекомендуется настроить:

1. **Google Analytics** — добавьте скрипт в [app/layout.tsx](app/layout.tsx)
2. **Yandex.Metrika** — для рынка Казахстана
3. **Vercel Analytics** — встроенная аналитика (если используете Vercel)

## Обновление сайта

1. Внесите изменения локально
2. Протестируйте: `npm run dev`
3. Соберите: `npm run build`
4. Загрузите на GitHub (если используете)
5. Vercel автоматически развернет обновления

## Проблемы и решения

### Ошибка при сборке

Проверьте:
- Версию Node.js (`node -v`)
- Наличие всех зависимостей (`npm install`)
- Отсутствие TypeScript ошибок

### Медленная загрузка

- Оптимизируйте изображения (используйте WebP)
- Проверьте размер бандла: `npm run build` покажет статистику
- Включите кеширование на CDN

### Проблемы с картой

Если карта не отображается:
1. Проверьте координаты в [constants/company.ts](constants/company.ts)
2. Используйте iframe embed от Google Maps
3. Или подключите Yandex.Maps API для Казахстана

---

Удачного развертывания! 🚀
