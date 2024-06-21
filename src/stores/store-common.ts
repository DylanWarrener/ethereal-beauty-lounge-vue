import { defineStore } from "pinia";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";

// Constants
import { CONST_OBJECT_ICONS_DIALOG, CONST_OBJECT_TOOLTIPS_DIALOG } from "@constants/common/objects/common-constants-objects.js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
		snackbar: {
			show: false,
			timeout: 5000,
			color: null,
			btnColor: null,
			message: null,
		},
		dialog: {
			default: {
				buttons: {
					close: {
						icon: CONST_OBJECT_ICONS_DIALOG.close,
						tooltip: CONST_OBJECT_TOOLTIPS_DIALOG.close,
					},
				},
			},
			account: {
				profile: {
					updateAvatar: {
						show: false,
					},
				},
				security: {
					deleteAccount: {
						show: false,
					},
				},
			},
		},
		appbar: {
			show: true,
		},
	}),
	getters: {
		/* Snackbar - Feedback */
		getSnackbar_state: (state: ICommonState): any => {
			return state.snackbar;
		},
		getSnackbar_show_state: (state: ICommonState): boolean => {
			return state.snackbar.show;
		},
		getSnackbar_timeout_state: (state: ICommonState): number => {
			return state.snackbar.timeout;
		},
		getSnackbar_color_state: (state: ICommonState): string => {
			return state.snackbar.color;
		},
		getSnackbar_btnColor_state: (state: ICommonState): string => {
			return state.snackbar.btnColor;
		},
		getSnackbar_message_state: (state: ICommonState): string => {
			return state.snackbar.message;
		},

		/* Dialog */
		getDialog_default_btnClose_icon_state: (state: ICommonState): string => {
			return state.dialog.default.buttons.close.icon;
		},
		getDialog_default_btnClose_tooltip_state: (state: ICommonState): string => {
			return state.dialog.default.buttons.close.tooltip;
		},
		getDialog_accountProfile_updateAvatar_show_state: (state: ICommonState): boolean => {
			return state.dialog.account.profile.updateAvatar.show;
		},
		getDialog_accountSecurity_deleteAccount_show_state: (state: ICommonState): boolean => {
			return state.dialog.account.security.deleteAccount.show;
		},

		/* App bar */
		getAppbar_show_state: (state: ICommonState): boolean => {
			return state.appbar.show;
		},
	},
	actions: {
		/* Snackbar - Feedback */
		setSnackbar_show_state(show: boolean): void {
			this.snackbar.show = show;
		},
		setSnackbar_timeout_state(timeout: number): void {
			this.snackbar.timeout = timeout;
		},
		setSnackbar_color_state(color: string): void {
			this.snackbar.color = color;
		},
		setSnackbar_btnColor_state(btnColor: string): void {
			this.snackbar.btnColor = btnColor;
		},
		setSnackbar_message_state(message: string): void {
			this.snackbar.message = message;
		},
		setSnackbar_reset_state(): void {
			this.setSnackbar_show_state(false);
			this.setSnackbar_color_state("");
			this.setSnackbar_btnColor_state("");
			this.setSnackbar_message_state("");
		},
		setSnackbar_success_state(message: string): void {
			this.setSnackbar_show_state(true);
			this.setSnackbar_color_state("success");
			this.setSnackbar_btnColor_state("default");
			this.setSnackbar_message_state(message);
		},
		setSnackbar_warning_state(message: string): void {
			this.setSnackbar_show_state(true);
			this.setSnackbar_color_state("warning");
			this.setSnackbar_btnColor_state("inverted");
			this.setSnackbar_message_state(message);
		},
		setSnackbar_error_state(message: string): void {
			this.setSnackbar_show_state(true);
			this.setSnackbar_color_state("error");
			this.setSnackbar_btnColor_state("default");
			this.setSnackbar_message_state(message);
		},

		/* Dialog */
		setDialog_accountProfile_updateAvatar_show_state(newValue: boolean): void {
			this.dialog.account.profile.updateAvatar.show = newValue;
		},
		setDialog_accountSecurity_deleteAccount_show_state(newValue: boolean): void {
			this.dialog.account.security.deleteAccount.show = newValue;
		},

		/* App bar */
		setAppbar_show_state(newValue: boolean): void {
			this.appbar.show = newValue;
		},
	},
});

export default useCommonStore;
