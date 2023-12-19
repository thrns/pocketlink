//====== FIREBASE MAIN DATABASE CLIENT ======//

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

//====== FIREBASE CONFIGURATION ======//

const firebaseConfig = {
  apiKey: 'AIzaSyDbfvvAV95twbvwPkDGjLCWUIHaTSpnA10',
  authDomain: 'maindb-361f3.firebaseapp.com',
  databaseURL: 'https://maindb-361f3-default-rtdb.firebaseio.com',
  projectId: 'maindb-361f3',
  storageBucket: 'maindb-361f3.firebasestorage.app',
  messagingSenderId: '884587255299',
  appId: '1:884587255299:web:742e705ebb5596bc126036',
  measurementId: 'G-D5970Q1F2T',
};

//====== FIREBASE INITIALIZATION ======//

const mainApp = initializeApp(firebaseConfig);
const db = getFirestore(mainApp);
const realDb = getDatabase(mainApp);
const auth = getAuth(mainApp);

//====== EXPORTS ======//

export { mainApp, realDb, db, auth };
