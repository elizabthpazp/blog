import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../../styles/globals.css"
import { Providers } from "./providers";
import { i18n, Locale } from '../../i18n-config'
import { links } from '../../links-web'  
import { GoogleAnalytics } from '@next/third-parties/google'

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({origin: true}))
app.use(express.json())

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
} 

let title = "elizabthpazp | Frontend, JavaScript, CSS, TypeScript, Vue, React";
let description = "Learn about Web Development with me | Articles, videos, resources and tutorials on Web Development, Frontend, JavaScript, CSS, TypeScript, Vue and React";
let ogimage = links.logo;
let sitename = links.username;
 
export const metadata: Metadata = { 
  title,
  description,
  icons: {
    icon: links.icon,
  },  
  keywords: 'blog, desarrollo web, marketing digital, elizabthpazp, seo, web, programación, curso, web development, frontend, developer, desarrollador',
  openGraph: {  
    images: [ogimage],
    title,
    description,
    url: links.domain,
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
  children: React.ReactNode;  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang}>
      <head> 
       <meta name="google-site-verification" content="FKs04hcaiO7XyuBg9sogiZE3Hctm1YFcscQteeDZvIM" />
      </head>
      <body className="light:bg-[#4D4D4D] light:text-black dark:bg-[#17181C] dark:text-white">
        <Providers>
         {children} 
         
         <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="elizabethpH" data-description="Support me on Buy me a pizza!" data-message="Thank you so much for helping me keep creating content! 💜" data-color="rgb(124 58 237)" data-position="Right" data-x_margin="19" data-y_margin="15"></script>
         {/* <script defer src="https://app.embed.im/snow.js"></script> */}  
         <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7738434269106493"
     crossorigin="anonymous"></script>
         <GoogleAnalytics gaId="G-92CHRN38WP" />
        </Providers>
        <Analytics /> 
      </body>
    </html>
  );
}
