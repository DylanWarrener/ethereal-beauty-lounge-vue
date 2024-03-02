<template>
	<v-dialog
		persistent
		transition="dialog-top-transition"
		:max-width="dynamicMaxWidth_dialog"
		v-model="data_dialogLoginDrawerState"
	>
		<v-card>
			<v-toolbar color="accent">
				<h6>{{ txt_toolbarTitle }}</h6>
				<v-spacer></v-spacer>
				<v-tooltip location="bottom" :text="tooltip_dialogCloseBtn">
					<template #activator="{ props: tooltip }">
						<v-btn
							:icon="icon_dialogCloseBtn"
							v-bind="tooltip"
							@click="dialogCloseBtn_handler"
						>
							<template v-slot:default>
								<v-icon color="default"></v-icon>
							</template>
						</v-btn>
					</template>
				</v-tooltip>
			</v-toolbar>
			<v-img class="align-self-center" src="logo-transparent.png" width="128" height="128"></v-img>
			<component :is="selectedComponent" @change.self="setSelectedComponent"></component>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";
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

// Constants
import { notEmpty } from "@constants/common/functions/validation/common-constants-functions-validation.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

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
		/* Text */
		txt_toolbarTitle(): string {
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
		// IDs
		id_dialogCloseBtn(): string {
			return ElementIDs.DIALOG_LOGIN_CLOSE_BTN;
		},
		// Tooltips
		tooltip_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.tooltip;
		},

		/* CSS */
		dynamicMaxWidth_dialog(): string {
			let retVal: string = "";
			if (this.$vuetify.display.mdAndUp) retVal = "50%";
			return retVal;
		},

		/* Icons */
		icon_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.icon;
		},

		/* Data */
		// Read only
		data_dialogDefaultState(): IDialogDefaultState {
			return this.storeCommon.getDialogDefaultState;
		},
		// Read & Write
		data_dialogLoginDrawerState: {
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
		dialogCloseBtn_handler(): void {
			this.data_dialogLoginDrawerState = !this.data_dialogLoginDrawerState;
			setTimeout(() => this.setSelectedComponent("login-container-component"), 100);
		},
		setSelectedComponent(comp: string): void {
			debugger;
			this.selectedComponent = comp;
		},

		/* Validation */
		isNotEmpty(value: string): boolean | string {
			const isValueValid: boolean = !!value && value.length > 0;
			let retVal: boolean | string = false;
			if (isValueValid) {
				retVal = notEmpty(value.toString());
				if (retVal !== true) {
					retVal = retVal as string;
				}
			}
			return retVal;
		},
		isEmailValid(value: string): boolean | string {
			let retVal: boolean | string = false;
			return retVal;
		},
		isPasswordValid(value: string): boolean | string {
			let retVal: boolean | string = false;
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
