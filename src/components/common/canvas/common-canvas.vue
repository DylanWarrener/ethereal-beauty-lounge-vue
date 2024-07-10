<template>
	<v-parallax class="w-100 h-screen" :src="src">
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
