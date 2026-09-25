import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import matter from "gray-matter";
import { i18n } from "../i18n-config";
import { links } from "../links-web";

const baseUrl = links.domain;

const monthsTranslations: Record<string, string> = {
  enero: "January",
  febrero: "February",
  marzo: "March",
  abril: "April",
  mayo: "May",
  junio: "June",
  julio: "July",
  agosto: "August",
  septiembre: "September",
  octubre: "October",
  noviembre: "November",
  diciembre: "December",
};

function parseFrontmatterDate(dateStr: unknown, fallback: Date): Date {
  if (!dateStr || typeof dateStr !== "string") return fallback;
  try {
    const cleaned = dateStr.replace(/["']/g, "").trim();
    const parts = cleaned.split(/\s+/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const monthRaw = parts[1]?.toLowerCase();
      const monthEnglish = monthsTranslations[monthRaw] || parts[1];
      const year = parseInt(parts[2], 10);
      const parsed = new Date(`${monthEnglish} ${day}, ${year}`);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    const direct = new Date(cleaned);
    if (!isNaN(direct.getTime())) return direct;
  } catch {
    // fall through to fallback
  }
  return fallback;
}

type PostEntry = {
  slug: string;
  lastModified: Date;
};

function getPostsForLocale(locale: string): PostEntry[] {
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];

  const slugs = fs
    .readdirSync(postsDir)
    .filter((name) => fs.statSync(path.join(postsDir, name)).isDirectory());

  const entries: PostEntry[] = [];

  for (const slug of slugs) {
    // Solo incluir el post si existe el .md para ese locale (sin fallback:
    // evitamos hreflang/URLs a páginas vacías)
    const filePath = path.join(postsDir, slug, locale, `${slug}.md`);
    if (!fs.existsSync(filePath)) continue;
    try {
      const stat = fs.statSync(filePath);
      const fallback = stat.mtime;
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const lastModified = parseFrontmatterDate(data.date, fallback);
      entries.push({ slug, lastModified });
    } catch {
      continue;
    }
  }

  // Más recientes primero (no afecta al XML, pero mantiene orden determinista)
  entries.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());
  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = [...i18n.locales];
  const now = new Date();

  const postsByLocale = new Map<string, PostEntry[]>();
  for (const locale of locales) {
    postsByLocale.set(locale, getPostsForLocale(locale));
  }

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Homes: /es y /en con alternos de idioma
  for (const locale of locales) {
    const languages: Record<string, string> = {};
    for (const other of locales) {
      languages[other] = `${baseUrl}/${other}`;
    }
    // x-default apunta al idioma por defecto (es) para usuarios sin preferencia
    languages['x-default'] = `${baseUrl}/es`;
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
      alternates: { languages },
    });
  }

  // Posts: /{locale}/{slug} con alternos de idioma
  const allSlugs = new Set<string>();
  Array.from(postsByLocale.values()).forEach((entries) => {
    entries.forEach((entry) => allSlugs.add(entry.slug));
  });

  Array.from(allSlugs).forEach((slug) => {
    // lastModified: la más reciente entre locales disponibles
    let lastModified: Date | undefined;
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const found = postsByLocale.get(locale)?.find((e) => e.slug === slug);
      if (found) {
        languages[locale] = `${baseUrl}/${locale}/${slug}`;
        if (!lastModified || found.lastModified > lastModified) {
          lastModified = found.lastModified;
        }
      }
    }
    // x-default al default (es) si existe, si no al primer disponible
    languages['x-default'] = languages['es'] ?? Object.values(languages)[0];
    if (!lastModified) return;
    Object.keys(languages).forEach((locale) => {
      sitemapEntries.push({
        url: languages[locale],
        lastModified: lastModified as Date,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages },
      });
    });
  });

  return sitemapEntries;
}
