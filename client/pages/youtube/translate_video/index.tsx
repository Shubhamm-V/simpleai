import React, { Fragment, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Input,
  Divider,
  Card,
  Select,
  Modal,
  Form,
  Collapse,
} from 'antd';
import classes from './index.module.scss';
import { TRANSLATE_LANGUAGES } from '@/constants/languages';
import {
  getTexttoVoice,
  getTranslation,
  getVideoSubtitles,
} from '../../../components/utils/youtube-apis/apis';
import { TRANSLATION_STEPS } from '@/constants/utils';
import Paragraph from '@/components/text/Paragraph';
import { SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import URL from '@/constants/url';
import openNotification from '@/components/utils/Notification';
import Link from 'next/link';
import { Helmet } from 'react-helmet';
type Props = {};
type Translation = {
  title: string;
  subtitles: string;
  translation: string;
};
const TranslateVideo = (props: Props) => {
  const [url, setURL] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [audio, setAudio] = useState(null);
  const [visible, setVisible] = useState(false);
  const [translationInfo, setTranslation] = useState<Translation>({
    title: '',
    subtitles: '',
    translation: '',
  });
  const userInfo = useSelector((state: any) => state.userReducer.user);
  const user = userInfo.data.user;

  const [form] = Form.useForm();

  const translateVideo = async () => {
    setLoading(true);

    // getting subtitles
    let subtitles;
    try {
      subtitles = await getVideoSubtitles(url);
    } catch (error) {
      openNotification({
        type: 'error',
        message: "Video doesn't have subtitles",
      });
      setLoading(false);
      return;
    }

    if (!subtitles) {
      setLoading(false);
      return;
    }

    // translating subtitles
    let subtitleTranslation;
    try {
      subtitleTranslation = await getTranslation(subtitles, 'en-US', language);
    } catch (error) {
      setLoading(false);
      openNotification({ type: 'error', message: 'Something went wrong' });
      return;
    }

    // generating audio
    try {
      const translationAudio: any = await getTexttoVoice(
        language.toLowerCase(),
        subtitleTranslation
      );
      setAudio(translationAudio);
      setTranslation({
        ...translationInfo,
        subtitles,
        translation: subtitleTranslation,
      });
      console.log('Audio : ', audio);
      setTranslatedText(subtitleTranslation);
      setLoading(false);
    } catch (error) {
      openNotification({ type: 'error', message: 'Something went wrong' });
    }
  };

  const onSelectChange = (value: string) => {
    setLanguage(value);
  };

  const onFinish = async (values: { title: string }) => {
    setSaveLoading(true);
    try {
      const res = await axios.post(
        `${URL}/api/v1/youtube/${user._id}/translations`,
        {
          title: translationInfo.title,
          subtitles: translationInfo.subtitles,
          translation: translationInfo.translation,
          language,
          url,
        }
      );
      console.log('Response : ', res.data);
      setSaveLoading(false);
      setVisible(false);
      openNotification({
        type: 'success',
        message: 'Translation Saved Successfully',
      });
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'SOmething went wrong',
      });
      setSaveLoading(false);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>AI Video Translation</title>
      </Helmet>
      <Row style={{ paddingBottom: '2rem' }}>
        <Col span={24} className={classes.summarizeHeader}>
          <h2>Youtube AI Voice Translation</h2>
          <Link href="/youtube/translations">
            <Button
              type="primary"
              className={classes.translations}
              size="middle"
            >
              Your Translations
            </Button>
          </Link>
        </Col>
        <Divider className={classes.divider} />
        <Col span={24} className={classes.summarizeBody}>
          <Input
            placeholder="Enter Youtube URL"
            className={classes.input}
            onChange={(e) => setURL(e.target.value)}
          />
          <Select
            showSearch
            placeholder="Language"
            optionFilterProp="children"
            onChange={onSelectChange}
            options={TRANSLATE_LANGUAGES}
            filterOption={(input, option: any) =>
              option?.label?.toLowerCase().includes(input.toLowerCase())
            }
          />
          <Button type="primary" onClick={translateVideo} loading={loading}>
            Translate
          </Button>
        </Col>
        <Col span={24} className={classes.audioWrapper}>
          {audio && (
            <Card className={classes.summaryCard}>
              <h3>Listen</h3>
              <audio controls className={classes.audioTranslation}>
                <source src={audio} type="audio/mp3" />
              </audio>
            </Card>
          )}
        </Col>
        <Col span={24}>
          <Card className={classes.summaryCard}>
            {translatedText ? (
              <Fragment>
                <Col span={24} className={classes.textHeader}>
                  <h3>Read</h3>
                  <Button
                    type="primary"
                    className={classes.saveButton}
                    onClick={() => setVisible(true)}
                  >
                    <SaveOutlined />
                    Save
                  </Button>
                </Col>
                <div className={classes.summary}>{translatedText}</div>
              </Fragment>
            ) : (
              <div className={classes.infoContainer}>
                <h1>HOW IT WORKS?</h1>
                <div>
                  {TRANSLATION_STEPS.map((step) => (
                    <Paragraph text={step.text} />
                  ))}

                  <p className={classes.warn}>
                    Note: Please enter URL which contains english subtitles on
                    Youtube.
                  </p>
                </div>
              </div>
            )}
          </Card>
          {translationInfo.subtitles && (
            <Collapse
              className={classes.subtitles}
              size="large"
              items={[
                {
                  key: '1',
                  label: 'Original Subtitles',
                  children: <p>{translationInfo.subtitles}</p>,
                },
              ]}
            />
          )}
        </Col>
        <Modal
          footer={false}
          centered
          open={visible}
          className={classes.saveModal}
          onCancel={() => setVisible(false)}
        >
          <h2>Save Translation</h2>
          <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input your title.' }]}
            >
              <Input
                placeholder="Title"
                onChange={(e) =>
                  setTranslation({ ...translationInfo, title: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit" loading={saveLoading}>
                  Save
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </Fragment>
  );
};

export default TranslateVideo;
