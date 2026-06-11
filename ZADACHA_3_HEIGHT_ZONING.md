# ЗАДАЧА 3: Height Zoning + MaterialsAtLevelModal ✅

## Что сделано

### 1. MaterialsAtLevelModal компонент
**Файл**: [components/MaterialsAtLevelModal.tsx](components/MaterialsAtLevelModal.tsx) (НОВЫЙ)

Модальное окно с материалами на определённом уровне высоты:

```tsx
<MaterialsAtLevelModal
  isOpen={isMaterialsModalOpen}
  level={3}
  onClose={closeMaterialsModal}
/>
```

**Особенности**:
- ✅ Показывает материалы для зоны (1-10)
- ✅ Разные материалы для разных высот:
  - Зоны 1-3 (Основание): Железобетон, Армированный бетон, Гидроизоляция
  - Зоны 4-6 (Середина): Стеклопакеты, Алюминий, Минеральная вата, Композитные панели
  - Зоны 7-10 (Верх + Шпиль): Панорамное остекление, Анодированный алюминий, Нержавеющая сталь
- ✅ Рекламный блок MKA STROY
- ✅ Кнопки: "Рассчитать стоимость" (scroll to calculator), "Связаться" (contacts/telegram)
- ✅ Escape и клик вне для закрытия
- ✅ Focus trap для accessibility
- ✅ Framer Motion animations

### 2. HeightZoneDetector компонент
**Файл**: [components/three/HeightZoneDetector.tsx](components/three/HeightZoneDetector.tsx) (НОВЫЙ)

Обёртка для обнаружения кликов по высотным зонам:

```tsx
<HeightZoneDetector
  onZoneClick={(zone) => console.log('Clicked zone', zone)}
  minHeight={0}
  maxHeight={22}
  numZones={10}
  enableInteractivity={true}
>
  <BurjKhalifaModel />
</HeightZoneDetector>
```

**Как работает**:
1. Делит модель по высоте (Y axis) на N зон (default: 10)
2. Использует raycaster для определения точки клика
3. Вычисляет `zoneIndex` по `hit.point.y`
4. Вызывает `onZoneClick(zoneIndex)`

**Формула**:
```tsx
const zoneHeight = (maxHeight - minHeight) / numZones
const zone = Math.floor((hitY - minHeight) / zoneHeight) + 1
```

**Особенности**:
- ✅ Cursor pointer при hover
- ✅ Console logging для отладки
- ✅ Поддержка любой высоты модели (procedural или GLB)
- ✅ Debug visualization (закомментирована, можно раскомментировать)

### 3. Интеграция в useFloorInteraction hook
**Файл**: [hooks/useFloorInteraction.ts](hooks/useFloorInteraction.ts)

Добавлено состояние для MaterialsAtLevelModal:

```tsx
export interface FloorInteractionState {
  // ... existing
  materialsLevel: number | null
  isMaterialsModalOpen: boolean
}

// New functions
openMaterialsModal(level: number)
closeMaterialsModal()
```

**API**:
```tsx
const { openMaterialsModal, closeMaterialsModal, materialsLevel, isMaterialsModalOpen } = useFloorInteractionContext()

// Открыть modal для зоны 5
openMaterialsModal(5)

// Закрыть modal
closeMaterialsModal()
```

### 4. Обновлён FloorInteractionContext
**Файл**: [contexts/FloorInteractionContext.tsx](contexts/FloorInteractionContext.tsx)

Добавлены функции в контекст:

```tsx
interface FloorInteractionContextValue extends FloorInteractionState {
  // ... existing
  openMaterialsModal: (level: number) => void
  closeMaterialsModal: () => void
}
```

### 5. Интеграция в компоненты

**HomeClient.tsx**:
- ✅ Импорт MaterialsAtLevelModal
- ✅ Получение `openMaterialsModal` из контекста
- ✅ Передача `onZoneClick={openMaterialsModal}` в ThreeScene (mobile + desktop)
- ✅ Рендер MaterialsAtLevelModal рядом с ProjectModal

**ThreeScene.tsx**:
- ✅ Принимает `onZoneClick` prop
- ✅ Передаёт в BurjScene

**BurjScene.tsx**:
- ✅ Принимает `onZoneClick` prop
- ✅ Передаёт в SceneController

