// Import necessary hooks and utilities from React
import { createContext, useState, useContext } from "react";

// Create an AuthContext to hold authentication-related state and methods
export const AuthContext = createContext(); // Export AuthContext directly for use in other parts of the app

/**
 * AuthProvider Component
 * Provides authentication context to its children components.
 * Manages the current user's state, login, and logout functionality.
 */
export const AuthProvider = ({ children }) => {
  // State to store the current user
  // Initializes with user data from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("currentUser"); // Retrieve user from localStorage
    return user ? JSON.parse(user) : null; // Parse user data or default to null
  });

  /**
   * Login Function
   * Saves the user's information in state and localStorage.
   * user - User object containing user data and token.
   */
  const login = (user) => {
    setCurrentUser(user); // Update currentUser state
    localStorage.setItem("currentUser", JSON.stringify(user)); // Save user to localStorage
    localStorage.setItem("token", user.token); // Save token separately for easy access
  };

  /**
   * Logout Function
   * Clears the user's information from state and localStorage.
   */
  const logout = () => {
    setCurrentUser(null); // Clear currentUser state
    localStorage.removeItem("currentUser"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Remove token from localStorage
  };

  // Provide the authentication context (currentUser, login, and logout)
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children} {/* Render child components within the AuthProvider */}
    </AuthContext.Provider>
  );
};

/**
 * useAuth Hook
 * A custom hook to access authentication context easily in any component.
 * @returns {object} Authentication context with currentUser, login, and logout methods.
 */
export const useAuth = () => useContext(AuthContext); // Re-export hook for direct usage
