import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  try {
    // 문서 ID 수동
    // const saveDoc = await doc(db, collectionName, "2");
    // console.log(`doc()결과 : ${saveDoc}`);
    // const saveResult = await setDoc(saveDoc, dataObj);
    // console.log(`setDoc()결과 : ${saveResult}`);

    // 문서 ID 자동
    const collect = collection(db, collectionName);
    await addDoc(collect, dataObj); // 결과 == undefined
    return true;
  } catch (error) {
    return false;
  }
}

async function deleteDatas(collectionName, docId, updateInfoObj) {
  const docRef = await doc(db, collectionName, docId);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서id);
  // getDoc(문서 레퍼런스);
  // updateDoc(문서데이터,수정할정보객체);
  const docRef = doc(db, collectionName, docId);
  // const docData = getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export { db, getDatas, addDatas, deleteDatas, updateDatas };
