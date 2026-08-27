import Link from "next/link";
import LocaleSwitcher from './LocaleSwitcher'
import {ThemeSwitcher} from './ThemeSwitcher' 
import { links } from '../links-web' 
import { Locale } from '../i18n-config' 

export default function Header({ 
  actual, 
  showHome, 
}: { 
  actual?: Locale, 
  showHome?: boolean
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/75 dark:bg-[#0b0d14]/75 border-b border-black/5 dark:border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between w-full transition-all duration-200 shadow-sm">
      <Link href="/" className="flex items-center gap-2 group logo-filter">  
        <img
          alt={links.username}
          title={links.username}
          src={links.logo}
          className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
        /> 
      </Link>  

      <div className="flex items-center gap-3 sm:gap-4">
        {showHome && (
          <Link 
            href="/" 
            className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/10 transition-colors"
            title="Home"
          >
            <HomeIcon className="w-5 h-5" />
          </Link>
        )}

        <LocaleSwitcher actual={actual} classNameProp="switch-lang" />
        
        <div className="p-1 rounded-xl hover:bg-violet-500/10 transition-colors">
          <ThemeSwitcher classNameProp="cursor-pointer flex items-center" />
        </div>
   
        <Link
          className="btn-primary !py-2 !px-3.5 !rounded-xl !text-sm flex items-center gap-2 shadow-sm"
          href={links.githubBlog}
          title="GitHub"   
          target="_blank"
          rel="noopener noreferrer"
        > 
          <GithubIcon className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-semibold">GitHub</span>
        </Link>  
      </div>   
    </header>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
      />
    </svg>
  );
}
