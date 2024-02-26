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
										<h1>All Treatments</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Explore our entire collection of treatments.</h3>
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
										text="See our treatments?"
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
	<v-divider class="text-accent" thickness="4" style="opacity: 1 !important"></v-divider>

	<section-container-component
		id="section-treatments"
		class="bg-default"
		class_title="text-inverted"
		title="All our Treatments"
	>
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<!-- Filter options -->
					<v-col cols="12">
						<v-sheet class="d-flex flex-wrap justify-center align-center" elevation="0">
							<v-chip-group filter mandatory selected-class="text-accent" v-model="data_selectedChips">
								<v-chip
									class="bg-default text-capitalize"
									:key="index"
									v-for="(treatment, index) in data_treatmentCategories"
								>
									{{ treatment.category }}
								</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>

					<!-- Notes -->
					<v-col cols="12">
						<h5 class="text-left text-inverted" v-if="data_treatmentCategories[data_selectedChips].note">
							Please note:
							<span class="text-inverted font-italic">
								{{ data_treatmentCategories[data_selectedChips].note }}
							</span>
						</h5>
					</v-col>

					<!-- Treatment options -->
					<v-col>
						<v-container fluid>
							<v-row dense class="d-flex justify-center align-center">
								<template v-for="treatmentType in data_treatmentTypes">
									<v-col
										cols="12"
										md="6"
										lg="4"
										xl="3"
										xxl="2"
										class="justify-center align-center"
										:style="{
											display:
												treatmentType.treatmentCategory === data_selectedChips ||
												data_selectedChips === 0
													? `flex`
													: `none`,
										}"
									>
										<v-card
											variant="outlined"
											class="pa-2 w-100 flex-column justify-space-between align-center"
											:min-width="treatmentCardMinWidth"
											:max-width="treatmentCardMaxWidth"
											:height="treatmentCardHeight"
											:style="{
												display:
													treatmentType.treatmentCategory === data_selectedChips
														? `flex`
														: `none`,
											}"
										>
											<v-card-item class="w-100">
												<v-card-title
													class="d-flex flex-row justify-center align-center text-wrap"
												>
													<h4 class="text-inverted">{{ treatmentType.title }}</h4>
													<v-tooltip
														text="x1 represents the amount of sessions, e.g. x5 = 5 sessions."
													>
														<template v-slot:activator="{ props }">
															<v-btn
																density="compact"
																elevation="0"
																color="accent"
																:ripple="false"
																:icon="icon_treatmentCardInformation"
																v-bind="props"
															></v-btn>
														</template>
													</v-tooltip>
												</v-card-title>
												<v-card-subtitle class="text-wrap text-center">
													<v-chip-group
														filter
														mandatory
														selected-class="text-accent"
														class="d-flex justify-center"
														v-model="treatmentType.price.selected"
													>
														<v-chip
															size="small"
															class="text-inverted"
															:key="index"
															v-for="(price, index) in treatmentType.price.treatment"
														>
															{{ price + " " }}
														</v-chip>
													</v-chip-group>
													<p class="text-left" v-if="treatmentType.includes">
														<span class="text-inverted font-weight-bold">Includes: </span>
														<small class="text-inverted text-uppercase">{{
															treatmentType.includes
														}}</small>
													</p>
													<p class="text-left">
														<span class="text-inverted font-weight-bold">Duration: </span>
														<small class="text-inverted">
															{{
																treatmentType.time > 60
																	? `${Math.floor(treatmentType.time / 60)} hour`
																	: `${treatmentType.time} mins`
															}}
															{{
																treatmentType.time > 60
																	? `${
																			((treatmentType.time / 60) % 1) * 60 === 0
																				? ""
																				: ((treatmentType.time / 60) % 1) * 60
																	  } mins`
																	: ""
															}}
														</small>
													</p>
													<p class="text-left">
														<span class="text-inverted font-weight-bold"
															>Consultation:
														</span>
														<small class="text-inverted">
															{{
																treatmentType.price.consultation === 0
																	? "Free"
																	: `£${treatmentType.price.consultation}`
															}}
														</small>
													</p>
												</v-card-subtitle>
											</v-card-item>
											<v-card-actions class="w-100">
												<v-spacer></v-spacer>
												<v-btn width="100" height="50" class="bg-accent text-default"
													>Book</v-btn
												>
												<v-spacer></v-spacer>
											</v-card-actions>
										</v-card>
									</v-col>
								</template>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component>
