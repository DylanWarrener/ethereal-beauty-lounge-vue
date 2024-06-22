<template>
	<container-canvas :src="computed_data_canvas_img">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<container-card variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
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
									:text="computed_text_canvasCard_btn"
									@click="method_event_scrollToElement('section-login')"
								></container-btn>
							</template>
						</container-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-canvas>

	<container-divider></container-divider>

	<container-section
		id="section-login"
		title-class="text-inverted"
		subtitle-class="text-inverted"
		:title="computed_text_section_title"
		:subtitle="computed_text_section_subtitle"
	>
		<template #section-content>
			<v-container fluid>
				<v-row dense>
					<v-col class="d-flex flex-column justify-center align-center">
						<v-card elevation="0" class="w-100 d-flex flex-column justify-center">
							<component
								:is="selectedComponent"
								@show-login="(newValue: string) => method_event_setSelectedComponent(newValue)"
								@change.self="method_event_setSelectedComponent"
							></component>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</container-section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/* Stores */
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";

/* Components */
import LoginContainerComp from "@components/common/form/login/common-form-login.vue";
import ForgottenPasswordContainerComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";
import RecoverAccountContainerComp from "@components/common/form/recover-account/common-form-recover-account.vue";
import MoreInfoRequiredContainerComp from "@components/common/form/more-info-required/common-more-information-required.vue";

// Constants
import { CONST_OBJECT_IDS_SECTION_BUTTONS } from "@constants/common/objects/common-constants-objects.js";

/* IMGs */
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "common-login-page-container-component",
	components: {
		"common-login-container-component": LoginContainerComp,
		"common-forgotten-password-container-component": ForgottenPasswordContainerComp,
		"common-recover-account-container-component": RecoverAccountContainerComp,
		"common-more-information-required-container-component": MoreInfoRequiredContainerComp,
	},
	data() {
		return {
			loginPage: {
				canvas: {
					card: {
						headings: {
							title: "Log in",
							subtitle: "Please log into Ethereal Beauty Lounge.",
						},
						actions: {
							buttons: {
								seeWhoWeAre: {
									text: "Log in now?",
								},
							},
						},
					},
				},
				section: {
					title: "",
				},
			},
			selectedComponent: "common-login-container-component",
		};
	},
	computed: {
		computed_text_canvas_cardTitle(): string {
			return this.loginPage.canvas.card.headings.title;
		},
		computed_text_canvas_cardSubtitle(): string {
			return this.loginPage.canvas.card.headings.subtitle;
		},
		computed_text_canvasCard_btn(): string {
			return this.loginPage.canvas.card.actions.buttons.seeWhoWeAre.text;
		},
		computed_text_section_title(): string {
			let retVal: string = "Please log into Ethereal Beauty Lounge";
			switch (this.selectedComponent) {
				case "common-forgotten-password-container-component":
					retVal = "Forgotten password";
					break;
				case "common-recover-account-container-component":
					retVal = "Recover your account";
					break;
				case "common-more-information-required-container-component":
					retVal = "More information needed";
					break;
			}
			return retVal;
		},
		computed_text_section_subtitle(): string {
			let retVal: string = "";
			switch (this.selectedComponent) {
				case "common-forgotten-password-container-component":
					retVal = "Enter your account email. Then we will send you an email, to reset the password.";
					break;
				case "common-recover-account-container-component":
					retVal = "Enter your phone number, so we can send you the account recovery instructions.";
					break;
				case "common-more-information-required-container-component":
					retVal = "To help recover your account, we will need more information.";
					break;
			}
			return retVal;
		},

		computed_data_canvas_img(): string {
			return CanvasPNG;
		},
	},
	methods: {
		method_event_setSelectedComponent(comp: string): void {
			this.selectedComponent = comp;
		},
		method_event_scrollToElement(targetElement: string): void {
			const targetElementID: HTMLDivElement = document.getElementById(targetElement) as HTMLDivElement;

			if (targetElementID) {
				window.scrollTo({
					top: targetElementID.offsetTop,
					behavior: "smooth",
				});
			}
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
