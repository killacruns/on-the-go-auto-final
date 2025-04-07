// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJI44s1Dr9gfUvbsO9lewBWT-gStPGm0w",
  authDomain: "on-the-go-auto.firebaseapp.com",
  projectId: "on-the-go-auto",
  storageBucket: "on-the-go-auto.firebasestorage.app",
  messagingSenderId: "920730608670",
  appId: "1:920730608670:web:a12c12a8df4c7f49a4ba0f",
  measurementId: "G-Y35FDN4DXW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
