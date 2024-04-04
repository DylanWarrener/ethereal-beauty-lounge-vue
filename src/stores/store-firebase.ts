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
			title: string | null;
			firstname: string | null;
			lastname: string | null;
			email: string | null;
			emailVerified: boolean;
			phoneNumber: string | null;
			photoURL: string | null;
			isAnonymous: boolean;
			joinedOn: string | null;
		};
	} => ({
		user: {
			uid: null,
			displayName: null,
			title: null,
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
			debugger;
			return state.user.uid ? true : false;
		},
		getUserID: (state): string | null => {
			debugger;
			return state.user.uid;
		},
		getUserDisplayName: (state): string | null => {
			return state.user.displayName;
		},
		getUserTitle: (state): string | null => {
			return state.user.title;
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
		getUserJoinedOn: (state): string | null => {
			return state.user.joinedOn;
		},
		getUserData: (state): any => {
			return state.user;
		},

		/* Firebase CLOUD FIRESTORE */
	},
	actions: {
		/* Firebase AUTH */
		monitorAuthState(payload: { auth: Auth }): Promise<User> {
			debugger;
			let retval: Promise<User>;
			retval = new Promise((resolve, reject) => {
				onAuthStateChanged(payload.auth, (user: User | null) => {
					debugger;
					if (user !== null) {
						let valuesNotNull: any = {};
						for (const [key, value] of Object.entries(user)) {
							if (key in this.user && value !== null) {
								if (key === "uid") {
									auth.currentUser?.getIdToken().then((uid: string) => {
										debugger;
										this.setUserID({ uid });
									});
								} else {
									valuesNotNull[key] = value;
								}
							}
						}
						this.setUserAuthData(valuesNotNull);
						resolve(user);
					}
				});
			});
			return retval;
		},
		loginWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			debugger;
			return signInWithEmailAndPassword(auth, user.email, user.password);
		},
		logout(): Promise<void> {
			debugger;
			this.setUserID({ uid: null });
			this.setUserAuthData({
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
			let retval: Promise<UserCredential>;
			retval = new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password)
					.then((response) => {
						resolve(response);
					})
					.catch((error) => {
						reject(`Could not create user account. ${error}`);
						console.error(`Could not create user account. ${error}`);
					});
			});
			return retval;
		},
		setUserID(user: { uid: string | null }): void {
			debugger;
			this.user.uid = user.uid;
		},
		setUserDisplayName(user: { displayName: string | null }): void {
			debugger;
			if (auth.currentUser && user.displayName !== null) {
				updateProfile(auth.currentUser, { displayName: user.displayName });
				this.user.displayName = user.displayName;
			}
		},
		setUserTitle(user: { title: string | null }): void {
			debugger;
			this.user.title = user.title;
		},
		setUserFirstname(user: { firstname: string | null }): void {
			debugger;
			this.user.firstname = user.firstname;
		},
		setUserLastname(user: { lastname: string | null }): void {
			debugger;
			this.user.lastname = user.lastname;
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
		setUserJoinedOn(user: { joinedOn: string }): void {
			debugger;
			this.user.joinedOn = user.joinedOn;
		},
		setUserAuthData(user: {
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
					case "displayName":
						this.setUserDisplayName({ displayName: user.displayName! });
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
		getFirestoreUser(user: { uid: string }): Promise<any> {
			return new Promise((resolve, reject) => {
				resolve("");
			});
		},
		setFirestoreUser(user: { uid: string; title: string; firstname: string; lastname: string }): Promise<void> {
			debugger;
			const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
			const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.uid);
			const userFirestoreData = { title: user.title, firstname: user.firstname, lastname: user.lastname };

			let retval: Promise<void>;
			retval = new Promise((resolve, reject) => {
				setDoc(userDocumentRef, userFirestoreData)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						reject();
						console.error(`Error setting user document in firestore. ${error}`);
					});
			});
			return retval;
		},
	},
});

export default useFirebaseStore;
