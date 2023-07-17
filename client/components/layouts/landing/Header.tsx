import React from 'react';
import { Button, Row } from 'antd';
import classes from './index.module.scss';
import Link from 'next/link';
type Props = {};

const Header = (props: Props) => {
  return (
    <Row className={`container ${classes.header}`}>
      <h2>SimpleAI</h2>
      <Link href="/auth/signup">
        <Button className={classes.exploreButton} size="large" type="primary">
          Get Started
        </Button>
      </Link>
    </Row>
  );
};

export default Header;
