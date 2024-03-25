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
			uid: string | null;
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
			uid: null,
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
			return state.user.uid !== null;
		},
		getUserID: (state): string | null => {
			return state.user.uid;
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
				if (user !== null) {
					let valuesNotNull: any = {};
					for (const [key, value] of Object.entries(user)) {
						debugger;
						if (value !== null && key in this.user) {
							valuesNotNull[key] = value;
						}
					}
					this.setUserAuthData(valuesNotNull);
				}
			});
		},
		loginWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return signInWithEmailAndPassword(auth, user.email, user.password);
		},
		logout(): Promise<void> {
			this.setUserAuthData({
				uid: null,
				displayName: null,
				email: null,
				isEmailVerified: false,
				phoneNumber: null,
				photoURL: null,
				isAnonymous: false,
			});
			return signOut(auth);
		},
		createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			debugger;
			return createUserWithEmailAndPassword(auth, user.email, user.password);
		},
		setUserID(newValue: string | null): void {
			this.user.uid = newValue;
		},
		setUserDisplayName(displayName: string | null): void {
			debugger;
			if (this.getIsUserLoggedIn && auth.currentUser && displayName !== null) {
				updateProfile(auth.currentUser, { displayName: displayName });
				this.user.displayName = displayName;
			}
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
			uid: string | null;
			displayName?: string | null;
			email: string | null;
			isEmailVerified: boolean;
			phoneNumber?: string | null;
			photoURL?: string | null;
			isAnonymous: boolean;
		}): void {
			debugger;
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "uid":
						this.setUserID(user.uid);
						break;
					case "displayName":
						this.setUserDisplayName(user.displayName!);
						break;
					case "email":
						this.setUserEmail(user.email);
						break;
					case "isEmailVerified":
						this.setUserIsEmailVerified(user.isEmailVerified);
						break;
					case "phoneNumber":
						this.setUserPhoneNumber(user.phoneNumber!);
						break;
					case "photoURL":
						this.setUserPhotoURL(user.photoURL!);
						break;
					case "isAnonymous":
						this.setUserIsAnonymous(user.isAnonymous);
						break;
				}
			}
		},

		/* Firebase CLOUD FIRESTORE */
		storeNewUser(user: { uid: string; firstname: string; lastname: string }): void {
			debugger;
			const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
			const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.uid);
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
