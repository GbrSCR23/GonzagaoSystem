import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQE0RIul3-A6D2doQRcxWx1CCnPzwid6Q",
  authDomain: "gonzagaosystem-a50f1.firebaseapp.com",
  projectId: "gonzagaosystem-a50f1",
  storageBucket: "gonzagaosystem-a50f1.appspot.com",
  messagingSenderId: "163571846273",
  appId: "1:163571846273:web:6494cc74877fa977bb9180"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
