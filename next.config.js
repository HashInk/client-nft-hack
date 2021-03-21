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
    PINATA_API_KEY: '241847657270ee133729',
    PINATA_API_SECRET:
      'fdf11ad37dadb227e24c89d3684d1dbf609f58f930d01cdbfed048730f05d1d4',
    PINATA_JWT:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYzEwMWNlZS1lYTU0LTQ5NWMtODc1Ni1kZmM0YmJjNGI3MjAiLCJlbWFpbCI6ImJyZW5maWZlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyNDE4NDc2NTcyNzBlZTEzMzcyOSIsInNjb3BlZEtleVNlY3JldCI6ImZkZjExYWQzN2RhZGIyMjdlMjRjODlkMzY4NGQxZGJmNjA5ZjU4ZjkzMGQwMWNkYmZlZDA0ODczMGYwNWQxZDQiLCJpYXQiOjE2MTYyNTk3MTh9.CKuL_b9871eaafeGy_jUTXhmfPTUotLN_bOGhhAovng',
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
});
