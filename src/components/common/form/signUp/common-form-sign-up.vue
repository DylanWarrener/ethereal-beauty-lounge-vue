<template>
	<container-form @submit="method_event_signUp_clickHandler"> </container-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "sign-up-container-component",
	methods: {
		method_event_signUp_clickHandler(): void {},
	},
});
</script>
