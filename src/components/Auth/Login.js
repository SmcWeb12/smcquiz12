import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';  // Firebase authentication import
import { useNavigate } from 'react-router-dom';  // Import React Router's navigation hook

const Login = () => {
  const [email, setEmail] = useState('');  // State to hold the email input
  const [password, setPassword] = useState('');  // State to hold the password input
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent the default form submit behavior
    try {
      // Use Firebase's signInWithEmailAndPassword to authenticate the user
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/quiz');  // Redirect to the quiz page after successful login
    } catch (error) {
      alert(error.message);  // Show an alert if there's an error during login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state on input change
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state on input change
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account? <a href="/register" className="text-blue-500">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
