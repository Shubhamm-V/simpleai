import { Button, Col, Form, Input, Row, Empty, Spin } from 'antd';
import { Configuration, OpenAIApi } from 'openai';
import React, { useState } from 'react';
import classes from './index.module.scss';
import openNotification from '@/components/utils/Notification';
import { Helmet } from 'react-helmet';
const GenerateAIImage = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');

  const onFinish = (values: { prompt: string }) => {
    const getImage = async () => {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      setLoading(true);
      try {
        const response = await openai.createImage({
          prompt: values.prompt,
          n: 1,
          size: '512x512',
        });
        console.log('response : ', response);
        const image_url: any = response.data.data[0].url;
        setImage(image_url);
        setLoading(false);
      } catch (err: any) {
        console.log('Error : ', err.response.code);
        openNotification({
          type: 'error',
          message: 'Prompt violating content policy',
        });
        setLoading(false);
      }
    };
    getImage();
  };

  return (
    <Row>
      <Helmet>
        <title>AI Image Generator</title>
      </Helmet>
      <Col span={24} className={classes.header}>
        <h1> Generate AI Image</h1>
      </Col>
      <Col span={24}>
        <Form
          onFinish={onFinish}
          layout="vertical"
          className={classes.promptForm}
        >
          <Form.Item
            label="Enter prompt"
            name="prompt"
            rules={[
              {
                required: true,
                message: 'Please enter prompt to generate image',
              },
            ]}
          >
            <Input
              placeholder="Enter prompt to generate image"
              className={classes.promptInput}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={classes.promptButton}
            >
              Generate Image
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={23} className={classes.imageContainer}>
        {loading && (
          <Spin className={classes.spin} size="large" tip="Generating Image" />
        )}
        <img src={image || '/images/utilis/ai-image.png'} />
        {/* <Empty className={classes.empty} description="No image" /> */}
        {image && (
          <Button className={`link ${classes.download}`} type="link">
            <a download="ai-image.jpg" href={image} title="ImageName">
              Download
            </a>
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default GenerateAIImage;
