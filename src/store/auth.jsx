import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState(null);

  // Centralized authorization token for API calls
  const authorizationToken = token ? `Bearer ${token}` : null;

  // Store token in localStorage and update state
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Check if the user is logged in based on token presence
  const isLoggedIn = !!token;

  // Logout function clears token from state and localStorage
  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Authenticate the user by checking the token
  const userAuthentication = async () => {
    if (!token) {
      console.error("No token found for authentication");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        console.log("Authenticated User:", data.userData);
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch user data:", response.status, errorData);
        LogoutUser(); // Logout if token is invalid
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch available services from the backend
  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.msg);
        console.log("Fetched services:", data.msg);
      } else {
        console.error("Failed to fetch services:", response.status);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Run user authentication and fetch services on mount or when token changes
  useEffect(() => {
    if (token) {
      userAuthentication();
    }
    getServices();
  }, [token]); // Run whenever token changes

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
