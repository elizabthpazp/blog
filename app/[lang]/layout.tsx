import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../../styles/globals.css"
import { Providers } from "./providers";
import { i18n, Locale } from '../../i18n-config'
import { links } from '../../links-web' 

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
} 

let title = "Learn about Web Development with me";
let description = "It doesn't matter if you are just starting out or you are an expert, there is always something new that you can learn and I would really like to be able to share it with you.";
let ogimage = links.logo;
let sitename = links.username;
 
export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: links.icon,
  },
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
      <body className="light:bg-[#4D4D4D] light:text-black dark:bg-[#17181C] dark:text-white">
        <Providers>
         {children} 
         
         <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="elizabethpH" data-description="Support me on Buy me a pizza!" data-message="Thank you so much for helping me keep creating content! 💜" data-color="rgb(124 58 237)" data-position="Right" data-x_margin="19" data-y_margin="15"></script>
        </Providers>
        <Analytics /> 
      </body>
    </html>
  );
}
