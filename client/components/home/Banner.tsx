import React from 'react';
import classes from './index.module.scss';
import { Row, Col, Button } from 'antd';
import HomeBackground from './HomeBackground';
import Link from 'next/link';

const Banner = () => {
  return (
    <div>
      <HomeBackground />
      <div className={`${classes.banner}`}>
        <Row className={classes.content}>
          <Col span={18} sm={18} xs={24} className={classes.info}>
            {/* <h2>AI SIMPLIFIER</h2> */}
            <h1>
              Simplify <span>Use of</span>
              <span className={classes.title}>
                ARTIFICIAL INTELLIGENCE
              </span>{' '}
            </h1>
            <p className={classes.detail}>
              SimpleAI provides various AI tools which improves your experience
              with youtube, social media and browsers.
            </p>
            <div className={classes.buttonContainer}>
              {/* <Col span={16} sm={16} xs={24}>
              <Input size="large" placeholder="Enter Your Email Address" />
            </Col> */}
              <Col span={11} sm={16} xs={24}>
                <a href="#features">
                  <Button
                    size="large"
                    type="primary"
                    className={classes.featureButton}
                  >
                    Explore Tools
                  </Button>
                </a>
              </Col>
              <Col span={11} sm={16} xs={24}>
                <Link href="/learn-more">
                  <Button
                    size="large"
                    type="primary"
                    className={classes.learnMoreButton}
                  >
                    Learn More
                  </Button>
                </Link>
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
