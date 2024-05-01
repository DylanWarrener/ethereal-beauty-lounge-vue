import { defineStore } from "pinia";

// Firebase
import { db, auth } from "@plugins/firebase/firebase.js";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	sendEmailVerification,
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
		IsUserLoggingIn: boolean;
		isUserCreatingAccount: boolean;
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
		IsUserLoggingIn: false,
		isUserCreatingAccount: false,
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
		/* General */
		getIsUserLoggingIn: (state): boolean => {
			return state.IsUserLoggingIn;
		},
		getIsUserCreatingAccount: (state): boolean => {
			return state.isUserCreatingAccount;
		},
		/* Firebase AUTH */
		getIsUserLoggedIn: (state): boolean => {
			return state.user.uid ? true : false;
		},
		getUserID: (state): string | null => {
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
	},
	actions: {
		/* General */
		setIsUserLoggingIn(newValue: boolean): void {
			this.IsUserLoggingIn = newValue;
		},
		setIsUserCreatingAccount(newValue: boolean): void {
			this.isUserCreatingAccount = newValue;
		},

		/* Firebase AUTH */
		monitorAuthState(payload: { auth: Auth }): Promise<User> {
			debugger;
			return new Promise((resolve, _) => {
				onAuthStateChanged(payload.auth, (user: User | null) => {
					debugger;
					if (user !== null) {
						let valuesNotNull: any = {};
						for (const [key, value] of Object.entries(user)) {
							if (key in this.user && value !== null) {
								if (key === "uid") {
									//auth.currentUser?.getIdToken().then((uid: string) => this.setUserID({ uid }));
									this.setUserID({ uid: value });
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
		},
		loginWithEmailAndPassword(user: { email: string; password: string }): Promise<DocumentData> {
			return new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, user.email, user.password)
					.then(() => {
						debugger;
						return this.getFirestoreUser;
					})
					.then((userData: DocumentData | undefined) => {
						debugger;
						if (userData !== undefined) {
							this.setUserTitle({ title: userData.title });
							this.setUserFirstname({ firstname: userData.firstname });
							this.setUserLastname({ lastname: userData.lastname });
							resolve(userData);
						}
					})
					.catch((error) => {
						debugger;
						switch (error.code) {
							case "auth/invalid-credential":
								reject("auth/invalid-credential");
								break;
						}
					});
			});
		},
		logout(): Promise<void> {
			this.setUserID({ uid: null });
			this.setUserTitle({ title: null });
			this.setUserFirstname({ firstname: null });
			this.setUserLastname({ lastname: null });
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
						switch (error.code) {
							case "auth/email-already-in-use":
								reject("auth/email-already-in-use");
								break;
						}
					});
			});
			return retval;
		},
		sendUserEmailVerification(): Promise<void> {
			let retval: Promise<void>;
			retval = new Promise((resolve, reject) => {
				if (auth.currentUser) {
					sendEmailVerification(auth.currentUser)
						.then(() => {
							resolve();
						})
						.catch(() => {
							reject();
						});
				}
			});
			return retval;
		},
		setUserID(user: { uid: string | null }): void {
			this.user.uid = user.uid;
		},
		setUserDisplayName(user: { displayName: string | null }): void {
			if (auth.currentUser && user.displayName !== null) {
				updateProfile(auth.currentUser, { displayName: user.displayName });
				this.user.displayName = user.displayName;
			}
		},
		setUserTitle(user: { title: string | null }): void {
			this.user.title = user.title;
		},
		setUserFirstname(user: { firstname: string | null }): void {
			this.user.firstname = user.firstname;
		},
		setUserLastname(user: { lastname: string | null }): void {
			this.user.lastname = user.lastname;
		},
		setUserEmail(user: { email: string | null }): void {
			this.user.email = user.email;
		},
		setUserIsEmailVerified(newValue: boolean): void {
			this.user.emailVerified = newValue;
		},
		setUserPhoneNumber(user: { phoneNumber: string | null }): void {
			this.user.phoneNumber = user.phoneNumber;
		},
		setUserPhotoURL(user: { photoURL: string | null }): void {
			this.user.photoURL = user.photoURL;
		},
		setUserIsAnonymous(newValue: boolean): void {
			this.user.isAnonymous = newValue;
		},
		setUserJoinedOn(user: { joinedOn: string }): void {
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
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "displayName":
						this.setUserDisplayName({ displayName: user.displayName! });
						break;
					case "email":
						this.setUserEmail({ email: user.email });
						break;
					case "isEmailVerified":
						this.setUserIsEmailVerified(user.isEmailVerified);
						break;
					case "phoneNumber":
						this.setUserPhoneNumber({ phoneNumber: user.phoneNumber! });
						break;
					case "photoURL":
						this.setUserPhotoURL({ photoURL: user.photoURL! });
						break;
					case "isAnonymous":
						this.setUserIsAnonymous(user.isAnonymous);
						break;
				}
			}
		},

		/* Firebase CLOUD FIRESTORE */
		getFirestoreUser(): Promise<DocumentData | undefined> {
			debugger;
			return new Promise((resolve, reject) => {
				debugger;
				const uid: string | null = this.user.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);

					getDoc(userDocumentRef)
						.then((userDocument) => {
							debugger;
							const doesUserDocumentExist: boolean = userDocument.exists();
							const userDocumentData: DocumentData | undefined = userDocument.data();

							if (doesUserDocumentExist && userDocumentData !== undefined) {
								resolve(userDocumentData);
							} else {
								resolve(undefined);
							}
						})
						.catch((error) => {
							reject();
							console.error(`You are offline, you cannot store their data. ${error}`);
						});
				}
			});
		},
		setFirestoreUser(user: { uid: string; title: string; firstname: string; lastname: string }): Promise<void> {
			const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
			const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.uid);
			const userFirestoreData = { title: user.title, firstname: user.firstname, lastname: user.lastname };
			return new Promise((resolve, reject) => {
				setDoc(userDocumentRef, userFirestoreData)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						reject();
						console.error(`You are offline, you cannot store their data. ${error}`);
					});
			});
		},
	},
});

export default useFirebaseStore;

/*
const uid: string | null = this.user.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);
					const userDocument = await getDoc(userDocumentRef);

					if () {

					}


						.then((response) => {
							debugger;
							const doesUserDocumentExist: boolean = response.exists();
							const userDocumentData: DocumentData | undefined = response.data();

							if (doesUserDocumentExist && userDocumentData !== undefined) {
								resolve(userDocumentData);
							}
						})
						.catch((error) => {
							reject();
							console.error(`You are offline, you cannot store their data. ${error}`);
						});
				}
*/
