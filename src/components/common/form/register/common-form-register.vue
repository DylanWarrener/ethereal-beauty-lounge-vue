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
					<v-select
						ref="ref_title"
						variant="outlined"
						:items="data_dialogFormCreateAccount.input.title.items"
						:style="computed_css_dynamicWidth"
						v-model="data_dialogFormCreateAccount.input.title.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.title.label"></span>
						</template>
						<template #selection="{ item }">
							<span class="text-inverted" v-text="item.value"></span>
						</template>
					</v-select>
					<v-text-field
						clearable
						ref="ref_firstName"
						variant="outlined"
						type="text"
						:style="computed_css_dynamicWidth"
						:rules="computed_data_nameValidationRules"
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
						:style="computed_css_dynamicWidth"
						:rules="computed_data_nameValidationRules"
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
						:style="computed_css_dynamicWidth"
						:rules="computed_data_emailValidationRules"
						v-model="data_dialogFormCreateAccount.input.email.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.email.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_phoneNumber"
						variant="outlined"
						type="text"
						:style="computed_css_dynamicWidth"
						:rules="computed_data_phoneNumberValidationRules"
						v-model="data_dialogFormCreateAccount.input.phoneNumber.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.phoneNumber.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						ref="ref_password"
						variant="outlined"
						:style="computed_css_dynamicWidth"
						:type="data_dialogFormCreateAccount.input.password.show ? 'text' : 'password'"
						:rules="computed_data_passwordValidationRules"
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
						:style="computed_css_dynamicWidth"
						:type="data_dialogFormCreateAccount.input.repeatPassword.show ? 'text' : 'password'"
						:rules="computed_data_repeatPasswordValidationRules"
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
						:style="computed_css_dynamicWidth"
						:disabled="!computed_data_isFormValid"
						:loading="data_dialogFormCreateAccount.actions.btn.create.isLoading"
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

			<teleport to="body">
				<snackbar-container
					color="success"
					location="top"
					:text="computed_data_createUserSuccess_message"
					v-model="computed_data_createUserSuccess_value"
					@close="methods_event_snackbar_close('success')"
				></snackbar-container>
				<snackbar-container
					color="error"
					location="top"
					:text="computed_data_createUserError_message"
					v-model="computed_data_createUserError_value"
					@close="methods_event_snackbar_close('error')"
				></snackbar-container>
			</teleport>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

// Components
import SnackBarContainerComp from "@components/common/snackbar/common-snackbar.vue";

// Constants
import { txtRouteNames } from "@constants/common/objects/common-constants-objects.js";

