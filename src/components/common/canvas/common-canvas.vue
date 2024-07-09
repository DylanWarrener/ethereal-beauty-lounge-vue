<template>
	<v-parallax style="height: 100vh" :src="src">
		<slot name="canvas-content"></slot>
	</v-parallax>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "canvas-container-component",
	props: {
		src: { type: String, required: false }
	},
});
</script>
