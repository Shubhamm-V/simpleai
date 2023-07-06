import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Col, Row, Form, Input, Button, Divider } from 'antd';
import { loginWithGoogleFB } from '@/pages/api/auth/google-facebook-login';
import {
  LockOutlined,
  UserOutlined,
  GoogleOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import URL from '@/constants/url';
import classes from './index.module.scss';
import openNotification from '@/components/utils/Notification';
import { loginActions } from '@/redux/reducers/userReducer';

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/v1/users/login`, values);
      dispatch(loginActions.loginUser({ user: response.data }));

      form.resetFields();
      openNotification({ type: 'success', message: 'Login Successful' });
      router.push('/dashboard');
      console.log('Response:', response);
    } catch (error) {
      openNotification({ type: 'error', message: 'Something went wrong' });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const provider = sessionStorage.getItem('provider');
      if (provider === 'google') {
        loginWithGoogleFB(session, provider).then((res) => {
          if (res) {
            openNotification({ type: 'success', message: 'Login successful' });
            dispatch(loginActions.loginUser({ user: res.data }));
            router.push('/dashboard');
          }
        });
      } else if (provider === 'facebook') {
        loginWithGoogleFB(session, provider).then((res) => {
          if (res) {
            openNotification({ type: 'success', message: 'Login successful' });
            dispatch(loginActions.loginUser({ user: res.data }));
            router.push('/dashboard');
          }
        });
      }
    }
  }, [session]);

  const handleGoogleLogin = async () => {
    sessionStorage.setItem('provider', 'google');
    await signIn('google');
  };
  const handleFacebookLogin = async () => {
    sessionStorage.setItem('provider', 'facebook');
    await signIn('facebook');
  };

  return (
    <Row>
      <Col md={12}>
        <img
          className={classes.loginImage}
          src="/images/auth-images/login-image.webp"
        />
      </Col>
      <Col xs={24} md={12} lg={12} className={classes.formContainer}>
        <div></div>
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          className={classes.loginForm}
          // initialValues={{ remember: true }}
        >
          <h1 className={classes.loginHeader}>
            Login with <span>SimpleAI</span>
          </h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              loading={isLoading}
            >
              Log In
            </Button>
          </Form.Item>
          <a
            href=""
            className={`link ${classes.forgotLink}`}
            style={{ textAlign: 'right' }}
          >
            Forgot password?
          </a>
        </Form>
        <div className={classes.loginForm}>
          <Divider className={classes.loginDivider}>OR</Divider>
          <Row className={classes.loginWithContainer}>
            <Col span={12}>
              <Button
                type="primary"
                className={classes.loginWithButtons}
                onClick={handleGoogleLogin}
              >
                <i>
                  <GoogleOutlined />
                </i>
                Google
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                className={classes.loginWithButtons}
                onClick={handleFacebookLogin}
              >
                {' '}
                <i>
                  <FacebookOutlined />
                </i>
                Facebook
              </Button>
            </Col>
          </Row>
        </div>
        <div className={classes.signInSection}>
          <p>
            Don't Have an Account?
            <Link href="/auth/signup">
              <span className="link">Sign Up</span>
            </Link>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
