import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config();

export const firebaseConfig = {
  apiKey: "AIzaSyBoFlOt8CHRBVM8gNyHldr3ynMIBd1Yxhc",
  authDomain: "datasintesa-2bc4e.firebaseapp.com",
  projectId: "datasintesa-2bc4e",
  storageBucket: "datasintesa-2bc4e.appspot.com",
  messagingSenderId: "154869314103",
  appId: "1:154869314103:web:232f15f9bbb79bbac885b2",
  measurementId: "G-RM7PSCC71E",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
