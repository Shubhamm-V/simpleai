import React, { Fragment } from 'react';
import { useState } from 'react';
import { Form, Button, Input, Card } from 'antd';
import classes from './index.module.scss';
import openNotification from '@/components/utils/Notification';
import { getSummaryByText } from '@/components/utils/youtube-apis/apis';
import { SUMMARIZE_STEPS } from '@/constants/steps';
import Paragraph from '@/components/text/Paragraph';

type Props = {};

function isValidUrl(url: string) {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(url);
}

const SummarizeByUrl = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [summaryPoints, setSummaryPoints] = useState([]);
  const onFinish = (values: any) => {
    if (!isValidUrl(values.url)) {
      openNotification({ type: 'info', message: 'Please enter valid URL' });
      return;
    }
    const getSummary = async () => {
      setLoading(true);
      try {
        const summary = await getSummaryByText(values.url, 'url');
        setSummaryPoints(summary);
        setLoading(false);
      } catch (err) {
        openNotification({
          type: 'error',
          message: 'Article not found with given URL',
        });
        setLoading(false);
      }
    };
    getSummary();
  };
  return (
    <Fragment>
      <Form onFinish={onFinish} layout="vertical" className={classes.urlForm}>
        <Form.Item
          label="Enter URL"
          name="url"
          rules={[{ required: true, message: 'Please enter some text' }]}
        >
          <Input
            placeholder="Enter url here to summarize"
            className={classes.urlInput}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className={classes.urlButton}
          >
            Summarize
          </Button>
        </Form.Item>
      </Form>
      {summaryPoints.length > 0 ? (
        <Card className={classes.summaryCard} bodyStyle={{ padding: '10px' }}>
          <h2>Summarized Points </h2>
          <div className={`${classes.summary} ${classes.urlSummary}`}>
            <ol>
              {summaryPoints.map((summaryPoint: string, ind: number) => (
                <li key={ind}>{summaryPoint}</li>
              ))}
            </ol>
          </div>
        </Card>
      ) : (
        <Card className={classes.summaryCard}>
          <div className={classes.noURL}>
            <h1>HOW IT WORKS?</h1>
            <div className={classes.steps}>
              {SUMMARIZE_STEPS.map((step) => (
                <Paragraph text={step.text} />
              ))}
            </div>
          </div>
        </Card>
      )}
    </Fragment>
  );
};

export default SummarizeByUrl;
