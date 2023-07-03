import axios from 'axios';
import openNotification from '@/components/utils/Notification';

export const loginWithGoogleFB = async (session: any, loginType: string) => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/users/signup', {
      name: session.user?.name,
      email: session.user?.email,
      profileImage: session.user?.image,
      loginType,
    });
    openNotification({ type: 'success', message: 'Login successful' });
    return res;
  } catch (error: any) {
    openNotification({ type: 'error', message: 'Something went wrong' });
  }
};
