const firebaseConfig = {
  apiKey: "AIzaSyCUNn_mih2P4G9Lmyn5J3WRSxnwEy-FAGY",
  authDomain: "hiiii-cff65.firebaseapp.com",
  projectId: "hiiii-cff65",
  storageBucket: "hiiii-cff65.appspot.com",
  messagingSenderId: "264321131357",
  appId: "1:264321131357:web:9aaec6c78cbc9611177eb4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getDatas(collectionName) {
  const querySnapshot = await db.collection(collectionName).get();
  return querySnapshot;
}

async function addDatas(collectionName, addObj) {
  const result = await db.collection(collectionName).add(addObj);
  return result;
}

async function deleteDatas(collectionName, docId) {
  try {
    await db.collection(collectionName).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  await db.collection(collectionName).doc(docId).update(updateObj);
}
