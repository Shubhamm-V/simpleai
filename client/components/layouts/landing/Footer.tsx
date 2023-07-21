import { Row } from 'antd';
import React from 'react';
import classes from './index.module.scss';
type Props = {};

const Footer = (props: Props) => {
  return (
    <Row className={classes.footer}>
      <p>Copyright © 2023 SimpleAI</p>
    </Row>
  );
};

export default Footer;
