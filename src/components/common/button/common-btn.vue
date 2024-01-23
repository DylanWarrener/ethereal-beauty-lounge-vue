<template>
	<v-btn :id="id" :class="class" :icon="icon"></v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "btn-container-component",
	props: {
		id: { type: String, required: false },
		class: { type: String, required: false },
		icon: { type: String, required: false },
	},
});
</script>
