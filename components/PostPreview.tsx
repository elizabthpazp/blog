'use client' 

import Link from "next/link"; 
import { PostMetadata } from "../PostMetadata"; 

const formatImageSrc = (img?: string) => {
  if (!img) return '/web.png';
  let cleaned = img.replace('./', '');
  if (!cleaned.startsWith('/')) {
    cleaned = '/' + cleaned;
  }
  return cleaned;
};

const Postpreview = (props: PostMetadata) => {  
  if (!props.slug) return null;

  const categoryTag = props.title || 'Desarrollo Web';
  const headline = props.subtitle || props.title || props.slug;
  const publishDate = props.date || '';
  const imageSrc = formatImageSrc(props.image);

  return ( 
    <Link 
      href={`/${props.slug}`} 
      className="group block card-post p-4 sm:p-5 mb-4 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/80 dark:bg-[#131622]/90 border border-black/10 dark:border-white/10 rounded-2xl"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 w-full">
        {/* Image Container */}
        <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-violet-500/10 border border-violet-500/20 p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img 
            alt={headline}
            title={headline}
            src={imageSrc}
            className="w-full h-full object-contain forcedImage rounded-xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/web.png';
            }}
          />
        </div>
        
        {/* Card Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {/* Category Tag */}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30">
              {categoryTag}
            </span>

            {/* Date */}
            {publishDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {publishDate}
              </span>
            )}
          </div>

          {/* Headline Title */}
          <h2 className="font-display text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2 leading-snug">
            {headline}
          </h2>
        </div>

        {/* Arrow Icon */}
        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.08] text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link> 
  );
};

export default Postpreview;
