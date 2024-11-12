// src/utils/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdekrIdLYbrQzTxQa3Ti_4ZB-BDcbn7Ag",
  authDomain: "chat-app1-7206a.firebaseapp.com",
  databaseURL: "https://chat-app1-7206a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app1-7206a",
  storageBucket: "chat-app1-7206a.appspot.com",
  messagingSenderId: "1098228877013",
  appId: "1:1098228877013:web:89e0cad5d00945a007445c",
  measurementId: "G-KN80PZ4DN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };
