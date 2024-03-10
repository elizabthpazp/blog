import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer"; 
import EmailPlantilla from "../../components/EmailPlantilla";
import Header from "../../components/Header"; 
import PostPreview from "../../components/PostPreview"; 
import SquigglyLines from "../../components/SquigglyLines";
import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'
import { links } from '../../links-web'    
import getPostMetaData from "../../getPostMetadata";  
import Search from "../../components/Search";
import dynamic from 'next/dynamic'
import getDate from "../../utils/getDate";

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
 
 if(lang == 'es')
  postMetadata.sort((a, b) => getDate(b.date) - getDate(a.date));
 else
 postMetadata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const postPreviews = postMetadata.map((post) => ( 
    <PostPreview key={post.slug} {...post} /> 
  ));
 
  let originalList = getPostMetaData(lang, false);  

  const NoSSR = dynamic(() => import('../../components/EmailPlantilla'), { ssr: false })

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
          href={links.tiktok}
          target="_blank"
          rel="noreferrer"
          className="border flex blog-animation border-gray-700 rounded-xl mt-14 p-3 light:text-gray-500 dark:text-gray-400 text-md mb-5 duration-300 ease-in-out"
        >
          {dictionary.request}{" "} 
          &nbsp;
          <svg 
            className="h-6 w-6 fill-gray-500 group-hover:fill-gray-300"
            fill="gray"
            width="500px"
            height="500px"
            viewBox="0 0 24 24"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg> 
        </a>

      <EmailPlantilla title={dictionary.newsletter} description={dictionary.newsDescription} btnSubscribe={dictionary.btnSubscribe} error={dictionary.error} thanks={dictionary.thanks} incorrectEmail={dictionary.incorrectEmail} thanksShort={dictionary.thanksShort} />
      
       <div>
          <h3 className="mx-auto light:text-gray-800 mb-10 mt-14 dark:text-white max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800">
            {dictionary.posts}
          </h3>

          {postPreviews}
        </div>

        <a
          href={links.web}
          target="_blank"
          rel="noreferrer"
          className="border flex blog-animation border-gray-700 rounded-xl mt-14 p-3 light:text-gray-500 dark:text-gray-400 text-md mb-5 duration-300 ease-in-out"
        >
          {dictionary.about}{" "} 
          
          👩🏻‍💻💜
        </a>
      
      </main> 
 
      <Footer copy={dictionary.copy} />
    </div>
  );
}
