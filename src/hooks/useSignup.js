import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      // const res = await auth.createUserWithEmailAndPassword(email, password);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // // upload user thumbnail
      // const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      // const img = await storage.ref(uploadPath).put(thumbnail)
      // const imgUrl = await img.ref.getDownloadURL()
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const imgRef = ref(storage, uploadPath);
      await uploadBytes(imgRef, thumbnail);
      const imgUrl = await getDownloadURL(imgRef);

      // Add display name to user
      // await res.user.updateProfile({ displayName, photoURL: imgUrl });
      await updateProfile(res.user, {
        displayName,
        photoURL: imgUrl,
      });

      // create a user doc
      // await db.collection('users').doc(res.user.uid).set({
      //   online: true,
      //   displayName,
      //   photoURL: imgUrl
      // })
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
