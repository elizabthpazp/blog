---
title: Desarrollo Web
subtitle: Construyendo tu Sitio Web desde Cero con Next.js. Un Viaje de Desarrollo Impulsado por React
description: Desarrollar un sitio web desde cero es un emocionante desafío que combina la creatividad del diseño con la lógica del desarrollo. Con Next.js, una poderosa plataforma de desarrollo web basada en React, tienes a tu disposición todas las herramientas necesarias para construir una web dinámica, rápida y altamente funcional. En este artículo, exploraremos el emocionante proceso de desarrollo de una web desde cero con Next.js.
date: 28 diciembre 2023
image: ./next-desde-cero(1).jpg
language: "js"
---

# Construyendo tu Sitio Web desde Cero con Next.js: Un Viaje de Desarrollo
## Impulsado por React

28 diciembre 2023

![desarrollo web](./next-desde-cero(1).jpg)
 
#### Desarrollar un sitio web desde cero es un emocionante desafío que combina la creatividad del diseño con la lógica del desarrollo. Con Next.js, una poderosa plataforma de desarrollo web basada en React, tienes a tu disposición todas las herramientas necesarias para construir una web dinámica, rápida y altamente funcional. En este artículo, exploraremos el emocionante proceso de desarrollo de una web desde cero con Next.js.

### Comenzando con Next.js: Fundamentos  

#### Next.js es un framework de React que facilita la creación de aplicaciones web modernas y optimizadas para el rendimiento. Su capacidad para renderizar tanto en el lado del servidor como en el cliente, junto con sus características de enrutamiento dinámico, lo convierten en una excelente elección para proyectos web de cualquier escala.

### Configuración Inicial

#### Para comenzar, necesitarás tener Node.js instalado en tu sistema. Una vez que esté listo, puedes inicializar un nuevo proyecto de Next.js utilizando el siguiente comando:

    npx create-next-app nombre-proyecto ```


#### Esto configurará rápidamente la estructura inicial de tu proyecto, incluyendo las dependencias necesarias y una estructura de carpetas concisa.

#### Aquí <nombre-de-tu-proyecto> es el nombre que tendrá la carpeta que alojará los archivos de nuestro proyecto, por lo que puedes darle el nombre de tu preferencia.

#### Luego de que se complete la instalación, podemos iniciar el servidor de desarrollo ejecutando el siguiente comando:

    cd <nombre-proyecto>  
    npm run dev 

#### Si visitas localhost:3000 podrás ver en vivo tu nueva aplicación de Next.js.

#### Luego abrimos el archivo package.json y añadimos los siguientes scripts:

    "scripts": { 
       "dev": "next dev", 
       "build": "next build", 
       "start": "next start" 
    } `

#### También puedes utilizar Next.js instalando manualmente los paquetes: next, react y react-dom

* dev inicia Next.js en modo desarrollo.
* start inicia Next.js en modo producción.
* build construye tu aplicación de Next.js para producción.

![desarrollo web](./next-desde-cero(2).jpg)

### Páginas y Rutas

#### Una de las particularidades de Next.js es que esta construido alrededor del concepto de páginas.

#### Una página es un componente de React exportado desde la carpeta pages.

#### Las páginas están asociadas con una ruta basada en el nombre del archivo. Por ejemplo pages/perfil.js resultará en la ruta /perfil.

    export default function Perfil() { 
        return <div>¡Bienvenido!</div>; 
    }

#### Prueba el código anterior ubicándolo en (pages/perfil.js) por tu cuenta y visita localhost:3000/perfil para ver los resultados.

### Rutas Index
#### Los archivos con nombre index dirigen hacia la raíz del directorio que lo contiene.

    pages/index.js → /
     pages/blog/index.js → /blog

### Rutas Anidadas
#### Supongamos que queremos acceder a la siguiente ruta: /blog/post/:id
#### Necesitaremos anidar las carpetas de la siguiente manera:

    |- pages
     |- index.js
      |- blog
       |- post
        |- [id].js #id dinámico 
                   para cada post

### Páginas con Rutas Dinámicas
#### También podemos utilizar rutas dinámicas si agregamos corchetes al nombre del archivo. Por ejemplo, si creamos un archivo llamado pages/post/[id].js podremos acceder a el en las rutas post/1, post/2, y así sucesivamente.

`import {useRouter} from "next/router"`

    export default function Post(){
        const router=useRouter();
        const {id}=router.query;

     return <p>Post:{id}</p>;
    }

#### En pages/post/[id].js Como puedes observar, en el código anterior utilizamos el hook useRouter de Next.js para acceder al objeto router, dicho objeto contiene propiedades muy útiles, las partes dinámicas de cada ruta se almacenan en router.query.

