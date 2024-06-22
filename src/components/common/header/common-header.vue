<template>
	<v-app-bar elevation="0" scroll-behavior="hide" color="accent" density="comfortable">
		<!-- APP BAR LEFT -->
		<container-card
			hover
			exact
			elevation="0"
			variant="flat"
			color="transparent"
			width="150"
			height="100%"
			style="background: linear-gradient(90deg, rgba(255, 255, 255, 0.75) 0%, rgba(186, 119, 145, 1) 100%)"
			:to="computed_link_appBar_btnHome_local"
			v-ripple="{ class: 'text-accent' }"
		>
			<template #card-img>
				<v-img cover src="logo-transparent.png" width="100%" height="100%"></v-img>
			</template>
		</container-card>
		<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnMobileMenu_local">
			<template #activator="{ props }">
				<container-btn
					varient="flat"
					class="d-flex d-md-none"
					:icon="computed_icon_appBar_btnMobileMenu_local"
					v-bind="props"
					@click="computed_data_appBar_btnMobileMenu_show_state = !computed_data_appBar_btnMobileMenu_show_state"
				></container-btn>
			</template>
		</v-tooltip>
		<v-spacer></v-spacer>

		<!-- APP BAR MIDDLE - Text navs -->
		<container-btn
			class="d-none d-md-flex"
			:text="computed_text_appBar_btnHome_local"
			:to="computed_link_appBar_btnHome_local"
		></container-btn>
		<container-btn
			class="d-none d-md-flex"
			:text="computed_text_appBar_btnTreatments_local"
			:to="computed_link_appBar_btnTreatments_local"
		></container-btn>
		<container-btn
			class="d-none d-md-flex"
			:text="computed_text_appBar_btnStore_local"
			:to="computed_link_appBar_btnStore_local"
		></container-btn>
		<container-menu>
			<template #menu-btn="{ props }">
				<container-btn
					class="d-none d-md-flex"
					:text="computed_text_appBar_btnInformation_local"
					v-bind="props"
					@click="computed_data_appBar_btnInformation_show_state = !computed_data_appBar_btnInformation_show_state"
				></container-btn>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnContact_local">
						<span class="text-default" v-text="computed_text_appBar_btnContact_local"></span>
					</v-list-item>
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnReviews_local">
						<span class="text-default" v-text="computed_text_appBar_btnReviews_local"></span>
					</v-list-item>
					<v-list-item class="text-inverted text-capitalize" :to="computed_link_appBar_btnAbout_local">
						<span class="text-default" v-text="computed_text_appBar_btnAbout_local"></span>
					</v-list-item>
				</v-list>
			</template>
		</container-menu>
		<v-spacer></v-spacer>

		<v-divider vertical inset class="mx-2 d-none d-md-flex border-opacity-100"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
		<container-menu>
			<template #menu-btn="{ props: menuProps }">
				<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnBasket_local">
					<template #activator="{ props: tooltipProps }">
						<container-btn
							class="d-flex d-md-flex"
							:icon="computed_icon_appBar_btnBasket_local"
							v-bind="mergeProps(menuProps, tooltipProps)"
							@click="computed_data_appBar_btnBasket_show_state = !computed_data_appBar_btnBasket_show_state"
						></container-btn>
					</template>
				</v-tooltip>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-uppercase">
						<span class="text-uppercase">Not sure yet...</span>
					</v-list-item>
				</v-list>
			</template>
		</container-menu>
		<container-btn
			variant="flat"
			:text="computed_text_appBar_btnSignIn_local"
			@click="computed_data_appBar_btnSignIn_show_state = !computed_data_appBar_btnSignIn_show_state"
		></container-btn>
		<container-btn
			variant="flat"
			color="inverted"
			:text="computed_text_appBar_btnSignUp_local"
			@click="computed_data_appBar_btnSignUp_show_state = !computed_data_appBar_btnSignUp_show_state"
		></container-btn>
		<!-- <container-menu>
			<template #menu-btn>
				<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnAccount_local">
					<template #activator="{ props }">
						<container-btn
							class="d-flex d-md-flex"
							:icon="computed_icon_appBar_btnAccount_local"
							v-bind="props"
							v-if="!computed_data_user_isLoggedIn"
							@click="method_event_account_clickHandler"
						></container-btn>
					</template>
				</v-tooltip>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-uppercase" :to="computed_link_appBar_btnLogin_local">
						<span class="text-uppercase" v-text="computed_text_appBar_btnLogin_local"></span>
					</v-list-item>
					<v-list-item class="text-inverted text-uppercase" :to="computed_link_appBar_btnLogin_local">
						<span class="text-uppercase" v-text="computed_text_appBar_btnRegister_local"></span>
					</v-list-item>
				</v-list>
			</template>
		</container-menu> -->
		<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnAccount" v-if="computed_data_user_isLoggedIn">
			<template #activator="{ props }">
				<container-btn
					class="d-flex d-lg-none"
					:text="computed_text_appBar_btnAccount_local"
					:to="computed_link_appBar_btnAccount_local"
					v-bind="props"
					@click="computed_data_appBar_btnAccount_show_state = !computed_data_appBar_btnAccount_show_state"
				></container-btn>
			</template>
		</v-tooltip>
	</v-app-bar>

	<!-- Sign in dialog -->
	<container-dialog
		:toolbar-title="computed_text_dialog_signIn_toolbarTitle_local"
		@close="computed_data_appBar_btnSignIn_show_state = !computed_data_appBar_btnSignIn_show_state"
		v-model="computed_data_appBar_btnSignIn_show_state"
	>
		<template #dialog-card-content>
			<component :is="computed_data_dialog_signIn_selectedComponent"></component>
		</template>
		<template #dialog-card-actions>
			<v-spacer></v-spacer>
			<container-btn
				variant="flat"
				color="inverted"
				:text="computed_text_dialog_btnForgottenPassword_local"
				@click="method_event_dialog_forgottenPassword_clickHandler"
			></container-btn>
			<container-btn
				variant="flat"
				:text="computed_text_dialog_btnSubmitForm_local"
				@click="method_event_dialog_submitForm_clickHandler"
			></container-btn>
		</template>
	</container-dialog>

	<!-- Sign up dialog -->
	<container-dialog
		:toolbar-title="computed_text_dialog_signUp_toolbarTitle_local"
		@close="computed_data_appBar_btnSignUp_show_state = !computed_data_appBar_btnSignUp_show_state"
		v-model="computed_data_appBar_btnSignUp_show_state"
	>
		<template #dialog-card-content>
			<component :is="computed_data_dialog_signUp_selectedComponent"></component>
		</template>
		<template #dialog-card-actions>
			<v-spacer></v-spacer>
			<container-btn
				variant="flat"
				:text="computed_text_dialog_btnSubmitForm_local"
				@click="method_event_dialog_submitForm_clickHandler"
			></container-btn>
		</template>
	</container-dialog>
	<container-navigation
		location="bottom"
		:navigation="computed_data_navigation_mobileMenu"
		v-model="computed_data_appBar_btnMobileMenu_show_state"
	></container-navigation>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import NavigationPagesNonMobileMenuContainerComp from "@components/uncommon/navigation/pages/non-mobile-menu/uncommon-navigation-pages-non-mobile-menu.vue";
