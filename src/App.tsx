// import { Authenticator } from "@aws-amplify/ui-react";
import "./App.scss"
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import outputs from "../amplify_outputs.json";
import SiteNav from "./components/SiteNav/SiteNav";
import { getCurrentUser } from 'aws-amplify/auth';

Amplify.configure(outputs);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localSignInDetails, setLocalSignInDetails] = useState<any>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async() => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log("username: ", username);
      console.log("userId: ", userId);
      console.log("signInDetails: ", signInDetails);

      setLocalSignInDetails(signInDetails);

      if (signInDetails) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Error retrieving current user.");
    }
  };

  const updateAuthStatus = (value: boolean) => {
    setIsAuthenticated(value);
  };

  return (
    // <Authenticator>
    //   {({ signOut, user }) => (
    //     <main>
    //       <h1>Hello {user?.username}</h1>
    //       <button onClick={signOut}>Sign out</button>
    //     </main>
    //   )}
    // </Authenticator>

    <div>
      {isAuthenticated &&
        <SiteNav isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
      }
      <Routes>
        <Route path="*" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/" element={<HomePage isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={<LoginPage isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />} />
        {/* <Route path="/register" element={<RegisterPage />} />
        <Route path="/validate" element={<ValidatePage />} />
        <Route path="/contacts" element={<Contacts isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
      {isAuthenticated &&
        <Footer />
      }
    </div>
  );
};