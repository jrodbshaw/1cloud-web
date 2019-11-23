import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBCX8QFVKJCCynvsSETcR1R7_jDvi3PTwM",
    authDomain: "onecloud-91726.firebaseapp.com",
    databaseURL: "https://onecloud-91726.firebaseio.com",
    projectId: "onecloud-91726",
    storageBucket: "onecloud-91726.appspot.com",
    messagingSenderId: "180468945911",
    appId: "1:180468945911:web:6b0970e90c1d9441"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };