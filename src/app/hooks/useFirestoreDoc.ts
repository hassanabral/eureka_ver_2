import { useState, useEffect } from 'react';
import { db } from '../firebase';

export function useFirestoreDoc(collectionName: string, docId: string | undefined) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!docId) {
      setLoading(false);
      return;
    }

    const unsubscribe = db.collection(collectionName).doc(docId).onSnapshot(
      (snap) => {
        setData(snap.exists ? { id: snap.id, ...snap.data() } : null);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching ${collectionName}/${docId}:`, error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName, docId]);

  return { data, loading };
}
