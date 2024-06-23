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
			<component
				:is="computed_data_dialog_signIn_selectedComponent_local"
				@is-form-valid="(validity: boolean) => computed_data_dialog_signIn_isSubmitDisabled_local = validity"
			></component>
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
				type="submit"
				:text="computed_text_dialog_btnSubmitForm_local"
				:disabled="!computed_data_dialog_signIn_isSubmitDisabled_local"
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
			<component
				:is="computed_data_dialog_signUp_selectedComponent_local"
				@is-form-valid="(validity: boolean) => computed_data_dialog_signIn_isSubmitDisabled_local = validity"
			></component>
		</template>
		<template #dialog-card-actions>
			<v-spacer></v-spacer>
			<container-btn
				variant="flat"
				type="submit"
				:text="computed_text_dialog_btnSubmitForm_local"
				:disabled="!computed_data_dialog_signIn_isSubmitDisabled_local"
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
import { CONST_OBJECT_TEXT_ROUTE_NAMES } from "@constants/common/objects/common-constants-objects.js";

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
			header: {},
		};
	},
	computed: {
		computed_text_appBar_btnHome_state(): string {
			return this.storeHeader.;
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
		computed_text_dialog_btnForgottenPassword_local(): string {
			return this.header.dialog.signInCard.actions.buttons.forgottenPassword.text;
		},
		computed_text_dialog_btnSubmitForm_local(): string {
			return this.header.dialog.commonActions.buttons.submit.text;
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

		computed_data_timeout_state(): number {
			return this.storeCommon.getSnackbar_timeout_state;
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

		computed_text_dialog_signIn_toolbarTitle_local: {
			get(): string {
				return this.header.dialog.signInCard.toolbar.title;
			},
			set(newValue: string): void {
				this.header.dialog.signInCard.toolbar.title = newValue;
			},
		},
		computed_text_dialog_signUp_toolbarTitle_local: {
			get(): string {
				return this.header.dialog.signUpCard.toolbar.title;
			},
			set(newValue: string): void {
				this.header.dialog.signUpCard.toolbar.title = newValue;
			},
		},

		computed_data_dialog_signIn_selectedComponent_local: {
			get(): string {
				return this.header.dialog.signInCard.content.signInSelectedComponent;
			},
			set(newValue: string): void {
				this.header.dialog.signInCard.content.signInSelectedComponent = newValue;
			},
		},
		computed_data_dialog_signIn_isSubmitDisabled_local: {
			get(): boolean {
				return this.header.dialog.commonActions.buttons.submit.disabled;
			},
			set(newValue: boolean): void {
				this.header.dialog.commonActions.buttons.submit.disabled = newValue;
			},
		},
		computed_data_dialog_signIn_isSubmitLoading_local: {
			get(): boolean {
				return this.header.dialog.commonActions.buttons.submit.isLoading;
			},
			set(newValue: boolean): void {
				this.header.dialog.commonActions.buttons.submit.isLoading = newValue;
			},
		},
		computed_data_dialog_signUp_selectedComponent_local: {
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
		computed_data_dialog_formInput_email_state: {
			get(): string {
				return this.storeHeader.get_dialog_signIn_email_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signIn_email_state(newValue);
			},
		},
		computed_data_dialog_formInput_password_state: {
			get(): string {
				return this.storeHeader.get_dialog_signIn_password_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signIn_password_state(newValue);
			},
		},
	},
	methods: {
		mergeProps,
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
		},
		method_event_dialog_setSignInselectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signIn_selectedComponent_local = selectedComponent;
		},
		method_event_dialog_setSignUpSelectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signUp_selectedComponent_local = selectedComponent;
		},
		method_event_dialog_forgottenPassword_clickHandler(): void {
			this.method_event_dialog_setSignInselectedComponent("container-forgotten-password");
			this.computed_text_dialog_signIn_toolbarTitle_local = "Forgotten password";
		},
		method_event_dialog_submitForm_clickHandler(): void {
			const signInDialog_show: boolean = this.computed_data_appBar_btnSignIn_show_state;
			const signUpDialog_show: boolean = this.computed_data_appBar_btnSignUp_show_state;

			/*
			actions: {
						links: {
							forgottenEmail: {
								text: "Forgot your email address?",
							},
							backToLogin: {
								text: "Back to login?",
							},
						},
						btn: {
							send: {
								text: "Send email",
								isLoading: false,
							},
						},
					},
			*/
			if (signInDialog_show && !signUpDialog_show) {
				switch (this.computed_data_dialog_signIn_selectedComponent_local) {
					case "container-sign-in":
						this.method_utils_dialog_submitForm_signIn_clickHandler();
						break;
					case "container-forgotten-password":
						this.method_utils_dialog_submitForm_forgottenPassword_clickHandler();
						break;
				}
			} else {
				switch (this.computed_data_dialog_signIn_selectedComponent_local) {
					case "container-sign-up":
						this.method_utils_dialog_submitForm_signUp_clickHandler();
						break;
				}
			}
		},

		method_utils_dialog_submitForm_signIn_clickHandler(): void {
			const isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.computed_data_dialog_formInput_email_state;
				const password: string = this.computed_data_dialog_formInput_password_state;

				this.computed_data_dialog_signIn_isSubmitLoading_local = true;
				this.storeFirebase
					.login_userAuth_withEmailAndPassword({ email, password })
					.then(() => {
						this.storeCommon.setSnackbar_success_state(
							"You have successfully logged into your account. Redirecting you to your account now."
						);
						setTimeout(() => {
							this.$router.replace({ name: CONST_OBJECT_TEXT_ROUTE_NAMES.account, hash: "#section-account" });
						}, this.computed_data_timeout_state);
					})
					.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
					.finally(() => {
						setTimeout(() => {
							this.storeCommon.setSnackbar_reset_state();
							this.computed_data_dialog_signIn_isSubmitLoading_local = false;
							this.resetFormInputs();
						}, this.computed_data_timeout_state);
					});
			}
		},
		method_utils_dialog_submitForm_forgottenPassword_clickHandler(): void {
			debugger;
			//* Add functionality for submit form, when on the forgotten password component.
		},
		method_utils_dialog_submitForm_signUp_clickHandler(): void {
			debugger;
			//* Add functionality for submit form, when on the forgotten password component.
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();

		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
