const URL = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  } else {
    return 'https://simpleai.onrender.com';
  }
};

export default URL;
