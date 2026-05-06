# 🎮 Trabajo Web Avanzado

**Explorador y colección personal de videojuegos**

SPA frontend construida con React + Vite + Tailwind CSS 4.1 como entregable del Taller Integrador Técnico. Permite explorar un catálogo de videojuegos, guardarlos en una colección personal, marcarlos como favoritos, asignarles un estado de juego y gestionar un perfil de jugador con sesión simulada.

---

## Tema elegido

Gestión de colección de videojuegos. El usuario puede explorar un catálogo (con búsqueda, filtros múltiples y paginación), guardar juegos en su colección personal con estado (por jugar / jugando / completado / abandonado), marcarlos como favoritos, consultar el detalle de cada título y configurar su perfil de jugador.

La fuente de datos es dual: un seed local de 79 juegos garantiza que la app funcione sin internet, y si se configura una clave de API de RAWG, se accede a datos en vivo con respaldo automático al seed si la API falla.

---

## Stack

| Tecnología   | Versión | Rol |
|---|---|---|
| React        | 18.3    | Interfaz y estado reactivo |
| Vite         | 6.0     | Bundler y servidor de desarrollo |
| Tailwind CSS | 4.1     | Sistema de estilos con `@theme` y variables CSS |
| React Router | 6.28    | Navegación SPA, rutas dinámicas y rutas protegidas |

---

## Instalación y ejecución

### Requisitos previos

Tener instalado en el sistema:

