<template>
	<v-container fluid style="border: 2px solid black">
		<v-row dense class="ga-8 d-flex justify-center" style="border: 2px solid red">
			<v-col class="d-flex flex-column flex-shrink-1 flex-grow-0" style="border: 2px solid green">
				<v-btn
					height="60"
					class="bg-accent"
					:style="dynamicWidth_dialogFormInput"
					:text="form.actions.btn.contact.text"
					@click="$router.push({ name: 'contact', hash: '#section-contact' })"
				></v-btn>
			</v-col>
			<v-col class="d-flex flex-column flex-shrink-1 flex-grow-0" style="border: 2px solid blue">
				<v-btn
					height="60"
					class="bg-accent"
					:style="dynamicWidth_dialogFormInput"
					:text="form.actions.btn.tryAgain.text"
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
						contact: {
							text: "Contact support?",
						},
						tryAgain: {
							text: "Back to login?",
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
	},
	methods: {
		emit_handler(value: string): void {
			this.$emit("change", value);
		},
	},
});
</script>
