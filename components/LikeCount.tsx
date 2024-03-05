"use client"  
import { useState } from "react"; 
import { links } from "../links-web";  

export default function LikeCount({ count, title, animation }: {count: any, title:string, animation: boolean})
{ 
  let [count2, setCount] = useState(count == undefined ? 0 : count); 
  let insertLike=async() =>{   
    setCount(count2++) 
    
      const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/post?id=${title}&count=${count2}&first=${count == undefined ? true : false}`, {
       // cache: 'force-cache' || 'no-cache',
        method: 'POST',
        mode: "cors",
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      } })
      const data = await res.json() 
      console.log(data) 
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
 
