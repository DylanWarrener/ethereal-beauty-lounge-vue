import { defineStore } from "pinia";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";
import { IDialogDefaultState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Constants
import { iconsDialog, tooltipsDialog } from "@constants/common/objects/common-constants-objects.js";

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
				icons: {
					close: {
						icon: iconsDialog.close,
						tooltip: tooltipsDialog.close,
					},
				},
			},
			account: {
				profile: {
					updateAvatar: {
						show: false,
					},
				},
			},
		},
		navigation: {},
	}),
	getters: {
		/* Snackbar - Feedback */
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
		getDialog_default_icon_close_state: (state: ICommonState): string => {
			return state.dialog.default.icons.close.icon;
		},
		getDialog_default_iconTooltip_close_state: (state: ICommonState): string => {
			return state.dialog.default.icons.close.tooltip;
		},
		getDialog_accountProfile_updateAvatar_show_state: (state: ICommonState): boolean => {
			return state.dialog.account.profile.updateAvatar.show;
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
			this.snackbar.show = false;
			this.snackbar.color = "";
			this.snackbar.btnColor = "";
			this.snackbar.message = "";
		},
		setSnackbar_success_state(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "success";
			this.snackbar.btnColor = "default";
			this.snackbar.message = message;
		},
		setSnackbar_warning_state(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "warning";
			this.snackbar.btnColor = "inverted";
			this.snackbar.message = message;
		},
		setSnackbar_error_state(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "error";
			this.snackbar.btnColor = "default";
			this.snackbar.message = message;
		},

		/* Dialog */
		setDialog_accountProfile_updateAvatar_show_state(newValue: boolean): void {
			this.dialog.account.profile.updateAvatar.show = newValue;
		},
	},
});

export default useCommonStore;
