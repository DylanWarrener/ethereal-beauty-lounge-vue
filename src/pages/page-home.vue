<template>
	<container-canvas :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card 
							variant="flat" 
							:style="computed_css_canvas_cardBackgroundOpacity"
							:card-title="computed_text_canvas_cardTitle"
							:card-subtitle="computed_text_canvas_cardSubtitle">
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="flat"
									:text="computed_text_canvas_cardBtnText"
									@click="method_event_scrollToElement"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section
		id="section-portfolio"
		title-class="text-inverted"
		subtitle-class="text-inverted"
		:title="computed_text_section_title"
		:subtitle="computed_text_section_subtitle"
	>
		<template #section-content>
			<common-card-grid-container-component></common-card-grid-container-component>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "common-home-page-container-component",
	components: {
		"common-card-grid-container-component": CardGridContainerComp,
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

		computed_css_canvas_cardBackgroundOpacity(): string {
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
