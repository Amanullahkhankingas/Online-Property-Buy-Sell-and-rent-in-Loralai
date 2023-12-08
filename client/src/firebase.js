

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {

  apiKey: "AIzaSyCvaTvOxe21_Z2aIIO8XfefMdFUckQx_i4",

  authDomain: "property-buysellrent-inloralai.firebaseapp.com",

  projectId: "property-buysellrent-inloralai",

  storageBucket: "property-buysellrent-inloralai.appspot.com",

  messagingSenderId: "638347392900",

  appId: "1:638347392900:web:406e4cf55104939af84fd1",

  measurementId: "G-B98PXC2FQM"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   // apiKey: "AIzaSyB1EDwCgo2xmQDeeht5jnwVF_I06sbSOzI",
//   authDomain: "all-pakistan-real-estate.firebaseapp.com",
//   projectId: "all-pakistan-real-estate",
//   storageBucket: "all-pakistan-real-estate.appspot.com",
//   messagingSenderId: "768391181714",
//   appId: "1:768391181714:web:d43ef7b6a8cd3a2e417d4b"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
