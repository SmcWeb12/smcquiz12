import { useState, useEffect } from 'react';
import { fetchQuestions, calculateResults, saveQuizResult } from './services/quizService';

// In your component:
const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Fetch questions when the component mounts
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };
    loadQuestions();
  }, []);

  const handleSubmit = () => {
    // Calculate the result
    const result = calculateResults(questions, userAnswers);
    setResults(result);

    // Save the result to Firestore (assuming `userId` is available)
    const userId = 'someUserId'; // Replace with actual user ID
    saveQuizResult(userId, result);
  };

  return (
    <div>
      <h2>Math Quiz</h2>
      {questions.length > 0 ? (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <h3>{question.question}</h3>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => setUserAnswers(prev => {
                      const newAnswers = [...prev];
                      newAnswers[index] = option;
                      return newAnswers;
                    })}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}

      {results && (
        <div>
          <h3>Results</h3>
          <p>Correct Answers: {results.correct}</p>
          <p>Incorrect Answers: {results.incorrect}</p>
          <p>Total: {results.total}</p>
        </div>
      )}
    </div>
  );
};
