import {
  UserOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

export const MENU_ITEMS = [
  {
    label: 'Home',
    key: '/',
  },
  {
    label: 'Features',
    key: 'pages/attendance',
  },
];

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
    title: 'Social Mediaa',
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
];
