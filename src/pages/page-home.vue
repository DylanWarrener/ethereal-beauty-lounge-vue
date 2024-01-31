<template>
	<canvas-container-component :src="canvasIMG"></canvas-container-component>
	<h1>HEADING 1</h1>
	<h2>HEADING 2</h2>
	<h3>HEADING 3</h3>
	<h4>HEADING 4</h4>
	<h5>HEADING 5</h5>
	<h6>HEADING 6</h6>
	<p>p</p>
	<span>SPAN</span>
	<div>DIV</div>
	<button>HTML BUTTON</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";

export default defineComponent({
	name: "home-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
	},
	computed: {
		/* IMGs */
		canvasIMG(): string {
			return "";
		},
	},
});
</script>
