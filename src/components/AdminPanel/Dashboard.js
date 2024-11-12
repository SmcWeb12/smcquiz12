// src/components/AdminPanel/Dashboard.js
import React, { useState, useEffect } from 'react';
import { generateAlgebraQuestion } from '../../services/botService';
import { db } from '../../utils/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import BotQuestionGenerator from './BotQuestionGenerator';

const Dashboard = () => {
  const [questions, setQuestions] = useState([]);
  
  // Fetch all questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
    };

    fetchQuestions();
  }, []);

  // Delete a question from Firestore
  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteDoc(doc(db, 'questions', questionId));
      setQuestions(questions.filter(question => question.id !== questionId));
    } catch (error) {
      console.error('Error deleting question: ', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>
      
      <BotQuestionGenerator /> {/* This is the bot for generating questions */}
      
      <div className="question-list">
        <h3>All Questions</h3>
        <table className="table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Question</th>
              <th className="border px-4 py-2">Options</th>
              <th className="border px-4 py-2">Class</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="border px-4 py-2">{question.question}</td>
                <td className="border px-4 py-2">
                  {question.options.map((option, index) => (
                    <div key={index}>{option}</div>
                  ))}
                </td>
                <td className="border px-4 py-2">{question.class}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
