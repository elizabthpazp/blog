'use client' 
import Link from "next/link";
import getPostMetaData from "../getPostMetadata";
import { PostMetadata } from "../PostMetadata";
import LikesList from "./LikesList";
 
const Postpreview = (props: PostMetadata) => {  
  return ( 
      <Link className="transition-opacity blog-animation transition-all duration-200 ease-in duration-700 opacity-100 hover:opacity-70 text-left card-post border border-1 shadow-lg dark:border-gray-600 light:border-gray-300 mb-3 p-0" href={`/${props.slug}`} style={props.slug!=''? {display:'block', borderRadius:'30px'}: {display:'none', borderRadius:'30px'}} data-wow-delay="300">
        <img 
          className="mr-20 mt-6 ml-4 absolute"
          alt={props.title}
          title={props.title}
          src={props.image}
          width={90}
          height={90}
        />
        <div className="containerCard relative ml-20 pl-10 pb-4 pr-4">
          <h2 className="mx-auto light:text-gray-800 mb-1 mt-4 dark:text-white max-w-lg font-display text-xl font-bold tracking-normal text-gray-800">
            {props.subtitle}
          </h2>
          <p className="mx-auto light:text-violet-800 mb-2 dark:text-violet-600 max-w-lg font-display text-1xl font-bold tracking-normal text-violet-600">
            {props.title}
          </p>
          <p style={{opacity: '.7'}}>{props.date}</p>

         
          {/* {/* @ts-expect-error */}
         {/*    <LikesList slug={props.slug}></LikesList> */}
          
        </div>
      </Link> 
  );
};

export default Postpreview;
