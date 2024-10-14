// import { Authenticator } from "@aws-amplify/ui-react";
import "./App.scss"
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import outputs from "../amplify_outputs.json";
import SiteNav from "./components/SiteNav/SiteNav";

Amplify.configure(outputs);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <SiteNav isAuthenticated={isAuthenticated} updateAuthStatus={updateAuthStatus} />
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage updateAuthStatus={updateAuthStatus} />} />
        {/* <Route path="/register" element={<RegisterPage />} />
        <Route path="/validate" element={<ValidatePage />} />
        <Route path="/contacts" element={<Contacts isAuthenticated={isAuthenticated} />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};