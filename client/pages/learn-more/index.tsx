import React from 'react';
import classes from './index.module.scss';
import { Button, Col, Row } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
type Props = {};

const LearnMore = (props: Props) => {
  return (
    <Row className={classes.infoWrapper}>
      <Col className={classes.infoContainer} span={14} sm={16} lg={14} xs={20}>
        <h2 style={{ textAlign: 'center', paddingBlock: '2rem' }}>
          What is <span>SimpleAI ?</span>
        </h2>
        <p>
          SimpleAI provides solutions to various real life problems with the
          help of artificial intelligence. It contains various AI tools which
          makes life of people much easier and allow them to access and use
          youtube and social media with much flexibelity. It's completely free
          and You can Login as Guest, if you don't want to signup.
        </p>
        <strong>SimpleAI includes tools like : </strong>
        <h3>AI Video Translation</h3>
        <p>
          It allows users to translate any english video on youtube in their
          respective language in both audio and text format. User just have to
          paste link of Youtube URL and choose the language and SimpleAI will do
          the rest of work.
        </p>
        <h3>AI Hashtag Generator</h3>
        <p>
          This tools takes image from user and generate most trending hashtags
          respective to that image by by automatically detecting content of that
          image and user can copy and paste those hashtags with their social
          media post.
        </p>
        <h3>AI Summarizer</h3>
        <p>
          User can summarize any long article present on browser or any long
          text and summarize it with important key points. It reads the data in
          content and with the help of AI provides important key points which
          can save lots of time.
        </p>
        <h3>AI Image Generator</h3>
        <p>
          It allows user to generate an image just by adding prompt. Image is
          generate with 512x512 dimensions. User can download image too. This
          tool uses OpenAI's DALL-E API for image generation.
        </p>
      </Col>
      <Button type="link" className={`link ${classes.goBack}`}>
        <ArrowLeftOutlined />
        Go Back
      </Button>
    </Row>
  );
};

export default LearnMore;
