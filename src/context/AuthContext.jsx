// src/context/AuthContext.jsx 
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate(); // For navigation

  // Fake Login (accepts any input)
  const login = (credentials) => {
    if (!credentials.email || !credentials.password) {
      console.log("Email and password are required");
      return false;
    }

    console.log("User logged in:", credentials);
    setCurrentUser(credentials);
    setIsAuthenticated(true);

    navigate('/profile'); // Redirect to Profile
    return true;
  };

  // Fake Register (just redirects)
  const register = (userData) => {
    if (!userData.email || !userData.password) {
      console.log("Registration failed: Email and password required");
      return false;
    }
    console.log("User registered:", userData);
    setCurrentUser(userData);
    setIsAuthenticated(true);
    return true; // ✅ Return success
  };
  

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/'); // Redirect to Home
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
