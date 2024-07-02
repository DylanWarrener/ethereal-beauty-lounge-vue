import { defineStore } from "pinia";

// Constants
import { NAVIGATION_MOBLE_MENU, NAVIGATION_NON_MOBILE_MENU } from "@constants/common/arrays/common-constants-arrays.js";

// Enums
import { StoreIDs } from "@enums/enums.js";

const useHeaderStore = defineStore(StoreIDs.HEADER_STORE, {
	state: (): any => ({
		appBar: {
			buttons: {
				icons: {
					mobileMenu: {
						show: false,
					},
					basket: {
						show: false,
					},
				},
				text: {
					information: {
						show: false,
					},
					signIn: {
						show: false,
					},
					signUp: {
						show: false,
					},
				},
			},
		},
		dialog: {
			signInCard: {
				toolbar: {
					title: "Sign in",
				},
				content: {
					selectedComponent: "container-sign-in",
					formComponents: ["container-sign-in", "container-forgotten-password"],
					forms: {
						signIn: {
							valid: false,
							inputs: {
								email: {
									value: "",
								},
								password: {
									show: false,
									value: "",
								},
							},
						},
						forgottenPassword: {
							valid: false,
							inputs: {
								email: {
									value: "",
								},
							},
						},
					},
				},
			},
			signUpCard: {
				toolbar: {
					title: "Sign up",
				},
				content: {
					selectedComponent: "container-sign-up",
					formComponents: ["container-sign-up"],
					forms: {
						signUp: {
							valid: false,
							inputs: {
								title: {
									value: null,
								},
								firstname: {
									value: "",
								},
								lastname: {
									value: "",
								},
								email: {
									value: "",
								},
								phoneNumber: {
									value: null,
								},
								password: {
									show: false,
									value: "",
								},
								repeatPassword: {
									show: false,
									value: "",
								},
							},
						},
					},
				},
				actions: {
					buttons: {},
				},
			},
		},
		navigation: {
			mobileMenu: {
				items: NAVIGATION_MOBLE_MENU,
			},
			pcMenu: {
				items: NAVIGATION_NON_MOBILE_MENU,
			},
		},
	}),
	getters: {
		/* App bar */
		// Icon btn: Mobile menu
		get_appBar_btnIconMobileMenu_show_state: (state: any): boolean => state.appBar.buttons.icons.mobileMenu.show,
		// Icon btn: Basket
		get_appBar_btnIconBasket_show_state: (state: any): boolean => state.appBar.buttons.icons.basket.show,
		// Text btn: Information
		get_appBar_btnTextInformation_show_state: (state: any): boolean => state.appBar.buttons.text.information.show,
		// Text btn: Sign in
		get_appBar_btnTextSignIn_show_state: (state: any): boolean => state.appBar.buttons.text.signIn.show,
		// Text btn: Sign up
		get_appBar_btnTextSignUp_show_state: (state: any): boolean => state.appBar.buttons.text.signUp.show,

		/* Dialog */
		// Sign in
		get_dialog_signInCard_toolbarTitle_state: (state: any): string => state.dialog.signInCard.toolbar.title,
		get_dialog_signInCard_content_selectedComponent_state: (state: any): string => state.dialog.signInCard.content.selectedComponent,
		get_dialog_signInCard_content_formComponents_state: (state: any): string[] => state.dialog.signInCard.content.formComponents,
		get_dialog_signInCard_content_signInForm_valid_state: (state: any): boolean => state.dialog.signInCard.content.forms.signIn.valid,
		get_dialog_signInCard_content_signInForm_emailInput_value_state: (state: any): string => state.dialog.signInCard.content.forms.signIn.inputs.email.value,
		get_dialog_signInCard_content_signInForm_passwordInput_show_state: (state: any): boolean => state.dialog.signInCard.content.forms.signIn.inputs.password.show,
		get_dialog_signInCard_content_signInForm_passwordInput_value_state: (state: any): string => state.dialog.signInCard.content.forms.signIn.inputs.password.value,
		get_dialog_signInCard_content_forgottenPasswordForm_valid_state: (state: any): boolean => state.dialog.signInCard.content.forms.forgottenPassword.valid,
		get_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state: (state: any): string => state.dialog.signInCard.content.forms.forgottenPassword.inputs.email.value,
		// Sign up
		get_dialog_signUpCard_toolbarTitle_state: (state: any): string => state.dialog.signUpCard.toolbar.title,
		get_dialog_signUpCard_content_selectedComponent_state: (state: any): string => state.dialog.signUpCard.content.selectedComponent,
		get_dialog_signUpCard_content_formComponents_state: (state: any): string[] => state.dialog.signUpCard.content.formComponents,
		get_dialog_signUpCard_content_signUpForm_valid_state: (state: any): boolean => state.dialog.signUpCard.content.forms.signUp.valid,
		get_dialog_signUpCard_content_signUpForm_titleInput_value_state: (state: any): string | null => state.dialog.signUpCard.content.forms.signUp.inputs.title.value,
		get_dialog_signUpCard_content_signUpForm_firstnameInput_value_state: (state: any): string => state.dialog.signUpCard.content.forms.signUp.inputs.firstname.value,
		get_dialog_signUpCard_content_signUpForm_lastnameInput_value_state: (state: any): string => state.dialog.signUpCard.content.forms.signUp.inputs.lastname.value,
		get_dialog_signUpCard_content_signUpForm_emailInput_value_state: (state: any): string => state.dialog.signUpCard.content.forms.signUp.inputs.email.value,
		get_dialog_signUpCard_content_signUpForm_phoneNumberInput_value_state: (state: any): number | null => state.dialog.signUpCard.content.forms.signUp.inputs.phoneNumber.value,
		get_dialog_signUpCard_content_signUpForm_passwordInput_show_state: (state: any): boolean => state.dialog.signUpCard.content.forms.signUp.inputs.password.show,
		get_dialog_signUpCard_content_signUpForm_passwordInput_value_state: (state: any): string => state.dialog.signUpCard.content.forms.signUp.inputs.password.value,
		get_dialog_signUpCard_content_signUpForm_repeatPasswordInput_show_state: (state: any): boolean => state.dialog.signUpCard.content.forms.signUp.inputs.repeatPassword.show,
		get_dialog_signUpCard_content_signUpForm_repeatPasswordInput_value_state: (state: any): string => state.dialog.signUpCard.content.forms.signUp.inputs.repeatPassword.value,

		/* Navigation */
		get_navigation_mobileMenu_state: (state: any): any[] => state.navigation.mobileMenu.items,
		get_navigation_pcMenu_state: (state: any): any[] => state.navigation.pcMenu.items,
	},
	actions: {
		/* App bar */
		// Icon btn: Mobile menu
		set_appBar_btnIconMobileMenu_show_state(newValue: boolean): void {
			this.appBar.buttons.icons.mobileMenu.show = newValue;
		},
		// Icon btn: Basket menu
		set_appBar_btnIconBasket_show_state(newValue: boolean): void {
			this.appBar.buttons.icons.basket.show = newValue;
		},
		// Text btn: Information menu
		set_appBar_btnTextInformation_show_state(newValue: boolean): void {
			this.appBar.buttons.text.information.show = newValue;
		},
		// Text btn: Sign in
		set_appBar_btnTextSignIn_show_state(newValue: boolean): void {
			this.appBar.buttons.text.signIn.show = newValue;
		},
		/// Text btn: Sign up
		set_appBar_btnTextSignUp_show_state(newValue: boolean): void {
			this.appBar.buttons.text.signUp.show = newValue;
		},

		/* Dialog */
		// Sign in
		set_dialog_signInCard_toolbarTitle_state(newValue: string): void {
			this.dialog.signInCard.toolbar.title = newValue;
		},
		set_dialog_signInCard_content_selectedComponent_state(newValue: string): void {
			this.dialog.signInCard.content.selectedComponent = newValue;
		},
		set_dialog_signInCard_content_signInForm_valid_state(newValue: boolean): void {
			this.dialog.signInCard.content.forms.signIn.valid = newValue;
		},
		set_dialog_signInCard_content_signInForm_emailInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.signIn.inputs.email.value = newValue;
		},
		set_dialog_signInCard_content_signInForm_passwordInput_show_state(newValue: boolean): void {
			this.dialog.signInCard.content.forms.signIn.inputs.password.show = newValue;
		},
		set_dialog_signInCard_content_signInForm_passwordInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.signIn.inputs.password.value = newValue;
		},
		set_dialog_signInCard_content_forgottenPasswordForm_valid_state(newValue: boolean): void {
			this.dialog.signInCard.content.forms.forgottenPassword.valid = newValue;
		},
		set_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.forgottenPassword.valid = newValue;
		},
		// Sign up
		set_dialog_signUpCard_toolbarTitle_state(newValue: string): void {
			this.dialog.signUpCard.toolbar.title = newValue;
		},
		set_dialog_signUpCard_content_selectedComponent_state(newValue: string): void {
			this.dialog.signUpCard.content.selectedComponent = newValue;
		},
		set_dialog_signUpCard_content_signUpForm_valid_state(newValue: boolean): void {
			this.dialog.signUpCard.content.forms.signUp.valid = newValue;
		},
		set_dialog_signUpCard_content_signUpForm_emailInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.signIn.inputs.email.value = newValue;
		},
		set_dialog_signUpCard_content_signUpForm_passwordInput_show_state(newValue: boolean): void {
			this.dialog.signInCard.content.forms.signIn.inputs.password.show = newValue;
		},
		set_dialog_signUpCard_content_signUpForm_passwordInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.signIn.inputs.password.value = newValue;
		},
		set_dialog_signUpCard_content_forgottenPasswordForm_valid_state(newValue: boolean): void {
			this.dialog.signInCard.content.forms.forgottenPassword.valid = newValue;
		},
		set_dialog_signUpCard_content_forgottenPasswordForm_emailInput_value_state(newValue: string): void {
			this.dialog.signInCard.content.forms.forgottenPassword.valid = newValue;
		},
	},
});

export default useHeaderStore;
