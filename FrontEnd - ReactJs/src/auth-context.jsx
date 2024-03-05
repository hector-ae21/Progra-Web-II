import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [userRoles, setUserRoles] = useState(localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : []);

  const signIn = (token, roles) => {
    setAuthToken(token);
    setUserRoles(roles);
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
  };

  const signOut = () => {
    setAuthToken(null);
    setUserRoles([]);
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  };

  const authContextValue = {
    authToken,
    userRoles,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
