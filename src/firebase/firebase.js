// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvnQOfCB30rkga5aCSmdNAWnBjS_iUKHQ",
  authDomain: "capstone-seo.firebaseapp.com",
  projectId: "capstone-seo",
  storageBucket: "capstone-seo.firebasestorage.app",
  messagingSenderId: "851968095493",
  appId: "1:851968095493:web:062edc4e01664596acf36c",
  measurementId: "G-ZVRVLJCD67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app , auth};
export {db}; 