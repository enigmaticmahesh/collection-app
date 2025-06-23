import type { NameType } from '../app.types';
import { db } from './firebase';
import { FB_CONFIGS } from './firebase-config';
import {
    collection,
    addDoc,
    getDoc,
    doc,
    serverTimestamp,
    deleteDoc,
    // setDoc,
  } from 'firebase/firestore';

export const saveName = async (nameData: NameType) => {
    try {
        const invoiceColl = collection(db, FB_CONFIGS.COLLECTION.NAMES)
        const docRef = await addDoc( invoiceColl, {...nameData, createdAt: serverTimestamp()} );
        const docData = await getDoc(docRef);
        return { res: {...docData.data(), id: docData.id}, err: null }
    } catch (error) {
        console.log('Error, while adding person.');
        return { res: null, err: error }
    }
}

export const delName = async (nameDataID: string) => {
    try {
        const docRef = doc(db, FB_CONFIGS.COLLECTION.NAMES, nameDataID);
        await deleteDoc(docRef);
        return { res: 'Deleted succesfully', err: null }
    } catch (error) {
        console.log('Error, while deleting person.');
        return { res: null, err: error }
    }
}