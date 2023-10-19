import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";

//META TAGSSSSSSSSSSSSSSSSSSSSSSS

let title = "Learn about Web Development with me";
let description = "It doesn't matter if you are just starting out or you are an expert, there is always something new that you can learn and I would really like to be able to share it with you.";
let ogimage = "./fav.png";
let sitename = "elizabthpazp.io";
 
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
    url: "https://elizabthpazp.io",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
