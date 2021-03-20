const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  assetPrefix: '.',
  env: {
    REQUIRED_CHAIN_ID: 4,
  },
});
