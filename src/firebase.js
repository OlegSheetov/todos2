// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEeCNi6WzL2YJbjwt1lxL7qUH6wiiMVCo",
  authDomain: "todos-234ff.firebaseapp.com",
  projectId: "todos-234ff",
  storageBucket: "todos-234ff.appspot.com",
  messagingSenderId: "497893460463",
  appId: "1:497893460463:web:52573170edd4ffd9db0e1a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp; 