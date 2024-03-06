<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted" v-text="data_dialogFormRecoverAccount.information"></p>
			</v-col>
			<v-col cols="12">
				<v-form class="d-flex flex-column align-center" validate-on="input lazy" v-model="data_dialogFormRecoverAccount.valid" @submit.prevent="sendText_handler">
					<v-select variant="outlined" :style="dynamicWidth_dialogFormInput"></v-select>
					<div class="w-100 mb-1 d-flex justify-end" :style="dynamicWidth_dialogFormInput">
						<a
							class="text-decoration-none text-accent"
							href="#"
							v-text="data_dialogFormRecoverAccount.actions.links.noAccess.text"
							@click="emit_handler('more-information-required-container-component')"
						></a>
					</div>
					<v-text-field clearable variant="outlined" type="number" :style="dynamicWidth_dialogFormInput" :rules="[rules.isNotEmpty]">
						<template #label>
							<span class="text-inverted" v-text="data_dialogFormRecoverAccount.input.phoneNumber.label"></span>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						type="submit"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!data_isFormValid"
						:text="data_dialogFormRecoverAccount.actions.btn.send.text"
					></v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" class="pa-2">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a
						class="pa-2 text-decoration-none text-inverted"
						href="#"
						v-text="data_dialogFormRecoverAccount.actions.links.backToLogin.text"
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
	name: "recover-account-container-component",
	data() {
		return {
			data_dialogFormRecoverAccount: {
				valid: false,
				information: "Enter your phone number, so we can send you the account recovery instructions.",
				input: {
					phoneNumber: {
						label: "Phone number",
					},
				},
				actions: {
					links: {
						backToLogin: {
							text: "Back to login?",
						},
						noAccess: {
							text: "I do not have access to this account?",
						},
					},
					btn: {
						send: {
							text: "Send text",
						},
					},
				},
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

		/* Data */
		data_isFormValid(): boolean {
			return this.data_dialogFormRecoverAccount.valid;
		},
	},
	methods: {
		/* Events */
		sendText_handler(): void {
			const isFormValid: boolean = this.data_isFormValid;

			if (isFormValid) {
			}
		},
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
