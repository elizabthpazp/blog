import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from './LocaleSwitcher'
import {ThemeSwitcher} from './ThemeSwitcher' 
import { links } from '../links-web' 

export default function Header({ 
  actual,
  showHome
}: { 
 actual: string ,
 showHome?: boolean
}) {
  return (
    <header className="columns-4 relative flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-500 gap-2">
     

     <Home show={showHome} className={'light:fill-gray-800 dark:fill-white fill-gray-800'}/> 

      <Link href="/" className="w-full flex space-x-2 sm:text-3xl text-xl font-bold ml-2 tracking-tight mt-0-sm">  
        <Image
          alt={links.username}
          title={links.username}
          src={links.logo}
          className="w-auto h-auto forcedImage"
          width={500}
          height={500}
        /> 
      </Link>  
        
      <LocaleSwitcher actual={actual} classNameProp={'w-full absolute mr-7 switch-lang mt-sm'} />
      
      <ThemeSwitcher classNameProp={'w-full mx-4 mt-1 mt-sm'}/>
 
      <Link
        className="w-full flex mt-sm max-w-fit items-center justify-center space-x-2 rounded-2xl border border-violet-600 text-white px-3 py-2 text-sm shadow-md hover:bg-violet-500 bg-violet-600 font-medium transition"
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
      > 
         <Github />  
      </Link> 
      
    </header>
  );
}

function Github({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function Home({ className, show }: { className?: string, show?: boolean }) {
  return (
    <Link href="/" style={show? {display:'block'}: {display:'none'}} className="mobileNot">
    <svg className={className} fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  
	 width="25px" height="25px" viewBox="0 0 495.398 495.398">
<g>
	<g>
		<g>
			<path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
				v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
				c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
				c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
			<path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
				c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
				c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
		</g>
	</g>
</g>
</svg>
</Link>
  );
}
