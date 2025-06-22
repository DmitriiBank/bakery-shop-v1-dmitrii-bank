// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGZSOg3SuriVzE80pYN9OnSMNCaIZK5g8",
    authDomain: "bakery-shop-235cb.firebaseapp.com",
    projectId: "bakery-shop-235cb",
    storageBucket: "bakery-shop-235cb.firebasestorage.app",
    messagingSenderId: "484236559318",
    appId: "1:484236559318:web:ab90568080905e5c3eda77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);