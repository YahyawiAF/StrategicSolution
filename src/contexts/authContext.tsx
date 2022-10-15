import { createContext, useContext, useMemo, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "~/hooks/useLocalStorage";

interface AppContextInterface {
  user: any;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate("/patient");
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  // window.onbeforeunload = function () {
  //   sessionStorage.removeItem("user");
  //   return "";
  // };

  // window.onbeforeunload = function () {
  //   sessionStorage.removeItem("user");
  //   // setUser(null);
  //   // navigate("/", { replace: true });
  // };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
