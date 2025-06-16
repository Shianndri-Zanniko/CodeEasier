import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import useProfileCheck from "../services/userProfileCheck";

// Guards routes that require authentication and a completed profile

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const { loading: profileLoading, isComplete } = useProfileCheck(user);

  if (authLoading || profileLoading) {
    return <div className="text-center text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isComplete) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
