<template>
	<v-app-bar flat scroll-behavior="hide" color="white" class="px-2" style="border: 2px solid black">
		<!-- APP BAR LEFT -->
		<container-card hover exact
			elevation="0"
			variant="flat"
			color="transparent"
			card-class="d-none d-md-flex"
			min-width="150"
			height="100%"
			:to="computed_link_appBar_btnHome_local"
			v-ripple="{ class: 'text-accent' }"
		>
			<template #card-img>
				<v-img :src="computed_image_appBar_btnHome_local" width="100%" height="100%"></v-img>
			</template>
		</container-card>
		
		<v-divider vertical inset class="mx-2 d-none d-md-flex"></v-divider>

		<v-hover>
			<template #default="{ isHovering, props: hoverProps }">
				<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnMobileMenu_local">
					<template #activator="{ props: tooltipProps }">
						<container-btn
							varient="flat"
							class="d-flex d-md-none"
							:class="isHovering ? 'bg-accent' : ''"
							:text-class="isHovering ? 'text-default' : 'text-inverted'"
							:icon="computed_icon_appBar_btnMobileMenu_local"
							v-bind="mergeProps(hoverProps, tooltipProps)"
							@click="computed_data_appbar_btnMobileMenu_show_state = !computed_data_appbar_btnMobileMenu_show_state"
						></container-btn>
					</template>
				</v-tooltip>
			</template>
		</v-hover>

		<!-- APP BAR MIDDLE - Text navs -->
		<div class="ga-2 d-flex">
			<!-- <container-btn
				class="d-none d-md-flex"
				:text="computed_text_appBar_btnHome_local"
				:to="computed_link_appBar_btnHome_local"
			></container-btn> -->
			<v-hover>
				<template #default="{ isHovering, props }">
					<container-btn
						class="d-none d-md-flex"
						:class="isHovering ? 'bg-accent' : ''"
						:text-class="isHovering ? 'text-default' : 'text-inverted'"
						:text="computed_text_appBar_btnTreatments_local"
						:to="computed_link_appBar_btnTreatments_local"
						v-bind="props"
					></container-btn>
				</template>
			</v-hover>
			<v-hover>
				<template #default="{ isHovering, props }">
					<container-btn
						class="d-none d-md-flex"
						:class="isHovering ? 'bg-accent' : ''"
						:text-class="isHovering ? 'text-default' : 'text-inverted'"
						:text="computed_text_appBar_btnStore_local"
						:to="computed_link_appBar_btnStore_local"
						v-bind="props"
					></container-btn>
				</template>
			</v-hover>
			<container-menu>
				<template #menu-btn="{ props: menuProps }">
					<v-hover>
						<template #default="{ isHovering, props: hoverProps }">
							<container-btn
								class="d-none d-md-flex"
								:class="isHovering ? 'bg-accent' : ''"
								:text-class="isHovering ? 'text-default' : 'text-inverted'"
								:text="computed_text_appBar_btnInformation_local"
								:icon-append="computed_icon_appBar_btnInformation_menuDown_local"
								:icon-append-class="isHovering ? 'text-default' : 'text-inverted'"
								v-bind="mergeProps(menuProps, hoverProps)"
							></container-btn>
						</template>
					</v-hover>
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
		</div>
		<v-spacer></v-spacer>

		<v-divider vertical inset class="mx-2 d-none d-md-flex"></v-divider>

		<!-- APP BAR RIGHT - Icon navs -->
		<container-menu>
			<template #menu-btn="{ props: menuProps }">
				<v-hover>
					<template #default="{ isHovering, props: hoverProps }">
						<v-tooltip location="bottom" :text="computed_tooltip_appBar_btnBasket_local">
							<template #activator="{ props: tooltipProps }">
								<container-btn
									class="mr-2"
									:icon-class="isHovering ? 'text-default' : 'text-inverted'"
									:icon="computed_icon_appBar_btnBasket_local"
									:class="isHovering ? 'bg-accent' : ''"
									v-bind="mergeProps(menuProps, hoverProps, tooltipProps)"
									@click="computed_data_appbar_btnBasket_show_state = !computed_data_appbar_btnBasket_show_state"
								></container-btn>
							</template>
						</v-tooltip>
					</template>
				</v-hover>
			</template>
			<template #menu-items>
				<v-list nav variant="text" bg-color="accent" base-color="white" color="black">
					<v-list-item class="text-inverted text-uppercase">
						<span class="text-uppercase">Not sure yet...</span>
					</v-list-item>
				</v-list>
			</template>
		</container-menu>
		<!-- Sign In -->
		<container-btn
			variant="outlined"
			class="mr-2 d-none d-md-flex"
			text-class="text-inverted"
			:text="computed_text_appBar_btnSignIn_local"
			v-if="!computed_data_user_isLoggedIn_state"
			@click="computed_data_appbar_btnSignIn_show_state = !computed_data_appbar_btnSignIn_show_state"
		></container-btn>
		<v-hover>
			<template #default="{ isHovering, props }">
				<container-btn
					class="mr-2 d-md-none"
					:icon-class="isHovering ? 'text-default' : 'text-inverted'"
					:icon="computed_icon_appBar_btnSignIn_local"
					:class="isHovering ? 'bg-accent' : ''"
					v-if="!computed_data_user_isLoggedIn_state"
					v-bind="props"
					@click="computed_data_appbar_btnSignIn_show_state = !computed_data_appbar_btnSignIn_show_state"
				></container-btn>
			</template>
		</v-hover>
		<!-- Sign Up -->
		<container-btn
			variant="flat"
			class="d-none d-md-flex"
			color="accent"
			:text="computed_text_appBar_btnSignUp_local"
			v-if="!computed_data_user_isLoggedIn_state"
			@click="computed_data_appbar_btnSignUp_show_state = !computed_data_appbar_btnSignUp_show_state"
		></container-btn>
		<v-hover>
			<template #default="{ isHovering, props }">
				<container-btn
					class="mr-2 d-md-none"
					:icon-class="isHovering ? 'text-default' : 'text-inverted'"
					:icon="computed_icon_appBar_btnSignUp_local"
					:class="isHovering ? 'bg-accent' : ''"
					v-if="!computed_data_user_isLoggedIn_state"
					v-bind="props"
					@click="computed_data_appbar_btnSignUp_show_state = !computed_data_appbar_btnSignUp_show_state"
				></container-btn>
			</template>
		</v-hover>
	</v-app-bar>

	<!-- Dialogs -->
	<container-sign-in-dialog></container-sign-in-dialog>
	<container-sign-up-dialog></container-sign-up-dialog>

	<!-- Mobile navigation-->
	<container-navigation
		location="bottom"
		:navigation="computed_data_navigation_mobileMenu_state"
		v-model="computed_data_appbar_btnMobileMenu_show_state"
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
	CONST_OBJECT_TEXT_PAGES,
	CONST_OBJECT_TEXT_APPBAR,
	CONST_OBJECT_LINKS_APPBAR,
	CONST_OBJECT_TOOLTIPS_APPBAR,
} from "@constants/common/objects/common-constants-objects.js";

