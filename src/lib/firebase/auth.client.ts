import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./init.client";

export const auth = getAuth(app);

export const signOut = async () => {
  await auth.signOut();
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      auth.updateCurrentUser(result.user);
    })
    .catch((error) => {
      console.error("Error signing in with Google", error);
    });
};
