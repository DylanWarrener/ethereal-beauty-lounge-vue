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
			<v-container fluid class="text-inverted" style="border: 2px solid black">
				<v-row dense style="border: 2px solid red">
					<v-col cols="12" style="border: 2px solid blue">
						<v-sheet width="100%">
							<v-slide-group center-active show-arrows class="pa-4" v-model="reviews.value">
								<v-slide-group-item
									:key="index"
									v-slot="{ isSelected, toggle }"
									v-for="(review, index) in reviews.items"
								>
									<v-card class="pa-4 ma-4 bg-accent" height="200" width="200" @click="toggle">
										<p>{{ review.name }}</p>
										<span>
											<time>
												{{ review.date }}
											</time>
										</span>
										<v-rating
											readonly
											half-increments
											class="py-4 w-100"
											active-color="accent"
											density="compact"
											v-model="review.rating"
										></v-rating>
										<p>{{ review.message }}</p>
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
				value: null,
				items: [
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
					{
						name: "Chloe",
						date: "Monday 1st Feburary 2023",
						rating: 3.5,
						message: "Whatever message she put",
					},
				],
			},
		};
	},
	computed: {
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
