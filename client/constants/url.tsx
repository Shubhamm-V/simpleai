const URL = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.API_BASE_URL_DEV;
  } else {
    return process.env.API_BASE_URL_PROD;
  }
};

export default URL;
