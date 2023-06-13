import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQMncZ-gTUzAYzVbvD_WBZ_mdVX3bInAo",
  authDomain: "miniblog-f5795.firebaseapp.com",
  projectId: "miniblog-f5795",
  storageBucket: "miniblog-f5795.appspot.com",
  messagingSenderId: "427661680945",
  appId: "1:427661680945:web:1216f04df3d2c8f2f59010"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
