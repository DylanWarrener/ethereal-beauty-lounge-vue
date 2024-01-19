<template>
	<dialog-container-component :dialog-state="data_dialogLoginDrawerState">
		<template #toolbar-items>
			<tooltip-container-component
				location="bottom"
				:id="id_dialogCloseBtn"
				:icon="icon_dialogCloseBtn"
				:tooltip="tooltip_dialogCloseBtn"
				@toggle-tooltip-drawer-state="toggleTooltipDrawerState"
				@toggle-drawer-state="data_dialogLoginDrawerState = false"
			></tooltip-container-component>
		</template>
		<template #content>
			<v-col cols="12" class="d-flex flex-column justify-center align-center" style="border: 2px solid black">
				<v-img src="logo-transparent.png" width="100%" height="30vh"></v-img>
				<v-card-title class="mb-2 text-center" :tag="tag_dialogTitle" :class="css_dialogTitle"
					>Log In</v-card-title
				>
				<v-card-subtitle
					>Sign in with Google or Email, to save your preferences; including health forms, bank details and
					more.
				</v-card-subtitle>
			</v-col>
			<v-col cols="12" class="d-flex justify-space-evenly" style="border: 2px solid yellow">
				<v-btn class="bg-blue" variant="text" color="accent">Log in with Google</v-btn>
				<v-btn class="bg-blue" variant="text" color="accent">Log in with Email</v-btn>
			</v-col>
		</template>
	</dialog-container-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Stores
import { useCommonStore } from "@plugins/pinia/pinia.js";

// Components
import DialogContainerComp from "@components/common/dialog/common-dialog.vue";
import TooltipComp from "@components/common/tooltip/common-tooltip.vue";

// Interfaces
import {
	IDialogDefaultState,
	IDialogLoginState,
} from "@declarations/common/dialog/interfaces/common-interface-dialog.js";

// Enums
import { ElementIDs } from "@enums/enums.js";

export default defineComponent({
	name: "dialog-component",
	components: {
		"dialog-container-component": DialogContainerComp,
		"tooltip-container-component": TooltipComp,
	},
	computed: {
		/* Text */
		// IDs
		id_dialogCloseBtn(): string {
			return ElementIDs.DIALOG_LOGIN_CLOSE_BTN;
		},
		// Tags
		tag_dialogTitle(): string {
			let retVal: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
					retVal = "h4";
					break;
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retVal = "h3";
					break;
			}
			return retVal;
		},
		// Tooltips
		tooltip_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.tooltip;
		},

		/* Icons */
		icon_dialogCloseBtn(): string {
			return this.data_dialogDefaultState.icons.close.icon;
		},

		/* CSS */
		css_dialogTitle(): string {
			let retVal: string = "";
			switch (this.$vuetify.display.name) {
				case "xs":
				case "sm":
					retVal = "d-flex d-md-none text-h4";
					break;
				case "md":
				case "lg":
				case "xl":
				case "xxl":
					retVal = "d-none d-md-flex text-h3";
					break;
			}
			return retVal;
		},

		/* Data */
		// Read only
		data_dialogDefaultState(): IDialogDefaultState {
			return this.storeCommon.getDialogDefaultState;
		},
		data_dialogLogin(): IDialogLoginState {
			return this.storeCommon.getDialogLoginState;
		},
		// Read & Write
		data_dialogLoginDrawerState: {
			get(): boolean {
				return this.storeCommon.getDialogLoginDrawerState;
			},
			set(newValue: boolean): void {
				this.storeCommon.setDialogLoginDrawerState(newValue);
			},
		},
	},
	methods: {
		toggleTooltipDrawerState(newValue: boolean): void {
			this.storeCommon.setDialogLoginBtnCloseTooltipDrawerState(newValue);
		},
	},
	setup() {
		const storeCommon = useCommonStore();
		return { storeCommon };
	},
});
</script>