// Icons
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "create-account-container-component",
	components: {
		"snackbar-container": SnackBarContainerComp,
	},
	data() {
		return {
			data_dialogFormCreateAccount: {
				valid: false,
				information:
					"By creating an account you agree to our Terms of Service, and have read and understood the Privacy Policy.",
				input: {
					title: {
						label: "Title",
						items: ["Mr", "Sir", "Ms", "Mrs", "Miss"],
						value: null,
					},
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
					phoneNumber: {
						label: "Phone number",
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
							isLoading: false,
							text: "Create account",
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
			return this.data_dialogFormCreateAccount.valid;
		},
		computed_data_nameValidationRules(): any {
			return [this.isNotEmpty, this.isNameMinLength];
		},
		computed_data_emailValidationRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
		computed_data_phoneNumberValidationRules(): any {
			return [this.isNotEmpty];
		},
		computed_data_passwordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination];
		},
		computed_data_repeatPasswordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination, this.arePasswordsIdentical];
		},
		computed_data_snackbar_defaultTimeout_value(): number {
			return this.storeCommon.getSnackbarTimeoutDefaultValue;
		},
		computed_data_isUserCreatingAccount: {
			get(): boolean {
				return this.storeFirebase.getIsUserCreatingAccount;
			},
			set(newValue: boolean): void {
				this.storeFirebase.setIsUserCreatingAccount(newValue);
			},
		},
		computed_data_createUserSuccess_message: {
			get(): string {
				return this.storeCommon.getCreateUserSuccessMessage;
			},
			set(newValue: string): void {
				this.storeCommon.setCreateUserSuccessMessage({ text: newValue });
			},
		},
		computed_data_createUserWarning_message: {
			get(): string {
				return this.storeCommon.getCreateUserWarningMessage;
			},
			set(newValue: string): void {
				this.storeCommon.setCreateUserWarningMessage({ text: newValue });
			},
		},
		computed_data_createUserError_message: {
			get(): string {
				return this.storeCommon.getCreateUserErrorMessage;
			},
			set(newValue: string): void {
				this.storeCommon.setCreateUserErrorMessage({ text: newValue });
			},
		},
		computed_data_createUserSuccess_value: {
			get(): boolean {
				return this.storeCommon.getCreateUserSuccessValue;
			},
			set(newValue: boolean): void {
				this.storeCommon.setCreateUserSuccessValue(newValue);
			},
		},
		computed_data_createUserWarning_value: {
			get(): boolean {
				return this.storeCommon.getCreateUserWarningValue;
			},
			set(newValue: boolean): void {
				this.storeCommon.setCreateUserWarningValue(newValue);
			},
		},
		computed_data_createUserError_value: {
			get(): boolean {
				return this.storeCommon.getCreateUserErrorValue;
			},
			set(newValue: boolean): void {
				this.storeCommon.setCreateUserErrorValue(newValue);
			},
		},
	},
	methods: {
		/* Events */
		createAccount_handler(): void {
			let isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_dialogFormCreateAccount.input.email.value!;
				const password: string = this.data_dialogFormCreateAccount.input.password.value!;

				this.computed_data_isUserCreatingAccount = true;
				this.data_dialogFormCreateAccount.actions.btn.create.isLoading = true;
				this.storeFirebase
					.createAccountWithEmailAndPassword({ email, password })
					.then(() => {
						this.setSuccessMessageAndValue(
							"You have successfully created an account. We have now sent you an email to verify your account.",
							true
						);
						return this.storeFirebase.sendUserEmailVerification();
					})
					.then(() => {
						return this.storeUserInFirestore();
					})
					.then(() => {
						this.storeUserInState();
						this.$router.replace({ name: txtRouteNames.account, hash: "#section-account" });
					})
					.catch((errorMessage) => {
						if (errorMessage) {
							console.error(errorMessage);
							this.setErrorMessageAndValue(errorMessage, true);
						}
					})
					.finally(() => {
						setTimeout(() => {
							this.setSuccessMessageAndValue("", false);
							this.setErrorMessageAndValue("", false);
							this.data_dialogFormCreateAccount.actions.btn.create.isLoading = false;
							this.resetFormInputs();
							this.computed_data_isUserCreatingAccount = false;
						}, this.computed_data_snackbar_defaultTimeout_value);
					});
			}
		},
		methods_event_snackbar_close(typeOfSnackbar: "success" | "warning" | "error"): void {
			switch (typeOfSnackbar) {
				case "error":
					this.computed_data_createUserError_value = false;
					break;
				case "success":
					this.computed_data_createUserSuccess_value = false;
					break;
				case "warning":
					this.computed_data_createUserWarning_value = false;
					break;
			}
		},

		/* Utils */
		resetFormInputs(): void {
			this.data_dialogFormCreateAccount.valid = false;
			this.data_dialogFormCreateAccount.input.title.value = null;
			this.data_dialogFormCreateAccount.input.firstName.value = null;
			this.data_dialogFormCreateAccount.input.lastName.value = null;
			this.data_dialogFormCreateAccount.input.email.value = null;
			this.data_dialogFormCreateAccount.input.phoneNumber.value = null;
			this.data_dialogFormCreateAccount.input.password.value = null;
			this.data_dialogFormCreateAccount.input.repeatPassword.value = null;
		},
		setSuccessMessageAndValue(message: string, value: boolean): void {
			this.computed_data_createUserSuccess_message = message;
			this.computed_data_createUserSuccess_value = value;
		},
		setErrorMessageAndValue(message: string, value: boolean): void {
			this.computed_data_createUserError_message = message;
			this.computed_data_createUserError_value = value;
		},
		storeUserInState(): void {
			const displayName: string = `${this.data_dialogFormCreateAccount.input.firstName.value} ${this.data_dialogFormCreateAccount.input.lastName.value}`;
			const title: string = this.data_dialogFormCreateAccount.input.title.value!;
			const firstname: string = this.data_dialogFormCreateAccount.input.firstName.value!;
			const lastname: string = this.data_dialogFormCreateAccount.input.lastName.value!;
			const phoneNumber: string = this.data_dialogFormCreateAccount.input.phoneNumber.value!;

			this.storeFirebase.setUserDisplayName({ displayName });
			this.storeFirebase.setUserTitle({ title });
			this.storeFirebase.setUserFirstname({ firstname });
			this.storeFirebase.setUserLastname({ lastname });
			this.storeFirebase.setUserPhoneNumber({ phoneNumber });
		},
		storeUserInFirestore(): Promise<void> {
			const uid: string = this.storeFirebase.getUserID!;
			const title: string = this.data_dialogFormCreateAccount.input.title.value!;
			const firstname: string = this.data_dialogFormCreateAccount.input.firstName.value!;
			const lastname: string = this.data_dialogFormCreateAccount.input.lastName.value!;
			const phoneNumber: string = this.data_dialogFormCreateAccount.input.phoneNumber.value!;
			return new Promise((resolve, reject) => {
				this.storeFirebase
					.setFirestoreUser({ uid, title, firstname, lastname, phoneNumber })
					.then(() => {
						resolve();
					})
					.catch((errorMessage: string) => {
						reject(errorMessage);
					});
			});
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
