import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../firebase/firebase';
import { FB_CONFIGS } from '../firebase/firebase-config';
import useCurrencyStore from '../store/currency.store';

const useCurrencyTotals = () => {
    const setCurrency = useCurrencyStore(state => state.setCurrency)
    // const [notesTotals, setNotesTotals] = useState({})
    // const [err, setErr] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleRes = (doc: any) => {
            // const collTotals = res.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
            // setNotesTotals(doc.data());
            setCurrency(doc.data())
            // setLoading(false);
        };
        const handleErr = (err: any) => {
            console.log('Currency list subscribe error: ', err);
            // setErr(err);
            // setLoading(false);
        };
        const notesTotalDocRef = doc(db, FB_CONFIGS.COLLECTION.COLLECTION_TOTALS, 'notestotal')
        const unsub = onSnapshot(
            notesTotalDocRef,
            handleRes,
            handleErr
        );

        return () => {
            unsub();
        };
    }, []);

//   return { err, loading }
}

export default useCurrencyTotals