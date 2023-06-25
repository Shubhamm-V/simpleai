import { notification } from 'antd';
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
}

const openNotification = (props: NotificationProps) => {
  const { type, message, description } = props;

  notification[type]({
    message,
    description,
  });
};

export default openNotification;
