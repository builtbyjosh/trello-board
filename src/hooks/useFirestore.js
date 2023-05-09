import { useReducer, useEffect, useState } from "react";
import { db, timestamp } from "../firebase/config";
import { addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // add a document
  const addDocument = async (doc) => {
    try {
      const createdAt = timestamp.fromDate(new Date());
      await addDoc(db, collectionName, { ...doc, createdAt });
      return true;
    } catch (err) {
      console.error("Error adding document:", err);
      return false;
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    const docRef = doc(db, collectionName, id);
    try {
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error("Error deleting document:", err);
      return false;
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    const docRef = doc(db, collectionName, id);

    try {
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error("Error updating document:", error);
      return false;
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
