import { Navigate } from "react-router-dom";
import { useAuth } from "~/contexts/authContext";
import { ReactNode } from "react";

export const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
