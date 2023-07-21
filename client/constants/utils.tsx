import {
  BookFilled,
  BookOutlined,
  FileImageOutlined,
  InstagramFilled,
  YoutubeFilled,
} from '@ant-design/icons';

export const TRANSLATION_STEPS = [
  {
    id: 1,
    text: '1.  Go to Youtube and copy the link of the video which you want to translate',
  },
  {
    id: 2,
    text: '2.  Paste link of the video in above input box and choose language for translation',
  },
  {
    id: 3,
    text: '3.  Click on translate button to get translation in both audio and text format',
  },
  {
    id: 4,
    text: ' 4.  It may take up to 20 Sec to 1 Min to generate audio with your required language',
  },
];

export const SUMMARIZE_STEPS = [
  {
    id: 1,
    text: '1.  Open article which you waan to summarize in browser',
  },
  {
    id: 2,
    text: '2.  Copy link of the article and paste it in above input box',
  },
  {
    id: 2,
    text: '3.  Click on Summarize and your key points will be ready.',
  },
];

export const FEATURES = [
  {
    title: 'AI Video Translation',
    description:
      'Translate english youtube video in 10+ languages with audio format',
    icon: <YoutubeFilled className="featureIcons" />,
  },
  {
    title: 'AI Hashtags',
    description: 'Generate most trending hashtags by uploading your image',
    icon: <InstagramFilled className="featureIcons" />,
  },
  {
    title: 'AI Text Summarizer',
    description:
      'Convert your large articles/text into 4-5 lines of summarized text',
    icon: <BookFilled className="featureIcons" />,
  },
  {
    title: 'AI Post Generator',
    description:
      'Generate any social media post by adding prompt for the image',
    icon: <InstagramFilled className="featureIcons" />,
  },
];

export const DASH_FEATURES = [
  {
    title: 'AI Video Translation',
    icon: <YoutubeFilled className="dashFeatureIcon" />,
    path: '/youtube/translate_video',
  },
  {
    title: 'AI Hashtag Generator',
    icon: <InstagramFilled className="dashFeatureIcon" />,
    path: '/social_media/generate_hashtags',
  },
  {
    title: 'AI Text Summarizer',
    icon: <BookOutlined className="dashFeatureIcon" />,
    path: '/ai_summarizar',
  },
  {
    title: 'AI Image Generator',
    icon: <FileImageOutlined className="dashFeatureIcon" />,
    path: '/social_media/generate_ai_image',
  },
];
