<template>
	<container-dialog
		:toolbar-title="computed_data_dialog_signInCard_content_signInForm_toolbarTitle_state"
		@close="computed_data_appbar_btnSignIn_show_state = false"
		v-model="computed_data_appbar_btnSignIn_show_state"
	>
		<template #dialog-card-content>
			<v-expand-x-transition>
				<component :is="computed_data_dialog_signInCard_content_signInForm_selectedComponent_state"></component>
			</v-expand-x-transition>
		</template>
		<template #dialog-card-actions>
			<!-- Back to login -->
			<container-btn
				variant="flat"
				color="inverted"
				:text="computed_text_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_local"
				v-if="
					computed_data_dialog_signInCard_content_signInForm_selectedComponent_state ===
					'container-forgotten-password'
				"
				@click="method_event_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_clickHandler"
			></container-btn>

			<!-- Forgotten password -->
			<container-btn
				variant="flat"
				color="inverted"
				:text="computed_text_dialog_signInCard_actions_signInForm_btnForgottenPassword_local"
				v-if="computed_data_dialog_signInCard_content_signInForm_selectedComponent_state === 'container-sign-in'"
				@click="method_event_dialog_signInCard_actions_signInForm_btnForgottenPassword_clickHandler"
			></container-btn>

			<v-spacer></v-spacer>

			<!-- Sign in -->
			<container-btn
				variant="flat"
				type="submit"
				:text="computed_text_dialog_signInCard_actions_signInForm_btnSignIn_local"
				:disabled="!computed_data_dialog_signInCard_content_signInForm_valid_state"
				:loading="computed_data_dialog_signInCard_actions_signInForm_btnSignIn_isLoading_state"
				v-if="computed_data_dialog_signInCard_content_signInForm_selectedComponent_state === 'container-sign-in'"
				@click="method_event_dialog_signInCard_actions_signInForm_btnSignIn_clickHandler"
			></container-btn>

			<!-- Send text -->
			<container-btn
				variant="flat"
				type="submit"
				:text="computed_text_dialog_signInCard_actions_forgottenPasswordForm_btnSendText_local"
				:disabled="!computed_data_dialog_signInCard_content_signInForm_valid_state"
				:loading="computed_data_dialog_signInCard_actions_forgottenPasswordForm_btnSignText_isLoading_state"
				v-if="
					computed_data_dialog_signInCard_content_signInForm_selectedComponent_state ===
					'container-forgotten-password'
				"
				@click="method_event_dialog_signInCard_actions_forgottenPasswordForm_btnSendText_clickHandler"
			></container-btn>
		</template>
	</container-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import SignInComp from "@components/common/form/signIn/common-form-sign-in.vue";
import ForgottenPasswordComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";

// Constants
import { CONST_OBJECT_TEXT_PAGES } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "dialog-sign-in-container-component",
	components: {
		"container-sign-in": SignInComp,
		"container-forgotten-password": ForgottenPasswordComp,
	},
	data(): any {
		return {
			dialog: {
				signInCard: {
					actions: {
						buttons: {
							forgottenPassword: {
								text: "Forgotten password?",
								changeComponent: "container-forgotten-password",
							},
							signIn: {
								text: "Sign in",
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
								changeComponent: "container-sign-in",
							},
							sendText: {
								text: "Send text",
								isLoading: false,
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_dialog_signInCard_actions_signInForm_btnForgottenPassword_local(): string {
			return this.dialog.signInCard.actions.buttons.forgottenPassword.text;
		},
		computed_text_dialog_signInCard_actions_signInForm_btnSignIn_local(): string {
			return this.dialog.signInCard.actions.buttons.signIn.text;
		},
		computed_text_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_local(): string {
			return this.dialog.forgottenPasswordCard.actions.buttons.backToSignIn.text;
		},
		computed_text_dialog_signInCard_actions_forgottenPasswordForm_btnSendText_local(): string {
			return this.dialog.forgottenPasswordCard.actions.buttons.sendText.text;
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
				return this.dialog.signInCard.actions.buttons.signIn.isLoading;
			},
			set(newValue: boolean): void {
				this.dialog.signInCard.actions.buttons.signIn.isLoading = newValue;
			},
		},
		computed_data_dialog_signInCard_actions_forgottenPasswordForm_btnSignText_isLoading_state: {
			get(): boolean {
				return this.dialog.forgottenPasswordCard.actions.buttons.sendText.isLoading;
			},
			set(newValue: boolean): void {
				this.dialog.forgottenPasswordCard.actions.buttons.sendText.isLoading = newValue;
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
		computed_data_dialog_signInCard_content_signInForm_toolbarTitle_state: {
			get(): string {
				return this.storeHeader.get_dialog_signInCard_toolbarTitle_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signInCard_toolbarTitle_state(newValue);
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
	},
	methods: {
		method_event_dialog_setSignInselectedComponent(selectedComponent: string): void {
			this.computed_data_dialog_signInCard_content_signInForm_selectedComponent_state = selectedComponent;
		},
		method_event_dialog_signInCard_actions_signInForm_btnForgottenPassword_clickHandler(): void {
			this.method_event_dialog_setSignInselectedComponent("container-forgotten-password");
		},
		method_event_dialog_signInCard_actions_forgottenPasswordForm_btnBackToLogin_clickHandler(): void {
			this.method_event_dialog_setSignInselectedComponent("container-sign-in");
		},
		method_event_dialog_signInCard_actions_signInForm_btnSignIn_clickHandler(): void {
			debugger;
			const isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_dialogFormLogin.input.email.value!;
				const password: string = this.data_dialogFormLogin.input.password.value!;

				this.data_dialogFormLogin.actions.btn.login.isLoading = true;
				this.storeFirebase
					.login_userAuth_withEmailAndPassword({ email, password })
					.then(() => {
						debugger;
						this.storeCommon.setSnackbar_success_state(
							"You have successfully logged into your account. Redirecting you to your account now."
						);
						setTimeout(() => {
							this.$router.replace({ name: CONST_OBJECT_TEXT_PAGES.account, hash: "#section-account" });
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
		},
		method_event_dialog_signInCard_actions_forgottenPasswordForm_btnSendText_clickHandler(): void {
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
