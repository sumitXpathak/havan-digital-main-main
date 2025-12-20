// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM FIREBASE CONSOLE
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "12345...",
  appId: "1:12345..."
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);