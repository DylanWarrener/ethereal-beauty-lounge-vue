<template>
	<common-canvas-container-component :src="img_canvas">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1 v-text="contactPage.canvas.card.headings.title"></h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3 v-text="contactPage.canvas.card.headings.subtitle"></h3>
									</v-card-subtitle>
								</v-card-item>
							</template>
							<template #card-actions>
								<v-card-actions class="pa-4">
									<v-spacer></v-spacer>
									<common-btn-container-component
										variant="flat" 
										:btn-text="contactPage.canvas.card.actions.buttons.contactDetails.text" 
										@click="method_event_scrollToElement('section-contact')">
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
		id="section-contact" 
	class="bg-default
		class_title="text-inverted" 
		:title="contactPage.section.title">
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<!-- Information -->
					<v-col cols="12" lg="6" class="pa-4 d-flex flex-column justify-space-evenly">
						<v-row dense>
							<v-col cols="12" class="d-flex flex-row justify-center align-center">
								<h4 class="text-inverted" v-text="contactPage.section.content.information.text"></h4>
							</v-col>
							<v-col cols="12">
								<v-row dense>
									<v-col class="d-flex flex-column justify-center">
										<v-list
											item-props
											lines="three"
											min-height="200px"
											class="h-100 d-flex flex-column justify-center"
											style="cursor: default !important"
											:key="index"
											v-for="(item, index) in data_contactDetails"
										>
											<v-list-item style="cursor: default !important">
												<template v-slot:prepend>
													<v-tooltip location="bottom" :text="item.btn.tooltip">
														<template v-slot:activator="{ props }">
															<common-btn-container-component
																variant="flat" 
																btn-class="ma-4"
																:icon="item.btn.icon"
																v-bind="props" 
																@click="method_event_scrollToElement(item.btn.to)">
															</common-btn-container-component>
															<!-- class="ma-4 bg-accent" -->
														</template>
													</v-tooltip>
												</template>
												<template v-slot:title>
													<h5 class="pl-0 text-left text-inverted">
														{{ item.title }}
													</h5>
												</template>
												<template v-slot:subtitle>
													<p class="text-inverted" v-html="item.subtitle"></p>
												</template>
											</v-list-item>
										</v-list>
									</v-col>
								</v-row>
							</v-col>
						</v-row>
					</v-col>

					<!-- Form -->
					<v-col cols="12" lg="6" class="pa-4">
						<div class="pa-4 w-100 h-100 rounded d-flex flex-column bg-accent">
							<h4>Enter your details.</h4>
							<p class="pa-4 text-wrap text-center">
								Your email address will only be used for contacting one another. Required fields are marked
								*.
							</p>
							<v-form class="h-100" v-model="valid">
								<v-container fluid class="h-100 d-flex">
									<v-row dense>
										<v-col cols="12" md="6" lg="12">
											<v-text-field clearable variant="outlined" label="First Name*"></v-text-field>
										</v-col>
										<v-col cols="12" md="6" lg="12">
											<v-text-field clearable label="Last Name*" variant="outlined"></v-text-field>
										</v-col>
										<v-col cols="12" md="6" lg="12">
											<v-text-field clearable label="Email*" variant="outlined"></v-text-field>
										</v-col>
										<v-col cols="12" md="6" lg="12">
											<v-text-field clearable label="Phone" variant="outlined"></v-text-field>
										</v-col>
										<v-col cols="12">
											<v-textarea clearable label="Message*" variant="outlined"></v-textarea>
										</v-col>
										<v-col cols="12">
											<v-btn
												variant="outlined"
												text="Send message"
												min-width="200px"
												min-height="50px"
											></v-btn>
										</v-col>
									</v-row>
								</v-container>
							</v-form>
						</div>
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
	},
	data() {
		return {
			contactPage: {
				canvas: {
					card: {
						headings: {
							title: "Contact us",
							subtitle: "Ready to get started?"
						},
						actions: {
							buttons: {
								contactDetails: {
									text: "Go to contact details?"
								}
							}
						}
					}
				},
				section: {
					title: "Contact details",
					content: {
						information: {
							text: "Give us a call or complete the form. We endeavour to answer all enquiries within 24 hours on business days. We will be happy to answer your queries."
						},
						form: {}
					}
				}
			},
			valid: false,
			data_contactDetails: [
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
		};
	},
	computed: {
		/* IMGs */
		img_canvas(): string {
			return CanvasPNG;
		},
	},
	methods: {
		/* Utils */
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
