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
	deleteUser,
	sendPasswordResetEmail,
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
		get_user_state: (state): ICommon_firebase_user_state => {
			return state.user;
		},
		// User NOTIFICATIONS
		get_userNotifications_state: (state): ICommon_firebase_user_notifications_state => {
			return state.user.notifications;
		},
		get_userNotifications_treatments_isEnabled_state: (state): boolean => {
			return state.user.notifications.treatments.isEnabled;
		},
		get_userNotifications_store_isEnabled_state: (state): boolean => {
			return state.user.notifications.store.isEnabled;
		},
		get_userNotifications_promotions_isEnabled_state: (state): boolean => {
			return state.user.notifications.promotions.isEnabled;
		},
		get_userNotifications_unsubscribeToAll_isEnabled_state: (state): boolean => {
			return state.user.notifications.unsubscribeToAll.isEnabled;
		},
		// User AUTH
		get_userAuth_state: (state): ICommon_firebase_user_auth_state => {
			return state.user.authData;
		},
		get_userAuth_isLoggedIn_state: (state): boolean => {
			// If UID is available in state, the user auth is populated.
			// If firstname is available in state, the user credentials have been stored.
			return !!state.user.authData.uid && !!state.user.firestoreData.firstname;
		},
		get_userAuth_id_state: (state): string | null => {
			return state.user.authData.uid;
		},
		get_userAuth_displayName_state: (state): string | null => {
			return state.user.authData.displayName;
		},
		get_userAuth_email_state: (state): string | null => {
			return state.user.authData.email;
		},
		get_userAuth_emailIsVerified_state: (state): boolean => {
			return state.user.authData.emailVerified;
		},
		get_userAuth_photoUrl_state: (state): string | null | undefined => {
			return state.user.authData.photoURL;
		},
		get_userAuth_isAnonymous_state: (state): boolean => {
			return state.user.authData.isAnonymous;
		},
		get_userAuth_joinedOn_state: (state): string | null => {
			return state.user.authData.joinedOn;
		},
		// User FIRESTORE
		get_userFirestore_state: (state): ICommon_firebase_user_firestore_state => {
			return state.user.firestoreData;
		},
		get_userFirestore_title_state: (state): string | null => {
			return state.user.firestoreData.title;
		},
		get_userFirestore_firstname_state: (state): string | null => {
			return state.user.firestoreData.firstname;
		},
		get_userFirestore_lastname_state: (state): string | null => {
			return state.user.firestoreData.lastname;
		},
		get_userFirestore_phoneNumber_state: (state): number | null => {
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
					.then((userData: DocumentData | undefined) => {
						if (userData !== undefined) {
							this.set_userFirestore_title_state(userData.title);
							this.set_userFirestore_firstname_state(userData.firstname);
							this.set_userFirestore_lastname_state(userData.lastname);
							this.set_userFirestore_phoneNumber_state(userData.phoneNumber);
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
		logout_userAuth(): Promise<void> {
			this.reset_userAuth_state();
			this.reset_userFirestore_state();
			return new Promise((resolve, reject) => {
				signOut(auth)
					.then(() => resolve())
					.catch(() => reject());
			});
		},
		reset_userAuth_password(email: string): Promise<void> {
			return new Promise((resolve, reject) => {
				sendPasswordResetEmail(auth, email)
					.then(() => {
						resolve();
					})
					.catch((error) => {
						debugger;
						switch (error.code) {}
					});
			});
		},
		create_userAuth_account_withEmailAndPassword(user: { email: string; password: string }): Promise<void> {
			return new Promise((resolve, reject) => {
				createUserWithEmailAndPassword(auth, user.email, user.password)
					.then(() => this.send_userAuth_emailVerification())
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
		send_userAuth_emailVerification(): Promise<void> {
			return new Promise((resolve, reject) => {
				if (auth.currentUser !== null) {
					sendEmailVerification(auth.currentUser)
						.then(() => resolve())
						.catch(() => reject());
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
									console.error(`${errorMessage}. ${error}`);
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
		get_userFirestore_user(): Promise<DocumentData> {
			return new Promise((resolve, reject) => {
				const uid: string | null = this.user.authData.uid;

				if (uid !== null) {
					const userDocumentRef = doc(db, "users", uid);

					getDoc(userDocumentRef)
						.then((userDocument) => {
							const doesUserDocumentExist: boolean = userDocument.exists();
							const userDocumentData: DocumentData | undefined = userDocument.data();

							if (doesUserDocumentExist && userDocumentData !== undefined) {
								this.set_userFirestore_state({
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
							console.error(`${errorMessage}. ${error}`);
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

					debugger;
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
