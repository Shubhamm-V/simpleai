import { Button, Col, Form, Input, Row, Empty, Spin } from 'antd';
import React from 'react';
import classes from './index.module.scss';
const GenerateAIImage = () => {
  const onFinish = () => {};
  const onFinishFailed = () => {};
  return (
    <Row>
      <Col span={24} className={classes.header}>
        <h1> Generate AI Image</h1>
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
      <Col span={24}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ width: '100%' }}
        >
          <Row className={classes.promptHeader}>
            <Form.Item
              style={{ width: '90%' }}
              name="prompt"
              rules={[{ required: true, message: 'Please enter prompt' }]}
            >
              <Input
                className={classes.input}
                placeholder="Enter prompt to generate AI Image"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ paddingInline: '1.5rem' }}
              >
                Generate
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default GenerateAIImage;
