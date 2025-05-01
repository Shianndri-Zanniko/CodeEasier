import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyAUDWOZIalieK1yIoM0Knr-T2Ai_TnGR2M",
    authDomain: "codeeasier-31c93.firebaseapp.com",
    projectId: "codeeasier-31c93",
    storageBucket: "codeeasier-31c93.firebasestorage.app",
    messagingSenderId: "745274734474",
    appId: "1:745274734474:web:4bf50c8a62daac25c77a73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
