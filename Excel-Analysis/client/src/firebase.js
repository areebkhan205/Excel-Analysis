
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgWT-qMihnj1WjaykItDe7J-SclGPHXqk",
  authDomain: "excel-analysis-33487.firebaseapp.com",
  projectId: "excel-analysis-33487",
  storageBucket: "excel-analysis-33487.appspot.com", // ✅ fixed
  messagingSenderId: "459878365691",
  appId: "1:459878365691:web:caf41123792aafe65a735e",
  measurementId: "G-LD6JQQE6ZM"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
