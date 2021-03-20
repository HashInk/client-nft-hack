const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  reactStrictMode: true,
  assetPrefix: '.',
  env: {},
});
