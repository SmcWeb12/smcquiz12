// src/components/AdminPanel/AddQuestion.js
import React, { useState } from 'react';
import { db } from '../../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddQuestion = () => {
  const [classLevel, setClassLevel] = useState('11th');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  const [correctAnswer, setCorrectAnswer] = useState('');

  // Handle option change
  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add question to Firestore
      await addDoc(collection(db, 'questions'), {
        class: classLevel,
        question,
        options,
        correctAnswer,
      });
      // Reset form after successful submission
      setClassLevel('11th');
      setQuestion('');
      setOptions({ option1: '', option2: '', option3: '', option4: '' });
      setCorrectAnswer('');
      alert('Question added successfully!');
    } catch (error) {
      console.error('Error adding question: ', error);
      alert('Error adding question');
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
      <form onSubmit={handleSubmit}>
        {/* Class Selection */}
        <div className="mb-4">
          <label className="block mb-2">Class</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </select>
        </div>

        {/* Question Input */}
        <div className="mb-4">
          <label className="block mb-2">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the question"
            className="p-2 border border-gray-300 rounded-md w-full"
            rows="3"
            required
          />
        </div>

        {/* Options Input */}
        <div className="mb-4">
          <label className="block mb-2">Options</label>
          {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                name={option}
                value={options[option]}
                onChange={handleOptionChange}
                placeholder={`Option ${index + 1}`}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
          ))}
        </div>

        {/* Correct Answer Input */}
        <div className="mb-4">
          <label className="block mb-2">Correct Answer</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select correct answer</option>
            {['option1', 'option2', 'option3', 'option4'].map((option) => (
              <option key={option} value={option}>
                {options[option]}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
