/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const env = {
  APP_URL: process.env.APP_URL,
  API_BASEURL: process.env.API_BASEURL,
  CDN_CSS: process.env.CDN_CSS,

  REACT_APP_ENV: process.env.REACT_APP_ENV,

  REACT_APP_BASEURL: process.env.REACT_APP_BASEURL,
  REACT_APP_API_BASEURL: process.env.REACT_APP_API_BASEURL,

  REACT_APP_APP_NAME: process.env.REACT_APP_APP_NAME,
  REACT_APP_PARENT_DOMAIN: process.env.REACT_APP_PARENT_DOMAIN,

  REACT_APP_SOCIAL_TELEGRAM: process.env.REACT_APP_SOCIAL_TELEGRAM,
  REACT_APP_SOCIAL_DISCORD: process.env.REACT_APP_SOCIAL_DISCORD,
  REACT_APP_SOCIAL_TWITTER: process.env.REACT_APP_SOCIAL_TWITTER,

  REACT_APP_PLACEHOLDER_PROFILE_PICTURE:
    process.env.REACT_APP_PLACEHOLDER_PROFILE_PICTURE,
  NPM_TOKEN: process.env.NPM_TOKEN,
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  env,
});
