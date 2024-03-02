---
title: Desarrollo Web
subtitle: Las mejores formas de centrar elementos en CSS
description: Si eres un desarrollador web, es probable que te hayas enfrentado al desafío de centrar elementos en CSS. Actualmente, centrar elementos tanto horizontal como verticalmente ya no es una tarea ardua.  
date: 5 marzo 2024
image: ./css1.png
---

![css](./css.png)

# Las mejores formas de centrar
## elementos en CSS

5 marzo 2024

#### Si eres un desarrollador web, es probable que te hayas enfrentado al desafío de centrar elementos en CSS en más de una ocasión. A lo largo de los años, hemos visto una variedad de hacks y soluciones ingeniosas para lograrlo, pero en la actualidad, **centrar** elementos tanto **horizontal** como **verticalmente** ya no es una tarea ardua. En este artículo, exploraremos algunas de las mejores formas de lograr el centrado perfecto en los dos ejes con CSS.

### 1. Centrado con Grid y place-content:

#### El uso de **grid** junto con la propiedad **place-content** hace que centrar elementos en ambos ejes sea un proceso sencillo. Es especialmente efectivo para diseños más grandes, aunque es importante tener en cuenta que los elementos contenidos adoptarán la anchura del elemento más ancho.

    .container {
      display: grid;
      place-content: center;
    }

### 2. Flex y margin auto:

#### Para elementos más pequeños, como iconos, puedes emplear **flex** junto con **margin: auto** para centrarlos. Aunque es fácil de recordar y funciona bien en algunas situaciones, se debe tener precaución al usar selectores con asterisco, y puede no ser la mejor opción cuando se trabaja con desbordamientos.

    .container {
     display: flex;
    }

    .container > * {
     margin: auto;
    }
### 3. Centrado con Posiciones Absolutas:

#### La técnica de **posiciones absolutas** ha resistido la prueba del tiempo y es ideal para elementos como modales que deben superponerse y mantenerse visibles. Sin embargo, este método requiere un contenedor **relativo** y puede volverse complicado cuando se utilizan múltiples elementos centrados. (Este hack se debe aplicar directamente sobre el elemento que se quiera centrar y no el contenedor)

    .element {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    } 

### 4. La Solución Definitiva 💜: 

#### La solución más correcta y recomendada es usar **flex** junto con **align-items** y **justify-content** establecidos en **center**. Esto proporciona un centrado perfecto tanto horizontal como vertical, siendo una solución robusta y sin las desventajas de otras técnicas.

#### **align-items**: define el comportamiento de los elementos a través del eje contrario al principal (si el **flex-direction** es **column**, entonces serían las filas).

#### **justify-content**: define el alíneamiento y distribución de los elementos en el eje principal (si el **flex-direction** es **column**, entonces serían las columnas).

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

### Conclusiones 💜

#### La variedad de métodos para centrar elementos en CSS puede ser abrumadora, pero la elección de la técnica adecuada depende del contexto y las necesidades específicas. Desde luego mi favorita es la última. Mientras que las soluciones con **grid** y **flex** son altamente efectivas, las posiciones absolutas pueden tener su lugar en situaciones particulares. ¡Espero que estas opciones te brinden la claridad necesaria para lograr el centrado perfecto en tus proyectos con CSS!. ✨