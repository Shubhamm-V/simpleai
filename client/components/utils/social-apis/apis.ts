import axios from 'axios';
export const getHashTags = async (image: any) => {
  const options = {
    method: 'POST',
    url: process.env.HASHTAG_API,
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.HASHTAG_HOST,
    },
    data: {
      image,
    },
  };
  const response = (await axios.request(options)).data.tags;
  return response;
};
