import { signOut } from 'aws-amplify/auth';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface SiteNavProps {
  isAuthenticated: boolean;
  updateAuthStatus: (value: boolean) => void;
}

const SiteNav = ({isAuthenticated, updateAuthStatus}: SiteNavProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Is Authenticated: ", isAuthenticated);
  }, [isAuthenticated])

  const logoutHandler = async() => {
    try {
      await signOut();
      updateAuthStatus(false);
      navigate("/login")
    } catch (error) {
      console.log("Error on logout.");
    }
  };

  return (
    <>
      <div className="sitenav-component">
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </>
  )
}

export default SiteNav;