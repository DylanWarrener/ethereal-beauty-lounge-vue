<template>
	<v-parallax :src="src" style="height: 100vh">
		<slot name="canvas-content"></slot>
	</v-parallax>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "canvas-container-component",
	props: {
		src: { type: String, required: true },
	},
});
</script>
