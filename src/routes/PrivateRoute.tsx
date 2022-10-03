import { useAuth } from "~/contexts/authContext";
import { RouteProps } from "react-router";
import { Navigate, Route } from "react-router-dom";
import React from "react";

export const PrivateRoute: React.FC<RouteProps> = props => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return <Route {...props} />;
};