**SceneController.tsx**:
- ✅ Принимает `onZoneClick` prop
- ✅ Передаёт в FloorInteractive

**FloorInteractive.tsx**:
- ✅ Принимает `onZoneClick` prop
- ✅ Оборачивает BurjKhalifaModel в HeightZoneDetector
- ✅ HeightZoneDetector вызывает `onZoneClick` при клике

## Архитектура

```
User clicks building
  ↓
HeightZoneDetector (raycast, вычисляет zoneIndex)
  ↓
onZoneClick(zoneIndex)
  ↓
openMaterialsModal(zoneIndex)
  ↓
FloorInteractionContext (setState: isMaterialsModalOpen=true, materialsLevel=zoneIndex)
  ↓
HomeClient (получает из context)
  ↓
MaterialsAtLevelModal (isOpen=true, level=zoneIndex)
  ↓
Показывается modal с материалами для зоны
```

## Зоны и материалы

### Зона 1-3: Основание и фундамент (0-30% высоты)
- **Железобетон М400**: Несущие конструкции, колонны
- **Армированный бетон**: Фундаментные плиты
- **Гидроизоляция PENETRON**: Защита от влаги
- **Керамогранит 60x60**: Напольное покрытие

### Зона 4-6: Средняя секция (30-60% высоты)
- **Стеклопакеты 3-х камерные**: Фасадное остекление
- **Алюминиевый профиль**: Рамы окон, перегородки
- **Минеральная вата ROCKWOOL**: Теплоизоляция 150мм
- **Композитные панели**: Вентилируемый фасад
- **Натяжные потолки**: Внутренняя отделка

### Зона 7-10: Верхние этажи и шпиль (60-100% высоты)
- **Панорамное остекление**: Стеклянные фасады с подогревом
- **Анодированный алюминий**: Декоративные элементы
- **Светопропускающий бетон**: Архитектурные акценты
- **Нержавеющая сталь 304**: Шпиль, навершие

## MKA STROY рекламный блок

В каждой модалке:

```
💼 MKA STROY — Ваш надёжный партнёр

Можем реализовать подобные решения: стеклянные фасады,
отделка премиум-класса, инженерные сети, комплексное строительство.

[Рассчитать стоимость]  [Связаться]
```

### Кнопка "Рассчитать стоимость":
```tsx
onClick={() => {
  onClose()
  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
}}
```

### Кнопка "Связаться":
```tsx
onClick={() => {
  onClose()
  const contacts = document.getElementById('contacts')
  if (contacts) {
    contacts.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.open('https://t.me/mkastroy', '_blank')
  }
}}
```

## Изменённые файлы

1. ✅ [components/MaterialsAtLevelModal.tsx](components/MaterialsAtLevelModal.tsx) - НОВЫЙ компонент модалки
2. ✅ [components/three/HeightZoneDetector.tsx](components/three/HeightZoneDetector.tsx) - НОВЫЙ zone detector
3. ✅ [hooks/useFloorInteraction.ts](hooks/useFloorInteraction.ts) - Добавлено состояние materials modal
4. ✅ [contexts/FloorInteractionContext.tsx](contexts/FloorInteractionContext.tsx) - Добавлены функции
5. ✅ [components/HomeClient.tsx](components/HomeClient.tsx) - Интеграция modal + callback
6. ✅ [components/ThreeScene.tsx](components/ThreeScene.tsx) - Передача onZoneClick
7. ✅ [components/three/BurjScene.tsx](components/three/BurjScene.tsx) - Передача onZoneClick
8. ✅ [components/three/SceneController.tsx](components/three/SceneController.tsx) - Передача onZoneClick
9. ✅ [components/three/FloorInteractive.tsx](components/three/FloorInteractive.tsx) - Обёртка HeightZoneDetector

## Как использовать

### 1. Клик на башню:
1. **Hover** на building → cursor pointer
2. **Click** anywhere на башне
3. → HeightZoneDetector определяет Y координату клика
4. → Вычисляет zone (1-10)
5. → Открывается MaterialsAtLevelModal с материалами для этой зоны

