import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../Styles/HomePage.module.css";
import { useAuth } from "../context/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

// Reusable LoadingScreen Component
const LoadingScreen: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className={styles.loadingScreen} aria-live="polite">
      <h2>{message}</h2>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(
    localStorage.getItem("loading") === "true" // Persist loading state across redirects
  );
  const [loadingText, setLoadingText] = useState("Logging you in...");
  const loadingMessages = ["Logging you in...", "Fetching your data...", "Almost there..."];
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const authenticateUser = async () => {
      if (isAuthenticated && user) {
        setLoading(true);
        localStorage.setItem("loading", "true"); // Ensure loading persists
        let messageIndex = 0;

        // Update loading messages periodically
        const interval = setInterval(() => {
          messageIndex = (messageIndex + 1) % loadingMessages.length;
          setLoadingText(loadingMessages[messageIndex]);
        }, 1000);

        try {
          const username = user.email;
          const password = user.name;

          const response = await api.post("/auth/login", { username, password });
          if (response.data?.data) {
            login(username, response.data.data.token);
            navigate("/main"); // Redirect after successful login
          } else {
            setErrorMessage("Invalid response from server");
          }
        } catch (error: any) {
          setErrorMessage(
            error.response?.data?.message || "Failed to authenticate."
          );
        } finally {
          clearInterval(interval); // Cleanup interval
          setLoading(false);
          localStorage.removeItem("loading"); // Clear persistent loading state
        }
      }
    };

    authenticateUser();
  }, [isAuthenticated, user, login, navigate]);

  const handleGoogleLogin = () => {
    setErrorMessage("");
    setLoading(true); // Show loading before redirect
    localStorage.setItem("loading", "true"); // Persist loading state
    loginWithRedirect();
  };

  const handleTryForFree = () => {
    setErrorMessage("");
    setLoading(true); // Show loading before redirect
    localStorage.setItem("loading", "true"); // Persist loading state
    loginWithRedirect();
  };

  return (
    <main className={styles.homePage}>
      {loading ? (
        <LoadingScreen message={loadingText} />
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
              onClick={handleTryForFree}
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
