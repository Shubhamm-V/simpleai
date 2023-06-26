import axios from 'axios';
import openNotification from '@/components/utils/Notification';

// For storing the userInfo in database after google login or checking user exists or not to send jsontoken
export const loginWithGogle = async (session: any) => {
  try {
    const res = await axios.post('http://localhost:8000/api/v1/users/signup', {
      name: session.user?.name,
      email: session.user?.email,
      googleProfileImage: session.user?.image,
      loginType: 'google',
    });
    openNotification({ type: 'success', message: 'Login successful' });
    return res;
  } catch (error: any) {
    openNotification({ type: 'error', message: 'Something went wrong' });
  }
};
