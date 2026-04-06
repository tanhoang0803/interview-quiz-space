import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/config';

const googleProvider = new GoogleAuthProvider();

export const authService = {
  registerWithEmail: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),

  loginWithEmail: (email, password) =>
    signInWithEmailAndPassword(auth, email, password),

  loginWithGoogle: () => signInWithPopup(auth, googleProvider),

  logout: () => signOut(auth),

  getCurrentUser: () => auth.currentUser,

  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback),
};
