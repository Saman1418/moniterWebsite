import firebase from "firebase";

const firebaseConfig = {
  // apiKey: "AIzaSyDQg2F3GMyLGx30b5ty6MpsRUIOGWMjjdM",
  // authDomain: "test-bd7c2.firebaseapp.com",
  // databaseURL: "https://test-bd7c2-default-rtdb.firebaseio.com",
  // projectId: "test-bd7c2",
  // storageBucket: "test-bd7c2.appspot.com",
  // messagingSenderId: "857656623850",
  // appId: "1:857656623850:web:23ffa4654b3c05d8bacd93",
  // measurementId: "G-5L5C60YFMF"
  apiKey: "AIzaSyAshLLDT66v-W7bJtn_sjaFGqAQTk_c5vI",
  authDomain: "healthwallet-d6d30.firebaseapp.com",
  projectId: "healthwallet-d6d30",
  storageBucket: "healthwallet-d6d30.appspot.com",
  messagingSenderId: "132906735651",
  appId: "1:132906735651:web:402412a76998c680e5f996",
  measurementId: "G-EC1NX4QHNZ"
};

// if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
// }

export default firebase;
