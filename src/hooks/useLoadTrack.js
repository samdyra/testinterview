import { useEffect, useState } from "react";
import {
  query, collection, onSnapshot, limit 
} from "firebase/firestore";
import { db } from "../Config/firebase";

const useLoadTrack = (dbName="track", limitData=10) => {
  const [ data, setData ] = useState([ {} ]);

  useEffect(() => {
    const dbCollection = collection(db, dbName);
    const q = query(dbCollection, limit(limitData));
    onSnapshot(q, (snapshot) => {
      const response = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(response);
    });
  }, []);

  return { data }
};

export default useLoadTrack