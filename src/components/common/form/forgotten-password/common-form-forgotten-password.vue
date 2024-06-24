<template>
	<container-form v-model="computed_data_dialog_signInCard_content_forgottenPasswordForm_valid_state">
		<template #form-content>
			<v-row dense>
				<v-col class="d-flex flex-column">
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						class="w-100 align-self-center"
						style="min-width: 150px; max-width: 300px"
						:rules="computed_data_emailValidationRules"
						v-model="computed_data_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state"
					>
						<template #label>
							<span class="text-inverted" v-text="computed_text_formInput_email_label_local"></span>
						</template>
					</v-text-field>
					<!-- <v-form
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
					</v-form> -->
				</v-col>
			</v-row>
		</template>
	</container-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";
import useFirebaseStore from "@stores/store-firebase.js";

export default defineComponent({
	name: "forgotten-password-container-component",
	data() {
		return {
			form: {
				valid: false,
				inputs: {
					email: {
						label: "Email address",
					},
				},
			},
		};
	},
	computed: {
		computed_text_formInput_email_label_local(): string {
			return this.form.inputs.email.label;
		},

		computed_data_emailValidationRules(): any {
			return [this.method_validation_isNotEmpty, this.method_validation_isEmailFormatValid];
		},
		computed_data_timeout_value(): number {
			return this.storeCommon.getSnackbar_timeout_state;
		},
		computed_data_dialog_signInCard_content_forgottenPasswordForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_forgottenPasswordForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signInCard_content_forgottenPasswordForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_forgottenPasswordForm_isLoading_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_commonForm_cardActions_btnSubmit_isLoading_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_commonForm_cardActions_btnSubmit_isLoading_state(newValue);
			},
		},
	},
	methods: {
		method_event_sendEmail_clickHandler(): void {
			const isFormValid: boolean = this.computed_data_dialog_signInCard_content_forgottenPasswordForm_valid_state;

			if (isFormValid) {
				const email: string =
					this.computed_data_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state;

				this.computed_data_dialog_signInCard_content_forgottenPasswordForm_isLoading_state = true;
				this.storeFirebase
					.send_userAuth_passwordResetLink(email)
					.then(() => {
						this.storeCommon.setSnackbar_success_state("Successfully sent a password reset link to your email.");
						//* Navigate user back to login dialog
					})
					.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
					.finally(() => {
						setTimeout(() => {
							this.storeCommon.setSnackbar_reset_state();
							this.computed_data_dialog_signInCard_content_forgottenPasswordForm_isLoading_state = false;
							this.method_utils_resetFormInputs();
						}, this.computed_data_timeout_value);
					});
			}
		},

		method_utils_resetFormInputs(): void {
			this.computed_data_dialog_signInCard_content_forgottenPasswordForm_emailInput_value_state = "";
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
		const storeHeader = useHeaderStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
