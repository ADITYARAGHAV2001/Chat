import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWCbzyK-6XPsiSs4NxJ_TuJOxSkMS0WpA",
    authDomain: "chat-46aa2.firebaseapp.com",
    projectId: "chat-46aa2",
    storageBucket: "chat-46aa2.appspot.com",
    messagingSenderId: "298903900252",
    appId: "1:298903900252:web:412732a47725925c839699",
    measurementId: "G-TQL284J4V4"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()