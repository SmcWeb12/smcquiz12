// services/botService.js
import { db } from '../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

// Function to generate a random algebra question for the bot
export const generateAlgebraQuestion = () => {
  // Generate random coefficients for the algebraic equation
  const a = Math.floor(Math.random() * 10) + 1; // Random coefficient for x
  const b = Math.floor(Math.random() * 10);     // Random constant term
  const c = Math.floor(Math.random() * 20);     // Random right-hand side value

  // The equation format is: ax + b = c
  const question = `Solve for x: ${a}x + ${b} = ${c}`;

  // Calculate the correct answer for the equation
  const correctAnswer = (c - b) / a;

  // Generate options for the question (one correct answer and 3 random wrong options)
  const options = generateOptions(correctAnswer);

  // Save the generated question to Firestore
  saveQuestionToDB('Algebra', question, options, correctAnswer);
};

// Function to generate multiple options for the question
const generateOptions = (correctAnswer) => {
  const options = [correctAnswer]; // Start with the correct answer

  // Generate 3 random wrong options
  while (options.length < 4) {
    const randomOption = Math.floor(correctAnswer + (Math.random() * 10 - 5)); // Generate a number near the correct answer
    if (!options.includes(randomOption)) options.push(randomOption); // Avoid duplicates
  }

  // Shuffle the options to randomize their order
  return options.sort(() => Math.random() - 0.5);
};

// Function to save the question to Firestore
const saveQuestionToDB = async (topic, question, options, correctAnswer) => {
  try {
    // Add the question data to the 'questions' collection in Firestore
    await addDoc(collection(db, 'questions'), {
      topic,
      question,
      options,
      correctAnswer,
      class: '11th', // You can modify this based on the class, e.g., '12th'
    });
    console.log('Question added successfully to Firestore!');
  } catch (error) {
    console.error('Error adding question to Firestore: ', error);
  }
};
