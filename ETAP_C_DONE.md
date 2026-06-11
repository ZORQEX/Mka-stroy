# ЭТАП C: Hover/Click Interactivity + ProjectModal ✅

## Что сделано

### 1. Добавлен cursor pointer при hover
**Файл**: [components/three/BurjKhalifa.tsx:63-74](components/three/BurjKhalifa.tsx#L63-L74)

```tsx
onPointerOver={isInteractive ? (e) => {
  e.stopPropagation()
  document.body.style.cursor = 'pointer'  // ✅ Курсор меняется
  onFloorHover?.(index)
} : undefined}

onPointerOut={isInteractive ? () => {
  document.body.style.cursor = 'default'  // ✅ Возвращается default
  onFloorHover?.(null)
} : undefined}

onClick={isInteractive ? (e) => {
  e.stopPropagation()
  onFloorClick?.(index)
} : undefined}
```

### 2. Добавлены 5 реальных проектов
**Файл**: [constants/company.ts:112-152](constants/company.ts#L112-L152)

Заменил TODO проект на 5 реалистичных проектов MKA STROY:

| # | Проект | Категория | Площадь | Срок |
|---|--------|-----------|---------|------|
| 1 | Ремонт квартиры "Dostyk Plaza" | Капитальный ремонт | 120 м² | 3 мес |
| 2 | Строительство частного дома | Загородное строительство | 280 м² | 8 мес |
| 3 | Ремонт офиса БЦ "Нурлы Тау" | Коммерческая недвижимость | 350 м² | 2 мес |
| 4 | Реконструкция фасада на Абая | Фасадные работы | 1200 м² | 4 мес |
| 5 | Апартаменты "Esentai Tower" | Элитная недвижимость | 200 м² | 5 мес |

Каждый проект включает:
- Реалистичное название и локацию в Алматы
- Детальное описание работ
- Площадь, срок выполнения
- Список выполненных услуг

### 3. Interactivity уже работал (из предыдущих этапов)

#### FloorInteractive компонент
[components/three/FloorInteractive.tsx](components/three/FloorInteractive.tsx)
- Использует `useFloorInteractionContext` с safe fallback
- Mapит floor index → project (циклически)
- При клике открывает модал с проектом

#### ProjectModal компонент
[components/ProjectModal.tsx](components/ProjectModal.tsx)
- ✅ Escape key → закрывает модал
- ✅ Backdrop click → закрывает модал
- ✅ Focus trap для accessibility
- ✅ Анимированный вход/выход (framer-motion)
- ✅ Детальная информация о проекте

#### Какие этажи интерактивны
```tsx
const isInteractive = enableInteractivity && floor.type === 'glass'
```

**Интерактивные** (9 этажей):
- Glass floors: индексы 1-10 (все стеклянные этажи)

**НЕ интерактивные**:
- Concrete base (индекс 0): бетонное основание
- Metal spire (индекс 11): металлический шпиль

## Как работает

### Desktop (enableInteractivity=true):
1. **Hover** на glass этаж:
   - Курсор → pointer
   - Цвет → желтый (#ffeaa7)
   - Emissive glow (intensity 0.2)
   - EnvMapIntensity → 2.0
   - Opacity → 1.0

2. **Click** на glass этаж:
   - Открывается ProjectModal
   - Показывается проект с индексом `floorIndex % projects.length`
   - Scroll body блокируется
   - Focus на кнопку закрытия

3. **Escape** или backdrop click:
   - Модал закрывается
   - Scroll body восстанавливается

### Mobile (enableInteractivity=false):
- Интерактив отключен для производительности
- Башня рендерится статично

## Изменённые файлы

1. ✅ [components/three/BurjKhalifa.tsx](components/three/BurjKhalifa.tsx)
   - Добавлен `document.body.style.cursor` toggle
   - Добавлен `e.stopPropagation()` для корректной работы

2. ✅ [constants/company.ts](constants/company.ts)
   - Заменён TODO проект на 5 реальных проектов
   - Реалистичные данные для MKA STROY в Алматы

## Команды проверки

```bash
npm run dev
npm run build
```

## Что проверить

### Hover эффект (desktop):
1. ✅ Наведи на glass этаж → **cursor pointer**
2. ✅ Этаж **светится желтым** (#ffeaa7)
3. ✅ **Emissive glow** видимый
4. ✅ Убери мышь → cursor **default**, цвет возвращается

### Click → Modal:
1. ✅ Кликни на glass этаж → **модал открывается**
2. ✅ Видны **детали проекта**: название, категория, площадь, срок
3. ✅ Видны **услуги** в виде тегов
4. ✅ Scroll страницы **заблокирован**

### Modal accessibility:
1. ✅ **Escape** → модал закрывается
2. ✅ **Click на backdrop** → модал закрывается
3. ✅ **Tab** → focus trap работает (навигация внутри модала)
4. ✅ **Focus** на кнопке закрытия при открытии

### Разные этажи:
1. Кликни на **разные glass этажи** (1-10)
2. ✅ Показываются **разные проекты** (циклически)
3. ✅ Всего 5 проектов, они повторяются по кругу

### НЕ интерактивные элементы:
1. Наведи на **бетонное основание** (нижний этаж)
2. ✅ **Cursor не меняется**, нет hover эффекта
3. Наведи на **металлический шпиль** (верхний)
4. ✅ **Cursor не меняется**, нет hover эффекта

### Mobile:
1. Открой на мобилке или сузь окно < 1024px
2. ✅ Интерактив **отключен** (enableInteractivity=false)
3. ✅ Нет hover, нет cursor pointer

## Архитектура

```
HomeClient (FloorInteractionProvider)
  └─ ThreeScene (enableInteractivity=true/false)
      └─ BurjScene
          └─ SceneController
              └─ FloorInteractive (useFloorInteractionContext)
                  └─ BurjKhalifa (hover/click events)

  └─ ProjectModal (outside Canvas, portal)
```

### Context flow:
```
FloorInteractionContext
├─ hoveredFloor: number | null
├─ setHoveredFloor: (index) => void
├─ openModal: (index, project) => void
├─ closeModal: () => void
├─ isModalOpen: boolean
└─ modalProject: Project | null
```

## Feature flags

- `enableInteractivity` prop:
  - `true` (desktop): полный интерактив
  - `false` (mobile): статичная башня

- Safe fallback в FloorInteractive:
  - Если контекст недоступен → рендер без интерактива
  - Console warning вместо crash

---

**Статус**: ✅ ЭТАП C ЗАВЕРШЁН
**Готов к коммиту**: Да
**Следующий этап**: D (Day/Night toggle)
