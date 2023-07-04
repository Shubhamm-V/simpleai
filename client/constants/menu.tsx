import { UserOutlined, PieChartOutlined } from '@ant-design/icons';

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
    icon: <PieChartOutlined />,
    title: 'Youtube',
    children: [
      {
        key: 'summarize_video',
        title: 'Summarize Video',
      },
      {
        key: 'extract_subtitles',
        title: 'Extract Subtitles',
      },
      {
        key: 'extract_audio',
        title: 'Extract Audio',
      },
    ],
  },
  // Add more menu items dynamically
];