- [Node.js](https://nodejs.org/) versión **18 o superior**
- npm (viene incluido con Node.js)

Para verificar que están instalados:

```bash
node --version
npm --version
```

### Pasos

**1. Descomprimir o clonar el proyecto**

```bash
# Si es un .zip, descomprimirlo y entrar a la carpeta
cd trabajo_web_avanzado
```

**2. Instalar las dependencias**

```bash
npm install
```

**3. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

Abre el navegador en **http://localhost:5173**

---

### Otros comandos disponibles

```bash
# Compilar para producción
npm run build

# Vista previa del build de producción
npm run preview
```

---

### Opcional — Datos en vivo con API RAWG

Por defecto la app usa un catálogo local de 79 juegos y no necesita internet. Para activar datos en vivo:

1. Obtén una clave gratuita en [rawg.io/apidocs](https://rawg.io/apidocs)
2. Abre `src/services/rawg.service.js`
3. Reemplaza el valor de `API_KEY`:

```js
const API_KEY = 'tu_clave_aqui'
```

Si la API falla, la app vuelve automáticamente al catálogo local sin errores.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── App.jsx                  # Árbol de rutas principal
│   ├── AppShell.jsx             # Layout persistente: header + nav + footer + toasts
│   └── ProtectedRoute.jsx       # Guardia con dos condiciones: perfil + sesión
│
├── components/
│   ├── GameCard.jsx             # Tarjeta reutilizable con acciones de colección y favorito
│   ├── SearchInput.jsx          # Input con historial de búsquedas persistido
│   ├── FilterBar.jsx            # Filtros combinables: géneros múltiples, plataforma, rating
│   ├── ActiveFilters.jsx        # Chips eliminables de filtros activos
│   ├── EmptyState.jsx           # Estado vacío genérico reutilizable
│   ├── ErrorBanner.jsx          # Banner de error contextual con indicador de respaldo
│   ├── LoadingGrid.jsx          # Esqueleto de carga animado
│   └── Toast.jsx                # Sistema de notificaciones emergentes
│
├── context/
│   └── AppContext.jsx           # Estado global: colección, favoritos, perfil, sesión
│
├── data/
│   └── games-seed.json          # 79 juegos como fuente local y respaldo offline
│
├── features/
│   ├── catalog/
│   │   └── CatalogPage.jsx      # Vista principal: búsqueda, filtros, cuadrícula, paginación
│   ├── detail/
│   │   └── DetailPage.jsx       # Detalle de juego: hero, descripción, selector de estado
│   ├── collection/
│   │   ├── CollectionPage.jsx   # Colección personal — RUTA PROTEGIDA
│   │   ├── CollectionStats.jsx  # Estadísticas con tabs por estado
│   │   ├── CollectionGrid.jsx   # Vista cuadrícula con acciones
│   │   └── CollectionList.jsx   # Vista lista compacta con badges
│   ├── profile/
│   │   ├── ProfilePage.jsx      # Orquestador del perfil
│   │   ├── ProfileCard.jsx      # Resumen del perfil con estadísticas
│   │   └── ProfileForm.jsx      # Formulario con barra de progreso y vista previa
│   ├── sesion/
│   │   └── SesionPage.jsx       # Inicio y cierre de sesión simulada
│   └── NotFoundPage.jsx         # Página 404
│
├── hooks/
│   ├── useLocalStorage.js       # Hook base de persistencia reactiva
│   ├── useGames.js              # Orquesta API + seed + debounce de búsqueda
│   ├── useFilters.js            # Filtros combinables con soporte multi-género
│   ├── useCollection.js         # Filtrado, ordenamiento y conteos de la colección
│   ├── useProfileForm.js        # Estado, errores y validación del formulario
│   ├── useSearchHistory.js      # Historial de búsquedas con persistencia
│   └── useUIPrefs.js            # Preferencias de interfaz (cuadrícula / lista)
│
├── lib/
│   ├── constants.js             # Colores, opciones, claves de localStorage centralizadas
│   └── utils.js                 # Funciones puras reutilizables
│
├── services/
│   ├── rawg.service.js          # Cliente HTTP a RAWG con detección de clave
│   └── games.normalizer.js      # Normalización de API y seed al modelo interno
│
├── index.css                    # Tema visual: @theme, animaciones y scrollbar
└── main.jsx                     # Punto de entrada
```

---

## Funcionalidades implementadas

| Requisito | Implementación |
|---|---|
| Layout persistente | `AppShell` con header sticky, nav activa y footer en todas las rutas |
| Vista de exploración | `CatalogPage` con cuadrícula `auto-fill`, animación escalonada y paginación |
| Búsqueda por texto | `SearchInput` con debounce de 400ms e historial persistido |
| Filtros combinables | Géneros múltiples (OR), plataforma y puntuación mínima en `FilterBar` |
| Filtros como chips | `ActiveFilters` muestra etiquetas eliminables individualmente |
| Colección / shortlist | Contexto global + `CollectionPage` con tabs, búsqueda y ordenamiento |
| Favoritos | Marcado independiente con icono ⭐ y tab dedicado en la colección |
| Detalle por elemento | `/games/:slug` con imagen hero, descripción, plataformas y selector de estado |
| Formulario con validación | `ProfileForm` con validación `onBlur`, barra de progreso y vista previa en vivo |
| Ruta protegida | `/coleccion` requiere perfil configurado **y** sesión activa (dos condiciones) |
| Loading state | `LoadingGrid` con tarjetas esqueleto animadas |
| Empty state | `EmptyState` contextual en catálogo, detalle y cada tab de la colección |
| Error state | `ErrorBanner` con mensaje + indicador de respaldo automático al seed |
| Notificaciones | `Toast` al agregar, quitar o cambiar estado de juegos |

---

## Decisiones de arquitectura

### Capa de servicios desacoplada
`rawg.service.js` encapsula toda la comunicación con la API externa. Ningún componente ni hook hace `fetch` directamente. Si la fuente de datos cambia, solo se modifica el servicio sin tocar la interfaz.

### Normalización con modelo interno estable
`games.normalizer.js` convierte tanto respuestas de RAWG como registros del seed al mismo modelo interno:

```js
{ id, slug, name, image, genres[], platforms[], rating, metacritic, year, description }
```

Todos los campos tienen valores por defecto seguros (`?? []`, `?? null`) para que ningún componente falle por datos faltantes o incompletos.

### Estado global mínimo y con criterio
`AppContext` solo globaliza información genuinamente transversal: `coleccion`, `favoritos`, `perfil` y `sesion`. El estado de filtros vive en `CatalogPage`, el historial en `useSearchHistory`, las preferencias de UI en `useUIPrefs` y la lógica de colección en `useCollection`. No se globalizó lo que no necesita serlo.

### Persistencia en cinco claves de localStorage

| Clave | Contenido |
|---|---|
| `gameshelf_coleccion` | Juegos guardados con estado y fecha de agregado |
| `gameshelf_perfil` | Nombre, plataforma favorita, géneros, horas semanales |
| `gameshelf_sesion` | Estado de sesión simulada y timestamp del último acceso |
| `gameshelf_preferencias_ui` | Vista de colección: cuadrícula o lista |
| `gameshelf_historial_busqueda` | Últimas 5 búsquedas realizadas |

### Filtros multi-género con lógica OR
`useFilters` maneja `genres` como array. Al seleccionar varios géneros, el catálogo muestra juegos que pertenecen a **cualquiera** de los géneros activos. Incluye migración automática desde el formato anterior (`genre: string`) para no romper datos persistidos.

### Ruta protegida con doble condición
`ProtectedRoute` evalúa dos condiciones independientes:
1. Perfil configurado (`username` definido en localStorage)
2. Sesión activa (iniciada explícitamente por el usuario)

Si falla la primera, redirige a `/perfil?setup=true`. Si falla la segunda, redirige a `/sesion?redirect=/coleccion`, que después del login vuelve automáticamente a la colección.

### Respaldo resiliente
`useGames` detecta si hay clave de API configurada. Sin clave, carga el seed directamente sin intentar la API ni generar errores falsos. Con clave y fallo de red, activa el seed como respaldo y notifica al usuario con `ErrorBanner`.

### Validación en dos fases
`useProfileForm` valida campo por campo al perder el foco (`onBlur`) y valida todo al intentar enviar. Feedback inmediato sin ser invasivo durante la escritura. Incluye barra de completitud y vista previa del perfil en tiempo real.

### Constantes centralizadas
`lib/constants.js` define colores de géneros, opciones de estado, tabs, plataformas, opciones de perfil y las claves de localStorage. Ningún componente define estas constantes localmente, lo que hace que cualquier cambio de dominio impacte un solo archivo.

---

## Autoevaluación frente a los criterios

| Criterio | Evidencia |
|---|---|
| **Arquitectura** | Modular por features, separación clara en `services/`, `hooks/`, `lib/`, `components/` |
| **Funcionalidad** | Búsqueda, filtros multi-género, colección con estados, favoritos, formulario, detalle y ruta protegida |
| **Capa de datos** | Normalizador robusto, servicio desacoplado, respaldo automático al seed |
| **Estado y persistencia** | Contexto global mínimo, 5 claves en localStorage, rutas con doble condición |
| **Diseño** | Sistema de colores con `@theme`, Tailwind 4.1, estados hover/focus/error, identidad visual coherente |
| **Calidad técnica** | Constantes centralizadas, funciones puras en `utils.js`, JSDoc en hooks y servicios |
| **Proyección** | Ver sección siguiente |

---

## Proyección — cómo evolucionaría el proyecto

### Iteración 1 — Autenticación real
`AppContext` ya tiene `sesion`, `iniciarSesion` y `cerrarSesion`. Reemplazar esa lógica por Supabase Auth o Firebase no rompe ningún componente. `ProtectedRoute` ya existe y solo cambia la condición que evalúa.

### Iteración 2 — Backend propio
`rawg.service.js` se reemplaza por un cliente a API propia (Express o FastAPI). El normalizador ya abstrae el modelo de datos, por lo que la interfaz no necesita cambios si el contrato de respuesta es equivalente.

### Iteración 3 — Reseñas y puntuaciones personales
Se agrega una feature `resenas/` siguiendo el mismo patrón de features existentes. El normalizador se extiende con `puntuacionUsuario` y `resena`. El contexto agrega un array `resenas` con su propia clave en localStorage hasta migrar a base de datos.

### Iteración 4 — Comparación de juegos
Se agrega la ruta `/comparar` que recibe IDs por query string. El contexto ya expone la colección globalmente. Solo se agrega un array `listaComparacion` al contexto y un componente de tabla comparativa.

### Iteración 5 — Estadísticas y panel personal
Se agrega `features/estadisticas/` que consume `coleccion` del contexto y genera métricas: horas estimadas, géneros más jugados, progreso de completitud. No requiere cambios estructurales.

### Deuda técnica identificada
- Agregar pruebas unitarias a `utils.js` y `games.normalizer.js` con Vitest
- Agregar pruebas de integración a los hooks con Testing Library
- Implementar paginación en el servidor cuando se use API propia
- Agregar manejo de errores de red más granular en el servicio
