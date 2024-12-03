import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../Styles/HomePage.module.css";
import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const loadingMessages = [
    "Logging you in...",
    "Fetching your data...",
    "Almost there...",
  ];
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        setLoadingText(loadingMessages[0]);
        const username = user.email;
        const password = user.name;

        const attemptLogin = async (retryCount: number) => {
          try {
            const response = await api.post("/auth/login", {
              username,
              password,
            });
            if (response.data?.data) {
              login(username, response.data.data.token);
              navigate("/main");
            } else {
              setErrorMessage("Invalid response from server");
            }
          } catch (error: any) {
            if (retryCount > 0) {
              console.log("Retrying login...");
              await attemptLogin(retryCount - 1); // Retry once
            } else {
              setErrorMessage(
                error.response?.data?.message || "Failed to authenticate."
              );
            }
          }
        };

        await attemptLogin(1); // Try once, with one retry
        setLoading(false);
      }
    };

    authenticateUser();
  }, [isAuthenticated, user, login, navigate]);

  useEffect(() => {
    if (loading) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length; // Cycle through the messages
        setLoadingText(loadingMessages[index]);
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [loading]);

  const handleGoogleLogin = () => {
    setErrorMessage("");
    loginWithRedirect();
  };

  const handleTryForFree = () => {
    console.log("Try for FREE button clicked");
    setErrorMessage("");
    loginWithRedirect(); // Redirects to a specific "Try for FREE" page
  };

  return (
    <main className={styles.homePage}>
      {loading ? (
        <div className={styles.loadingScreen} aria-live="polite">
          <h2>{loadingText}</h2>
        </div>
      ) : (
        <>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.logo}>plato</div>
            <button
              className={styles.loginButton}
              onClick={handleGoogleLogin}
            >
              Login
            </button>
          </header>

          {/* Main Content */}
          <div className={styles.content}>
            <h1 className={styles.title}>
              Learn to Code.
              <br />
              One concept at a time...
            </h1>
            <p className={styles.subtitle}>
              Learn to code in the most interactive way!
            </p>
            <button
              className={styles.tryButton}
              onClick={handleTryForFree} /* Separate handler */
            >
              Try for FREE →
            </button>
          </div>
        </>
      )}
      {/* Error Message */}
      {errorMessage && (
        <div className={styles.error}>
          {errorMessage}
        </div>
      )}
    </main>
  );
};

export default HomePage;
