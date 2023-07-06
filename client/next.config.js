/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    SUBTITLE_HOST: process.env.RAPID_API_HOST,
    SUBTITLE_API: process.env.SUBTITLE_API,
    SUMMARY_HOST: process.env.SUMMARY_HOST,
    SUMMARY_API: process.env.SUMMARY_API,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
