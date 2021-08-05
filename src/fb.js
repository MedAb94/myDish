import firebase from 'firebase/app'
import 'firebase/messaging'
import 'firebase/analytics'

var firebaseConfig = {
    apiKey: "AIzaSyBUAknCQIgjouzYDgCov9qfKyA8kB8BLdE",
    authDomain: "mydish-695f9.firebaseapp.com",
    projectId: "mydish-695f9",
    storageBucket: "mydish-695f9.appspot.com",
    messagingSenderId: "843113391160",
    appId: "1:843113391160:web:c14cd70390d4d2faf172cd",
    measurementId: "G-8X2CMGZD8E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const fb = {
        messaging: firebase.messaging()
    }

;
export default fb