<template>
	<canvas-container-component :src="canvasIMG">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
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
										size="large"
										color="accent"
										text="See recent portfolio?"
										@click="scrollToElement('section-portfolio')"
									></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
						is user logged in? {{ isUserLoggedIn }}
						<!-- <p v-if="user">
							Monitoring user data...
							<br />
							User data: {{ user }}
						</p> -->
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<v-divider color="accent" thickness="4" style="opacity: 1 !important"></v-divider>

	<section-container-component
		id="section-portfolio"
		class_title="text-inverted"
		class_subtitle="text-inverted"
		title="Portfolio: most recent"
		subtitle="Letting Beauty Take Flight So You Don't Have To"
	>
		<template #section-content>
			<card-grid-container-component></card-grid-container-component>
		</template>
	</section-container-component>
	<!-- <v-divider class="text-accent bg-accent" thickness="4" style="opacity: 1 !important"></v-divider>
	<section-container-component
		id="section-recent-reviews"
		class_title="text-inverted"
		class_subtitle="text-inverted"
		title="Reviews: Most recent"
		subtitle="See what our latest customers are saying."
	>
		<template #section-content>
			<v-container fluid style="border: 4px solid black">
				<v-row dense style="border: 4px solid red">
					<v-col style="border: 4px solid blue"> </v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
import CardGridContainerComp from "@components/common/card/grid/common-card-grid.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "home-page-container-component",
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
		data_appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
		data_isAppBarActive(): boolean {
			return this.storeCommon.getAppBarDrawer;
		},

		isUserLoggedIn(): boolean {
			return this.storeCommon.isUserLoggedIn();
		},
		// user(): { firstname: string; lastname: string; email: string } {
		// 	debugger;
		// 	const user = this.storeCommon.getUser();
		// 	return user;
		// },
	},
	methods: {
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
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
