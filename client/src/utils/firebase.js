import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCFTlX9QLExmQldkfXFax_NW5eYqt7Cmd0",
  authDomain: "tritontalk-d063d.firebaseapp.com",
  databaseURL: "https://tritontalk-d063d.firebaseio.com",
  projectId: "tritontalk-d063d",
  storageBucket: "tritontalk-d063d.appspot.com",
  messagingSenderId: "539894428754",
  appId: "1:539894428754:web:95fa308cf5044f380f5b8b",
  measurementId: "G-R4KEHTF98C"
};
// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);
export default db;
export const storage = firebase.storage()
export const GoogleSignOn = new firebase.auth.GoogleAuthProvider()
