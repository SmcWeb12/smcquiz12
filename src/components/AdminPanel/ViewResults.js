import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation(); // Get the scores passed from the quiz
  const { scores } = state || [];

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-4">Quiz Results</h2>
      <div className="space-y-4">
        {scores && scores.length > 0 ? (
          scores.map((scoreData, index) => (
            <div key={index} className="border-b pb-3 mb-3">
              <p className="font-semibold">User: {scoreData.userId}</p>
              <p className="text-lg">Score: {scoreData.score}</p>
            </div>
          ))
        ) : (
          <p>No scores available.</p>
        )}
      </div>
    </div>
  );
};

export default Result;
