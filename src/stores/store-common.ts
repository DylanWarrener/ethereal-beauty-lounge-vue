import { defineStore } from "pinia";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import { IDialogDefaultState, IDialogLoginState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
		snackbar: {
			defaultTimeout: 3000,
			success: {
				createUser: {
					value: false,
					text: "",
				},
				signInUser: {
					value: false,
					text: "",
				},
			},
			warnings: {
				createUser: {
					value: false,
					text: "",
				},
				signInUser: {
					value: false,
					text: "",
				},
			},
			errors: {
				signInUser: {
					value: false,
					text: "",
				},
				createUser: {
					value: false,
					text: "",
				},
			},
		},

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
		/* Feedback */
		// Timeout
		getSnackbarTimeoutDefaultValue: (state): number => {
			return state.snackbar.defaultTimeout;
		},
		// Success
		getCreateUserSuccessValue: (state): boolean => {
			return state.snackbar.success.createUser.value;
		},
		getSignInSuccessValue: (state): boolean => {
			return state.snackbar.success.signInUser.value;
		},
		getCreateUserSuccessMessage: (state): string => {
			return state.snackbar.success.createUser.text;
		},
		getSignInSuccessMessage: (state): string => {
			return state.snackbar.success.signInUser.text;
		},
		// Warning
		getCreateUserWarningValue: (state): boolean => {
			return state.snackbar.warnings.createUser.value;
		},
		getSignInWarningValue: (state): boolean => {
			return state.snackbar.warnings.signInUser.value;
		},
		getCreateUserWarningMessage: (state): string => {
			return state.snackbar.warnings.createUser.text;
		},
		getSignInWarningMessage: (state): string => {
			return state.snackbar.warnings.signInUser.text;
		},
		// Errors
		getCreateUserErrorValue: (state): boolean => {
			return state.snackbar.errors.createUser.value;
		},
		getSignInErrorValue: (state): boolean => {
			return state.snackbar.errors.signInUser.value;
		},
		getCreateUserErrorMessage: (state): string => {
			return state.snackbar.errors.createUser.text;
		},
		getSignInErrorMessage: (state): string => {
			return state.snackbar.errors.signInUser.text;
		},

		/* App bar */
		getAppBarDrawer: (state: ICommonState): boolean => state.appBarDrawer,

		/* Dialog */
		getDialogDefaultState: (state: ICommonState): IDialogDefaultState => state.dialog.default,

		// Login
		getDialogLoginState: (state: ICommonState): IDialogLoginState => state.dialog.login,
		getDialogLoginDrawerState: (state: ICommonState): boolean => state.dialog.login.showDialog,
		getDialogLoginBtnCloseTooltipDrawerState: (state: ICommonState): boolean => state.dialog.login.showTooltip,
	},
	actions: {
		/* Feedback */
		// Success
		setCreateUserSuccessValue(newValue: boolean): void {
			this.snackbar.success.createUser.value = newValue;
		},
		setSignInSuccessValue(newValue: boolean): void {
			this.snackbar.success.signInUser.value = newValue;
		},
		setCreateUserSuccessMessage(success: { text: string }): void {
			this.snackbar.success.createUser.text = success.text;
		},
		setSignInSuccessMessage(success: { text: string }): void {
			this.snackbar.success.signInUser.text = success.text;
		},
		// Warning
		setCreateUserWarningValue(newValue: boolean): void {
			this.snackbar.warnings.createUser.value = newValue;
		},
		setSignInWarningValue(newValue: boolean): void {
			this.snackbar.warnings.signInUser.value = newValue;
		},
		setCreateUserWarningMessage(warning: { text: string }): void {
			this.snackbar.warnings.createUser.text = warning.text;
		},
		setSignInWarningMessage(warning: { text: string }): void {
			this.snackbar.warnings.signInUser.text = warning.text;
		},
		// Errors
		setCreateUserErrorValue(newValue: boolean): void {
			this.snackbar.errors.createUser.value = newValue;
		},
		setSignInErrorValue(newValue: boolean): void {
			this.snackbar.errors.signInUser.value = newValue;
		},
		setCreateUserErrorMessage(errors: { text: string }): void {
			this.snackbar.errors.createUser.text = errors.text;
		},
		setSignInErrorMessage(errors: { text: string }): void {
			this.snackbar.errors.signInUser.text = errors.text;
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

export default useCommonStore;
