// eslint-disable-next-line @typescript-eslint/no-var-requires
// const baseNextConfig = require('next/config');
// const compose = require('next-compose-plugins');
// const { optional } = require('next-compose-plugins');
// const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

const dev = process.env.NODE_ENV === 'development';

/* plugins */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: dev,
  register: true,
  runtimeCaching,
});
const modules = require('next-transpile-modules')([
  '@bbnpolls/forms',
  '@bbnpolls/api',
  '@bbnpolls/chain',
  '@project/shared',
  '@bbnpolls/jazzicon',
]);

/** @type {import('next').NextConfig} */
const baseConfig = {
  swcMinify: true,
  reactStrictMode: true,
};

/** @type {import('next').NextConfig} */
module.exports = withPWA(
  modules({
    ...baseConfig,
    compiler: {
      /* remove console in production except errors */
      removeConsole: dev
        ? false
        : {
            exclude: ['error'],
          },
    },
  })
);
