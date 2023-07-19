import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import SummarizeByText from './SummarizeByText';
import SummarizeByUrl from './SummarizeByUrl';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Summarize Using URL`,
    children: <SummarizeByUrl />,
  },
  {
    key: '2',
    label: `Summarize Using Text`,
    children: <SummarizeByText />,
  },
];

const App: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);

export default App;
