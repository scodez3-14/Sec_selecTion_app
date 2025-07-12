import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDC2B_sFrtdAUELUeBv2bKODGZjgJDcAmo",
  authDomain: "cq-app-878c9.firebaseapp.com",
  projectId: "cq-app-878c9",
  storageBucket: "cq-app-878c9.appspot.com", 
  messagingSenderId: "947323828580",
  appId: "1:947323828580:web:f19126d7cd4495da926271"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

