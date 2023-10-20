import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../../styles/globals.css"

import { i18n } from '../../i18n-config'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
} 

let title = "Learn about Web Development with me";
let description = "It doesn't matter if you are just starting out or you are an expert, there is always something new that you can learn and I would really like to be able to share it with you.";
let ogimage = "./logo.png";
let sitename = "elizabthpazp";
 
export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/fav.png",
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: "https://blog-elizabthpazp.vercel.app/",
    siteName: sitename,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
      <body className="bg-[#17181C] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
