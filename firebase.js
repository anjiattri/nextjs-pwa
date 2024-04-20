import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBg2K8qqjLYGannfmcZrqbCD2Xw_XzJmDI",
  authDomain: "notification-424e3.firebaseapp.com",
  projectId: "notification-424e3",
  storageBucket: "notification-424e3.appspot.com",
  messagingSenderId: "251413067178",
  appId: "1:251413067178:web:e897a48a982640d56d27d3",
  measurementId: "G-11C91JHHTR",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
