// Authentication context to manage user state
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user types
export const USER_TYPES = {
  REGULAR: 'regular',
  ADMIN: 'admin',
  NONE: 'none'
};

// Create the authentication context
const AuthContext = createContext();

// Authentication provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    isAuthenticated: false,
    userType: USER_TYPES.NONE,
    username: ''
  });

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('pharmaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function with hardcoded credentials
  const login = (username, password) => {
    // Admin credentials - requires both username and password
    if (username && password === 'Tariffbuster2025') {
      const adminUser = {
        isAuthenticated: true,
        userType: USER_TYPES.ADMIN,
        username
      };
      setUser(adminUser);
      localStorage.setItem('pharmaUser', JSON.stringify(adminUser));
      return { success: true, userType: USER_TYPES.ADMIN };
    } 
    // Regular user credentials - requires only password
    else if (password === 'pharma2025') {
      const regularUser = {
        isAuthenticated: true,
        userType: USER_TYPES.REGULAR,
        username: username || 'User'
      };
      setUser(regularUser);
      localStorage.setItem('pharmaUser', JSON.stringify(regularUser));
      return { success: true, userType: USER_TYPES.REGULAR };
    } 
    // Invalid credentials
    else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  // Logout function
  const logout = () => {
    setUser({
      isAuthenticated: false,
      userType: USER_TYPES.NONE,
      username: ''
    });
    localStorage.removeItem('pharmaUser');
  };

  // Return the context provider with auth state and functions
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
