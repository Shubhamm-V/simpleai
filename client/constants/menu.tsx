import { UserOutlined, YoutubeOutlined } from '@ant-design/icons';

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
];
