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
	updateEmail,
	type Auth,
	type User,
} from "firebase/auth";
import {
	collection,
	getDoc,
	setDoc,
	updateDoc,
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
			authData: {
				uid: string | null;
				displayName: string | null;
				email: string | null;
				emailVerified: boolean;
				photoURL?: string | null;
				isAnonymous: boolean;
				joinedOn: string | null;
			};
			firestoreData: {
				title: string | null;
				firstname: string | null;
				lastname: string | null;
				phoneNumber: number | null;
			};
		};
	} => ({
		IsUserLoggingIn: false,
		isUserCreatingAccount: false,
		user: {
			authData: {
				uid: null,
				displayName: null,
				email: null,
				emailVerified: false,
				photoURL: null,
				isAnonymous: false,
				joinedOn: null,
			},
			firestoreData: {
				title: null,
				firstname: null,
				lastname: null,
				phoneNumber: null,
			},
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
		getIsUserAuthStoredInState: (state): boolean => {
			return !!state.user.authData.uid;
		},

		/* Firebase AUTH */
		getIsUserLoggedIn: (state): boolean => {
			return !!state.user.authData.uid;
		},
		getUserID: (state): string | null => {
			return state.user.authData.uid;
		},
		getUserDisplayName: (state): string | null => {
			return state.user.authData.displayName;
		},
		getUserTitle: (state): string | null => {
			return state.user.firestoreData.title;
		},
		getUserFirstname: (state): string | null => {
			return state.user.firestoreData.firstname;
		},
		getUserLastname: (state): string | null => {
			return state.user.firestoreData.lastname;
		},
		getUserEmail: (state): string | null => {
			return state.user.authData.email;
		},
		getIsUserEmailVerified: (state): boolean => {
			return state.user.authData.emailVerified;
		},
		getUserPhoneNumber: (state): number | null => {
			return state.user.firestoreData.phoneNumber;
		},
		getUserPhotoURL: (state): string | null | undefined => {
			return state.user.authData.photoURL;
		},
		getIsUserAnonymous: (state): boolean => {
			return state.user.authData.isAnonymous;
		},
		getUserJoinedOn: (state): string | null => {
			return state.user.authData.joinedOn;
		},
		getUserData: (state): any => {
			return state.user;
		},
		getUserAuthData: (state): any => {
			return state.user.authData;
		},
		getUserFirestoreData: (state): any => {
			return state.user.firestoreData;
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
		monitorAuthState(payload: { auth: Auth }): Promise<void> {
			return new Promise((resolve, reject) => {
				onAuthStateChanged(payload.auth, (user: User | null) => {
					if (user !== null) {
						let valuesNotNull: any = {};
						for (const [key, value] of Object.entries(user)) {
							if (key in this.user.authData && value !== null) {
								valuesNotNull[key] = value;
							}
						}
						this.setUserAuthState(valuesNotNull);
						resolve();
					} else {
						reject("User is not valid.");
					}
				});
			});
		},
		loginWithEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, user.email, user.password)
					.then(() => {
						return this.getFirestoreUser();
					})
					.then((userData: DocumentData | undefined) => {
						if (userData !== undefined) {
							this.setUserTitle({ title: userData.title });
							this.setUserFirstname({ firstname: userData.firstname });
							this.setUserLastname({ lastname: userData.lastname });
							this.setUserPhoneNumber({ phoneNumber: userData.phoneNumber });
							resolve();
						}
						reject("The user data object is empty when signing in. Something went wrong!");
					})
					.catch((error) => {
						switch (error.code) {
							case "auth/invalid-credential":
								reject("Either the email or password is incorrect");
								break;
						}
					});
			});
		},
		logout(): Promise<void> {
			this.resetUserAuthState();
			this.resetUserFirestoreState();
			return new Promise((resolve, reject) => {
				signOut(auth)
					.then(() => {
						resolve();
					})
					.catch(() => {
						reject();
					});
			});
		},
		createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password)
					.then(() => {
						return this.sendUserEmailVerification();
					})
					.then(() => {
						resolve();
					})
					.catch((error) => {
						switch (error.code) {
							case "auth/email-already-in-use":
								reject("Email already in use! Try logging in.");
								break;
						}
					});
			});
		},
		sendUserEmailVerification(): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					sendEmailVerification(auth.currentUser)
						.then(() => {
							resolve();
						})
						.catch(() => {
							reject();
						});
				}
			});
		},
		setUserID(user: { uid: string | null }): void {
			this.user.authData.uid = user.uid;
		},
		setUserDisplayName(user: { displayName: string | null }): void {
			// if (auth.currentUser && user.displayName !== null) {
			// 	updateProfile(auth.currentUser, { displayName: user.displayName });
			// 	this.user.displayName = user.displayName;
			// }
			this.user.authData.displayName = user.displayName;
		},
		setUserTitle(user: { title: string | null }): void {
			this.user.firestoreData.title = user.title;
		},
		setUserFirstname(user: { firstname: string | null }): void {
			this.user.firestoreData.firstname = user.firstname;
		},
		setUserLastname(user: { lastname: string | null }): void {
			this.user.firestoreData.lastname = user.lastname;
		},
		setUserEmail(user: { email: string | null }): void {
			this.user.authData.email = user.email;
		},
		setUserIsEmailVerified(newValue: boolean): void {
			this.user.authData.emailVerified = newValue;
		},
		setUserPhoneNumber(user: { phoneNumber: number | null }): void {
			this.user.firestoreData.phoneNumber = user.phoneNumber;
		},
		setUserPhotoURL(user: { photoURL: string | null }): void {
			this.user.authData.photoURL = user.photoURL;
		},
		setUserIsAnonymous(newValue: boolean): void {
			this.user.authData.isAnonymous = newValue;
		},
		setUserJoinedOn(user: { joinedOn: string | null }): void {
			this.user.authData.joinedOn = user.joinedOn;
		},
		setUserAuthState(user: {
			uid: string | null;
			displayName: string | null;
			email: string | null;
			isEmailVerified: boolean;
			photoURL: string | null;
			isAnonymous: boolean;
			joinedOn: string | null;
		}): void {
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "uid":
						this.setUserID({ uid: value as string });
						break;
					case "displayName":
						this.setUserDisplayName({ displayName: value as string });
						break;
					case "email":
						this.setUserEmail({ email: value as string });
						break;
					case "isEmailVerified":
						this.setUserIsEmailVerified(value as boolean);
						break;
					case "photoURL":
						this.setUserPhotoURL({ photoURL: value as string });
						break;
					case "isAnonymous":
						this.setUserIsAnonymous(value as boolean);
						break;
					case "joinedOn":
						this.setUserJoinedOn({ joinedOn: value as string });
						break;
				}
			}
		},
		setUserFirestoreState(user: {
			title: string | null;
			firstname: string | null;
			lastname: string | null;
			phoneNumber: number | null;
		}): void {
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "title":
						this.setUserTitle({ title: value as string });
						break;
					case "firstname":
						this.setUserFirstname({ firstname: value as string });
						break;
					case "lastname":
						this.setUserLastname({ lastname: value as string });
						break;
					case "phoneNumber":
						this.setUserPhoneNumber({ phoneNumber: value as number });
						break;
				}
			}
		},
		resetUserAuthState(): void {
			this.setUserID({ uid: null });
			this.setUserDisplayName({ displayName: null });
			this.setUserEmail({ email: null });
			this.setUserIsEmailVerified(false);
			this.setUserPhotoURL({ photoURL: null });
			this.setUserIsAnonymous(false);
			this.setUserJoinedOn({ joinedOn: null });
		},
		resetUserFirestoreState(): void {
			this.setUserTitle({ title: null });
			this.setUserFirstname({ firstname: null });
			this.setUserLastname({ lastname: null });
			this.setUserPhoneNumber({ phoneNumber: null });
		},
		updateUserProfile(user: { displayName?: string; photoURL?: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				debugger;

				let valuesNotUndefined: any = {};
				for (const [key, value] of Object.entries(user)) {
					if (value !== undefined) {
						valuesNotUndefined[key] = value;
					}
				}

				if (Object.keys(valuesNotUndefined).length > 0 && auth.currentUser !== null) {
					updateProfile(auth.currentUser, valuesNotUndefined)
						.then(() => {
							debugger;
							resolve();
						})
						.catch(() => {
							debugger;
							reject();
						});
				}
			});
		},
		updateUserEmail(user: { email: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					updateEmail(auth.currentUser, user.email)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							switch (error.code) {
								case "auth/operation-not-allowed":
									const errorMessage = "You must verify your email address before we can update it";
									console.error(`${errorMessage}. ${error}`);
									reject(errorMessage);
									break;
							}
						});
				}
			});
		},

		/* Firebase CLOUD FIRESTORE */
		getFirestoreUser(): Promise<DocumentData> {
			debugger;
			return new Promise((resolve, reject) => {
				debugger;
				const uid: string | null = this.user.authData.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);

					getDoc(userDocumentRef)
						.then((userDocument) => {
							debugger;
							const doesUserDocumentExist: boolean = userDocument.exists();
							const userDocumentData: DocumentData | undefined = userDocument.data();

							if (doesUserDocumentExist && userDocumentData !== undefined) {
								this.setUserFirestoreState({
									title: userDocumentData.title,
									firstname: userDocumentData.firstname,
									lastname: userDocumentData.lastname,
									phoneNumber: userDocumentData.phoneNumber,
								});
								resolve(userDocumentData);
							} else {
								reject(
									"User data object is empty after retrieval. It seems you may have a connection issue"
								);
							}
						})
						.catch((error) => {
							debugger;
							reject(`You are offline, so you cannot store user data. ${error}`);
						});
				} else {
					reject("User ID was not populated, before trying to retrieve user data from the firestore.");
				}
			});
		},
		setFirestoreUser(user: {
			uid: string;
			title: string | null;
			firstname: string | null;
			lastname: string | null;
			phoneNumber: string | null;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
				const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.uid);
				const userFirestoreData = {
					title: user.title,
					firstname: user.firstname,
					lastname: user.lastname,
					phoneNumber: user.phoneNumber,
				};

				setDoc(userDocumentRef, userFirestoreData)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						const errorMessage: string =
							"You are offline. Your data cannot be stored. Please reconnect your internet if you can";
						reject(errorMessage);
						if (error) {
							console.error(`${errorMessage}. ${error}`);
						}
					});
			});
		},
		updateFirestoreUser(user: {
			title?: string | undefined;
			firstname?: string | undefined;
			lastname?: string | undefined;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				debugger;
				const uid: string | null = this.getUserID;

				let valuesNotUndefined: any = {};
				for (const [key, value] of Object.entries(user)) {
					debugger;
					if (value !== undefined) {
						valuesNotUndefined[key] = value;
					}
				}

				if (Object.keys(valuesNotUndefined).length > 0 && uid !== null) {
					const userDocumentRef = doc(db, "users", uid);
					updateDoc(userDocumentRef, valuesNotUndefined)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							reject();
							console.error(`You are offline, you cannot update user data. ${error}`);
						});
				}
			});
		},
	},
});

export default useFirebaseStore;
