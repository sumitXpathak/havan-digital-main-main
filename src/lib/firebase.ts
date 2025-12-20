// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM FIREBASE CONSOLE
const firebaseConfig = {
   apiKey: "AIzaSyAGgkXDKzYwApXnbvSMkRqD3VuhltcDgsY",
  authDomain: "havan-samidha.firebaseapp.com",
  projectId: "havan-samidha",
  storageBucket: "havan-samidha.firebasestorage.app",
  messagingSenderId: "370503417168",
  appId: "1:370503417168:web:3eecacabb8be7e6132c055",
  measurementId: "G-YJ8ZWP00LR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);