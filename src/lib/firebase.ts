import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// These are public Client SDK configurations. 
// Security is enforced via Firestore Security Rules.
const firebaseConfig = {
  apiKey: "AIzaSyBuUb02ljVKxZs0SkYBXKNNYzHPlnzPjCc",
  authDomain: "sevlo-cosmetica-uriel.firebaseapp.com",
  projectId: "sevlo-cosmetica-uriel",
  storageBucket: "sevlo-cosmetica-uriel.firebasestorage.app",
  messagingSenderId: "854562231709",
  appId: "1:854562231709:web:00fe782f472d6e4a9f4b74"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
