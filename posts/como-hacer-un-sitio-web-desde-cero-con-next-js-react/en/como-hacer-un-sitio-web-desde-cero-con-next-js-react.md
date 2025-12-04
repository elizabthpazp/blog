---
title: Web Development
subtitle: Building your Website from Scratch with Next.js. A React-Powered Development Journey
description: Developing a website from scratch is an exciting challenge that combines the creativity of design with the logic of development. With Next.js, a powerful web development platform based on React, you have at your disposal all the necessary tools to build a dynamic, fast and highly functional website. In this article, we will explore the exciting process of developing a website from scratch with Next.js.
date: December 28, 2023
image: ./next-desde-cero(1).jpg
language: "js"
---

# Building your Website from Scratch with Next.js: A Development Journey
##Powered by React

December 28, 2023

![web development](./next-desde-cero(1).jpg)
 
#### Developing a website from scratch is an exciting challenge that combines the creativity of design with the logic of development. With Next.js, a powerful web development platform based on React, you have at your disposal all the necessary tools to build a dynamic, fast and highly functional website. In this article, we will explore the exciting process of developing a website from scratch with Next.js.

### Getting started with Next.js: Basics

#### Next.js is a React framework that makes it easy to build modern, performance-optimized web applications. Its ability to render on both the server and client sides, along with its dynamic routing features, make it an excellent choice for web projects of any scale.

### Initial setup

#### To get started, you will need to have Node.js installed on your system. Once it's ready, you can initialize a new Next.js project using the following command:

    npx create-next-app project-name


#### This will quickly set up the initial structure of your project, including necessary dependencies and a concise folder structure.

#### Here <your-project-name> is the name of the folder that will host our project files, so you can give it the name of your preference.

#### After the installation is complete, we can start the development server by running the following command:

    cd <project-name>  
    npm run dev 

#### If you visit localhost:3000 you will be able to see your new Next.js application live.

#### Then we open the package.json file and add the following scripts:

    "scripts": { 
       "dev": "next dev", 
       "build": "next build", 
       "start": "next start" 
    } `

#### You can also use Next.js by manually installing the packages: next, react and react-dom

* dev starts Next.js in development mode.
* start starts Next.js in production mode.
* build builds your Next.js application for production.

![web development](./next-desde-cero(2).jpg)

### Pages and Routes

#### One of the peculiarities of Next.js is that it is built around the concept of pages.

#### A page is a React component exported from the pages folder.

#### Pages are associated with a path based on the file name. For example pages/perfil.js will result in the path /perfil.

    export default function Perfil() { 
        return <div>Welcome!</div>; 
    }

#### Try the above code by placing it in (pages/profile.js) on your own and visit localhost:3000/profile to see the results.

### Index Routes
#### Files named index point to the root of the directory that contains them.

    pages/index.js → /
     pages/blog/index.js → /blog

### Nested Routes
#### Suppose we want to access the following path: /blog/post/:id
#### We will need to nest the folders as follows:

    |- pages
     |- index.js
      |- blog
       |- post
        |- [id].js #id dinámico 
                   para cada post

### Pages with Dynamic Routes
#### We can also use dynamic paths by adding square brackets to the file name. For example, if we create a file called pages/post/[id].js we can access it in the routes post/1, post/2, and so on.

`import {useRouter} from "next/router"`

    export default function Post(){
        const router=useRouter();
        const {id}=router.query;

     return <p>Post:{id}</p>;
    }

#### In pages/post/[id].js As you can see, in the previous code we use the Next.js useRouter hook to access the router object, said object contains very useful properties, the dynamic parts of each route are stored in router.query.

### CSS in Next.js
#### There are many ways to style your application in Next.js, you can import style sheet files directly thanks to CSS Modules support. To do this, the file must be named as follows: [name].module.css.

#### CSS Modules maintain local scope by automatically creating unique classes, allowing you to use the same class names in different files without requiring You don't have to worry about collisions.

#### For example, to create a reusable button component, we first create components/Button.module.css with the following content:

`.d { color: white; }`
 
#### And a components/Button.js file where you can import and use the CSS module created before.

`import style from "./B.module.css"`

    export default function B(){
        return(
          <button className={style.d}>
           X
          </button>
        );
    }`

#### The danger class is a property of the imported style object. That's how easy it is to use CSS Modules in Next.js, remember that we also have more style options at our disposal, such as Sass, Less or CSS in JavaScript.

### SSG vs SSR
#### Pre-rendered
#### Next.js pre-renders each page by default. Generating the HTML in advance instead of leaving all the work to the client's JavaScript. This results in significant performance and SEO improvements.

#### Each generated HTML is associated with a minimum of JavaScript code required for that page. When a page is loaded by the browser, its JavaScript code is executed and makes the page fully interactive. This process is called hydration.

#### - Types of Pre-rendering
#### There are two forms of pre-rendering in Next.js: Static Site Generation and Server-side Rendering. The main difference lies in when the HTML for the page is generated.

#### * SSG (Static Site Generation): The HTML is generated before each request, as when creating the build.
#### * SSR (Server-side Rendering): The HTML is generated on the server during each request.


### Component Design and Development

#### User Interface (UI) Design: Interface design is a crucial part of any web project. With Next.js, you can use reusable components to build a robust and aesthetically appealing user interface. From navigation components to custom design elements, Next.js gives you the flexibility to create an engaging experience for users.

#### Feature Development: The magic of Next.js lies in its ability to incorporate the power of React into your project. You can develop dynamic functionality such as real-time user interactions, asynchronous data loading, and state updating efficiently thanks to the component-based nature of React.

![web development](./next-desde-cero(3).jpg)


### Project Structure and Organization

#### Next.js encourages a clear project structure that promotes modularity and easy maintainability. You can divide your project into pages, components, styles, and business logic in a consistent way, making it easier to manage as your project grows in complexity.

### Deployment and Optimization

#### Once you've developed your website, you're ready to take it to the live web. With Next.js, you have the option to deploy your application on a variety of platforms, whether through a custom Node.js server, cloud hosting services, or Next.js-specific deployment platforms.

#### Performance Optimization: Next.js offers various tools and techniques to optimize the performance of your website, including static generation, data preloading, and image optimization. By implementing these practices, you can ensure that your website offers a fast and responsive experience to visitors.

![web development](./next-desde-cero(4).jpg)

### The Excitement of Creating with Next.js

#### Developing a website from scratch with Next.js is an exciting opportunity to explore the capabilities of React in an environment that favors efficiency and scalability. From its powerful architecture to its versatile set of tools, Next.js offers a robust platform to bring your ideas to life and turn them into a stunning digital reality.

#### Go ahead and start your development journey with Next.js! Explore the endless possibilities this platform has to offer and discover the thrill of building a website from scratch in a world powered by React.