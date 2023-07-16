import { Button, Row, Tag, Upload } from 'antd';
import classes from './index.module.scss';
import { CopyOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { getHashTags } from '@/components/utils/social-apis/apis';
import openNotification from '@/components/utils/Notification';

var substrings = [
  'data:image/jpeg;base64,',
  'data:image/png;base64,',
  'data:image/jpg;base64,',
];
const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadDetails = () => {
  const [userImage, setUserImage] = useState('');
  const [hashtags, setHashTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [encodedImage, setEncodedImage] = useState('');
  const [isCopied, setCopied] = useState(false);

  const handleImage = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.file.originFileObj);
    }
    let encoded = userImage;
    for (var i = 0; i < substrings.length; i++) {
      if (encoded.includes(substrings[i])) {
        encoded = encoded.replace(new RegExp(substrings[i], 'g'), '');
      }
    }

    setEncodedImage(encoded);
    setUserImage(file.preview);
  };

  const generateHashtags = async () => {
    setLoading(true);
    let tags;
    try {
      tags = await getHashTags(encodedImage);
      setHashTags(tags);
      setLoading(false);
      setCopied(false);
    } catch (error) {
      openNotification({
        type: 'error',
        message: 'Something went wrong',
      });
      setLoading(false);
      return;
    }
  };
  const copyHashtags = () => {
    if (!isCopied) {
      var concatenatedString = hashtags
        .map(function (substring) {
          return '#' + substring;
        })
        .join(' ');
      setCopied(true);
      navigator.clipboard.writeText(concatenatedString);
    }
  };
  return (
    <div className={classes.imageScreen}>
      <h1> AI Hashtags Generator</h1>
      <Row style={{ marginBottom: '1rem' }} className={classes.imageContainer}>
        <img
          src={userImage || '/images/utilis/Image-upload.png'}
          alt="profile"
          className={classes.image}
        />
        <div className={classes.uploadContainer}>
          <h3>Upload Image</h3>
          <p>Your path should be in PNG or JPG format</p>
          <div className={classes.hashtagButtons}>
            <Upload
              onChange={handleImage}
              accept=".jpg, .jpeg, .png"
              maxCount={1}
            >
              <Button
                type="default"
                className={classes.uploadButton}
                icon={<UploadOutlined />}
              >
                Click to upload
              </Button>
            </Upload>
            {userImage && (
              <Button
                type="primary"
                onClick={generateHashtags}
                loading={loading}
                className={classes.hashButton}
              >
                Generate Hashtags
              </Button>
            )}
          </div>
          {hashtags.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <div className={classes.hashtagHeader}>
                <h2>HASHTAGS</h2>
                <h3 onClick={copyHashtags} style={{ cursor: 'pointer' }}>
                  <CopyOutlined className={classes.copyIcon} />
                  {isCopied ? 'Copied' : 'Copy'}
                </h3>
              </div>
              <div className={classes.hashtagContainer}>
                <div className={classes.hashTags}>
                  {hashtags?.map((val, ind) => (
                    <Tag key={ind} color="cyan" className={classes.tag}>
                      #{val}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Row>
    </div>
  );
};
export default UploadDetails;
