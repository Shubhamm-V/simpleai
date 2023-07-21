import React from 'react';
import { Card, Col } from 'antd';
import classes from './index.module.scss';
import { YoutubeFilled, YoutubeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
type Props = {
  icon: string;
  title: string;
  path: string;
};

const FeatureCard = (props: Props) => {
  const router = useRouter();
  const moveToFeature = () => {
    router.push(props.path);
  };
  return (
    <Col span={18} md={9}>
      <Card
        className={classes.card}
        bodyStyle={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        onClick={moveToFeature}
      >
        {props.icon}
        <h2>{props.title}</h2>
      </Card>
    </Col>
  );
};

export default FeatureCard;
