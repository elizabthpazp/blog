"use client"
import Link from 'next/link'
import { i18n, Locale } from '../i18n-config'
import Image from "next/image";
import { links } from '../links-web' 
import "../styles/search.css"
import { useEffect, useState } from 'react';
import { PostMetadata } from '../PostMetadata';
import getPostMetaData from "../getPostMetadata"; 
import PostPreview from "../components/PostPreview"; 
import {useTheme} from "next-themes"; 

const getPostContent = (postMetadata: PostMetadata[], title: string) => {   
 
  postMetadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  postMetadata = postMetadata.filter((item) =>
    item.subtitle.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase().includes(title.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()) 
  );    
  // const postPreviews = postMetadata.map((post) => ( 
  //   <PostPreview key={post.slug} {...post} /> 
  // )); 
  // return postPreviews;
  return postMetadata;
}; 

export default function Search({ 
  list,  
  lang,  
  failedText,
  title,  
}: {  
 list: PostMetadata[],  
 lang: Locale ,  
 failedText: string,
 title: string,  
}) {  
  let listResult = list;

  let postPreviews= listResult.map((post) => ( 
    <PostPreview key={post.slug} {...post} /> 
  )); 
  
  let [input, setInput] = useState(''); 
  let filteredList = () =>{ 
    listResult = getPostContent(listResult, input)
    postPreviews = listResult.map((post) => ( 
      <PostPreview key={post.slug} {...post} /> 
    )); 
    console.log(listResult) 
  }
  const changeCloseSearch = () => {   
    setInput(input = '')
    filteredList();
  };
  const { theme } = useTheme()
  const [isServer, setIsServer] = useState(true) 
 
  
  return (  
    <div>
  <div className="container blog-animation mt-6 items-center text-center justify-center containerSearch">
    <div className="row-auto flex items-center text-center justify-center">
      <input type="text" value={input} onChange={e => setInput(input = e.target.value)} className="w-full max-w-xs justify-center shadow-xl border-solid input mb-2 text-gray-800 light:text-gray-800 dark:text-white" placeholder={title} onKeyUp={() => filteredList()} style={theme=='dark'?{background:"transparent url('/icons/search-dark.png') no-repeat 15px center", backgroundSize:'15px 15px'}:{}} />
      <div style={input!='' ? {display:'block', placeItems:'center',borderRadius:'22px',height:'48px',maxWidth:'48px',width:'48px',cursor:'pointer',marginLeft:'2px'}: {display:'none'}} onClick={() => changeCloseSearch()} className="columns-1 shadow-xl border-solid border-2 border-red-500 grid">
        <div className="text-red-500 pt-2 pl-4 font-bold font-large">X</div>
      </div>   
      </div> 
      <div style={input!=''&&listResult?.length==0 ? {display:'block'}: {display:'none'}}>
       <div className="row-auto flex item p-4 pb-3 pt-3 shadow-xl w-auto error text-gray-800 light:text-gray-800 dark:text-white border-solid border-2 border-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="rgb(239 68 68)" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-4.99-5.58-5.34A6.492 6.492 0 0 0 3.03 9h2.02c.24-2.12 1.92-3.8 4.06-3.98C11.65 4.8 14 6.95 14 9.5c0 2.49-2.01 4.5-4.5 4.5c-.17 0-.33-.03-.5-.05v2.02l.01.01c1.8.13 3.47-.47 4.72-1.55l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14z"/><path fill="rgb(239 68 68)" d="M6.12 11.17L4 13.29l-2.12-2.12c-.2-.2-.51-.2-.71 0c-.2.2-.2.51 0 .71L3.29 14l-2.12 2.12c-.2.2-.2.51 0 .71c.2.2.51.2.71 0L4 14.71l2.12 2.12c.2.2.51.2.71 0c.2-.2.2-.51 0-.71L4.71 14l2.12-2.12c.2-.2.2-.51 0-.71a.513.513 0 0 0-.71 0z"/></svg>
        <p> {failedText} </p>
       </div>
      </div> 
  </div>
  <div style={input!=''&&listResult?.length!=0&&postPreviews ? {display:'block'}: {display:'none'}}>
   <div className="border-4 border-gray-500 border-solid absolute light:bg-white bg-white dark:bg-[#17181C] z-50 overflow-y-scroll max-h-96" style={{borderRadius:'25px', zoom:'70%'}}>
    <div className='pt-0 mt-0 pr-6 pl-6 pb-8 divide-y'>{postPreviews}</div> 
   </div>
  </div>
</div>
  );
}