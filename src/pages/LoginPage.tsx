import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

interface LoginPageProps {
  updateAuthStatus: (value: boolean) => void;
}

const LoginPage = ({updateAuthStatus}: LoginPageProps) => {
  return (
    <LoginForm updateAuthStatus={updateAuthStatus} />
  )
}

export default LoginPage;