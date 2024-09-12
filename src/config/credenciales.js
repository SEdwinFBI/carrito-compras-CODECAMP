// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfEyOWbWsZSgf4d91TUxe6BhH1brjtKWA",
  authDomain: "codecamp-carrito-de-compras.firebaseapp.com",
  projectId: "codecamp-carrito-de-compras",
  storageBucket: "codecamp-carrito-de-compras.appspot.com",
  messagingSenderId: "137399662510",
  appId: "1:137399662510:web:5431093c1aaca9c2827a3f"
};

// Initialize Firebase
const fireLogin = initializeApp(firebaseConfig);
export default fireLogin;