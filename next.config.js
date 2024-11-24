/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
  },
  images: {
    domains: ['https://blog-elizabthpazp.vercel.app'],//domains: ["upcdn.io", "replicate.delivery"],
  },
  // i18n: { 
  //   locales: ['en', 'es'], 
  //   defaultLocale: 'en',
  //   //localeDetection: true,
  // },
};
//npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000 