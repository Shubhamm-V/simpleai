/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    SUBTITLE_HOST: process.env.RAPID_API_HOST,
    SUBTITLE_API: process.env.SUBTITLE_API,
    SUMMARY_HOST: process.env.SUMMARY_HOST,
    SUMMARY_API: process.env.SUMMARY_API,
    TRANSLATE_API: process.env.TRANSLATE_API,
    TRANSLATE_HOST: process.env.TRANSLATE_HOST,
    TEXT_TO_SPEACH_HOST: process.env.TEXT_TO_SPEECH_HOST,
    TEXT_TO_SPEECH_API: process.env.TEXT_TO_SPEECH_API,
    TEXT_TO_SPEECH_KEY: process.env.TEXT_TO_SPEECH_KEY,
    HASHTAG_API: process.env.HASHTAG_API,
    HASHTAG_HOST: process.env.HASHTAG_HOST,
  },
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
