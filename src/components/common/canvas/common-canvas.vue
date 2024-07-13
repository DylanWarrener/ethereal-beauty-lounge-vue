<template>
	<v-parallax :src="src" class="h-screen" style="border: 4px solid orange">
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

<style lang="scss">

</style>
