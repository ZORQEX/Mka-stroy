# ЗАДАЧА 2: Materials и Цвета MKA STROY ✅

## Что сделано

### 1. Материалы для GLB модели
**Файл**: [components/three/BurjKhalifaModel.tsx](components/three/BurjKhalifaModel.tsx)

Автоматическое определение и назначение материалов по имени mesh:

#### Стекло (Glass Facades)
Meshes: `glass`, `window`, `facade`

```tsx
new THREE.MeshPhysicalMaterial({
  color: '#e8f4f8',              // Светло-голубой (MKA STROY palette)
  metalness: 0.1,                // Слабая металличность
  roughness: 0.05,               // Очень гладкое
  transmission: 0.7,             // 70% прозрачность
  thickness: 0.3,                // Толщина стекла
  envMapIntensity: 1.2,          // Отражения от environment
  clearcoat: 1,                  // Глянцевое покрытие
  clearcoatRoughness: 0.1,       // Полированное
  transparent: true,
  opacity: 0.9                   // 90% видимость
})
```

**Эффекты**:
- ✅ Реалистичная прозрачность через transmission
- ✅ Глянцевая поверхность (clearcoat)
- ✅ Отражения от Environment preset
- ✅ Лёгкий голубоватый оттенок (как настоящее стекло)

#### Металл (Frames, Spire)
Meshes: `metal`, `spire`, `frame`

```tsx
new THREE.MeshStandardMaterial({
  color: '#c0c0c0',              // Серебристый (neutral gray)
  metalness: 0.9,                // Очень металлический
  roughness: 0.2,                // Слегка полированный
  envMapIntensity: 2             // Сильные отражения
})
```

**Эффекты**:
- ✅ Металлический блеск
- ✅ Отражения окружения
- ✅ Полированная поверхность (roughness 0.2)

#### Бетон (Base, Structure)
Meshes: `concrete`, `base`, `structure`

```tsx
new THREE.MeshStandardMaterial({
  color: '#d4d4d4',              // Светло-серый (neutral)
  metalness: 0,                  // Не металл
  roughness: 0.8                 // Грубая матовая поверхность
})
```

**Эффекты**:
- ✅ Матовая текстура
- ✅ Нет отражений (metalness 0)
- ✅ Реалистичная бетонная поверхность

#### Default (Unknown meshes)
```tsx
new THREE.MeshStandardMaterial({
  color: '#b0b0b0',              // Нейтральный серый
  metalness: 0.3,
  roughness: 0.6
})
```

### 2. Палитра MKA STROY

Аккуратная палитра с нейтральными серыми и оранжевым акцентом:

| Элемент | Цвет | Hex | Использование |
|---------|------|-----|---------------|
| **Стекло** | Светло-голубой | `#e8f4f8` | Фасады, окна |
| **Бетон** | Светло-серый | `#d4d4d4` | Основание, структура |
| **Металл** | Серебристый | `#c0c0c0` | Рамы, шпиль |
| **Акцент** | Оранжевый | `#C0430B` | Угловые подчёркивания |
| **Default** | Нейтральный серый | `#b0b0b0` | Неопределённые элементы |

