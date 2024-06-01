<template>
	<common-canvas-container-component :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1>Where Beauty Radiates With Delicacy</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Transform your look with our non-invasive treatments for the face & body.</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<v-btn
										variant="flat"
										class="px-4"
										style="min-width: 100px"
										size="large"
										color="accent"
										@click="method_event_scrollToElement('section-portfolio')"
									>
									<template #default>
										<small class="text-default" v-text="homePage.canvas.card.actions.buttons.seeRecentPortfolio.text"></small>
									</template>
									</v-btn>
								</v-card-actions>
							</template>
						</common-card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</common-canvas-container-component>

	<common-divider-container-component></common-divider-container-component>

	<common-section-container-component
		id="section-portfolio"
		class-title="text-inverted"
		class-subtitle="text-inverted"
		title="Portfolio: most recent"
		subtitle="Letting Beauty Take Flight So You Don't Have To"
	>
		<template #section-content>
			<common-card-grid-container-component></common-card-grid-container-component>
		</template>
	</common-section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import DividerContainerComp from "@components/common/divider/common-divider.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "common-home-page-container-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-section-container-component": SectionContainerComp,
		"common-card-grid-container-component": CardGridContainerComp,
	},
	data() {
		return {
			homePage: {
				canvas: {
					card: {
						actions: {
							buttons: {
								seeRecentPortfolio: {
									text: "See recent portfolio?"
								}
							}
						}
					}
				}
			}
		};
	},
	computed: {
		computed_img_canvas(): string {
			return CanvasPNG;
		},
	},
	methods: {
		method_event_scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID.offsetTop,
					behavior: "smooth",
				});
			}
		},
	},
});
</script>
