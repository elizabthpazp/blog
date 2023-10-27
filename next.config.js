/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    //domains: ["upcdn.io", "replicate.delivery"],
  },
  // i18n: { 
  //   locales: ['en', 'es'], 
  //   defaultLocale: 'en',
  //   //localeDetection: true,
  // },
};
//npx local-ssl-proxy --key localhost-key.pem --cert localhost.pem --source 3001 --target 3000 