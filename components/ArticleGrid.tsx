'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { PostMetadata } from '../PostMetadata';
import PostPreview from './PostPreview';
import { Locale } from '../i18n-config';
import getDate from '../utils/getDate';

type Props = {
  posts: PostMetadata[];
  lang: Locale;
  heading: string;
};

const formatImageSrc = (img?: string) => {
  if (!img) return '/web.png';
  let cleaned = img.replace('./', '');
  if (!cleaned.startsWith('/')) cleaned = '/' + cleaned;
  return cleaned;
};

const ALL_ES = 'Todos';
const ALL_EN = 'All';

export default function ArticleGrid({ posts, lang, heading }: Props) {
  const allLabel = lang === 'en' ? ALL_EN : ALL_ES;
  const [active, setActive] = useState<string>(allLabel);
  const [page, setPage] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const perPage = 6;
  const hasMounted = useRef(false);

  // Reset page when category or sort changes
  useEffect(() => {
    setPage(0);
    setMobileOpen(false);
  }, [active, sortOrder]);

  // Mobile: al pasar de página con siguiente/dots/swipe, volver al inicio de la lista
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const el = document.getElementById('articles-grid-top');
      if (el) {
        // pequeño delay para que el nuevo page ya esté renderizado
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - 72; // offset sticky
          window.scrollTo({ top, behavior: 'smooth' });
        }, 60);
      }
    }
  }, [page]);

  // Mobile: al cambiar orden, también volver al inicio de la lista
  useEffect(() => {
    if (!hasMounted.current) return;
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      const el = document.getElementById('articles-grid-top');
      if (el) {
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: 'smooth' });
        }, 60);
      }
    }
  }, [sortOrder]);

  // Sync default label if lang changes (edge)
  useEffect(() => {
    setActive(lang === 'en' ? ALL_EN : ALL_ES);
  }, [lang]);

  // Derive categories with counts, sorted by count desc
  const { categories, counts } = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    for (const p of posts) {
      const raw = (p.title || 'Otros').trim() || 'Otros';
      const key = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const existing = map.get(key);
      if (existing) existing.count += 1;
      else map.set(key, { label: raw, count: 1 });
    }
    const sorted = Array.from(map.values()).sort((a, b) => b.count - a.count);
    // Merge very small categories (count 1) that are similar to "Portal Digital..." etc into Otros if desired - keep as is for now
    const cats = sorted.map((v) => v.label);
    const cnts = new Map<string, number>();
    sorted.forEach((v) => cnts.set(v.label, v.count));
    return { categories: cats, counts: cnts };
  }, [posts]);

  const filtered = useMemo(() => {
    if (active === allLabel) return posts;
    const key = active.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return posts.filter((p) => {
      const raw = (p.title || 'Otros').trim();
      const k = raw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return k === key;
    });
  }, [posts, active, allLabel]);

  // Sort by date: desc = más reciente primero (default), asc = más antiguo primero
  const sortedFiltered = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const da = getDate(a.date);
      const db = getDate(b.date);
      return sortOrder === 'desc' ? db - da : da - db;
    });
    return copy;
  }, [filtered, sortOrder]);

  const hasFeatured = active === allLabel && sortedFiltered.length > 0;
  const featured = hasFeatured ? sortedFiltered[0] : null;
  const rest = hasFeatured ? sortedFiltered.slice(1) : sortedFiltered;
  const totalPages = Math.max(1, Math.ceil(rest.length / perPage));
  // Clamp page if filtered shrinks
  useEffect(() => {
    if (page >= totalPages) setPage(totalPages - 1);
  }, [totalPages, page]);
  const pagedRest = rest.slice(page * perPage, (page + 1) * perPage);
  const totalFiltered = filtered.length;
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;
  const rangeStart = rest.length === 0 ? 0 : page * perPage + 1;
  const rangeEnd = Math.min((page + 1) * perPage, rest.length);
  const rangeLabel =
    rest.length === 0
      ? ''
      : lang === 'en'
        ? `${rangeStart}–${rangeEnd} of ${rest.length}`
        : `${rangeStart}–${rangeEnd} de ${rest.length}`;

  // For compact featured we prefer square icon (like cards), fallback to banner
  const featuredImage = formatImageSrc((featured as any)?.icon || featured?.image);
  const featuredHref = featured ? `/${lang}/${featured.slug}` : '#';

  const t = {
    featuredBadge: sortOrder === 'desc'
      ? lang === 'en' ? 'Featured · Latest' : 'Destacado · Lo más reciente'
      : lang === 'en' ? 'Featured · Oldest first' : 'Destacado · Más antiguo primero',
    showing: rangeLabel,
    pageLabel: lang === 'en' ? `Page ${page + 1} of ${totalPages}` : `Página ${page + 1} de ${totalPages}`,
    prev: lang === 'en' ? 'Previous' : 'Anterior',
    next: lang === 'en' ? 'Next' : 'Siguiente',
    articles: lang === 'en' ? 'articles' : 'artículos',
    empty: lang === 'en' ? 'No articles in this category.' : 'No hay artículos en esta categoría.',
    clearFilter: lang === 'en' ? 'Clear filter' : 'Limpiar filtro',
    sortLabel: lang === 'en' ? 'Sort by date' : 'Ordenar por fecha',
    sortNewest: lang === 'en' ? 'Newest' : 'Más recientes',
    sortOldest: lang === 'en' ? 'Oldest' : 'Más antiguos',
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && canNext) setPage((p) => p + 1);
      if (diff > 0 && canPrev) setPage((p) => p - 1);
    }
    setTouchStart(null);
  };

  return (
    <section id="articles" className="max-w-5xl mx-auto my-12 scroll-mt-20">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="text-center mb-6">
        <h2 className="section-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {heading}
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {posts.length} {t.articles} {hasFeatured ? (lang === 'en' ? '· 1 featured + filter by topic to find faster' : '· 1 destacado + filtra por tema para encontrar más rápido') : lang === 'en' ? '· filter by topic' : '· filtra por tema'}
        </p>
      </div>

      {/* Filters - sticky: dropdown on mobile, chips on desktop */}
      <div className="sticky top-0 z-20 -mx-4 sm:mx-0 px-4 sm:px-0 py-3 mb-6 bg-white/85 dark:bg-[#0a0c14]/85 backdrop-blur-xl sm:rounded-2xl border-y sm:border border-black/[0.06] dark:border-white/[0.06] sm:shadow-sm">
        {/* Mobile: single dropdown - mucho más intuitivo que scroll horizontal */}
        <div className="sm:hidden relative">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-haspopup="listbox"
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#131622] border border-black/10 dark:border-white/10 shadow-sm active:scale-[0.98] transition-all"
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-500 text-white shadow-sm shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18M7 12h10M10 18h4" />
                </svg>
              </span>
              <span className="flex flex-col items-start min-w-0">
                <span className="text-[11px] font-semibold tracking-wide text-violet-600 dark:text-violet-400 uppercase leading-none">
                  {lang === 'en' ? 'Filter by topic' : 'Filtrar por tema'}
                </span>
                <span className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[18ch]">{active}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/20 font-medium">
                    {active === allLabel ? posts.length : counts.get(active) || 0}
                  </span>
                </span>
              </span>
            </span>
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-gray-500 dark:text-gray-400 transition-transform duration-200 shrink-0 ${mobileOpen ? 'rotate-180 bg-violet-500 text-white dark:bg-violet-400 dark:text-neutral-900' : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          {mobileOpen && (
            <>
              <button
                aria-label="Cerrar filtros"
                onClick={() => setMobileOpen(false)}
                className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm sm:hidden"
              />
              <div className="absolute top-full left-0 right-0 mt-2 z-40 rounded-2xl bg-white dark:bg-[#131622] border border-black/10 dark:border-white/10 shadow-xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                <div className="px-4 py-3 border-b border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03]">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {posts.length} {lang === 'en' ? 'articles in' : 'artículos en'} {categories.length + 1} {lang === 'en' ? 'topics' : 'temas'}
                  </p>
                </div>
                <div role="listbox" className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
                  {/* All */}
                  <button
                    role="option"
                    aria-selected={active === allLabel}
                    onClick={() => setActive(allLabel)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${
                      active === allLabel
                        ? 'bg-violet-500 text-white shadow-sm'
                        : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-gray-900 dark:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${active === allLabel ? 'bg-white' : 'bg-violet-500'}`} />
                      <span className="text-sm font-semibold truncate">{allLabel}</span>
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${active === allLabel ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'}`}>
                        {posts.length}
                      </span>
                      {active === allLabel && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {categories.map((cat) => {
                    const isActive = active === cat;
                    const count = counts.get(cat) || 0;
                    return (
                      <button
                        key={cat}
                        role="option"
                        aria-selected={isActive}
                        onClick={() => setActive(cat)}
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-left transition-colors ${
                          isActive
                            ? 'bg-violet-500 text-white shadow-sm'
                            : 'hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-gray-900 dark:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-white' : 'bg-violet-500/60'}`} />
                          <span className="text-sm font-medium truncate">{cat}</span>
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300'}`}>
                            {count}
                          </span>
                          {isActive && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="p-2 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
                  >
                    {lang === 'en' ? 'Close' : 'Cerrar'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desktop: chips centered, wrap - sin scroll */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActive(allLabel)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
              active === allLabel
                ? 'bg-violet-500 dark:bg-violet-400 text-white dark:text-neutral-900 border-violet-600 dark:border-violet-400 shadow-md shadow-violet-500/20'
                : 'bg-white dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-300'
            }`}
          >
            {allLabel}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${active === allLabel ? 'bg-white/20 text-white dark:text-neutral-900' : 'bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
              {posts.length}
            </span>
          </button>

          {categories.map((cat) => {
            const isActive = active === cat;
            const count = counts.get(cat) || 0;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-500 dark:bg-violet-400 text-white dark:text-neutral-900 border-violet-600 dark:border-violet-400 shadow-md shadow-violet-500/20'
                    : 'bg-white dark:bg-[#1a1d2e] text-gray-700 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-300'
                }`}
              >
                <span className="truncate">{cat}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? 'bg-white/20 text-white dark:text-neutral-900' : 'bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured - compact, same height as cards but highlighted */}
      {featured && (
        <div className="mb-5">
          <Link
            href={featuredHref}
            className="group relative flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#131622] border border-violet-500/25 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            {/* subtle violet accent */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/[0.06] via-transparent to-indigo-500/[0.04] pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-l-2xl" />

            {/* Image - same square treatment as cards, slightly larger on desktop */}
            <div
              className={`relative flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border flex items-center justify-center group-hover:scale-[1.03] transition-transform duration-300 ${
                (featured as any)?.icon
                  ? 'bg-white dark:bg-[#1a1d2e] border-black/5 dark:border-white/10 p-0'
                  : 'bg-violet-500/10 border-violet-500/20 p-1 sm:p-1.5'
              }`}
            >
              <img
                src={featuredImage}
                alt={featured.subtitle || featured.title}
                className={`w-full h-full ${(featured as any)?.icon ? 'object-cover rounded-xl sm:rounded-2xl' : 'object-contain rounded-lg sm:rounded-xl'}`}
                onError={(e) => ((e.target as HTMLImageElement).src = '/web.png')}
              />
            </div>

            {/* Content */}
            <div className="relative flex-1 min-w-0 text-left">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-violet-500 text-white shadow-sm">
                  <span className="hidden sm:inline">★</span> {lang === 'en' ? 'Featured' : 'Destacado'}
                </span>
                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30">
                  {featured.title}
                </span>
                {featured.date && (
                  <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline">
                    {featured.date}
                  </span>
                )}
              </div>

              <h3 className="font-display text-sm sm:text-[17px] font-bold leading-snug text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                {featured.subtitle || featured.title}
              </h3>
              {featured.description && (
                <p className="hidden sm:block mt-1 text-sm leading-snug text-gray-600 dark:text-gray-400 line-clamp-1">
                  {featured.description}
                </p>
              )}
              <span className="sm:hidden mt-1 inline-flex items-center gap-1 text-xs font-semibold text-violet-600 dark:text-violet-400">
                {lang === 'en' ? 'Read' : 'Leer'} <span aria-hidden>→</span>
              </span>
            </div>

            {/* Arrow - desktop only */}
            <div className="relative hidden sm:flex shrink-0 items-center justify-center w-9 h-9 rounded-full bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300 group-hover:bg-violet-500 group-hover:text-white dark:group-hover:bg-violet-400 dark:group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          <p className="mt-2 text-center text-[11px] tracking-wide font-medium text-gray-400 dark:text-gray-500">
            {t.featuredBadge} · {featured.date}
          </p>
        </div>
      )}

      {/* Anchor para scroll mobile */}
      <div id="articles-grid-top" className="scroll-mt-20" />

      {/* Results meta + sort by date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {active !== allLabel ? (
            <>
              <span className="font-semibold text-gray-700 dark:text-gray-200">{active}</span>
              <span className="mx-1.5">·</span>
              <span>{t.showing}</span>
              <span className="mx-1.5 hidden sm:inline">·</span>
              <span className="hidden sm:inline">{t.pageLabel}</span>
            </>
          ) : (
            <>
              <span>{t.showing}</span>
              <span className="mx-1.5">·</span>
              <span>{t.pageLabel}</span>
            </>
          )}
        </p>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-between sm:justify-end">
          {/* Sort by date toggle — feature solicitada: reciente ↔ antiguo */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs font-medium text-gray-500 dark:text-gray-400">{t.sortLabel}:</span>
            <div
              role="group"
              aria-label={t.sortLabel}
              className="inline-flex items-center p-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10"
            >
              <button
                onClick={() => setSortOrder('desc')}
                aria-pressed={sortOrder === 'desc'}
                aria-label={t.sortNewest + ' — más reciente primero'}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  sortOrder === 'desc'
                    ? 'bg-violet-500 dark:bg-violet-400 text-white dark:text-neutral-900 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
                {t.sortNewest}
              </button>
              <button
                onClick={() => setSortOrder('asc')}
                aria-pressed={sortOrder === 'asc'}
                aria-label={t.sortOldest + ' — más antiguo primero'}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  sortOrder === 'asc'
                    ? 'bg-violet-500 dark:bg-violet-400 text-white dark:text-neutral-900 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                {t.sortOldest}
              </button>
            </div>
          </div>
          {active !== allLabel && (
            <button
              onClick={() => setActive(allLabel)}
              className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 underline-offset-4 hover:underline shrink-0"
            >
              {t.clearFilter}
            </button>
          )}
        </div>
      </div>

      {/* Grid - carousel page */}
      {pagedRest.length > 0 ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative overflow-hidden"
        >
          <div
            key={`${page}-${active}-${sortOrder}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr"
            style={{ animation: 'fadeIn 0.35s ease-out' } as React.CSSProperties}
          >
            {pagedRest.map((post) => (
              <PostPreview key={post.slug} {...post} lang={lang} />
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] text-gray-400 dark:text-gray-500 sm:hidden">
            ← desliza para pasar →
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-10 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t.empty}</p>
          {active !== allLabel && (
            <button
              onClick={() => setActive(allLabel)}
              className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-violet-500 text-white text-sm font-semibold hover:bg-violet-600 transition-colors"
            >
              {t.clearFilter}
            </button>
          )}
        </div>
      )}

      {/* Carousel controls */}
      {rest.length > perPage && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* progress */}
          <div className="w-full max-w-sm">
            <div className="h-1.5 w-full bg-black/5 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((page + 1) / totalPages) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-400">
              {t.pageLabel} · {t.showing} {t.articles}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!canPrev}
              aria-label={t.prev}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full border text-sm font-medium transition-all ${
                canPrev
                  ? 'bg-white dark:bg-[#1a1d2e] border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-300 hover:-translate-y-px shadow-sm'
                  : 'bg-black/[0.03] dark:bg-white/[0.04] border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`${lang === 'en' ? 'Go to page' : 'Ir a página'} ${i + 1}`}
                  aria-current={i === page ? 'true' : undefined}
                  className={`transition-all duration-300 rounded-full ${
                    i === page
                      ? 'w-6 h-2 bg-violet-500 dark:bg-violet-400'
                      : 'w-2 h-2 bg-black/15 dark:bg-white/20 hover:bg-black/25 dark:hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={!canNext}
              aria-label={t.next}
              className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold shadow-sm transition-all ${
                canNext
                  ? 'bg-violet-500 dark:bg-violet-400 text-white dark:text-neutral-900 hover:bg-violet-600 dark:hover:bg-violet-300 hover:-translate-y-px shadow-violet-500/20'
                  : 'bg-black/[0.03] dark:bg-white/[0.04] border border-transparent text-gray-400 dark:text-gray-600 cursor-not-allowed shadow-none'
              }`}
            >
              →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
