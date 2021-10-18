import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  setPersistence,
  signOut,
} from "firebase/auth";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
export const createUser = createUserWithEmailAndPassword;
export const loginUser = signInWithEmailAndPassword;
export const sendVerificationEmail = sendEmailVerification;
export const resetPassword = sendPasswordResetEmail;
export const googleProvider = new GoogleAuthProvider();
export const continueWithGoogle = signInWithPopup;
export const getUserAdditionalInfo = getAdditionalUserInfo;
export const setUserPersistence = setPersistence;
export const userSignout = signOut;
