"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, Locale } from '../i18n-config'
import { links } from '../links-web' 

export default function LocaleSwitcher({ 
  actual,
  classNameProp
}: { 
  actual?: string;
  classNameProp?: string;
}) {
  const actualLang = actual || 'es';
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${locale}`;
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const getSrc = (lang: string) => { 
    return lang === 'en' ? links.iconUsa : links.iconSpain;
  };

  return (  
    <div className={`relative group ${classNameProp || ''}`}>
      <button 
        type="button" 
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors"
      >
        <img 
          className="w-4 h-4 rounded-full object-cover forcedImage" 
          src={getSrc(actualLang)}  
          alt={actualLang} 
          title={actualLang} 
          width={18} 
          height={18}
        />
        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
          {actualLang.toUpperCase()}
        </span>
        <svg className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1.5 hidden group-hover:block z-50 animate-slide-down">
        <div className="p-1 rounded-xl backdrop-blur-xl bg-white/95 dark:bg-[#161926]/95 border border-black/10 dark:border-white/10 shadow-xl min-w-[90px]">
          {i18n.locales.map((locale: Locale) => {
            if (locale === actualLang) return null;
            return (
              <Link 
                key={locale}
                href={redirectedPathName(locale)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-violet-500/10 text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              >
                <img 
                  className="w-4 h-4 rounded-full object-cover forcedImage" 
                  src={getSrc(locale)} 
                  alt={locale} 
                  title={locale} 
                  width={18} 
                  height={18}
                />
                <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>    
  );
}