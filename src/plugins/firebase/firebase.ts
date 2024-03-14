// Services
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

// Store
import pinia from "@plugins/pinia/pinia.js";
import useAuthStore from "@stores/store-auth.js";

// Initialize Firebase
const firebaseApp = initializeApp({
	apiKey: "AIzaSyAHkqAjZi3-6Wlc3HxeSPNYdTZHPZ1WhKY",
	authDomain: "ethereal-beauty-lounge.firebaseapp.com",
	projectId: "ethereal-beauty-lounge",
	storageBucket: "ethereal-beauty-lounge.appspot.com",
	messagingSenderId: "812911544888",
	appId: "1:812911544888:web:bcd6b34ddfc86311e234cd",
	measurementId: "G-ENKRXHN33D",
});

// Initialize firebase database & auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
//export const analytics = getAnalytics(app);

const authStore = useAuthStore(pinia);
authStore.monitorAuthState({ auth });

export { db, auth };
