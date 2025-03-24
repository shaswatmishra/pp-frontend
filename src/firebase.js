// / Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6E8nUvd1wnwCpIMnY1P3NajXcmQuY3bg",
  authDomain: "practice-plus.firebaseapp.com",
  projectId: "practice-plus",
  storageBucket: "practice-plus.appspot.com",
  messagingSenderId: "47531057005",
  appId: "1:47531057005:web:8ab8c4d5ac4c8019ff8464"
};

// const phoneNumber = getPhoneNumberFromUserInput();
const app = initializeApp(firebaseConfig);
export default app;
// const auth = getAuth(app);

