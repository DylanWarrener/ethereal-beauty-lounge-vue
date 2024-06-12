<template>
	<common-canvas-container-component :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1 v-text="treatmentsPage.canvas.card.headings.title"></h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3 v-text="treatmentsPage.canvas.card.headings.subtitle"></h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<common-btn-container-component
										variant="flat"
										:btn-text="treatmentsPage.canvas.card.actions.buttons.seeTreatments.text"
										@click="method_event_scrollToElement"
									>
									</common-btn-container-component>
								</v-card-actions>
							</template>
						</common-card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</common-canvas-container-component>

	<common-divider-container-component></common-divider-container-component>

	<common-section-container-component
		id="section-treatments"
		class="bg-default"
		class-title="text-inverted"
		:title="treatmentsPage.section.title"
	>
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<!-- Filter options -->
					<v-col cols="12">
						<v-sheet class="d-flex flex-wrap justify-center align-center" elevation="0">
							<v-chip-group
								filter
								mandatory
								selected-class="text-accent"
								v-model="treatmentsPage.section.filter.chips.selectedItem"
							>
								<v-chip
									class="bg-default text-capitalize"
									:key="index"
									v-for="(treatment, index) in treatmentsPage.section.filter.chips.items"
								>
									{{ treatment.category }}
								</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>

					<!-- Notes -->
					<v-col cols="12">
						<h5 class="text-left text-inverted" v-if="computed_data_treatmentCategoryHasNote">
							{{ treatmentsPage.section.notes.default }}
							<span class="text-inverted font-italic font-weight-regular">
								{{ computed_data_treatmentCategoryNote }}
							</span>
						</h5>
					</v-col>

					<!-- Treatment options -->
					<v-col>
						<v-container fluid>
							<v-row dense class="d-flex justify-center align-center">
								<template v-for="treatmentType in treatmentsPage.section.treatments.cards.items">
									<v-col
										cols="auto"
										class="justify-center align-center"
										:style="method_utils_css_treatmentCard_displayAndVisibility(treatmentType)"
									>
										<v-card
											variant="outlined"
											class="flex-column align-center justify-space-between"
											:width="computed_css_dynamicWidth"
											:height="computed_css_dynamicHeight"
											:style="method_utils_css_treatmentCard_display(treatmentType)"
										>
											<v-card-item class="w-100">
												<v-card-title class="d-flex flex-row justify-center align-center text-wrap">
													<h4 class="text-inverted">
														{{ treatmentType.title }}
													</h4>
													<v-tooltip
														text="x1 represents the amount of sessions, e.g. x5 = 5 sessions."
													>
														<template v-slot:activator="{ props }">
															<v-btn
																density="compact"
																elevation="0"
																color="accent"
																:ripple="false"
																:icon="computed_icon_moreInformation"
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
													<v-container fluid>
														<v-row dense>
															<v-col cols="12" v-if="treatmentType.includes">
																<p class="text-left" v-if="treatmentType.includes">
																	<span class="text-inverted font-weight-bold">
																		Includes:
																	</span>
																	<small class="text-inverted text-uppercase">
																		{{ treatmentType.includes }}
																	</small>
																</p>
															</v-col>
															<v-col cols="12" sm="6">
																<p :class="computed_css_treatmentCardTextAlign">
																	<span class="text-inverted font-weight-bold">
																		Duration:
																	</span>
																	<small class="text-inverted">
																		{{
																			treatmentType.time > 60
																				? `${Math.floor(
																						treatmentType.time / 60
																				  )} hour`
																				: `${treatmentType.time} mins`
																		}}
																		{{
																			treatmentType.time > 60
																				? `${
																						((treatmentType.time / 60) % 1) *
																							60 ===
																						0
																							? ""
																							: ((treatmentType.time / 60) %
																									1) *
																							  60
																				  } mins`
																				: ""
																		}}
																	</small>
																</p>
															</v-col>
															<v-col cols="12" sm="6">
																<p :class="computed_css_treatmentCardTextAlign">
																	<span class="text-inverted font-weight-bold">
																		Consultation:
																	</span>
																	<small class="text-inverted">
																		{{
																			treatmentType.price.consultation === 0
																				? "Free"
																				: `£${treatmentType.price.consultation}`
																		}}
																	</small>
																</p>
															</v-col>
														</v-row>
													</v-container>
												</v-card-subtitle>
											</v-card-item>
											<v-card-actions class="w-100">
												<v-spacer></v-spacer>
												<v-btn
													size="large"
													style="min-width: 100px"
													class="px-4 bg-accent text-default"
													@click="method_event_showDialog(treatmentType.title)"
												>
													<template #default>
														<small
															class="text-default"
															v-text="
																treatmentsPage.section.treatments.cards.actions.buttons.book
																	.text
															"
														></small>
													</template>
												</v-btn>
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
	</common-section-container-component>

	<common-dialog-container-component
		:toolbar-title="treatmentsPage.dialog.toolbar.title"
		@close="treatmentsPage.dialog.show = false"
		v-model="treatmentsPage.dialog.show"
	>
		<template #card-content>Content</template>
		<template #card-actions>
			<v-spacer></v-spacer>
			<common-btn-container-component
				variant="flat"
				:btn-text="treatmentsPage.dialog.actions.buttons.book.text"
				@click="method_event_bookTreatmentNow"
			></common-btn-container-component>
		</template>
	</common-dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import DividerContainerComp from "@components/common/divider/common-divider.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

