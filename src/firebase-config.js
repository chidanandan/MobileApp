import firebase from "firebase";
//import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCotX_o1wgC608XFc0Ik7692C4qs3d33ok",
  authDomain: "fir-basics-96018.firebaseapp.com",
  databaseURL: "https://fir-basics-96018-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-basics-96018",
  storageBucket: "fir-basics-96018.appspot.com",
  messagingSenderId: "982896571110",
  appId: "1:982896571110:web:2660be0f0082829aac8127",
  measurementId: "G-ZGT2BSYQJN"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
