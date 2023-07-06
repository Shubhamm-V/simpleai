import React, { Fragment, useState } from 'react';
import { Row, Col, Button, Input, Divider, Card, Select } from 'antd';
import classes from './index.module.scss';
import { TRANSLATE_LANGUAGES } from '@/constants/languages';
import {
  getSummary,
  getTexttoVoice,
  getTranslation,
  getVideoSubtitles,
} from '../../../components/utils/youtube-apis/apis';
import { TRANSLATION_STEPS } from '@/constants/steps';
import Paragraph from '@/components/text/Paragraph';
type Props = {};

const SummarizeVideo = (props: Props) => {
  const [url, setURL] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en-US');
  const [audio, setAudio] = useState(null);

  const summarizeVideo = async () => {
    setLoading(true);
    const subtitles = await getVideoSubtitles(url);
    // const subtitles = await getSummary(subtitles);
    const translation = await getTranslation(subtitles, 'en-US', language);
    const translationAudio: any = await getTexttoVoice(
      language.toLowerCase(),
      translation
    );

    setAudio(translationAudio);
    console.log('Audio : ', audio);
    setSummary(translation);
    setLoading(false);
  };

  const onSelectChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <Row>
      <Col span={24} className={classes.summarizeHeader}>
        <h2>Youtube AI Voice Translation</h2>
        <Button type="primary" className={classes.translations} size="large">
          Your Translations
        </Button>
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
        <Button type="primary" onClick={summarizeVideo} loading={loading}>
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
          {summary ? (
            <Fragment>
              <h3>Read</h3>
              <div className={classes.summary}>{summary}</div>
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
      </Col>
    </Row>
  );
};

export default SummarizeVideo;
