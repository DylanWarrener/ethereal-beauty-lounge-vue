<template>
	<container-canvas :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card variant="flat" :style="computed_css_canvas_cardBackgroundOpacity">
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
								<container-btn
									variant="flat"
									:text="computed_text_canvasCard_actions_btnSeeTreatments"
									@click="method_event_scrollToElement"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section id="section-treatments" title-class="text-inverted" :title="computed_text_section_title">
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<!-- Filter options -->
					<v-col cols="12">
						<v-sheet elevation="0" class="d-flex flex-wrap justify-center align-center">
							<v-chip-group
								filter
								mandatory
								selected-class="text-accent"
								v-model="computed_data_section_filterableCategories_value"
							>
								<v-chip
									class="bg-default text-capitalize"
									:key="index"
									v-for="(treatment, index) in computed_data_section_filteredCategoryIndex_items"
								>
									{{ treatment.category }}
								</v-chip>
							</v-chip-group>
						</v-sheet>
					</v-col>

					<!-- Notes -->
					<v-col cols="12">
						<h5 class="text-left text-inverted" v-if="computed_data_section_categoryHasNote">
							{{ computed_text_section_noteDefault }}
							<span class="text-inverted font-italic font-weight-regular">
								{{ computed_text_section_note }}
							</span>
						</h5>
					</v-col>

					<!-- Treatment options -->
					<v-col cols="12">
						<v-container fluid>
							<v-row class="d-flex justify-center align-center">
								<template
									:key="index"
									v-for="(treatmentType, index) in computed_data_section_treatments_items"
								>
									<v-col
										cols="auto"
										v-if="method_utils_treatmentCardShouldRender(treatmentType.treatmentCategory)"
									>
										<container-card
											variant="outlined"
											action-col-class="d-flex flex-column justify-center align-center"
											:width="computed_css_dynamicWidth"
											:height="computed_css_dynamicHeight"
										>
											<template #card-headings>
												<!-- Title -->
												<v-col
													cols="12"
													sm="10"
													class="d-flex flex-column justify-center align-center"
												>
													<v-card-item class="w-100 pa-0 flex-shrink-1 flex-grow-0">
														<v-card-title
															class="d-flex flex-row justify-center align-center text-wrap"
														>
															<h4 class="text-inverted">
																{{ treatmentType.title }}
															</h4>
														</v-card-title>
													</v-card-item>
												</v-col>

												<!-- More information -->
												<v-col
													cols="12"
													sm="2"
													class="d-flex flex-column justify-center align-center"
												>
													<common-tooltip-container-component
														location="bottom"
														:tooltip="computed_tooltip_section_treatmentCard_moreInformation"
														:icon="computed_icon_moreInformation"
													></common-tooltip-container-component>
												</v-col>
											</template>
											<template #card-content>
												<!-- Treatment price filter -->
												<v-col cols="12" class="d-flex flex-column justify-center">
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
												</v-col>

												<!-- Treatments include -->
												<v-col
													cols="12"
													class="d-flex flex-column justify-center"
													v-if="treatmentType.includes"
												>
													<p class="text-left">
														<span class="text-inverted font-weight-bold">
															{{
																computed_text_section_treatmentCard_contentInformation_includes
															}}
														</span>
														<small class="text-inverted text-uppercase">
															{{ treatmentType.includes }}
														</small>
													</p>
												</v-col>

												<!-- Treatments duration -->
												<v-col cols="12" sm="6" class="d-flex flex-column justify-center">
													<p>
														<span class="text-inverted font-weight-bold">
															{{
																computed_text_section_treatmentCard_contentInformation_duration
															}}
														</span>
														<small class="text-inverted">
															{{
																method_utils_section_treatmentCard_contentInformation_formattedDuration(
																	treatmentType
																)
															}}
														</small>
													</p>
												</v-col>

												<!-- Treatments consultation fee -->
												<v-col cols="12" sm="6" class="d-flex flex-column justify-center">
													<p>
														<span class="text-inverted font-weight-bold">
															{{
																computed_text_section_treatmentCard_contentInformation_consultation
															}}
														</span>
														<small class="text-inverted">
															{{
																method_utils_section_treatmentCard_contentInformation_formattedPrice(
																	treatmentType
																)
															}}
														</small>
													</p>
												</v-col>
											</template>
											<template #card-actions>
												<v-spacer></v-spacer>
												<common-btn-text-container-component
													:text="computed_text_section_treatmentCard_actions_btnBook"
												></common-btn-text-container-component>
												<v-spacer></v-spacer>
											</template>
										</container-card>
									</v-col>
								</template>
							</v-row>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-section>

	<container-dialog
		:toolbar-title="computed_text_dialogCard_toolbarTitle"
		@close="computed_data_dialogCard_show_value = false"
		v-model="computed_data_dialogCard_show_value"
	>
		<template #dialog-card-content></template>
		<template #dialog-card-actions>
			<v-spacer></v-spacer>
			<container-btn
				variant="flat"
				:text="computed_text_dialogCard_actions_btnBook"
				@click="method_event_bookTreatmentNow"
			></container-btn>
		</template>
	</container-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useFirebaseStore from "@stores/store-firebase.js";

