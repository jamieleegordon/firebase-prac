import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDa6wCA27dzfPA7ryGFQ_d28k-pdH4LQBQ",
  authDomain: "fir-course-f2119.firebaseapp.com",
  projectId: "fir-course-f2119",
  storageBucket: "fir-course-f2119.firebasestorage.app",
  messagingSenderId: "1003849966679",
  appId: "1:1003849966679:web:c3e8a40d628fa5a31e2f12",
  measurementId: "G-PLBWJJK895"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)

const analytics = getAnalytics(app);


