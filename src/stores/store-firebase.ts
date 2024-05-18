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
		dialogs: {
			avatar: {
				show: boolean;
			};
		};
	} => ({
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
		dialogs: {
			avatar: {
				show: false,
			},
		},
	}),
	getters: {
		/* General */
		getIsUserLoggedIn: (state): boolean => {
			return !!state.user.authData.uid && !!state.user.firestoreData.firstname;
		},

		/* Firebase AUTH */
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
		getUserState: (state): any => {
			return state.user;
		},
		getUserAuthState: (state): any => {
			return state.user.authData;
		},

		/* Firebase FIRESTORE */
		getUserFirestoreState: (state): any => {
			return state.user.firestoreData;
		},
	},
	actions: {
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
					.then(() => this.getFirestoreUser())
					.then((userData: DocumentData | undefined) => {
						if (userData !== undefined) {
							this.setUserTitle(userData.title);
							this.setUserFirstname(userData.firstname);
							this.setUserLastname(userData.lastname);
							this.setUserPhoneNumber(userData.phoneNumber);
							resolve();
						}
						reject("The user data object is empty when signing in. Something went wrong!");
					})
					.catch((error) => {
						switch (error.code) {
							case "auth/invalid-credential":
								const errorMessage: string = "Either the email or password is incorrect";
								console.error(`${errorMessage}. ${error}`);
								reject(errorMessage);
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
					.then(() => resolve())
					.catch(() => reject());
			});
		},
		createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password)
					.then(() => this.sendUserEmailVerification())
					.then(() => resolve())
					.catch((error) => {
						switch (error.code) {
							case "auth/email-already-in-use":
								const errorMessage: string = "Email already in use! Try logging in";
								console.error(`${errorMessage}. ${error}`);
								reject(errorMessage);
								break;
						}
					});
			});
		},
		sendUserEmailVerification(): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					sendEmailVerification(auth.currentUser)
						.then(() => resolve())
						.catch(() => reject());
				}
			});
		},
		setUserID(uid: string | null): void {
			this.user.authData.uid = uid;
		},
		setUserDisplayName(displayName: string | null): void {
			// if (auth.currentUser && user.displayName !== null) {
			// 	updateProfile(auth.currentUser, { displayName: user.displayName });
			// 	this.user.displayName = user.displayName;
			// }
			this.user.authData.displayName = displayName;
		},
		setUserTitle(title: string | null): void {
			this.user.firestoreData.title = title;
		},
		setUserFirstname(firstname: string | null): void {
			this.user.firestoreData.firstname = firstname;
		},
		setUserLastname(lastname: string | null): void {
			this.user.firestoreData.lastname = lastname;
		},
		setUserEmail(email: string | null): void {
			this.user.authData.email = email;
		},
		setUserIsEmailVerified(isEmailVerified: boolean): void {
			this.user.authData.emailVerified = isEmailVerified;
		},
		setUserPhoneNumber(phoneNumber: number | null): void {
			this.user.firestoreData.phoneNumber = phoneNumber;
		},
		setUserPhotoURL(photoURL: string | null): void {
			this.user.authData.photoURL = photoURL;
		},
		setUserIsAnonymous(isAnonymous: boolean): void {
			this.user.authData.isAnonymous = isAnonymous;
		},
		setUserAuthState(user: {
			uid: string | null;
			displayName: string | null;
			email: string | null;
			isEmailVerified: boolean;
			photoURL: string | null;
			isAnonymous: boolean;
		}): void {
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "uid":
						this.setUserID(value as string);
						break;
					case "displayName":
						this.setUserDisplayName(value as string);
						break;
					case "email":
						this.setUserEmail(value as string);
						break;
					case "isEmailVerified":
						this.setUserIsEmailVerified(value as boolean);
						break;
					case "photoURL":
						this.setUserPhotoURL(value as string);
						break;
					case "isAnonymous":
						this.setUserIsAnonymous(value as boolean);
						break;
				}
			}
		},
		resetUserAuthState(): void {
			this.setUserAuthState({
				uid: null,
				displayName: null,
				email: null,
				isEmailVerified: false,
				photoURL: null,
				isAnonymous: false,
			});
		},
		updateUserProfile(user: { displayName?: string; photoURL?: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					let valuesNotUndefined: any = {};
					for (const [key, value] of Object.entries(user)) {
						if (value !== undefined) {
							valuesNotUndefined[key] = value;
						}
					}

					if (Object.keys(valuesNotUndefined).length > 0) {
						updateProfile(auth.currentUser, valuesNotUndefined)
							.then(() => resolve())
							.catch((error) => {
								const errorMessage: string = "You are offline, so you cannot store user data!";
								console.error(`${errorMessage}. ${error}`);
								reject(errorMessage);
							});
					} else {
						reject("You cannot save your account data if no data is provided!");
					}
				} else {
					reject("You must be logged in, to update your account credentials");
				}
			});
		},
		updateUserEmail(email: string): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					updateEmail(auth.currentUser, email)
						.then(() => resolve())
						.catch((error) => {
							let errorMessage: string = "";
							switch (error.code) {
								case "auth/operation-not-allowed":
									errorMessage =
										"Cannot update email. This operation requires that you have logged in recently. Reauthenticate now.";
									console.error(`${errorMessage}. ${error}`);
									reject(errorMessage);
									break;
							}
						});
				} else {
					reject("You must be logged in to change email");
				}
			});
		},

		/* Firebase FIRESTORE */
		getFirestoreUser(): Promise<DocumentData> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.user.authData.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);

					getDoc(userDocumentRef)
						.then((userDocument) => {
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
							let errorMessage: string = "You are offline, so you cannot store user data";
							console.error(`${errorMessage}. ${error}`);
							reject(errorMessage);
						});
				} else {
					reject("You must be logged in, to get your account credentials");
				}
			});
		},
		setUserFirestore(user: {
			uid: string;
			title: string | null;
			firstname: string;
			lastname: string;
			phoneNumber: string | null;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.getUserID;

				if (uid !== null) {
					const userCollectionRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
					const userDocumentRef: DocumentReference<DocumentData, DocumentData> = doc(userCollectionRef, user.uid);
					const userFirestoreData = {
						title: user.title ?? null,
						firstname: user.firstname,
						lastname: user.lastname,
						phoneNumber: user.phoneNumber ?? null,
					};

					setDoc(userDocumentRef, userFirestoreData)
						.then(() => resolve())
						.catch((error) => {
							const errorMessage: string =
								"You are offline. Your data cannot be stored. Please reconnect your internet if you can";
							console.error(`${errorMessage}. ${error}`);
							reject(errorMessage);
						});
				} else {
					reject("You must be logged in, to store your account credentials");
				}
			});
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
						this.setUserTitle(value as string);
						break;
					case "firstname":
						this.setUserFirstname(value as string);
						break;
					case "lastname":
						this.setUserLastname(value as string);
						break;
					case "phoneNumber":
						this.setUserPhoneNumber(value as number);
						break;
				}
			}
		},
		resetUserFirestoreState(): void {
			this.setUserFirestoreState({
				title: null,
				firstname: null,
				lastname: null,
				phoneNumber: null,
			});
		},
		updateFirestoreUser(user: {
			title?: string;
			firstname?: string;
			lastname?: string;
			phoneNumber?: number;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.getUserID;

				if (uid !== null) {
					let valuesNotUndefined: any = {};
					for (const [key, value] of Object.entries(user)) {
						if (value !== undefined) {
							valuesNotUndefined[key] = value;
						}
					}

					if (Object.keys(valuesNotUndefined).length > 0) {
						const userDocumentRef = doc(db, "users", uid);
						updateDoc(userDocumentRef, valuesNotUndefined)
							.then(() => resolve())
							.catch((error) => {
								const errorMessage: string = "You are offline, so you cannot update your data";
								console.error(`${errorMessage}. ${error}`);
								reject(errorMessage);
							});
					} else {
						reject("You cannot update your account data, if no data is provided!");
					}
				} else {
					reject("You must be logged in, to update your account credentials");
				}
			});
		},
	},
});

export default useFirebaseStore;
