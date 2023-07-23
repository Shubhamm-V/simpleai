import React from 'react';
import { Button, Row } from 'antd';
import classes from './index.module.scss';
import Link from 'next/link';
type Props = {};

const Header = (props: Props) => {
  return (
    <Row className={`container ${classes.header}`}>
      <Link href="/">
        <div className={classes.logoWrapper}>
          <img src="/images/logo.png" className={classes.logo} />
          <h2>impleAI</h2>
        </div>
      </Link>
      <Link href="/auth/login">
        <Button className={classes.exploreButton} size="large" type="primary">
          Get Started
        </Button>
      </Link>
    </Row>
  );
};

export default Header;
