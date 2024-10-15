import { useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  isAuthenticated: boolean,
  updateAuthStatus: (value: boolean) => void;
}

const LoginPage = ({isAuthenticated, updateAuthStatus}: LoginPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <LoginForm updateAuthStatus={updateAuthStatus} />
  )
}

export default LoginPage;