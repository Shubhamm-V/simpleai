import { Row } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import classes from './index.module.scss';
import FeatureCard from './FeatureCard';
import { DASH_FEATURES } from '@/constants/utils';
type Props = {};

const Dashboard = (props: Props) => {
  const userInfo = useSelector((state: any) => state.userReducer.user);
  const user = userInfo.data.user;
  console.log('User: ', user);
  return (
    <div className={classes.cardDiv}>
      <h1> Available AI Tools</h1>
      <Row className={classes.cardContainer}>
        {DASH_FEATURES.map((feature: any, ind) => (
          <FeatureCard
            key={ind}
            icon={feature.icon}
            title={feature.title}
            path={feature.path}
          />
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
