import axios from 'axios';
import URL from '@/constants/url';
import openNotification from '@/components/utils/Notification';

export const loginWithGoogleFB = async (session: any, loginType: string) => {
  try {
    const res = await axios.post(`${URL}/api/v1/users/signup`, {
      name: session.user?.name,
      email: session.user?.email,
      profileImage: session.user?.image,
      loginType,
    });
    if (res) {
      openNotification({ type: 'success', message: 'You are logged in' });
      return res;
    }
  } catch (error: any) {
    openNotification({ type: 'error', message: 'Something went wrong' });
  }
};
