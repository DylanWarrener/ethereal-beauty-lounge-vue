import { createPinia, defineStore } from "pinia";

const pinia = createPinia();

// Services
import { auth } from "@plugins/firebase/firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import {
	IDialogDefaultState,
	IDialogLoginState,
} from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

//createUserWithEmailAndPassword().then().catch();

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
		user: {
			id: null,
			token: null,
			tokenExpiration: null
		},
		appBar: {},
		appBarHeight: 64,
		appBarDrawer: true,
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
	}),
	getters: {
		/* Users */
		getUserID: (state: ICommonState): any => state.user.id,
		getUserToken: (state: ICommonState): any => state.user.token,
		getUserTokenExpiration: (state: ICommonState): any => state.user.tokenExpiration,
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
		login(email: string, password: string) {
			debugger;
			try {
				debugger;
				const userCredential = signInWithEmailAndPassword(auth, email, password)
					.then((userCredential) => {
						debugger;
					})
					.catch((error) => {
						debugger;
						const newError = new Error(error.message || "Failed to authenticate.");
						console.error(`My error - Request to sign-up failed. Error code: ${error.code}. Error message: ${error.message}`);
						throw newError;
					});

				console.log(userCredential);
			} catch (error) {
				debugger;
				console.error(error);
			}
		},
		createAccount(payload: { email: string, password: string }): void {
			debugger;
			const userCredential = createUserWithEmailAndPassword(auth, payload.email, payload.password).then((response) => {
				debugger;
				//const userID = response.localId;
				//const token = response.idToken;
				//const tokenExpiration = response.expiresIn;

				//this.setUser({ userID, token, tokenExpiration});
			}).catch((error) => {
				debugger;
				const newError = new Error(error.message || "Failed to authenticate.");
				console.error(`My error - Request to sign-up failed. Error code: ${error.code}. Error message: ${error.message}`);
				throw newError;
			});
			console.log(userCredential);
		},
		/* Users */
		setUser(): void {
			// Store the user auth information in state
			//this.user.id = newUser.
		},
		logout(): void {
			this.user.id = null;
			this.user.token = null;
			this.user.tokenExpiration = null;
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
