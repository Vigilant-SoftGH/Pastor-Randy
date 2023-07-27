import { initializeApp } from 'firebase/app';
import { getFirestore, initializeFirestore } from '@firebase/firestore';
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBBYAmNmjZWRO4rG_fBEFtjgdg0X-UgmjE",
  authDomain: "sda-tv-143b8.firebaseapp.com",
  projectId: "sda-tv-143b8",
  storageBucket: "sda-tv-143b8.appspot.com",
  messagingSenderId: "218858132136",
  appId: "1:218858132136:web:95898ff6ee8ad0afa2e89d",
  measurementId: "G-BZS8YB30RX"
};

let myApp = initializeApp(firebaseConfig);
initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const db = initializeFirestore(myApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
//initializeApp(firebaseConfig)
//export default getFirestore()

//export default myApp;