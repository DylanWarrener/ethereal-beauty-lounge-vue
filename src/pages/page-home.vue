<template>
	<canvas-container-component :src="canvasIMG">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height" style="border: 2px solid black">
				<v-row dense class="d-flex justify-center" style="border: 2px solid purple">
					<v-col cols="12" md="8" style="border: 2px solid orange">
						<card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap" style="border: 2px solid green">
										<h1>Where Beauty Radiates With Delicacy</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap" style="border: 2px solid blue">
										<h3>
											Transform your look with our non-invasive treatments for the face & body.
										</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4" style="border: 2px solid red">
									<v-spacer></v-spacer>
									<v-btn
										variant="flat"
										size="large"
										color="accent"
										text="Book now"
										@click="scrollToElement"
									></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<section-container-component
		id="section-home"
		class="bg-accent"
		title="Letting Beauty Take Flight So You Don't Have To"
	>
		<template #section-content>
			<card-grid-container-component></card-grid-container-component>
		</template>
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "home-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
		"section-container-component": SectionContainerComp,
		"card-grid-container-component": CardGridContainerComp,
	},
	computed: {
		/* IMGs */
		canvasIMG(): string {
			return CanvasPNG;
		},

		/* Data */
		appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
	},
	methods: {
		scrollToElement(): void {
			const targetElementID: HTMLDivElement = document.getElementById("section-home") as HTMLDivElement;

			window.scrollTo({
				top: targetElementID!.offsetTop - this.appBarHeight,
				behavior: "smooth",
			});
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
