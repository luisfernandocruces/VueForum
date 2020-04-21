import  firebase  from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDSZ1hysYzlrLoRTaGr383IlgDcgEeHl7M",
    authDomain: "foro-633cb.firebaseapp.com",
    databaseURL: "https://foro-633cb.firebaseio.com",
    projectId: "foro-633cb",
    storageBucket: "foro-633cb.appspot.com",
    messagingSenderId: "519900132512",
    appId: "1:519900132512:web:bc892846f83e11aeb605c5",
    measurementId: "G-ZPCB2240LL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore(); 
  