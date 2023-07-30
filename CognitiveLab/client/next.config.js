/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    server_url: process.env.SERVER_URL,
  },
};

module.exports = nextConfig;
