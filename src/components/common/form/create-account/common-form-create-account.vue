<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted" v-text="data_dialogFormCreateAccount.information"></p>
			</v-col>
			<v-col cols="12" style="border: 2px solid blue">
				<v-form class="d-flex flex-column align-center" style="border: 2px solid green" v-model="data_dialogFormCreateAccount.valid">
					<v-text-field
						clearable
						variant="outlined"
						type="text"
						:style="dynamicWidth_dialogFormInput"
						:rules="[isNotEmpty, isNameMinLength]"
						v-model="data_dialogFormCreateAccount.input.firstName.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.firstName.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						variant="outlined"
						type="text"
						:style="dynamicWidth_dialogFormInput"
						:rules="[isNotEmpty, isNameMinLength]"
						v-model="data_dialogFormCreateAccount.input.lastName.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.lastName.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="[isNotEmpty, isEmailValid]"
						v-model="data_dialogFormCreateAccount.input.email.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.email.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_password"
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:type="data_dialogFormCreateAccount.input.password.show ? 'text' : 'password'"
						:rules="[isNotEmpty, isPasswordMinLength, isCombination]"
						v-model="data_dialogFormCreateAccount.input.password.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.password.label"></span>
						</template>
						<template #append-inner>
							<v-icon
								:icon="
									data_dialogFormCreateAccount.input.password.show
										? data_dialogFormCreateAccount.input.password.icon.show
										: data_dialogFormCreateAccount.input.password.icon.hide
								"
								@click.stop="data_dialogFormCreateAccount.input.password.show = !data_dialogFormCreateAccount.input.password.show"
							></v-icon>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:type="data_dialogFormCreateAccount.input.repeatPassword.show ? 'text' : 'password'"
						:rules="[isNotEmpty, isPasswordMinLength, isCombination, arePasswordsIdentical]"
						v-model="data_dialogFormCreateAccount.input.repeatPassword.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.repeatPassword.label"></span>
						</template>
						<template #append-inner>
							<v-icon
								:icon="
									data_dialogFormCreateAccount.input.repeatPassword.show
										? data_dialogFormCreateAccount.input.repeatPassword.icon.show
										: data_dialogFormCreateAccount.input.repeatPassword.icon.hide
								"
								@click.stop="data_dialogFormCreateAccount.input.repeatPassword.show = !data_dialogFormCreateAccount.input.repeatPassword.show"
							></v-icon>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_dialogFormCreateAccount.valid"
						:text="data_dialogFormCreateAccount.actions.btn.create.text"
						@click.stop="createAccount_handler"
					></v-btn>
				</v-form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Icons
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "create-account-container-component",
	emits: {},
	data() {
		return {
			data_dialogFormCreateAccount: {
				valid: false,
				information: "By creating an account you agree to our Terms of Service, and have read and understood the Privacy Policy.",
				input: {
					firstName: {
						valid: false,
						label: "First name",
						value: ""
					},
					lastName: {
						valid: false,
						label: "Last name",
						value: ""
					},
					email: {
						valid: false,
						label: "Email address",
						value: ""
					},
					password: {
						valid: false,
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Password",
						value: ""
					},
					repeatPassword: {
						valid: false,
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Repeat password",
						value: ""
					},
				},
				actions: {
					btn: {
						create: {
							text: "Create account"
						}
					}
				}
			}
		};
	},
	computed: {
		/* CSS */
		dynamicWidth_dialogFormInput(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},

		/* Data */
		isInputValid(): boolean {
			const isFirstNameValid: boolean = this.data_dialogFormCreateAccount.input.firstName.value && this.data_dialogFormCreateAccount.input.firstName.value.length > 0; 
			const isLastNameValid: boolean = this.data_dialogFormCreateAccount.input.lastName.valid; 
			const isEmailValid: boolean = this.data_dialogFormCreateAccount.input.email.valid; 
			const isPasswordValid: boolean = this.data_dialogFormCreateAccount.input.password.valid; 
			const isRepeatPasswordValid: boolean = this.data_dialogFormCreateAccount.input.repeatPassword.valid; 

			let retVal: boolean = false;
			if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid) {

			}
			return retVal;
		},
		isFormValid(): boolean {
			const isFirstNameValid: boolean = this.data_dialogFormCreateAccount.input.firstName.valid; 
			const isLastNameValid: boolean = this.data_dialogFormCreateAccount.input.lastName.valid; 
			const isEmailValid: boolean = this.data_dialogFormCreateAccount.input.email.valid; 
			const isPasswordValid: boolean = this.data_dialogFormCreateAccount.input.password.valid; 
			const isRepeatPasswordValid: boolean = this.data_dialogFormCreateAccount.input.repeatPassword.valid; 

			let retVal: boolean = false;
			if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid) {

			}
			return retVal;
		}
	},
	methods: {
		/* Events */
		createAccount_handler(): void {

		},
		// Emit
		emit_handler(newValue: string): void {
			this.$emit("change", newValue);
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
		isNameMinLength(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = newValue.length >= 3 || "At least 3 characters.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		isEmailValid(newValue: string): boolean | string {
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
		isPasswordMinLength(newValue: string): boolean | string {
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
		isCombination(newValue: string): boolean | string {
			const isNewValueValid: boolean = !!newValue && newValue.length > 0;

			let retVal: boolean | string = false;
			if (isNewValueValid) {
				retVal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{6,}$/g.test(newValue) || "Must contain a combination of uppercase, lowercase, numbers & symbols.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		arePasswordsIdentical(newValue: string): boolean | string {
			const passwordValue = this.data_dialogFormCreateAccount.input.password.value;
			const isPasswordValid: boolean = !!passwordValue && passwordValue.length > 0;
			const repeatPasswordValue: string = newValue;
			const isRepeatPasswordValid: boolean = !!repeatPasswordValue && repeatPasswordValue.length > 0;

			let retVal: boolean | string = false;
			if (isPasswordValid && isRepeatPasswordValid) {
				retVal = passwordValue === repeatPasswordValue || "Passwords must match.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		}
	}
});
</script>
