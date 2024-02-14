import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCpIxb7KYyaxEHNbPyDCLfnVzkBBEQJckU",
  authDomain: "tldraw-app.firebaseapp.com",
  projectId: "tldraw-app",
  storageBucket: "tldraw-app.appspot.com",
  messagingSenderId: "63058430083",
  appId: "1:63058430083:web:f19411bf0cb621730d73b6",
  measurementId: "G-HEEC7FD2VD"
};
  
const app = initializeApp(firebaseConfig)

  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage= getStorage(app)  



export {auth,db,storage}