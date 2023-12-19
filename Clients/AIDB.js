//====== AI FIREBASE DATABASE CLIENT ======//

import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

//====== FIREBASE CONFIGURATION ======//

const firebaseConfig = {
  apiKey: 'AIzaSyCCfW7ggusKv0IEmZzBZ5MXDitdo3D7NkQ',
  authDomain: 'aichatdb-b835c.firebaseapp.com',
  projectId: 'aichatdb-b835c',
  storageBucket: 'aichatdb-b835c.firebasestorage.app',
  messagingSenderId: '472631144420',
  appId: '1:472631144420:web:0bb7c29f03f3e6296061f1',
  measurementId: 'G-JSL0VR45N0',
};

//====== FIREBASE INITIALIZATION ======//

const AiApp = initializeApp(firebaseConfig, 'AiApp');
const aiRealDb = getDatabase(AiApp);

//====== EXPORTS ======//

export { AiApp, aiRealDb };
