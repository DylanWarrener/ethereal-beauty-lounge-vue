import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

// Services
import { db, auth } from "@plugins/firebase/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import type { UserCredential } from "firebase/auth";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import { IDialogDefaultState, IDialogLoginState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
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
			let retVal: boolean = false;
			if (auth.currentUser !== null) retVal = true;
			return retVal;
		},
		loginWithEmailAndPassword(email: string, password: string): void {
			signInWithEmailAndPassword(auth, email, password)
				.then((response) => {
					debugger;
				})
				.catch((error) => {
					debugger;
					console.error(`My error - Request to sign-up failed. Error code: ${error.code}. Error message: ${error.message}`);
				});
		},
		logout(): void {
			signOut(auth);
		},
		createAccountWithEmailAndPassword(user: { email: string; password: string }): Promise<UserCredential> {
			return createUserWithEmailAndPassword(auth, user.email, user.password);
		},
		monitorAuthState(): void {
			onAuthStateChanged(auth, (user) => {
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
		/* Firebase firestore */
		storeNewUser(user: { firstname: string; lastname: string; email: string; password: string }): void {
			addDoc(collection(db, "users"), {
				firstname: user.firstname,
				lastname: user.lastname,
				email: user.email,
				password: user.password,
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
