import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header"; 
import SquigglyLines from "../../components/SquigglyLines";
import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'
import { links } from '../../links-web'  
import fs from 'fs'; 
import matter from "gray-matter";
import { PostMetadata } from "../../PostMetadata";

const getPostMetaData=(lang: Locale): PostMetadata[]=>{ 
  const folder = 'posts/'  
  const files = fs.readdirSync(folder); 

  const posts = files.map((filename)=>{ 
    const fileContents = fs.readFileSync(`posts/${filename}/${lang}/${filename}.md`, 'utf8'); 
    const matterResult = matter(fileContents);
    return{
      title: matterResult.data.title,
      description: matterResult.data.title,
      slug: filename 
    }
  })  
  return posts;
}

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang) 
  const postMetadata = getPostMetaData(lang);
  const postPreviews = postMetadata.map((post) => (
     <div> 
      <Link href={`/${post.slug}`}> 
      <h2>{post.title}</h2>
      </Link>
     </div>
  ));

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header actual={lang} />
   
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient mb-10">
        <a
          href={links.telegram}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-xl py-2 px-3 light:text-gray-500 dark:text-gray-400 text-sm mb-5 transition duration-300 ease-in-out"
        >
          {dictionary.request}{" "}
          <span className="text-violet-600">{dictionary.here}</span>
        </a>
        <h1 className="mx-auto light:text-gray-800 dark:text-white max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800 sm:text-7xl">
        {dictionary.title} {" "}
          <span className="relative whitespace-nowrap text-violet-600">
            <SquigglyLines />
            <span className="relative">{dictionary.title1}</span>
          </span>{" "}
          {dictionary.title2}
        </h1>
        <h2 className="mx-auto mt-12 max-w-3xl text-lg light:text-gray-600 dark:text-gray-500 leading-7">
        {dictionary.subtitle}
        </h2>
        <Link
          className="bg-violet-600 rounded-2xl text-white font-medium px-3 py-3 sm:mt-10 mt-8 hover:bg-violet-500 transition"
          href="/desarrollo-web-frontend"
        >
          {dictionary.cta}
        </Link> 
        <div>
          Ultimos Posts

          {postPreviews}
        </div>
      </main> 
      <Footer copy={dictionary.copy} />
    </div>
  );
}
