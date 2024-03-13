import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

// Services
import { db, auth } from "@plugins/firebase/firebase.js";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, setDoc, addDoc, doc } from "firebase/firestore";
import type { UserCredential, User } from "firebase/auth";
import type { CollectionReference, DocumentReference, DocumentData } from "firebase/firestore";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import { IDialogDefaultState, IDialogLoginState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
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
		},
		appBar: {
			drawer: true,
			height: 64,
		},
		appBarHeight: 64, // Needs deleting once the referenes are deleted.
		appBarDrawer: true, // Needs deleting once the referenes are deleted.
		dialog: {
			default: {
				icons: {
					close: {
						icon: iconsDialog.close,
						tooltip: tooltipsDialog.close,
					},
				},
			},
			login: {
				showTooltip: false,
				showDialog: false,
			},
		},
		navigation: {},
	}),
	getters: {
		/* App bar */
		getAppBarHeight: (state: ICommonState): number => state.appBarHeight,
		getAppBarDrawer: (state: ICommonState): boolean => state.appBarDrawer,
		/* Dialog */
		getDialogDefaultState: (state: ICommonState): IDialogDefaultState => state.dialog.default,
		// Login
		getDialogLoginState: (state: ICommonState): IDialogLoginState => state.dialog.login,
		getDialogLoginDrawerState: (state: ICommonState): boolean => state.dialog.login.showDialog,
		getDialogLoginBtnCloseTooltipDrawerState: (state: ICommonState): boolean => state.dialog.login.showTooltip,
	},
	actions: {
		/* Firebase AUTH */
		isUserLoggedIn(): boolean {
			debugger;
			let retVal: boolean = false;
			if (this.user !== null) retVal = true;
			return retVal;
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
		monitorAuthState(user: User | null): void {
			debugger;
			if (user !== null) {
				// User logged in
				this.user.id = user.uid;
				// this.user.displayName = user.displayName;
				// this.user.email = user.email;
				// this.user.emailVerified = user.emailVerified;
				// this.user.phoneNumber = user.phoneNumber;
				// this.user.photoURL = user.photoURL;
				// this.user.isAnonymous = user.isAnonymous;
			} else {
				// User not logged in
				this.user.id = null;
				// this.user.displayName = null;
				// this.user.email = null;
				// this.user.emailVerified = null;
				// this.user.phoneNumber = null;
				// this.user.photoURL = null;
				// this.user.isAnonymous = null;
			}
		},
		/* Firebase firestore */
		// getUser(): { firstname: string; lastname: string; email: string } {
		// 	debugger;
		// 	const isUserLoggedIn: boolean = this.isUserLoggedIn();

		// 	let retVal: any = null;
		// 	if (isUserLoggedIn) {
		// 		debugger;
		// 		const [firstname, lastname, email] = Object.keys(this.user);
		// 		const isFirstnameValid: boolean = !!firstname;
		// 		const isLastnameValid: boolean = !!lastname;
		// 		const isEmailValid: boolean = !!email;
		// 		const isUserDataValid: boolean = isFirstnameValid && isLastnameValid && isEmailValid;

		// 		if (isUserDataValid) {
		// 			retVal = {
		// 				firstname: this.user.firstname,
		// 				lastname: this.user.lastname,
		// 				email: this.user.email,
		// 			};
		// 		}
		// 	}
		// 	return retVal;
		// },
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
		/* App bar */
		setAppBarDrawer(newValue: boolean): void {
			this.appBarDrawer = newValue;
		},
		/* Dialog */
		setDialogLoginDrawerState(newValue: boolean): void {
			this.dialog.login.showDialog = newValue;
		},
		setDialogLoginBtnCloseTooltipDrawerState(newValue: boolean): void {
			this.dialog.login.showTooltip = newValue;
		},
	},
});

export default pinia;
