/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_HOST: process.env.RAPID_API_HOST,
    SUMMARIZE_URL: process.env.SUMMARIZE_URL,
    OPENAPI_KEY: process.env.SUMMARIZE_URL,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
