// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOe7loHNqYMI_LKi2gpgjFU8LSBl55VFA",
  authDomain: "accounting-7595e.firebaseapp.com",
  projectId: "accounting-7595e",
  storageBucket: "accounting-7595e.appspot.com",
  messagingSenderId: "849012512384",
  appId: "1:849012512384:web:521bdd827d17bd55f97865",
  measurementId: "G-SPV0M4C7EY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);