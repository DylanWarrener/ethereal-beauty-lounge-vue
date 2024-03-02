<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12" xl="5" style="border: 2px solid blue">
				<v-form
					class="w-100 d-flex flex-column justify-space-evenly"
					:class="`${$vuetify.display.xlAndUp ? 'align-end' : 'align-center'}`"
					v-model="data_dialogFormLogin.valid"
				>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="[rules.isNotEmpty]"
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
						:rules="[rules.isNotEmpty, rules.isPasswordMinLength, rules.isCombination]"
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
								@click.stop="data_dialogFormLogin.input.password.show = !data_dialogFormLogin.input.password.show"
							></v-icon>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_dialogFormLogin.valid"
						:text="data_dialogFormLogin.actions.btn.login.text"
						@click.stop=""
					></v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" xl="2" class="d-flex" style="border: 2px solid green">
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
				style="border: 2px solid orange"
				:class="`${$vuetify.display.xlAndUp ? 'align-start' : 'align-center'}`"
			>
				<v-btn
					variant="outlined"
					class="px-8 bg-transparent"
					height="50"
					:style="dynamicWidth_dialogFormInput"
					:key="index"
					v-for="(btn, index) in data_dialogFormLogin.actions.btn.continueWith"
					@click.stop=""
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
			<v-col class="pa-2">
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
import { defineComponent } from "vue";

// Icons
import GoogleIcon from "@assets/svg/authentication/google.svg";
import { iconsFormPassword } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "login-container-component",
	data() {
		return {
			data_dialogFormLogin: {
				valid: false,
				input: {
					email: {
						label: "Email address",
						value: null
					},
					password: {
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Password",
						value: null
					}
				},
				actions: {
					links: {
						forgottenPassword: {
							text: "Forgot the login password?"
						},
						createAccount: {
							text: "Create your account?"
						}
					},
					btn: {
						login: {
							text: "Log in"
						},
						continueWith: {
							google: {
								text: "Continue with Google",
								icon: GoogleIcon,
							},
						}
					},
				}
			},
			rules: {
				isNotEmpty: (value: string) => !!value || "A value must be entered.",
				isPasswordMinLength: (value: string) => value && value.length >= 12 || "At least 12 characters.",
				isCombination: (value: string) => value && /[\x00-\x7F]+/g.test(value) || "Must contain a combination of uppercase, lowercase, numbers & symbols."
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
	},
	methods: {
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
