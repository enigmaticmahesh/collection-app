import type { NameType } from '../app.types';
import { db } from './firebase';
import { FB_CONFIGS } from './firebase-config';
import {
    collection,
    addDoc,
    getDoc,
    // doc,
    serverTimestamp,
    // deleteDoc,
    // setDoc,
  } from 'firebase/firestore';
//   port { onSnapshot, orderBy, query } from 'firebase/firestore';

// export const addInvoice = (invoiceData) => {
//     return new Promise((res, rej) => {
//       (async () => {
//         try {
//             const invoiceColl = collection(db, FB_CONFIGS.COLLECTION.NAMES)
//             const docRef = await addDoc( invoiceColl, {...invoiceData, createdAt: serverTimestamp()} );
//             const docData = await getDoc(docRef);
//             res({...docData.data(), id: docData.id});
//         } catch (error) {
//             console.log('Error, while adding invoice document.');
//             rej(error);
//         }
//       })();
//     });
// };

// export const getInvoiceData = async (docId) => {
//     const docRef = doc(db, FB_CONFIGS.COLLECTION.NAMES, docId)
//     try {
//         // Get the document
//         const docSnap = await getDoc(docRef);

//         // Check if the document exists
//         if (docSnap.exists()) {
//             return {...docSnap.data(), id: docSnap.id}
//         } else {
//             // console.log("No such document!");
//             throw new Error('No such document!', { cause: error });
//         }
//     } catch (error) {
//         // console.error("Error getting document:", error);
//         throw new Error('Error getting document', { cause: error });
//     }
// }

export const saveName = (nameData: NameType) => {
    return new Promise((res, rej) => {
      (async () => {
        try {
            const invoiceColl = collection(db, FB_CONFIGS.COLLECTION.NAMES)
            const docRef = await addDoc( invoiceColl, {...nameData, createdAt: serverTimestamp()} );
            const docData = await getDoc(docRef);
            res({...docData.data(), id: docData.id});
        } catch (error) {
            console.log('Error, while adding invoice document.');
            rej(error);
        }
      })();
    });
}