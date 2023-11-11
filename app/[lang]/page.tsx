import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header"; 
import PostPreview from "../../components/PostPreview"; 
import SquigglyLines from "../../components/SquigglyLines";
import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'
import { links } from '../../links-web'    
import getPostMetaData from "../../getPostMetadata";  
import Search from "../../components/Search";
 
export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: any };
}) {
  let ogimage = links.logo, sitename = links.username;
  const dictionary = await getDictionary(lang) 
  let titleMeta = sitename + dictionary.metaTitle, descriptionMeta = dictionary.title+' '+dictionary.title1+' '+dictionary.title2 + ' | ' + dictionary.metaDescription;
  return {
    title: titleMeta,
    description: descriptionMeta,
    icons: {
      icon: links.icon,
    },
    canonical: links.domain,
    amphtml: links.domain,
    keywords: 'blog, desarrollo web, marketing digital, elizabthpazp, seo, web, programación, curso, web development, frontend, developer, desarrollador',
    openGraph: {
    //  canonical: links.domain,
    //  amphtml: links.domain,
     images: [ogimage],
     title: titleMeta,
     description: descriptionMeta,
     url: links.domain,
     siteName: sitename,
     locale: lang == 'en' ? "en_US" : "es_ES",
     type: "website",
     link: {
      canonical: links.domain +"/"+slug, 
      amphtml: links.domain +"/"+slug,
     }  
    },
    twitter: { 
     card: "summary_large_image",
     images: [ogimage],
     title: titleMeta,
     description: descriptionMeta,
    },
    link: {
      canonical: links.domain +"/"+slug, 
      amphtml: links.domain +"/"+slug,
     }  
  };
}

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang) 
  let postMetadata = getPostMetaData(lang, false); 

  postMetadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const postPreviews = postMetadata.map((post) => ( 
    <PostPreview key={post.slug} {...post} /> 
  ));
 
  let originalList = getPostMetaData(lang, false);  

  return (
    <div className="max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header actual={lang} />
   
      <Search list={originalList} failedText={dictionary.notFound} lang={lang} title={dictionary.search}/> 
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-8 mt-8 background-gradient mb-10">
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
          className="bg-violet-600 blog-animation rounded-2xl text-white font-medium p-3 sm:mt-10 mt-8 hover:bg-violet-500"
          href="/desarrollo-web-frontend"
        >
          {dictionary.cta}
        </Link> 

        <a
          href={links.telegram}
          target="_blank"
          rel="noreferrer"
          className="border blog-animation border-gray-700 rounded-xl mt-14 p-3 light:text-gray-500 dark:text-gray-400 text-sm mb-5 duration-300 ease-in-out"
        >
          {dictionary.request}{" "}
          <span className="text-violet-600">{dictionary.here}</span>
        </a>

        <div>
          <h3 className="mx-auto light:text-gray-800 mb-10 mt-14 dark:text-white max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800">
            {dictionary.posts}
          </h3>

          {postPreviews}
        </div>
      </main> 
      <Footer copy={dictionary.copy} />
    </div>
  );
}
