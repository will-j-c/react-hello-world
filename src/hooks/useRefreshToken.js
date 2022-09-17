import axios from '../api/axios';
import useAuth from './useAuth';
import { getCookie } from 'react-use-cookie';

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const userRefreshToken = getCookie('token');
  const refresh = async () => {
    const response = await axios.post(
      '/auth/refresh',
      {
        refreshToken: userRefreshToken ,
        withCredentials: true
      }
    );

    const newAccessToken = response.data.accessToken;

    setAuth(prev => {
      return {...prev, accessToken: newAccessToken};
    })

    return newAccessToken;
  }

  return refresh;
}
