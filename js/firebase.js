import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfCUMSCx_kkfaFkAjUqohdH2Ki2H_Xlp0",
  authDomain: "mytodoapp-88b5e.firebaseapp.com",
  projectId: "mytodoapp-88b5e",
  storageBucket: "mytodoapp-88b5e.appspot.com",
  messagingSenderId: "968575282541",
  appId: "1:968575282541:web:e05401c11bd27933017e64",
  measurementId: "G-NPY6QHDVCY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
