import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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

export { db, getDatas };
