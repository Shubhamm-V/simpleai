import {
  YoutubeOutlined,
  InstagramOutlined,
  BookOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';

export const SIDE_MENU_ITEMS = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    title: 'Dashboard',
  },
  {
    key: 'youtube',
    icon: <YoutubeOutlined />,
    title: 'Youtube',
    children: [
      {
        key: 'translate_video',
        title: 'AI Video Translation',
      },
    ],
  },

  {
    key: 'social_media',
    icon: <InstagramOutlined />,
    title: 'Social Media',
    children: [
      {
        key: 'generate_hashtags',
        title: 'Generate Hashtags',
      },
      {
        key: 'generate_ai_image',
        title: 'AI Image Generator',
      },
    ],
  },
  {
    key: 'ai_summarizar',
    icon: <BookOutlined />,
    title: 'AI Summarizer',
  },
];
