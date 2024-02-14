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
										<h1>All Treatments</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap" style="border: 2px solid blue">
										<h3>Some subtitle about treatments</h3>
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
										text="See all treatments?"
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
	<section-container-component id="section-treatments" class="bg-accent" title="All Online Appointments">
		<template #section-content>
			<v-container fluid style="border: 2px solid black">
				<v-row dense style="border: 2px solid red">
					<!-- Filter options -->
					<v-col cols="12" style="border: 2px solid blue">
						<v-sheet class="py-4 px-1 w-100 d-flex justify-center align-center bg-accent" elevation="0">
							<v-chip-group
								filter
								multiple
								selected-class="text-black"
								:key="index"
								v-model="data_selectedChips"
								v-for="(treatment, index) in data_treatmentCategories"
							>
								<v-chip>{{ treatment }}</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>
					<!-- Treatment options -->
					<v-col style="border: 2px solid blue">
						<v-item-group selected-class="bg-primary" style="border: 2px solid black">
							<v-container fluid style="border: 2px solid red">
								<v-row dense style="border: 2px solid green">
									<v-col>
										<v-item v-slot="{ isSelected, selectedClass, toggle }">
											<v-card
												variant="outlined"
												:class="[
													'd-flex flex-column justify-center align-center',
													selectedClass,
												]"
												height="200"
												@click="toggle"
											>
												<v-card-item>
													<v-card-title class="text-wrap" style="border: 2px solid green">
														<h4>Where Beauty Radiates With Delicacy</h4>
													</v-card-title>
													<v-card-subtitle class="text-wrap" style="border: 2px solid blue">
														<p>
															Transform your look with our non-invasive treatments for the
															face & body.
														</p>
													</v-card-subtitle>
												</v-card-item>
												<!-- <v-scroll-y-transition>
													<h3>{{ isSelected ? "Selected" : "Click Me!" }}</h3>
												</v-scroll-y-transition> -->
											</v-card>
										</v-item>
									</v-col>
								</v-row>
							</v-container>
						</v-item-group>
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

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "treatments-page-component",
	components: {
		"canvas-container-component": CanvasContainerComp,
		"card-container-component": CardContainerComp,
		"section-container-component": SectionContainerComp,
	},
	data() {
		return {
			data_treatmentCategories: [
				"Non Surgical Body Treatments",
				"Non Surgical Face Treatments / Facials",
				"Sauna Blanket & Wraps",
				"Additional Treatments",
			],
			data_treatmentTypes: {
				brazilianBootyLift: {
					title: "Brazilian Booty Lift",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				tummyTuck: {
					title: "Tummy Tuck",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				bingoWingRemoval: {
					title: "Bingo Wing Removal",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				thighGaps: {
					title: "Thigh Gap",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				frontThigh: {
					title: "Front Thigh",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				braFat: {
					title: "Bra Fat",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				loveHandles: {
					title: "Love Handles",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				calves: {
					title: "Calves",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				breastLift: {
					title: "Breast Lift",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				brazilianFaceLift: {
					title: "Brazilian Face Lift",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				brazilianFaceLiftPlus: {
					title: "Brazilian Face Lift +",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
				eblFacial: {
					title: "EBL Facial",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					btnText: "",
					treatmentCategory: 0,
				},
			},
			data_selectedChips: [],
		};
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
			const targetElementID: HTMLDivElement = document.getElementById("section-treatments") as HTMLDivElement;

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
