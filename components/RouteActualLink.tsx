'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { links } from '../links-web'

export default function RouteActualLink({
  titlePage,
  title
}: {
  titlePage: string;
  title: string;
}) {
  const pathname = usePathname();
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(titlePage)} by @elijs_dev ${encodeURIComponent(links.domain)}${encodeURIComponent(pathname || '')}`;

  return (
    <Link
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-[#161926]/90 border border-black/10 dark:border-white/15 text-gray-800 dark:text-gray-100 font-semibold text-xs sm:text-sm shadow-xl hover:shadow-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 hover:scale-105 active:scale-95 transition-all duration-300 max-w-full text-center whitespace-nowrap"
      href={shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
    >
      <span className="truncate max-w-[60vw] sm:max-w-none">{title}</span>
      <svg className="w-4 h-4 text-[#1DA1F2] fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </Link>
  );
}