// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "inventory-management-662f8.firebaseapp.com",
  projectId: "inventory-management-662f8",
  storageBucket: "inventory-management-662f8.appspot.com",
  messagingSenderId: "856614255715",
  appId: "1:856614255715:web:6e8b84a0e2a45b1bb24c56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}

//inventory boxes counts number 1