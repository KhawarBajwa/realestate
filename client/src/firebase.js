// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-341e7.firebaseapp.com",
  projectId: "realestate-341e7",
  storageBucket: "realestate-341e7.appspot.com",
  messagingSenderId: "600183568241",
  appId: "1:600183568241:web:f27c5d11e9cbc39e54a8d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);