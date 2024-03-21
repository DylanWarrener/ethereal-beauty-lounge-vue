<template>
	<v-form validate-on="input lazy" @submit.prevent="submit_handler">
		<slot name="form-content"></slot>
	</v-form>
</template>

<script lang="ts">
/*
<v-text-field type="string" :label="labelFirstname" v-if="labelFirstname"></v-text-field>
<v-text-field type="string" :label="labelLastname" v-if="labelLastname"></v-text-field>
<v-text-field type="email" :label="labelEmail" v-if="labelEmail"></v-text-field>
<v-text-field type="password" :label="labelPassword" v-if="labelPassword"></v-text-field>
<v-text-field type="repeatPassword" :label="labelRepeatPassword" v-if="labelRepeatPassword"></v-text-field>
<v-text-field type="number" :label="labelPhoneNumber" v-if="labelPhoneNumber"></v-text-field>
<v-text-field type="string" :label="labelMessage" v-if="labelMessage"></v-text-field>
*/
import { defineComponent } from "vue";

export default defineComponent({
	name: "form-container-component",
	methods: {
		submit_handler(): void {
			this.$emit("submit");
		},
	},
});
</script>
