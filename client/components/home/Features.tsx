import { FEATURES } from '@/constants/utils';
import { YoutubeFilled } from '@ant-design/icons';
import { Col, Row, Card } from 'antd';
import classes from './index.module.scss';
import React from 'react';

type Props = {};

const Features = (props: Props) => {
  return (
    <div>
      <Row className={classes.featureContainer}>
        {FEATURES.map(
          (
            features: { title: string; description: string; icon: any },
            ind
          ) => (
            <Col span={5} lg={5} md={11} sm={11} xs={23}>
              <Card className={classes.featureCard}>
                {features.icon}
                <h2>{features.title}</h2>
                <p>{features.description}</p>
              </Card>
            </Col>
          )
        )}
      </Row>
    </div>
  );
};

export default Features;