// Constants
import { CONST_OBJECT_IDS_SECTION_BUTTONS } from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

// Icons
import { mdiInformationVariant } from "@constants/common/primitives/icons/common-constants-primative-icons.js";

export default defineComponent({
	name: "treatments-page-component",
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
					title: "Available treatments",
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
							content: {
								information: {
									includes: {
										text: "Includes: ",
									},
									duration: {
										text: "Duration: ",
									},
									consultation: {
										text: "Consultation: ",
									},
								},
							},
							actions: {
								buttons: {
									moreInformation: {
										icon: "",
										tooltip: "x1 represents the amount of sessions, e.g. x5 = 5 sessions.",
									},
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
		computed_text_canvas_cardTitle(): string {
			return this.treatmentsPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.treatmentsPage.canvas.card.headings.subtitle;
		},
		computed_text_canvasCard_actions_btnSeeTreatments(): string {
			return this.treatmentsPage.canvas.card.actions.buttons.seeTreatments.text;
		},
		computed_text_section_title(): string {
			return this.treatmentsPage.section.title;
		},
		computed_text_section_noteDefault(): string {
			return this.treatmentsPage.section.notes.default;
		},
		computed_text_section_note(): string {
			const filterableCategories_items = this.computed_data_section_filteredCategoryIndex_items;
			const filteredCategoryIndex_value = this.computed_data_section_filterableCategories_value;
			return filterableCategories_items[filteredCategoryIndex_value].note;
		},
		computed_text_section_treatmentCard_contentInformation_includes(): string {
			return this.treatmentsPage.section.treatments.cards.content.information.includes.text;
		},
		computed_text_section_treatmentCard_contentInformation_duration(): string {
			return this.treatmentsPage.section.treatments.cards.content.information.duration.text;
		},
		computed_text_section_treatmentCard_contentInformation_consultation(): string {
			return this.treatmentsPage.section.treatments.cards.content.information.consultation.text;
		},
		computed_text_section_treatmentCard_actions_btnBook(): string {
			return this.treatmentsPage.section.treatments.cards.actions.buttons.book.text;
		},
		computed_text_dialogCard_toolbarTitle(): string {
			return this.treatmentsPage.dialog.toolbar.title;
		},
		computed_text_dialogCard_actions_btnBook(): string {
			return this.treatmentsPage.dialog.actions.buttons.book.text;
		},

		computed_tooltip_section_treatmentCard_moreInformation(): string {
			return this.treatmentsPage.section.treatments.cards.actions.buttons.moreInformation.tooltip;
		},

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
			if (this.$vuetify.display.mdAndUp) retVal = "400";
			if (this.$vuetify.display.xlAndUp) retVal = "325";
			return retVal;
		},
		computed_css_canvas_cardBackgroundOpacity(): string {
			return "background-color: rgba(0, 0, 0, 0.3)";
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_icon_moreInformation(): string {
			return mdiInformationVariant;
		},

		computed_data_section_categoryHasNote(): boolean {
			const selectedItem: number = this.treatmentsPage.section.filter.chips.selectedItem;
			return !!this.treatmentsPage.section.filter.chips.items[selectedItem].note;
		},
		computed_data_section_filteredCategoryIndex_items(): any {
			return this.treatmentsPage.section.filter.chips.items;
		},
		computed_data_section_treatments_items(): any {
			return this.treatmentsPage.section.treatments.cards.items;
		},
		computed_data_section_filterableCategories_value: {
			get(): number {
				return this.treatmentsPage.section.filter.chips.selectedItem;
			},
			set(newValue: number): void {
				this.treatmentsPage.section.filter.chips.selectedItem = newValue;
			},
		},
		computed_data_dialogCard_show_value: {
			get(): boolean {
				return this.treatmentsPage.dialog.show;
			},
			set(newValue: boolean): void {
				this.treatmentsPage.dialog.show = newValue;
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
			this.computed_data_dialogCard_show_value = !this.computed_data_dialogCard_show_value;
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

		method_utils_treatmentCardShouldRender(treatmentCardCategoryIndex: number): boolean {
			const filteredCategoryIndex: number = this.treatmentsPage.section.filter.chips.selectedItem;
			return treatmentCardCategoryIndex === filteredCategoryIndex;
		},
		method_utils_section_treatmentCard_contentInformation_formattedDuration(treatmentType: any): string {
			return this.method_utils_formattedDuration(treatmentType.time);
		},
		method_utils_section_treatmentCard_contentInformation_formattedPrice(treatmentType: any): string {
			return treatmentType.price.consultation === 0 ? "Free" : `£${treatmentType.price.consultation}`;
		},
		method_utils_formattedDuration(time: number): string {
			if (time < 0 || isNaN(time)) return "Invalid time";

			const hours = Math.floor(time / 60);
			const mins = time % 60;

			let retval: string = "";
			if (hours > 0) retval += `${hours} hr${hours > 1 ? "s" : ""}`;
			if (mins > 0) {
				if (retval.length > 0) retval += " ";
				retval += `${mins} min${mins > 1 ? "s" : ""}`;
			}

			return retval || "0 mins";
		},
	},
	setup() {
		const storeFirebase = useFirebaseStore();
		return { storeFirebase };
	},
});
</script>
