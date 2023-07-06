import axios from 'axios';
import openNotification from '@/components/utils/Notification';

export const getVideoID = (url: string) => {
  var videoid = url.match(
    /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
  );
  if (videoid != null) {
    return videoid[1];
  } else {
    openNotification({
      type: 'info',
      message: 'Invalid URL',
    });
  }
};

export const getVideoSubtitles = async (url: string) => {
  const videoId = getVideoID(url);
  const options = {
    method: 'GET',
    url: process.env.SUBTITLE_API,
    params: {
      video_id: videoId,
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.SUBTITLE_HOST,
    },
  };
  const subtitles = (await axios(options)).data;
  return subtitles;
};

export const getSummary = async (text: string) => {
  const options = {
    method: 'POST',
    url: process.env.SUMMARY_API,
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.SUMMARY_HOST,
    },
    data: {
      input: text,
    },
  };
  const response = (await axios.request(options)).data.output[0].text;
  return response;
};
