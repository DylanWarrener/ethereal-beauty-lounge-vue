<template>
	<canvas-container-component :src="canvasIMG">
		<template #canvas-content>
			<v-container class="d-flex fill-height">
				<v-row dense>
					<v-col cols="12">
						<card-container-component class="rounded-shaped">
							<template #card-title>
								<h1>Where Beauty Radiates With Delicacy</h1>
							</template>
							<template #card-actions>
								<v-spacer></v-spacer>
								<v-btn style="border: 2px solid black">BTN Text</v-btn>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
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
import CardContainerComp from "@components/common/card/common-card.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "home-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
	},
	computed: {
		/* IMGs */
		canvasIMG(): string {
			return CanvasPNG;
		},
	},
});
</script>
