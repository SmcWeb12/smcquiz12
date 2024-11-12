import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebaseConfig';  // Ensure this path is correct
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [botQuestion, setBotQuestion] = useState(null);
  const navigate = useNavigate();

  // Fetch existing questions from Firestore on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionsData);
    };
    fetchQuestions();
  }, []);

  // Function to generate and save a bot question to Firebase
  const handleBotGenerateQuestion = async () => {
    const generatedQuestion = generateAlgebraQuestion();
    setBotQuestion(generatedQuestion);

    try {
      await addDoc(collection(db, 'questions'), {
        question: generatedQuestion.question,
        options: generatedQuestion.options,
        correctAnswer: generatedQuestion.correctAnswer,
      });
      navigate('/quiz'); // Redirect to quiz page after generating question
    } catch (error) {
      console.error('Error saving bot-generated question: ', error);
    }
  };

  // Simple bot question generator for algebra
  const generateAlgebraQuestion = () => {
    const question = 'Solve for x: 2x + 3 = 11';
    const options = ['2', '3', '4', '5'];
    const correctAnswer = '4';
    return { question, options, correctAnswer };
  };

  // Function to add a new question to Firestore
  const handleAddQuestion = async () => {
    try {
      const docRef = await addDoc(collection(db, 'questions'), {
        question: questionText,
        options: options,
        correctAnswer: correctAnswer,
      });
      setQuestions([...questions, { id: docRef.id, question: questionText, options, correctAnswer }]);
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (error) {
      console.error('Error adding question: ', error);
    }
  };

  // Function to delete a question from Firestore
  const handleDeleteQuestion = async (id) => {
    try {
      const questionDoc = doc(db, 'questions', id);
      await deleteDoc(questionDoc);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error('Error deleting question: ', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Admin Dashboard</h1>

      {/* Display Bot Generated Question */}
      <div className="bot-question-container mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bot Generated Question</h2>
        <button 
          onClick={handleBotGenerateQuestion} 
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Generate Question
        </button>

        {botQuestion && (
          <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-white">
            <p className="text-lg font-medium">{botQuestion.question}</p>
            <ul className="list-disc ml-6 mt-4">
              {botQuestion.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p className="mt-4 text-green-500">Correct Answer: {botQuestion.correctAnswer}</p>
          </div>
        )}
      </div>

      {/* Existing Questions */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Existing Questions</h2>
      <div>
        {questions.length === 0 ? (
          <p className="text-gray-600">No questions available.</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="question-item mb-6 p-4 border border-gray-300 rounded-lg bg-white">
              <p className="text-lg font-medium">{q.question}</p>
              <ul className="list-disc ml-6 mt-2">
                {q.options.map((option, idx) => (
                  <li key={idx}>{option}</li>
                ))}
              </ul>
              <p className="mt-2 text-green-500">Correct Answer: {q.correctAnswer}</p>
              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4"
              >
                Delete Question
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add New Question */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Question</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddQuestion}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
