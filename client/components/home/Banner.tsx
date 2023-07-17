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
          <Col span={18} className={classes.info}>
            <h2>AI SIMPLIFIER</h2>
            <h1>
              Simplify&nbsp;
              <span className={classes.title}>
                ARTIFICIAL INTELLIGENCE
              </span>{' '}
            </h1>
            <p className={classes.detail}>
              SimpleAI provides tools which improves your experience with AI and
              save your damn time
            </p>
            <div className={classes.buttonContainer}>
              {/* <Col span={16} sm={16} xs={24}>
              <Input size="large" placeholder="Enter Your Email Address" />
            </Col> */}
              <Col span={11} sm={16} xs={24}>
                <Button
                  size="large"
                  type="primary"
                  className={classes.featureButton}
                >
                  Explore Tools
                </Button>
              </Col>
              <Col span={11} sm={16} xs={24}>
                <Button
                  size="large"
                  type="primary"
                  className={classes.learnMoreButton}
                >
                  Learn More
                </Button>
              </Col>
            </div>
          </Col>
          {/* <Col span={11} sm={11} xs={24} className={classes.bannerImage}>
            <img src="images/ai-images/ai-image-1.gif" alt="banner" />
          </Col> */}
        </Row>
      </div>
    </div>
  );
};

export default Banner;
