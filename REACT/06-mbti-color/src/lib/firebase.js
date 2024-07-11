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

async function getAllDatas(collectionName, order, lq) {
  const collect = collection(db, collectionName);
  let q = query(collect, orderBy(order, "desc"), limit(10)); // desc : 내림차순
  if (lq) {
    q = query(collect, orderBy(order, "desc"), startAfter(lq), limit(10));
  }
  const querySnapshot = await getDocs(q);
  const lastQuery = querySnapshot.docs[querySnapshot.docs.length - 1];
  const resultData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return { resultData, lastQuery };
  //   debugger;
}

async function addDatas(collectionName, dataObj) {
  const collect = collection(db, collectionName);
  //id값 생성
  const lastid = (await getLastNum(collectionName, "id")) + 1;
  //날짜 생성
  const time = new Date().getTime();
  //추가할 data 객체에 필요한 필드 정보 추가
  dataObj.id = lastid;
  dataObj.createdAt = time;
  dataObj.updatedAt = time;
  //문서에 data객체 저장
  const result = await addDoc(collect, dataObj);
  return result;
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

export { getAllDatas, addDatas };