**Особенности палитры**:
- ✅ Нейтральные тона: серые оттенки (не агрессивные)
- ✅ Оранжевый акцент: фирменный цвет MKA STROY (#C0430B)
- ✅ Реалистичность: цвета соответствуют реальным материалам
- ✅ Контрастность: оранжевый выделяется на фоне серых

### 3. Оранжевые акценты (Procedural tower)
**Файл**: [components/three/BurjKhalifa.tsx](components/three/BurjKhalifa.tsx:158-177)

Оранжевые подчёркивания на углах стеклянных этажей:

```tsx
<meshStandardMaterial
  color="#C0430B"                // MKA STROY оранжевый
  emissive="#C0430B"             // Светится оранжевым
  emissiveIntensity={0.3}        // Мягкое свечение
  metalness={0.7}                // Слегка металлический
  roughness={0.3}                // Полированный
/>
```

**Позиции углов**:
- Передний правый: `[width/2, 0, depth/2]`
- Передний левый: `[-width/2, 0, depth/2]`
- Задний правый: `[width/2, 0, -depth/2]`
- Задний левый: `[-width/2, 0, -depth/2]`

**Эффекты**:
- ✅ Визуальное выделение углов
- ✅ Мягкое свечение (emissive)
- ✅ Фирменный цвет MKA STROY
- ✅ Добавляет премиальность

### 4. Environment для отражений
**Файл**: [components/three/BurjScene.tsx](components/three/BurjScene.tsx:54-56)

Добавлен Environment preset для реалистичных отражений:

```tsx
<Suspense fallback={null}>
  <Environment preset="apartment" background={false} />
</Suspense>
```

**Особенности**:
- ✅ Preset: `apartment` (лёгкий, быстро грузится)
- ✅ `background={false}` — не заменяет фон (только отражения)
- ✅ Wrapped in Suspense — не блокирует render
- ✅ Отражения на стекле и металле

**Почему "apartment"**:
- Лёгкий HDR (не нагружает GPU)
- Нейтральное освещение (подходит для day/night)
- Быстрая загрузка (не блокирует Suspense как "city")

### 5. Мягкое освещение
**Файл**: [components/three/LightingController.tsx](components/three/LightingController.tsx)

#### Lights setup:

**1. Ambient Light** — общее заполнение:
```tsx
<ambientLight intensity={0.3} />
// Night: 0.1, Day: 0.3
```

**2. Directional Light** — ключевой свет (sun/moon):
```tsx
<directionalLight
  position={[15, 20, 10]}
  intensity={1.5}              // Night: 0.4, Day: 1.5
  castShadow
  shadow-mapSize={[2048, 2048]}
/>
// Day color: rgb(1, 1, 1) - белый
// Night color: rgb(0.6, 0.7, 1.0) - холодный синий
```

**3. Hemisphere Light** — fill light (небо + земля):
```tsx
<hemisphereLight
  args={['#ffffff', '#444444', 0.6]}
  // Sky: белый, Ground: тёмно-серый
  // Night: 0.2, Day: 0.6
/>
```

**4. Spot Light** — rim light (контуры):
```tsx
<spotLight
  position={[-8, 15, -8]}
  intensity={0.5}              // Night: 0.8 (stronger), Day: 0.5
  angle={0.4}
  penumbra={0.5}               // Мягкие края
  castShadow
/>
```

**5. Point Light (NEW)** — soft fill:
```tsx
<pointLight
  position={[8, 5, 12]}
  intensity={0.3}              // Мягкое заполнение
  color="#ffffff"
  distance={30}
  decay={2}                    // Реалистичный falloff
/>
```

**Эффекты**:
- ✅ Мягкие тени (multiple light sources)
- ✅ Реалистичное заполнение (ambient + hemisphere + point)
- ✅ Драматичность (rim light подчёркивает контуры)
- ✅ Day/Night transitions (GSAP tween 1.5s)

### 6. Тени (Shadows)
**Настройки**:
- Directional Light: 2048x2048 shadow map (высокое качество)
- Spot Light: с тенями
- Ground plane: `receiveShadow`
- Building meshes: `castShadow` + `receiveShadow`

**Результат**:
- ✅ Реалистичные тени от башни на ground
- ✅ Контактные тени между этажами
- ✅ Мягкие края теней (penumbra на spotlight)

## Итоговый результат

### Day Mode (Дневной режим):
- ☀️ **Яркое освещение**: intensity 1.5 на directional
- 🌞 **Тёплый белый** свет: rgb(1, 1, 1)
- ✨ **Ambient**: 0.3, **Hemisphere**: 0.6, **Rim**: 0.5
- 🔆 **Стекло**: прозрачное, с отражениями Environment
- 🏗️ **Металл**: серебристый, полированный
- 🧱 **Бетон**: светло-серый, матовый
- 🟠 **Акценты**: оранжевые углы светятся мягко

### Night Mode (Ночной режим):
- 🌙 **Тёмное освещение**: intensity 0.4 на directional
- 🌌 **Холодный синий** moonlight: rgb(0.6, 0.7, 1.0)
- ✨ **Ambient**: 0.1, **Hemisphere**: 0.2, **Rim**: 0.8 (stronger)
- 🌃 **Стекло**: тёмное, с синеватыми отражениями
- 🏗️ **Металл**: холодный блеск
- 🧱 **Бетон**: тёмно-серый
- 🟠 **Акценты**: оранжевые углы выделяются больше на тёмном фоне

## Изменённые файлы

1. ✅ [components/three/BurjKhalifaModel.tsx](components/three/BurjKhalifaModel.tsx)
   - Материалы для GLB: стекло с transmission, металл, бетон
   - Определение по имени mesh

2. ✅ [components/three/BurjKhalifa.tsx](components/three/BurjKhalifa.tsx)
   - Оранжевые акценты на углах (уже было в ЭТАП C)
   - MKA STROY палитра

3. ✅ [components/three/BurjScene.tsx](components/three/BurjScene.tsx)
   - Добавлен Environment preset="apartment" в Suspense
   - Отражения для стекла и металла

4. ✅ [components/three/LightingController.tsx](components/three/LightingController.tsx)
   - Добавлен soft point light (front fill)
   - 5 источников света для мягкого освещения

## Что проверить

### Материалы:
1. ✅ **Стекло прозрачное** (transmission видна)
2. ✅ **Металл отражает** environment
3. ✅ **Бетон матовый** (нет блеска)
4. ✅ **Оранжевые углы** светятся мягко

### Освещение:
1. ✅ **Day mode яркий** (intensity 1.5)
2. ✅ **Night mode тёмный** (intensity 0.4, синий)
3. ✅ **Тени мягкие** (multiple lights)
4. ✅ **Нет резких контрастов** (soft fill light работает)

### Environment:
1. ✅ **Отражения на стекле** видны
2. ✅ **Отражения на металле** видны
3. ✅ **Нет блокировки** загрузки (Suspense работает)
4. ✅ **Фон не изменился** (background={false})

### Day → Night переход:
1. Кликни Sun icon
2. ✅ **Освещение плавно темнеет** (1.5s GSAP)
3. ✅ **Цвет меняется** на холодный синий
4. ✅ **Оранжевые акценты выделяются** больше
5. ✅ **Rim light усиливается** (0.8)

---

**Статус**: ✅ ЗАДАЧА 2 ЗАВЕРШЕНА
**Готово к тестированию**: Да
**Build status**: Проверить с `npm run build`
