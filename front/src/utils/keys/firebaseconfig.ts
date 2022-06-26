import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJkqhwIrlpXcT8arnwQpP_SrYRVd9sCoo",
  authDomain: "ramirez-2bb46.firebaseapp.com",
  projectId: "ramirez-2bb46",
  storageBucket: "ramirez-2bb46.appspot.com",
  messagingSenderId: "550534213926",
  appId: "1:550534213926:web:a7c6d50004365142ce11e7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export {storage, ref, firebaseApp as default }