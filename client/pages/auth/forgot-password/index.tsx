import React, { Fragment, useState } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import classes from './index.module.scss';
import { ArrowLeftOutlined } from '@ant-design/icons';
import URL from '@/constants/url';
import { Helmet } from 'react-helmet';
import Link from 'next/link';
import axios from 'axios';
import openNotification from '@/components/utils/Notification';

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await axios.post(`${URL}/api/v1/users/forgotPassword`, values);
      setLoading(false);
      openNotification({
        type: 'info',
        message: 'Reset password Link is sent to email',
      });
    } catch (err: any) {
      openNotification({ type: 'error', message: err.response.data.message });
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <Helmet>Forgot Password</Helmet>
      <Row className={classes.forgotContainer}>
        <Col span={7} sm={10} xs={22} md={9} lg={7}>
          <h2>Reset Password</h2>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Link
              </Button>
            </Form.Item>
            <Link href="/auth/login">
              <label className="link">
                {' '}
                <ArrowLeftOutlined /> Go to Login
              </label>
            </Link>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ForgotPassword;
