<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted">
					Enter your phone number, so we can send you the account recovery instructions.
				</p>
			</v-col>
			<v-col cols="12" style="border: 2px solid blue">
				<v-form class="d-flex flex-column align-center" style="border: 2px solid green" v-model="valid">
					<v-select variant="outlined" :style="dynamicWidth_dialogFormInput"></v-select>
					<div class="w-100 mb-1 d-flex justify-end" :style="dynamicWidth_dialogFormInput">
						<a
							class="text-decoration-none text-accent"
							href="#"
							@click="emit_handler('more-information-required-container-component')"
						>
							I do not have access to this account?
						</a>
					</div>
					<v-text-field
						clearable
						variant="outlined"
						type="number"
						:style="dynamicWidth_dialogFormInput"
						:rules="[rules.isNotEmpty]"
					>
						<template #label>
							<span class="text-inverted">Phone number</span>
						</template>
					</v-text-field>
					<v-btn
						height="50"
						class="mt-4 px-8 bg-accent"
						:style="dynamicWidth_dialogFormInput"
						:disabled="!valid"
						@click.stop=""
					>
						Send text
					</v-btn>
				</v-form>
			</v-col>
			<v-col cols="12" class="pa-2">
				<p class="d-flex justify-center text-button font-weight-bold">
					<a
						class="pa-2 text-decoration-none text-inverted"
						href="#"
						@click="emit_handler('login-container-component')"
					>
						Back to login?
					</a>
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
			valid: false,
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
