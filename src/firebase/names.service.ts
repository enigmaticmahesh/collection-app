import type { COLLECTION_TOTAL, NameType, NameTypeWithID } from '../app.types';
import { db } from './firebase';
import { FB_CONFIGS } from './firebase-config';
import {
    collection,
    addDoc,
    getDoc,
    doc,
    serverTimestamp,
    deleteDoc,
    updateDoc,
    // setDoc,
  } from 'firebase/firestore';

const updateCollectionTotals = async (op: string, nameData: NameType) => {
    const collTotalDocRef = doc(db, FB_CONFIGS.COLLECTION.COLLECTION_TOTALS, 'collectiontotal')
    const collTotal = await getDoc(collTotalDocRef)
    const newCollTotal = collTotal.data() as COLLECTION_TOTAL
    if (op === 'add') {
        newCollTotal.namesTotal += nameData.amount
    } else {
        newCollTotal.namesTotal -= nameData.amount
    }
    await updateDoc(collTotalDocRef, newCollTotal)
}

export const saveName = async (nameData: NameType) => {
    try {
        const namesColl = collection(db, FB_CONFIGS.COLLECTION.NAMES)
        const docRef = await addDoc( namesColl, {...nameData, createdAt: serverTimestamp()} );
        const docData = await getDoc(docRef);

        // Updating the collection total data / Calculating the total data each time new person submits the money
        await updateCollectionTotals('add', nameData)

        return { res: {...docData.data(), id: docData.id}, err: null }
    } catch (error) {
        console.log('Error, while adding person.');
        return { res: null, err: error }
    }
}

export const delName = async (nameData: NameTypeWithID) => {
    try {
        const docRef = doc(db, FB_CONFIGS.COLLECTION.NAMES, nameData.id);
        await deleteDoc(docRef);

        // Updating the collection total data / Calculating the total data each time new person is deleted
        await updateCollectionTotals('sub', nameData)

        return { res: 'Deleted succesfully', err: null }
    } catch (error) {
        console.log('Error, while deleting person.');
        return { res: null, err: error }
    }
}

type NoteData = {
    [key: number]: number
}
export const updateNotes = async (noteData: NoteData) => {
    try {
        const notesTotalDocRef = doc(db, FB_CONFIGS.COLLECTION.COLLECTION_TOTALS, 'notestotal')
        await updateDoc(notesTotalDocRef, noteData)

        let notesTotal = 0
        for (const [key, value] of Object.entries(noteData)) {
           notesTotal += +key * value
        }

        const collTotalDocRef = doc(db, FB_CONFIGS.COLLECTION.COLLECTION_TOTALS, 'collectiontotal')
        const collTotal = await getDoc(collTotalDocRef)
        const newCollTotal = collTotal.data() as COLLECTION_TOTAL
        newCollTotal.notesTotal = notesTotal
        await updateDoc(collTotalDocRef, newCollTotal)

        return { res: 'Updated successfully', err: null }
    } catch (error) {
        return { res: null, err: error }
    }
}