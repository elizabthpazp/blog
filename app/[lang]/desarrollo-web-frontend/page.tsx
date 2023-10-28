import Image from "next/image";
import Link from "next/link";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header"; 
import RouteActualLink from "../../../components/RouteActualLink"; 
import { getDictionary } from '../../../get-dictionary'
import SquigglyLines from "../../../components/SquigglyLines";
import { Locale } from '../../../i18n-config'  

let titlePage: string, descriptionPage: string;
export async function generateMetadata() {
	return {
		title: titlePage,
		description: descriptionPage,
    openGraph: {
     title: titlePage,
		 description: descriptionPage,
    }
	}
} 

export default async function Learn({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang); 
  titlePage = dictionary.articles.first.title + dictionary.articles.first.title1;
  descriptionPage = dictionary.articles.first.description2;

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header actual={lang} />
       
      <main className="flex flex-1 w-full flex-col items-center justify-center px-4 sm:mt-20 mt-20 background-gradient">
  
        <h3 className="mx-auto text-gray-800 light:text-gray-800 dark:text-gray-300 text-center max-w-5xl font-display text-4xl font-bold tracking-normal sm:text-6xl">
        {dictionary.articles.first.title} {" "}
          <span className="relative whitespace-nowrap text-violet-600">
             <SquigglyLines /> 
            <span className="relative">{dictionary.articles.first.title1}</span>
          </span>
        </h3>
        <p className="light:text-gray-600 dark:text-gray-400 mt-8">26 {lang == 'es' ? 'octubre' : 'october'} 2023</p>
        <div className="containerContentBlog mt-6 font-medium mb-20">
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
         
            <div className="bottom-3 fixed z-50">
          
        <RouteActualLink titlePage={titlePage} title={dictionary.share}/>
        </div>
 
      </main>
      <Footer copy={dictionary.copy} />
    </div>
  );
} 