---
title: Web Development
subtitle: Best ways to center elements in CSS
description: If you're a web developer, you've probably faced the challenge of centering elements in CSS. Nowadays, centering elements both horizontally and vertically is no longer a difficult task.
date: March 5, 2024
image: ./css1.png
language: "css"
---

![css](./css.png)

# Best ways to center

## elements in CSS

March 5, 2024

### x

#### If you're a web developer, chances are you've faced the challenge of centering elements in CSS on more than one occasion. Over the years, we've seen a variety of hacks and clever solutions to achieve this, but these days, **centering** elements both **horizontally** and **vertically** is no longer a daunting task. In this article, we'll explore some of the best ways to achieve perfect centering on both axes with CSS

### 1. Centering with Grid and place-content

#### Using **grid** together with the **place-content** property makes centering elements on both axes a simple process. It's especially effective for larger layouts, although it's important to note that contained elements will take on the width of the widest element

     .container {
       display: grid;
       place-content: center;
     }

### 2. Flex and auto margin

#### For smaller elements, like icons, you can use **flex** along with **margin: auto** to center them. Although it is easy to remember and works well in some situations, caution should be used when using asterisked selectors, and it may not be the best choice when working with overflows

     .container {
      display: flex;
     }

     .container > * {
      margin: self;
     }

### 3. Centering with Absolute Positions

#### The **absolute positions** technique has stood the test of time and is ideal for elements like modals that need to overlap and stay visible. However, this method requires a **relative** container and can get complicated when using multiple centered elements. (This hack must be applied directly to the element you want to focus on and not the container)

     .element {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
     }

### 4. The Definitive Solution 💜

#### The most correct and recommended solution is to use **flex** together with **align-items** and **justify-content** set to **center**. This provides perfect centering both horizontally and vertically, being a robust solution without the disadvantages of other techniques

#### **align-items**: defines the behavior of the elements across the axis opposite to the main one (if the **flex-direction** is **column**, then it would be the rows)

#### **justify-content**: defines the alignment and distribution of the elements on the main axis (if the **flex-direction** is **column**, then it would be the columns)

     .container {
       display: flex;
       justify-content: center;
       align-items: center;
     }

### Conclusions 💜

#### The variety of methods for centering elements in CSS can be overwhelming, but choosing the right technique depends on the context and specific needs. Of course my favorite is the last one. While **grid** and **flex** solutions are highly effective, absolute positions may have their place in particular situations. I hope these options give you the clarity you need to achieve perfect centering in your CSS projects! ✨
