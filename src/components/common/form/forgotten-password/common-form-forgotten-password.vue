<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12">
				<v-form
					class="d-flex flex-column align-center"
					validate-on="input lazy"
					v-model="data_dialogFormForgottenPassword.valid"
					@submit.prevent="sendEmail_handler"
				>
					<div
						class="w-100 d-flex justify-end"
						:style="dynamicWidth_dialogFormInput"
						@click="emit_handler('common-recover-account-container-component')"
					>
						<v-btn variant="flat">
							<template v-slot:default>
								<sub
									class="text-accent"
									v-text="data_dialogFormForgottenPassword.actions.links.forgottenEmail.text"
								></sub>
							</template>
						</v-btn>
					</div>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="data_emailValidationRules"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormForgottenPassword.input.email.label"></span>
						</template>
					</v-text-field>
					<v-btn
						height="60"
						class="mt-4 px-8 bg-accent"
						type="submit"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_isFormValid"
						:text="data_dialogFormForgottenPassword.actions.btn.send.text"
					></v-btn>
				</v-form>
			</v-col>
			<v-col class="d-flex flex-column justify-center align-center">
				<v-btn variant="flat" @click="emit_handler('common-login-container-component')">
					<template v-slot:default>
						<small
							class="font-weight-bold text-inverted"
							v-text="data_dialogFormForgottenPassword.actions.links.backToLogin.text"
						></small>
					</template>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "forgotten-password-container-component",
	data() {
		return {
			data_dialogFormForgottenPassword: {
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
						},
					},
				},
			},
		};
	},
	computed: {
		/* CSS */
		dynamicWidth_dialogFormInput(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},

		/* Data */
		data_isFormValid(): boolean {
			return this.data_dialogFormForgottenPassword.valid;
		},
		data_emailValidationRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
	},
	methods: {
		/* Events */
		sendEmail_handler(): void {
			const isFormValid: boolean = this.data_isFormValid;

			if (isFormValid) {
			}
		},
		// Emit
		emit_handler(value: string): void {
			this.$emit("change", value);
		},

		/* Validation */
		isNotEmpty(newValue: string): boolean | string {
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
		isEmailFormatValid(newValue: string): boolean | string {
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
});
</script>
