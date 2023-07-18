import React, { Fragment, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import classes from './index.module.scss';
import { getSummaryByText } from '@/components/utils/youtube-apis/apis';
import openNotification from '@/components/utils/Notification';
const { TextArea } = Input;
type Props = {};

const SummarizeByText = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [summaryPoints, setSummaryPoints] = useState([]);
  const onFinish = (values: any) => {
    const getSummary = async () => {
      const summary = await getSummaryByText(values.text);
      setSummaryPoints(summary);
    };
    setLoading(true);
    try {
      getSummary();
      setLoading(false);
    } catch (err) {
      openNotification({ type: 'error', message: 'Something went wrong' });
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Enter Text"
          name="text"
          rules={[{ required: true, message: 'Please enter some text' }]}
        >
          <TextArea rows={20} placeholder="Enter text here to summarize" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Summarize
          </Button>
        </Form.Item>
      </Form>
      {summaryPoints.length > 0 && (
        <Card className={classes.summaryCard} bodyStyle={{ padding: '10px' }}>
          <h2>Summarized Points </h2>
          <div className={classes.summary}>
            <ol>
              {summaryPoints.map((summaryPoint: string, ind: number) => (
                <li key={ind}>{summaryPoint}</li>
              ))}
            </ol>
          </div>
        </Card>
      )}
    </Fragment>
  );
};

export default SummarizeByText;
