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
										<h1>Contact us</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Ready to get started?</h3>
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
										text="Go To Contact details?"
										@click="scrollToElement('section-contact')"
									></v-btn>
								</v-card-actions>
							</template>
						</card-container-component>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</canvas-container-component>
	<divider-container-component></divider-container-component>

	<section-container-component id="section-contact" class="bg-default" class_title="text-inverted" title="Contact details">
		<template #section-content>
			<v-container fluid class="text-inverted">
				<v-row dense>
					<v-col cols="12" lg="6" class="pa-4 d-flex flex-column justify-space-evenly">
						<v-row dense>
							<v-col cols="12" class="d-flex flex-row justify-center align-center">
								<h4 class="text-inverted">
									Give us a call or complete the form. We endeavour to answer all enquiries within 24 hours
									on business days. We will be happy to answer your queries.
								</h4>
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
															<v-btn
																variant="flat"
																class="ma-4 bg-accent"
																size="large"
																:icon="item.btn.icon"
																v-bind="props"
																@click="scrollToElement(item.btn.to)"
															></v-btn>
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
					<v-col cols="12" lg="6" class="pa-4">
						<div class="pa-4 w-100 h-100 rounded d-flex flex-column bg-accent">
							<h4>Enter your details.</h4>
							<p class="pa-4 text-wrap text-center">
								Your email address will only be used for contacting one another. Required fields are marked
								*.
							</p>
							<v-form class="h-100" :rules="[]" v-model="valid">
								<v-container fluid class="h-100 d-flex">
									<v-row dense>
										<v-col cols="12" md="6" lg="12">
											<v-text-field clearable label="First Name*" variant="outlined"></v-text-field>
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
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common";
import useHeaderStore from "@stores/store-header.js";

// Components
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
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
		"canvas-container-component": CanvasContainerComp,
		"divider-container-component": DividerContainerComp,
		"card-container-component": CardContainerComp,
		"section-container-component": SectionContainerComp,
	},
	data() {
		return {
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

		/* Data */
		data_appBarHeight(): number {
			return this.storeCommon.getAppBarHeight;
		},
		data_isAppBarActive(): boolean {
			return this.storeCommon.getAppBarDrawer;
		},
	},
	methods: {
		/* Utils */
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

		/* Validation */
		notEmpty(): string | boolean {
			let retVal: string | boolean = false;

			return retVal;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
