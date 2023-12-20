//====== FIREBASE ANALYTICS DATABASE CLIENT ======//

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

//====== FIREBASE CONFIGURATION ======//

const firebaseConfig = {
  apiKey: 'AIzaSyD_pmHn05AA5fRCr9OwLEHUNO5eUuNNOT4',
  authDomain: 'analyticsdb-8b019.firebaseapp.com',
  databaseURL: 'https://analyticsdb-8b019-default-rtdb.firebaseio.com',
  projectId: 'analyticsdb-8b019',
  storageBucket: 'analyticsdb-8b019.firebasestorage.app',
  messagingSenderId: '331481105078',
  appId: '1:331481105078:web:2291108c48ba3264071c17',
  measurementId: 'G-M0EH6BZXP2',
};

//====== FIREBASE INITIALIZATION ======//

// Initialize Firebase
const analyticsApp = initializeApp(firebaseConfig, 'analyticsApp');
const analyticsdb = getFirestore(analyticsApp);
const analyticsRealDb = getDatabase(analyticsApp);

//====== EXPORTS ======//

export { analyticsApp, analyticsRealDb, analyticsdb };
