<template>
	<v-container fluid>
		<v-row dense>
			<v-col cols="12">
				<p class="pa-4 text-center flex-wrap text-inverted" v-text="data_dialogFormErrorMoreInfoRequired.information"></p>
			</v-col>
			<v-col class="d-flex flex-column align-center">
				<v-btn
					height="50"
					class="px-8 bg-accent"
					:style="dynamicWidth_dialogFormInput"
					v-text="data_dialogFormErrorMoreInfoRequired.actions.btn.tryAgain"
					@click="emit_handler('login-container-component')"
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
			data_dialogFormErrorMoreInfoRequired: {
				information: "To help recover your account, we will need more information.",
				actions: {
					btn: {
						tryAgain: "Try again",
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
