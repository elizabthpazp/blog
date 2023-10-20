import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SquigglyLines from "../../components/SquigglyLines";
import { getDictionary } from '../../get-dictionary'
import { Locale } from '../../i18n-config'

export default async function HomePage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang) 
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header actual={lang} title={dictionary.github}/>
       
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        <a
          href="https://t.me/elizabthpazp"
          target="_blank"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-5 transition duration-300 ease-in-out"
        >
          {dictionary.request}{" "}
          <span className="text-violet-600">{dictionary.here}</span>
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-normal text-gray-300 sm:text-7xl">
        {dictionary.title} {" "}
          <span className="relative whitespace-nowrap text-violet-600">
            <SquigglyLines />
            <span className="relative">{dictionary.title1}</span>
          </span>{" "}
          {dictionary.title2}
        </h1>
        <h2 className="mx-auto mt-12 max-w-3xl text-lg sm:text-gray-400  text-gray-500 leading-7">
        {dictionary.subtitle}
        </h2>
        <Link
          className="bg-violet-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-violet-500 transition"
          href="/dream"
        >
          {dictionary.cta}
        </Link>
        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              {/* <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <Image
                  alt="Original photo of a room with roomGPT.io"
                  src="/original-pic.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div> */}
              {/* <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <Image
                  alt="Generated photo of a room with roomGPT.io"
                  width={400}
                  height={400}
                  src="/generated-pic-2.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Footer copy={dictionary.copy} />
    </div>
  );
}
