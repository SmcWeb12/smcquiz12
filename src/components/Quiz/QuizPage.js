import React, { useState, useEffect } from 'react';
import { db } from '../../utils/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizOver, setQuizOver] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]); // Track correct answers
  const [incorrectAnswers, setIncorrectAnswers] = useState([]); // Track incorrect answers
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionsData = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsData);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    // Check if answer is correct
    if (selectedAnswer === questions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, questions[currentQuestionIndex]]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, questions[currentQuestionIndex]]);
    }

    // Move to next question or end quiz if no questions left
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizOver(true); // End quiz when no more questions
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizOver(false);
    setSelectedAnswer(null);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  const handleViewResults = () => {
    navigate('/result', { state: { score, correctAnswers, incorrectAnswers, questions } });
  };

  if (loading) {
    return <div>Loading Questions...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {quizOver ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Over</h2>
          <p className="text-xl mb-4">Your Score: {score} / {questions.length}</p>
          <p className="text-lg mb-4">Correct Answers: {correctAnswers.length}</p>
          <p className="text-lg mb-4">Incorrect Answers: {incorrectAnswers.length}</p>
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Restart Quiz
          </button>
          <button
            onClick={handleViewResults}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 ml-4"
          >
            View Results
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Question {currentQuestionIndex + 1} / {questions.length}
          </h2>
          <h3 className="text-lg mb-4">{questions[currentQuestionIndex]?.question}</h3>
          <ul className="space-y-4">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li
                key={index}
                className={`cursor-pointer px-4 py-2 border rounded-md ${selectedAnswer === option ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleSelectAnswer(option)}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleSelectAnswer(option)}
                />
                {option}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300"
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
