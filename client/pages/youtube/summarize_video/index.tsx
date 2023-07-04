import React, { useState } from 'react';
import { Row, Col, Button, Input, Divider, Card } from 'antd';
import classes from './index.module.scss';
import axios from 'axios';
type Props = {};

const SummarizeVideo = (props: Props) => {
  const [url, setURL] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizeVideo = async () => {
    const options = {
      method: 'GET',
      url: process.env.SUMMARIZE_URL,
      params: {
        url,
        key: process.env.OPENAPI_KEY,
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
      },
    };

    const response = await axios(options);
    console.log('Response : ', response);
  };
  return (
    <Row>
      <Col span={24} className={classes.summarizeHeader}>
        <h2>Summarize Youtube Video</h2>
        <Button type="primary" className="sub-primary-button" size="large">
          Video Summaries
        </Button>
      </Col>
      <Divider className={classes.divider} />
      <Col span={24} className={classes.summarizeBody}>
        <Input
          placeholder="Enter Youtube URL"
          className={classes.input}
          onChange={(e) => setURL(e.target.value)}
        />
        <Button type="primary" onClick={summarizeVideo}>
          Summarize
        </Button>
      </Col>
      <Col span={24}>
        <Card className={classes.summaryCard}>
          {summary ? (
            <div>{summary}</div>
          ) : (
            <div>
              <h2>How it works?</h2>
              <ul>
                <li>Go to Youtube Video</li>
                <li>Copy Video Link</li>
                <li>
                  Paste it above
                  <li>Hit 'Summarize' Button</li>
                </li>
              </ul>
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default SummarizeVideo;
