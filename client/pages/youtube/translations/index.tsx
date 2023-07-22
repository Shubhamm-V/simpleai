import { Button, Col, Modal, Row, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import URL from '@/constants/url';
import type { ColumnsType } from 'antd/es/table';
import openNotification from '@/components/utils/Notification';
import { TRANSLATE_LANGUAGES } from '@/constants/languages';
import classes from './index.module.scss';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
type Props = {};

const Translations = (props: Props) => {
  const [translations, setTranslations] = useState([]);
  const [subTitle, setSubtitles] = useState('');
  const [translation, setTranslation] = useState('');
  const userInfo = useSelector((state: any) => state.userReducer.user);
  const [visible, setVisible] = useState(false);
  const user = userInfo.data.user;

  useEffect(() => {
    const getTranslations = async () => {
      const res = await axios.get(
        `${URL}/api/v1/youtube/${user._id}/translations`
      );
      let youtubeTranslations = res.data.translations.youtubeTranslations;
      const translations = youtubeTranslations?.map(
        (translation: any, ind: number) => {
          const language = TRANSLATE_LANGUAGES.find(
            (language) => language.value == translation.language
          );
          return {
            ...translation,
            language: language?.label,
            srNo: youtubeTranslations.length - ind,
          };
        }
      );
      translations?.reverse();

      setTranslations(translations);
    };

    try {
      getTranslations();
    } catch (err) {
      openNotification({ type: 'error', message: 'Something went wrong' });
    }
  }, []);

  interface TranslationInfo {
    key: React.Key;
    url: string;
    title: string;
    language: string;
    subtitles: string;
    translations: string;
  }

  const columns: ColumnsType<TranslationInfo> = [
    {
      title: 'Sr. No',
      dataIndex: 'srNo',
      key: 'srNo',
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Translated In', dataIndex: 'language', key: 'language' },
    { title: 'URL', dataIndex: 'url', key: 'url' },
    {
      title: 'Subtitles',
      dataIndex: 'subtitles',
      key: 'x',
      render: (subtitle) => (
        <a
          className={classes.link}
          onClick={() => {
            setTranslation('');
            setSubtitles(subtitle);
            setVisible(true);
          }}
        >
          View
        </a>
      ),
    },
    {
      title: 'Translations',
      dataIndex: 'translation',
      key: 'translation',
      render: (translation) => (
        <a
          className={classes.link}
          onClick={() => {
            setSubtitles('');
            setTranslation(translation);
            setVisible(true);
          }}
        >
          View
        </a>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Helmet>
          <title>Translations</title>
        </Helmet>
        <Col span={24} className={classes.headerWrapper}>
          <h2>Your Translations</h2>
          <Link href="/youtube/translate_video">
            <Button type="primary">
              <PlusOutlined className={classes.plus} />
              Create New
            </Button>
          </Link>
        </Col>
        <Col span={24} className={classes.tableWrapper}>
          <Table
            columns={columns}
            dataSource={translations}
            scroll={{ x: true }}
            // rowKey={(_record, index: any) => index.toString()}
          />
        </Col>
      </Row>
      <Modal
        open={visible}
        footer={false}
        centered
        onCancel={() => setVisible(false)}
        bodyStyle={{ padding: '1rem' }}
      >
        <div className={classes.modal}>
          <p>
            {subTitle && subTitle}
            {translation && translation}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Translations;
