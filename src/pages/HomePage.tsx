import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HomePageProps {
  isAuthenticated: boolean;
}

const HomePage = ({isAuthenticated}: HomePageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div>HomePage</div>
  )
}

export default HomePage;