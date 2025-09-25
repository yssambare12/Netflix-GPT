
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";






const firebaseConfig = {
  apiKey: "AIzaSyBSZWogJTsV6-BUqnODSATljYjUP4KVf3Y",
  authDomain: "netflixgpt-1d7f9.firebaseapp.com",
  projectId: "netflixgpt-1d7f9",
  storageBucket: "netflixgpt-1d7f9.firebasestorage.app",
  messagingSenderId: "417932216797",
  appId: "1:417932216797:web:9f479262d57c5d456e0e34",
  measurementId: "G-F427YZ29KS",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
