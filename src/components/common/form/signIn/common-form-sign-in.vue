<template>
	<container-form @submit="method_event_signIn_clickHandler"> </container-form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "container-sign-in-component",
	methods: {
		method_event_signIn_clickHandler(): void {},
	},
});
</script>
