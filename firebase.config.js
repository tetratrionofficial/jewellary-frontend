// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpOy7U_kldo3sU6lrTDSjtbE2syeqkQxc",
  authDomain: "tetra-chat.firebaseapp.com",
  projectId: "tetra-chat",
  storageBucket: "tetra-chat.appspot.com",
  messagingSenderId: "161814118092",
  appId: "1:161814118092:web:88f86a125b8eb7b4bccc69",
  measurementId: "G-4FEGWLNQRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
