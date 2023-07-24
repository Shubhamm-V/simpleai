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
import { Helmet } from 'react-helmet';
import { GUEST_LOGIN_DATA } from '@/components/utils/demoLogin';

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/v1/users/login`, values);
      dispatch(loginActions.loginUser({ user: response.data }));

      form.resetFields();
      openNotification({ type: 'success', message: 'You are logged in' });
      router.push('/dashboard');
      console.log('Response:', response);
    } catch (err: any) {
      openNotification({ type: 'error', message: err.response.data.message });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      const provider = sessionStorage.getItem('provider');
      if (provider === 'google' && renderCount == 0) {
        loginWithGoogleFB(session, provider).then((res) => {
          if (res) {
            dispatch(loginActions.loginUser({ user: res.data }));
            router.push('/dashboard');
            sessionStorage.clear();
          }
        });
      } else if (provider === 'facebook' && renderCount == 0) {
        loginWithGoogleFB(session, provider).then((res) => {
          if (res) {
            dispatch(loginActions.loginUser({ user: res.data }));
            router.push('/dashboard');
            sessionStorage.clear();
          }
        });
      }
      setRenderCount(1);
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

  const handleGuestLogin = async () => {
    form.setFieldValue('email', GUEST_LOGIN_DATA.email);
    form.setFieldValue('password', GUEST_LOGIN_DATA.password);
    await onFinish(GUEST_LOGIN_DATA);
  };

  return (
    <Row>
      <Helmet>
        <title>SimpleAI - Login</title>
      </Helmet>
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
            Login with{' '}
            <Link href="/">
              <span>SimpleAI</span>
            </Link>
          </h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your Email' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your Password' }]}
          >
            <Input.Password
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
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/auth/forgot-password">
              <div className={`link ${classes.forgotLink}`}>
                Forgot password?
              </div>
            </Link>
          </div>
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
        <div className="guestLogin" onClick={handleGuestLogin}>
          <p>
            <span className="link">Login as a Guest</span>
          </p>
        </div>
        {isLoading && (
          <p style={{ color: '#f1f1f1' }}>
            Login may take upto 1 min as I using free hosting service
          </p>
        )}
      </Col>
    </Row>
  );
};

export default Login;
