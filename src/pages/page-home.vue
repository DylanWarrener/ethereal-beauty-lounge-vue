<template>
	<container-canvas>
		<template #canvas-content>
			<v-container fluid class="pa-0" style="border: 4px solid black">
				<v-row dense class="pa-0 h-100 d-flex justify-center">
					<v-col class=""></v-col>
					<v-col class="bg-accent"></v-col>
					<div tag="img" :style="computed_css_canvas_imgBackground_style"></div>
					<div :style="computed_css_canvas_card_style">
						<container-card
							variant="flat"
							color="primary"
							width="100%"
							height="100%"
							:card-title="computed_text_canvas_cardTitle"
						>
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="flat"
									color="accent"
									to="/treatments"
									:text="computed_text_canvas_cardBtnText"
								></container-btn>
								<v-spacer></v-spacer>
							</template>
						</container-card>
					</div>

					<div style="position: absolute; bottom: 2%">
						<v-hover>
							<template #default="{ isHovering, props: hoverProps }">
								<v-tooltip text="Scroll to recent portfolio">
									<template #activator="{ props: tooltipProps }">
										<container-btn
											id="scroll_down_btn"
											color="primary"
											size="large"
											:class="isHovering ? 'scroll_down_btn' : ''"
											:icon="computed_icon_canvas_actions_btnSeeRecentPortfolio"
											@click="method_utils_scrollToElement('section-portfolio')"
											v-bind="mergeProps(hoverProps, tooltipProps)"
										></container-btn>
									</template>
								</v-tooltip>
							</template>
						</v-hover>
					</div>

					<v-col cols="12" md="8">
						<container-card
							variant="flat"
							:card-title="computed_text_canvas_cardTitle"
							:card-subtitle="computed_text_canvas_cardSubtitle"
						>
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="flat"
									color="accent"
									:text="computed_text_canvas_cardBtnText"
									@click="method_utils_scrollToElement"
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
		container-style="padding: 0"
		:title="computed_text_section_title"
		:subtitle="computed_text_section_subtitle"
	>
		<template #section-content>
			<common-card-grid-container-component></common-card-grid-container-component>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent, mergeProps } from "vue";

// Components
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

import { mdiArrowDownThick } from "@mdi/js";

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
								bookATreatment: {
									text: "Book a treatment",
								},
							},
						},
					},
					actions: {
						buttons: {
							seeRecentPortfolio: {
								icon: mdiArrowDownThick
							},
						}
					}
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
			return this.homePage.canvas.card.actions.buttons.bookATreatment.text;
		},
		computed_text_section_title(): string {
			return this.homePage.section.title;
		},
		computed_text_section_subtitle(): string {
			return this.homePage.section.subtitle;
		},

		computed_css_canvas_imgBackground_style(): string {
			let retval: string = "position: absolute; outline: 15px solid white; background-image: url('Designer.png'); background-size: cover; background-position: center;";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retval += "width: 100px; height: 100px; top: 0%; left: 0%"
					break;
			}
			return retval;
		},
		computed_css_canvas_card_style(): string {
			let retval: string = "position: absolute;";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retval += "width: 100px; height: 100px; top: 0%; left: 0%"
					break;
			}
			return retval;
		},

		computed_icon_canvas_actions_btnSeeRecentPortfolio(): string {
			return this.homePage.canvas.actions.buttons.seeRecentPortfolio.icon;
		},
	},
	methods: {
		mergeProps,
		method_utils_scrollToElement(section: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(section) as HTMLDivElement;

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

<style lang="scss">
@keyframes bounce {
  from { transform: translateY(10%); }
  to { transform: translateY(-10%); }
}

.scroll_down_btn {
	.v-btn__content {
		.v-icon {
			transform: translateY(0%);
			animation-name: bounce;
			animation-duration: 1s;
			animation-iteration-count: infinite;
		}
	}
}
</style>
