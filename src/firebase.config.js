// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDGZH92-962w75TtqDhZR-hX5aOtpnE5w",
  authDomain: "furnia-1234.firebaseapp.com",
  projectId: "furnia-1234",
  storageBucket: "furnia-1234.appspot.com",
  messagingSenderId: "54542753427",
  appId: "1:54542753427:web:48ed4e67037bab9a333766"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
 export const db = getFirestore(app);

 // Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
