// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJJ22m6oxF0Hh07QWHQCyA7jsffnSNXrU",
  authDomain: "agrodoc-96698.firebaseapp.com",
  projectId: "agrodoc-96698",
  storageBucket: "agrodoc-96698.appspot.com",
  messagingSenderId: "91047042637",
  appId: "1:91047042637:web:8612f64498be6328654604",
  measurementId: "G-L9RSBKF52P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB, auth}  