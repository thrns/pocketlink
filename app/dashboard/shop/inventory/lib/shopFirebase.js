import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC6jzT2vbfYxyKTWU2Pn0N8QF1HQPh06bk',
  authDomain: 'shopdb-d25a2.firebaseapp.com',
  projectId: 'shopdb-d25a2',
  storageBucket: 'shopdb-d25a2.firebasestorage.app',
  messagingSenderId: '352768726300',
  appId: '1:352768726300:web:609b61c5e2a207ea2556d9',
  measurementId: 'G-WGMH3TXW49',
};

const shopApp = initializeApp(firebaseConfig, 'shopApp');
const shopRealDb = getDatabase(shopApp);
const shopStorage = getStorage(shopApp);

export { shopApp, shopRealDb, shopStorage };
