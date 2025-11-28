import { useState, useEffect } from "react";
import { doc, setDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";

export function useFavorites(user: User | null) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'error'} | null>(null);

  // Clear notification after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Sync favorites with Firestore
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const remoteFavorites = Array.isArray(data.favorites) ? data.favorites : [];
        setFavorites(remoteFavorites);
      } else {
        setFavorites([]);
      }
    }, (error) => {
      console.error("Error syncing favorites:", error);
      setNotification({
        message: "Error syncing data",
        type: 'error'
      });
    });

    return () => unsubscribe();
  }, [user]);

  const toggleFavorite = async (id: number) => {
    if (!user) {
      setNotification({
        message: "Please login to save favorites",
        type: 'info'
      });
      return;
    }

    const isRemoving = favorites.includes(id);
    const newFavorites = isRemoving 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];

    // Optimistic update
    setFavorites(newFavorites);
    setIsSaving(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const savePromise = isRemoving 
        ? setDoc(userRef, { favorites: arrayRemove(id) }, { merge: true })
        : setDoc(userRef, { favorites: arrayUnion(id) }, { merge: true });

      await Promise.race([
        savePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
      ]);
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message !== "Timeout") {
        console.error("Error updating favorites:", error);
        setNotification({
          message: "Failed to save to cloud. Please check your connection.",
          type: 'error'
        });
        // Revert
        setFavorites(favorites);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return { favorites, isSaving, notification, toggleFavorite };
}
