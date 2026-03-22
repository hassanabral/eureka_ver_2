import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';

type WhereClause = [string, firebase.firestore.WhereFilterOp, any];

interface QueryOptions {
  collection: string;
  where?: WhereClause[];
  orderBy?: [string, ('asc' | 'desc')?];
  limit?: number;
}

export function useFirestoreQuery(options: QueryOptions) {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { collection: collectionName, where: whereClauses, orderBy, limit } = options;

  // Create a stable dependency key
  const depKey = JSON.stringify(options);

  useEffect(() => {
    let query: firebase.firestore.Query = db.collection(collectionName);

    if (whereClauses) {
      for (const clause of whereClauses) {
        query = query.where(clause[0], clause[1], clause[2]);
      }
    }

    if (orderBy) {
      query = query.orderBy(orderBy[0], orderBy[1] || 'asc');
    }

    if (limit) {
      query = query.limit(limit);
    }

    const unsubscribe = query.onSnapshot(
      (snap) => {
        const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setLoading(false);
      },
      (error) => {
        console.error(`Error querying ${collectionName}:`, error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [depKey]);

  return { data, loading };
}
