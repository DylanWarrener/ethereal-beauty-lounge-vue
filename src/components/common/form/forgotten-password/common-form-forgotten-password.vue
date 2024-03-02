<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted" v-text="data_dialogFormForgottenPassword.information"></p>
			</v-col>
			<v-col cols="12" style="border: 2px solid blue">
				<v-form class="d-flex flex-column align-center" style="border: 2px solid green" v-model="data_dialogFormForgottenPassword.valid">
					<div class="w-100 mb-1 d-flex justify-end" :style="dynamicWidth_dialogFormInput">
						<a
							class="text-decoration-none text-accent"
							href="#"
							v-text="data_dialogFormForgottenPassword.actions.links.forgottenEmail.text"
							@click.stop="emit_handler('recover-account-container-component')"
						></a>
					</div>
					<v-text-field
						clearable
						variant="outlined"
						type="email"
						:style="dynamicWidth_dialogFormInput"
						:rules="[rules.isNotEmpty]"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormForgottenPassword.input.email.label"></span>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_dialogFormForgottenPassword.valid"
						:text="data_dialogFormForgottenPassword.actions.btn.send.text"
						@click.stop=""
					></v-btn>
				</v-form>
			</v-col>
			<v-col class="pa-2">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a
						class="pa-2 text-decoration-none text-inverted"
						href="#"
						v-text="data_dialogFormForgottenPassword.actions.links.backToLogin.text"
						@click="emit_handler('login-container-component')"
					></a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "forgotten-password-container-component",
	data() {
		return {
			data_dialogFormForgottenPassword: {
				valid: false,
				information: "Enter your account email. Then we will send you an email, to reset the password.",
				input: {
					email: {
						label: "Email address",
						value: null
					}
				},
				actions: {
					links: {
						forgottenEmail: {
							text: "Forgot your email address?"
						},
						backToLogin: {
							text: "Back to login?"
						}
					},
					btn: {
						send: {
							text: "Send email"
						}
					}
				}
			},
			rules: {
				isNotEmpty: (value: string) => !!value || "A value must be entered.",
			},
		};
	},
	computed: {
		/* CSS */
		dynamicWidth_dialogFormInput(): string {
			let retVal: string = "width: 100%; max-width: 400px";
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
