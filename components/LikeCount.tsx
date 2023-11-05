"use client" 
import { useState } from "react"; 
import { links } from "../links-web";  

export default function LikeCount({ count, title }: {count: any, title:string})
{ 
  let [count2, setCount] = useState(count); 
  let insertLike=async() =>{ 
    setCount(count2++) 
      const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/post?id=${title}&count=${count2}`, {
        method: 'POST', mode: "cors", headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Access-Control-Allow-Origin:http://localhost:3000', 
      },next: { tags: [title, count2] } })
      const data = await res.json() 
      console.log(data) 
  }

  return ( 
      <div className="flex cursor-pointer" onClick={() => insertLike()}> 
      <img
          alt="like"
          title="like"
          src={links.iconLike}
          className="forcedImage cursor-pointer animate-bounce pt-1 click:animate-ping"
          width={30}
          height={30} 
        /> 
        <p className="ml-2">{count2}</p>
      </div>
    )
}
 
