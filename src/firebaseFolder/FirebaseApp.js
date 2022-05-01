import { initializeApp } from "firebase/app";
import firebaseConfig from "./FirebaseConfig";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
console.log("firebaseconfig is ", firebaseConfig);
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
console.log(auth);

const usersColRef = collection(db, "users");

export default app;