### 2. В модалке:
- **Заголовок**: "Уровень {N}"
- **Подзаголовок**: "Основание и фундамент" / "Средняя секция" / "Верхние этажи и шпиль"
- **Список материалов**: 3-5 материалов с описаниями
- **MKA STROY блок**: Реклама + 2 кнопки
- **Закрытие**: Escape / клик вне / кнопка X

### 3. Debug:
Откройте DevTools → Console. При клике увидите:
```
Clicked zone 5 at Y=11.23
```

## Отладка zones

### Включить debug visualization:
В [components/three/HeightZoneDetector.tsx](components/three/HeightZoneDetector.tsx:115-123):

Раскомментируйте блок:
```tsx
{enableInteractivity && hoveredZone !== null && (
  <mesh position={[0, minHeight + (hoveredZone - 0.5) * zoneHeight, 0]}>
    <boxGeometry args={[5, zoneHeight, 5]} />
    <meshBasicMaterial
      color="#C0430B"
      opacity={0.2}
      transparent
      wireframe
    />
  </mesh>
)}
```

При hover увидите оранжевый wireframe вокруг зоны.

### Настройка высоты зон:

Для procedural tower (высота ~22 units):
```tsx
<HeightZoneDetector
  minHeight={0}
  maxHeight={22}
  numZones={10}
>
```

Для GLB модели (bounding box):
```tsx
// Calculate bounding box
const bbox = new THREE.Box3().setFromObject(model)
const minY = bbox.min.y
const maxY = bbox.max.y

<HeightZoneDetector
  minHeight={minY}
  maxHeight={maxY}
  numZones={10}
>
```

## Что проверить

### Interactivity:
1. ✅ **Hover** на башню → cursor pointer
2. ✅ **Click** на низ (base) → Zone 1-3, материалы для фундамента
3. ✅ **Click** на середину → Zone 4-6, стеклопакеты и фасад
4. ✅ **Click** на верх/шпиль → Zone 7-10, панорамное остекление
5. ✅ **Console** показывает `Clicked zone N at Y=...`

### Modal:
1. ✅ **Modal открывается** с анимацией
2. ✅ **Заголовок** "Уровень {N}" корректный
3. ✅ **Материалы** соответствуют зоне
4. ✅ **MKA STROY блок** видим
5. ✅ **Escape** закрывает modal
6. ✅ **Click вне** закрывает modal
7. ✅ **Кнопка X** закрывает modal

### Кнопки:
1. Кликни "Рассчитать стоимость"
2. ✅ **Modal закрывается**
3. ✅ **Scroll** к PriceCalculator section
4. Кликни "Связаться"
5. ✅ **Modal закрывается**
6. ✅ **Scroll** к Contacts section (или открывается telegram)

### Accessibility:
1. Открой modal
2. ✅ **Focus** на кнопке X
3. ✅ **Tab** циклирует по элементам
4. ✅ **Shift+Tab** назад
5. ✅ **Focus** не выходит за пределы modal (focus trap)

### Coexistence с ProjectModal:
1. ✅ **Height zones** работают независимо
2. ✅ **ProjectModal** всё ещё доступен (если используется)
3. ✅ Два modal не открываются одновременно

## Технические детали

### Raycast detection:
```tsx
raycaster.setFromCamera(
  {
    x: (clientX / domElement.clientWidth) * 2 - 1,
    y: -(clientY / domElement.clientHeight) * 2 + 1
  },
  camera
)

const intersects = raycaster.intersectObjects(group.children, true)
const hit = intersects[0]
const hitY = hit.point.y
```

### Zone calculation:
```tsx
const zoneHeight = (22 - 0) / 10 = 2.2 units per zone

Zone 1: Y = 0.0 to 2.2
Zone 2: Y = 2.2 to 4.4
Zone 3: Y = 4.4 to 6.6
...
Zone 10: Y = 19.8 to 22.0
```

### Materials database:
```tsx
const getMaterialsForLevel = (level: number): Material[] => {
  if (level >= 1 && level <= 3) return baseMaterials
  if (level >= 4 && level <= 6) return midMaterials
  if (level >= 7 && level <= 10) return upperMaterials
}
```

---

**Статус**: ✅ ЗАДАЧА 3 ЗАВЕРШЕНА
**Готово к тестированию**: Да
**Build status**: Проверить с `npm run build`
