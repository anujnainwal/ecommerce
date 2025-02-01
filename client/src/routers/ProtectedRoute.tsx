import React from "react";
import { Navigate } from "react-router-dom";

interface TokenInfo {
  _id: string;
  role: string;
  username: string;
  email: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const tokenInfo = localStorage.getItem("userData");
  const user: TokenInfo | null = tokenInfo ? JSON.parse(tokenInfo) : null;

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
