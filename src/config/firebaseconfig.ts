// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
  apiKey: "AIzaSyCY83wYUDwHLCxybln0AiMesnbaa_DxRXs",
  authDomain: "quiz-app-reactfirebase.firebaseapp.com",
  projectId: "quiz-app-reactfirebase",
  storageBucket: "quiz-app-reactfirebase.appspot.com",
  messagingSenderId: "344994308751",
  appId: "1:344994308751:web:243032f5be2bd7b16e06fa",
  measurementId: "G-PT7S2KP403"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);