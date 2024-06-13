<template>
	<common-canvas-container-component :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" :style="computed_css_canvasCardBackgroundOpacity">
							<template #card-headings>
								<!-- Title -->
								<v-col cols="12">
									<h1 v-text="computed_text_canvas_cardTitle"></h1>
								</v-col>

								<!-- Subtitle -->
								<v-col cols="12">
									<h3 v-text="computed_text_canvas_cardSubtitle"></h3>
								</v-col>
							</template>
							<template #card-actions>
								<v-spacer></v-spacer>
								<common-btn-container-component
									variant="flat"
									:text="computed_text_canvas_cardBtnText"
									@click="method_event_scrollToElement"
								></common-btn-container-component>
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
		:title="computed_text_section_title"
		:subtitle="computed_text_section_subtitle"
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
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import DividerContainerComp from "@components/common/divider/common-divider.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "common-home-page-container-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-card-grid-container-component": CardGridContainerComp,
		"common-section-container-component": SectionContainerComp,
	},
	data() {
		return {
			homePage: {
				canvas: {
					card: {
						headings: {
							title: "Where Beauty Radiates With Delicacy",
							subtitle: "Transform your look with our non-invasive treatments for the face & body.",
						},
						actions: {
							buttons: {
								seeRecentPortfolio: {
									text: "See recent portfolio?",
								},
							},
						},
					},
				},
				section: {
					title: "Portfolio: most recent",
					subtitle: "Letting Beauty Take Flight So You Don't Have To",
				},
			},
		};
	},
	computed: {
		computed_text_canvas_cardTitle(): string {
			return this.homePage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.homePage.canvas.card.headings.subtitle;
		},
		computed_text_canvas_cardBtnText(): string {
			return this.homePage.canvas.card.actions.buttons.seeRecentPortfolio.text;
		},
		computed_text_section_title(): string {
			return this.homePage.section.title;
		},
		computed_text_section_subtitle(): string {
			return this.homePage.section.subtitle;
		},

		computed_css_canvasCardBackgroundOpacity(): string {
			return "background-color: rgba(0, 0, 0, 0.3)";
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},
	},
	methods: {
		method_event_scrollToElement(): void {
			const targetElementID: HTMLDivElement = document.getElementById("section-portfolio") as HTMLDivElement;

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
