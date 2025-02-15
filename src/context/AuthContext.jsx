import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
