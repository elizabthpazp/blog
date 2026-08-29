---
title: "Diseño Web"
subtitle: "CSS Moderno en 2026: Container Queries, :has() y View Transitions que Reemplazan JavaScript"
description: "Domina el CSS moderno de 2026: container queries, :has() parent selector, View Transitions API, anchor positioning y subgrid con ejemplos reales que eliminan media queries y JS innecesario."
date: "28 agosto 2026"
image: "./css-moderno-2026.svg"
icon: "./css-icon.svg"
language: "css"
---

![css moderno 2026 container queries has view transitions](./css-moderno-2026.svg)

# CSS Moderno en 2026:
## Container Queries, :has() y View Transitions

28 agosto 2026

#### Domina el CSS moderno de 2026: container queries, :has() parent selector, View Transitions API, anchor positioning y subgrid con ejemplos reales que eliminan media queries y JS innecesario.

### El CSS que por fin reemplaza JavaScript en 2026

#### En 2026 el CSS hace cosas que en 2023 requerían 200 líneas de JS y 3 librerías: componentes que se adaptan a su contenedor (no al viewport), estilos que dependen de hijos (`:has()`), transiciones entre páginas sin JS (View Transitions) y tooltips anclados sin Popper.js. Todo con soporte >92% global (Chrome 118+, Safari 17.4+, Firefox 125+) y sin polyfills en producción.

#### Si aún escribes `@media (min-width: 768px)` para un card que vive en una sidebar de 320px, estás usando CSS de 2015. En 2026, el CSS piensa en componentes, no en páginas.

```css
/* 2023 — media query rota cuando el card cambia de contexto */
.card { width: 100%; }
@media (min-width: 768px) { .card { grid-template-columns: 1fr 1fr; } }
/* ❌ Si el card está en sidebar de 320px en desktop, sigue creyendo que es "desktop" */

/* 2026 — container query: el componente se adapta a SÍ mismo */
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card { grid-template-columns: 1fr 1fr; } /* ✅ Solo si SU contenedor es ancho */
}
```

### 1. Container Queries: el fin de las media queries para componentes

#### `@container` permite que un componente consulte el tamaño de su contenedor padre, no del viewport. Es la base del design system moderno en 2026.

#### Caso real 2026 — card que funciona en grid, sidebar y modal sin variantes:

```html
<!-- Un solo componente, 3 contextos distintos -->
<div class="layout">
  <main class="grid"><div class="card-wrapper"><article class="card">...</article></div></main>
  <aside class="sidebar"><div class="card-wrapper"><article class="card">...</article></div></aside>
</div>
```

```css
/* 2026 — 1 componente, 0 props de layout, 100% CSS */
.card-wrapper {
  container-type: inline-size;
  container-name: card; /* opcional pero recomendado para anidar */
}

.card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  /* Móvil del componente (contenedor <400px): stack vertical */
}

/* Tablet del componente */
@container card (min-width: 400px) {
  .card {
    grid-template-columns: 120px 1fr;
    padding: 1.5rem;
  }
  .card img { width: 120px; height: 120px; }
}

/* Desktop del componente */
@container card (min-width: 600px) {
  .card {
    grid-template-columns: 200px 1fr 120px;
  }
  .card .actions { display: flex; flex-direction: column; }
}

/* Style queries (2026) — consulta custom properties */
@container style(--theme: dark) {
  .card { background: #1a1d2e; color: #fff; }
}
```

#### Unidades nuevas en 2026 — `cqw`, `cqh`, `cqi`, `cqb` (1% del container, como `vw` pero del contenedor):

```css
.card h2 { font-size: clamp(1rem, 5cqw, 1.5rem); } /* escala con el card, no con la ventana */
```

### 2. :has() — el parent selector que esperaste 20 años

#### `:has()` llegó a baseline en 2024 y en 2026 es usado por 64% de sitios top según HTTP Archive. Permite estilar un padre según sus hijos o hermanos, eliminando JS para estados como "form con error", "card con imagen", "header con menú abierto".

```css
/* 2026 — 0 JS para estos patrones que antes requerían useState */

/* Form: si algún input es :invalid, pinta el form */
form:has(input:invalid) { border-color: #ef4444; }
form:has(input:invalid) button[type="submit"] { opacity: 0.5; pointer-events: none; }

/* Card: si tiene imagen, cambia layout */
.card:has(img) { grid-template-columns: 120px 1fr; }
.card:not(:has(img)) { grid-template-columns: 1fr; } /* sin imagen = full width */

/* Header: si el menú está abierto (checkbox hack o :target), anima */
.header:has(#menu-toggle:checked) nav { transform: translateX(0); }

/* Lista: si hay más de 3 hijos, muestra "ver más" */
.list:has(> :nth-child(4)) .show-more { display: block; }

/* Truco 2026 — :has(+ *) para hermanos siguientes */
.field:has(+ .error) input { border-color: #ef4444; }
```

```html
<!-- Ejemplo completo sin JS -->
<form class="form">
  <label>Email <input type="email" required /></label>
  <label>Password <input type="password" required minlength="8" /></label>
  <button type="submit">Enviar</button>
  <!-- CSS hace todo: si algún input:invalid, el botón se desactiva visualmente -->
</form>
```

### 3. View Transitions API: animaciones entre páginas con 3 líneas

