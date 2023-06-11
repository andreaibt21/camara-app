// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAD5uLWGQUpUpX94tuwdfeZOidX-zsCJII",
//   authDomain: "db-login-app-59134.firebaseapp.com",
//   projectId: "db-login-app-59134",
//   storageBucket: "db-login-app-59134.appspot.com",
//   messagingSenderId: "105086574080",
//   appId: "1:105086574080:web:9ccd1494c155e5e073c2e5"
// };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDr9YXmfleKDaByvBaeFFUBGAyb-1II8Sk",
  authDomain: "camarautn.firebaseapp.com",
  projectId: "camarautn",
  storageBucket: "camarautn.appspot.com",
  messagingSenderId: "920949888704",
  appId: "1:920949888704:web:0a158390c09f7bc908ff25"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);


const firebaseApp = initializeApp(firebaseConfig);

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth();

export default {firebaseConfig};