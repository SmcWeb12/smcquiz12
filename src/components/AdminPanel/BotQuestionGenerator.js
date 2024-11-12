// src/components/AdminPanel/BotQuestionGenerator.js
import React, { useState } from 'react';
import { generateAlgebraQuestion } from '../../services/botService'; // Import the bot service

const BotQuestionGenerator = () => {
  const [loading, setLoading] = useState(false); // State to handle loading status
  const [message, setMessage] = useState(''); // State to display success or error message

  // Function to handle question generation
  const handleGenerateQuestions = async () => {
    setLoading(true); // Start loading
    setMessage(''); // Clear any previous messages

    try {
      await generateAlgebraQuestion(); // Call bot service to generate question
      setMessage('Question generated successfully!'); // Show success message
    } catch (error) {
      setMessage('Error generating question! Please try again.'); // Show error message
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Bot Question Generator</h2>
      <p className="mb-4">Click the button below to generate a new math question for class 11th or 12th.</p>
      
      {/* Button to generate question */}
      <button
        onClick={handleGenerateQuestions}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        disabled={loading} // Disable button when loading
      >
        {loading ? 'Generating Question...' : 'Generate Question'}
      </button>

      {/* Message to show after attempting to generate a question */}
      {message && (
        <div className={`mt-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default BotQuestionGenerator;
