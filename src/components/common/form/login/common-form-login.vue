<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12" xl="5">
				<v-form
					class="w-100 h-100 d-flex flex-column"
					validate-on="input lazy"
					:class="`${$vuetify.display.xlAndUp ? 'align-end' : 'align-center'}`"
					v-model="data_dialogFormLogin.valid"
					@submit.prevent="login_handler"
				>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="computed_data_validation_emailRules"
						v-model="data_dialogFormLogin.input.email.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormLogin.input.email.label"></span>
						</template>
					</v-text-field>
					<div
						class="w-100 d-flex justify-end"
						:style="dynamicWidth_dialogFormInput"
						@click="() => $emit('change', 'common-forgotten-password-container-component')"
					>
						<v-btn variant="flat">
							<template v-slot:default>
								<sub
									class="text-accent"
									v-text="data_dialogFormLogin.actions.links.forgottenPassword.text"
								></sub>
							</template>
						</v-btn>
					</div>
					<v-text-field
						clearable
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:type="data_dialogFormLogin.input.password.show ? 'text' : 'password'"
						:rules="computed_data_validation_passwordRules"
						v-model="data_dialogFormLogin.input.password.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormLogin.input.password.label"></span>
						</template>
						<template #append-inner>
							<v-icon
								:icon="
									data_dialogFormLogin.input.password.show
										? data_dialogFormLogin.input.password.icon.show
										: data_dialogFormLogin.input.password.icon.hide
								"
								@click.stop="
									data_dialogFormLogin.input.password.show = !data_dialogFormLogin.input.password.show
								"
							></v-icon>
						</template>
					</v-text-field>
					<v-btn
						height="60"
						class="mt-4 bg-accent"
						type="submit"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!computed_data_isFormValid"
						:loading="data_dialogFormLogin.actions.btn.login.isLoading"
						:text="data_dialogFormLogin.actions.btn.login.text"
					></v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" xl="2" class="d-flex" :class="dynamicPadding_orSeperatorCol">
				<v-row
					dense
					class="d-flex justify-center align-center"
					:class="`${$vuetify.display.xlAndUp ? 'flex-column' : 'flex-row'}`"
				>
					<v-col class="d-flex flex-column justify-center" style="max-width: 400px">
						<v-divider
							vertical
							class="align-self-center"
							style="opacity: 1"
							color="accent"
							thickness="2"
							v-if="$vuetify.display.xlAndUp"
						></v-divider>
						<v-divider style="opacity: 1" color="accent" v-else></v-divider>
					</v-col>
					<v-col cols="1" xl="auto" class="d-flex flex-column justify-center">
						<small class="text-center text-inverted">OR</small>
					</v-col>
					<v-col class="d-flex flex-column justify-center" style="max-width: 400px">
						<v-divider
							vertical
							class="align-self-center"
							style="opacity: 1"
							color="accent"
							thickness="2"
							v-if="$vuetify.display.xlAndUp"
						></v-divider>
						<v-divider style="opacity: 1" color="accent" v-else></v-divider>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="12"
				xl="5"
				class="ga-4 d-flex flex-column justify-center"
				:class="`${$vuetify.display.xlAndUp ? 'align-start' : 'align-center'}`"
			>
				<v-btn
					variant="outlined"
					class="px-8 bg-transparent"
					height="60"
					:style="dynamicWidth_dialogFormInput"
					:key="index"
					v-for="(btn, index) in data_dialogFormLogin.actions.btn.continueWith"
				>
					<template v-slot:prepend>
						<v-icon class="mr-4">
							<template #default>
								<v-img :src="btn.icon"></v-img>
							</template>
						</v-icon>
					</template>
					<template v-slot:default>
						<span class="text-inverted" v-text="btn.text"></span>
					</template>
				</v-btn>
			</v-col>
			<v-col class="d-flex flex-column justify-center align-center">
				<v-btn variant="flat" @click="$router.push({ name: 'register', hash: '#section-register' })">
					<template v-slot:default>
						<small
							class="font-weight-bold text-inverted"
							v-text="data_dialogFormLogin.actions.links.register.text"
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
import { CONST_OBJECT_TEXT_PAGES } from "@constants/common/objects/common-constants-objects.js";

// Icons
import GoogleIcon from "@assets/svg/authentication/google.svg";
import { mdiEye, mdiEyeOff } from "@mdi/js";

export default defineComponent({
	name: "login-container-component",
	data() {
		return {
			data_dialogFormLogin: {
				valid: false,
				input: {
					email: {
						label: "Email address",
						value: null,
					},
					password: {
						show: false,
						icon: {
							show: mdiEye,
							hide: mdiEyeOff,
						},
						label: "Password",
						value: null,
					},
				},
				actions: {
					links: {
						forgottenPassword: {
							text: "Forgot the login password?",
						},
						register: {
							text: "Register your account?",
						},
					},
					btn: {
						login: {
							text: "Log in",
							isLoading: false,
						},
						continueWith: {
							google: {
								text: "Continue with Google",
								icon: GoogleIcon,
							},
						},
					},
				},
			},
		};
	},
	computed: {
		/* CSS */
		dynamicPadding_orSeperatorCol(): string {
			let retVal: string = "py-4";
			if (this.$vuetify.display.xlAndUp) retVal = "";
			return retVal;
		},
		dynamicWidth_dialogFormInput(): string {
			let retVal: string = "width: 100%; max-width: 400px";
			return retVal;
		},
		dynamicMaxWidth_dialog(): string {
			let retVal: string = "";
			if (this.$vuetify.display.mdAndUp) retVal = "50%";
			return retVal;
		},
		dynamicWidth_dialogBtn(): string {
			let retVal: string = "200";
			if (this.$vuetify.display.mdAndUp) retVal = "250";
			if (this.$vuetify.display.lgAndUp) retVal = "300";
			return retVal;
		},
		dynamicHeight_dialogBtn(): string {
			let retVal: string = "50";
			return retVal;
		},

		computed_data_isFormValid(): boolean {
			return this.data_dialogFormLogin.valid;
		},
		computed_data_timeout_value(): number {
			return this.storeCommon.getSnackbar_timeout_state;
		},
		computed_data_validation_emailRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
		computed_data_validation_passwordRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination];
		},
	},
	methods: {
		/* Events */
		login_handler(): void {
			const isFormValid: boolean = this.computed_data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_dialogFormLogin.input.email.value!;
				const password: string = this.data_dialogFormLogin.input.password.value!;

				this.data_dialogFormLogin.actions.btn.login.isLoading = true;
				this.storeFirebase
					.login_userAuth_withEmailAndPassword({ email, password })
					.then(() => {
						this.storeCommon.setSnackbar_success_state(
							"You have successfully logged into your account. Redirecting you to your account now."
						);
						setTimeout(() => {
							this.$router.replace({ name: CONST_OBJECT_TEXT_PAGES.account, hash: "#section-account" });
						}, this.computed_data_timeout_value);
					})
					.catch((errorMessage: string) => this.storeCommon.setSnackbar_error_state(errorMessage))
					.finally(() => {
						setTimeout(() => {
							this.storeCommon.setSnackbar_reset_state();
							this.data_dialogFormLogin.actions.btn.login.isLoading = false;
							this.resetFormInputs();
						}, this.computed_data_timeout_value);
					});
			}
		},
		// Emit
		emit_handler(value: string): void {
			this.$emit("change", value);
		},

		/* Utils */
		resetFormInputs(): void {
			this.data_dialogFormLogin.valid = false;
			this.data_dialogFormLogin.input.email.value = null;
			this.data_dialogFormLogin.input.password.value = null;
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
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		const storeCommon = useCommonStore();
		return { storeFirebase, storeCommon };
	},
});
</script>
