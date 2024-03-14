import { defineStore } from "pinia";

// Firebase
import { db, auth } from "@plugins/firebase/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import type { Auth, User, UserCredential } from "firebase/auth";
import type { CollectionReference, DocumentReference, DocumentData } from "firebase/firestore";

const useAuthStore = defineStore("firebase-store", {
	state: (): { 
        user: { 
            id: string | null;
            displayName: string | null;
            firstname: string | null;
            lastname: string | null;
            email: string | null;
            emailVerified: boolean;
            phoneNumber: string | null;
            photoURL: string | null;
            isAnonymous: boolean;
        }, 
    } => ({
        user: {
            id: null,
			displayName: null,
			firstname: null,
			lastname: null,
			email: null,
			emailVerified: false,
			phoneNumber: null,
			photoURL: null,
			isAnonymous: false,
        }
	}),
	getters: {
        /* Firebase AUTH */
        getIsUserLoggedIn: (state): boolean => {
            return state.user.id !== null;
        },
		getUserID: (state): string | null => {
			return state.user.id;
		},
		getUserDisplayName: (state): string | null => {
			return state.user.displayName;
		},
		getUserFirstname: (state): string | null => {
			return state.user.firstname;
		},
		getUserLastname: (state): string | null => {
			return state.user.lastname;
		},
		getUserEmail: (state): string | null => {
			return state.user.email;
		},
		getIsUserEmailVerified: (state): boolean => {
			return state.user.emailVerified;
		},
		getUserPhoneNumber: (state): string | null => {
			return state.user.phoneNumber;
		},
		getUserPhotoURL: (state): string | null => {
			return state.user.photoURL;
		},
		getIsUserAnonymous: (state): boolean => {
			return state.user.isAnonymous;
		},

        /* Firebase CLOUD FIRESTORE */
	},
	actions: {
		/* Firebase AUTH */
		monitorAuthState(payload: { auth: Auth }): void {
			onAuthStateChanged(payload.auth, (user: User | null) => {
                user !== null ? this.setUserID(user.uid) : this.setUserID(null);
			});
		},
        loginWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return signInWithEmailAndPassword(auth, user.email, user.password);
		},
        logout(): void {
			signOut(auth);
		},
        createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return createUserWithEmailAndPassword(auth, user.email, user.password);
		},
		setUserID(newValue: string | null): void {
			this.user.id = newValue;
		},

		/* Firebase CLOUD FIRESTORE */
		storeNewUser(user: { id: string; firstname: string; lastname: string }): void {
			const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
			const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.id);
			const userFirestoreData: { firstname: string; lastname: string } = {
				firstname: user.firstname,
				lastname: user.lastname,
			};
			setDoc(userDocumentRef, userFirestoreData);
			this.user.firstname = user.firstname;
			this.user.lastname = user.lastname;
		},
	},
});

export default useAuthStore;
