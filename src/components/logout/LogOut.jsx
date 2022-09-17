import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

export default function LogOut() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const refreshToken = cookies.refreshToken;
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
    removeCookie('refreshToken');
    removeCookie('accessToken');
    removeCookie('username');
    setAuth({username: '', accessToken: ''});

    async function completeLogout() {
      await axios.delete(
        '/auth/logout',
        { data: { refreshToken } }
      );
    }

    completeLogout();

    navigate("/", { replace: true });

  }, [])

  return (
    <>
    </>
  )
}
