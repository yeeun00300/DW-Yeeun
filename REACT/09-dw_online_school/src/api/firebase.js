import { initializeApp } from "firebase/app";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCC7nWhffXQdxqKKinjuzFBJRf5i0yyZAo",
  authDomain: "dwos-9daf1.firebaseapp.com",
  projectId: "dwos-9daf1",
  storageBucket: "dwos-9daf1.appspot.com",
  messagingSenderId: "1084678018334",
  appId: "1:1084678018334:web:0168d70a25b1e16e97250f",
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

async function getData(collectionName, option) {
  const { field, condition, value } = option;
  const collect = collection(db, collectionName);
  const q = query(collect, where(field, condition, value));
  const snapshot = await getDocs(q);
  const resultData = { ...snapshot.docs[0].data(), docId: snapshot.docs[0].id };
  return resultData;
}

async function getMember(values) {
  const { email, password } = values;

  const collect = collection(db, "member");
  const q = query(collect, where("email", "==", email));
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;

  let message;
  let memberObj = {};

  if (docs.length == 0) {
    message = "이메일이 올바르지 않습니다.";
  } else {
    const memberData = { ...docs[0].data(), docId: docs[0].id };
    if (password === memberData.password) {
      message = "로그인에 성공했습니다.";
      memberObj = {
        email: memberData.email,
        docId: memberData.docId,
      };
    } else {
      message = "비밀번호가 일치하지않습니다.";
    }
  }

  return { memberObj, message };
}

async function upDateDatas(collectionName, docId, updateObj, option) {
  // 문서의 reference 객체가 필요
  const docRef = doc(db, collectionName, docId);
  try {
    if (!option) {
      await updateDoc(docRef, updateObj);
    } else {
      if (option.type == "ADD") {
        await updateDoc(docRef, { [option.fieldName]: arrayUnion(updateObj) });
      } else if (option.type == "DELETE") {
        await updateDoc(docRef, { [option.fieldName]: arrayRemove(updateObj) });
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

export { db, getDatas, getData, getMember, upDateDatas };
