import axios from 'axios';
import openNotification from '@/components/utils/Notification';
export const loginWithFacebook = async (session: any) => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/users/signup', {
      name: session.user?.name,
      email: session.user?.email,
      facebookProfileImage: session.user?.image,
      loginType: 'facebook',
    });
    openNotification({ type: 'success', message: 'Login successful' });
    return res;
  } catch (error: any) {
    openNotification({ type: 'error', message: 'Something went wrong' });
  }
};
