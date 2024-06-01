// public/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfJ-RopB-jqngl44eVVtP-iGwCXoMHQFg",
  authDomain: "code-hunt-2ed6c.firebaseapp.com",
  projectId: "code-hunt-2ed6c",
  storageBucket: "code-hunt-2ed6c.appspot.com",
  messagingSenderId: "715230625117",
  appId: "1:715230625117:web:e0b180b331ffe4f2e87cb4",
  measurementId: "G-G1NV0YHWB4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
