import fs from "fs";
import Markdown from "markdown-to-jsx";
import React from "react";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import RouteActualLink from "../../../components/RouteActualLink";
import { getDictionary } from "../../../get-dictionary";
import SquigglyLines from "../../../components/SquigglyLines";
import { Locale } from "../../../i18n-config";
import EmailPlantilla from "../../../components/EmailPlantilla";
import matter from "gray-matter";
import { PostMetadata } from "../../../PostMetadata";
import getPostMetaData from "../../../getPostMetadata";
import Search from "../../../components/Search";
import LikeCount from "../../../components/LikeCount";
import { links } from "../../../links-web";
import PostPreview from "../../../components/PostPreview";
import getDate from "../../../utils/getDate";
import highlightTitle from "../../../utils/highlightTitle";
import CodeHighlight from "../../../components/CodeHighlight";

let languageProgramming: string;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: any }>;
}) {
  const { lang, slug } = await params;
  let sitename = links.username;
  const postMeta = getPostMetaData2(slug, lang);

  return {
    title: postMeta.subtitle,
    description: postMeta.description,
    icons: {
      icon: links.icon,
    },
    canonical: links.domain + "/" + slug,
    amphtml: links.domain + "/" + slug,
    keywords:
      postMeta.title +
      " ,blog, elizabthpazp, seo, web, programación, curso, frontend, developer, desarrollador, marketing digital",
    openGraph: {
      images: [postMeta.image],
      title: postMeta.subtitle,
      description: postMeta.description,
      url: links.domain + "/" + slug,
      siteName: sitename,
      locale: lang === "en" ? "en_US" : "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: [postMeta.image],
      title: postMeta.subtitle,
      description: postMeta.description,
    },
    link: {
      canonical: links.domain + "/" + slug,
      amphtml: links.domain + "/" + slug,
    },
  };
}

export const generateStaticParams = async () => {
  const locales = ["es", "en"] as const;
  let list: { lang: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const postMetadata = getPostMetaData(locale as any, false);
      for (const file of postMetadata) {
        list.push({ lang: locale, slug: file.slug });
      }
    } catch (e) {
      // ignore missing locale-specific files
    }
  }

  return list;
};

