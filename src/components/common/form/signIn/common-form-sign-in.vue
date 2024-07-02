<template>
	<container-form v-model="computed_data_dialog_signInCard_content_signInForm_valid_state">
		<template #form-content>
			<v-row dense>
				<!-- First name field -->
				<v-col class="d-flex flex-column">
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						class="w-100 align-self-center"
						style="min-width: 150px; max-width: 500px"
						:rules="computed_validation_emailRules"
						v-model="computed_data_dialog_signInCard_content_signInForm_emailInput_value_state"
					>
						<template #label>
							<span
								class="text-inverted"
								v-text="computed_data_dialog_signInCard_content_signInForm_emailInput_label_local"
							></span>
						</template>
					</v-text-field>
				</v-col>

				<!-- Last name field -->
				<v-col class="d-flex flex-column">
					<v-text-field
						clearable
						variant="outlined"
						class="w-100 align-self-center"
						style="min-width: 150px; max-width: 500px"
						:append-inner-icon="
							computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state
								? computed_icon_showPassword_local
								: computed_icon_hidePassword_local
						"
						:type="
							computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state ? 'text' : 'password'
						"
						:rules="computed_validation_passwordRules"
						v-model="computed_data_dialog_signInCard_content_signInForm_passwordInput_value_state"
						@click:appendInner="
							computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state =
								!computed_data_dialog_signInCard_content_signInForm_passwordInput_show_state
						"
					>
						<template #label>
							<span
								class="text-inverted"
								v-text="computed_data_dialog_signInCard_content_signInForm_passwordInput_label_local"
							></span>
						</template>
					</v-text-field>
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

// Constants
import { CONST_OBJECT_ICONS_FORM } from "@constants/common/objects/common-constants-objects.js";

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
									label: "Password",
									icons: {
										show: CONST_OBJECT_ICONS_FORM.show,
										hide: CONST_OBJECT_ICONS_FORM.hide,
									},
								},
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_data_dialog_signInCard_content_signInForm_emailInput_label_local(): string {
			return this.form.content.forms.signIn.inputs.email.label;
		},
		computed_data_dialog_signInCard_content_signInForm_passwordInput_label_local(): string {
			return this.form.content.forms.signIn.inputs.password.label;
		},

		computed_icon_showPassword_local(): string {
			return this.form.content.forms.signIn.inputs.password.icons.show;
		},
		computed_icon_hidePassword_local(): string {
			return this.form.content.forms.signIn.inputs.password.icons.hide;
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

		computed_data_dialog_signInCard_content_signInForm_valid_state: {
			get(): boolean {
				return this.storeHeader.get_dialog_signInCard_content_signInForm_valid_state;
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
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeHeader = useHeaderStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon, storeHeader };
	},
});
</script>
