"use client"
import Link from "next/link";
import getPostMetaData from "../getPostMetadata";
import { PostMetadata } from "../PostMetadata";
import { useState } from "react";
import Image from "next/image";
import { links } from "../links-web"; 
import { insertLikeSql, updateLikeSql } from "../get-likes";

export default function LikeCount({ count, title }: {count: any, title:string})
{ 
  let [count2, setCount] = useState(count); 
  let insertLike=async() =>{ 
    setCount(count2++) 
      const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/post?id=${title}&count=${count2}`, {
        method: 'POST', next: { tags: [title, count2] } })
      const data = await res.json() 
      console.log(data) 
  }

  return ( 
      <button className="flex cursor-pointer border light:border-gray-300 dark:border-gray-800 hover:border-violet-500 shadow-xl border-2 pt-2 pr-2 pl-2" onClick={() => insertLike()} style={{borderRadius:'20px'}} name="like" title="like"> 
      <img
          alt="like"
          title="like"
          src={links.iconLike}
          className="forcedImage cursor-pointer animate-bounce pt-1 click:animate-ping"
          width={30}
          height={30} 
        /> 
        <p className="ml-2 cursor-pointer">{count2}</p>
      </button>
    )
}
 
