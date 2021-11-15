import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCssbLEWbUHm76VaKooTLGrEEFdFI65Ni0",
    authDomain: "letmework-b6d46.firebaseapp.com",
    projectId: "letmework-b6d46",
    storageBucket: "letmework-b6d46.appspot.com",
    messagingSenderId: "489498344413",
    appId: "1:489498344413:web:4ab81def9db6d9a47c1434"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export default firebase;

//authDomain: "letmework-8ef42.firebaseapp.com",

