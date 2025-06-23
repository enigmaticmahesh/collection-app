import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { FB_CONFIGS } from '../firebase/firebase-config';
import type { COLLECTION_TOTAL } from '../app.types';

const useCollectionTotals = () => {
  const [collectionTotals, setCollectionTotals] = useState<COLLECTION_TOTAL>({namesTotal: 0, notesTotal: 0})
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleRes = (doc: any) => {
            // const collTotals = res.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setCollectionTotals(doc.data());
            setLoading(false);
        };
        const handleErr = (err: any) => {
            console.log('Names list subscribe error: ', err);
            setErr(err);
            setLoading(false);
        };
        const collTotalDocRef = doc(db, FB_CONFIGS.COLLECTION.COLLECTION_TOTALS, 'collectiontotal')
        const unsub = onSnapshot(
            collTotalDocRef,
            handleRes,
            handleErr
        );

        return () => {
            unsub();
        };
    }, []);

  return { collectionTotals, err, loading }
}

export default useCollectionTotals