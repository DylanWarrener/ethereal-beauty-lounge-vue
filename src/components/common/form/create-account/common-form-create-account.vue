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
						:rules="[rules.isNotEmpty]"
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
						:rules="[rules.isNotEmpty]"
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
						:rules="[rules.isNotEmpty]"
						v-model="data_dialogFormCreateAccount.input.email.value"
					>
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormCreateAccount.input.email.label"></span>
						</template>
					</v-text-field>
					<v-text-field
						clearable
						variant="outlined"
						:style="dynamicWidth_dialogFormInput"
						:type="data_dialogFormCreateAccount.input.password.show ? 'text' : 'password'"
						:rules="[rules.isNotEmpty, rules.isMinLength, rules.isCombination]"
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
						:rules="[rules.isNotEmpty, rules.isMinLength, rules.isCombination]"
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
						:text="data_dialogFormCreateAccount.actions.btn.send.text"
						@click.stop=""
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
	data() {
		return {
			data_dialogFormCreateAccount: {
				valid: false,
				information: "By creating an account you agree to our Terms of Service, and have read and understood the Privacy Policy.",
				input: {
					firstName: {
						label: "First name",
						value: null
					},
					lastName: {
						label: "Last name",
						value: null
					},
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
					},
					repeatPassword: {
						show: false,
						icon: {
							show: iconsFormPassword.show,
							hide: iconsFormPassword.hide,
						},
						label: "Repeat password",
						value: null
					},
				},
				actions: {
					btn: {
						send: {
							text: "Send email"
						}
					}
				}
			},
			rules: {
				isNotEmpty: (value: string) => !!value || "A value must be entered.",
				isMinLength: (value: string) => value && value.length >= 12 || "At least 12 characters.",
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
	},
	methods: {
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
