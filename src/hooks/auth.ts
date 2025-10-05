import { auth, signInWithGoogle, signOut } from "@/lib/firebase/auth.client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGoogle,
    signOut,
  };
}
