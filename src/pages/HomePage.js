// src/pages/HomePage.js

import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmitReview = () => {
    if (name && review) {
      alert(`Thank you for your review, ${name}!`);
      setName("");
      setReview("");
    } else {
      alert("Please provide your name and review.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Math Quiz</h1>
      <p className="mb-6 text-lg text-center">
        Test your math skills! Join our quiz challenge and compete with others. Here are some features:
      </p>
      <ul className="list-disc mb-6 pl-5">
        <li>Timed questions with 1-minute per question</li>
        <li>Questions for classes 11th and 12th</li>
        <li>Instant feedback with correct/incorrect answers</li>
      </ul>

      <Link to="/login">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 mb-6">
          Login to Start Quiz
        </button>
      </Link>

      <div className="mt-6 w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Your Review"
          value={review}
          onChange={handleReviewChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          rows="4"
        />
        <button
          onClick={handleSubmitReview}
          className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default HomePage;
