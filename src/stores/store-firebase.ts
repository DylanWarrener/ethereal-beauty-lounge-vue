import { defineStore } from "pinia";

// Firebase
import { db, auth } from "@plugins/firebase/firebase.js";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	reauthenticateWithCredential,
	sendEmailVerification,
	sendSignInLinkToEmail,
	sendPasswordResetEmail,
	updateProfile,
	updateEmail,
	updatePassword,
	deleteUser,
	type Auth,
	type User,
	type ActionCodeSettings,
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

// Interfaces
import ICommon_firebase_state, {
	ICommon_firebase_user_state,
	ICommon_firebase_user_notifications_state,
	ICommon_firebase_user_auth_state,
	ICommon_firebase_user_firestore_state,
} from "@declarations/common/firebase/common-interface-firebase.js";

const useFirebaseStore = defineStore("firebase-store", {
	state: (): ICommon_firebase_state => ({
		user: {
			isLoggedIn: false,
			notifications: {
				treatments: {
					isEnabled: true,
				},
				store: {
					isEnabled: true,
				},
				promotions: {
					isEnabled: true,
				},
				unsubscribeToAll: {
					isEnabled: false,
				},
			},
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
		/* User */
		get_user_state: (state: ICommon_firebase_state): ICommon_firebase_user_state => {
			return state.user;
		},
		// User NOTIFICATIONS
		get_userNotifications_state: (state: ICommon_firebase_state): ICommon_firebase_user_notifications_state => {
			return state.user.notifications;
		},
		get_userNotifications_treatments_isEnabled_state: (state: ICommon_firebase_state): boolean => {
			return state.user.notifications.treatments.isEnabled;
		},
		get_userNotifications_store_isEnabled_state: (state: ICommon_firebase_state): boolean => {
			return state.user.notifications.store.isEnabled;
		},
		get_userNotifications_promotions_isEnabled_state: (state: ICommon_firebase_state): boolean => {
			return state.user.notifications.promotions.isEnabled;
		},
		get_userNotifications_unsubscribeToAll_isEnabled_state: (state: ICommon_firebase_state): boolean => {
			return state.user.notifications.unsubscribeToAll.isEnabled;
		},
		// User AUTH
		get_userAuth_state: (state: ICommon_firebase_state): ICommon_firebase_user_auth_state => {
			return state.user.authData;
		},
		get_userAuth_isLoggedIn_state: (state: ICommon_firebase_state): boolean => {
			// If UID is available in state, the user auth is populated.
			// If firstname is available in state, the user credentials have been stored.
			return !!state.user.authData.uid && !!state.user.firestoreData.firstname;
		},
		get_userAuth_id_state: (state: ICommon_firebase_state): string | null => {
			return state.user.authData.uid;
		},
		get_userAuth_displayName_state: (state: ICommon_firebase_state): string | null => {
			return state.user.authData.displayName;
		},
		get_userAuth_email_state: (state: ICommon_firebase_state): string | null => {
			return state.user.authData.email;
		},
		get_userAuth_emailIsVerified_state: (state: ICommon_firebase_state): boolean => {
			return state.user.authData.emailVerified;
		},
		get_userAuth_photoUrl_state: (state: ICommon_firebase_state): string | null | undefined => {
			return state.user.authData.photoURL;
		},
		get_userAuth_isAnonymous_state: (state: ICommon_firebase_state): boolean => {
			return state.user.authData.isAnonymous;
		},
		get_userAuth_joinedOn_state: (state: ICommon_firebase_state): string | null => {
			return state.user.authData.joinedOn;
		},
		// User FIRESTORE
		get_userFirestore_state: (state: ICommon_firebase_state): ICommon_firebase_user_firestore_state => {
			return state.user.firestoreData;
		},
		get_userFirestore_title_state: (state: ICommon_firebase_state): string | null => {
			return state.user.firestoreData.title;
		},
		get_userFirestore_firstname_state: (state: ICommon_firebase_state): string | null => {
			return state.user.firestoreData.firstname;
		},
		get_userFirestore_lastname_state: (state: ICommon_firebase_state): string | null => {
			return state.user.firestoreData.lastname;
		},
		get_userFirestore_phoneNumber_state: (state: ICommon_firebase_state): number | null => {
			return state.user.firestoreData.phoneNumber;
		},
	},
	actions: {
		/* User */
		// User NOTIFICATION setters
		set_userNotifications_treatments_isEnabled_state(isEnabled: boolean): void {
			this.user.notifications.treatments.isEnabled = isEnabled;
		},
		set_userNotifications_store_isEnabled_state(isEnabled: boolean): void {
			this.user.notifications.store.isEnabled = isEnabled;
		},
		set_userNotifications_promotions_isEnabled_state(isEnabled: boolean): void {
			this.user.notifications.promotions.isEnabled = isEnabled;
		},
		set_userNotifications_unsubscribeToAll_isEnabled_state(isEnabled: boolean): void {
			this.user.notifications.unsubscribeToAll.isEnabled = isEnabled;
		},
		// User AUTH actions
		monitor_userAuth_state(user: { auth: Auth }): Promise<void> {
			return new Promise((resolve, reject) => {
				onAuthStateChanged(user.auth, (user: User | null) => {
					if (user !== null) {
						let valuesNotNull: any = {};
						for (const [key, value] of Object.entries(user)) {
							if (key in this.user.authData && value !== null) {
								valuesNotNull[key] = value;
							}
						}
						this.set_userAuth_state(valuesNotNull);
						resolve();
					} else {
						reject("User is not valid.");
					}
				});
			});
		},
		login_userAuth_withEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				signInWithEmailAndPassword(auth, user.email, user.password)
					.then(() => this.get_userFirestore_user())
					.then((userData: DocumentData | string) => {
						if (typeof userData === "string")
							reject(userData);
						else {
							this.set_userFirestore_title_state(userData.title);
							this.set_userFirestore_firstname_state(userData.firstname);
							this.set_userFirestore_lastname_state(userData.lastname);
							this.set_userFirestore_phoneNumber_state(userData.phoneNumber);
							resolve();
						}
					})
					.catch((error) => {
						if (typeof error === "string")
							reject(error);
						else {
							switch (error.code) {
								case "auth/invalid-email":
									reject("The email address is malformed.");
									break;
								case "auth/user-disabled":
									reject("The user account has been disabled.");
									break;
								case "auth/user-not-found":
									reject("The user account does not exist. Please register.");
									break;
								case "auth/wrong-password":
									reject("The password provided is incorrect.");
									break;
								case "auth/too-many-requests":
									reject("Too many requests have been sent from this account. Please try again later.");
									break;
								case "auth/operation-not-allowed":
									reject("This operation is not allowed for this user. Please contact us.");
									break;
								case "auth/weak-password":
									reject("The password provided is too weak. Please try again.");
									break;
								case "auth/invalid-credential":
									reject("The provided credentials are invalid. Please try again.");
									break;
								case "auth/account-exists-with-different-credential":
									reject("An account already exists with the same email address, but a different sign-in method was used.");
									break;
								case "auth/email-already-in-use":
									reject("The email address is already in use by another account.");
									break;
								case "auth/requires-recent-login":
									reject("The user must have recently logged in to perform this operation.");
									break;
								case "auth/network-request-failed":
									reject("The network request failed.");
									break;
							}
						}
					});
			});
		},
		logout_userAuth(): Promise<void> {
			this.reset_userAuth_state();
			this.reset_userFirestore_state();
			return new Promise((resolve, reject) => {
				signOut(auth)
					.then(() => resolve())
					.catch(() => reject());
			});
		},
		// reauthenticate_userAuth_credentials(user: { email: string; password: string }): Promise<void> {
		// 	return new Promise((resolve, reject) => {
		// 		if (auth.currentUser !== null) {
		// 			reauthenticateWithCredential(auth.currentUser, user)
		// 				.then(() => {
		// 					resolve();
		// 				})
		// 				.catch((error) => {
		// 					switch (error.code) {
		// 					}
		// 				});
		// 		}
		// 	});
		// },
		create_userAuth_account_withEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password)
					.then(() => this.send_userAuth_emailVerification())
					.then(() => resolve())
					.catch((error) => {
						switch (error.code) {
							case "auth/email-already-in-use":
								const errorMessage: string = "Email already in use! Try logging in";
								reject(errorMessage);
								break;
						}
					});
			});
		},
		send_userAuth_emailVerification(): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					sendEmailVerification(auth.currentUser)
						.then(() => resolve())
						.catch(() => reject());
				}
			});
		},
		send_userAuth_passwordResetLink(email: string): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth !== null) {
					sendPasswordResetEmail(auth, email)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							switch (error.code) {
							}
						});
				}
			});
		},
		send_userAuth_signInLinkToEmail(email: string): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth !== null) {
					const actionCodeSettings: ActionCodeSettings = {
						url: "https://localhost:5173/login#section-login",
						iOS: {
							bundleId: "com.example.ios",
						},
						android: {
							packageName: "com.example.android",
							installApp: true,
							minimumVersion: "12",
						},
						handleCodeInApp: false,
					};
					sendSignInLinkToEmail(auth, email, actionCodeSettings)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							switch (error.code) {
								case "auth/argument-error":
									break;
								case "auth/operation-not-allowed":
									break;
							}
						});
				}
			});
		},
		update_userAuth_profile_displayNameAndPhotoUrl(user: { displayName?: string; photoURL?: string }): Promise<void> {
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
		update_userAuth_email(email: string): Promise<void> {
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
									reject(errorMessage);
									break;
							}
						});
				} else {
					reject("You must be logged in to change email");
				}
			});
		},
		update_userAuth_password(newPassword: string): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					updatePassword(auth.currentUser, newPassword)
						.then(() => {
							resolve();
						})
						.catch((error) => {
							switch (error.code) {
							}
						});
				}
			});
		},
		delete_userAuth(): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					deleteUser(auth.currentUser)
						.then(() => resolve())
						.catch((error) => {
							switch (error.code) {
								case "auth/requires-recent-login":
									const errorMessage: string =
										"Cannot delete account. A recent login is required. Please re-log first and try again!";
									reject(errorMessage);
									break;
							}
						});
				}
			});
		},
		// User AUTH setters
		reset_userAuth_state(): void {
			this.set_userAuth_state({
				uid: null,
				displayName: null,
				email: null,
				isEmailVerified: false,
				photoURL: null,
				isAnonymous: false,
			});
		},
		set_userAuth_state(user: {
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
						this.set_userAuth_uid_state(value as string);
						break;
					case "displayName":
						this.set_userAuth_displayName_state(value as string);
						break;
					case "email":
						this.set_userAuth_email_state(value as string);
						break;
					case "isEmailVerified":
						this.set_userAuth_emailIsVerified_state(value as boolean);
						break;
					case "photoURL":
						this.set_userAuth_photoUrl_state(value as string);
						break;
					case "isAnonymous":
						this.set_userAuth_isAnonymous_state(value as boolean);
						break;
				}
			}
		},
		set_userAuth_uid_state(uid: string | null): void {
			this.user.authData.uid = uid;
		},
		set_userAuth_displayName_state(displayName: string | null): void {
			// if (auth.currentUser && user.displayName !== null) {
			// 	updateProfile(auth.currentUser, { displayName: user.displayName });
			// 	this.user.displayName = user.displayName;
			// }
			this.user.authData.displayName = displayName;
		},
		set_userAuth_email_state(email: string | null): void {
			this.user.authData.email = email;
		},
		set_userAuth_emailIsVerified_state(emailIsVerified: boolean): void {
			this.user.authData.emailVerified = emailIsVerified;
		},
		set_userAuth_photoUrl_state(photoURL: string | null): void {
			this.user.authData.photoURL = photoURL;
		},
		set_userAuth_isAnonymous_state(isAnonymous: boolean): void {
			this.user.authData.isAnonymous = isAnonymous;
		},
		// User FIRESTORE actions
		get_userFirestore_user(): Promise<DocumentData | string> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.user.authData.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);

					getDoc(userDocumentRef)
						.then((userDocument) => {
							const userDocumentExists: boolean = userDocument.exists();
							const userDocumentData: DocumentData | undefined = userDocument.data();

							if (!userDocumentExists) 
								reject("The requested user document does not exist! Please register!");

							if (userDocumentData === undefined)
								reject("The requested user data is empty. Please try again later.");

							this.set_userFirestore_state({
								title: userDocumentData!.title,
								firstname: userDocumentData!.firstname,
								lastname: userDocumentData!.lastname,
								phoneNumber: userDocumentData!.phoneNumber,
							});
							resolve(userDocumentData as DocumentData);
						})
						.catch((error) => {
							switch (error.code) {
								case "auth/user-not-found":
									// This error occurs when the user document you're trying to retrieve 
									// doesn't exist in the Firestore database. This could be due to the following reasons
									// - The user has been deleted
									// - The document ID is incorrect
									reject("The requested user document does not exist! Please register!");
									break;
								case "auth/invalid-credential":
									// This error indicates that the credentials used to access Firestore are invalid. 
									// This could be due to the following reasons:
									// - Incorrect API key
									// - A missing authentication token
									// - Or an expired token.
									reject("Either the email or password is incorrect! Try again.");
									break;
								case "permission-denied":
									// This error means that the user doesn't have the necessary permissions 
									// to access the document. This could be due to the following reasons:
									// - Icorrect security rules
									// - Or a lack of authorization.
									reject("You are not authorized to access this data.");
									break;
								case "unavailable":
									// This error indicates that the Firestore service is temporarily unavailable. 
									// This could be due to the following reasons:
									// - Network issue 
									// - Or a server outage.
									reject("The Firestore service is temporarily unavailable.");
									break;
								case "cancelled":
									// This error occurs when the getDoc operation is cancelled before it completes. 
									// This could be due to the following reasons:
									// - User action 
									// - Or a network interruption.
									reject("The operation was cancelled because of user action or network interruption.");
									break;
								case "failed-precondition":
									// This error indicates that the getDoc operation failed due to a precondition 
									// failure. This could be due to the following reasons:
									// - A concurrent modification of the document 
									// - Or data inconsistency.
									reject("The operation failed because of concurrent modifications or data inconsitency.");
									break;
								case "aborted":
									// This error occurs when the getDoc operation is aborted due to an unexpected error.
									// This could be due to the following reasons:
									// - Network issue 
									// - Or a server error.
									reject("The operation was aborted because of a network or server issue.");
									break;
								case "out-of-range":
									// This error indicates that the document ID is invalid. 
									// This could be due to the following reasons:
									// - A typo 
									// - Or an incorrect format.
									reject("Could not find the requested document.");
									break;
								case "already-exists":
									//  This error occurs when you try to create a document with an ID that already exists. 
									reject("The document ID already exists.");
									break;
							}
						});
				} else {
					reject("You must be logged in, to get your account credentials");
				}
			});
		},
		store_userFirestore_user(user: {
			uid: string;
			title: string | null;
			firstname: string;
			lastname: string;
			phoneNumber: string | null;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.get_userAuth_id_state;

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
							reject(errorMessage);
						});
				} else {
					reject("You must be logged in, to store your account credentials");
				}
			});
		},
		update_userFirestore_user(user: {
			title?: string;
			firstname?: string;
			lastname?: string;
			phoneNumber?: number;
		}): Promise<void> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.get_userAuth_id_state;

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
		// User FIRESTORE setters
		reset_userFirestore_state(): void {
			this.set_userFirestore_state({
				title: null,
				firstname: null,
				lastname: null,
				phoneNumber: null,
			});
		},
		set_userFirestore_state(user: {
			title: string | null;
			firstname: string | null;
			lastname: string | null;
			phoneNumber: number | null;
		}): void {
			for (const [key, value] of Object.entries(user)) {
				switch (key) {
					case "title":
						this.set_userFirestore_title_state(value as string);
						break;
					case "firstname":
						this.set_userFirestore_firstname_state(value as string);
						break;
					case "lastname":
						this.set_userFirestore_lastname_state(value as string);
						break;
					case "phoneNumber":
						this.set_userFirestore_phoneNumber_state(value as number);
						break;
				}
			}
		},
		set_userFirestore_title_state(title: string | null): void {
			this.user.firestoreData.title = title;
		},
		set_userFirestore_firstname_state(firstname: string | null): void {
			this.user.firestoreData.firstname = firstname;
		},
		set_userFirestore_lastname_state(lastname: string | null): void {
			this.user.firestoreData.lastname = lastname;
		},
		set_userFirestore_phoneNumber_state(phoneNumber: number | null): void {
			this.user.firestoreData.phoneNumber = phoneNumber;
		},
	},
});

export default useFirebaseStore;
