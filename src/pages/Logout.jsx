import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);  //make fun in auth.jsx

  return <Navigate to="/login" />;
};