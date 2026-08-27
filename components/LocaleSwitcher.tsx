"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${locale}`;
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const getSrc = (lang: string) => { 
    return lang === 'en' ? links.iconUsa : links.iconSpain;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (  
    <div ref={containerRef} className={`relative group ${classNameProp || ''}`}>
      <button 
        type="button" 
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md bg-black/[0.04] dark:bg-white/[0.06] border border-black/5 dark:border-white/10 hover:bg-black/[0.08] dark:hover:bg-white/[0.12] transition-colors cursor-pointer"
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
        <svg className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : 'group-hover:rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown - mismo ancho que el botón, pt-1.5 crea puente invisible sin gap */}
      <div className={`absolute left-0 top-full pt-1.5 z-50 w-full ${open ? 'block' : 'hidden group-hover:block group-focus-within:block'}`}>
        <div className="w-full p-1 rounded-xl backdrop-blur-xl bg-white/95 dark:bg-[#161926]/95 border border-black/10 dark:border-white/10 shadow-xl">
          {i18n.locales.map((locale: Locale) => {
            if (locale === actualLang) return null;
            return (
              <Link 
                key={locale}
                href={redirectedPathName(locale)}
                onClick={() => setOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg w-full hover:bg-violet-500/10 text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
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
