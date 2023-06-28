import React from 'react';
import classes from './index.module.scss';
import { Row, Col, Button } from 'antd';
import HomeBackground from './HomeBackground';

const Banner = () => {
  return (
    <div>
      <HomeBackground />
      <div className={`${classes.banner}`}>
        <Row className={classes.content}>
          <Col span={13} md={13} sm={24} xs={24} className={classes.info}>
            <h2>AI SIMPLIFIER</h2>
            <h1>
              Simplify&nbsp;
              <span className={classes.title}>
                ARTIFICIAL INTELLIGENCE
              </span>{' '}
              with SimpleAI
            </h1>
            <p className={classes.detail}>
              Access tools which improves your experience with AI and save your
              damn time
            </p>
            <Row style={{ gap: '1rem', marginTop: '0.5rem' }}>
              {/* <Col span={16} sm={16} xs={24}>
              <Input size="large" placeholder="Enter Your Email Address" />
            </Col> */}
              <Col span={7} sm={7} xs={24}>
                <Button
                  size="large"
                  type="primary"
                  className={classes.featureButton}
                >
                  Explore Tools
                </Button>
              </Col>
              <Col span={7} sm={7} xs={24}>
                <Button
                  size="large"
                  type="primary"
                  className={classes.learnMoreButton}
                >
                  Learn More
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={11} sm={11} xs={24} className={classes.bannerImage}>
            <img src="images/ai-images/ai-image-1.gif" alt="banner" />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Banner;
