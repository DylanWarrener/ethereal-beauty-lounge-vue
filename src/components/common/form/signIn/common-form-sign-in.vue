<template>
	<container-form v-model="computed_data_dialog_signInCard_content_signInForm_valid_state">
		<template #form-content>
			<v-row dense class="d-flex flex-wrap">
				<!-- First name field -->
				<v-col cols="12" class="d-flex flex-column">
					<container-text-field
						variant="outlined"
						base-color="default"
						bg-color="rgba(var(--v-theme-inverted), 0.5)"
						color="default"
						label-class="default"
						type="email"
						:label="computed_data_dialog_signInCard_content_signInForm_emailInput_label_local"
						:rules="computed_validation_emailRules"
						v-model="computed_data_dialog_signInCard_content_signInForm_emailInput_value_state"
					></container-text-field>
				</v-col>

				<!-- Last name field -->
				<v-col cols="12" class="d-flex flex-column">
					<container-text-field
						variant="outlined"
						base-color="default"
						bg-color="rgba(var(--v-theme-inverted), 0.5)"
						color="default"
						label-class="default"
						append-inner-icon-color="default"
						:type="computed_data_dialog_signInCard_content_signInForm_passwordInput_type_local"
						:label="computed_data_dialog_signInCard_content_signInForm_passwordInput_label_local"
						:append-inner-icon="computed_icon_dialog_signInCard_content_signInForm_passwordInput_appendInner_local"
						:rules="computed_validation_passwordRules"
						v-model="computed_data_dialog_signInCard_content_signInForm_passwordInput_value_state"
						@append-inner-click="
							computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state =
							!computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state
						"
					></container-text-field>
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
	name: "sign-in-container-component",
	data() {
		return {
			form: {
				content: {
					forms: {
						signIn: {
							inputs: {
								email: {
									label: "Email address",
								},
								password: {
									label: "Password"
								},
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_icon_dialog_signInCard_content_signInForm_passwordInput_show_state(): string {
			return this.storeCommon.get_form_default_input_password_icon_show_state;
		},
		computed_icon_dialog_signInCard_content_signInForm_passwordInput_hide_state(): string {
			return this.storeCommon.get_form_default_input_password_icon_hide_state;
		},
		computed_icon_dialog_signInCard_content_signInForm_passwordInput_appendInner_local(): string {
			return this.computed_data_dialog_signInCard_content_signInForm_passwordInput_value_state 
				? this.computed_icon_dialog_signInCard_content_signInForm_passwordInput_show_state 
				: this.computed_icon_dialog_signInCard_content_signInForm_passwordInput_hide_state;
		},
		
		computed_validation_emailRules(): any {
			return [this.method_validation_isEmailFormatValid];
		},
		computed_validation_passwordRules(): any {
			return [
				this.method_validation_isPasswordMinLength,
				this.method_validation_isCombination,
			];
		},

		computed_data_dialog_signInCard_content_signInForm_emailInput_label_local(): string {
			return this.form.content.forms.signIn.inputs.email.label;
		},
		computed_data_dialog_signInCard_content_signInForm_passwordInput_label_local(): string {
			return this.form.content.forms.signIn.inputs.password.label;
		},
		computed_data_dialog_signInCard_content_signInForm_passwordInput_type_local(): string {
			return this.computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state ? 'text' : 'password';
		},
		computed_data_dialog_signInCard_content_signInForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_valid_stateget_dialog_signInCard_content_signInForm_valid_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signInCard_content_signInForm_valid_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_signInForm_emailInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_emailInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signInCard_content_signInForm_emailInput_value_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_signInForm_passwordInput_value_state: {
			get(): string {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_passwordInput_value_state;
			},
			set(newValue: string): void {
				this.storeHeader.set_dialog_signInCard_content_signInForm_passwordInput_value_state(newValue);
			},
		},
		computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_passwordInput_show_state;
			},
			set(newValue: boolean): void {
				this.storeHeader.set_dialog_signInCard_content_signInForm_passwordInput_show_state(newValue);
			},
		},
	},
	methods: {
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
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeHeader = useHeaderStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon, storeHeader };
	}
});
</script>
