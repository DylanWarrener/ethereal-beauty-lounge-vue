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
									:text="computed_text_canvas_cardBtnText"
									@click="method_event_scrollToElement('section-contact')"
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
		id="section-contact"
		title-class="text-inverted"
		:title="computed_text_section_title"
	>
		<template #section-content>
			<v-container fluid class="text-inverted">
				<!-- Content -->
				<v-row>
					<!-- Contact information -->
					<v-col cols="12" lg="6" class="d-flex flex-column justify-center">
						<v-row class="flex-shrink-1 flex-grow-0">
							<v-col cols="12" class="d-flex flex-shrink-1 flex-grow-0">
								<h4 class="text-inverted" v-text="computed_text_section_generalInformation_title"></h4>
							</v-col>
						</v-row>

						<v-row class="flex-shrink-1 flex-grow-1">
							<v-col class="d-flex flex-column justify-center">
								<v-list lines="two">
									<v-list-item
										:key="index"
										v-for="(item, index) in computed_data_section_contactInformation_items"
									>
										<template #prepend>
											<common-tooltip-container-component
												location="bottom"
												btn-class="mr-4"
												:tooltip="item.btn.tooltip"
												:icon="item.btn.icon"
												@click="method_event_scrollToElement(item.btn.to)"
											></common-tooltip-container-component>
										</template>
										<template #title>
											<h5 class="pl-0 text-left text-inverted">
												{{ item.title }}
											</h5>
										</template>
										<template #subtitle>
											<p class="text-inverted" v-html="item.subtitle"></p>
										</template>
									</v-list-item>
								</v-list>
							</v-col>
						</v-row>
					</v-col>

					<!-- Form -->
					<v-col cols="12" lg="6">
						<common-card-container-component variant="flat" class="bg-accent rounded">
							<template #card-headings>
								<v-col cols="12">
									<h4 class="text-default" v-text="computed_text_section_form_title"></h4>
								</v-col>
								<v-col cols="12">
									<p class="pa-4 text-wrap text-center" v-text="computed_text_section_form_note"></p>
								</v-col>
							</template>
							<template #card-content>
								<v-col cols="12">
									<v-form v-model="computed_data_section_content_formIsValid_value">
										<v-container fluid class="h-100 d-flex">
											<v-row dense>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputFirstnameLabel"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputLastnameLabel"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputEmailLabel"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputPhoneLabel"
													></v-text-field>
												</v-col>
												<v-col cols="12">
													<v-textarea
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputMessageLabel"
													></v-textarea>
												</v-col>
												<v-col cols="12">
													<common-btn-container-component
														variant="outlined"
														color="default"
														:text="computed_text_section_content_form_btnSendMessage"
														@click="method_event_scrollToElement('section-contact')"
													></common-btn-container-component>
												</v-col>
											</v-row>
										</v-container>
									</v-form>
								</v-col>
							</template>
						</common-card-container-component>
					</v-col>
				</v-row>
			</v-container>
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
import TooltipContainerComp from "@components/common/button/tooltip/common-tooltip.vue";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

// Icons
import { iconsContactDetails } from "@constants/common/objects/common-constants-objects.js";

export default defineComponent({
	name: "contact-page-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-btn-container-component": BtnContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-section-container-component": SectionContainerComp,
		"common-tooltip-container-component": TooltipContainerComp,
	},
	data() {
		return {
			contactPage: {
				canvas: {
					card: {
						headings: {
							title: "Contact us",
							subtitle: "Ready to get started?",
						},
						actions: {
							buttons: {
								contactDetails: {
									text: "Go to contact details?",
								},
							},
						},
					},
				},
				section: {
					title: "Contact details",
					content: {
						generalInformation: {
							text: "Give us a call or complete the form. We endeavour to answer all enquiries within 24 hours on business days. We will be happy to answer your queries.",
						},
						contactInformation: {
							items: [
								{
									title: "Office Location",
									subtitle: "48 Papyrus Road, Peterborough, <br /> Cambridgeshire, PE4 5BH, UK",
									btn: {
										icon: iconsContactDetails.location,
										tooltip: "See office location",
										to: "section-contact-map",
									},
								},
								{
									title: "Email",
									subtitle: "contact@etherealbeautylounge.co.uk",
									btn: {
										icon: iconsContactDetails.email,
										tooltip: "No sure yet",
										to: "",
									},
								},
								{
									title: "Phone",
									subtitle: "+44 (0)7778 564553",
									btn: {
										icon: iconsContactDetails.phone,
										tooltip: "Open whatsapp messaging service",
										to: "",
									},
								},
							],
						},
						form: {
							valid: false,
							title: "Enter your details.",
							note: "Your email address will only be used for contacting one another. Required fields are marked *.",
							inputs: {
								firstname: {
									label: "First Name*",
								},
								lastname: {
									label: "Last Name*",
								},
								email: {
									label: "Email*",
								},
								phone: {
									label: "Phone",
								},
								message: {
									label: "Message*",
								},
							},
							actions: {
								buttons: {
									sendMessage: {
										text: "Send message",
									},
								},
							},
						},
					},
				},
			},
		};
	},
	computed: {
		computed_text_canvas_cardTitle(): string {
			return this.contactPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.contactPage.canvas.card.headings.subtitle;
		},
		computed_text_canvas_cardBtnText(): string {
			return this.contactPage.canvas.card.actions.buttons.contactDetails.text;
		},
		computed_text_section_title(): string {
			return this.contactPage.section.title;
		},
		computed_text_section_generalInformation_title(): string {
			return this.contactPage.section.content.generalInformation.text;
		},
		computed_text_section_form_title(): string {
			return this.contactPage.section.content.form.title;
		},
		computed_text_section_form_note(): string {
			return this.contactPage.section.content.form.note;
		},
		computed_text_section_content_form_inputFirstnameLabel(): string {
			return this.contactPage.section.content.form.inputs.firstname.label;
		},
		computed_text_section_content_form_inputLastnameLabel(): string {
			return this.contactPage.section.content.form.inputs.lastname.label;
		},
		computed_text_section_content_form_inputEmailLabel(): string {
			return this.contactPage.section.content.form.inputs.email.label;
		},
		computed_text_section_content_form_inputPhoneLabel(): string {
			return this.contactPage.section.content.form.inputs.phone.label;
		},
		computed_text_section_content_form_inputMessageLabel(): string {
			return this.contactPage.section.content.form.inputs.message.label;
		},
		computed_text_section_content_form_btnSendMessage(): string {
			return this.contactPage.section.content.form.actions.buttons.sendMessage.text;
		},

		computed_css_canvas_cardBackgroundOpacity(): string {
			return "background-color: rgba(0, 0, 0, 0.3)";
		},

		computed_img_canvas(): string {
			return CanvasPNG;
		},

		computed_data_section_contactInformation_items(): any {
			return this.contactPage.section.content.contactInformation.items;
		},
		computed_data_section_content_formIsValid_value: {
			get(): boolean {
				return this.contactPage.section.content.form.valid;
			},
			set(newValue: boolean): void {
				this.contactPage.section.content.form.valid = newValue;
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
	},
});
</script>
