import { defineStore } from "pinia";

// Interfaces
import ICommonState from "@declarations/common/interfaces/common-interface.js";

// Constants
import { CONST_OBJECT_TOOLTIPS_DIALOG } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { mdiEye, mdiEyeOff, mdiClose } from "@mdi/js";

// Main store
export const useCommonStore = defineStore("common-store", {
	state: (): ICommonState => ({
		snackbar: {
			show: false,
			timeout: 5000,
			backgroundColour: "",
			message: "",
			button: {
				text: "Close",
				colour: ""
			}
		},
		dialog: {
			default: {
				buttons: {
					close: {
						icon: mdiClose,
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
		form: {
			default: {
				inputs: {
					password: {
						icons: {
							show: mdiEye,
							hide: mdiEyeOff,
						}
					}
				}
			}
		}
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
		getSnackbar_backgroundColour_state: (state: ICommonState): string => {
			return state.snackbar.backgroundColour;
		},
		getSnackbar_message_state: (state: ICommonState): string => {
			return state.snackbar.message;
		},
		getSnackbar_btnText_state: (state: ICommonState): string => {
			return state.snackbar.button.text;
		},
		getSnackbar_btnColour_state: (state: ICommonState): string => {
			return state.snackbar.button.colour;
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

		/* Form */
		get_form_default_input_password_icon_show_state: (state: ICommonState): string => {
			return state.form.default.inputs.password.icons.show;
		},
		get_form_default_input_password_icon_hide_state: (state: ICommonState): string => {
			return state.form.default.inputs.password.icons.hide;
		}
	},
	actions: {
		/* Snackbar - Feedback */
		setSnackbar_show_state(show: boolean): void {
			this.snackbar.show = show;
		},
		setSnackbar_timeout_state(timeout: number): void {
			this.snackbar.timeout = timeout;
		},
		setSnackbar_backgroundColour_state(colour: string): void {
			this.snackbar.backgroundColour = colour;
		},
		setSnackbar_message_state(message: string): void {
			this.snackbar.message = message;
		},
		setSnackbar_btnColour_state(colour: string): void {
			this.snackbar.button.colour = colour;
		},
		setSnackbar_reset_state(): void {
			this.setSnackbar_show_state(false);
			this.setSnackbar_backgroundColour_state("");
			this.setSnackbar_message_state("");
			this.setSnackbar_btnColour_state("");
		},
		setSnackbar_success_state(message: string): void {
			this.setSnackbar_show_state(true);
			this.setSnackbar_backgroundColour_state("success");
			this.setSnackbar_message_state(message);
			this.setSnackbar_btnColour_state("default");
		},
		setSnackbar_warning_state(message: string): void {
			this.setSnackbar_show_state(true);
			this.setSnackbar_backgroundColour_state("warning");
			this.setSnackbar_message_state(message);
			this.setSnackbar_btnColour_state("inverted");
		},
		setSnackbar_error_state(message: string): void {
			const snackbarBefore = this.snackbar;
			this.setSnackbar_show_state(true);
			this.setSnackbar_backgroundColour_state("error");
			this.setSnackbar_message_state(message);
			this.setSnackbar_btnColour_state("default");
			const snackbarAfter = this.snackbar;
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
