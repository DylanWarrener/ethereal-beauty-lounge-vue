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
		},
		navigation: {},
	}),
	getters: {
		/* Snackbar - Feedback */
		getSnackbar_show_value: (state: ICommonState): boolean => {
			return state.snackbar.show;
		},
		getSnackbar_timeout_value: (state: ICommonState): number => {
			return state.snackbar.timeout;
		},
		getSnackbar_color_value: (state: ICommonState): string => {
			return state.snackbar.color;
		},
		getSnackbar_btnColor_value: (state: ICommonState): string => {
			return state.snackbar.btnColor;
		},
		getSnackbar_message_value: (state: ICommonState): string => {
			return state.snackbar.message;
		},

		/* Dialog */
		getDialogDefaultState: (state: ICommonState): IDialogDefaultState => state.dialog.default,
	},
	actions: {
		/* Snackbar - Feedback */
		setSnackbar_show_value(show: boolean): void {
			this.snackbar.show = show;
		},
		setSnackbar_timeout_value(timeout: number): void {
			this.snackbar.timeout = timeout;
		},
		setSnackbar_color_value(color: string): void {
			this.snackbar.color = color;
		},
		setSnackbar_btnColor_value(btnColor: string): void {
			this.snackbar.btnColor = btnColor;
		},
		setSnackbar_message_value(message: string): void {
			this.snackbar.message = message;
		},
		setSnackbar_reset_values(): void {
			this.snackbar.show = false;
			this.snackbar.color = "";
			this.snackbar.btnColor = "";
			this.snackbar.message = "";
		},
		setSnackbar_success_value(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "success";
			this.snackbar.btnColor = "default";
			this.snackbar.message = message;
		},
		setSnackbar_warning_value(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "warning";
			this.snackbar.btnColor = "inverted";
			this.snackbar.message = message;
		},
		setSnackbar_error_value(message: string): void {
			this.snackbar.show = true;
			this.snackbar.color = "error";
			this.snackbar.btnColor = "default";
			this.snackbar.message = message;
		},
	},
});

export default useCommonStore;
