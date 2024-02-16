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
	<section-container-component
		id="section-treatments"
		class="bg-default"
		class_title="text-inverted"
		title="All Online Appointments"
	>
		<template #section-content>
			<v-container fluid class="text-inverted" style="border: 2px solid black">
				<v-row dense style="border: 2px solid red">
					<p style="color: rgb(var(--v-theme-inverted))">The selected chips: {{ data_selectedChips }}</p>
					<!-- Filter options -->
					<v-col cols="12" style="border: 2px solid blue">
						<v-sheet
							class="d-flex flex-wrap justify-center align-center"
							elevation="0"
							style="border: 2px solid green"
						>
							<v-chip-group filter mandatory selected-class="text-accent" v-model="data_selectedChips">
								<v-chip
									class="bg-default text-capitalize"
									:key="index"
									v-for="(treatment, index) in data_treatmentCategories"
								>
									{{ treatment }}
								</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>
					<!-- Treatment options -->
					<v-col style="border: 2px solid blue">
						<v-container fluid style="border: 2px solid red">
							<v-row dense class="d-flex justify-center align-center" style="border: 2px solid green">
								<template v-for="treatment in data_treatmentTypes">
									<v-col
										cols="12"
										sm="6"
										lg="4"
										xl="3"
										xxl="2"
										class="justify-center align-center"
										:style="{
											display:
												treatment.treatmentCategory === data_selectedChips ||
												data_selectedChips === 0
													? `flex`
													: `none`,
										}"
									>
										<v-card
											variant="outlined"
											class="pa-2 w-100 flex-column justify-space-evenly align-center"
											:height="treatmentCardHeight"
											:style="{
												display:
													treatment.treatmentCategory === data_selectedChips ||
													data_selectedChips === 0
														? `flex`
														: `none`,
											}"
										>
											<v-card-item>
												<v-card-title class="text-wrap" style="border: 2px solid green">
													<h4 class="text-inverted">{{ treatment.title }}</h4>
												</v-card-title>
												<v-card-subtitle
													class="text-wrap text-center"
													style="border: 2px solid blue"
												>
													<span class="text-inverted">
														{{ treatment.time }} mins | Consultation -
														{{
															treatment.price.consultation === 0
																? "Free"
																: `£${treatment.price.consultation}`
														}}
													</span>
												</v-card-subtitle>
											</v-card-item>
											<v-btn color="accent">Book</v-btn>
											<!-- <v-scroll-y-transition>
													<h3>{{ isSelected ? "Selected" : "Click Me!" }}</h3>
												</v-scroll-y-transition> -->
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
				"All Treatments",
				"Non Surgical Body Treatments",
				"Non Surgical Face Treatments",
				"Body Treatments",
				"Additional Treatments",
				"Packages",
			],
			data_treatmentTypes: [
				{
					title: "Brazilian Booty Lift",
					price: {
						consultation: 0,
						treatment: [125, 350, 499],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Tummy Tuck",
					price: {
						consultation: 0,
						treatment: [125, 350, 499],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Love Handles Removal",
					price: {
						consultation: 0,
						treatment: [110, 300, 439],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Bra Fat Removal",
					price: {
						consultation: 0,
						treatment: [110, 300, 439],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Bingo Wings Removal",
					price: {
						consultation: 0,
						treatment: [90, 250, 359],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Thigh Gap Removal",
					price: {
						consultation: 0,
						treatment: [100, 275, 399],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Front Thigh Removal",
					price: {
						consultation: 0,
						treatment: [100, 275, 399],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Calves",
					price: {
						consultation: 0,
						treatment: [90, 250, 359],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Breast Lift",
					price: {
						consultation: 0,
						treatment: [60, 160, 239],
					},
					time: 30,
					treatmentCategory: 1,
				},
				{
					title: "Breast Lift +",
					price: {
						consultation: 0,
						treatment: [90, 250, 359],
					},
					time: 60,
					treatmentCategory: 1,
				},
				{
					title: "Brazilian Face Lift",
					price: {
						consultation: 0,
						treatment: [110, 300, 549],
					},
					time: 60,
					treatmentCategory: 2,
				},
				{
					title: "Brazilian Face Lift +",
					price: {
						consultation: 0,
						treatment: [130, 360, 649],
					},
					time: 90,
					treatmentCategory: 2,
				},
				{
					title: "Jaw + Double Chin",
					price: {
						consultation: 0,
						treatment: [70, 180, 349],
					},
					time: 45,
					treatmentCategory: 2,
				},
				{
					title: "Jaw + Cheek Sculpt",
					price: {
						consultation: 0,
						treatment: [65, 170, 325],
					},
					time: 45,
					treatmentCategory: 2,
				},
				{
					title: "Full Face Rejuvenation",
					price: {
						consultation: 0,
						treatment: [65, 170, 325],
					},
					time: 30,
					treatmentCategory: 2,
				},
				{
					title: "Wrinkle Reduction",
					price: {
						consultation: 0,
						treatment: [40, 100, 199],
					},
					time: 30,
					treatmentCategory: 2,
				},
				{
					title: "Chest Add On",
					price: {
						consultation: 0,
						treatment: [20, 50, 80],
					},
					time: 15,
					treatmentCategory: 2,
				},
				{
					title: "Brow Lift",
					price: {
						consultation: 0,
						treatment: [10, 25, 40],
					},
					time: 15,
					treatmentCategory: 2,
				},
				{
					title: "Detox Body Wrap",
					price: {
						consultation: 0,
						treatment: [20, 50, 80],
					},
					time: 15,
					treatmentCategory: 3,
				},
				{
					title: "Lipo Lean Body Wrap",
					price: {
						consultation: 0,
						treatment: [30, 80, 130],
					},
					time: 15,
					treatmentCategory: 3,
				},
				{
					title: "Sauna Blanket Detox Body Wrap",
					price: {
						consultation: 0,
						treatment: [60, 170, 270],
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Sauna Blanket Lipo Lean Body Wrap",
					price: {
						consultation: 0,
						treatment: [80, 220, 360],
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Sauna Blanket Add On With Any Other Treatment",
					price: {
						consultation: 0,
						treatment: [20, 50, 80],
					},
					time: 30,
					treatmentCategory: 3,
				},
				{
					title: "Skin Tightening",
					price: {
						consultation: 0,
						treatment: [60, 150, 239],
					},
					time: 30,
					treatmentCategory: 4,
				},
				{
					title: "Skin Tightening",
					price: {
						consultation: 0,
						treatment: [90, 240, 359],
					},
					time: 60,
					treatmentCategory: 4,
				},
				{
					title: "Stretch Mark Reduction",
					price: {
						consultation: 0,
						treatment: [50, 120, 249],
					},
					time: 30,
					treatmentCategory: 4,
				},
				{
					title: "Cellulite Blasting",
					price: {
						consultation: 0,
						treatment: [60, 150, 239],
					},
					time: 30,
					treatmentCategory: 4,
				},
				{
					title: "Cellulite Blasting",
					price: {
						consultation: 0,
						treatment: [90, 240, 359],
					},
					time: 60,
					treatmentCategory: 4,
				},
				{
					title: "Fat Melting",
					price: {
						consultation: 0,
						treatment: [50, 120, 249],
					},
					time: 30,
					treatmentCategory: 4,
				},
				{
					title: "Fat Melting",
					price: {
						consultation: 0,
						treatment: [90, 240, 359],
					},
					time: 60,
					treatmentCategory: 4,
				},
				{
					title: "360 Treatment (Tummy, Lower Back, Hip Melt)",
					price: {
						consultation: 0,
						treatment: [250, 625, 999],
					},
					time: 180,
					treatmentCategory: 5,
				},
				{
					title: "Legs For Days (Booty, Thigh Gap, Front Thigh)",
					price: {
						consultation: 0,
						treatment: [250, 625, 999],
					},
					time: 180,
					treatmentCategory: 5,
				},
				{
					title: "EBL Special (Booty, Tummy, Upper / Lower Back)",
					price: {
						consultation: 0,
						treatment: [300, 750, 1199],
					},
					time: 180,
					treatmentCategory: 5,
				},
			],
			data_selectedChips: 0,
		};
	},
	computed: {
		/* CSS */
		treatmentCardWidth(): string {
			let retVal: string = "200px";
			if (this.$vuetify.display.smAndUp) retVal = "250px";
			if (this.$vuetify.display.mdAndUp) retVal = "300px";
			return retVal;
		},
		treatmentCardHeight(): string {
			let retVal: string = "200px";
			if (this.$vuetify.display.mdAndUp) retVal = "250px";
			if (this.$vuetify.display.lgAndUp) retVal = "300px";
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
