"use client"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { i18n, Locale } from '../i18n-config'
import Image from "next/image";

export default function LocaleSwitcher({ 
  actual
}: { 
 actual: string ,
}) {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  } 
  const getSrc = (lang:string) => { return lang == 'en' ? "/usa.png" : "/spain.png"}
  return ( 
    <div> 
    <div className='switch-lang absolute'>
        <div className='current-lang'>
         <img className='lang-flag' src={getSrc(actual)}  alt="elizabthpazp" title="elizabthpazp" width={100} height={100}></img>
         <p className="lang-text light:text-white dark:text-white">{actual.toUpperCase()}</p>
        </div>
          {i18n.locales.map((locale: Locale) => {
            if (locale !=actual) {
    return (
        <div className='lang-dropdown' key={locale}>
        <Link href={redirectedPathName(locale)}>
        <div className='selecting-lang'>
         <img className='lang-flag' src={getSrc(locale)} alt="elizabthpazp" title="elizabthpazp" width={100} height={100}></img>
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