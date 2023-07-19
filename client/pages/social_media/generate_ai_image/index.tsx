import { Button, Col, Form, Input, Row, Empty, Spin } from 'antd';
import { Configuration, OpenAIApi } from 'openai';
import React, { useState } from 'react';
import classes from './index.module.scss';
const GenerateAIImage = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: { prompt: string }) => {
    const getImage = async () => {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: values.prompt,
        n: 1,
        size: '256x256',
      });
    };
  };
  return (
    <Row>
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
        {/* <Spin className={classes.spin} size="large" tip="Generating Image" /> */}

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_pkM_rS8KU4a6VtRNXTukSpfCCtodto1ww&usqp=CAU" />
        {/* <Empty className={classes.empty} description="No image" /> */}
        <Button className={`link ${classes.download}`} type="link">
          <a
            download="custom-filename.jpg"
            href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk_pkM_rS8KU4a6VtRNXTukSpfCCtodto1ww&usqp=CAU"
            title="ImageName"
          >
            Download
          </a>
        </Button>
      </Col>
    </Row>
  );
};

export default GenerateAIImage;
