import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
