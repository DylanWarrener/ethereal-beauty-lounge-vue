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

			<teleport to="body">
				<snackbar-container
					color="success"
					location="top"
					:text="computed_data_createUserSuccess_message"
					v-model="computed_data_createUserSuccess_value"
					@close="methods_event_snackbar_close('success')"
				></snackbar-container>
				<snackbar-container
					color="warning"
					location="top"
					:text="computed_data_createUserWarning_message"
					v-model="computed_data_createUserWarning_value"
					@close="methods_event_snackbar_close('warning')"
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
			isLoading: false,
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
		computed_css_dynamicWidth(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},

		/* Data */
		computed_data_isFormValid(): boolean {
			return this.data_dialogFormCreateAccount.valid;
		},
		computed_data_nameValidationRules(): any {
			return [this.isNotEmpty, this.isNameMinLength];
		},
		computed_data_emailValidationRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
		computed_data_passwordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination];
		},
		computed_data_repeatPasswordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination, this.arePasswordsIdentical];
		},
		computed_data_snackbar_defaultTimeout_value(): number {
			return this.storeCommon.getSnackbarTimeoutDefaultValue ?? 3000;
		},
		computed_data_createUserSuccess_message(): string {
			return this.storeCommon.getCreateUserSuccessMessage;
		},
		computed_data_createUserWarning_message(): string {
			return this.storeCommon.getCreateUserWarningMessage;
		},
		computed_data_createUserError_message(): string {
			return this.storeCommon.getCreateUserErrorMessage;
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
			debugger;
			let isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const title: string = this.data_dialogFormCreateAccount.input.title.value!;
				const firstname: string = this.data_dialogFormCreateAccount.input.firstName.value!;
				const lastname: string = this.data_dialogFormCreateAccount.input.lastName.value!;
				const email: string = this.data_dialogFormCreateAccount.input.email.value!;
				const password: string = this.data_dialogFormCreateAccount.input.password.value!;
				const displayName: string = `${firstname} ${lastname}`;

				this.storeFirebase.setIsUserCreatingAccount(true);
				this.isLoading = true;
				this.storeFirebase
					.createAccountWithEmailAndPassword({ email, password })
					.then(() => {
						debugger;
						return this.storeFirebase.sendUserEmailVerification();
					})
					.then(() => {
						debugger;
						// 1. Show a message to the user to show that an email verification has been sent

						// 2. Make sure they have confirmed the email verification before continuing.
						const allUserData = this.storeFirebase.getUserData;

						//this.storeFirebase.setUserJoinedOn({ joinedOn });
						this.storeFirebase.setUserTitle({ title });
						this.storeFirebase.setUserDisplayName({ displayName });
						this.storeFirebase.setUserFirstname({ firstname });
						this.storeFirebase.setUserLastname({ lastname });
						if (this.storeFirebase.getIsUserLoggedIn) {
							const uid: string = this.storeFirebase.getUserID!;
							const firestoreUserData = { uid, title, firstname, lastname };
							return this.storeFirebase.setFirestoreUser(firestoreUserData);
						}
					})
					.catch((error) => {
						debugger;
						switch (error) {
							case "auth/email-already-in-use":
								debugger;
								const errorMessage: string = "Email already in use! Try logging in.";
								const defaultSnackbarTimeout: number = this.storeCommon.getSnackbarTimeoutDefaultValue;
								this.storeCommon.setCreateUserErrorMessage({ text: errorMessage });
								this.storeCommon.setCreateUserErrorValue(true);
								setTimeout(
									() => this.$router.push({ name: txtRouteNames.login, hash: "#section-login" }),
									defaultSnackbarTimeout
								);
								break;
						}
					})
					.finally(() => {
						this.resetFormInputs();
						this.storeFirebase.setIsUserCreatingAccount(false);
						this.isLoading = false;
						// Go to account once logged in
						//this.$router.replace({ name: txtRouteNames.account });
					});
			}
		},
		methods_event_snackbar_close(typeOfSnackbar: "success" | "warning" | "error"): void {
			switch (typeOfSnackbar) {
				case "error":
					this.storeCommon.setCreateUserErrorValue(false);
					break;
				case "success":
					this.storeCommon.setCreateUserSuccessValue(false);
					break;
				case "warning":
					this.storeCommon.setCreateUserWarningValue(false);
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