### CSS en Next.js
#### Existen muchas formas de darle estilo a tu aplicación en Next.js, puedes importar archivos de hojas de estilo directamente gracias a la compatibilidad con los Módulos de CSS. Para ello el archivo debe nombrarse de la siguiente manera: [nombre].module.css.

#### Los Módulos de CSS mantienen un ámbito local creando clases únicas automáticamente, por lo que te permite usar los mismos nombres de clases en diferentes archivos sin que tengas que preocuparte por colisiones.

#### Por ejemplo, para crear un componente botón reusable, primero creamos componentes/Boton.module.css con el siguiente contenido:

`.p { color: white; }`
 
#### Y un archivo componentes/Boton.js donde importar y usar el módulo CSS antes creado.

`import style from "./B.module.css"`

    export default function B(){
        return(
          <button className={style.p}>
           X
          </button>
        );
    }`

#### La clase peligro es una propiedad del objeto style importado. Así de fácil es usar los Módulos de CSS en Next.js, recuerda que también tenemos más opciones de estilo a nuestra disposición, tales como Sass, Less o CSS en JavaScript.

### SSG vs SSR
#### Pre-renderizado
#### Next.js pre-renderiza cada página por defecto. Generando el HTML por adelantado en lugar de dejarle todo el trabajo al JavaScript del cliente. Esto se traduce en importantes mejoras de rendimiento y SEO.

#### Cada HTML generado se asocia con un mínimo de código de JavaScript requerido para esa página. Cuando una página es cargada por el navegador, su código JavaScript se ejecuta y hace la página plenamente interactiva. Este proceso es llamado hidratación.

#### - Tipos de Pre-renderizado
#### Existen dos formas de pre-renderizado en Next.js: Static Site Generation y Server-side Rendering. La diferencia principal radica en cuando se genera el HTML para la página.

#### * SSG (Static Site Generation): El HTML se genera antes de cada petición, como al momento de crear la build.
#### * SSR (Server-side Rendering): El HTML se genera en el servidor durante cada petición.


### Diseño y Desarrollo de Componentes

#### Diseño de la Interfaz de Usuario (UI): El diseño de la interfaz es una parte crucial de cualquier proyecto web. Con Next.js, puedes utilizar componentes reutilizables para construir una interfaz de usuario robusta y estéticamente atractiva. Desde componentes de navegación hasta elementos de diseño personalizados, Next.js te brinda la flexibilidad para crear una experiencia atractiva para los usuarios.

#### Desarrollo de Funcionalidad: La magia de Next.js radica en su capacidad para incorporar el poder de React en tu proyecto. Puedes desarrollar funcionalidades dinámicas, como interacciones de usuario en tiempo real, carga de datos asíncrona y actualización de estado de manera eficiente gracias a la naturaleza basada en componentes de React.

![desarrollo web](./next-desde-cero(3).jpg)


### Estructura y Organización del Proyecto

#### Next.js fomenta una estructura de proyecto clara que promueve la modularidad y la fácil mantenibilidad. Puedes dividir tu proyecto en páginas, componentes, estilos y lógica de negocios de manera coherente, lo que facilita la gestión a medida que tu proyecto crece en complejidad.

### Despliegue y Optimización 

#### Una vez que hayas desarrollado tu sitio web, estás listo para llevarlo a la web en vivo. Con Next.js, tienes la opción de desplegar tu aplicación en una variedad de plataformas, ya sea a través de un servidor Node.js personalizado, servicios de alojamiento en la nube o plataformas de despliegue específicas para Next.js.

#### Optimización de Rendimiento: Next.js ofrece diversas herramientas y técnicas para optimizar el rendimiento de tu sitio web, incluyendo la generación estática, la precarga de datos y la optimización de imágenes. Al implementar estas prácticas, puedes asegurarte de que tu web ofrezca una experiencia rápida y receptiva a los visitantes.

![desarrollo web](./next-desde-cero(4).jpg)

### La Emoción de Crear con Next.js

#### Desarrollar un sitio web desde cero con Next.js es una oportunidad emocionante para explorar las capacidades de React en un entorno que favorece la eficiencia y la escalabilidad. Desde su poderosa arquitectura hasta su conjunto versátil de herramientas, Next.js ofrece una plataforma robusta para dar vida a tus ideas y convertirlas en una realidad digital impresionante.

#### ¡Sigue adelante y comienza tu viaje de desarrollo con Next.js! Explora las infinitas posibilidades que esta plataforma tiene para ofrecer y descubre la emoción de construir un sitio web desde cero en un mundo impulsado por React.