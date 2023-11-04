"use client"
import Link from "next/link";
import getPostMetaData from "../getPostMetadata";
import { PostMetadata } from "../PostMetadata";
import { useState } from "react";
import Image from "next/image";
import { links } from "../links-web";

const LikeCount = () => {
  let [count, setCount] = useState(0); 

  return ( 
      <div className="flex cursor-pointer" onClick={() => setCount(count++)}>
      <img
          alt="like"
          title="like"
          src={links.iconLike}
          className="forcedImage cursor-pointer animate-bounce pt-1 click:animate-ping"
          width={30}
          height={30} 
        /> 
        <p className="ml-2">{count}</p>
      </div>
  );
};

export default LikeCount;
