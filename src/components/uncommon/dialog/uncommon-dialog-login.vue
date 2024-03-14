<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="computed_css_dialog_dynamicMaxWidth"
		v-model="computed_data_dialog_loginDrawerState"
	>
		<v-card>
			<v-toolbar color="accent">
				<h6>{{ computed_txt_toolbar_title }}</h6>
				<v-spacer></v-spacer>
				<v-tooltip location="bottom" :text="computed_tooltip_dialog_btnClose">
					<template #activator="{ props: tooltip }">
						<v-btn
							:icon="computed_icon_dialogCloseBtn"
							v-bind="tooltip"
							@click="method_event_dialogCloseBtn_handler"
						>
							<template v-slot:default>
								<v-icon color="default"></v-icon>
							</template>
						</v-btn>
					</template>
				</v-tooltip>
			</v-toolbar>
			<v-img class="align-self-center" src="logo-transparent.png" width="128" height="128"></v-img>
			<component
				:is="selectedComponent"
				@close-dialog="computed_data_dialog_loginDrawerState = !computed_data_dialog_loginDrawerState"
				@show-login="(newValue: string) => method_event_setSelectedComponent(newValue)"
				@change.self="method_event_setSelectedComponent"
			></component>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import useCommonStore from "@stores/store-common.js";
import useHeaderStore from "@stores/store-header.js";

// Components
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";
import CardContainerComp from "@components/common/card/common-card.vue";
import BtnContainerComp from "@components/common/button/common-btn.vue";
import LoginComp from "@components/common/form/login/common-form-login.vue";
import ForgottenPasswordComp from "@components/common/form/forgotten-password/common-form-forgotten-password.vue";
import RecoverAccountComp from "@components/common/form/recover-account/common-form-recover-account.vue";
import CreateAccountComp from "@components/common/form/create-account/common-form-create-account.vue";
import ErrorMoreInfoRequiredComp from "@components/common/errors/common-errors-more-information-required.vue";

// Interfaces
import { IDialogDefaultState } from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

export default defineComponent({
	name: "dialog-login-component",
	components: {
		"dialog-container-component": DialogContainerComp,
		"card-container-component": CardContainerComp,
		"button-container-component": BtnContainerComp,
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
		computed_txt_toolbar_title(): string {
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

		computed_data_dialog_defaultState(): IDialogDefaultState {
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
