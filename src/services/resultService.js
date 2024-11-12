import { db } from '../utils/firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

// Save quiz result to Firestore
export const saveQuizResult = async (userId, quizId, answers, correctAnswers) => {
  try {
    // Calculate the number of correct answers
    const correctCount = answers.filter((answer, index) => answer === correctAnswers[index]).length;
    const totalQuestions = correctAnswers.length;
    
    // Prepare the result object
    const result = {
      userId,
      quizId,
      answers,
      correctAnswers,
      correctCount,
      totalQuestions,
      timestamp: new Date(),
    };
    
    // Save the result to Firestore in the 'quiz_results' collection
    await addDoc(collection(db, 'quiz_results'), result);
    console.log('Quiz result saved successfully');
  } catch (error) {
    console.error('Error saving quiz result: ', error);
  }
};

// Fetch results for a specific user
export const fetchUserResults = async (userId) => {
  try {
    const q = query(collection(db, 'quiz_results'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const results = querySnapshot.docs.map(doc => doc.data());
    return results;
  } catch (error) {
    console.error('Error fetching user results: ', error);
    return [];
  }
};

// Fetch all quiz results (for admin panel)
export const fetchAllResults = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'quiz_results'));
    const results = querySnapshot.docs.map(doc => doc.data());
    return results;
  } catch (error) {
    console.error('Error fetching all results: ', error);
    return [];
  }
};