#### View Transitions (Chrome 111+, Safari 18+) permite animar navegación SPA y MPA sin Framer Motion ni CSS manual. En 2026 es el estándar para transiciones de route en Next.js, TanStack Start y Astro.

```css
/* 2026 — 3 líneas para transición fluida entre páginas */
@view-transition {
  navigation: auto; /* ← activa en MPA (Next.js, Astro). Para SPA, usa document.startViewTransition() */
}

/* Personaliza la animación */
::view-transition-old(root) { animation: slide-out 0.3s ease; }
::view-transition-new(root) { animation: slide-in 0.3s ease; }

@keyframes slide-out { to { transform: translateX(-20px); opacity: 0; } }
@keyframes slide-in { from { transform: translateX(20px); opacity: 0; } }

/* Transición por elemento — ej: imagen que "viaja" entre páginas */
.card img { view-transition-name: hero-image; } /* mismo name en ambas páginas = morph automático */
```

```javascript
// SPA manual (TanStack Router, Vite) en 2026
function navigateWithTransition(href) {
  if (!document.startViewTransition) {
    location.href = href // fallback
    return
  }
  document.startViewTransition(() => {
    router.navigate({ to: href }) // TanStack Router / Next.js router
  })
}

// Next.js 16: ya integrado con <Link> y App Router en 2026
// Solo añade `view-transition-name` en los elementos que quieres que hagan morph
```

#### Demo mental: click en card → imagen crece y se mueve a hero de detalle, título se desplaza, sin JS de animación. Antes: 80 líneas con Framer Motion. Ahora: 1 CSS prop.

### 4. Anchor Positioning y Subgrid: los otros dos gigantes de 2026

#### Anchor Positioning (Chrome 125+, Safari 18.4+) reemplaza Popper.js/Floating UI para tooltips, popovers y dropdowns anclados sin JS de posicionamiento.

```css
/* 2026 — tooltip anclado sin JS, sin Popper, sin cálculos */
#anchor { anchor-name: --my-anchor; }
#tooltip {
  position: absolute;
  position-anchor: --my-anchor;
  top: anchor(bottom);
  left: anchor(center);
  translate: -50% 0;
  margin-top: 8px;
  /* Fallback automático si se sale del viewport — sin JS */
  position-try-fallbacks: flip-block, flip-inline;
}

/* Popover nativo + anchor (2026) */
button[popovertarget="menu"] { anchor-name: --menu-btn; }
#menu {
  position: absolute;
  position-anchor: --menu-btn;
  top: anchor(bottom);
  left: anchor(left);
}
```

#### Subgrid (ya baseline >90% en 2026) alinea grids anidados sin hacks:

```css
/* 2026 — cards con alturas alineadas sin JS */
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }
.card img { grid-row: 1; }
.card h3 { grid-row: 2; }
.card p { grid-row: 3; }
/* Todas las imágenes, títulos y párrafos se alinean entre cards automáticamente */
```

#### Tabla de soporte 2026 (baseline):

| Feature | Chrome | Safari | Firefox | Soporte global |
| --- | --- | --- | --- | --- |
| **Container Queries** | 105+ | 16+ | 110+ | 92% |
| **:has()** | 105+ | 15.4+ | 121+ | 91% |
| **View Transitions (MPA)** | 111+ | 18+ | 125+ | 88% |
| **Anchor Positioning** | 125+ | 18.4+ | 128+* | 78%* |
| **Subgrid** | 117+ | 16+ | 71+ | 90% |

*\* Anchor aún en rollout Firefox 128+, usa `@supports` fallback a Floating UI.*

### 5. Checklist para modernizar tu CSS en 2026

```css
/* Antes de 2026 — revisa y reemplaza */

/* ❌ @media para componentes → ✅ @container */
@media (min-width: 768px) { .card { ... } } /* → @container (min-width: 400px) */

/* ❌ JS para parent selector → ✅ :has() */
.card.has-image { ... } /* JS añade clase → .card:has(img) */

/* ❌ Framer Motion para route transition → ✅ View Transitions */
<motion.div animate={{ x: 0 }}> →  ::view-transition-old/new + view-transition-name

/* ❌ Popper.js para tooltip → ✅ Anchor Positioning */
useFloating() →  position-anchor: --anchor; top: anchor(bottom);

/* ❌ Hacks para alinear alturas → ✅ Subgrid */
height: equalizeWithJS() →  grid-template-rows: subgrid;
```

#### Migración recomendada:

1. **Semana 1**: añade `container-type` a wrappers de cards, listas, sidebars y migra 3 componentes a `@container`.
2. **Semana 2**: busca `element.classList.toggle` que solo añade clases para CSS y reemplaza con `:has()`.
3. **Semana 3**: activa `@view-transition { navigation: auto }` y añade `view-transition-name` a 2 imágenes hero.
4. **Semana 4**: reemplaza 1 tooltip con anchor positioning y 1 grid con subgrid.

### Conclusiones

#### CSS en 2026 ya no es "el lenguaje para pintar": es el motor de layout y animación que hace innecesario el 60% del JS que escribíamos en 2023. Container Queries te dan componentes verdaderamente reutilizables, `:has()` elimina estados derivados en React, View Transitions te regala animaciones nativas de 60fps y anchor positioning jubila librerías de 12kB. Si aún no usas estas cuatro features, tu próxima PR puede borrar más JS del que añade CSS. El mejor JavaScript en 2026 es el que reemplazas con CSS moderno.
