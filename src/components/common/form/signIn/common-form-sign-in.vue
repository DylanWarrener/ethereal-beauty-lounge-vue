<template>
	<container-form @submit="method_event_signIn_clickHandler">
		<template #form-content>
			<v-text-field
				clearable
				variant="outlined"
				type="email"
				style="min-width: 150px; max-width: 300px"
				:rules="computed_validation_emailRules"
				v-model="computed_data_formInput_email_value_local"
			>
				<template #label>
					<span class="text-inverted" v-text="computed_text_formInput_email"></span>
				</template>
			</v-text-field>
			<!-- <div
					class="w-100 d-flex justify-end"
					@click="() => $emit('change', 'common-forgotten-password-container-component')"
				>
					<v-btn variant="flat">
						<template #default>
							<sub class="text-accent" v-text="computed_text_formInput_forgottenPassword"></sub>
						</template>
					</v-btn>
				</div> -->
			<v-text-field
				clearable
				variant="outlined"
				style="min-width: 150px; max-width: 300px"
				:append-inner-icon="
					computed_data_formInput_password_show_local ? computed_icon_showPassword : computed_icon_hidePassword
				"
				:type="computed_data_formInput_password_show_local ? 'text' : 'password'"
				:rules="computed_validation_passwordRules"
				v-model="computed_data_formInput_password_value_local"
				@click:appendInner="
					computed_data_formInput_password_show_local = !computed_data_formInput_password_show_local
				"
			>
				<template #label>
					<span class="text-inverted" v-text="computed_text_formInput_password"></span>
				</template>
			</v-text-field>
		</template>
	</container-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import { CONST_OBJECT_ICONS_FORM } from "@constants/common/objects/common-constants-objects";

export default defineComponent({
	name: "sign-in-container-component",
	data() {
		return {
			form: {
				inputs: {
					email: {
						label: "Email",
						value: "",
					},
					password: {
						label: "Password",
						value: "",
						show: false,
						icons: {
							show: CONST_OBJECT_ICONS_FORM.show,
							hide: CONST_OBJECT_ICONS_FORM.hide,
						},
					},
				},
				actions: {
					buttons: {
						forgottenPassword: {
							text: "Forgotten password",
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_formInput_email(): string {
			return this.form.inputs.email.label;
		},
		computed_text_formInput_forgottenPassword(): string {
			return this.form.actions.buttons.forgottenPassword.text;
		},
		computed_text_formInput_password(): string {
			return this.form.inputs.password.label;
		},

		computed_icon_showPassword(): string {
			return this.form.inputs.password.icons.show;
		},
		computed_icon_hidePassword(): string {
			return this.form.inputs.password.icons.hide;
		},

		computed_validation_emailRules(): any {
			return [this.method_validation_isNotEmpty, this.method_validation_isEmailFormatValid];
		},
		computed_validation_passwordRules(): any {
			return [
				this.method_validation_isNotEmpty,
				this.method_validation_isPasswordMinLength,
				this.method_validation_isCombination,
			];
		},

		computed_data_formInput_email_value_local: {
			get(): string {
				return this.form.inputs.email.value;
			},
			set(newValue: string): void {
				this.form.inputs.email.value = newValue;
			},
		},
		computed_data_formInput_password_value_local: {
			get(): string {
				return this.form.inputs.password.value;
			},
			set(newValue: string): void {
				this.form.inputs.password.value = newValue;
			},
		},
		computed_data_formInput_password_show_local: {
			get(): boolean {
				return this.form.inputs.password.show;
			},
			set(newValue: boolean) {
				this.form.inputs.password.show = newValue;
			},
		},
	},
	methods: {
		method_event_signIn_clickHandler(): void {},

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
		method_validation_isPasswordMinLength(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = newValue.length >= 12 || "At least 12 characters.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		method_validation_isCombination(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal =
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{6,}$/g.test(newValue) ||
					"Must contain a combination of uppercase, lowercase, numbers & symbols.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
	},
});
</script>
