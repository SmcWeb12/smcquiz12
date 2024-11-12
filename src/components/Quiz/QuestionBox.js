// src/components/Quiz/QuestionBox.js
import React, { useState, useEffect } from 'react';

const QuestionBox = ({ question, options, correctAnswer, onAnswerSubmit, timer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && !answered) {
      // Automatically submit if the time runs out
      handleSubmitAnswer();
    }
    const interval = setInterval(() => {
      if (timeLeft > 0 && !answered) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, answered]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      alert("Please select an answer!");
    } else {
      setAnswered(true);
      onAnswerSubmit(selectedOption === correctAnswer);
    }
  };

  return (
    <div className="border-2 p-4 rounded-lg bg-white shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div
            key={index}
            className={`border-2 p-2 rounded-lg cursor-pointer ${
              selectedOption === option ? "bg-blue-100" : "bg-gray-100"
            }`}
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-lg font-medium">Time Left: {timeLeft}s</div>
        <button
          onClick={handleSubmitAnswer}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={answered}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionBox;
