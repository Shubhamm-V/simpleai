import { BookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons';

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

export const STEPS = [
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
