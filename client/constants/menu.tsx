import {
  UserOutlined,
  YoutubeOutlined,
  InstagramOutlined,
  BookOutlined,
} from '@ant-design/icons';

export const SIDE_MENU_ITEMS = [
  {
    key: 'dashboard',
    icon: <UserOutlined />,
    title: 'Dashboard',
  },
  {
    key: 'youtube',
    icon: <YoutubeOutlined />,
    title: 'Youtube',
    children: [
      {
        key: 'translate_video',
        title: 'AI Translation',
      },
      {
        key: 'ai_description',
        title: 'AI Description',
      },
    ],
  },

  {
    key: 'social_media',
    icon: <InstagramOutlined />,
    title: 'Social Media',
    children: [
      {
        key: 'generate_ai_image',
        title: 'AI Image Generator',
      },
      {
        key: 'generate_hashtags',
        title: 'Generate Hashtags',
      },
    ],
  },
  {
    key: 'ai_summarizar',
    icon: <BookOutlined />,
    title: 'AI Summarizer',
  },
];
