const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://simpleai.onrender.com';

export default URL;
