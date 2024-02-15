<template>
	<canvas-container-component :src="img_canvas">
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
					The selected chips: {{ data_selectedChips }}
					<!-- Filter options -->
					<v-col cols="12" style="border: 2px solid blue">
						<v-sheet class="w-100 d-flex flex-wrap justify-center align-center bg-accent" elevation="0">
							<v-chip-group	
								filter
								mandatory
								selected-class="text-black"
								v-model="data_selectedChips"
							>
								<v-chip :key="index" v-for="(treatment, index) in data_treatmentCategories">{{ treatment }}</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>
					<!-- Treatment options -->
					<v-col style="border: 2px solid blue">
						<v-item-group selected-class="bg-primary" style="border: 2px solid black">
							<v-container fluid style="border: 2px solid red">
								<v-row dense class="d-flex justify-center align-center" style="border: 2px solid green">
									<v-col class="d-flex justify-center align-center" style="min-width: 400px; max-width: 600px; border: 2px solid yellow" :key="index" v-show="treatment.treatmentCategory === data_selectedChips" v-for="(treatment, index) in data_treatmentTypes">
										<v-item v-slot="{ isSelected, selectedClass, toggle }">
											<v-card
												variant="outlined"
												class="w-100 d-flex flex-column justify-center align-center"
												:class="selectedClass"
												height="200"
												@click="toggle"
											>
												<v-card-item>
													<v-card-title class="text-wrap" style="border: 2px solid green">
														<h4>{{ treatment.title }}</h4>
													</v-card-title>
													<v-card-subtitle class="text-wrap text-center" style="border: 2px solid blue">
														<p>{{ treatment.subtitle.timeToComplete }} mins | Consultation - {{ treatment.subtitle.consultationPrice === 0 ? "Free" : treatment.subtitle.consultationPrice }}</p>
													</v-card-subtitle>
												</v-card-item>
												<!-- <v-btn variant="text">Book</v-btn> -->
												<!-- <v-scroll-y-transition>
													<h3>{{ isSelected ? "Selected" : "Click Me!" }}</h3>
												</v-scroll-y-transition> -->
												<p>Treatment type: {{  treatment.treatmentCategory }}</p>
												<p>Is selected chip = 0? {{ data_selectedChips === 0 }}</p>
												<p>Is selected chip the same as treatment type? {{ treatment.treatmentCategory === data_selectedChips }}</p>
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
				"All treatments",
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
					treatmentCategory: 1,
				},
				tummyTuck: {
					title: "Tummy Tuck",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				bingoWingRemoval: {
					title: "Bingo Wing Removal",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				thighGaps: {
					title: "Thigh Gap",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				frontThigh: {
					title: "Front Thigh",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				braFat: {
					title: "Bra Fat",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				loveHandles: {
					title: "Love Handles",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				calves: {
					title: "Calves",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				breastLift: {
					title: "Breast Lift",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 1,
				},
				brazilianFaceLift: {
					title: "Brazilian Face Lift",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 2,
				},
				brazilianFaceLiftPlus: {
					title: "Brazilian Face Lift +",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 2,
				},
				eblFacial: {
					title: "EBL Facial",
					subtitle: {
						timeToComplete: 15,
						consultationPrice: 0,
						treatmentPrice: 0,
					},
					treatmentCategory: 2,
				},
			},
			data_selectedChips: 0,
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
		}
	},
	methods: {
		/* Utils */
		scrollToElement(): void {
			const targetElementID: HTMLDivElement = document.getElementById("section-treatments") as HTMLDivElement;

			window.scrollTo({
				top: targetElementID!.offsetTop - this.data_appBarHeight,
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
