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
    <div className="flex flex-col min-h-screen supports-[min-height:100svh]:min-h-[100svh]">
      <Header actual={lang} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 background-gradient relative">
        <Search list={postMetadata} failedText={dictionary.notFound} lang={lang} title={dictionary.search} />

        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto pt-6 sm:pt-12 pb-10 px-2 overflow-visible">
          <h1 className="font-display text-[38px] sm:text-7xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6 break-words overflow-visible">
            {dictionary.title}{" "}
            <span className="relative inline-block max-w-full text-violet-500 dark:text-violet-300 break-words overflow-visible ">
              <SquigglyLines />
              <span className="relative break-words">{dictionary.title1}</span>
            </span>{" "}
            {dictionary.title2}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 sm:mb-10 font-normal">
            {dictionary.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#articles"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-violet-500 dark:bg-violet-300 text-white dark:text-neutral-900 font-display font-semibold text-base sm:text-lg tracking-tight hover:bg-violet-600 dark:hover:bg-violet-400 hover:-translate-y-px active:translate-y-0 shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_8px_24px_-12px_rgba(139,92,246,0.45)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_14px_30px_-10px_rgba(139,92,246,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 transition-all duration-200"
            >
              <span>{dictionary.cta}</span>
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href={links.interaUi}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-display font-semibold text-base sm:text-lg tracking-tight hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:-translate-y-px active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 transition-all duration-200"
            >
              <span aria-hidden="true" className="text-violet-500 text-base leading-none transition-transform duration-300 group-hover:scale-110">♥</span>
              <span>{dictionary.request}</span>
              <svg
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1.5 opacity-60 group-hover:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
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
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-500 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 transition-all duration-200"
            >
              <span>{dictionary.about}</span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </section>
      </main>

      <Footer copy={dictionary.copy} />
    </div>
  );
}