// IMGs
import Logo from "@assets/png/logo/logo.png";

// Icons
import { mdiMenu, mdiBasket, mdiAccount, mdiMenuDown, mdiMenuUp, mdiLogin, mdiLogout } from "@mdi/js";

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
								icon: mdiMenu,
							},
							basket: {
								tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.basket,
								icon: mdiBasket,
							},
							account: {
								tooltip: CONST_OBJECT_TOOLTIPS_APPBAR.account,
								icon: mdiAccount,
								link: CONST_OBJECT_LINKS_APPBAR.account,
							},
							signIn: {
								icon: mdiLogin,
								tooltip: ""
							},
							signUp: {
								icon: mdiLogout,
								tooltip: ""
							},
						},
						text: {
							home: {
								text: CONST_OBJECT_TEXT_APPBAR.home,
								link: CONST_OBJECT_LINKS_APPBAR.home,
							},
							treatments: {
								text: CONST_OBJECT_TEXT_APPBAR.treatments,
								link: CONST_OBJECT_LINKS_APPBAR.treatments,
							},
							store: {
								text: CONST_OBJECT_TEXT_APPBAR.store,
								link: CONST_OBJECT_LINKS_APPBAR.store,
							},
							information: {
								text: CONST_OBJECT_TEXT_APPBAR.information,
								icons: {
									menuUp: mdiMenuUp,
									menuDown: mdiMenuDown,
								},
							},
							contact: {
								text: CONST_OBJECT_TEXT_APPBAR.contact,
								link: CONST_OBJECT_LINKS_APPBAR.contact,
							},
							reviews: {
								text: CONST_OBJECT_TEXT_APPBAR.reviews,
								link: CONST_OBJECT_LINKS_APPBAR.reviews,
							},
							about: {
								text: CONST_OBJECT_TEXT_APPBAR.about,
								link: CONST_OBJECT_LINKS_APPBAR.about,
							},
							signIn: {
								text: CONST_OBJECT_TEXT_APPBAR.signIn,
							},
							signUp: {
								text: CONST_OBJECT_TEXT_APPBAR.signUp,
							},
						},
					},
				},
				dialog: {
					signInCard: {
						actions: {
							buttons: {
								signIn: {
									text: "Sign in",
									isLoading: false,
								},
								forgottenPassword: {
									text: "Forgotten password?",
									isLoading: false,
								},
							},
						},
					},
					forgottenPasswordCard: {
						actions: {
							buttons: {
								backToSignIn: {
									text: "Back to sign in",
								},
							},
						},
					},
					signUpCard: {
						actions: {
							buttons: {
								signUp: {
									text: "Sign up",
									isLoading: false,
								},
							},
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
		computed_text_dialog_signInCard_actions_signInForm_btnForgottenPassword_local(): string {
			return this.header.dialog.signInCard.actions.buttons.forgottenPassword.text;
		},
		computed_text_dialog_signInCard_actions_signInForm_btnSignIn_local(): string {
			return this.header.dialog.signInCard.actions.buttons.signIn.text;
		},
		computed_text_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_local(): string {
			return this.header.dialog.forgottenPasswordCard.actions.buttons.backToSignIn.text;
		},
		computed_text_dialog_signUpCard_actions_signUpForm_btnSignUp_local(): string {
			return this.header.dialog.signUpCard.actions.buttons.signUp.text;
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

		computed_image_appBar_btnHome_local(): string {
			return Logo;
		},

		computed_icon_appBar_btnMobileMenu_local(): string {
			return this.header.appbar.buttons.icons.mobileMenu.icon;
		},
		computed_icon_appBar_btnInformation_menuUp_local(): string {
			return this.header.appbar.buttons.text.information.icons.menuUp;
		},
		computed_icon_appBar_btnInformation_menuDown_local(): string {
			return this.header.appbar.buttons.text.information.icons.menuDown;
		},
		computed_icon_appBar_btnBasket_local(): string {
			return this.header.appbar.buttons.icons.basket.icon;
		},
		computed_icon_appBar_btnAccount_local(): string {
			return this.header.appbar.buttons.icons.account.icon;
		},
		computed_icon_appBar_btnSignIn_local(): string {
			return this.header.appbar.buttons.icons.signIn.icon;
		},
		computed_icon_appBar_btnSignUp_local(): string {
			return this.header.appbar.buttons.icons.signUp.icon;
		},

		computed_data_dialog_signInForm_formComponents_state(): string[] {
			return this.storeHeader.get_dialog_signInCard_content_formComponents_state;
		},
		computed_data_dialog_signUpForm_formComponents_state(): string[] {
			return this.storeHeader.get_dialog_signUpCard_content_formComponents_state;
		},
		computed_data_navigation_mobileMenu_state(): any[] {
			return this.storeHeader.get_navigation_mobileMenu_state;
		},
		computed_data_navigation_pcMenu_state(): any[] {
			return this.storeHeader.get_navigation_pcMenu_state;
		},
		computed_data_user_isLoggedIn_state(): boolean {
			return this.storeHeader.get_userAuth_isLoggedIn_state;
		},
		computed_data_appbar_btnMobileMenu_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_btnIconMobileMenu_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_btnIconMobileMenu_show_state(newValue);
			},
		},
		computed_data_appbar_btnBasket_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_btnIconBasket_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_btnIconBasket_show_state(newValue);
			},
		},
		computed_data_appbar_btnSignIn_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_btnTextSignIn_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_btnTextSignIn_show_state(newValue);
			},
		},
		computed_data_appbar_btnSignUp_show_state: {
			get(): boolean {
				return this.storeHeader.get_appBar_btnTextSignUp_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_appBar_btnTextSignUp_show_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_signInForm_selectedComponent_state: {
			get(): string {
				return this.storeHeader.get_dialog_signInCard_content_selectedComponent_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signInCard_content_selectedComponent_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_signInForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signInCard_content_signInForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signInCard_actions_signInForm_btnSignIn_isLoading_state: {
			get(): boolean {
				return this.header.dialog.signInCard.actions.buttons.signIn.isLoading;
			},
			set(newValue: boolean): void {
				this.header.dialog.signInCard.actions.buttons.signIn.isLoading = newValue;
			},
		},
		computed_data_dialog_signInCard_content_forgottenPasswordForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_forgottenPasswordForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signInCard_content_forgottenPasswordForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_toolbarTitle_state: {
			get(): string {
				return this.storeHeader.get_dialog_signUpCard_toolbarTitle_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signUpCard_toolbarTitle_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_selectedComponent_state: {
			get(): string {
				return this.storeHeader.get_dialog_signUpCard_content_selectedComponent_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signUpCard_content_selectedComponent_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signUpCard_content_signUpForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signUpCard_content_signUpForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_btnSignUp_isLoading_state: {
			get(): boolean {
				return this.header.dialog.signUpCard.actions.buttons.signUp.isLoading;
			},
			set(newValue: boolean): void {
				this.header.dialog.signUpCard.actions.buttons.signUp.isLoading = newValue;
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_emailInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signUpCard_content_signUpForm_emailInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signUpCard_content_signUpForm_emailInput_value_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_signUpForm_passwordInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signUpCard_content_signUpForm_passwordInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signUpCard_content_signUpForm_passwordInput_value_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_forgottenPasswordForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signUpCard_content_forgottenPasswordForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signUpCard_content_forgottenPasswordForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signUpCard_content_forgottenPasswordForm_emailInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signUpCard_content_forgottenPasswordForm_emailInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signUpCard_content_forgottenPasswordForm_emailInput_value_state(newValue);
			},
		},
	},
	methods: {
		mergeProps,
		method_event_logout(): void {
			this.storeFirebase.logout_userAuth();
		},
		method_event_dialog_setSignInselectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signInCard_content_signInForm_selectedComponent_state = selectedComponent;
		},
		method_event_dialog_setSignUpSelectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signUpCard_content_signUpForm_selectedComponent_state = selectedComponent;
		},
		method_event_dialog_signInCard_actions_signInForm_btnForgottenPassword_clickHandler(): void {
			this.method_event_dialog_setSignInselectedComponent("container-forgotten-password");
			this.computed_data_dialog_signInCard_content_signInForm_toolbarTitle_state = "Forgotten password";
		},
		method_event_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_clickHandler(): void {
			this.method_event_dialog_setSignInselectedComponent("container-sign-in");
			this.computed_data_dialog_signInCard_content_signInForm_toolbarTitle_state = "Sign in";
		},
		//method_event_dialog_signInCard_actions_signInForm_btnBackToLogin_clickHandler
		method_event_dialog_signInCard_actions_signInForm_btnSignIn_clickHandler(): void {
			debugger;
		},
		method_event_dialog_signUpCard_actions_signUpForm_btnSignUp_clickHandler(): void {
			debugger;
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
