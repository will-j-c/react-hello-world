import axios from '../api/axios';
import useAuth from './useAuth';
import { useCookies } from 'react-cookie';

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const [cookies, setCookie] = useCookies(); 
  const refresh = async () => {
    const response = await axios.post(
      '/auth/refresh',
      { refreshToken: cookies.refreshToken}
    );

    const newAccessToken = response.data.accessToken;

    setAuth(prev => {
      return {...prev, accessToken: newAccessToken};
    })

    setCookie('accessToken', newAccessToken);

    return newAccessToken;
  }

  return refresh;
}
