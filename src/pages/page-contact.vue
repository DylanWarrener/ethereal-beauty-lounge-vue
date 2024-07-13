<template>
	<container-canvas :src="computed_img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card 
							variant="flat" 
							:style="computed_css_canvas_cardBackgroundOpacity"
							:card-title="computed_text_canvas_cardTitle"
							:card-subtitle="computed_text_canvas_cardSubtitle">
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="flat"
									:text="computed_text_canvasCard_actions_btnSendMessage"
									@click="method_event_scrollToElement('section-contact')"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section id="section-contact" title-class="text-inverted" :title="computed_text_section_title">
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
						<container-card 
							variant="flat" 
							class="bg-accent rounded">
							<template #card-headings>
								<!-- Title -->
								<h3 v-text="computed_text_section_form_title"></h3>
								
								<!-- Subtitle -->
								<h4 v-text="computed_text_section_form_note"></h4>
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
														v-model="computed_data_section_content_form_firstnameInput_value"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputLastnameLabel"
														v-model="computed_data_section_content_form_lastnameInput_value"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputEmailLabel"
														v-model="computed_data_section_content_form_emailInput_value"
													></v-text-field>
												</v-col>
												<v-col cols="12" md="6" lg="12">
													<v-text-field
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputPhoneLabel"
														v-model="computed_data_section_content_form_phoneInput_value"
													></v-text-field>
												</v-col>
												<v-col cols="12">
													<v-textarea
														clearable
														variant="outlined"
														:label="computed_text_section_content_form_inputMessageLabel"
														v-model="computed_data_section_content_form_messageInput_value"
													></v-textarea>
												</v-col>
											</v-row>
										</v-container>
									</v-form>
								</v-col>
							</template>
							<template #card-actions>
								<v-spacer></v-spacer>
								<container-btn
									variant="outlined"
									:id="computed_id_section_content_form_actions_btn"
									:text="computed_text_section_content_form_btnSendMessage"
									@click="method_event_sendMessage_clickHandler"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Constants
import {
	CONST_OBJECT_IDS_SECTION_BUTTONS,
} from "@constants/common/objects/common-constants-objects.js";

// IMGs
import CanvasPNG from "@assets/jpg/temp.jpg";

// Icons
import { mdiMapMarker, mdiEmail, mdiPhone } from "@mdi/js";

export default defineComponent({
	name: "contact-page-component",
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
										icon: mdiMapMarker,
										tooltip: "See office location",
										to: "section-contact-map",
									},
								},
								{
									title: "Email",
									subtitle: "contact@etherealbeautylounge.co.uk",
									btn: {
										icon: mdiEmail,
										tooltip: "No sure yet",
										to: "",
									},
								},
								{
									title: "Phone",
									subtitle: "+44 (0)7778 564553",
									btn: {
										icon: mdiPhone,
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
									value: "",
								},
								lastname: {
									label: "Last Name*",
									value: "",
								},
								email: {
									label: "Email*",
									value: "",
								},
								phone: {
									label: "Phone",
									value: "",
								},
								message: {
									label: "Message*",
									value: "",
								},
							},
							actions: {
								buttons: {
									sendMessage: {
										id: CONST_OBJECT_IDS_SECTION_BUTTONS.sendMessage,
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
		computed_id_section_content_form_actions_btn(): string {
			return this.contactPage.section.content.form.actions.buttons.sendMessage.id;
		},

		computed_text_canvas_cardTitle(): string {
			return this.contactPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.contactPage.canvas.card.headings.subtitle;
		},
		computed_text_canvasCard_actions_btnSendMessage(): string {
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
		computed_data_section_content_form_firstnameInput_value: {
			get(): string {
				return this.contactPage.section.content.form.inputs.firstname.value;
			},
			set(newValue: string): void {
				this.contactPage.section.content.form.inputs.firstname.value = newValue;
			},
		},
		computed_data_section_content_form_lastnameInput_value: {
			get(): string {
				return this.contactPage.section.content.form.inputs.lastname.value;
			},
			set(newValue: string): void {
				this.contactPage.section.content.form.inputs.lastname.value = newValue;
			},
		},
		computed_data_section_content_form_emailInput_value: {
			get(): string {
				return this.contactPage.section.content.form.inputs.email.value;
			},
			set(newValue: string): void {
				this.contactPage.section.content.form.inputs.email.value = newValue;
			},
		},
		computed_data_section_content_form_phoneInput_value: {
			get(): string {
				return this.contactPage.section.content.form.inputs.phone.value;
			},
			set(newValue: string): void {
				this.contactPage.section.content.form.inputs.phone.value = newValue;
			},
		},
		computed_data_section_content_form_messageInput_value: {
			get(): string {
				return this.contactPage.section.content.form.inputs.message.value;
			},
			set(newValue: string): void {
				this.contactPage.section.content.form.inputs.message.value = newValue;
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
		method_event_sendMessage_clickHandler(): void {
			//* Needs updating
		},
	},
});
</script>