const getPostContent = (slug: string, lang: Locale) => {
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`;
  try {
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult.content;
  } catch (e) {
    return "";
  }
};

const getPostMetaData2 = (slug: string, lang: Locale): PostMetadata => {
  const folder = "posts/";
  const file = `${folder}${slug}/${lang}/${slug}.md`;
  try {
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);

    const post: PostMetadata = {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      description: matterResult.data.description,
      slug: "",
      date: matterResult.data.date,
      image: matterResult.data.image,
      icon: matterResult.data.icon ? String(matterResult.data.icon) : undefined,
      likes: matterResult.data.likes,
    };

    languageProgramming = matterResult.data.language;
    return post;
  } catch (e) {
    return {
      title: "",
      subtitle: "",
      description: "",
      slug: "",
      date: "",
      image: "",
      likes: 0,
    };
  }
};

function readingTime(post: any) {
  const WORDS_PER_MINUTE = 200;
  const regex = /\w+/g;
  const wordCount = post?.match(regex)?.length || 0;

  return Math.ceil(wordCount / WORDS_PER_MINUTE);
}

const formatImageSrc = (img?: string) => {
  if (!img) return "";
  let cleaned = img.replace('./', '');
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  return cleaned;
};

const MyImg = ({ alt, src, title, ...rest }: any) => {
  const cleanedSrc = formatImageSrc(src);
  return (
    <img
      src={cleanedSrc || src}
      alt={alt || ""}
      title={title}
      loading="lazy"
      decoding="async"
      className="block mx-auto my-8 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm max-w-full max-h-[360px] sm:max-h-[520px] w-auto h-auto object-contain"
      {...rest}
    />
  );
};

// Limpia el markdown para evitar duplicar header (imagen, título, fecha, descripción) que ya se renderiza desde frontmatter
function cleanContent(raw: string, meta: PostMetadata): string {
  const normalize = (text: string) =>
    (text || "")
      .toLowerCase()
      .replace(/[*_`"'“”]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const body = (raw || "").replace(/\uFEFF/g, "").replace(/\r\n?/g, "\n");

  // Algunos posts repiten el frontmatter dentro del contenido: se descarta ese bloque
  const strayFrontmatter = body.match(/^\s*---\n([\s\S]*?)\n---[ \t]*\n?/);
  const withoutStray =
    strayFrontmatter && /(^|\n)\s*(title|subtitle|description|date|image|language)\s*:/.test(strayFrontmatter[1])
      ? body.slice(strayFrontmatter[0].length)
      : body;

  const lines = withoutStray.split("\n");
  const isEmpty = (l: string) => l.trim() === "";
  const metaDate = normalize(meta.date).replace(/,/g, "");
  const metaDesc = normalize(meta.description);

  // El banner ya se muestra desde frontmatter: la primera imagen del contenido siempre sobra
  const isBannerImage = (l: string) => /^!\[[^\]]*\]\(\s*[^)\s]+/.test(l);

  const isDateLine = (l: string) => {
    const text = normalize(l).replace(/,/g, "");
    if (!text) return false;
    if (metaDate && text === metaDate) return true;
    return (
      /^\d{1,2}\s+(de\s+)?[a-záéíóúñ]+\s+(de\s+)?\d{4}$/.test(text) ||
      /^[a-záéíóúñ]+\s+\d{1,2}\s+\d{4}$/.test(text)
    );
  };

  const isDescription = (l: string) => {
    const text = normalize(l.replace(/^#{1,6}\s*/, ""));
    if (!text || !metaDesc) return false;
    return text.slice(0, 20) === metaDesc.slice(0, 20);
  };

  const used = { banner: false, title: false, subtitle: false, date: false, desc: false };
  let idx = 0;
  const skipEmpty = () => {
    while (idx < lines.length && isEmpty(lines[idx])) idx++;
  };

  skipEmpty();
  while (idx < lines.length) {
    const line = lines[idx].trim();
    if (!used.banner && isBannerImage(line)) used.banner = true;
    else if (!used.title && /^#(?!#)/.test(line)) used.title = true;
    else if (!used.subtitle && /^##(?!#)/.test(line)) used.subtitle = true;
    else if (!used.date && isDateLine(line)) used.date = true;
    else if (!used.desc && /^####(?!#)/.test(line) && isDescription(line)) used.desc = true;
    else break;
    idx++;
    skipEmpty();
  }

  // Variante donde la descripción (y su imagen) vienen después del primer subtítulo de contenido
  if (!used.desc && idx < lines.length && lines[idx].trim().startsWith("### ")) {
    let j = idx + 1;
    while (j < lines.length && isEmpty(lines[j])) j++;
    if (j < lines.length && /^####(?!#)/.test(lines[j].trim()) && isDescription(lines[j].trim())) {
      lines.splice(j, 1);
      while (j < lines.length && isEmpty(lines[j])) j++;
      if (!used.banner && j < lines.length && isBannerImage(lines[j].trim())) lines.splice(j, 1);
    }
  }

  return lines.slice(idx).join("\n").trimStart();
}

export default async function Learn({
  params,
}: {
  params: Promise<{ lang: Locale; slug: any }>;
}) {
  const { lang, slug } = await params;
  const rawContent = getPostContent(slug, lang);
  const dictionary = await getDictionary(lang);
  const time = readingTime(rawContent);
  let titlePage = getPostMetaData2(slug, lang).subtitle;
  const meta = getPostMetaData2(slug, lang);
  const content = cleanContent(rawContent, meta);

  const MyH1 = ({ children }: { children: React.ReactNode }) => (
    <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center tracking-tight leading-[1.2] max-w-4xl mx-auto my-6 px-2 break-words overflow-visible">
      {children}
    </h1>
  );

  const MyH2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-display text-xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center my-6 max-w-4xl mx-auto px-2 leading-tight break-words overflow-visible">
      <span className="relative inline-block max-w-full text-violet-500 dark:text-violet-300 break-words overflow-visible pb-[0.32em] sm:pb-[0.34em]">
        <SquigglyLines />
        <span className="relative break-words whitespace-normal">{children}</span>
      </span>
    </h2>
  );

  const MyP = ({ children }: { children: React.ReactNode }) => {
    return (
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed my-5 max-w-4xl mx-auto font-normal px-2 sm:px-0 break-words overflow-hidden">
        {children}
      </p>
    );
  };

  const MyH3 = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-4xl mx-auto mt-10 mb-4 text-left px-2 sm:px-0">
      <h3 className="font-display text-xl sm:text-2xl font-bold text-violet-500 dark:text-violet-300 tracking-tight break-words">
        {children}
      </h3>
    </div>
  );

  const MyH4 = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-4xl mx-auto mt-8 mb-3 text-left px-2 sm:px-0">
      <h4 className="font-display text-lg sm:text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed break-words">
        {children}
      </h4>
    </div>
  );

  const MyLi = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-4xl mx-auto my-2 text-left px-2 sm:px-0">
      <li className="flex items-start gap-2.5 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed list-none break-words min-w-0">
        <span className="inline-block w-2 h-2 rounded-full bg-violet-500 mt-2.5 flex-shrink-0" />
        <span className="min-w-0 break-words flex-1">{children}</span>
      </li>
    </div>
  );

  const MyCode = ({ children }: { children: React.ReactNode }) => (
    <code className="px-1.5 py-0.5 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-mono text-sm border border-violet-500/20 break-all">
      {children}
    </code>
  );

  const MyPre = ({ children }: { children: React.ReactNode }) => {
    const codeText = React.isValidElement(children) && typeof (children.props as any).children === 'string'
      ? (children.props as any).children
      : '';
    return <CodeHighlight code={codeText} language={languageProgramming} />;
  };

  let originalList = getPostMetaData(lang, false);
  let relatedList = getPostMetaData(lang, true, slug);
  // relatedList ya viene ordenado por relevancia (TF-IDF + categoria + language). No reordenar por fecha para mantener los realmente relacionados arriba.

  const postPreviews = relatedList.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));

  const heroSrc = formatImageSrc(meta.image);
  const titleParts = highlightTitle(meta.subtitle);

  return (
    <div className="flex flex-col min-h-screen">
      <Header showHome={true} actual={lang} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 background-gradient relative">
        <Search
          list={originalList}
          failedText={dictionary.notFound}
          lang={lang}
          title={dictionary.search}
        />

        {/* Header del artículo - orden correcto: imagen → título → meta → descripción (no negrita) */}
        <div className="max-w-4xl mx-auto text-center mt-8 overflow-visible px-2 sm:px-0 w-full">
          {heroSrc && (
            <div className="w-full max-w-3xl mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-white/10">
              <img
                src={heroSrc}
                alt={meta.subtitle || meta.title}
                className="w-full aspect-[16/9] sm:aspect-auto sm:h-auto max-h-[420px] object-cover forcedImage"
              />
            </div>
          )}
          {meta.subtitle && (
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.35] break-words px-2 max-w-full overflow-visible">
              {titleParts.before}
              {titleParts.keyword && (
                <span className="relative inline-block max-w-full text-violet-500 dark:text-violet-300 break-words overflow-visible pb-[0.12em] sm:pb-[0.14em]">
                  <SquigglyLines />
                  <span className="relative break-words whitespace-normal">{titleParts.keyword}</span>
                </span>
              )}
              {titleParts.after}
            </h1>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 pb-4 border-b border-black/[0.06] dark:border-white/[0.08] text-sm text-gray-500 dark:text-gray-400 px-2 max-w-full overflow-hidden">
            {meta.date && <span>{meta.date}</span>}
            {meta.date && <span>·</span>}
            <span>{time} {dictionary.minutes}</span>
            <span className="ml-2"><LikeCount slug={slug} title={slug} animation={true} /></span>
          </div>
          {meta.description && (
            <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed break-words px-2 max-w-full overflow-hidden">
              {meta.description}
            </p>
          )}
        </div>

        {/* Article Content - ya sin header duplicado, ancho 4xl igual que code */}
        <article className="w-full max-w-full text-center sm:text-left mt-8 min-w-0 overflow-visible">
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: MyH1,
                },
                h2: {
                  component: MyH2,
                },
                h3: {
                  component: MyH3,
                },
                h4: {
                  component: MyH4,
                },
                p: {
                  component: MyP,
                },
                li: {
                  component: MyLi,
                },
                code: {
                  component: MyCode,
                },
                pre: {
                  component: MyPre,
                },
                img: {
                  component: MyImg,
                },
              },
            }}
          >
            {content}
          </Markdown>
        </article>

        {/* Floating Share Button - centrado inferior, responsive sin overflow */}
        <div className="fixed inset-x-0 bottom-4 sm:bottom-6 z-40 flex justify-center pointer-events-none px-4">
          <div className="pointer-events-auto max-w-[calc(100vw-2rem)]">
            <RouteActualLink titlePage={titlePage} title={dictionary.share} />
          </div>
        </div>

        {/* Related Articles */}
        {postPreviews.length > 0 && (
          <section className="max-w-4xl mx-auto mt-16 pt-10 border-t border-black/[0.06] dark:border-white/[0.08]">
            <div className="text-center mb-8">
              <h3 className="section-heading text-2xl sm:text-3xl text-gray-900 dark:text-white">
                {dictionary.related}
              </h3>
            </div>

            <div className="space-y-4">
              {postPreviews}
            </div>
          </section>
        )}

        {/* Newsletter Box */}
        <section className="max-w-4xl mx-auto mt-12 mb-16">
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
      </main>

      <Footer copy={dictionary.copy} />
    </div>
  );
}