</template>

<script lang="ts">
/*
<v-scroll-y-transition>
	<h3>{{ isSelected ? "Selected" : "Click Me!" }}</h3>
</v-scroll-y-transition>
*/
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

// Icons
import { mdiInformationVariant } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

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
				{
					category: "Non Surgical Body Treatments",
					note: "Sessions have to be 7-14 days between one another.",
				},
				{
					category: "Non Surgical Face Treatments",
					note: "Sessions have to be 7-14 days between one another. Excluding BFL+.",
				},
				{
					category: "Body Treatments",
					note: "",
				},
				{
					category: "Additional Treatments",
					note: "",
				},
				{
					category: "Packages",
					note: "",
				},
			],
			data_treatmentTypes: [
				{
					title: "Brazilian Booty Lift",
					price: {
						consultation: 0,
						treatment: ["x1: £125", "x3: £350", "x5: £499"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Tummy Tuck",
					price: {
						consultation: 0,
						treatment: ["x1: £125", "x3: £350", "x5: £499"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Love Handles",
					price: {
						consultation: 0,
						treatment: ["x1: £110", "x3: £300", "x5: £439"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Bra Fat",
					price: {
						consultation: 0,
						treatment: ["x1: £110", "x3: £300", "x5: £439"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Bingo Wings",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £250", "x5: £359"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Thigh Gap",
					price: {
						consultation: 0,
						treatment: ["x1: £100", "x3: £275", "x5: £399"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Front Thigh",
					price: {
						consultation: 0,
						treatment: ["x1: £100", "x3: £275", "x5: £399"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Calves",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £250", "x5: £359"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Breast Lift",
					price: {
						consultation: 0,
						treatment: ["x1: £60", "x3: £160", "x5: £239"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 0,
				},
				{
					title: "Breast Lift +",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £250", "x5: £359"],
						selected: 0,
					},
					time: 60,
					treatmentCategory: 0,
				},
				{
					title: "Brazilian Face Lift",
					price: {
						consultation: 0,
						treatment: ["x1: £110", "x3: £300", "x6: £549"],
						selected: 0,
					},
					time: 60,
					treatmentCategory: 1,
				},
				{
					title: "Brazilian Face Lift +",
					price: {
						consultation: 0,
						treatment: ["x1: £130", "x3: £360", "x6: £649"],
						selected: 0,
					},
					time: 90,
					treatmentCategory: 1,
				},
				{
					title: "Jaw + Double Chin",
					price: {
						consultation: 0,
						treatment: ["x1: £70", "x3: £180", "x6: £349"],
						selected: 0,
					},
					time: 45,
					treatmentCategory: 1,
				},
				{
					title: "Jaw + Cheek Sculpt",
					price: {
						consultation: 0,
						treatment: ["x1: £65", "x3: £170", "x6: £325"],
						selected: 0,
					},
					time: 45,
					treatmentCategory: 1,
				},
				{
					title: "Full Face Rejuvenation",
					price: {
						consultation: 0,
						treatment: ["x1: £65", "x3: £170", "x6: £325"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Wrinkle Reduction",
					price: {
						consultation: 0,
						treatment: ["x1: £40", "x3: £100", "x6: £199"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Chest Add On",
					price: {
						consultation: 0,
						treatment: ["x1: £20", "x3: £50", "x6: £80"],
						selected: 0,
					},
					time: 15,
					treatmentCategory: 1,
				},
				{
					title: "Brow Lift",
					price: {
						consultation: 0,
						treatment: ["x1: £10", "x3: £25", "x6: £40"],
						selected: 0,
					},
					time: 15,
					treatmentCategory: 1,
				},
				{
					title: "Detox Body Wrap",
					price: {
						consultation: 0,
						treatment: ["x1: £20", "x3: £50", "x5: £80"],
						selected: 0,
					},
					time: 15,
					treatmentCategory: 2,
				},
				{
					title: "Lipo Lean Body Wrap",
					price: {
						consultation: 0,
						treatment: ["x1: £30", "x3: £80", "x5: £130"],
						selected: 0,
					},
					time: 15,
					treatmentCategory: 2,
				},
				{
					title: "Sauna Blanket Detox Body Wrap",
					price: {
						consultation: 0,
						treatment: ["x1: £60", "x3: £170", "x5: £270"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 2,
				},
				{
					title: "Sauna Blanket Lipo Lean Body Wrap",
					price: {
						consultation: 0,
						treatment: ["x1: £80", "x3: £220", "x5: £360"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 2,
				},
				{
					title: "Sauna Blanket + Another Treatment",
					price: {
						consultation: 0,
						treatment: ["x1: £20", "x3: £50", "x5: £80"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 2,
				},
				{
					title: "Skin Tightening",
					price: {
						consultation: 0,
						treatment: ["x1: £60", "x3: £150", "x6: £239"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Skin Tightening +",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £240", "x6: £359"],
						selected: 0,
					},
					time: 60,
					treatmentCategory: 3,
				},
				{
					title: "Stretch Mark Reduction",
					price: {
						consultation: 0,
						treatment: ["x1: £50", "x3: £120", "x6: £249"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Cellulite Blasting",
					price: {
						consultation: 0,
						treatment: ["x1: £60", "x3: £150", "x6: £239"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Cellulite Blasting +",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £240", "x6: £359"],
						selected: 0,
					},
					time: 60,
					treatmentCategory: 3,
				},
				{
					title: "Fat Melting",
					price: {
						consultation: 0,
						treatment: ["x1: £50", "x3: £120", "x6: £249"],
						selected: 0,
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Fat Melting +",
					price: {
						consultation: 0,
						treatment: ["x1: £90", "x3: £240", "x6: £359"],
						selected: 0,
					},
					time: 60,
					treatmentCategory: 3,
				},
				{
					title: "360 Treatment",
					includes: "Tummy, Lower back & Hip melt.",
					price: {
						consultation: 0,
						treatment: ["x1: £250", "x3: £625", "x5: £999"],
						selected: 0,
					},
					time: 180,
					treatmentCategory: 4,
				},
				{
					title: "Legs For Days",
					includes: "Booty, Thigh gap & Front thigh.",
					price: {
						consultation: 0,
						treatment: ["x1: £250", "x3: £625", "x5: £999"],
						selected: 0,
					},
					time: 180,
					treatmentCategory: 4,
				},
				{
					title: "EBL Special",
					includes: "Booty, Tummy & Back.",
					price: {
						consultation: 0,
						treatment: ["x1: £300", "x3: £750", "x5: £1199"],
						selected: 0,
					},
					time: 180,
					treatmentCategory: 4,
				},
			],
			data_selectedChips: 0,
		};
	},
	computed: {
		/* CSS */
		treatmentCardMinWidth(): string {
			let retVal: string = "100%";
			if (this.$vuetify.display.lgAndUp) retVal = "400px";
			return retVal;
		},
		treatmentCardMaxWidth(): string {
			let retVal: string = "100%";
			return retVal;
		},
		treatmentCardHeight(): string {
			let retVal: string = "250px";
			if (this.$vuetify.display.smAndUp) retVal = "300px";
			if (this.$vuetify.display.lgAndUp) retVal = "350px";
			return retVal;
		},

		/* IMGs */
		img_canvas(): string {
			return CanvasPNG;
		},

		/* Icons */
		icon_treatmentCardInformation(): string {
			return mdiInformationVariant;
		},

		/* Data */
		data_appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
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
