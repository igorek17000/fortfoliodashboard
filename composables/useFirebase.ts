//https://firebase.google.com/docs/auth/web/start

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
import { useUserStore } from "~~/store/userStore";
  // const store = useUserStore()
  
  export const createUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials;
  };
  
  export const signInUser = async (email, password) => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentials;
  };
  
  export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();
    firebaseUser.value = auth.currentUser;
  
    const userCookie = useCookie("userCookie");
  
    const router = useRouter();
  
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // await store.login().then(() => {
        //   router.push("/dashboard");
        // });
      } else {
        //if signed out
      }
  
      firebaseUser.value = user;
  
      // @ts-ignore
      userCookie.value = user; //ignore error because nuxt will serialize to json
  
      $fetch("/api/auth", {
        method: "POST",
        body: { user },
      });
    });
  };
  
  export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut();
    return result;
  };
  