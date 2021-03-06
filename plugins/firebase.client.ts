import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {

  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.API_KEY,
    authDomain: config.AUTH_DOMAIN,
    projectId: config.PROJECT_ID,
    storageBucket: config.STORAGE_BUCKET,
    messagingSenderId: config.MESSAGING_SENDER_ID,
    appId: config.APP_ID,
    measurementId: config.MEASUREMENT_ID
  };

  const app = initializeApp(firebaseConfig);

  initUser();

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app)
  return {
    provide: {
      firebaseApp: app,
      auth: auth,
      firestore: firestore,
      storage: storage
    }
  }

});