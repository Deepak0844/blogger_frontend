import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_4z10ZHxA53i0CHYyePRoJj_U1vPfweQ",
  authDomain: "blog-app-a46d7.firebaseapp.com",
  projectId: "blog-app-a46d7",
  storageBucket: "blog-app-a46d7.appspot.com",
  messagingSenderId: "68635047225",
  appId: "1:68635047225:web:64163d4200a4597ef7a4e8",
  measurementId: "G-0X4MWJCJLX",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };
