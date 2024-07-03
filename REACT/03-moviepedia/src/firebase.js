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
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsHdqKiPkxqxGMEqFfmbc5sQ_o19-sxGk",
  authDomain: "moviepedia-4d9e3.firebaseapp.com",
  projectId: "moviepedia-4d9e3",
  storageBucket: "moviepedia-4d9e3.appspot.com",
  messagingSenderId: "553588789752",
  appId: "1:553588789752:web:5322d4af0b17757e7d860d",
  measurementId: "G-D6JW32NKVZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
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
