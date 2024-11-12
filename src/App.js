import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./components/Auth/Register";
import QuizPage from "./components/Quiz/QuizPage";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage"; // Import HomePage
import ResultPage from "./pages/ResultPage.js";
import { AuthProvider } from "./services/authService"; // Importing AuthProvider
import './index.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
          <Routes>
            {/* Default Home page route */}
            <Route path="/" element={<HomePage />} /> {/* This will make HomePage the default route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
