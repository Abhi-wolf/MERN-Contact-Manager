import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  // state to hold the authenticated token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  // function to set authenticated token
  function setToken(newToken) {
    setToken_(newToken);
  }

  function setNewUser(userName) {
    setUserName(userName);
  }

  useEffect(() => {
    if (token && userName) {
      axios.defaults.headers.common["Authorization"] = "Bearer" + token;
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
    }
  }, [token, userName]);

  const contextValue = useMemo(
    () => ({ token, setToken, userName, setNewUser }),
    [token, userName]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
