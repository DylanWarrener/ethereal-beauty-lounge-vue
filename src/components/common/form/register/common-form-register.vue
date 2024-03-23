<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12">
				<v-form
					class="ga-4 d-flex flex-column align-center"
					validate-on="input lazy"
					v-model="data_dialogFormCreateAccount.valid"
					@submit.prevent="createAccount_handler"
				>
					<v-text-field
						clearable
						ref="ref_firstName"
						variant="outlined"
						type="text"
						:style="dynamicWidth_dialogFormInput"
						:rules="data_nameValidationRules"
						v-model="data_dialogFormCreateAccount.input.firstName.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.firstName.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_lastName"
						variant="outlined"
						type="text"
						:style="dynamicWidth_dialogFormInput"
						:rules="data_nameValidationRules"
						v-model="data_dialogFormCreateAccount.input.lastName.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.lastName.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_email"
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="data_emailValidationRules"
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
						:rules="data_passwordValidationRules"
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
								@click.stop="
									data_dialogFormCreateAccount.input.password.show =
										!data_dialogFormCreateAccount.input.password.show
								"
							></v-icon>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_repeatPassword"
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:type="data_dialogFormCreateAccount.input.repeatPassword.show ? 'text' : 'password'"
						:rules="data_repeatPasswordValidationRules"
						v-model="data_dialogFormCreateAccount.input.repeatPassword.value"
					>
						<template #label>
							<span
								class="text-inverted"
								v-text="data_dialogFormCreateAccount.input.repeatPassword.label"
							></span>
						</template>
						<template #append-inner>
							<v-icon
								:icon="
									data_dialogFormCreateAccount.input.repeatPassword.show
										? data_dialogFormCreateAccount.input.repeatPassword.icon.show
										: data_dialogFormCreateAccount.input.repeatPassword.icon.hide
								"
								@click.stop="
									data_dialogFormCreateAccount.input.repeatPassword.show =
										!data_dialogFormCreateAccount.input.repeatPassword.show
								"
							></v-icon>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						type="submit"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_isFormValid"
						:loading="isLoading"
						:text="data_dialogFormCreateAccount.actions.btn.create.text"
					></v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" class="d-flex flex-column justify-center align-center">
				<v-btn variant="flat" @click="$router.push({ name: 'login', hash: '#section-login' })">
					<template v-slot:default>
						<small
							class="font-weight-bold text-inverted"
							v-text="data_dialogFormCreateAccount.actions.links.backToLogin.text"
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

// Icons
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "create-account-container-component",
	data() {
		return {
			isLoading: false,
			error: null,
			data_dialogFormCreateAccount: {
				valid: false,
				information:
					"By creating an account you agree to our Terms of Service, and have read and understood the Privacy Policy.",
				input: {
					firstName: {
						label: "First name",
						value: null,
					},
					lastName: {
						label: "Last name",
						value: null,
					},
					email: {
						label: "Email address",
						value: null,
					},
					password: {
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Password",
						value: null,
					},
					repeatPassword: {
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Repeat password",
						value: null,
					},
				},
				actions: {
					links: {
						backToLogin: {
							text: "Back to login?",
						},
					},
					btn: {
						create: {
							text: "Create account",
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
			return this.data_dialogFormCreateAccount.valid;
		},
		data_nameValidationRules(): any {
			return [this.isNotEmpty, this.isNameMinLength];
		},
		data_emailValidationRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
		data_passwordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination];
		},
		data_repeatPasswordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination, this.arePasswordsIdentical];
		},
	},
	methods: {
		/* Events */
		createAccount_handler(): void {
			debugger;
			let isFormValid: boolean = this.data_isFormValid;

			if (isFormValid) {
				const firstname: string = this.data_dialogFormCreateAccount.input.firstName.value!;
				const lastname: string = this.data_dialogFormCreateAccount.input.lastName.value!;
				const email: string = this.data_dialogFormCreateAccount.input.email.value!;
				const password: string = this.data_dialogFormCreateAccount.input.password.value!;

				this.isLoading = true;
				this.storeFirebase
					.createAccountWithEmailAndPassword({ email, password })
					.then((response) => {
						debugger;
						const displayName: string = `${firstname} ${lastname}`;
						this.storeFirebase.setUserDisplayName(displayName);
						this.storeFirebase.storeNewUser({
							uid: response.user.uid,
							firstname: firstname,
							lastname: lastname,
						});
						this.resetForm();
					})
					.catch((error) => {
						debugger;
						const errorCode = error.code;
   	 					const errorMessage = error.message;
						console.error(errorCode, " - ", errorMessage);
					})
					.finally(() => {
						debugger;
						this.isLoading = false;
					});
			}
		},

		/* Utils */
		resetForm(): void {
			this.data_dialogFormCreateAccount.valid = false;
			this.data_dialogFormCreateAccount.input.firstName.value = null;
			this.data_dialogFormCreateAccount.input.lastName.value = null;
			this.data_dialogFormCreateAccount.input.email.value = null;
			this.data_dialogFormCreateAccount.input.password.value = null;
			this.data_dialogFormCreateAccount.input.repeatPassword.value = null;
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
				retVal =
					/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{6,}$/g.test(newValue) ||
					"Must contain a combination of uppercase, lowercase, numbers & symbols.";

				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		arePasswordsIdentical(newValue: string): boolean | string {
			const passwordValue: string = this.data_dialogFormCreateAccount.input.password.value! as string;
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
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
