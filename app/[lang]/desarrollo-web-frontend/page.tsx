import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header"; 
import { getDictionary } from '../../../get-dictionary'
import SquigglyLines from "../../../components/SquigglyLines";
import { Locale } from '../../../i18n-config' 

export default async function Learn({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang); 
  
  const share = `https://twitter.com/share?url=&text=${dictionary.articles.first.title + dictionary.articles.first.title1} por @elizabthpazp`;

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header actual={lang} title={dictionary.github}/>
      
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 sm:mt-20 mt-20 background-gradient">
  
        <h3 className="mx-auto light:text-gray-500 dark:text-gray-300 text-center max-w-5xl font-display text-4xl font-bold tracking-normal sm:text-6xl">
        {dictionary.articles.first.title} {" "}
          <span className="relative whitespace-nowrap text-violet-600">
            <SquigglyLines />
            <span className="relative">{dictionary.articles.first.title1}</span>
          </span>
        </h3>
        <p className="light:text-gray-600 dark:text-gray-400 mt-8">26 {lang == 'es' ? 'octubre' : 'october'} 2023</p>
        <div className="containerContentBlog mt-6">
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description1}
        </h2>

        <h1 className="mx-auto mt-12 text-2xl sm:text-white-400 text-white-500 leading-7 text-center text-violet-600">
        {dictionary.articles.first.question1}
        </h1>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description2}
        </h2>

        <h1 className="mx-auto mt-12 text-2xl sm:text-white-400 text-white-500 leading-7 text-center text-violet-600">
        {dictionary.articles.first.question2}
        </h1>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description3}
        </h2>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description31}
        </h2>

        <h1 className="mx-auto mt-12 text-2xl sm:text-white-400 text-white-500 leading-7 text-center text-violet-600">
        {dictionary.articles.first.question3}
        </h1>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description4}
        </h2>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description41}
        </h2>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description42}
        </h2>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description43}
        </h2>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description44}
        </h2>

        <h1 className="mx-auto mt-12 text-2xl sm:text-white-400 text-white-500 leading-7 text-center text-violet-600">
        {dictionary.articles.first.question4}
        </h1>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description5}
        </h2>

        <h1 className="mx-auto mt-12 text-2xl sm:text-white-400 text-white-500 leading-7 text-center text-violet-600">
        {dictionary.articles.first.question5}
        </h1>
        <h2 className="mx-auto mt-12 text-xl sm:text-white-400 text-white-500 leading-7">
        {dictionary.articles.first.description6}
        </h2>

        
        </div>
        
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
            <Link
          className="bg-gray-600 rounded-2xl flex group text-white font-medium px-3 py-3 sm:mt-10 mt-8 hover:bg-violet-500 transition"
          href={share} target="_blank"  
          aria-label={dictionary.share}
        > 
        {dictionary.share}  &nbsp;
        
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30" fill="rgba(37,185,252,1)">
         <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"></path>
        </svg>
     
        </Link> 
        
            </div>
          </div>
        </div>
 
      </main>
      <Footer copy={dictionary.copy} />
    </div>
  );
}
