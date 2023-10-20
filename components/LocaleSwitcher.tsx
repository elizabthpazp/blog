"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, Locale } from '../i18n-config'

export default function LocaleSwitcher(  {
     actual  
  }) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  } 
  const getSrc = (lang:string) => { return lang == 'en' ? "https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png" : "https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Spain.png"}
  return ( 
    <div> 
    <div className='switch-lang absolute'>
        <div className='current-lang'>
         <img className='lang-flag' src={getSrc(actual)}></img>
         <p className="lang-text">{actual.toUpperCase()}</p>
        </div>
          {i18n.locales.map((locale: Locale) => {
            if (locale !=actual) {
    return (
        <div className='lang-dropdown' key={locale}>
        <Link href={redirectedPathName(locale)}>
        <div className='selecting-lang'>
         <img className='lang-flag' src={getSrc(locale)}></img>
         <p className="lang-text">{locale.toUpperCase()}</p>
        </div>  
        </Link>
         </div>   
    )
            }
  })} 
    </div>
    <div className='switch-lang2 absolute'>
        <div className='current-lang'>
         <img className='lang-flag' src={getSrc(actual)}></img>
         <p className="lang-text">{actual.toUpperCase()}</p>
        </div>
          {i18n.locales.map((locale: Locale) => {
            if (locale !=actual) {
    return (
        <div className='lang-dropdown' key={locale}>
        <Link href={redirectedPathName(locale)}>
        <div className='selecting-lang'>
         <img className='lang-flag' src={getSrc(locale)}></img>
         <p className="lang-text">{locale.toUpperCase()}</p>
        </div>  
        </Link>
         </div>  
    )
            }
  })} 
    </div>      
    </div>
  )
}