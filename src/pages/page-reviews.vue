<template>
	<common-canvas-container-component :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" :style="computed_css_canvas_cardBackgroundOpacity">
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
									:id="computed_id_canvasCard_actions_btn"
									:text="computed_text_canvasCard_actions_btn"
									@click="method_event_scrollToElement('section-reviews')"
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
		id="section-reviews"
		title-class="text-inverted"
		:title="computed_text_section_title"
	>
		<template #section-content>
			<v-sheet elevation="0">
				<v-slide-group center-active v-model="computed_data_section_content_selectedReviewIndex_value">
					<v-slide-group-item
						:key="index"
						v-for="(review, index) in computed_data_section_content_reviews_items"
						v-slot="{ toggle }"
					>
						<common-card-container-component
							color="accent"
							:width="computed_css_section_content_reviewCardDynamicWidth"
							:height="computed_css_section_content_reviewCardDynamicHeight"
							:class="method_utils_section_content_reviewCard_class(index)"
							@click="toggle"
						>
							<template #card-content>
								<v-col style="max-height: 100%">
									<v-container fluid class="pa-0 h-100 d-flex flex-column">
										<!-- Name and date -->
										<v-row class="d-flex flex-shrink-1 flex-grow-0">
											<v-col cols="6" class="text-center">
												<p class="font-weight-bold">{{ review.name }}</p>
											</v-col>
											<v-col cols="6" class="text-center">
												<p class="font-weight-bold">{{ review.date }}</p>
											</v-col>
										</v-row>

										<!-- Rating -->
										<v-row class="d-flex flex-shrink-1 flex-grow-0">
											<v-col cols="12" class="pa-0 d-flex justify-center">
												<v-rating
													readonly
													half-increments
													size="x-small"
													:model-value="review.rating"
												></v-rating>
											</v-col>
										</v-row>

										<!-- Message -->
										<v-row class="d-flex overflow-y-auto">
											<v-col class="ma-2">
												<p>{{ review.message }}</p>
											</v-col>
										</v-row>
									</v-container>
								</v-col>
							</template>
						</common-card-container-component>
					</v-slide-group-item>
				</v-slide-group>
			</v-sheet>
		</template>
	</common-section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import DividerContainerComp from "@components/common/divider/common-divider.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";

// Constants
import { btnIDs } from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "reviews-page-container-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-section-container-component": SectionContainerComp,
	},
	data() {
		return {
			reviewsPage: {
				canvas: {
					card: {
						headings: {
							title: "Our reviews",
							subtitle: "See what other people are saying about us?",
						},
						actions: {
							buttons: {
								seeOurReviews: {
									id: btnIDs.pages.reviews.canvas.btn.id,
									text: "See our reviews?",
								},
							},
						},
					},
				},
				section: {
					title: "All reviews",
					reviews: {
						value: 0,
						items: [
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
							{
								name: "Chloe",
								date: "01/05/2023",
								rating: 3.5,
								message: `Whatever message she put. A longer message to test things today. Other message stuff. 
						More about the review is that it sucks ass. Don't buy it. Now sure how much longer I can write.
						Let's write some more things about nothing so that I can test how large the card is. It keeps getting
						larger and I am not sure when it is supposed to stop. Maybe if I write a little longer, I might find the max
						height for the card?'`,
							},
						],
					},
				},
			},
		};
	},
	computed: {
		computed_id_canvasCard_actions_btn(): string {
			return this.reviewsPage.canvas.card.actions.buttons.seeOurReviews.id;
		},

		computed_text_canvas_cardTitle(): string {
			return this.reviewsPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.reviewsPage.canvas.card.headings.subtitle;
		},
		computed_text_canvasCard_actions_btn(): string {
			return this.reviewsPage.canvas.card.actions.buttons.seeOurReviews.text;
		},
		computed_text_section_title(): string {
			return this.reviewsPage.section.title;
		},

		computed_css_section_content_reviewCardDynamicWidth(): string {
			let retVal: string = "300";
			if (this.$vuetify.display.smAndUp) retVal = "380";
			if (this.$vuetify.display.xxl) retVal = "500";
			return retVal;
		},
		computed_css_section_content_reviewCardDynamicHeight(): string {
			let retVal: string = "300";
			if (this.$vuetify.display.mdAndUp) retVal = "400";
			if (this.$vuetify.display.xxl) retVal = "500";
			return retVal;
		},

		computed_css_canvas_cardBackgroundOpacity(): string {
			return "background-color: rgba(0, 0, 0, 0.3)";
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_data_section_content_reviews_items(): any {
			return this.reviewsPage.section.reviews.items;
		},
		computed_data_section_content_selectedReviewIndex_value: {
			get(): number {
				return this.reviewsPage.section.reviews.value;
			},
			set(newValue: number): void {
				this.reviewsPage.section.reviews.value = newValue;
			},
		},
	},
	methods: {
		method_event_scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID!.offsetTop,
					behavior: "smooth",
				});
			}
		},

		method_utils_section_content_reviewCard_class(index: number): any {
			let retval: any = [];
			if (index !== this.computed_data_section_content_reviews_items.length - 1) {
				retval.push("mr-4");
			}
			return retval;
		},
	},
});
</script>
