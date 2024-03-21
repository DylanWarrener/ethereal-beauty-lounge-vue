<template>
	<v-container fluid>
		<v-row dense>
			<v-col class="d-flex flex-column align-center">
				<v-btn
					height="60"
					class="bg-accent"
					:style="dynamicWidth_dialogFormInput"
					:text="form.actions.btn.tryAgain"
					@click="emit_handler('common-login-container-component')"
				></v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "more-information-required-container-component",
	data() {
		return {
			form: {
				actions: {
					btn: {
						tryAgain: "Back to login?",
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
	},
	methods: {
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
