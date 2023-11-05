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
import Search from "../../../components/Search";
import LikeCount from "../../../components/LikeCount";
import { links } from "../../../links-web";
import { getLikesApi } from "../../../get-likes";
import PostPreview from "../../../components/PostPreview"; 
import revalidateCache from "../../../revalidate-cache"

let titlePage: string, descriptionPage: string;
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
  };
  titlePage = matterResult.data.title;
  return post;
};

const getLikesPage = async (slug: any): Promise<any> => {
  const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/get?id=${slug}`, {cache: 'force-cache' || 'no-store'})
  const data = await res.json() 
 
  return data?.result?.rows[data?.result?.rows?.length-1]?.count;
};

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

  const MyImg = ({
    children,
    src,
  }: {
    children: React.ReactNode;
    src: string;
  }) => (
    <div className="max-w-6xl mx-auto items-center justify-center py-2">
      <img className="blog-animation" width={100} height={100}>
        {children}
      </img>
      {src}
      {lang}
    </div>
  );
  let originalList = getPostMetaData(lang, false);
  let relatedList = getPostMetaData(lang, true, slug);
  relatedList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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
        <LikeCount count={data} title={slug}></LikeCount>
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
          className="w-full max-w-xl items-center justify-center text-center mt-0 pt-0 mb-20 pb-10"
          style={{ margin: "0 auto" }}
        >
          <h3 className="mx-auto justify-center text-center light:text-gray-800 mb-10 dark:text-white max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-800">
            {dictionary.related}
          </h3>

          {postPreviews}
        </div>
      </main>

      <Footer copy={dictionary.copy} />
    </div>
  );
}
