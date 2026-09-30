---
title: "Diseño UI"
subtitle: "10 prompts para revisar el diseño de tu app hecha con IA: skeleton, jerarquia, tokens y accesibilidad"
description: "Tu app funciona pero se nota que la hizo una IA. Guia practica con las 4 reglas de diseño UI que fallan siempre y 10 prompts listos para copiar y pegar: carga skeleton, jerarquia visual, design tokens y accesibilidad WCAG."
date: "28 septiembre 2026"
image: "./prompts-diseno-app-ia.svg"
icon: "./prompts-diseno-icon.svg"
language: "js"
---

![prompts para revisar el diseño de tu app hecha con IA](./prompts-diseno-app-ia.svg)

# Revisa el diseño de tu app
## 10 prompts que si la mejoran

28 septiembre 2026

#### Tu app funciona pero se nota que la hizo una IA. Guia practica con las 4 reglas de diseño UI que fallan siempre y 10 prompts listos para copiar y pegar: carga skeleton, jerarquia visual, design tokens y accesibilidad WCAG.

### Por que se nota que tu app la hizo una IA

#### No es una sola cosa. Son los mismos cuatro detalles repitiendose en todas las apps generadas: pantallas en blanco mientras carga, textos y botones que compiten entre si, un azul distinto en cada pantalla y grises claros que no se leen con sol. Nada de eso se arregla pidiendo "hazlo mas bonito". Se arregla pidiendo cosas concretas.

#### Esta guia tiene dos partes. Primero las 4 reglas explicadas en simple. Despues los 10 prompts para aplicarlas dentro de tu proyecto, uno por uno, empezando por la primera pantalla que ve tu usuario. Cuando esa quede bien, usala como referencia para las demas.

### Como usar estos prompts

#### Corre un prompt a la vez, dentro de tu proyecto para que la IA lea tu codigo. Empieza por una sola pantalla. No le pidas que rediseñe toda la app de golpe: trabaja pantalla por pantalla y confirma cada cambio antes de seguir.

- Si tu app ya tiene colores, tipografia y logo, pegalos en cada prompt.
- Si no tiene identidad, corre primero el prompt 4, porque todo lo demas depende de eso.
- Pide siempre el codigo final completo, no fragmentos sueltos.

### Las 4 reglas que lo cambian todo

### 1. Carga de esqueleto (skeleton)

#### Hoy tu app muestra una pantalla en blanco o un circulo girando. El usuario no sabe que viene ni cuanto falta. La carga de esqueleto muestra la forma de lo que viene: bloques grises donde iran el titulo, la foto y la lista. Se siente mas rapida aunque tarde lo mismo, y nada salta cuando el contenido aparece.

### 2. Jerarquia visual

#### A los agentes les encanta añadir parrafos de mas, titulos de mas y tres botones del mismo tamaño. El usuario entra y no sabe donde mirar. Jerarquia es decidir que es lo mas importante de cada pantalla y que eso se vea mas grande, mas arriba o mas fuerte. Una sola accion principal por pantalla. Todo lo demas, secundario.

### 3. Design tokens

#### Son tus decisiones de diseño guardadas con nombre: color principal, fondo, texto, espaciados, tamaños de letra, bordes. Sin eso, la IA usa un azul aqui, otro alla y un gris distinto en cada pantalla. El usuario no sabe explicarlo, pero siente que algo esta raro.

### 4. Accesibilidad

#### No es solo para personas con discapacidad. Es lo que hace tu app usable con sol en la pantalla o con el dedo gordo en el celular. Dos numeros que tienes que saber:

- Contraste: el texto normal necesita al menos 4.5 a 1 contra su fondo (nivel AA de WCAG). Los grises claros sobre blanco casi nunca llegan.
- Area de toque: los botones necesitan al menos 44 por 44 puntos en iOS o 48 por 48 en Android. Los iconos pequeños que genera la IA suelen quedar por debajo.

### 1. Diagnostico: que delata a mi app

#### Correlo antes que los demas. Solo diagnostico, sin cambiar codigo todavia.

```
Actua como un diseñador de producto revisando una app hecha con IA.
Dime por que mi app se ve generica y que la delata.

Esto es lo que tengo:
[PEGA AQUI el codigo de tus pantallas principales, o capturas
si tu IA las puede ver]

Revisa estos 7 puntos:
1. Colores: cuantos distintos uso y si cada pantalla usa los suyos
2. Tipografia: cuantos tamaños y grosores, y si hay una escala clara
3. Espaciado: si los margenes siguen un patron o son valores sueltos
4. Jerarquia: si en cada pantalla se entiende en un segundo lo importante
5. Textos: relleno, titulos genericos, explicaciones que nadie lee
6. Estados: que se ve mientras carga, cuando esta vacio y cuando falla
7. Detalles que gritan "esto lo hizo una IA"

Respondeme asi:
- Primera impresion: que transmite mi app hoy, en dos frases honestas
- Los 5 problemas que mas la delatan, ordenados por impacto visual
- Para cada uno: que veo hoy, que deberia ver y por que
- Que arreglo primero

No cambies el codigo todavia, solo el diagnostico.
```

