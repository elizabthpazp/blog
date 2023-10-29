import fs from "fs";
import Markdown from "markdown-to-jsx"; 
import Link from "next/link";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import RouteActualLink from "../../../components/RouteActualLink";
import { getDictionary } from "../../../get-dictionary";
import SquigglyLines from "../../../components/SquigglyLines";
import { Locale } from "../../../i18n-config";
import matter from "gray-matter";
import { PostMetadata, PreviewMetadata } from "../../../PostMetadata"; 
import getPostMetaData from "../../../getPostMetadata"; 
import Image from "next/image";

let titlePage: string, descriptionPage: string;
export async function generateMetadata({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: any };
}) {
  return {
    title: getPostMetaData2(slug, lang).title,
    description: getPostMetaData2(slug, lang).description,
    openGraph: {
      title: getPostMetaData2(slug, lang).title,
      description: getPostMetaData2(slug, lang).description,
    },
  };
}

export const generateStaticParams =async () => { 
  const postMetadata = getPostMetaData('es'); 

  let list:PreviewMetadata[] = [];
  const posts = postMetadata.map((file)=>{  
    list.push({slug: file.slug})
  })  
  
  return list;
}

const getPostContent = (slug: string, lang: Locale) => {
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`;
  const content = fs.readFileSync(file, "utf8"); 
  const matterResult = matter(content);
  
  return matterResult.content;
};

const getPostMetaData2=(slug: string, lang: Locale): PostMetadata=>{
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`; 
  const content = fs.readFileSync(file, "utf8"); 
  const matterResult = matter(content);
 
  const post: PostMetadata = {
    title: matterResult.data.title,
    description: matterResult.data.title,
    slug: ""
  } 
  titlePage = matterResult.data.title;
  return post;
}

export default async function Learn({
  params: { lang, slug },
}: {
  params: { lang: Locale; slug: any };
}) {
  const content = getPostContent(slug, lang); 
  const dictionary = await getDictionary(lang);

  const MyH1 = ({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: { lang: string };
  }) => (
    <h1 className="mx-auto text-gray-800 light:text-gray-800 dark:text-gray-300 text-center max-w-5xl font-display text-4xl font-bold tracking-normal sm:text-6xl">
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
  }) => (
    <p className="light:text-gray-600 dark:text-gray-400 mt-8 text-center">
      {children}
    </p>
  );

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

  const MyImg = ({
    children,
    src,
  }: {
    children: React.ReactNode; 
    src: string 
  }) => ( 
  <div className="max-w-6xl mx-auto items-center justify-center py-2">
    <img width={100} height={100}>
    {children}
    </img>
    {src}
    {lang}
  </div>
  );
 
  return (
    <div className="max-w-6xl mx-auto items-center justify-center py-2">
      <Header actual={lang} />

      <main className="w-full items-center justify-center px-4 sm:mt-20 mt-20 background-gradient">
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
      </main>
      <Footer copy={dictionary.copy} />
    </div>
  );
}
