<template>
	<canvas-container-component :src="img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1>All reviews</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>See what other people are saying about us?</h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<v-btn
										variant="flat"
										size="large"
										color="accent"
										text="See all reviews?"
										@click="scrollToElement('section-reviews')"
									></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<v-divider class="text-accent" thickness="4" style="opacity: 1 !important"></v-divider>

	<section-container-component
		id="section-reviews"
		class="bg-default"
		class_title="text-inverted"
		title="All reviews"
	>
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<v-col cols="12">
						<v-sheet class="w-100 h-100 d-flex">
							<v-slide-group center-active class="pa-4 h-100" v-model="reviews.value">
								<v-slide-group-item
									:key="index"
									v-slot="{ toggle }"
									v-for="(review, index) in reviews.items"
								>
									<v-card
										class="bg-accent d-flex flex-wrap"
										:width="dynamicWidth"
										:height="dynamicHeight"
										:class="index !== reviews.items.length - 1 ? 'mr-4' : ''"
										@click="toggle"
									>
										<v-container fluid class="d-flex" style="max-height: 100%">
											<v-row dense class="d-flex flex-row overflow-x-hidden overflow-y-auto">
												<v-col
													cols="12"
													sm="6"
													class="d-flex"
													:class="`${
														$vuetify.display.smAndUp ? 'justify-center' : 'justify-start'
													}`"
												>
													<p class="font-weight-bold">{{ review.name }}</p>
												</v-col>
												<v-col
													cols="12"
													sm="6"
													class="d-flex font-weight-bold"
													:class="`${
														$vuetify.display.smAndUp ? 'justify-center' : 'justify-start'
													}`"
												>
													<span>
														<time>
															{{ review.date }}
														</time>
													</span>
												</v-col>
												<v-col cols="12" class="pa-0 my-2">
													<v-rating
														readonly
														half-increments
														class="w-100 d-flex"
														color="white"
														size="x-small"
														:class="`${
															$vuetify.display.smAndUp
																? 'justify-center'
																: 'justify-start'
														}`"
														v-model="review.rating"
													></v-rating>
												</v-col>
												<v-col cols="12">
													<p>{{ review.message }}</p>
												</v-col>
											</v-row>
										</v-container>
									</v-card>
								</v-slide-group-item>
							</v-slide-group>
						</v-sheet>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
import useAboutStore from "@stores/store-about.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "reviews-page-container-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
		"section-container-component": SectionContainerComp,
	},
	data() {
		return {
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
		};
	},
	computed: {
		/* CSS */
		dynamicWidth(): string {
			let retVal: string = "210";
			if (this.$vuetify.display.smAndUp) retVal = "300";
			if (this.$vuetify.display.mdAndUp) retVal = "340";
			if (this.$vuetify.display.lgAndUp) retVal = "380";
			if (this.$vuetify.display.xlAndUp) retVal = "420";
			return retVal;
		},
		dynamicHeight(): string {
			let retVal: string = "210";
			if (this.$vuetify.display.smAndUp) retVal = "240";
			if (this.$vuetify.display.mdAndUp) retVal = "270";
			if (this.$vuetify.display.lgAndUp) retVal = "300";
			if (this.$vuetify.display.xlAndUp) retVal = "330";
			return retVal;
		},

		/* IMGs */
		img_canvas(): string {
			return CanvasPNG;
		},

		/* Data */
		data_appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
		data_isAppBarActive(): boolean {
			return this.storeCommon.getAppBarDrawer;
		},
	},
	methods: {
		/* Utils */
		scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				if (this.data_isAppBarActive) {
					window.scrollTo({
						top: targetElementID!.offsetTop - this.data_appBarHeight,
						behavior: "smooth",
					});
				} else {
					window.scrollTo({
						top: targetElementID!.offsetTop,
						behavior: "smooth",
					});
				}
			}
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeAbout = useAboutStore();
		return { storeCommon, storeAbout };
	},
});
</script>
