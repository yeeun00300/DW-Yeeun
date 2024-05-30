import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCUNn_mih2P4G9Lmyn5J3WRSxnwEy-FAGY",
  authDomain: "hiiii-cff65.firebaseapp.com",
  projectId: "hiiii-cff65",
  storageBucket: "hiiii-cff65.appspot.com",
  messagingSenderId: "264321131357",
  appId: "1:264321131357:web:9aaec6c78cbc9611177eb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMembers() {
  const collect = await collection(db, "member");
  const snapshot = await getDocs(collect);

  return snapshot;
}

export { db, getMembers };
