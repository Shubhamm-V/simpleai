const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://simpleai.onrender.com';

export default URL;

export const IGONRE_WRAPPER_PAGES = [
  '/',
  '/signup',
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/learn-more',
];
