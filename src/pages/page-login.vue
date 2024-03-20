<template>
	<section-container-component
		class-subtitle="text-inverted"
		style-container="margin-top: 64px"
		:subtitle="computed_txt_section_title"
	>
		<template #section-content>
			<v-container fluid>
				<v-row dense>
					<v-col class="d-flex flex-column justify-center align-center">
						<v-card elevation="0" class="w-100 d-flex flex-column justify-center">
							<component
								:is="selectedComponent"
								@close-dialog="computed_data_dialog_loginDrawerState = !computed_data_dialog_loginDrawerState"
								@show-login="(newValue: string) => method_event_setSelectedComponent(newValue)"
								@change.self="method_event_setSelectedComponent"
							></component>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</section-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import SectionContainerComp from "@components/common/section/common-section.vue";
import LoginComp from "@components/common/form/login/common-form-login.vue";
import ForgottenPasswordComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";
import RecoverAccountComp from "@components/common/form/recover-account/common-form-recover-account.vue";
import CreateAccountComp from "@components/common/form/create-account/common-form-create-account.vue";
import ErrorMoreInfoRequiredComp from "@components/common/errors/common-errors-more-information-required.vue";

export default defineComponent({
	name: "login-page-container-component",
	components: {
		"section-container-component": SectionContainerComp,
		"login-container-component": LoginComp,
		"forgotten-password-container-component": ForgottenPasswordComp,
		"recover-account-container-component": RecoverAccountComp,
		"create-account-container-component": CreateAccountComp,
		"more-information-required-container-component": ErrorMoreInfoRequiredComp,
	},
	data() {
		return {
			selectedComponent: "login-container-component",
		};
	},
	computed: {
		computed_txt_section_title(): string {
			let retVal: string = "Please log into Ethereal Beauty Lounge";
			switch (this.selectedComponent) {
				case "forgotten-password-container-component":
					retVal = "Forgotten password";
					break;
				case "recover-account-container-component":
					retVal = "Recover your account";
					break;
				case "create-account-container-component":
					retVal = "Create your account";
					break;
				case "more-information-required-container-component":
					retVal = "More information needed";
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
			setTimeout(() => this.method_event_setSelectedComponent("login-container-component"), 100);
		},
		method_event_setSelectedComponent(comp: string): void {
			this.selectedComponent = comp;
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		const storeHeader = useHeaderStore();
		return { storeCommon, storeHeader };
	},
});
</script>
