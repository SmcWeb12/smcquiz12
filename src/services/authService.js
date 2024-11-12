import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/firebaseConfig'; // Import Firebase auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Create a Context for Auth
const AuthContext = createContext();

// Hook to use the Auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state when authentication state changes
    });
    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Function to register a new user
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user info after successful registration
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw new Error(error.message); // Throw error message to be caught by calling function
  }
};

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return user info after successful login
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw new Error(error.message); // Throw error message to be caught by calling function
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await signOut(auth); // Firebase signOut method to log the user out
  } catch (error) {
    console.error('Error logging out user:', error.message);
    throw new Error(error.message); // Throw error message to be caught by calling function
  }
};

// Function to monitor authentication state (e.g., to check if a user is logged in)
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user); // Trigger the callback whenever auth state changes (login/logout)
  });
};
