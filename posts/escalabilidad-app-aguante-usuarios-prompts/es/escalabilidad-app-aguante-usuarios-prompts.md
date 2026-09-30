---
title: "Backend y Base de Datos"
subtitle: "Escalabilidad: que tu app aguante usuarios con 8 prompts de rendimiento"
description: "Tu app va bien con 10 usuarios y se arrastra con 100. Por que pasa: paginacion inexistente, problema N+1 e indices faltantes. 8 prompts para medir, paginar, unir consultas e indexar antes de tu primer pico."
date: "10 septiembre 2026"
image: "./escalabilidad-app-usuarios.svg"
icon: "./escalabilidad-icon.svg"
language: "js"
---

![escalabilidad que tu app aguante usuarios](./escalabilidad-app-usuarios.svg)

# Escalabilidad: que tu app aguante
## 8 prompts de rendimiento

10 septiembre 2026

#### Tu app va bien con 10 usuarios y se arrastra con 100. Por que pasa: paginacion inexistente, problema N+1 e indices faltantes. 8 prompts para medir, paginar, unir consultas e indexar antes de tu primer pico.

### Por que tu app se pone lenta con usuarios

#### No es culpa de la IA. Le pediste una app bonita y funcional, y te dio eso. Optimizar consultas, indexar tablas y preparar la app para crecer es algo que nunca le pediste. Estos 8 prompts de escalabilidad son para pedirselo ahora, dentro de tu proyecto, para que lea tu codigo de verdad.

### Los 3 problemas silenciosos

### 1. Traes datos que nadie pidio

#### Abres la pantalla de pedidos y la app trae los 5,000, cuando en pantalla caben 20. Con 50 ni se nota. Con 5,000 la pantalla tarda, el telefono se traba y tu factura de base de datos sube. La solucion es paginacion: traer de 20 en 20 y pedir mas cuando el usuario baja.

### 2. Una consulta por cada fila

#### Traes 20 pedidos y despues, por cada pedido, otra consulta para el cliente. Son 21 consultas para una pantalla. Con 100 pedidos son 101. Esto se llama problema N+1 y se arregla trayendo pedidos y clientes juntos en una sola consulta.

### 3. Tablas sin indices

#### Filtras por el id del cliente, pero esa columna no tiene indice. La base revisa la tabla completa, fila por fila, cada vez. Con 1,000 filas no lo notas. Con 500,000 si. Un indice es como el indice de un libro: en vez de leer todo, va directo a lo que buscas.

#### Antes de tocar nada, mide. La parte que crees lenta casi nunca es la lenta de verdad, y cada indice hace las escrituras un poco mas lentas. Optimiza lo que duele, no todo.

### Como usar estos prompts

#### Corre un prompt a la vez, en orden. Empieza por el primero, que te dice donde se va a caer tu app, y arregla en ese orden. No optimices a ciegas: primero mide, despues cambia.

### 1. Donde se va a caer mi app

```
Actua como un ingeniero de backend con experiencia en apps que
crecen rapido. Dime que partes se pondran lentas o fallaran con
muchos usuarios y mucha data.

Esto es lo que tengo:
[PEGA AQUI tus pantallas y consultas principales, o abre este
prompt en tu proyecto. Dime tu base: Supabase, Firebase,
Postgres, MySQL, etc.]

Revisa:
1. Consultas que traen todas las filas sin limite ni paginacion
2. Consultas dentro de bucles: una por elemento (problema N+1)
3. Columnas por las que filtras, ordenas o unes, sin indice
4. Consultas que traen todas las columnas usando solo dos o tres
5. Data que se pide en cada carga aunque casi nunca cambia
6. Imagenes en tamaño completo para mostrarse pequeñas

Respondeme asi:
- Los 5 problemas mas graves, por lo que se notara al crecer
- Para cada uno: archivo y linea, que pasa con 100 usuarios
  y que pasa con 10,000
- Que arreglo primero y por que

No cambies codigo todavia, solo el diagnostico.
```

### 2. Paginacion

```
Actua como un ingeniero de backend arreglando una pantalla que
trae demasiada data. Añade paginacion a esta pantalla.

Esto es lo que tengo:
[PEGA AQUI el codigo de la pantalla y de la consulta]

Haz esto:
1. Dime cuantos registros trae hoy y por que es un problema
2. Implementa paginacion de 20 en 20, como recomienda mi base
3. Explica pagina vs cursor, y dime cual me conviene aqui
4. Actualiza la interfaz: cargar mas o scroll infinito, con su carga
5. Orden estable, para no repetir ni saltar filas al cargar mas

Dame el codigo final completo y como probarlo con muchos registros.
```

```javascript
// Ejemplo: paginacion por cursor en Supabase, la que no repite filas
const PAGE_SIZE = 20;

async function getOrdersPage(cursorCreatedAt = null) {
  let query = supabase
    .from('orders')
    .select('id, total, created_at, customer:customers(id, name)')
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE);

  if (cursorCreatedAt) query = query.lt('created_at', cursorCreatedAt);
  const { data, error } = await query;
  if (error) throw error;
  const nextCursor = data.length === PAGE_SIZE
    ? data[data.length - 1].created_at
    : null;
  return { orders: data, nextCursor }; // null = no hay mas
}
```

### 3. Problema N+1

