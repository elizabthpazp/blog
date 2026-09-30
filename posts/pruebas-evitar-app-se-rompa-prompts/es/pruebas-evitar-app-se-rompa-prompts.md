---
title: "Testing y QA"
subtitle: "Pruebas para que tu app no se rompa: unitarias, integracion y E2E con 8 prompts"
description: "Tu app se va a romper, la pregunta es si te enteras tu o tus usuarios. Que son pruebas unitarias, de integracion y E2E en simple, y 8 prompts para revisar las que tienes, crear las que faltan y que la IA no rompa lo que funciona."
date: "17 septiembre 2026"
image: "./pruebas-app-prompts.svg"
icon: "./pruebas-icon.svg"
language: "js"
---

![pruebas para que tu app no se rompa](./pruebas-app-prompts.svg)

# Pruebas: que tu app no se rompa
## Unitarias, integracion y E2E

17 septiembre 2026

#### Tu app se va a romper, la pregunta es si te enteras tu o tus usuarios. Que son pruebas unitarias, de integracion y E2E en simple, y 8 prompts para revisar las que tienes, crear las que faltan y que la IA no rompa lo que funciona.

### Por que probar cuando construyes con IA

#### Con IA hay un problema extra: cada vez que le pides un cambio, puede romper lo que ya funcionaba sin que nadie lo note. Las pruebas son lo que te avisa. No sustituyen abrir tu app y usarla como un usuario. Avisan cuando algo que ya funcionaba dejo de funcionar, que es justo lo que mas pasa construyendo con IA.

### Los 3 tipos de prueba, en simple

### 1. Unitarias o de componentes

#### Pruebas pequeñas y rapidas que revisan una pieza sola: una funcion, un calculo, un componente. Corren en segundos, asi que las corres todo el tiempo. Ejemplo: que la funcion del total del carrito sume bien con descuento y envio.

### 2. De integracion

#### Revisan que varias piezas funcionen juntas. Aqui aparecen los errores que no ves probando cada parte por separado. Ejemplo: que el boton de agregar actualice el contador y el producto aparezca en el carrito.

### 3. De principio a fin (E2E)

#### Simulan a un usuario real con todo conectado: interfaz, backend y base de datos. Ejemplo: entrar, añadir un producto, pagar y ver el recibo. Son las mas lentas y las que mas fallan sin motivo real, asi que se hacen pocas: solo los flujos que te dan dinero o que te hacen perder usuarios. Casi nadie las automatiza, y es lo que mas protege.

#### Regla simple: muchas unitarias, algunas de integracion, pocas E2E. Si solo vas a hacer una cosa hoy, automatiza el flujo principal de tu app de principio a fin.

### Como usar estos prompts

#### Corre un prompt a la vez dentro de tu proyecto, para que la IA lea tu codigo. Empieza por el primero, que te dice como estas hoy, y sigue en orden. No pidas 200 pruebas de golpe: empieza por el flujo que mas doleria si se rompe.

### 1. Mi app ya tiene pruebas

#### Antes de crear nada, averigua que tienes. Muchas apps hechas con IA traen pruebas de ejemplo que no prueban nada real.

```
Actua como un ingeniero de QA revisando un proyecto por primera vez.
Dime que pruebas tiene hoy mi app y que tan utiles son.

Esto es lo que tengo:
[PEGA AQUI tu listado de archivos y tu package.json, o abre este
prompt dentro de tu proyecto]

Revisa:
1. Que herramientas estan instaladas y si estan configuradas de verdad
2. Que archivos de prueba existen y de que tipo son
3. Si comprueban algo real o son ejemplos vacios
4. Que partes importantes no tienen ninguna prueba
5. Si se corren con un comando y si pasan

Respondeme asi:
- Estado actual: en una frase
- Que tengo: lista de lo existente y si sirve
- Los 5 huecos mas peligrosos, por lo que duele si se rompe
- Por donde empiezo: un solo siguiente paso

No escribas pruebas todavia, solo el diagnostico.
```

### 2. Que probar primero

#### No todo vale lo mismo. Si tu app cobra, lo primero es el flujo del dinero.

```
Actua como un ingeniero de QA protegiendo una app con poco tiempo.
Decide que se prueba primero en mi app.

Esto es lo que tengo:
[PEGA AQUI que hace tu app, quien la usa, como gana dinero y
cuales son sus pantallas principales]

Haz esto:
1. Lista mis flujos de usuario mas importantes
2. Para cada uno dime que pasa si se rompe: pierdo dinero,
   pierdo usuarios, pierdo datos o solo molesta
3. Ordenalos por riesgo real, no por lo facil de probar
4. Dime para cada uno que tipo le conviene: unitaria,
   integracion o E2E, y por que
5. Propon un plan corto: que probar esta semana y que espera

Responde en una tabla, y al final dime la primera prueba
que deberia escribir hoy.
```

### 3. Preparar el entorno de pruebas

#### Si nunca corriste una prueba, este paso te desbloquea.

```
Actua como un ingeniero de QA configurando pruebas desde cero.
Dejame listo para correr pruebas en mi proyecto.

Esto es lo que tengo:
[PEGA AQUI tu package.json y tu stack: Next.js, Expo, Vue,
Django, etc.]

Haz esto:
1. Recomiendame una herramienta para unitarias e integracion y
   otra para E2E, las que encajen con mi stack
2. Explica en una linea por que esas y no otras
3. Dame los comandos exactos de instalacion
4. Dame los archivos de configuracion listos para pegar
5. Dame los scripts para package.json
6. Escribe UNA prueba minima que pase, para confirmar que quedo bien

Explica como se que funciono y que error comun puede aparecer.
```

