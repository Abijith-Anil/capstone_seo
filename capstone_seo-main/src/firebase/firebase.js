// firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvnQOfCB30rkga5aCSmdNAWnBjS_iUKHQ",
  authDomain: "capstone-seo.firebaseapp.com",
  projectId: "capstone-seo",
  storageBucket: "gs://capstone-seo.firebasestorage.app",
  messagingSenderId: "851968095493",
  appId: "1:851968095493:web:062edc4e01664596acf36c",
  measurementId: "G-ZVRVLJCD67"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
