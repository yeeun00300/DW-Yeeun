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
  apiKey: "AIzaSyBMFwBpirVXWXjth8zjOfB6cUjujTiIfiU",
  authDomain: "foodlist-9d93e.firebaseapp.com",
  projectId: "foodlist-9d93e",
  storageBucket: "foodlist-9d93e.appspot.com",
  messagingSenderId: "46801300187",
  appId: "1:46801300187:web:ef353883eda4212c51bafe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

function createPath(path) {
  const uuid = crypto.randomUUID();
  return path + uuid;
}

async function addDatas(collectionName, addObj) {
  // 파일 저장 ==> 스토리지의 이미지 url을 addObj의 imgUrl 값으로 변경
  const path = createPath("food/");
  const url = await uploadImage(path, addObj.imgUrl);
  addObj.imgUrl = url;

  // id 생성
  const lastId = (await getLastNum(collectionName, "id")) + 1;
  addObj.id = lastId;

  // 시간 정보 생성
  const time = new Date().getTime();
  addObj.createdAt = time;
  addObj.updatedAt = time;

  // 컬렉션에 저장
  await addDoc(getCollection(collectionName), addObj);
}

async function uploadImage(path, file) {
  const storage = getStorage();
  const imageRef = ref(storage, path);

  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, file);

  // 저장한 File의 url을 받는다.
  const url = await getDownloadURL(imageRef);
  return url;
}

async function getLastNum(collectionName, field) {
  const q = query(
    getCollection(collectionName), // collection
    orderBy(field, "desc"), // 정렬할 필드로 내림차순
    limit(1) // 1개만 가져온다
  );
  const lastDoc = await getDocs(q);
  const lastId = lastDoc.docs[0].data()[field];
  return lastId;
}

async function getDatasOrderByLimit(collectionName, options) {
  // const { fieldName, limits } = options;
  // const q = query(
  //   getCollection(collectionName),
  //   orderBy(fieldName, "desc"),
  //   limit(limits)
  // );
  // const snapshot = await getDocs(q);
  // const resultData = snapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   docId: doc.id,
  // }));
  // return resultData;

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

export { addDatas, getDatasOrderByLimit };