import SignInComp from "@components/common/form/signIn/common-form-sign-in.vue";
import SignUpComp from "@components/common/form/signUp/common-form-sign-up.vue";
import ForgottenPasswordComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";

// Constants
import {
	CONST_OBJECT_TEXT_ROUTE_NAMES,
	CONST_OBJECT_TEXT_ROUTE_LINKS,
	CONST_OBJECT_TEXT_NAVIGATION_GROUPS,
	CONST_OBJECT_TOOLTIPS_APPBAR,
	CONST_OBJECT_ICONS_APPBAR_GENERAL,
} from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "header-container-component",
	components: {
		"common-navigation-pages-non-mobile-menu": NavigationPagesNonMobileMenuContainerComp,
		"container-sign-in": SignInComp,
		"container-sign-up": SignUpComp,
		"container-forgotten-password": ForgottenPasswordComp,
	},
	data(): any {
		return {
			header: {
				appbar: {
					buttons: {
						icons: {
							mobileMenu: {
								tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.menu,
								icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.menu,
							},
							basket: {
								link: CONST_OBJECT_TEXT_ROUTE_LINKS.basket,
								tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.basket,
								icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.basket,
							},
							account: {
								link: CONST_OBJECT_TEXT_ROUTE_LINKS.account,
								tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.account,
								icon: CONST_OBJECT_ICONS_APPBAR_GENERAL.account,
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
							},
							signUp: {
								text: "Sign up",
							},
							account: {
								text: CONST_OBJECT_TEXT_ROUTE_NAMES.account,
								link: CONST_OBJECT_TEXT_ROUTE_LINKS.account,
							},
						},
					},
				},
				dialog: {
					commonActions: {
						buttons: {
							submit: {
								text: "Submit form"
							}
						}
					},
					signInCard: {
						toolbar: {
							title: "Sign In",
						},
						content: {
							signInSelectedComponent: "container-sign-in",
							signInComponent: ["container-sign-in", "container-forgotten-password"],
						},
						actions: {
							buttons: {
								forgottenPassword: {
									text: "Forgotten password?",
								}
							},
						},
					},
					signUpCard: {
						toolbar: {
							title: "Sign Up",
						},
						content: {
							signUpSelectedComponent: "container-sign-up",
							signUpComponent: ["container-sign-up"],
						},
						actions: {
							buttons: {},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_appBar_btnHome_local(): string {
			return this.header.appbar.buttons.text.home.text;
		},
		computed_text_appBar_btnTreatments_local(): string {
			return this.header.appbar.buttons.text.treatments.text;
		},
		computed_text_appBar_btnStore_local(): string {
			return this.header.appbar.buttons.text.store.text;
		},
		computed_text_appBar_btnInformation_local(): string {
			return this.header.appbar.buttons.text.information.text;
		},
		computed_text_appBar_btnContact_local(): string {
			return this.header.appbar.buttons.text.contact.text;
		},
		computed_text_appBar_btnReviews_local(): string {
			return this.header.appbar.buttons.text.reviews.text;
		},
		computed_text_appBar_btnAbout_local(): string {
			return this.header.appbar.buttons.text.about.text;
		},
		computed_text_appBar_btnSignIn_local(): string {
			return this.header.appbar.buttons.text.signIn.text;
		},
		computed_text_appBar_btnSignUp_local(): string {
			return this.header.appbar.buttons.text.signUp.text;
		},
		computed_text_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.text.account.text;
		},
		computed_text_dialog_signIn_toolbarTitle_local(): string {
			return this.header.dialog.signInCard.toolbar.title;
		},
		computed_text_dialog_btnForgottenPassword_local(): string {
			return this.header.dialog.signInCard.actions.buttons.forgottenPassword.text;
		},
		computed_text_dialog_btnSubmitForm_local(): string {
			return this.header.dialog.commonActions.buttons.submit.text;
		},
		computed_text_dialog_signUp_toolbarTitle_local(): string {
			return this.header.dialog.signUpCard.toolbar.title;
		},

		computed_link_appBar_btnHome_local(): string {
			return this.header.appbar.buttons.text.home.link;
		},
		computed_link_appBar_btnTreatments_local(): string {
			return this.header.appbar.buttons.text.treatments.link;
		},
		computed_link_appBar_btnStore_local(): string {
			return this.header.appbar.buttons.text.store.link;
		},
		computed_link_appBar_btnContact_local(): string {
			return this.header.appbar.buttons.text.contact.link;
		},
		computed_link_appBar_btnReviews_local(): string {
			return this.header.appbar.buttons.text.reviews.link;
		},
		computed_link_appBar_btnAbout_local(): string {
			return this.header.appbar.buttons.text.about.link;
		},
		computed_link_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.link;
		},
		computed_link_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.link;
		},

		computed_tooltip_appBar_btnMobileMenu_local(): string {
			return this.header.appbar.buttons.icons.mobileMenu.tooltip;
		},
		computed_tooltip_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.tooltip;
		},
		computed_tooltip_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.tooltip;
		},

		computed_icon_appBar_btnMobileMenu_local(): any {
			return this.header.appbar.buttons.icons.mobileMenu.icon;
		},
		computed_icon_appBar_btnBasket_local(): any {
			return this.header.appbar.buttons.icons.basket.icon;
		},
		computed_icon_appBar_btnAccount_local(): any {
			return this.header.appbar.buttons.icons.account.icon;
		},

		computed_data_user_initials(): string | null {
			let retval: string | null = null;
			if (this.computed_data_user_displayName !== null) {
				const [firstname, lastname] = this.computed_data_user_displayName.split(" ");
				retval = `${firstname[0]}${lastname[0]}`.toUpperCase();
			}
			return retval;
		},
		computed_data_user_displayName(): string | null {
			return this.storeFirebase.get_userAuth_displayName_state;
		},
		computed_data_user_isLoggedIn(): boolean {
			return this.storeFirebase.get_userAuth_isLoggedIn_state;
		},
		computed_data_dialog_signIn_availableComponents(): string[] {
			return this.header.dialog.signInCard.content.signInComponent;
		},
		computed_data_dialog_signUp_availableComponents(): string[] {
			return this.header.dialog.signUpCard.content.signUpComponent;
		},
		computed_data_navigation_mobileMenu(): any[] {
			return this.storeHeader.get_navigation_mobileMenu_state;
		},
		computed_data_navigation_pcMenu(): any[] {
			return this.storeHeader.get_navigation_pcMenu_state;
		},

		computed_data_dialog_signIn_selectedComponent: {
			get(): string {
				return this.header.dialog.signInCard.content.signInSelectedComponent;
			},
			set(newValue: string): void {
				this.header.dialog.signInCard.content.signInSelectedComponent = newValue;
			},
		},
		computed_data_dialog_signUp_selectedComponent: {
			get(): string {
				return this.header.dialog.signUpCard.content.signUpSelectedComponent;
			},
			set(newValue: string): void {
				this.header.dialog.signUpCard.content.signUpSelectedComponent = newValue;
			},
		},
		computed_data_appBar_btnMobileMenu_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_mobileMenu_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_mobileMenu_show_state(newValue);
			},
		},
		computed_data_appBar_btnInformation_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_information_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_information_show_state(newValue);
			},
		},
		computed_data_appBar_btnBasket_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_basket_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_basket_show_state(newValue);
			},
		},
		computed_data_appBar_btnAccount_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_account_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_account_show_state(newValue);
			},
		},
		computed_data_appBar_btnSignIn_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_signIn_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_signIn_show_state(newValue);
			},
		},
		computed_data_appBar_btnSignUp_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_signUp_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_signUp_show_state(newValue);
			},
		},
	},
	methods: {
		mergeProps,
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
		},
		method_event_setSignInSelectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signIn_selectedComponent = selectedComponent;
		},
		method_event_setSignUpSelectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signUp_selectedComponent = selectedComponent;
		},
		method_event_dialog_forgottenPassword_clickHandler(): void {
			this.computed_data_dialog_signIn_selectedComponent = "container-forgotten-password";
		},
		method_event_dialog_submitForm_clickHandler(): void {
			const signInDialog_show: boolean = this.computed_data_appBar_btnSignIn_show_state;
			const signUpDialog_show: boolean = this.computed_data_appBar_btnSignUp_show_state;
			
			if (signInDialog_show) {
				switch (this.computed_data_dialog_signIn_selectedComponent) {
					case "container-sign-in":
						this.method_utils_dialog_submitForm_signIn_clickHandler();
						break;
					case "container-forgotten-password": 
						break;
				}
			}

			if (signUpDialog_show) {

			}
		},

		method_utils_dialog_submitForm_signIn_clickHandler(): void {
			const isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_dialogFormLogin.input.email.value!;
				const password: string = this.data_dialogFormLogin.input.password.value!;

				this.data_dialogFormLogin.actions.btn.login.isLoading = true;
				this.storeFirebase
					.login_userAuth_withEmailAndPassword({ email, password })
					.then(() => {
						this.storeCommon.setSnackbar_success_state(
							"You have successfully logged into your account. Redirecting you to your account now."
						);
						setTimeout(() => {
							this.$router.replace({ name: CONST_OBJECT_TEXT_ROUTE_NAMES.account, hash: "#section-account" });
						}, this.computed_data_timeout_value);
					})
					.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
					.finally(() => {
						setTimeout(() => {
							this.storeCommon.setSnackbar_reset_state();
							this.data_dialogFormLogin.actions.btn.login.isLoading = false;
							this.resetFormInputs();
						}, this.computed_data_timeout_value);
					});
			}
		}
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();

		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
