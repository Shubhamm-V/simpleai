import axios from 'axios';
export const getHashTags = async (image: any) => {
  const options = {
    method: 'POST',
    url: 'https://hashtag5.p.rapidapi.com/api/v2.1/tag/generate',
    headers: {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '9f1f0b5688mshe1cb04990abc88fp1ede6ajsn8cb8b6e5313c',
      'X-RapidAPI-Host': 'hashtag5.p.rapidapi.com',
    },
    data: {
      image,
    },
  };
  const response = (await axios.request(options)).data.tags;
  return response;
};
