import { defineStore } from "pinia";

// Constants
import { NAVIGATION_MOBLE_MENU, NAVIGATION_NON_MOBILE_MENU } from "@constants/common/arrays/common-constants-arrays.js";

// Enums
import { StoreIDs } from "@enums/enums.js";

// Constants
import {
	CONST_OBJECT_TOOLTIPS_APPBAR,
	CONST_OBJECT_ICONS_APPBAR_GENERAL,
	CONST_OBJECT_TEXT_ROUTE_NAMES,
	CONST_OBJECT_TEXT_ROUTE_LINKS,
	CONST_OBJECT_TEXT_NAVIGATION_GROUPS,
	CONST_OBJECT_ICONS_FORM,
} from "@constants/common/objects/common-constants-objects.js";

const useHeaderStore = defineStore(StoreIDs.HEADER_STORE, {
	state: (): any => ({
		appBar: {
			buttons: {
				icons: {
					mobileMenu: {
						tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.menu,
						icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.menu,
						show: false,
					},
					basket: {
						tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.basket,
						icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.basket,
						show: false,
					},
					account: {
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.account,
						tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.account,
						icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.account,
						show: false,
					},
				},
				text: {
					home: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.home,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.home,
					},
					treatments: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.treatments,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.treatments,
					},
					store: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.store,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.store,
					},
					information: {
						text: CONST_OBJECT_TEXT_NAVIGATION_GROUPS.information,
						show: false,
					},
					contact: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.contact,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.contact,
					},
					reviews: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.reviews,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.reviews,
					},
					about: {
						text: CONST_OBJECT_TEXT_ROUTE_NAMES.about,
						link: CONST_OBJECT_TEXT_ROUTE_LINKS.about,
					},
					signIn: {
						text: "Sign in",
						show: false,
					},
					signUp: {
						text: "Sign up",
						show: false,
					},
				},
			},
		},
		dialog: {
			signInCard: {
				toolbar: {
					titles: {
						signIn: "Sign in",
						forgottenPassword: "Forgotten password",
					},
				},
				content: {
					selectedComponent: "container-sign-in",
					formComponents: ["container-sign-in", "container-forgotten-password"],
					forms: {
						signIn: {
							valid: false,
							inputs: {
								email: {
									label: "Email address",
									value: "",
								},
								password: {
									label: "Password",
									show: false,
									icons: {
										show: CONST_OBJECT_ICONS_FORM.show,
										hide: CONST_OBJECT_ICONS_FORM.hide,
									},
									value: "",
								},
							},
						},
						forgottenPassword: {
							valid: false,
							inputs: {
								email: {
									label: "Email address",
									value: "",
								},
							},
						},
					},
				},
				actions: {
					buttons: {
						forgottenPassword: {
							text: "Forgotten password?",
						},
						submitForm: {
							text: "Submit form",
						},
					},
				},
			},
			signUpCard: {
				toolbar: {
					titles: {
						signIn: "Sign up",
					},
				},
				content: {
					selectedComponent: "container-sign-up",
					formComponents: ["container-sign-up"],
					forms: {
						signUp: {
							valid: false,
							inputs: {
								title: {
									label: "Title",
									value: null,
								},
								firstname: {
									label: "Firstname",
									value: "",
								},
								lastname: {
									label: "Lastname",
									value: "",
								},
								email: {
									label: "Email address",
									value: "",
								},
								phoneNumber: {
									label: "Phone number",
									value: null,
								},
								password: {
									label: "Password",
									show: false,
									icons: {
										show: CONST_OBJECT_ICONS_FORM.show,
										hide: CONST_OBJECT_ICONS_FORM.hide,
									},
									value: "",
								},
								repeatPassword: {
									label: "Repeat password",
									show: false,
									icons: {
										show: CONST_OBJECT_ICONS_FORM.show,
										hide: CONST_OBJECT_ICONS_FORM.hide,
									},
									value: "",
								},
							},
						},
						forgottenPassword: {
							valid: false,
							inputs: {
								email: {
									label: "Email address",
									value: "",
								},
							},
						},
					},
				},
				actions: {
					buttons: {
						forgottenPassword: {
							text: "Forgotten password?",
						},
						submitForm: {
							text: "Submit form",
						},
					},
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
		get_appBar_btnIconMobileMenu_tooltip_state: (state: any): boolean => state.appBar.buttons.icons.mobileMenu.tooltip,
		get_appBar_btnIconMobileMenu_icon_state: (state: any): boolean => state.appBar.buttons.icons.mobileMenu.icon,
		get_appBar_btnIconMobileMenu_show_state: (state: any): boolean => state.appBar.buttons.icons.mobileMenu.show,
		// Icon btn: Basket
		get_appBar_btnIconBasket_tooltip_state: (state: any): boolean => state.appBar.buttons.icons.basket.tooltip,
		get_appBar_btnIconBasket_icon_state: (state: any): boolean => state.appBar.buttons.icons.basket.icon,
		get_appBar_btnIconBasket_show_state: (state: any): boolean => state.appBar.buttons.icons.basket.show,
		// Icon btn: Account
		get_appBar_btnIconAccount_link_state: (state: any): boolean => state.appBar.buttons.icons.basket.link,
		get_appBar_btnIconAccount_tooltip_state: (state: any): boolean => state.appBar.buttons.icons.basket.tooltip,
		get_appBar_btnIconAccount_icon_state: (state: any): boolean => state.appBar.buttons.icons.basket.icon,
		get_appBar_btnIconAccount_show_state: (state: any): boolean => state.appBar.buttons.icons.basket.show,
		// Text btn: Home
		get_appBar_btnTextHome_text_state: (state: any): boolean => state.appBar.buttons.text.home.text,
		get_appBar_btnTextHome_link_state: (state: any): boolean => state.appBar.buttons.text.home.link,
		// Text btn: Treatments
		get_appBar_btnTextTreatments_text_state: (state: any): boolean => state.appBar.buttons.text.treatments.text,
		get_appBar_btnTextTreatments_link_state: (state: any): boolean => state.appBar.buttons.text.treatments.link,
		// Text btn: Store
		get_appBar_btnTextStore_text_state: (state: any): boolean => state.appBar.buttons.text.store.text,
		get_appBar_btnTextStore_link_state: (state: any): boolean => state.appBar.buttons.text.store.link,
		// Text btn: Information
		get_appBar_btnTextInformation_text_state: (state: any): boolean => state.appBar.buttons.text.information.text,
		get_appBar_btnTextInformation_show_state: (state: any): boolean => state.appBar.buttons.text.information.show,
		// Text btn: Contact
		get_appBar_btnTextContact_text_state: (state: any): boolean => state.appBar.buttons.text.contact.text,
		get_appBar_btnTextContact_link_state: (state: any): boolean => state.appBar.buttons.text.contact.link,
		// Text btn: Reviews
		get_appBar_btnTextReviews_text_state: (state: any): boolean => state.appBar.buttons.text.reviews.text,
		get_appBar_btnTextReviews_link_state: (state: any): boolean => state.appBar.buttons.text.reviews.link,
		// Text btn: About
		get_appBar_btnTextAbout_text_state: (state: any): boolean => state.appBar.buttons.text.about.text,
		get_appBar_btnTextAbout_link_state: (state: any): boolean => state.appBar.buttons.text.about.link,
		// Text btn: Sign in
		get_appBar_btnTextSignIn_text_state: (state: any): boolean => state.appBar.buttons.text.signIn.text,
		get_appBar_btnTextSignIn_show_state: (state: any): boolean => state.appBar.buttons.text.signIn.show,
		// Text btn: Sign up
		get_appBar_btnTextSignUp_text_state: (state: any): boolean => state.appBar.buttons.text.signUp.text,
		get_appBar_btnTextSignUp_show_state: (state: any): boolean => state.appBar.buttons.text.signUp.show,

		/* Dialog */
		// Sign in
		get_dialog_signIn_toolbar_title_state: (state: any): string => state.dialog.signInCard.toolbar.titles.signIn,
		get_dialog_signIn_contentForm_selectedComponent_state: (state: any): string =>
			state.dialog.signInCard.content.selectedComponent,
		get_dialog_signIn_contentForm_components_state: (state: any): string[] =>
			state.dialog.signInCard.content.formComponents,
		get_dialog_signIn_contentForm_valid_state: (state: any): boolean =>
			state.dialog.signInCard.content.forms.signIn.valid,
		get_dialog_signIn_contentForm_email_label_state: (state: any): string =>
			state.dialog.signInCard.content.forms.signIn.inputs.email.label,
		get_dialog_signIn_contentForm_email_value_state: (state: any): string =>
			state.dialog.signInCard.content.forms.signIn.inputs.email.value,
		get_dialog_signIn_contentForm_password_label_state: (state: any): string =>
			state.dialog.signInCard.content.forms.signIn.inputs.password.label,
		get_dialog_signIn_contentForm_password_show_state: (state: any): boolean =>
			state.dialog.signInCard.content.forms.signIn.inputs.password.show,
		get_dialog_signIn_contentForm_password_showPassword_state: (state: any): boolean =>
			state.dialog.signInCard.content.forms.signIn.inputs.password.icons.show,
		get_dialog_signIn_contentForm_password_hide_state: (state: any): boolean =>
			state.dialog.signInCard.content.forms.signIn.inputs.password.icons.hide,
		get_dialog_signIn_contentForm_password_value_state: (state: any): string =>
			state.dialog.signInCard.content.forms.signIn.inputs.email.value,

		get_dialog_signIn_email_label_state: (state: any): string => state.dialog.signInCard.content.form.email.label,
		get_dialog_signIn_email_value_state: (state: any): string => state.dialog.signInCard.content.form.email.value,
		get_dialog_signIn_password_label_state: (state: any): string => state.dialog.signInCard.content.form.password.label,
		get_dialog_signIn_password_show_state: (state: any): string => state.dialog.signInCard.content.form.password.show,
		get_dialog_signIn_password_iconPasswordShow_state: (state: any): string =>
			state.dialog.signInCard.content.form.password.icons.show,
		get_dialog_signIn_password_iconPasswordHide_state: (state: any): string =>
			state.dialog.signInCard.content.form.password.icons.hide,
		get_dialog_signIn_password_value_state: (state: any): string => state.dialog.signInCard.content.form.password.value,
		// Forgotten password
		get_dialog_forgottenPassword_email_state: (state: any): string =>
			state.dialog.forgottenPasswordCard.content.form.email.value,
		// Sign up

		/* Navigation */
		get_navigation_mobileMenu_state: (state: any): any[] => state.navigation.mobileMenu.items,
		get_navigation_pcMenu_state: (state: any): any[] => state.navigation.pcMenu.items,
	},
	actions: {
		set_appBar_mobileMenu_show_state(newValue: boolean): void {
			this.appBar.icons.mobileMenu.show = newValue;
		},
		set_appBar_information_show_state(newValue: boolean): void {
			this.appBar.icons.information.show = newValue;
		},
		set_appBar_basket_show_state(newValue: boolean): void {
			this.appBar.icons.basket.show = newValue;
		},
		set_appBar_account_show_state(newValue: boolean): void {
			this.appBar.icons.account.show = newValue;
		},
		set_appBar_signIn_show_state(newValue: boolean): void {
			this.appBar.text.signIn.show = newValue;
		},
		set_appBar_signUp_show_state(newValue: boolean): void {
			this.appBar.text.signUp.show = newValue;
		},
	},
});

export default useHeaderStore;
