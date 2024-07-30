import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiyIS7cSOIdTCxp0694_SEP9e3neWzyH4",
  authDomain: "chatting-7137e.firebaseapp.com",
  projectId: "chatting-7137e",
  storageBucket: "chatting-7137e.appspot.com",
  messagingSenderId: "673828707291",
  appId: "1:673828707291:web:76f678745486f34b2c25fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function getUserAuth() {
  return auth;
}

async function uploadImage(path, imgFile) {
  const storage = getStorage();
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, imgFile);
  const url = await getDownloadURL(imageRef);
  return url;
}

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);

  // try {
  //   const uuid = crypto.randomUUID();
  //   const path = `profile/${uuid}`;
  //   const url = await uploadImage(path, addObj.photoUrl);
  //   addObj.photoUrl = url;

  //   const collect = collection(db, collectionName);
  //   const result = await addDoc(collect, addObj);
  //   // const docSnap = await getDoc(result);
  //   return result;
  // } catch (error) {
  //   return false;
  // }
}
function getRealTimeMessage(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}

function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: "text", operator: "==", value: "test" },
    { field: "uid", operator: "==", value: "xjdiwjKDJ2jdkxJND2J" },
  ];

  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });
  // limits 조건
  q = query(q, limit(limits));
  return q;
}

export { db, getUserAuth, addDatas, getRealTimeMessage, getQuery };