### 4. Pruebas unitarias o de componentes

```
Actua como un ingeniero de QA escribiendo pruebas unitarias.
Escribe pruebas pequeñas y rapidas para esta pieza de mi app.

Esto es lo que tengo:
[PEGA AQUI la funcion o el componente a probar]

Haz esto:
1. Lista que deberia hacer esta pieza, con casos raros: vacios,
   cero, negativos, textos largos, errores de red
2. Escribe las pruebas con la herramienta de mi proyecto
3. Cubre el caso normal, los raros y los de error
4. Usa nombres que expliquen el comportamiento esperado
5. Dime que NO estas probando aqui y por que

Al final dame el comando para correr solo estas pruebas.
No cambies la funcion: si encuentras un bug, dimelo aparte.
```

```javascript
// Ejemplo del estilo que deberia salir: Vitest, casos claros
import { describe, it, expect } from 'vitest';
import { calcTotal } from './cart';

describe('calcTotal', () => {
  it('suma productos con descuento y envio', () => {
    expect(calcTotal([{ price: 100, qty: 2 }], 0.1, 5)).toBe(185);
  });
  it('con carrito vacio devuelve solo el envio', () => {
    expect(calcTotal([], 0.1, 5)).toBe(5);
  });
});
```

### 5. Pruebas de integracion

```
Actua como un ingeniero de QA escribiendo pruebas de integracion.
Prueba que varias piezas de mi app funcionan juntas.

Esto es lo que tengo:
[PEGA AQUI el flujo y el codigo de las piezas: componentes,
estado, llamadas a la API]

Haz esto:
1. Explica que piezas participan y donde suelen romperse
2. Comprueba lo que ve el usuario, no los detalles internos
3. Simula las llamadas externas en vez de llamarlas de verdad
4. Incluye que pasa cuando la API falla o tarda
5. Evita pruebas que se rompan por cambiar una clase o un texto

Al final dime que parte sigue sin estar cubierta.
```

### 6. Pruebas de principio a fin (E2E)

#### La que casi nadie automatiza. Empieza por un solo flujo, el mas importante.

```
Actua como un ingeniero de QA escribiendo pruebas E2E.
Automatiza el recorrido completo de un usuario real.

Esto es lo que tengo:
[PEGA AQUI el flujo paso a paso: entrar, buscar, añadir al
carrito, pagar y ver el recibo. Con URLs, pantallas y login]

Haz esto:
1. Escribela con la herramienta E2E de mi proyecto, o recomienda
   una para mi stack con su configuracion
2. Cubre el camino feliz completo, de principio a fin
3. Comprueba lo que importa: confirmacion visible, pedido creado,
   total correcto
4. Usa selectores estables, no textos que cambian seguido
5. Explica como usar datos de prueba y dejar todo limpio
6. Dime como evitar que falle sin que haya un bug real

Importante: corre contra ambiente de pruebas, nunca produccion
ni datos reales. Dime como asegurarme de eso.
```

### 7. Que la IA no rompa lo que funciona

#### Este prompt convierte tus pruebas en una red de seguridad mientras construyes con IA. Pegalo como regla del proyecto.

```
De ahora en adelante, trabaja asi en este proyecto:

1. Antes de cambiar codigo, corre las pruebas y dime si pasan
2. Cuando añadas una funcion nueva, escribe tambien su prueba
3. Cuando arregles un bug, escribe primero una prueba que falle
   por ese bug, y luego arreglalo
4. Despues de cada cambio, vuelve a correr todas las pruebas
5. Si una prueba que pasaba ahora falla, PARA y dime que rompiste.
   No cambies la prueba para que pase

Confirma que entendiste y dime el estado de las pruebas ahora.
```

### 8. Correr las pruebas solas en cada cambio

```
Actua como un ingeniero de QA configurando integracion continua.
Haz que mis pruebas corran solas cada vez que suba cambios.

Esto es lo que tengo:
[PEGA AQUI tus scripts de pruebas y donde esta tu repo:
GitHub, GitLab, etc.]

Haz esto:
1. Dame el archivo de configuracion completo, listo para pegar
2. Que corra unitarias e integracion en cada push y pull request
3. Que las E2E corran tambien, o explica por que conviene aparte
4. Explica donde veo el resultado y que hacer cuando falla
5. Dime como manejar claves y variables sin exponerlas

Explicalo para alguien que nunca configuro esto.
```

### Preguntas frecuentes

#### Que herramienta uso para cada tipo?

#### Para unitarias e integracion, la que encaje con tu stack: Vitest o Jest en JavaScript, Pytest en Python. Para E2E, Playwright o Cypress. El prompt 3 te recomienda segun tu proyecto concreto.

#### Cuantas pruebas E2E escribo?

#### Pocas: solo los flujos que te dan dinero o que te hacen perder usuarios si se rompen. El resto se cubre con unitarias e integracion, que son rapidas y estables.

#### Las pruebas reemplazan probar a mano?

#### No. Nada reemplaza abrir tu app y usarla como un usuario. Las pruebas avisan cuando algo que funcionaba dejo de funcionar despues de un cambio.

### Conclusiones

#### Muchas unitarias, algunas de integracion, pocas E2E. Automatiza primero tu flujo principal de principio a fin, pon la regla del prompt 7 para que la IA no rompa nada, y deja el CI del prompt 8 corriendo solo. Asi cada cambio con IA queda protegido.
