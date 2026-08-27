"use client"
import { Locale } from '../i18n-config'
import "../styles/search.css"
import { useEffect, useMemo, useRef, useState } from 'react';
import { PostMetadata } from '../PostMetadata';
import PostPreview from "../components/PostPreview";

const normalize = (text: string) =>
  (text || "")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getPostContent = (postMetadata: PostMetadata[], title: string) => {
  const normalizedTitle = normalize(title);

  const filtered = postMetadata.filter((item) => {
    const haystack = [
      item.subtitle,
      item.description,
      item.body,
      item.title,
    ]
      .map((field) => normalize(field || ""))
      .join('\n');

    return haystack.includes(normalizedTitle);
  });

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export default function Search({
  list,
  lang,
  failedText,
  title,
}: {
  list: PostMetadata[],
  lang: Locale,
  failedText: string,
  title: string,
}) {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(input), 180);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const listResult = useMemo(
    () => getPostContent(list, debouncedInput),
    [list, debouncedInput]
  );

  const hasQuery = debouncedInput.trim() !== '';
  const showResults = hasQuery;
  const shouldShowDropdown = hasQuery && isFocused;
  const isEmpty = shouldShowDropdown && listResult.length === 0;
  const hasResults = shouldShowDropdown && listResult.length > 0;

  const resetSearch = () => {
    setInput('');
    setDebouncedInput('');
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto px-2 relative z-40">
      <div className="blog-animation relative">
        <div
          className={`flex items-center gap-2 p-1.5 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#121520]/70 border transition-all duration-300 shadow-lg ${
            shouldShowDropdown
              ? 'border-violet-500/40 shadow-violet-500/10'
              : 'border-black/10 dark:border-white/10 hover:border-violet-500/30'
          }`}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/15 to-indigo-500/15 border border-violet-500/20 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#search-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="search-icon"
            >
              <defs>
                <linearGradient id="search-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={title}
            aria-label={title}
            className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none border-0 px-2 py-2"
            suppressHydrationWarning
          />

          {showResults && (
            <button
              type="button"
              onClick={resetSearch}
              aria-label="Clear search"
              className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-rose-500/10 hover:text-rose-500 text-gray-500 dark:text-gray-400 transition-all duration-200 cursor-pointer animate-fade-in"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isEmpty && (
        <div className="absolute left-2 right-2 top-full mt-3 z-50 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-[#131622]/95 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium shadow-xl shadow-rose-500/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span>{failedText}</span>
          </div>
        </div>
      )}

      {hasResults && (
        <div className="absolute left-2 right-2 top-full mt-3 z-50 search-results-enter">
          <div className="rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-[#131622]/95 border border-black/10 dark:border-white/10 shadow-xl shadow-violet-500/10 overflow-hidden">
            <div className="px-3 sm:px-4 py-3 max-h-[60vh] sm:max-h-[450px] overflow-y-auto search-scroll divide-y divide-black/[0.06] dark:divide-white/[0.06]">
              {listResult.map((post) => (
                <PostPreview key={post.slug} {...post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
