// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyBcxcp0h3nDLa0EiiHztBiTRbuplOqAj7I",
     authDomain: "recruitment3-1409e.firebaseapp.com",
     projectId: "recruitment3-1409e",
     storageBucket: "recruitment3-1409e.firebasestorage.app",
     messagingSenderId: "26031387678",
     appId: "1:26031387678:web:8260b7a693cd8fb8a42a0f",
     measurementId: "G-0Y49FY8XZR"
    };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 