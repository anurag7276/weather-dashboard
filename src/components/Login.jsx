// src/components/Login.jsx
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setLogin } from '../store/authSlice';
import axios from 'axios';

function Login() {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // After Google gives us a token, fetch user info
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        // Save user to Redux store
        dispatch(setLogin({
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture,
        }));

      } catch (err) {
        console.error('Failed to fetch user info', err);
      }
    },
    onError: () => {
      console.error('Login Failed');
    },
  });

  return (
    <button onClick={() => login()} className="login-button">
      Sign in with Google
    </button>
  );
}

export default Login;