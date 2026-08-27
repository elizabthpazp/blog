import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import Script from "next/script";
import "../../styles/globals.css"
import { Providers } from "./providers";
import { i18n, Locale } from '../../i18n-config'
import { links } from '../../links-web'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

export async function generateStaticParams(): Promise<{ lang: Locale }[]> {
  return i18n.locales.map((locale) => ({ lang: locale as Locale }))
}

let title = "elizabthpazp | Frontend, JavaScript, CSS, TypeScript, Vue, React";
let description = "Learn about Web Development with me | Articles, videos, resources and tutorials on Web Development, Frontend, JavaScript, CSS, TypeScript, Vue and React";
let ogimage = links.logo;
let sitename = links.username;

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
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

export default async function RootLayout({ children, params }: any) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams?.lang ?? 'es'} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&family=Fira+Code:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="FKs04hcaiO7XyuBg9sogiZE3Hctm1YFcscQteeDZvIM" />
        <meta name="google-adsense-account" content="ca-pub-7738434269106493"></meta>
      </head>
      <body className="bg-[#ffffff] dark:bg-[#0b0d14] text-gray-900 dark:text-[#e8e8f0] font-sans antialiased selection:bg-violet-500/30 selection:text-violet-400 min-h-screen supports-[min-height:100svh]:min-h-[100svh] transition-colors duration-200">
        <Providers>
          {children}

          {/* BMC widget deferido para no bloquear scroll en mobile */}
          <Script
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="elizabethpH"
            data-description="Support me on Buy me a pizza!"
            data-message="Thank you so much for helping me keep creating content! 💜"
            data-color="#7c3aed"
            data-position="Right"
            data-x_margin="19"
            data-y_margin="15"
            strategy="lazyOnload"
          />

          <GoogleAnalytics gaId="G-92CHRN38WP" />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
