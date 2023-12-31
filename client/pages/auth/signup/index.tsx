import React, { useState, useEffect } from 'react';
import classes from './index.module.scss';
import { Col, Row, Form, Input, Button, Divider } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import openNotification from '@/components/utils/Notification';
import { loginWithGoogleFB } from '@/pages/api/auth/google-facebook-login';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '@/redux/reducers/userReducer';
import URL from '@/constants/url';
import { Helmet } from 'react-helmet';
import { GUEST_LOGIN_DATA } from '@/components/utils/demoLogin';
type Props = {};

const SignupForm: React.FC = (props: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  // Sign UP
  const onFinish = async (values: any) => {
    console.log('Success:', values);
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/v1/users/signup`, values);
      setIsLoading(false);
      form.resetFields();
      dispatch(loginActions.loginUser({ user: response.data }));
      openNotification({ type: 'success', message: 'Signup Successful' });
      router.push('/dashboard');
      console.log('Response:', response);
    } catch (error: any) {
      const message = error.response.data.message;
      if (message.startsWith('User validation failed: confirmPassword'))
        openNotification({
          type: 'error',
          message: "Password and confirm password doesn't match",
        });
      else openNotification({ type: 'error', message: 'Something went wrong' });
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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

  return (
    <Row>
      <Helmet>
        <title>SimpleAI - Sign Up</title>
      </Helmet>
      <Col xs={24} md={13} lg={13} className={classes.signupContainer}>
        <Form
          name="signup-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={classes.signupForm}
        >
          <h1 className={classes.signupHeader}>
            Sign Up with
            <Link href="/">
              <span>SimpleAI</span>
            </Link>
          </h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter email' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter password' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please enter confirm password',
              },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%' }}
              loading={isLoading}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
        <div className={classes.signupForm}>
          <Divider className={classes.signupDivider}>OR</Divider>
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
            Already Have a Account?
            <Link href="/auth/login">
              <span className="link">Sign In</span>
            </Link>
          </p>
        </div>
      </Col>

      <Col span={11} style={{ maxHeight: '100vh' }}>
        <img
          src="/images/auth-images/sign-up.png"
          className={classes.signupImage}
        />
      </Col>
    </Row>
  );
};

export default SignupForm;
