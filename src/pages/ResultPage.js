import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { score, correctAnswers, incorrectAnswers, questions } = location.state || {};

  if (!score && score !== 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Quiz Results</h1>
      <div className="text-center">
        <p className="text-xl mb-4">Your Score: {score} / {questions.length}</p>
        <p className="text-lg mb-4">Correct Answers: {correctAnswers.length}</p>
        <p className="text-lg mb-4">Incorrect Answers: {incorrectAnswers.length}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Correct Answers:</h2>
        {correctAnswers.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{question.question}</p>
            <p className="text-green-500">Your Answer: {question.correctAnswer}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Incorrect Answers:</h2>
        {incorrectAnswers.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium">{question.question}</p>
            <p className="text-red-500">Your Answer: {question.selectedAnswer}</p>
            <p className="text-green-500">Correct Answer: {question.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