// Icons
import { mdiInformationVariant } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "treatments-page-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-section-container-component": SectionContainerComp,
		"common-dialog-container-component": DialogContainerComp,
	},
	data() {
		return {
			treatmentsPage: {
				canvas: {
					card: {
						headings: {
							title: "All Treatments",
							subtitle: "Explore our entire collection of treatments.",
						},
						actions: {
							buttons: {
								seeTreatments: {
									text: "See our treatments?",
								},
							},
						},
					},
				},
				section: {
					title: "All our Treatments",
					filter: {
						chips: {
							selectedItem: 0,
							items: [
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
						},
					},
					notes: {
						default: "Please note:",
					},
					treatments: {
						cards: {
							items: [
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
							actions: {
								buttons: {
									book: {
										text: "Book?",
									},
								},
							},
						},
					},
				},
				dialog: {
					show: false,
					toolbar: {
						title: "",
					},
					actions: {
						buttons: {
							book: {
								text: "Book now",
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_css_dynamicWidth(): string {
			let retVal: string = "100%";
			if (this.$vuetify.display.smAndUp) retVal = "400";
			if (this.$vuetify.display.mdAndUp) retVal = "450";
			if (this.$vuetify.display.xlAndUp) retVal = "500";
			if (this.$vuetify.display.xxl) retVal = "550";
			return retVal;
		},
		computed_css_dynamicHeight(): string {
			let retVal: string = "100%";
			if (this.$vuetify.display.mdAndUp) retVal = "300";
			if (this.$vuetify.display.xlAndUp) retVal = "325";
			return retVal;
		},
		computed_css_treatmentCardTextAlign(): string {
			let retVal: string = "text-left";
			if (this.$vuetify.display.smAndUp) retVal = "text-center";
			return retVal;
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_icon_moreInformation(): string {
			return mdiInformationVariant;
		},

		computed_data_treatmentCategoryNote(): string {
			const selectedItem: number = this.treatmentsPage.section.filter.chips.selectedItem;
			return this.treatmentsPage.section.filter.chips.items[selectedItem].note;
		},
		computed_data_treatmentCategoryHasNote(): boolean {
			const selectedItem: number = this.treatmentsPage.section.filter.chips.selectedItem;
			return !!this.treatmentsPage.section.filter.chips.items[selectedItem].note;
		},
		computed_data_hasUserVerifiedEmail: {
			get(): boolean {
				return this.storeFirebase.get_userAuth_emailIsVerified_state;
			},
			set(newValue: boolean): void {
				this.storeFirebase.set_userAuth_emailIsVerified_state(newValue);
			},
		},
	},
	methods: {
		method_event_showDialog(title: string): void {
			this.treatmentsPage.dialog.show = true;
			this.treatmentsPage.dialog.toolbar.title = `Book treatment - ${title}`;
		},
		method_event_bookTreatmentNow(): void {
			// Here I should make a request to the booking API to book an appointment.
		},
		method_event_scrollToElement(): void {
			const targetElementID: HTMLDivElement = document.getElementById("section-treatments") as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID.offsetTop,
					behavior: "smooth",
				});
			}
		},

		method_utils_css_treatmentCard_displayAndVisibility(treatmentType: {
			title: string;
			price: { consultation: number; treatment: string[]; selected: number };
			time: number;
			treatmentCategory: number;
		}): any {
			const selectedItem: number = this.treatmentsPage.section.filter.chips.selectedItem;
			const display = this.method_utils_css_treatmentCard_display(treatmentType);
			const visibility = treatmentType.treatmentCategory === selectedItem ? `visible` : `hidden`;
			return { display: display, visibility: visibility };
		},
		method_utils_css_treatmentCard_display(treatmentType: {
			title: string;
			price: { consultation: number; treatment: string[]; selected: number };
			time: number;
			treatmentCategory: number;
		}): any {
			const selectedItem: number = this.treatmentsPage.section.filter.chips.selectedItem;
			const display = treatmentType.treatmentCategory === selectedItem ? `flex` : `none`;
			return { display: display };
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>
