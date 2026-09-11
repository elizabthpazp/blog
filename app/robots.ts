import type { MetadataRoute } from "next";
import { links } from "../links-web";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${links.domain}/sitemap.xml`,
  };
}
