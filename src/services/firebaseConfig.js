// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR2N3DWP3weEY8JGb9GUwAFEPg9Kxwf9U",
  authDomain: "movha-moz.firebaseapp.com",
  projectId: "movha-moz",
  storageBucket: "movha-moz.appspot.com",
  messagingSenderId: "966475234802",
  appId: "1:966475234802:web:88f3c4f87b578282ab3f6b",
  measurementId: "G-13RHXV6MEG"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase}