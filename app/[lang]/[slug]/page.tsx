import fs from "fs";
import Markdown from "markdown-to-jsx"; 
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import RouteActualLink from "../../../components/RouteActualLink";
import { getDictionary } from "../../../get-dictionary";
import SquigglyLines from "../../../components/SquigglyLines";
import { Locale } from "../../../i18n-config";
import EmailPlantilla from "../../../components/EmailPlantilla";
import matter from "gray-matter";
import { PostMetadata, PreviewMetadata } from "../../../PostMetadata";
import getPostMetaData from "../../../getPostMetadata"; 
import Search from "../../../components/Search"; 
import LikeCount from "../../../components/LikeCount";
import { links } from "../../../links-web"; 
import PostPreview from "../../../components/PostPreview";  
import getDate from "../../../utils/getDate"; 
import dynamic from 'next/dynamic'
import { Children } from "react";

const CodeHighlight = dynamic(() => import("../../../components/CodeHighlight"), {
  ssr: false,
})
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({origin: true}))
app.use(express.json())

let titlePage: string, descriptionPage: string, languageProgramming:string;
export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: any };
}) {
  let sitename = links.username;
  const dictionary = await getDictionary(lang);
  return {
    //metadataBase: links.domain + "/" + slug,
    title: getPostMetaData2(slug, lang).subtitle,
    description: getPostMetaData2(slug, lang).description,
    icons: {
      icon: links.icon,
    },
    canonical: links.domain + "/" + slug,
    amphtml: links.domain + "/" + slug,
    keywords:
     getPostMetaData2(slug, lang).title +
      " ,blog, elizabthpazp, seo, web, programación, curso, frontend, developer, desarrollador, marketing digital",
    openGraph: {
      //canonical: links.domain + "/" + slug,
      //amphtml: links.domain + "/" + slug,
      images: [getPostMetaData2(slug, lang).image],
      title: getPostMetaData2(slug, lang).subtitle,
      description: getPostMetaData2(slug, lang).description,
      url: links.domain + "/" + slug,
      siteName: sitename,
      locale: lang == "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: [getPostMetaData2(slug, lang).image],
      title: getPostMetaData2(slug, lang).subtitle,
      description: getPostMetaData2(slug, lang).description, 
    },
    link: {
      canonical: links.domain + "/" + slug,
      amphtml: links.domain + "/" + slug,
    },
  };
}

export const generateStaticParams = async () => {
  const postMetadata = getPostMetaData("es", false);

  let list: PreviewMetadata[] = [];
  const posts = postMetadata.map((file) => {
    list.push({ slug: file.slug });
  });

  return list;
};

const getPostContent = (slug: string, lang: Locale) => {
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  return matterResult.content;
};

const getPostMetaData2 = (slug: string, lang: Locale): PostMetadata => {
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);

  const post: PostMetadata = {
    title: matterResult.data.title,
    subtitle: matterResult.data.subtitle,
    description: matterResult.data.description,
    slug: "",
    date: matterResult.data.date,
    image: matterResult.data.image,
    likes: matterResult.data.likes
  };
  titlePage = matterResult.data.subtitle;
  languageProgramming = matterResult.data.language;
  return post;
};

const getLikesPage = async (slug: any): Promise<any> => {
  const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/get?id=${slug}`, {
  //cache: 'force-cache' || 'no-cache',
  method: "GET",
  mode: "cors",
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  } })
  const data = await res.json()  
  return data?.result?.rows[0]?.count;
};

function readingTime(post: any) {
  const WORDS_PER_MINUTE = 200;
  const regex = /\w+/g;
  const wordCount = post.match(regex)?.length || 0;

  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}
 
export default async function Learn({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: any };
}) {
  const content = getPostContent(slug, lang);
  const dictionary = await getDictionary(lang);
  const time = readingTime(content);
 
  const MyH1 = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <h1 className="mx-auto text-gray-800 light:text-gray-800 dark:text-gray-300 mobileshort text-center max-w-5xl font-display text-4xl font-bold tracking-normal sm:text-6xl">
      {children}
    </h1>
  );

  const MyH2 = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <h2 className="mx-auto text-gray-800 light:text-gray-800 dark:text-gray-300 text-center max-w-5xl font-display text-4xl font-bold tracking-normal sm:text-6xl">
      {" "}
      <span className="relative whitespace-nowrap text-violet-600">
        <SquigglyLines />
        <span className="relative mobileshort">{children}</span>
      </span>
    </h2>
  );

  const MyP = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => {
   // console.log(children?.toString()) 
    return(
    <p className="light:text-gray-600 dark:text-gray-400 mt-8 text-center">
      {children}
      <span style={children?.toString() == '[object Object]' ? {display:"none"} : {}}>
      &nbsp;·&nbsp;{time} {dictionary.minutes}
      </span>
    </p>
  )
 };

  const MyH3 = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <div className="containerContentBlog font-normal max-w-4xl justify-center">
      <h1 className="mx-auto mt-12 text-2xl font-medium sm:text-white-400 text-white-500 leading-8 text-center text-violet-600">
        {children}
      </h1>
    </div>
  );

  const MyH4 = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <div className="containerContentBlog font-normal max-w-4xl justify-center">
      <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-8">
        {children}
      </h2>
    </div>
  );

  const MyLi = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <div className="containerContentBlog font-normal max-w-4xl justify-center mx-auto pt-6 text-xl sm:text-white-400 text-white-500 leading-8">
      <li>* {children}</li>   
    </div>
  );
  

  const MyCode = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (     
    <CodeHighlight code={children?.toString()} language={languageProgramming}></CodeHighlight> 
  );

  const MyImg = ({
    children,
    src,
  }: {
    children: React.ReactNode;
    src: string;
  }) => (
    <div className="max-w-6xl mx-auto items-center justify-center py-2">
      <img className="blog-animation img-blog" width={100} height={100}>
        {children}
      </img>
      {src}
      {lang}
    </div>
  );
  let originalList = getPostMetaData(lang, false);
  let relatedList = getPostMetaData(lang, true, slug);
   
  if(lang == 'es')
   relatedList.sort((a, b) => getDate(b.date) - getDate(a.date));
  else
   relatedList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const postPreviews = relatedList.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  const data = await getLikesPage(slug);
   
  return (
    <div className="max-w-6xl mx-auto items-center justify-center py-2">
      <Header showHome={true} actual={lang} />

      <Search
        list={originalList}
        failedText={dictionary.notFound}
        lang={lang}
        title={dictionary.search} 
      />

      <div className="float-right row-auto mr-6 likeCounter"> 
        <LikeCount count={data} title={slug} animation={true}></LikeCount>
      </div>

      <main className="w-full items-center justify-center px-4 xs:mt-16 sm:mt-9 mt-9 background-gradient">
        <Markdown
          options={{
            overrides: {
              h1: {
                component: MyH1,
                props: {
                  className: "foo",
                },
              },
              h2: {
                component: MyH2,
                props: {
                  className: "foo",
                },
              },
              h3: {
                component: MyH3,
                props: {
                  className: "foo",
                },
              },
              h4: {
                component: MyH4,
                props: {
                  className: "foo",
                },
              },
              p: {
                component: MyP,
                props: {
                  className: "foo",
                },
              },
              li: {
                component: MyLi,
                props: {
                  className: "foo",
                },
              },
              code: {
                component: MyCode,
                props: {
                  className: "foo",
                },
              }
              // img: {
              //   component: MyImg,
              //   props: {
              //     className: "foo",
              //     src: 'foo'
              //   },
              // },
            },
          }}
        >
          {content}
        </Markdown>

        <div className="flex flex-1 flex-col items-center justify-center mt-20 pt-3">
          <div className="bottom-3 fixed z-50">
            <RouteActualLink titlePage={titlePage} title={dictionary.share} />
          </div>
        </div>
        
        <div
          className="w-full max-w-xl items-center justify-center text-center mt-0 pt-0 pb-10"
          style={{ margin: "0 auto" }}
        >
          <p className="mx-auto text-3xl justify-center text-center light:text-gray-800 mb-10 dark:text-white max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800">
            {dictionary.related}
          </p>

          {postPreviews}
        </div>

        <div className="flex flex-col items-center justify-center mb-20"> 
           <EmailPlantilla title={dictionary.newsletter} description={dictionary.newsDescription} btnSubscribe={dictionary.btnSubscribe} error={dictionary.error} thanks={dictionary.thanks} incorrectEmail={dictionary.incorrectEmail} thanksShort={dictionary.thanksShort} />
        </div>
      </main>
      
      <Footer copy={dictionary.copy} />
    </div>
  );
}
