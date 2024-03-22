<template>
	<common-canvas-container-component :src="computed_data_canvas_img">
		<template #canvas-content>
			<v-container fluid class="pa-4 fill-height">
				<v-row dense class="d-flex justify-center">
					<v-col cols="12" md="8">
						<common-card-container-component variant="flat" style="background-color: rgba(0, 0, 0, 0.3)">
							<template #card-headings>
								<v-card-item class="pa-4">
									<v-card-title class="text-wrap">
										<h1>Log in</h1>
									</v-card-title>
									<v-card-subtitle class="text-wrap">
										<h3>Please log into Ethereal Beauty Lounge.</h3>
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
										text="Log in now?"
										@click="method_event_scrollToElement('section-login')"
									></v-btn>
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
		id="section-login"
		class-title="text-inverted"
		class-subtitle="text-inverted font-weight-regular"
		style-container="margin-top: 64px"
		:title="computed_txt_section_title"
		:subtitle="computed_txt_section_subtitle"
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
	</common-section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/* Stores */
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";

/* Components */
// Common
import CanvasContainerComp from "@components/common/canvas/common-canvas.vue";
import DividerContainerComp from "@components/common/divider/common-divider.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import SectionContainerComp from "@components/common/section/common-section.vue";
// Uncommon
import LoginContainerComp from "@components/common/form/login/common-form-login.vue";
import ForgottenPasswordContainerComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";
import RecoverAccountContainerComp from "@components/common/form/recover-account/common-form-recover-account.vue";
import MoreInfoRequiredContainerComp from "@components/common/form/more-info-required/common-more-information-required.vue";

/* IMGs */
import CanvasPNG from "@assets/jpg/temp.jpg";

export default defineComponent({
	name: "login-page-container-component",
	components: {
		"common-canvas-container-component": CanvasContainerComp,
		"common-divider-container-component": DividerContainerComp,
		"common-card-container-component": CardContainerComp,
		"common-section-container-component": SectionContainerComp,
		"common-login-container-component": LoginContainerComp,
		"common-forgotten-password-container-component": ForgottenPasswordContainerComp,
		"common-recover-account-container-component": RecoverAccountContainerComp,
		"common-more-information-required-container-component": MoreInfoRequiredContainerComp,
	},
	data() {
		return {
			selectedComponent: "common-login-container-component",
		};
	},
	computed: {
		computed_txt_section_title(): string {
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
		computed_txt_section_subtitle(): string {
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

		computed_tooltip_dialog_btnClose(): string {
			return this.computed_data_dialog_defaultState.icons.close.tooltip;
		},

		computed_css_dialog_dynamicMaxWidth(): string {
			let retVal: string = "";
			if (this.$vuetify.display.mdAndUp) retVal = "50%";
			return retVal;
		},

		computed_icon_dialogCloseBtn(): string {
			return this.computed_data_dialog_defaultState.icons.close.icon;
		},
		computed_data_canvas_img(): string {
			return CanvasPNG;
		},

		computed_data_dialog_defaultState(): any {
			return this.storeCommon.getDialogDefaultState;
		},
		computed_data_dialog_loginDrawerState: {
			get(): boolean {
				return this.storeHeader.getAppBarAccountDrawerState;
			},
			set(newValue: boolean): void {
				this.storeHeader.setAppBarAccountDrawerState(newValue);
			},
		},
	},
	methods: {
		/* Events */
		method_event_dialogCloseBtn_handler(): void {
			this.computed_data_dialog_loginDrawerState = !this.computed_data_dialog_loginDrawerState;
			setTimeout(() => this.method_event_setSelectedComponent("uncommon-login-container-component"), 100);
		},
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
