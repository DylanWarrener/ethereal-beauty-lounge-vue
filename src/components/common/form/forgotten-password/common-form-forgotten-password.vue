<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12">
				<v-form
					class="d-flex flex-column align-center"
					validate-on="input lazy"
					v-model="data_forgottenPassword.valid"
					@submit.prevent="method_event_sendEmail_clickHandler"
				>
					<div
						class="w-100 d-flex justify-end"
						:style="computed_css_dynamicWidth"
						@click="() => $emit('change', 'common-recover-account-container-component')"
					>
						<v-btn variant="flat">
							<template v-slot:default>
								<sub
									class="text-accent"
									v-text="data_forgottenPassword.actions.links.forgottenEmail.text"
								></sub>
							</template>
						</v-btn>
					</div>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="computed_css_dynamicWidth"
						:rules="computed_data_emailValidationRules"
						v-model="data_forgottenPassword.input.email.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_forgottenPassword.input.email.label"></span>
						</template>
					</v-text-field>
					<v-btn
						height="60"
						class="mt-4 px-4 bg-accent"
						type="submit"
						size="large"
						:style="computed_css_dynamicWidth"
						:disabled="!computed_data_isFormValid"
						:text="data_forgottenPassword.actions.btn.send.text"
						@click=""
					></v-btn>
				</v-form>
			</v-col>
			<v-col class="d-flex flex-column justify-center align-center">
				<v-btn
					variant="flat"
					class="px-4"
					style="min-width: 100px"
					size="large"
					@click="() => $emit('change', 'common-login-container-component')"
				>
					<template #default>
						<small
							class="font-weight-bold text-inverted"
							v-text="data_forgottenPassword.actions.links.backToLogin.text"
						></small>
					</template>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

// Constants
import { CONST_OBJECT_TEXT_ROUTE_NAMES } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "forgotten-password-container-component",
	data() {
		return {
			data_forgottenPassword: {
				valid: false,
				input: {
					email: {
						label: "Email address",
						value: null,
					},
				},
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
			},
		};
	},
	computed: {
		computed_css_dynamicWidth(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},

		computed_data_isFormValid(): boolean {
			return this.data_forgottenPassword.valid;
		},
		computed_data_emailValidationRules(): any {
			return [this.method_validation_isNotEmpty, this.method_validation_isEmailFormatValid];
		},
		computed_data_timeout_value(): number {
			return this.storeCommon.getSnackbar_timeout_state;
		},
	},
	methods: {
		method_event_sendEmail_clickHandler(): void {
			const isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_forgottenPassword.input.email.value!;

				this.data_forgottenPassword.actions.btn.send.isLoading = true;
				this.storeFirebase
					.send_userAuth_passwordResetLink(email)
					.then(() => {
						this.storeCommon.setSnackbar_success_state("Successfully sent a password reset link to your email.");
						setTimeout(() => {
							this.$router.replace({ name: CONST_OBJECT_TEXT_ROUTE_NAMES.login, hash: "#section-login" });
						}, this.computed_data_timeout_value);
					})
					.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
					.finally(() => {
						setTimeout(() => {
							this.storeCommon.setSnackbar_reset_state();
							this.data_forgottenPassword.actions.btn.send.isLoading = false;
							this.method_utils_resetFormInputs();
						}, this.computed_data_timeout_value);
					});
			}
		},

		method_utils_resetFormInputs(): void {
			this.data_forgottenPassword.input.email.value = null;
		},

		method_validation_isNotEmpty(newValue: string): boolean | string {
			let retVal: boolean | string = false;
			// Checks for null & undefined
			if (newValue) {
				// Gets rid of whitespace
				let val = newValue.trim();

				// Checks the length
				retVal = val.length > 0 || "A value must be entered.";
			} else {
				retVal = "A value must be entered.";
			}
			return retVal;
		},
		method_validation_isEmailFormatValid(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = /^([^\s@]+@[^\s@]+\.[^\s@]+)$/g.test(newValue) || "Email must be valid.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
