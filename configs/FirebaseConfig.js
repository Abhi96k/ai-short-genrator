
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-shorts-video-genrator.firebaseapp.com",
  projectId: "ai-shorts-video-genrator",
  storageBucket: "ai-shorts-video-genrator.appspot.com",
  messagingSenderId: "80123555492",
  appId: "1:80123555492:web:3884bdb1d581a6c9200031",
  measurementId: "G-CGP2MMC7Q5",
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
