import React, { useState } from 'react';
import { Row, Col, Button, Input, Divider, Card } from 'antd';
import classes from './index.module.scss';
import axios from 'axios';
import openNotification from '@/components/utils/Notification';
import {
  getSummary,
  getVideoSubtitles,
} from '../../../components/utils/youtube-apis/apis';
type Props = {};

const SummarizeVideo = (props: Props) => {
  const [url, setURL] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarizeVideo = async () => {
    setLoading(true);
    const subtitles = await getVideoSubtitles(url);
    const summary = await getSummary(subtitles);
    setSummary(subtitles);
    console.log('summary : ', summary);
    setLoading(false);
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
        <Button type="primary" onClick={summarizeVideo} loading={loading}>
          Summarize
        </Button>
      </Col>
      <Col span={24}>
        <Card className={classes.summaryCard}>
          {summary ? (
            <div className={classes.summary}>{summary}</div>
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
