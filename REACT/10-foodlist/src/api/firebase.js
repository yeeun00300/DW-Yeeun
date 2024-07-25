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
  const result = await addDoc(getCollection(collectionName), addObj); // 추가된 docRef 문서 나옴
  const docSnap = await getDoc(result); //docRef에서 꺼내기
  const resultData = { ...docSnap.data(), docId: docSnap.id };
  return resultData;
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
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));
  return { resultData, lastQuery };
  // 키값을 써주지않으면 value가 key 이자 value가 됨
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // 스토리지에 있는 이미지를 삭제할 때 필요한 것 ==> 파일명(경로포함) or 파일 url
  // 스토리지 객체 생성
  const storage = getStorage();
  let message;
  //try catch => try 부분에서 오류나면 catch로 이동 => finally 성공하던 실패하던 무조건 마지막으로 실행
  try {
    message = "이미지 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 파일의 참조 객체 생성(ref 함수 사용)
    const deleteRef = ref(storage, imgUrl);
    // 파일 삭제
    await deleteObject(deleteRef);

    message = "문서 삭제에 실패했습니다. \n관리자에게 문의하세요.";
    // 삭제할 문서의 참조 객체 생성(doc 함수 사용)
    const deleteDocRef = doc(db, collectionName, docId);
    await deleteDoc(deleteDocRef);

    return { result: true, message: message };
  } catch (error) {
    return { result: false, message: message };
  }
  // finally
}

async function updateDatas(collectionName, dataObj, docId) {
  const docRef = await doc(db, collectionName, docId);
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  // 사진파일 수정됐을때
  if (dataObj.imgUrl !== null) {
    // 기존 저장되어있던 이미지 삭제
    const docSnap = await getDoc(docRef);
    const prevImgUrl = docSnap.data().imgUrl;
    const storage = getStorage();
    const deleteRef = ref(storage, prevImgUrl);
    await deleteObject(deleteRef);
    // 새로운 이미지 추가
    const uuid = crypto.randomUUID();
    const path = `food/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    dataObj.imgUrl = url;
  } else {
    delete dataObj["imgUrl"];
  }
  // 사진파일 수정안됐을때
  await updateDoc(docRef, dataObj);
  const updatedData = await getDoc(docRef);
  const resultData = { docId: updatedData.id, ...updatedData.data() };
  return resultData;
}

export { addDatas, getDatasOrderByLimit, deleteDatas, updateDatas, getDatas };
