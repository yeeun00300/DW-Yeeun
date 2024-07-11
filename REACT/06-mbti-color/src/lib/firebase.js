import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyhDUKmrwzgaN87VP5NoGvMqY_B5OQ0vw",
  authDomain: "mbtiproject-f3141.firebaseapp.com",
  projectId: "mbtiproject-f3141",
  storageBucket: "mbtiproject-f3141.appspot.com",
  messagingSenderId: "311530218322",
  appId: "1:311530218322:web:03ad07023e6ef97264d08b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getAllDatas(collectionName, order) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy(order, "desc")); // desc : 내림차순
  const querySnapshot = await getDocs(q);
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
  //   debugger;
}

export { getAllDatas };
