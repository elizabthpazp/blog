import Link from "next/link";
import Footer from "../../components/Footer"; 
import EmailPlantilla from "../../components/EmailPlantilla";
import Header from "../../components/Header"; 
import PostPreview from "../../components/PostPreview"; 
import SquigglyLines from "../../components/SquigglyLines";
import { getDictionary } from '../../get-dictionary';
import { Locale } from '../../i18n-config';
import { links } from '../../links-web';    
import getPostMetaData from "../../getPostMetadata";  
import Search from "../../components/Search";
import getDate from "../../utils/getDate"; 

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  let ogimage = links.logo, sitename = links.username;
  const dictionary = await getDictionary(lang);
  let titleMeta = sitename + dictionary.metaTitle;
  let descriptionMeta = dictionary.title + ' ' + dictionary.title1 + ' ' + dictionary.title2 + ' | ' + dictionary.metaDescription;
  
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
      images: [ogimage],
      title: titleMeta,
      description: descriptionMeta,
      url: links.domain,
      siteName: sitename,
      locale: lang === 'en' ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: { 
      card: "summary_large_image",
      images: [ogimage],
      title: titleMeta,
      description: descriptionMeta,
    },  
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang); 
  let postMetadata = getPostMetaData(lang, false); 
 
  // Sort posts strictly from newest (2026) to oldest (2024/2023)
  postMetadata.sort((a, b) => getDate(b.date) - getDate(a.date));
  
  const postPreviews = postMetadata.map((post) => ( 
    <PostPreview key={post.slug} {...post} /> 
  ));

  return (
    <div className="flex flex-col min-h-screen">
      <Header actual={lang} />
       
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 background-gradient relative">
        <Search list={postMetadata} failedText={dictionary.notFound} lang={lang} title={dictionary.search} /> 

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto pt-6 sm:pt-12 pb-10">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6">
            {dictionary.title}{" "}
            <span className="relative whitespace-nowrap inline-block text-violet-600 dark:text-violet-400">
              <SquigglyLines />
              <span className="relative">{dictionary.title1}</span>
            </span>{" "}
            {dictionary.title2}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 sm:mb-10 font-normal">
            {dictionary.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              className="px-7 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center cursor-pointer"
              href="#articles"
            >
              {dictionary.cta}
            </a> 

            <a
              href={links.interaUi}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-semibold text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-[#161926]/80 hover:bg-white dark:hover:bg-[#1e2235] border border-black/10 dark:border-white/10 hover:border-violet-500/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{dictionary.request}</span>
              <span>💜</span>
            </a>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full">
          <EmailPlantilla 
            title={dictionary.newsletter} 
            description={dictionary.newsDescription} 
            btnSubscribe={dictionary.btnSubscribe} 
            error={dictionary.error} 
            thanks={dictionary.thanks} 
            incorrectEmail={dictionary.incorrectEmail} 
            thanksShort={dictionary.thanksShort} 
          />
        </section>

        {/* Articles List */}
        <section id="articles" className="max-w-3xl mx-auto my-12 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {dictionary.posts}
            </h2>
          </div>

          <div className="space-y-4">
            {postPreviews}
          </div>

          <div className="flex justify-center mt-10">
            <a
              href={links.web}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl font-semibold text-gray-800 dark:text-gray-200 bg-white/80 dark:bg-[#161926]/80 hover:bg-white dark:hover:bg-[#1e2235] border border-black/10 dark:border-white/10 hover:border-violet-500/50 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{dictionary.about}</span>
              <span>👩🏻‍💻💜</span>
            </a>
          </div>
        </section>
      </main> 
 
      <Footer copy={dictionary.copy} />
    </div>
  );
}