### 2. Carga de esqueleto

```
Actua como un desarrollador frontend experto en experiencia de usuario.
Reemplaza mis pantallas en blanco y circulos de carga por carga de esqueleto.

Esto es lo que tengo:
[PEGA AQUI el codigo de la pantalla y de como carga sus datos hoy]

Haz esto:
1. Muestrame donde esta hoy el estado de carga y que ve el usuario
2. Crea un esqueleto con la misma forma y tamaño del contenido real,
   para que nada salte cuando termine de cargar
3. Usa una animacion suave, no un parpadeo agresivo
4. Respeta la preferencia de reducir movimiento del sistema
5. Dime que hacer si la carga tarda o falla, para no dejar el
   esqueleto en pantalla para siempre
6. Hazlo reutilizable para otras pantallas

Dame el codigo final completo y como probarlo con internet lento.
```

### 3. Jerarquia visual

```
Actua como un diseñador de producto arreglando una pantalla confusa.
Haz que se entienda en un segundo que es lo importante aqui.

Esto es lo que tengo:
[PEGA AQUI el codigo de la pantalla y dime cual es la accion
que quiero que el usuario haga aqui]

Haz esto:
1. Dime que ve primero el ojo hoy y si coincide con lo que yo quiero
2. Marca que texto sobra: parrafos explicativos, subtitulos que
   repiten el titulo, instrucciones obvias
3. Reescribe los textos que se quedan, mas cortos y directos
4. Define un solo elemento principal y baja el peso visual del resto
5. Ajusta tamaños, grosores y espacios para que se note la diferencia
6. Agrupa lo que va junto y separa lo que no

Muestrame el antes y el despues, y explica en una linea cada cambio.
```

### 4. Design tokens

```
Actua como un diseñador de sistemas de diseño.
Ordena mis colores, tipografias y espacios en tokens con nombre.

Esto es lo que tengo:
[PEGA AQUI tu archivo de estilos o configuracion de Tailwind,
y el codigo de dos o tres pantallas]

Haz esto:
1. Lista los colores, tamaños y espaciados que uso hoy, con cuantas
   veces aparece cada uno
2. Propon un set reducido de tokens con nombres por funcion, no por
   color: fondo, superficie, texto principal, texto secundario,
   borde, acento, exito, error
3. Define una escala de tipografia y una de espaciado, con pocos pasos
4. Dame el codigo de esos tokens para mi stack, listo para pegar
5. Muestrame una pantalla usando solo tokens
6. Dime que valores sueltos hay que reemplazar y donde

Si mi app ya tiene marca, respetala. Si no, propon una paleta sobria
y explica por que esos colores.
```

### 5. Tipografia y espaciado

```
Actua como un diseñador revisando tipografia y ritmo visual.
Haz que mi app se lea bien y se sienta ordenada.

Esto es lo que tengo:
[PEGA AQUI el codigo de tus pantallas y tu configuracion de estilos]

Revisa:
1. Cuantos tamaños de letra uso y cuales sobran
2. Si el parrafo se lee comodo en celular
3. Altura y largo de linea: si las lineas son demasiado largas
4. Si los titulos se distinguen por tamaño y peso, no solo por color
5. Si el espaciado sigue una escala o hay valores sueltos
6. Si hay aire entre secciones o todo esta apretado

Dame la escala corregida y una pantalla con el antes y despues.
```

### 6. Contraste y color accesible

```
Actua como un especialista en accesibilidad revisando una interfaz.
Revisa el contraste y el uso del color en mi app.

Esto es lo que tengo:
[PEGA AQUI tus colores y el codigo de tus pantallas, con modo
oscuro si lo tienes]

Revisa:
1. Cada combinacion de texto y fondo, con su ratio calculado
2. Cuales no llegan a 4.5 a 1 en texto normal ni a 3 a 1 en grande
3. El contraste de bordes de campos, iconos y botones
4. Si comunico algo solo con color, como un error solo en rojo
5. Si el modo oscuro tiene los mismos problemas
6. Texto sobre imagenes o degradados, que suele ser el peor caso

Respondeme con una tabla: elemento, colores actuales, ratio,
cumple o no, y el color corregido mas cercano a mi paleta.
```

