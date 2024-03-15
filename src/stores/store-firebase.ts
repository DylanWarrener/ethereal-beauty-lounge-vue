import { defineStore } from "pinia";

// Firebase
import { db, auth } from "@plugins/firebase/firebase.js";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	updateProfile,
	type Auth,
	type User,
	type UserCredential,
} from "firebase/auth";
import {
	collection,
	getDoc,
	setDoc,
	doc,
	type CollectionReference,
	type DocumentReference,
	type DocumentData,
} from "firebase/firestore";

const useFirebaseStore = defineStore("firebase-store", {
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
			joinedOn: Date | null;
		};
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
			joinedOn: null,
		},
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
		getUserData: (state): any => {
			return state.user;
		},

		/* Firebase CLOUD FIRESTORE */
	},
	actions: {
		/* Firebase AUTH */
		monitorAuthState(payload: { auth: Auth }): void {
			debugger;
			onAuthStateChanged(payload.auth, (user: User | null) => {
				debugger;
				this.setUserAuthData({
					id: user?.uid ?? null,
					displayName: user?.displayName ?? null,
					email: user?.email ?? null,
					isEmailVerified: user?.emailVerified ?? false,
					phoneNumber: user?.phoneNumber ?? null,
					photoURL: user?.photoURL ?? null,
					isAnonymous: user?.isAnonymous ?? false,
				});
			});
		},
		loginWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return signInWithEmailAndPassword(auth, user.email, user.password);
		},
		logout(): Promise<void> {
			return signOut(auth);
		},
		createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return createUserWithEmailAndPassword(auth, user.email, user.password);
		},
		setUserID(newValue: string | null): void {
			this.user.id = newValue;
		},
		setUserDisplayName(newValue: string | null): void {
			this.user.displayName = newValue;
		},
		setUserFirstname(newValue: string | null): void {
			this.user.firstname = newValue;
		},
		setUserLastname(newValue: string | null): void {
			this.user.lastname = newValue;
		},
		setUserEmail(newValue: string | null): void {
			this.user.email = newValue;
		},
		setUserIsEmailVerified(newValue: boolean): void {
			this.user.emailVerified = newValue;
		},
		setUserPhoneNumber(newValue: string | null): void {
			this.user.phoneNumber = newValue;
		},
		setUserPhotoURL(newValue: string | null): void {
			this.user.photoURL = newValue;
		},
		setUserIsAnonymous(newValue: boolean): void {
			this.user.isAnonymous = newValue;
		},
		setUserAuthData(user: {
			id: string | null;
			displayName: string | null;
			email: string | null;
			isEmailVerified: boolean;
			phoneNumber: string | null;
			photoURL: string | null;
			isAnonymous: boolean;
		}): void {
			debugger;
			this.setUserID(user.id);
			this.setUserDisplayName(user.displayName);
			this.setUserEmail(user.email);
			this.setUserIsEmailVerified(user.isEmailVerified);
			this.setUserPhoneNumber(user.phoneNumber);
			this.setUserPhotoURL(user.photoURL);
			this.setUserIsAnonymous(user.isAnonymous);
		},
		updateUserDisplayName(user: { displayName: string }): void {
			if (this.getIsUserLoggedIn && auth.currentUser) {
				updateProfile(auth.currentUser, { displayName: user.displayName });
				this.setUserDisplayName(user.displayName);
			}
		},

		/* Firebase CLOUD FIRESTORE */
		storeNewUser(user: { id: string; firstname: string; lastname: string }): void {
			debugger;
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

export default useFirebaseStore;
