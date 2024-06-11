// Services
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const firebaseApp: FirebaseApp = initializeApp({
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

// Connect auth emulator
//connectAuthEmulator(auth, "http://localhost:5173");

export { db, auth };