### 7. Toque, teclado y lectores de pantalla

```
Actua como un especialista en accesibilidad.
Revisa si mi app se usa bien con el dedo, con teclado y con lector.

Esto es lo que tengo:
[PEGA AQUI el codigo de tus pantallas principales]

Revisa:
1. Si botones e iconos llegan a 44x44 en iOS o 48x48 en Android
2. Si los elementos tocables estan demasiado juntos
3. Si los botones de solo icono tienen etiqueta para lector
4. Si las imagenes tienen texto alternativo, y si las decorativas
   estan marcadas como decorativas
5. Si se puede navegar con teclado y se ve donde esta el foco
6. Si los formularios tienen etiquetas de verdad, no solo ejemplo
   dentro del campo
7. Si los errores se anuncian y se entienden

Dame la lista de problemas con el codigo corregido de cada uno.
```

### 8. Estados vacios, de error y sin conexion

```
Actua como un diseñador de producto revisando los estados de mi app.
Diseña lo que ve el usuario cuando no hay nada o algo sale mal.
Es lo que la IA casi siempre olvida.

Esto es lo que tengo:
[PEGA AQUI el codigo de tus listas, formularios y detalle]

Para cada pantalla diseña:
1. Vacio la primera vez: usuario nuevo sin datos, con una accion clara
2. Vacio por busqueda o filtro sin resultados, que es distinto
3. Error, con lenguaje humano y boton de reintentar, sin tecnicismos
4. Sin conexion
5. Accion en proceso: boton deshabilitado mostrando que trabaja

Escribe los textos exactos en español, cortos y sin culpar al usuario.
Muestrame el codigo de cada estado.
```

### 9. Detalles que delatan a la IA

```
Actua como un diseñador con ojo critico.
Encuentra los detalles que hacen que mi app se vea generada.

Esto es lo que tengo:
[PEGA AQUI el codigo de tus pantallas y todos los textos visibles]

Busca:
1. Textos genericos: "Bienvenido a tu dashboard", "Gestiona todo
   en un solo lugar", "Potencia tu productividad"
2. Emojis usados como iconos en la interfaz
3. Iconos mezclados de estilos distintos o que no explican su accion
4. Degradados y sombras exageradas sin motivo
5. Tarjetas dentro de tarjetas dentro de tarjetas
6. Bordes redondeados distintos en cada componente
7. Textos de relleno o datos de ejemplo olvidados
8. Botones que dicen "Enviar" o "Continuar" en vez de decir que hacen

Para cada hallazgo dime que cambiar y escribeme la version corregida,
con lenguaje de una persona hablando de su producto.
```

### 10. Revision final pantalla por pantalla

```
Actua como un diseñador haciendo la revision final antes de enseñar
esta app a usuarios reales.

Esto es lo que tengo:
[PEGA AQUI el codigo de una pantalla, o una captura si la puedes ver]

Evalua:
1. En un segundo, ¿se entiende que es y que puedo hacer aqui?
2. ¿Hay una sola accion principal clara?
3. ¿Colores, tamaños y espacios salen de un sistema o son sueltos?
4. ¿Que pasa mientras carga, si esta vacia y si falla?
5. ¿Funciona igual en un celular pequeño?
6. ¿Que texto sobra?

Respondeme asi:
- Nota del 1 al 10 y que la baja
- Los 3 cambios que mas mejorarian, en orden
- El codigo de esos 3 cambios

Se duro. Prefiero leerlo de ti que de mis usuarios.
```

### Preguntas frecuentes

#### Cuantos prompts uso por pantalla?

#### Uno a la vez, en orden: diagnostico, esqueleto, jerarquia, tokens, tipografia, contraste, toque y teclado, estados, detalles y revision final. Cuando una pantalla queda bien, usala como referencia para las demas.

#### Que es un design token en simple?

#### Es una decision de diseño con nombre. En vez de escribir `#7c3aed` en diez archivos, defines `color-acento` una vez y lo usas en todos. Si cambias de opinion, cambias un solo valor.

#### Que contraste minimo pide WCAG?

#### 4.5 a 1 para texto normal y 3 a 1 para texto grande e iconos, en nivel AA. Es el minimo que hace tu app usable con sol en la pantalla.

### Conclusiones

#### El diseño no se arregla en una pasada. Aplica estos 10 prompts de diseño UI en una pantalla, dejala bien y usala como referencia para el resto. Asi toda tu app termina pareciendose entre si, que es justo lo que le falta a las apps hechas con IA.
