

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByV5bPJhroorm-nFobM-0Tr8phSekd6Fk",
  authDomain: "studygpt-26e12.firebaseapp.com",
  projectId: "studygpt-26e12",
  storageBucket: "studygpt-26e12.appspot.com",
  messagingSenderId: "479929778819",
  appId: "1:479929778819:web:8b2994e05bb28c9d4ad1b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage }