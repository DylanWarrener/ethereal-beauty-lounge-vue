<template>
	<v-container fluid class="h-100" style="border: 4px solid black">
		<v-row dense class="h-100" style="border: 4px solid red">
			<v-col cols="12" xl="5" class="d-flex" style="border: 4px solid green">
				<common-form-container-component
					class="w-100 d-flex flex-column justify-space-evenly"
					style="border: 4px solid blue"
					:class="`${$vuetify.display.xlAndUp ? 'align-end' : 'align-center'}`"
					v-model="data_dialogFormLogin.valid"
					@submit.prevent="login_handler"
				>
					<template #form-content>
						<common-form-login-container-component></common-form-login-container-component>
					</template>
				</common-form-container-component>
			</v-col>
			<v-col cols="12" xl="2" class="d-flex" style="border: 4px solid orange">
				<v-row dense class="d-flex" :class="`${$vuetify.display.xlAndUp ? 'flex-column' : 'flex-row'}`">
					<v-col class="d-flex flex-column justify-center">
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
					<v-col class="d-flex flex-column justify-center">
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
				style="border: 4px solid purple"
			>
				<v-btn
					variant="outlined"
					class="px-8 bg-transparent"
					height="50"
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
			<v-col class="pa-2" style="border: 4px solid grey">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a
						class="pa-2 text-decoration-none text-inverted"
						href="#"
						v-text="data_dialogFormLogin.actions.links.createAccount.text"
						@click="emit_handler('create-account-container-component')"
					></a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
/*
<v-form
	class="w-100 d-flex flex-column justify-space-evenly"
	validate-on="input lazy"
	style="border: 4px solid blue"
	:class="`${$vuetify.display.xlAndUp ? 'align-end' : 'align-center'}`"
	v-model="data_dialogFormLogin.valid"
	@submit.prevent="login_handler"
>
	<v-text-field
		clearable
		variant="outlined"
		type="email"
		:style="dynamicWidth_dialogFormInput"
		:rules="data_emailValidationRules"
	>
		<template #label>
			<span class="text-inverted" v-text="data_dialogFormLogin.input.email.label"></span>
		</template>
	</v-text-field>
	<div class="w-100 mb-1 d-flex justify-end" :style="dynamicWidth_dialogFormInput">
		<a
			class="text-decoration-none text-accent"
			href="#"
			v-text="data_dialogFormLogin.actions.links.forgottenPassword.text"
			@click="emit_handler('forgotten-password-container-component')"
		></a>
	</div>
	<v-text-field
		clearable
		variant="outlined"
		:style="dynamicWidth_dialogFormInput"
		:type="data_dialogFormLogin.input.password.show ? 'text' : 'password'"
		:rules="data_passwordValidationRules"
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
		height="50"
		class="mt-4 px-8 bg-accent"
		type="submit"
		:style="dynamicWidth_dialogFormInput"
		:disabled="!data_isFormValid"
		:text="data_dialogFormLogin.actions.btn.login.text"
	></v-btn>
</v-form>
*/
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";
import useCommonStore from "@stores/store-common.js";

// Components
import FormContainerComp from "@components/common/form/common-form.vue";

// Icons
import GoogleIcon from "@assets/svg/authentication/google.svg";
import { mdiEye, mdiEyeOff } from "@mdi/js";

export default defineComponent({
	name: "uncommon-form-login-component",
	components: {
		"common-form-container-component": FormContainerComp,
	},
	data() {
		return {
			isLoading: false,
			error: null,
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
						createAccount: {
							text: "Create your account?",
						},
					},
					btn: {
						login: {
							text: "Log in",
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

		/* Data */
		data_isFormValid(): boolean {
			return this.data_dialogFormLogin.valid;
		},
		data_emailValidationRules(): any {
			return [this.isNotEmpty, this.isEmailFormatValid];
		},
		data_passwordValidationRules(): any {
			return [this.isNotEmpty, this.isPasswordMinLength, this.isCombination];
		},
	},
	methods: {
		/* Events */
		login_handler(): void {
			const isFormValid: boolean = this.data_isFormValid;

			if (isFormValid) {
				const email: string = this.data_dialogFormLogin.input.email.value!;
				const password: string = this.data_dialogFormLogin.input.password.value!;

				this.isLoading = true;
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
