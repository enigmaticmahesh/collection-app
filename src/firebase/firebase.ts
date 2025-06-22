import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FB_CONFIGS } from './firebase-config';

const app = initializeApp(FB_CONFIGS.FB_CONFIG_OBJECT);
export const db = getFirestore(app);