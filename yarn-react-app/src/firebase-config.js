import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUyQ8mmld9zwmKObcfA70OkU9jPMnl-3g",
    authDomain: "yarn-website.firebaseapp.com",
    projectId: "yarn-website",
    storageBucket: "yarn-website.appspot.com",
    messagingSenderId: "880958016131",
    appId: "1:880958016131:web:d32b52c9816844713169b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();