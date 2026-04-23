import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAlNGc0MKGJa_SI7UATmBqgblrSw24eE7I",
  authDomain: "the-learning-guru.firebaseapp.com",
  projectId: "the-learning-guru",
  storageBucket: "the-learning-guru.firebasestorage.app",
  messagingSenderId: "230147999420",
  appId: "1:230147999420:web:5bf3e457a9f6276c5df2b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
