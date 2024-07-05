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

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

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

async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  //  query(컬렉션 정보, 조건1, 조건2, 조건3...)
  const q = query(collect, orderBy(options.order, "desc"));
  // asc 오름차순 (A,B,C)--> 기본값, desc 내림차순(C,B,A)
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return resultData;
}

async function getDatasByOrderLimit(collectionName, options) {
  const collect = await collection(db, collectionName);
  //  query(컬렉션 정보, 조건1, 조건2, 조건3...)
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }

  // asc 오름차순 (A,B,C)--> 기본값, desc 내림차순(C,B,A)
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];
  console.log(lastQuery);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
  // 키값을 써주지않으면 value가 key 이자 value가 됨
}

async function addDatas(collectionName, dataObj) {
  try {
    // 겹치치않게 이름 정해주기
    const uuid = crypto.randomUUID();
    // 사진경로 저장해주기
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);

    dataObj.imgUrl = url;

    // createdAt, updatedAt ==> 현재 날짜 밀리세컨즈로 바꿔서 넣어주기
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // id 필드의 값 ==> 가장 큰 id + 1
    const lastId = await getLastNum(collectionName, "id");
    dataObj.id = lastId + 1;

    // 문서 ID 자동
    const collect = collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); // result == documentReference
    const resultData = { ...docSnap.data(), docId: docSnap.id };
    return resultData;
  } catch (error) {
    return false;
  }
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

// 스토리지에 파일 올리는 함수작성
async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);
  // 저장한 File의 url 가져오기
  const url = await getDownloadURL(imageRef);
  return url;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();

  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. collection 에서 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서id);
  // getDoc(문서 레퍼런스);
  // updateDoc(문서데이터,수정할정보객체);
  const docRef = doc(db, collectionName, docId);
  // const docData = getDoc(docRef);
  await updateDoc(docRef, updateInfoObj);
}

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
