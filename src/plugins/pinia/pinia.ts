import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

// Services
import { auth } from "@plugins/firebase/firebase.js";
import { 
	onAuthStateChanged,
	signInWithEmailAndPassword, 
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import type { Auth } from "firebase/auth";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import {
	IDialogDefaultState,
	IDialogLoginState,
} from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
		appBar: {
			drawer: true,
			height: 64,
		},
		appBarHeight: 64,// Needs deleting once the referenes are deleted.
		appBarDrawer: true,// Needs deleting once the referenes are deleted.
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
		navigation: {

		}
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
			let retVal: boolean = false;
			if (auth.currentUser !== null)
				retVal = true;
			return retVal;
		},
		loginWithEmailAndPassword(email: string, password: string): void {
			signInWithEmailAndPassword(auth, email, password).catch((error) => {
				debugger;
				const newError = new Error(error.message || "Failed to authenticate.");
				console.error(`My error - Request to sign-up failed. Error code: ${error.code}. Error message: ${error.message}`);
				throw newError;
			});
		},
		logout(): void {
			signOut(auth);
		},
		/**
		 * Creates a new user account associated with the specified email address and password.
		 * @param {string} email - The user email.
		 * @param {string} password - The user password.
		 * @returns Nothing.
		 * @remarks
		 * On successful creation of the user account, this user will also be signed in to your application.
		 * 
		 * User account creation can fail if the account already exists or the password is invalid.
		*/
		createAccountWithEmailAndPassword(payload: { email: string, password: string }): void {
			createUserWithEmailAndPassword(auth, payload.email, payload.password).catch((error) => {
				debugger;
				const newError = new Error(error.message || "Failed to authenticate.");
				console.error(`My error - Request to sign-up failed. Error code: ${error.code}. Error message: ${error.message}`);
				throw newError;
			});
		},
		monitorAuthState(): void {
			onAuthStateChanged(auth, user => {
				// If user object is valid, user is logged in to an account.
				// Otherwise, user is logged out.
				if (user !== null) {
					// User logged in
					debugger;
				} else {
					// User not logged in
					debugger;
				}
			});
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
