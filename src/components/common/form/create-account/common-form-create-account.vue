<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense style="border: 2px solid red">
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted">
					By creating an account, you agree to our Terms of Service and have read and understood the Privacy
					Policy.
				</p>
			</v-col>
			<v-col class="pa-2 d-flex flex-column align-center">
				<v-btn
					height="50"
					class="mt-4 px-8 bg-accent"
					:style="dynamicWidth_dialogFormInput"
					:disabled="!valid"
					@click.stop=""
				>
					Send email
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "create-account-container-component",
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
