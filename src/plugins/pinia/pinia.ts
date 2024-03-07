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
	state: () => ({
		user: {},
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
		async login(email: string, password: string) {
			debugger;
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				console.log(userCredential);
			} catch (error) {
				console.error(error);
			}
		},
		async createAccount(email: string, password: string) {
			debugger;
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				console.log(userCredential);
			} catch (error) {
				console.error(error);
			}
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