```
Actua como un ingeniero de backend cazando consultas innecesarias.
Encuentra y arregla donde hago una consulta por cada fila.

Esto es lo que tengo:
[PEGA AQUI la pantalla o endpoint que muestra una lista con datos
relacionados, como pedidos con su cliente]

Haz esto:
1. Cuenta cuantas consultas hace hoy con 20 elementos y con 200
2. Señala donde esta la consulta dentro del bucle
3. Reescribelo en una sola consulta, con joins o relaciones
4. Si no se puede en una, agrupalas en pocas y fijas, no una por fila
5. Dime cuantas consultas quedan despues

Muestrame el antes y el despues, y confirma que el usuario ve
lo mismo.
```

### 4. Indices en la base de datos

```
Actua como un administrador de bases de datos revisando un
proyecto que va a crecer. Dime que indices le faltan.

Esto es lo que tengo:
[PEGA AQUI tu esquema de tablas y las consultas que mas corren,
con por que columnas filtras, ordenas y unes]

Haz esto:
1. Para cada consulta, que columnas necesitan indice y por que
2. Dame el SQL para crearlos, listo para correr
3. Cuales conviene compuestos, y en que orden van las columnas
4. Si alguno hara escrituras mas lentas y si vale la pena igual
5. Si hay indices sin uso que solo estorban
6. Como confirmar que la base de verdad usa cada indice

Importante: primero en ambiente de pruebas, no en produccion.
Dime como crear indices sin bloquear la tabla si ya tengo usuarios.
```

```sql
-- Ejemplo tipico: filtrar y ordenar pedidos por cliente y fecha
CREATE INDEX CONCURRENTLY orders_customer_created_idx
  ON orders (customer_id, created_at DESC);

-- Confirmar que se usa (Postgres / Supabase)
EXPLAIN ANALYZE
SELECT id, total FROM orders
WHERE customer_id = 'abc' ORDER BY created_at DESC LIMIT 20;
```

### 5. Traer solo lo necesario

```
Actua como un ingeniero de rendimiento revisando cuanta data
viaja en mi app. Reduce lo que se transfiere por pantalla.

Esto es lo que tengo:
[PEGA AQUI tus consultas y las pantallas que las usan]

Revisa:
1. Consultas que traen todas las columnas usando solo algunas
2. Campos pesados sin necesidad: textos largos, JSON grandes,
   imagenes en base64
3. Data de la lista que solo hace falta en el detalle
4. Imagenes completas para mostrarse pequeñas
5. Data que el usuario nunca llega a ver

Para cada caso dime cuanto viaja hoy, que quitar, y la consulta
corregida.
```

### 6. Guardar en cache lo que casi no cambia

```
Actua como un ingeniero de rendimiento decidiendo que cachear.
Evita que mi app pida lo mismo una y otra vez.

Esto es lo que tengo:
[PEGA AQUI tus pantallas principales y tu stack]

Haz esto:
1. Separa lo que casi no cambia (categorias, configuracion,
   perfiles) de lo fresco (saldos, pedidos, stock)
2. Para cada una, donde cachear y por cuanto tiempo
3. Implementalo con las herramientas de mi proyecto
4. Como se limpia cuando cambia, para no mostrar datos viejos
5. Que NO debo cachear nunca en mi caso y por que

Dame el codigo final y como comprobar que funciona.
```

### 7. Medir que esta lento de verdad

```
Actua como un ingeniero de rendimiento que no adivina, mide.
Enseñame que esta lento en mi app.

Esto es lo que tengo:
[PEGA AQUI tu stack y tu base, y describe la pantalla lenta]

Haz esto:
1. Como ver cuanto tarda cada consulta, con el comando exacto
   (como leer el plan de ejecucion)
2. Interpretalo en simple: que es recorrer la tabla completa
   y que es usar un indice
3. Como medir el tiempo de carga de una pantalla
4. Una herramienta gratis para ver esto en produccion y conectarla
5. Tres numeros para vigilar cada semana, con un valor razonable

Explicalo para alguien que nunca midio rendimiento.
```

### 8. Probar con muchos usuarios antes de tenerlos

```
Actua como un ingeniero de QA preparando una prueba de carga.
Ayudame a saber cuantos usuarios aguanta mi app.

Esto es lo que tengo:
[PEGA AQUI tu flujo principal y donde esta desplegada:
Vercel, Supabase, etc.]

Haz esto:
1. Cuanta data falsa generar para que tenga sentido (ej. 100,000
   filas) y el script para generarla
2. Una herramienta de carga sencilla, con configuracion lista
3. Simula usuarios en aumento y que observar en cada nivel
4. Que limites de mi plan puedo tocar: conexiones, tiempos,
   peticiones
5. Como interpretar los resultados: que significa fallar ahi

Importante: contra ambiente de pruebas con data falsa, nunca
produccion ni datos reales.
```

### Preguntas frecuentes

#### Necesito aguantar un millon de usuarios mañana?

#### No. Necesitas no caerte en tu primer pico real. Paginacion, consultas unidas e indices te ponen por delante de la mayoria de apps hechas con IA.

#### Paginacion por pagina o por cursor?

#### Por cursor cuando la lista cambia seguido (pedidos, feed): no repite ni salta filas. Por numero cuando la lista es fija y quieres saltar a la pagina 5. El prompt 2 te dice cual usar en tu caso.

#### Los indices tienen costo?

#### Si: hacen las escrituras un poco mas lentas y ocupan espacio. Por eso se ponen solo donde filtras, ordenas o unes seguido, y se miden antes y despues.

### Conclusiones

#### Mide primero, pagina despues, une las consultas repetidas y pon los indices que faltan. Con paginacion, N+1 resuelto y cache en lo estable, tu app esta lista para crecer sin reescribirla.
