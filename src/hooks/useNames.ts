import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { FB_CONFIGS } from '../firebase/firebase-config';

const useNames = () => {
  const [names, setNames] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleRes = (res: any) => {
            const invoiceDocs = res.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            setNames(invoiceDocs);
            setLoading(false);
        };
        const handleErr = (err: any) => {
            console.log('Names list subscribe error: ', err);
            setErr(err);
            setLoading(false);
        };
        const q = query(collection(db, FB_CONFIGS.COLLECTION.NAMES), orderBy('createdAt', 'desc'))
        const unsub = onSnapshot(
            q,
            handleRes,
            handleErr
        );

        return () => {
            unsub();
        };
    }, []);

  return { names, err, loading }
}

export default useNames