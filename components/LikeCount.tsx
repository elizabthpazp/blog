"use client"  
import { useEffect, useState } from "react"; 
import { links } from "../links-web";  
import { getLikesPage } from "../get-likes-post";

export default function LikeCount({ slug, title, animation }: {slug: any, title:string, animation: boolean})
{  
  let [count2, setCount] = useState(0); 
  let [isFirst, setFirst] = useState(false);  
  useEffect( () => {
      (async()=>{
        const count = await getLikesPage(slug);
        setFirst(count == undefined || count == 0) 
        setCount(count);
      })() 
  }, []) 
   
  let insertLike=() =>{   
    setCount(count2++) 
   
    fetch(`https://blog-elizabthpazp.vercel.app/api/post?id=${title}&count=${count2}&first=${isFirst}`, {
        cache: 'no-cache',
        method: 'POST',
        mode: "cors",
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      } }) 
  }
 
  return ( 
      <div className={animation?"flex cursor-pointer absolute mr-btn pt-2 pr-2 pl-2 border border-2 light:border-gray-300 dark:border-gray-800 hover:border-violet-500 shadow-xl": "flex cursor-pointer pt-2 pr-2 pl-2"} onClick={() => insertLike()} style={{borderRadius:'20px'}}> 
      <img
          alt="like"
          title="like"
          src={links.iconLike}
          className={animation?'forcedImage relative pt-1 click:animate-ping animate-bounce':"forcedImage pb-1"}
          width={30}
          height={30} 
        /> 
        <p className="ml-2 relative">{count2}</p>
      </div>
    )
}
 
