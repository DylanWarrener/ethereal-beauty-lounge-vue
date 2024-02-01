<template>
	<canvas-container-component :src="canvasIMG" title="A title for the card" btn-text="BTN Text"></canvas-container-component>
	<h1>Heading 1</h1>
	<h2>Heading 2</h2>
	<h3>Heading 3</h3>
	<h4>Heading 4</h4>
	<h5>Heading 5</h5>
	<h6>Heading 6</h6>
	<p>p</p>
	<span>span</span>
	<div>div</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";

// IMGs 
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "home-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
	},
	computed: {
		/* IMGs */
		canvasIMG(): string {
			return CanvasPNG;
		},
	},
});
</script>
