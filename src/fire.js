import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyB2fWegY6Y61AUwzTiRIMDwM5HdmMoSdzw",
    authDomain: "firestore-list.firebaseapp.com",
    databaseURL: "https://firestore-list.firebaseio.com",
    projectId: "firestore-list",
    storageBucket: "firestore-list.appspot.com",
    messagingSenderId: "906177463752"
  };
const fire = firebase.initializeApp(config);
export default fire;