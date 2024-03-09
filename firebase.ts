// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcTqvePHwIoaGMskYofEkk0AVkBcWqd-s",
  authDomain: "code-questions-163cb.firebaseapp.com",
  projectId: "code-questions-163cb",
  storageBucket: "code-questions-163cb.appspot.com",
  messagingSenderId: "847125548780",
  appId: "1:847125548780:web:84fbec4ae076d4555adfc9",
  measurementId: "G-4XJ5NZ3XSE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
