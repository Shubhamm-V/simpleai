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
    key: '1',
    icon: <UserOutlined />,
    title: 'Dashboard',
  },
  {
    key: 'sub1',
    icon: <PieChartOutlined />,
    title: 'Charts',
    children: [
      {
        key: '2',
        title: 'Chart 1',
      },
      {
        key: '3',
        title: 'Chart 2',
      },
    ],
  },
  // Add more menu items dynamically
];
